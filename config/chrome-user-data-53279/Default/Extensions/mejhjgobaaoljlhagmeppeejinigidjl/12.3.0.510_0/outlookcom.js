/* Copyright (c)2014 Sky Co., LTD. All rights reserved. */

/**
 * @file		outlookcom.js
 * @brief		Outlook.comアドオンのJavaScript部
 * @date		2014/07/02
 * @author		Y.Suzuki
 */


// trim関数追加
if(!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g,'');
	};
}
// replaceAll関数追加  
if(!String.prototype.replaceAll) {
	String.prototype.replaceAll = function (org, dest){  
	  return this.split(org).join(dest);  
	}  
}

/**
 * 特殊なエンティティを文字列に戻します。
 */
if(!String.prototype.htmlspecialchars_decode) {
	String.prototype.htmlspecialchars_decode = function() {
		return this.replace(/&(gt|lt|#039|quot|amp);/ig, function($0, $1) {
			if (/^gt$/i.test($1))   return ">";
			if (/^lt$/i.test($1))   return "<";
			if (/^#039$/.test($1))  return "'";
			if (/^quot$/i.test($1)) return "\"";
			if (/^amp$/i.test($1))  return "&";
		});
	};
}

var g_SendMailHandler = null;

function getStringFromArray(values, splitStr) {
	var retStr = "";
	$.each(values, function(index, value) {
		if (0 != index) retStr += splitStr;
		retStr += value;
	});
	return retStr;
}

function escapeIniValue(val) {
	return "\"" + val.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"").replaceAll("\r", "\\r").replaceAll("\n", "\\n") + "\"";
}
//gmail.jsのcreateErrorData()が呼ばれてると思われるが、ブラウザにより挙動が異なる可能性があるため
//このまま残しておく。
function createErrorData(doc, addKeyValues)  {
	var errorData = "[common]\r\n";
	
	for (var key in addKeyValues) {
		errorData += key + "=" + escapeIniValue(addKeyValues[key]) + "\r\n";
	}
	
	if (null != doc.title) {
		errorData += "title=" + escapeIniValue("" + doc.title) + "\r\n";
	}
	if (null != doc.URL) {
		errorData += "URL=" + escapeIniValue("" + doc.URL) + "\r\n";
	}
	
	var code = -1;
	
	if( doc.charset != null ) {
		var chset = doc.charset;
		if( chset.toLowerCase().indexOf( "utf-8" ) != -1 ){
			code = 0;
		}
		else if( chset.toLowerCase().indexOf( "shift-jis" ) != -1 ){
			code = 1;
		}
		else if( chset.toLowerCase().indexOf( "euc-jp" ) != -1 ){
			code = 2;
		}
	}

	if( code != -1 ){
		errorData += "charset=" + code + "\r\n";
	}
	
	
	var htmlArray = new Array();
	htmlArray.push({document:doc, section:"root"});
	
	var iframeNum = 0;
	$("iframe", doc.documentElement).each(function(){
		try { 
			if (this.contentWindow && this.contentWindow.document) {
				htmlArray.push({document:this.contentWindow.document, section:"iframe-" + iframeNum});
			}
			else {
				htmlArray.push({document:null, section:"iframe-" + iframeNum});
			}
		}
		catch(e){
			htmlArray.push({document:null, section:"iframe-" + iframeNum});
		}
		iframeNum++;

	});
	
	errorData += "iframeNum=" + iframeNum + "\r\n";
	
	$.each(htmlArray, function(index, value) {
		try {
			if( value.document == null ){
				errorData += "[" + value.section + "]\r\n";
				errorData += "html=" + "\"\"" + "\r\n";
				var inputNum = 0;
				errorData += "inputNum=" + inputNum + "\r\n";
				var textareaNum = 0;
				errorData += "textareaNum=" + textareaNum + "\r\n";
				var selectNum = 0;
				errorData += "selectNum=" + selectNum + "\r\n";
			}
			else {
				errorData += "[" + value.section + "]\r\n";
				var html = value.document.documentElement.outerHTML;
				
				$("script,style", value.document).each(function(){
					html = html.replaceAll(this.outerHTML, "");
				});
				
				errorData += "html=" + escapeIniValue(html) + "\r\n";
				var inputNum = 0;
				$("input", value.document).each(function(){
					errorData += "input-html-" + inputNum + "=" + escapeIniValue(this.outerHTML) + "\r\n";
					errorData += "input-value-" + inputNum + "=" + escapeIniValue($(this).val()) + "\r\n";
					inputNum++;
				});
				errorData += "inputNum=" + inputNum + "\r\n";
				
				var textareaNum = 0;
				$("textarea", value.document).each(function(){
					errorData += "textarea-html-" + textareaNum + "=" + escapeIniValue(this.outerHTML) + "\r\n";
					errorData += "textarea-value-" + textareaNum + "=" + escapeIniValue($(this).val()) + "\r\n";
					textareaNum++;
				});
				errorData += "textareaNum=" + textareaNum + "\r\n";
				
				var selectNum = 0;
				$("select", value.document).each(function(){
					errorData += "select-html-" + selectNum + "=" + escapeIniValue(this.outerHTML) + "\r\n";
					errorData += "select-value-" + selectNum + "=" + escapeIniValue($(this).val()) + "\r\n";
					selectNum++;
				});
				errorData += "selectNum=" + selectNum + "\r\n";
			}
		}
		catch(e){}
	});
	
	
	return errorData;
}

var CLogOutlookComAnalyser = function(doc, browserId) {
	
	this.rootDoc = doc;
	this.browserId = browserId;
	this.from = "";
	this.fromTitle = "";

	/**
	 * 初期化
	 */
	this.init = function(doc) {
		try {
			var thisObj = this;

			// マウス/キーイベントを設定。
			doc.addEventListener("mousedown", function (event) { thisObj.mouseDownEventHandler(event, thisObj); }, true);
			doc.addEventListener("keydown", function (event) { thisObj.keyDownEventHandler(event, thisObj); }, true);

			// loadイベントを設定。
			doc.addEventListener("load", function (event) { thisObj.loadEventHandler(event, thisObj); }, true);

			// 既にloadが行われているiframeのdocumentにキーイベントを設定する。
			$(doc.getElementsByTagName("iframe")).each(function() {
				var iframeObj = this;
				
				try {
					var documentObj = iframeObj.contentWindow.document;
					documentObj.addEventListener("keydown", function (event) { thisObj.keyDownEventHandler(event, thisObj); }, true);
				}
				catch(ex){
					//console.log(ex);
				}
			});

			// 差出人要素取得
			this.getDispFrom();
			this.getFromTitle();
		}
		catch(ex){
			//console.log(ex);
		}
	};

	/**
	 * 要素がloadされた際のイベント
	 */
	this.loadEventHandler = function( event, thisObj ) {
		try {
			var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
			if( $(eventObj).is("iframe")){
				// iframeのdocumentにキーイベントを設定。
				var documentObj = eventObj.contentWindow.document;
				documentObj.addEventListener("keydown", function (event) { thisObj.keyDownEventHandler(event, thisObj); }, true);
			}
		}
		catch(ex){
			//console.log(ex);
		}
	}

	/**
	 * メール送信イベント判定
	 */
	this.isMailSendKeyEvent = function(event) {
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;

		var bSend = false;
		if ($(eventObj).is("a#SendMessage")) {
			bSend = true;
		} else if ($(eventObj).parent().is("a#SendMessage")) {
			bSend = true;
		} else if ($(eventObj).parent().parent().is("a#SendMessage")) {
			bSend = true;
		} else if ($(eventObj).is("button[title='送信']")) {
			bSend = true;
		} else if ($(eventObj).is("button[title='Send']")) {
			bSend = true;
		} else if ($(eventObj).parent().is("button[title='送信']")) {
			bSend = true;
		} else if ($(eventObj).parent().is("button[title='Send']")) {
			bSend = true;
		} else if ( $(eventObj).is("a#lnkHdrsend.btn")) {			//Lightバージョン
			return true;
		} else if ( $(eventObj).parent().is("a#lnkHdrsend.btn")) {	//Lightバージョン
			return true;
		} else if ( $(eventObj).is("input#ns10_saveButton")) {	//予定の送信
			return true;
		} else if (($(eventObj).is("button.ms-Button--primary")) || 
				($(eventObj).parent().parent().parent().is("button.ms-Button--primary")) ){		// ベータ版[送信]ボタンの文字部分
			try{
				if(($(eventObj).text().toLowerCase().indexOf("送信") != -1 ) ||
					($(eventObj).text().toLowerCase().indexOf("send") != -1 ))
				{
					bSend = true;
				}
				else {
					if( $(eventObj).children().children("i[data-icon-name='Send']").length > 0 ){
						bSend = true;
					}
				}
			}
			catch(e){}
		} else if ($(eventObj).parent().is("button.ms-Button--primary")) {		// ベータ版[送信]ボタンの文字部分が画像の場合
			bSend = true;
		} else if ($(eventObj).is("i[data-icon-name='Send']")) {	// ベータ版
			bSend = true;
		} else if( $(eventObj).is("button") || $(eventObj).parent().is("button")){
			var button = $(eventObj);
			if( $(eventObj).parent().is("button")){
				button = $(eventObj).parent();
			}

			var children = $(button).children("span");
			var numberOfchild = children.length;

			for( var i = 0 ; i < numberOfchild; ++i){
				// 予定表転送イベントトリガーの取得
				if( ($(children.get(i)).text().toLowerCase().indexOf("送信") != -1 ) || 
					($(children.get(i)).text().toLowerCase().indexOf( "send" ) != -1 )){
					// ベータ版でも通る。
					return true;
				}
			}
		}
		return bSend;
	}

	/**
	 * 差出人表示イベント判定
	 */
	this.isShowFromButton = function(event) {
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;

		var bShowFrom = false;
		
		var KEY = ["button[aria-label='差出人を表示']", "button[aria-label='差出人を非表示']", "button[aria-label='Show From']", "button[aria-label='Hide From']"];
		for( var i = 0; i < KEY.length; ++i ){
			if ($(eventObj).is(KEY[i])) {
				bShowFrom = true;
				break;
			}
		}
		return bShowFrom;
	}

	/**
	 * ポップアップ画面表示イベント判定
	 */
	this.isPopOutButton = function( event ){
		if( this.isPopoutUrl() ){
			return false;
		}
		
		var obj = (event.originalTarget) ? event.originalTarget : event.srcElement;
		var eventObj = null;
		if ($(obj).is("button")){
			eventObj = obj;
		}
		else if( $(obj).parent().is("button")) {
			eventObj = $(obj).parent();
		}
		else if ($(obj).is("span")){
			eventObj = obj;
		}
		else if ($(obj).is("div")){	// ベータ版の[新しいメッセージ]ボタンはChromeはここ
			var text = $(obj).text();
			var KEY = ["新しいメッセージ", "new message"];
			for( var i = 0; i < KEY.length; ++i ){
				if (-1 != text.toLowerCase().indexOf(KEY[i].toLowerCase())) {
					return true;
				}
			}
			
			return false;
		}
		else {
			return false;
		}

		var title = $(eventObj).attr("title");
		if( title != null ){
			var KEY = ["新しいメッセージを書く", "Write a new message", "返信", "転送", "Reply", "Forward", "別のウィンドウで編集", "Edit in a separate window", "別のウィンドウで開く", "Open in a separate window"];
			for( var i = 0; i < KEY.length; ++i ){
				if (-1 != title.toLowerCase().indexOf(KEY[i].toLowerCase())) {
					return true;
				}
			}
		}


		var aria_label = $(eventObj).attr("aria-label");
		if( aria_label != null ){
			var KEY = ["返信", "転送", "Reply", "Forward", "予定表イベント", "Calendar event", "電子メール メッセージ", "Email message"];
			for( var i = 0; i < KEY.length; ++i ){
				if (-1 != aria_label.toLowerCase().indexOf(KEY[i].toLowerCase())) {
					return true;
				}
			}
		}

		if( $(eventObj).is("span") || $(eventObj).is("button")){	// ベータ版の[新しいメッセージ]ボタンはFirefoxはここ
			var text = $(eventObj).text();
			if( 0 < text.length ){
				var KEY = ["電子メール メッセージ", "Email message", "新しいメッセージ", "new message"];
				for( var i = 0; i < KEY.length; ++i ){
					if (-1 != text.toLowerCase().indexOf(KEY[i].toLowerCase())) {
						return true;
					}
				}
			}
		}
		
		return false;
	}
	/**
	 * ポップアップ画面表示イベント判定
	 */
	this.isPopOutElement = function( event ){
		if( this.isPopoutUrl() ){
			return false;
		}
		
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
		if( (false == $(eventObj).is("span")) &&
			(false == $(eventObj).is("div"))
		)
		{
			return false;
		}

		var KEY = ["span.lvHighlightSubjectClass"];
		for( var i = 0; i < KEY.length; ++i ){
			var obj = $(eventObj).find( KEY[0] );
			if( obj.length > 0 ){
				return true;
			}
		}
		
		return false;
	}
	
	
	/**
	 * ポップアップ画面か判定
	 */
	this.isPopoutUrl = function(){
		if ((-1 != this.rootDoc.URL.search("ispopout=1")) ||
			(-1 != this.rootDoc.URL.search("projection.aspx"))
		) 
		{
			return true;
		}		
		return false;
	}
		
	this.isTitleEmpty = function() {
		var bEmpty = false;
		//件名空白の場合は確認Popupが出る。
		var subjectElement = $("div.SubjectArea", this.rootDoc);
		if (1 == subjectElement.length) {
			var sub = $("input#fSubject", subjectElement);
			subject = sub.val();
			if( subject == "" )
			{			
				bEmpty = true;
			}
		}

		return bEmpty
	}

	this.GetToCcBcc = function( toccbcc ) {
		var to = "";
		var cc = "";
		var bcc = "";
		var str = "";
		// 宛先/CC/BCC
		var bElementExist = false;
		var conductorlist = $("div._rw_j.allowTextSelection", this.rootDoc); // to/cc/bccの要素取得
		var addressFilter = "span._rw_k div._rw_c span._rw_b span._rw_d span._pe_i";
		if (0 == conductorlist.length) {	// 取得できない場合は新フォーマットで試してみる
			conductorlist = $("[role*='combobox']", this.rootDoc).parent(); // to/cc/bccの要素取得
			addressFilter = "span.allowTextSelection";
		}
		for (i = 0; i < conductorlist.length; i++) {
			var addressElements = $(addressFilter, conductorlist.get(i)); // 各要素からアドレス要素リストを取得
			var nbsp = String.fromCharCode(160);
			for (j = 0; j < addressElements.length; j++) {
				bElementExist = true;
				var address = addressElements.get(j).textContent.split(nbsp).join("");
				switch (i) {
				case 0:
					to = to + address + ";";
					break;
				case 1:
					cc = cc + address + ";";
					break;
				case 2:
					bcc = bcc + address + ";";
					break;
				}

			}
		}

		toccbcc.to = to;
		toccbcc.cc = cc;
		toccbcc.bcc = bcc;
		return bElementExist;
	}
	
	// 2017/11/21
	this.GetToCcBccMailBeta = function( toccbcc ) {
		var bElementExist = false;
		var persona = $("div.ms-persona--xs",document).siblings("span");
		try {
			for (j = 0; j < persona.length; ++j) {
				var addr = $(persona[j]).text();
				if( ( addr == null ) || (addr.length == 0) ){
					continue;
				}
				var whichtype = $(persona[j]);
				var type = -1;
				for( i = 0 ; i < 10; ++i ){
					var sib = whichtype.parent().siblings("div");
					for( k = 0; k < sib.length; ++k ){
						if(( $(sib[k]).text().toLowerCase() == "宛先" ) || ( $(sib[k]).text().toLowerCase() == "to" )){
							type = 0;
							bElementExist = true;
							if( toccbcc.to.length > 0 ){
								toccbcc.to = toccbcc.to + ";";
							}
							toccbcc.to = toccbcc.to + addr;
							break;
						}
						if( $(sib[k]).text().toLowerCase() == "cc" ){
							type = 1;
							bElementExist = true;
							if( toccbcc.cc.length > 0 ){
								toccbcc.cc = toccbcc.cc + ";";
							}
							toccbcc.cc = toccbcc.cc + addr;
							break;
						}
						if( $(sib[k]).text().toLowerCase() == "bcc" ){
							type = 2;
							bElementExist = true;
							if( toccbcc.bcc.length > 0 ){
								toccbcc.bcc = toccbcc.bcc + ";";
							}
							toccbcc.bcc = toccbcc.bcc + addr;
							break;
						}
					}
	
					if( type == -1 ){
						whichtype = whichtype.parent();
					}
					else {
						break;
					}
				}
			}
		}
		catch(e){}
		
		return bElementExist;
	}

	// 2016/12/27
	this.GetToCcBccMail = function( toccbcc ) {
		var to = "";
		var cc = "";
		var bcc = "";
		var str = "";
		var bElementExist = false;
		
		try {
			var headerpanel = $("div[aria-label='作成ヘッダー']", this.rootDoc );
			if( headerpanel.length == 0 ){
				headerpanel = $("div[aria-label='Compose header']", this.rootDoc );
			}
			
			var toccbccaddr = null;
			if( headerpanel.length > 0 ){
				toccbccaddr = $( "div.allowTextSelection", headerpanel );
			}
			
			var numberOftoccbcc = 0;
			if( null != toccbccaddr ){
				numberOftoccbcc = toccbccaddr.length;
			}
			for (j = 0; j < numberOftoccbcc; ++j) {
				var addr = $( "span.allowTextSelection", toccbccaddr.get(j))
				var numberOfaddr = addr.length;
				var str = "";
				for (k = 0; k < numberOfaddr; ++k) {
					if( str.length > 0 ){
						str = str + ";";
					}
					str = str + addr.get(k).textContent;
					bElementExist = true;
				}

				// 手書きの場合の取得を想定。
				var lawaddrs = $( "span.dynamicResizingElement,input.allowTextSelection", toccbccaddr.get(j));
				if( lawaddrs.length > 0){
					var arrayaddr={};
					for( var m = 0 ; m < lawaddrs.length; ++m ){
						var lawaddrstext = lawaddrs.get(m).textContent;
						if( lawaddrstext.length == 0 ){
							lawaddrstext = $(lawaddrs.get(m)).val();
						}
						lawaddrstext = lawaddrstext.trim();
						if( lawaddrstext.length > 0 ){
							var lawaddrarray = lawaddrstext.split(" ");
							for (k = 0; k < lawaddrarray.length; ++k) {
								if( lawaddrarray[k].length > 0 )
								{
									var addr = lawaddrarray[k];
									if( arrayaddr[addr] ){
										continue;
									}

									if( str.length > 0 ){
										str = str + ",";
									}
									
									str = str + addr;
									arrayaddr[addr] = true;
									bElementExist = true;
								}
							}
						}
					}
				}

				switch (j) {
				case 0:	// To
					to = to + str;
					break;
				case 1: // CC
					cc = cc + str;
					break;
				case 2:	// BCC
					bcc = bcc + str;
					break;
				}
			}

			if( false == bElementExist ){	// β版
				var toccbcc2 = { to:"", cc:"", bcc:"" };
				bElementExist = this.GetToCcBccMailBeta( toccbcc2 );
				if( bElementExist ){
					to = toccbcc2.to;
					cc = toccbcc2.cc;
					bcc = toccbcc2.bcc;
				}
			}

			if( bElementExist ){
				toccbcc.to = to;
				toccbcc.cc = cc;
				toccbcc.bcc = bcc;
			}
		} catch(e){}
		
		return bElementExist;
	}
	
	
	this.getReceiverTextLight = function ( DivToCcBcc ) {
		var ret = "";
		if( 0 < DivToCcBcc.length )	{
			var numberOfBlocks = DivToCcBcc.length;
			for (i = 0; i < numberOfBlocks; ++i) {
				if( 0 < i  ) {
					ret = ret + ";";
				}
				
				var addr = $(DivToCcBcc.get(i)).text();
				var index = addr.indexOf( " [削除]" );
				if( index == -1 ){
					index = addr.indexOf( " [remove]" );
				}
			
				if( index != -1 ){
					addr = addr.substring( 0, index );
				}
				ret = ret + addr;
			}
		}
		
		return ret;
	}

	
	this.GetToCcBccLight = function( toccbcc ) {
		
		var to = "";
		var cc = "";
		var bcc = "";
		var str = "";
		var bElementExist = true;
		
		try {
			var DivTo = $("div#divTo", this.rootDoc); // to/cc/bccの要素取得
			if( 0 < DivTo.length ) {
				var SpanTo = DivTo.find( "span.rwRO,span.rwURO");
				if( 0 < SpanTo.length )	{
					to = this.getReceiverTextLight( SpanTo );
				}
			}

			var txtto = $("input#txtto", this.rootDoc).val();
			if( txtto.length > 0 ) {
				if( to.length > 0 ) {
					to = to + ";";
				}
				to = to + txtto;
			}

			var DivCc = $("div#divCc", this.rootDoc); // to/cc/bccの要素取得
			if( 0 < DivCc.length ){
				var SpanCc = DivCc.find( "span.rwRO,span.rwURO");
				if( 0 < SpanCc.length ) {
					cc = this.getReceiverTextLight( SpanCc );
				}
			}

			var txtcc = $("input#txtcc", this.rootDoc).val();
			if( txtcc.length > 0 ) {
				if( cc.length > 0 ) {
					cc = cc + ",";
				}
				cc = cc + txtcc;
			}

			var DivBcc = $("div#divBcc", this.rootDoc); // to/cc/bccの要素取得
			if( 0 < DivBcc.length ){
				var SpnBcc = DivBcc.find( "span.rwRO,span.rwURO");
				if( 0 < SpnBcc.length ) {
					bcc = this.getReceiverTextLight( SpnBcc );
				}
			}

			var txtbcc = $("input#txtbcc", this.rootDoc).val();
			if( txtbcc.length > 0 ) {
				if( bcc.length > 0 ) {
					bcc = bcc + ",";
				}
				bcc = bcc + txtbcc;
			}

			if( ( DivTo.length == 0 ) &&
				( txtto.length == 0 ) &&
				( DivCc.length == 0 ) &&
				( txtcc.length == 0 ) &&
				( DivBcc.length == 0 ) &&
				( txtbcc.length == 0 ) ) {	//全部0だと宛先なし
				bElementExist = false;
			}

			if( bElementExist ){
				toccbcc.to = to;
				toccbcc.cc = cc;
				toccbcc.bcc = bcc;
			}
		}
		catch(e){}

		return bElementExist;
	}

	/* 会議で全員に返信 */
	this.GetToCcBcc2 = function( toccbcc ) {
		
		var to = "";
		var cc = "";
		var bcc = "";
		var str = "";
		// 宛先/CC/BCC
		var bElementExist = false;

		// 2017/10/18 span._pe_l._pe_Pを追加
		// 2016/10/03 span._pe_l._pe_N追加
		var addressElements = $("span._pe_l._pe_N, span._pe_l._pe_J, span._pe_l._pe_P", this.rootDoc);			//2016/06/07
		if( addressElements.length > 0 ){
			for (j = 0; j < addressElements.length; j++) {
				//2016/10/03 span[autoid='_pe_o']追加
				var addrs =  $("span[autoid='_pe_o'], span[autoid='_pe_k'], span[autoid='_pe_h'], span._pe_U._pe_q, span._pe_W._pe_q", addressElements.get(j));
				var address = "";
				if( addrs.length > 0 ){
					address = addrs.get(0).textContent.split(nbsp).join("");
				}
				if( address.length > 0 ){
					
					bElementExist = true;
					to = to + address + ",";
				}
			}
		}
		
		if( false == bElementExist ){
			var addressElements = $("span.ms-fwt-sl.bidi", this.rootDoc); // 各要素からアドレス要素リストを取得
			if (0 == addressElements.length) {	// 取得できない場合は新フォーマットで試してみる
				addressElements = $("span._pe_h._pe_D span._pe_W._pe_q", this.rootDoc); // 各要素からアドレス要素リストを取得
			}
			var nbsp = String.fromCharCode(160);
			for (j = 0; j < addressElements.length; j++) {
				bElementExist = true;
				var address = addressElements.get(j).textContent.split(nbsp).join("");
				to = to + address + ";";
			}
		}

		if( bElementExist ){
			toccbcc.to = to;
			toccbcc.cc = cc;
			toccbcc.bcc = bcc;
		}

		return bElementExist;
	}



	this.GetSubject = function( _subject ){
		var bElementExist = false;

		var subjectElement = $("input[aria-label='件名、'], input[aria-label='Subject,']", this.rootDoc);	// 2016/12/14 追加
		if( subjectElement.length == 0 ){
			subjectElement = $("input[aria-labelledby='MailCompose.SubjectWellLabel'], input[aria-label='イベントのタイトルを追加'], input[aria-label='Add a title for the event']", this.rootDoc);	// 件名要素内の固有属性で決め打ち
			if( subjectElement.length == 0 ){
				subjectElement = $("input[placeholder='件名を追加'], input[placeholder='Add a subject']", this.rootDoc);	// 2017/11/20 追加 β版 検索順位は低
			}
		}
		
		if (0 < subjectElement.length) {
			bElementExist = true;
			_subject.subject = $(subjectElement.get(0)).val();
		}

		return bElementExist;
	}
	

	this.GetSubjectLight = function( _subject ){
		var bElementExist = false;
		
		try {
			var subjectElement = $("input#txtsbj", this.rootDoc);	// 件名要素内の固有属性で決め打ち
			if (0 < subjectElement.length) {
				bElementExist = true;
				_subject.subject = $(subjectElement.get(0)).val();
			}
		}
		catch(e){}

		return bElementExist;
	}

	
	this._GetAttachmentSubOutlookCom = function( composepanel, _attachments ) {
		var bElementExist = false;
		
		// 添付ファイル(エラー判定なし)
		$("span.attachmentFileSize", composepanel).each(function(){
			bElementExist = true;
			try {
				// #23092 attachmentFileSize要素の同階層の要素のspanの先頭要素にファイル名の位置が変わった。
				var filename = $(this).parent().children("span").first().text();
				if (0 >= filename.length) {
					filename = $(this).parent().children().first().text();	// attachmentFileSize要素と同階層の要素のうち、先頭要素がファイル名のため決め打ち
					if (0 >= filename.length) {
						return bElementExist;
					}
				}
				if (0 != _attachments.attachments.length) {
					_attachments.attachments = _attachments.attachments + "/";	// 2件目以降はスラッシュで結合
				}
				
				_attachments.attachments = _attachments.attachments + filename;
			}
			catch(e){
			}
			
		});
		
		return bElementExist;
	}

	this.GetAttachmentBeta = function( _attachments ) {
		var bElementExist = false;
		
		try {
			var attachbro = $("i[data-icon-name='Edit']");
			if( (attachbro != null ) && (attachbro.length > 0 )){
				for( i = 0; i < attachbro.length; ++i ){
					var filename = $(attachbro[i]).parent().parent().parent().attr("aria-label");
					if( (filename != null) && ( filename.length > 0 )){
						bElementExist = true;
						if (0 != _attachments.attachments.length) {
							_attachments.attachments = _attachments.attachments + "/";	// 2件目以降はスラッシュで結合
						}
						_attachments.attachments = _attachments.attachments + filename;
						//break; //2つ以上あるかもしれないので、breakしない
					}
				}
			}
		}
		catch(e){
		}

		return bElementExist;
	}

	this.GetAttachment = function( _attachments ) {
		var bElementExist = false;

		var composepanel = $("div.conductorContent[aria-label='作成パネル'], div.conductorContent[aria-label='Compose Panel']", this.rootDoc);
		if( composepanel.length == 0 ){
			composepanel = this.rootDoc;
		}

		bElementExist = this._GetAttachmentSubOutlookCom( composepanel, _attachments );

		if( false == bElementExist ){
			bElementExist = this.GetAttachmentBeta( _attachments );
		}
		
		
		return bElementExist;

	}

	this.GetAttachmentCalendarOutlookCom = function( _attachments ) {
		var bElementExist = false;

		var composepanel = $("div[aria-label='イベントの作成フォーム'], div[aria-label='Event compose form']", this.rootDoc);
		if( composepanel.length == 0 ){
			composepanel = this.rootDoc;
		}
		
		bElementExist = this._GetAttachmentSubOutlookCom( composepanel, _attachments );
		
		return bElementExist;
	}
	
	this.GetAttachmentLight = function( _attachments ) {
		var bElementExist = false;
		try {
			var divAtt = $("div#divAtt", this.rootDoc);
			var attachmentBlocks = divAtt.find( "span#spnAtmt" );
			if( 0 < attachmentBlocks.length )
			{
				bElementExist = true;
				var count = 0;
				var numberOfBlocks = attachmentBlocks.length;
				for (i = 0; i < numberOfBlocks; ++i) {
					var filename = $("a#lnkAtmt", attachmentBlocks.get(i)).attr("title");

					if (filename.length <= 0) {
						continue;
					}

					if (0 != count) {
						_attachments.attachments = _attachments.attachments + "/";
					}

					_attachments.attachments = _attachments.attachments + filename;
					++count;
				}
			}
		}
		catch(e){}
		
		return bElementExist;
	}

	this.IsHTMLBarShow = function() {
		var bret = true;
		
		var formatbar = $("div#EditorFormatBar", this.rootDoc);
		if (formatbar.length > 0 ) {
			var KEY = ["button[style='display: none;']","button[style='display:none;']"];
			for( var i = 0; i < KEY.length; ++i ){
				var bar = $(KEY[i], formatbar);
				if (bar.length > 0 ) {
					bret = false;
					break;
				}
			}

		}
		else {
			bret = false;
		}
		
		return bret;
	
	}
	
	this.GetBody = function( _body ) {

		var bElementExist = false;
		if( false == this.IsHTMLBarShow()){
			var KEY = ["textarea[aria-label='メッセージ本文']","textarea[aria-label='Message Body']","textarea[aria-label='Message body']"];
			for( var i = 0; i < KEY.length; ++i ){
				var bodyFrame = $(KEY[i], this.rootDoc);
				if( bodyFrame.length > 0 ){	//表示されている
					if (bodyFrame.filter(":visible").length > 0) {	// c++ のhtmlqueryにisが実装されたら合わせてisに置き換え予定
						bElementExist = true;

						_body.body = bodyFrame.val();	// text形式の文字列で返却
						break;
					}
				}
			}
		}

		if( false == bElementExist ){
			var bodyFrame = $("div[role='textbox'][contenteditable='true']", this.rootDoc);	// 本文要素内の特定属性の組み合わせで決め打ち
			if (1 == bodyFrame.length) {
				if (bodyFrame.filter(":visible").length > 0) {	// c++ のhtmlqueryにisが実装されたら合わせてisに置き換え予定
					bElementExist = true;
					_body.body = bodyFrame.html();	// html形式の文字列で返却
				}
			}
		}
		
		if( false == bElementExist ){	// ベータ版
			var bodyFrame = $("div[dir='ltr']", this.rootDoc);	// 本文要素内の特定属性の組み合わせで決め打ち
			if( bodyFrame.length > 0 ){
				bElementExist = true;
				_body.body = bodyFrame.text();	// text形式の文字列で返却(html形式とかはない
			}
		}
		
		
		return bElementExist;
	}

	this.GetBodyLight = function( _body ) {
		var bElementExist = false;
		try {

			var bodyFrame = $("textarea[name='txtbdy']", this.rootDoc);
			if (0 < bodyFrame.length){
				for( p = 0 ; p < bodyFrame.length; ++p ){
					bElementExist = true;
					_body.body = bodyFrame[p].value + _body.body;
				}
			}
		}
		catch(e){}

		return bElementExist;
	}

	this.getStorageol = function() {
		if (-1 != navigator.appVersion.search("Chrome")) {
			return localStorage;
		} else {
			return content.localStorage;
		}
	}

	this.getsessionStorageol = function() {
		if (-1 != navigator.appVersion.search("Chrome")) {
			return sessionStorage;
		} else {
			return content.sessionStorage;
		}
	}

	/**
	 * 差出人の抽出
	 */
	this.parseFrom = function(thisObj) {
		try {
			var storage = thisObj.getStorageol();
			thisObj.getFromTitle();
			var storagename = "fromRecipient_" + this.rootDoc.domain;
			storage.setItem(storagename, thisObj.fromTitle);

			var sessionstorage = thisObj.getsessionStorageol();
			sessionstorage.setItem(storagename, thisObj.fromTitle);
		}
		catch(e){
		}
	}
	
	this.getStorageFrom = function(thisObj) {
		try {
			var storagename = "fromRecipient_" + thisObj.rootDoc.domain;
			return this.getStorageol().getItem(storagename);
		}
		catch(e){
		}
		
		return null;
	}

	this.getsessionStorageFrom = function(thisObj) {
		try {
			var storagename = "fromRecipient_" + thisObj.rootDoc.domain;
			return this.getsessionStorageol().getItem(storagename);
		}
		catch(e){
		}
		
		return null;
	}

	/**
	 * 差出人の取得
	 */
	this.getFrom = function(thisObj) {
		var naviElement = $("div#fromAddrMenu", thisObj.rootDoc);
		if (naviElement && 1 <= naviElement.length) {
			var fromElement = $("span.FromContainer", naviElement.get(0));
			if ( fromElement && 1 == fromElement.length) {
				ret = $("div.Address", fromElement).text();
				return ret;
			}
		}
		naviElement = $("div.fromAddrMenu", thisObj.rootDoc);
		if (naviElement && 1 <= naviElement.length) {
			var fromElement = $("span.FromContainer", naviElement.get(0));
			if ( fromElement && 1 == fromElement.length) {
				ret = $("div.Address", fromElement).text();
				return ret;
			}
		}
		return "";
	}
	/**
	* 差出人情報取得(DOM内から)
	 */
	this.getDispFrom = function() {
		try {
			var thisObj = this;

			var button = $( "button#O365_MeFlexPane_ButtonID", thisObj.rootDoc );
			var fromtext = $( "span.o365cs-topnavText", button );
			if( fromtext.length > 0 ){
				var from = fromtext.text();
				if( from.length > 0 ){
					thisObj.from = from;
					return;
				}
			}

			var search = "span[aria-labelledby='MailCompose.FromRecipientWellButton'] .allowTextSelection";
			var fromElement = $(search, thisObj.rootDoc);
			if (fromElement.length  > 0) {
				var from = fromElement.text();
				if (0 >= from.length) {
					return;
				}
				thisObj.from = from;
			}
		} catch(ex){}
	}

	/**
	 * 差出人情報取得(タイトルから)
	 */
	this.getFromTitle = function() {
		var thisObj = this;
		var title = $("title", thisObj.rootDoc).text();
		
		if (title && 1 <= title.length) {
			var start = -1
			var KEY = ["メール - ", "Mail - ", "予定表 - ", "Calendar - "];
			for( var i = 0; i < KEY.length; ++i ){
				start = title.toLowerCase().indexOf( KEY[i].toLowerCase() );
				if( start != -1 ){
					this.fromTitle = title.substring( KEY[i].length, title.length );
					if( this.fromTitle.length > 0 ){
						var SubKey = " - outlook";
						start = this.fromTitle.toLowerCase().indexOf( SubKey );		//メール - XXXXX - Outlook
						if( start == -1 ){
							return;
						}
						break;
					}
				}
			}

			var key = " - ";
			var keyoutlook = "outlook";

			start = title.toLowerCase().indexOf( key );
			var end = -1;
			if( start != -1 ){
				end = title.toLowerCase().lastIndexOf( key );
			}

			if( start != -1 ) {
				if( start == end ){	//区切りが一つ
					var indexol = title.toLowerCase().indexOf( keyoutlook );
					if( ( indexol != -1 ) && ( start < indexol )) {	//後ろにあるということ
						this.fromTitle = title.substring( 0, start );
					}
					else {
						this.fromTitle = title.substring( start + key.length, title.length );
					}
				}
				else {
					this.fromTitle = title.substring( start + key.length, end );
				}
				
				return;
			}
		}
	}

	this.getFromCalender = function() {
		var fromname = "";
		var thisObj = this;
		try {
			var nameElement = $("span#c_meun", thisObj.rootDoc);
			fromname = nameElement.text();

			return fromname;
		}
		catch(e){
		}
		
		return fromname;
	}
		
	this.GetSubjectCalender = function(_subject) {
		var bElementExist = false;
		try {
			var subject = $("input#ns10_whatField", this.rootDoc);
			if (0 < subject.length){
				bElementExist = true;
				_subject.subject = subject.val();
			}
		}
		catch(e){
		}


		return bElementExist;
	}

	this.GetBodyCalender = function( _body ) {

		var bElementExist = false;
		try {
			var bodyFrame = $("textarea#ns10_descriptionField", this.rootDoc);
			if( 0 < bodyFrame.length ) {
				bElementExist = true;
				_body.body = bodyFrame.val();
			}
		}
		catch(e){
		}


		return bElementExist;
	}
	
	// 予定表転送イベントトリガー
	this.IsTransferEvent = function(){
		try {
			var popup = $("div.peekShadowAll.peekPopup", this.rootDoc );
			if( popup.length > 0 ){
				var Spans = popup.find("span");
				for( var i = 0 ; i < Spans.length; ++i ){
					if( ( Spans.get(i).textContent == "イベントの転送") || 
						( Spans.get(i).textContent  == "Forward event") ) {
						return true;
					} 
				}
			}
		} catch(e){}

		return false;
	}

	// 予定表転送イベントの宛先
	this.GetToCcBcc3 = function( toccbcc ) {
		try {
			var popup = $("div.peekShadowAll.peekPopup", this.rootDoc );
			if( popup.length > 0 ){
				var to = "";
				var ToSpans = $(popup).find("span.allowTextSelection");
				var numberOfSpans = ToSpans.length;
				for (j = 0; j < numberOfSpans; ++j) {
					
					var txtto = ToSpans.get(j).textContent;
					if( to.length > 0 ) {
						to = to + ";";
					}
					to = to + txtto;
				}

				if( to.length == 0 ){
					return false;
				}

				toccbcc.to = to;
				return true;
			}
		} catch(e){}
		
		return false;
	}

	// 予定表転送イベントの本文
	this.getTrasferEventBody = function( _body ) {
		try {
			var popup = $("div.peekShadowAll.peekPopup", this.rootDoc );
			if( popup.length > 0 ){
				var txt = $("div.allowTextSelection[role='textbox']", popup);
				if( txt.length > 0 ){
					_body.body = txt.html();
					return true;
				}
			}
		} catch(e){}
		
		return false;
	}

	// 予定表転送イベントのタイトル
	this.getTransferEventSubject = function( _subject ){
		// 暫定対応
		_subject.subject = "イベントの転送";
		return true;
	}

	this.getCalenderEventBody = function( _body ) {
		var bElementExist = false;
		var bodyFrame = $("div[role='textbox'][aria-label='イベント本体'], div[role='textbox'][aria-label='Event body']", this.rootDoc);	// 本文要素内の特定属性の組み合わせで決め打ち
		if (0 < bodyFrame.length) {
			bElementExist = true;
			_body.body = $(bodyFrame.get(0)).html();
		}
		
		return bElementExist;
	}

	this.getCalenderEventSubject = function( _subject ){
		var bElementExist = false;

		var subjectElement = $("input[aria-label='イベントのタイトルを追加'], input[aria-label='Add a title for the event']", this.rootDoc);	// 件名要素内の固有属性で決め打ち
		if (0 < subjectElement.length) {
			bElementExist = true;
			_subject.subject = $(subjectElement.get(0)).val();
		}

		return bElementExist;
	}

	/**
	 * メール情報の抽出とログ出力用コールバックの呼び出し
	 */
	this.parseAndCallback = function() {
		if (null == g_SendMailHandler) {
			return;
		}

		// 予定表のポップアップURL https://outlook.live.com/owa/?viewmodel=IComposeCalendarItemViewModelFactory&wid=4&ispopout=1&path=
		var isPopup = false;
		if ((-1 != this.rootDoc.URL.search("ispopout=1")) ||		// 予定表
			(-1 != this.rootDoc.URL.search("projection.aspx"))		// メール
		) {
			isPopup = true;
		}
		
		var from = "";
		var subject = "";
		var to = "";
		var cc = "";
		var bcc = "";
		var attachments = "";
		var body = "";
		var errorData = "";
		
		var bErr = false;
		
		var bcalender		= $(this.rootDoc.getElementById("MeetingCompose.CalendarLabel"));
		var bTransferEvent	= this.IsTransferEvent();
		
		do {
			try {
				// 差出人
				from = this.getFrom(this);
				if (from == null || 0 >= from.length) {
					//console.log( "getFrom()で取れず" );
					this.getDispFrom();
					from = this.from;
					if (from == null || 0 >= from.length) {
						// ①予定表の場合は、ローカルストレージからは取得しない
						// ②ポップアップの場合は、タイトルがブラウザによって異なるようだ "XXXXX - Google Chrome"など
						//   そのため、ローカルストレージから取得する。
						//   getFromCalenderは2017/10/26時点で取得できないので、ポップアップ判定を優先する
						if( ( 0 >= bcalender.length ) || isPopup ){	// 予定表の場合はstorageからとらない。
							//console.log( "getDispFrom()で取れず" );
							from  = this.getStorageFrom(this);
							if (from == null || 0 >= from.length) {
								from = this.getsessionStorageFrom( this );
							}
						}
						else {
							from = this.getFromCalender();	//予定表の場合	2017/10/26時点で取得できない
						}
						
						if (from == null || 0 >= from.length) {
							from = this.fromTitle;	// 保持しているタイトル
							if (from == null || 0 >= from.length) {
								if( false == isPopup ){	// 別ウィンドウのタイトルは件名の場合があるので、この場合は取得しない
									this.getFromTitle();
									from = this.fromTitle;
									if (from == null || 0 >= from.length) {
										/* #17105 Fromが取れない場合、文言を入れて出力することになりました。*/
										//bErr = true;
									}
								}
							}
						}
					}
				}
			}
			catch(e){}

			if( from == null || from.length == 0 ){
				from = "<取得情報なし>";
			}

			// 宛先/CC/BCC
			
			var toccbcc = { to:"", cc:"", bcc:"" };
			var bElementExist = false;
			if( bTransferEvent ){	//イベントの転送
				bElementExist = this.GetToCcBcc3( toccbcc );
				if( false == bElementExist ) {
					bErr = true;
				}
				else {
					to	= toccbcc.to;
					cc	= toccbcc.cc;
					bcc	= toccbcc.bcc;
				}
			} 
			else if(bcalender.length > 0) {	//予定表
				bElementExist = this.GetToCcBcc2( toccbcc );
				if( false == bElementExist ) {
					bErr = true;
				}
				else {
					to	= toccbcc.to;
					cc	= toccbcc.cc;
					bcc	= toccbcc.bcc;
				}
			}
			else {
				bElementExist = this.GetToCcBccMail( toccbcc );
				if( false == bElementExist ) {
					bElementExist = this.GetToCcBcc( toccbcc );
				}

				if( false == bElementExist ) {
					// 宛先/CC/BCC
					var conductorContent = null;
					conductorContent = $(this.rootDoc);
					if (1 == conductorContent.length) {
						var toCcBccBlocks = conductorContent.find("div.cp_inputContainer");
						var numberOfBlocks = toCcBccBlocks.length;

						var index = 0;
						for (i = 0; i < numberOfBlocks; ++i) {
							var addressElements = $("div.cp_ctnr", toCcBccBlocks.get(i));
							var numberOfAddresses = addressElements.length;

							if( numberOfAddresses > 0 ) {
								bElementExist = true;
							}

							var nbsp = String.fromCharCode(160);
							for (j = 0; j < numberOfAddresses; ++j) {
								var address = addressElements.get(j).textContent.split(nbsp).join("");
								switch (index) {
								case 0:
									to = to + address;
									break;
								case 1:
									cc = cc + address;
									break;
								case 2:
									bcc = bcc + address;
									break;
								}
							}
							
							++index;
						}
					} 
				}
				else {
					to = toccbcc.to;
					cc = toccbcc.cc;
					bcc = toccbcc.bcc;
				}

				if( false == bElementExist ) {
					bElementExist = this.GetToCcBccLight( toccbcc );
					if( false == bElementExist ) {
						bErr = true;
					}
					else {
						to = toccbcc.to;
						cc = toccbcc.cc;
						bcc = toccbcc.bcc;
					}
				}
			}

			var _subject = {subject:""};
			bElementExist = false;
			if( bTransferEvent ){	//イベントの転送
				bElementExist = this.getTransferEventSubject( _subject );
			} 
			else if(bcalender.length > 0) {	//予定表
				bElementExist = this.getCalenderEventSubject( _subject );
				subject = _subject.subject;
			}
			else {
				bElementExist = this.GetSubject( _subject );
			}
			if( false == bElementExist ){
				// 件名
				var subjectElement = $("div.SubjectArea", this.rootDoc);
				if (1 == subjectElement.length) {
					var sub = $("input#fSubject", subjectElement);
					if (0 < sub.length) {
						subject = sub.val();				
					}

					if( subject == null  || 0 == subject.length )
					{
						sub = $("input.fSubject", subjectElement);
						if (0 < sub.length) {
							subject = sub.val();
						}
					}
				} else {
					bElementExist = this.GetSubjectLight( _subject );
					if( false == bElementExist ){
						bElementExist = this.GetSubjectCalender( _subject );
						if( false == bElementExist ) {
							bErr = true;
						}
					}
					
					if( bElementExist ) {
						subject = _subject.subject;
					}
				}
			}
			else {
				subject = _subject.subject;
			}
			
			// 添付ファイル
			if(bcalender.length > 0) {	//予定表
				var _attachments = {attachments:""};
				this.GetAttachmentCalendarOutlookCom( _attachments );
				attachments = _attachments.attachments;
			}
			else {
				var _attachments = {attachments:""};
				bElementExist = false;
				bElementExist = this.GetAttachment( _attachments );
				if( false == bElementExist ){
					var attachmentBlocks = $("div.Attachments", this.rootDoc);
					if (0 < attachmentBlocks.length) {
						var carousel = $("div.carousel", attachmentBlocks);
						if (1 == carousel.length) {
							var listContainer = $("div.carouselListContainer", carousel);
							if( 1 == listContainer.length) {
								var carouselList = $("ul.carouselList", listContainer);
								if( 1 == carouselList.length) {
									var carouselItem = $("li.carouselItem", carouselList);
									var numberOfBlocks = carouselItem.length;
									var count = 0;
									for (i = 0; i < numberOfBlocks; ++i) {
										var filename = carouselItem.get(i).getAttribute("title");
										if (filename.length <= 0) {
											continue;
										}
										
										var index = filename.indexOf( '\n' );
										if( index > 0 )
										{
											filename = filename.substring( 0, index );
										}
										
										if (0 != count) {
											attachments = attachments + "/";
										}
										
										attachments = attachments + filename;
										++count;
									}
								}
							}
						}
					}
					else {
						if( this.GetAttachmentLight( _attachments )){
							attachments = _attachments.attachments;
						}
					}
				}
				else {
					attachments = _attachments.attachments;
				}
			}
			// 本文
			var _body = {body:""};
			bElementExist = false;
			if( bTransferEvent ){	//イベントの転送
				bElementExist = this.getTrasferEventBody( _body );
			} 
			else if(bcalender.length > 0) {	//予定表
				bElementExist = this.getCalenderEventBody( _body );
				body = _body.body;
			}
			else { 
				bElementExist = this.GetBody( _body );
			}
			if(  false == bElementExist ){
				var bodyFrame = $("iframe#ComposeRteEditor_surface", this.rootDoc);
				if (1 == bodyFrame.length) {
					body = $("body", bodyFrame.contents()).html();
				} else {
					bElementExist = this.GetBodyLight( _body );
					if(  false == bElementExist ){
						bElementExist = this.GetBodyCalender( _body );
						if( false == bElementExist ) {
							bErr = true;
						}
					}
					
					if( bElementExist ){
						body = _body.body;
					}
				}
			}
			else {
				body = _body.body;
			}
		} while (0);

		if( bErr == true ){
			var addKeyValues = {};
			if (null != this.from) {
				addKeyValues["from"] = this.from;
			}
			if (null != this.fromTitle && 0 < this.fromTitle.length) {
				addKeyValues["fromTitle"] = this.fromTitle;
			}
			else {
				var storageFrom = this.getStorageFrom(this);
				if (null != storageFrom) {
					addKeyValues["fromTitle"] = storageFrom;
				}
			}
			errorData = createErrorData(this.rootDoc, addKeyValues);
		}

		g_SendMailHandler(
			WAET_WEBACCESS_OUTLOOK_COM,
			from.htmlspecialchars_decode(),
			to.htmlspecialchars_decode(),
			cc.htmlspecialchars_decode(),
			bcc.htmlspecialchars_decode(),
			subject.htmlspecialchars_decode(),
			body,
			attachments.htmlspecialchars_decode(),
			errorData);
	}
	
	/**
	 * メール送信で使用するキーイベントのタイプを取得
	 */
	this.getMailSendKeydownEvent = function (event) {
		if ("KEYDOWN" != event.type.toUpperCase()) {
			return KEYEVENT_UNKNOWN;
		}
		
		var shift, ctrl, alt, keycode; 
		// Mozilla(Firefox, NN) and Opera 
		if (event != null) { 
			keycode = event.which; 
			ctrl    = typeof event.modifiers == 'undefined' ? event.ctrlKey : event.modifiers & Event.CONTROL_MASK; 
			shift   = typeof event.modifiers == 'undefined' ? event.shiftKey : event.modifiers & Event.SHIFT_MASK; 
			alt     = typeof event.modifiers == 'undefined' ? event.altKey : event.modifiers & Event.ALT_MASK; 
		// Internet Explorer 
		} else { 
			keycode = event.keyCode; 
			ctrl    = event.ctrlKey; 
			shift   = event.shiftKey; 
			alt     = event.altKey;
		}
		
		// Ctrl同時押しの場合 
		if (ctrl) { 
			if (keycode == 13) {
				return KEYEVENT_CTRL_ENTER;
			}
		} 
		else if (alt) {
			if (keycode == 83) {
				return KEYEVENT_ALT_S;
			}
		}
		// 通常のキーダウン時の場合 
		else { 

			if (keycode == 13) { 
				return KEYEVENT_ENTER;
			} 
		}
		
		return KEYEVENT_UNKNOWN;
	};
	
	/**
	 * キーイベントハンドラ
	 */
	this.keyDownEventHandler = function (event, thisObj)
	{
		try {
			// Firefox 31では、URLの#以降が取得できない。
			/*
			if ( -1 == this.rootDoc.URL.indexOf("#page=Compose"))
			{
				// メール作成画面以外は何もしない。
				return;
			}
			*/

			var keyEventType = thisObj.getMailSendKeydownEvent(event);
			if( KEYEVENT_UNKNOWN == keyEventType )
			{
				return;
			}
			var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;

			if( keyEventType == KEYEVENT_ENTER )
			{
				if( !thisObj.isMailSendKeyEvent(event))
				{
					if( this.isShowFromButton( event ) ){
						this.getDispFrom();
					}
					else if( this.isPopOutButton( event )){
						this.parseFrom(thisObj);
					}
					else if( this.isPopOutElement( event )){
						this.parseFrom(thisObj);
					}
					return;
				}
			}

			thisObj.parseAndCallback();
		}
		catch(ex){}
	};

	/**
	 * マウスダウンハンドラ
	 */
	this.mouseDownEventHandler = function (event, thisObj)
	{
		try {
			// Firefox 31では、URLの#以降が取得できない。
			/*
			if ( -1 == this.rootDoc.URL.indexOf("#page=Compose"))
			{
				// メール作成画面以外は何もしない。
				return;
			}
			*/

			var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;

			if( !thisObj.isMailSendKeyEvent(event))
			{
				if( this.isShowFromButton( event ) ){
					this.getDispFrom();
				}
				else if( this.isPopOutButton( event )){
					this.parseFrom(thisObj);
				}
				else if( this.isPopOutElement( event )){
					this.parseFrom(thisObj);
				}
				return;
			}

			thisObj.parseAndCallback();
		}
		catch(ex){}
	};
	
	this.init(doc);
}

/* Copyright (c)2014 Sky Co., LTD. All rights reserved. */
