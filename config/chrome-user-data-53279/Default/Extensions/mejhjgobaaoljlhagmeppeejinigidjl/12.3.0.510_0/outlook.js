/* Copyright (c)2014 Sky Co., LTD. All rights reserved. */

/**
 * @file		outlook.js
 * @brief		Outlook Web AppアドオンのJavaScript部
 * @date		2014/04/07
 * @author		Morio Tanioku
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

var CLogOutlookAnalyser = function(doc, browserId ) {
	
	this.rootDoc = doc;
	this.browserId = browserId;
	this.from = "";
	this.fromTitle = "";
	
	/**
	 * 初期化
	 */
	this.init = function(doc) {
		var thisObj = this;
				
		doc.addEventListener("mousedown", function (event) { thisObj.mouseDownEventHandler(event, thisObj); }, true);
		doc.addEventListener("load", function (event) { thisObj.DocumentLoadEventHandler(event, thisObj); }, true);
		doc.addEventListener("keydown", function (event) { thisObj.keyDownEventHandler(event, thisObj); }, true);

		$(doc.getElementsByTagName("iframe")).each(function() {
			try {
				var iframeObj = this;
				thisObj.iframeSetkeydownEvent( iframeObj, thisObj );
			}
			catch(ex){
			}
		});

		// 差出人要素取得
		this.getDispFrom();
		this.getFromTitle();

	};

	this.DocumentLoadEventHandler = function( event, thisObj ) {
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
		if( $(eventObj).is("iframe")){
			//iframeにloadイベントを仕掛ける
			//本文部分のdocumentが差し替わっているため
			thisObj.iframeSetkeydownEvent( eventObj, thisObj );
			eventObj.addEventListener("load", function (event) { thisObj.iframeloadEventHandler(event, thisObj); }, true);
		}
	}

	//iframeがloadされた際のイベント
	this.iframeloadEventHandler = function( event, thisObj ) {
		try {
			var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
			if( $(eventObj).is("iframe")){
				thisObj.iframeSetkeydownEvent( eventObj, thisObj );
			}
		}
		catch(ex){
		}
	}

	//iframeにkeydownイベントを追加
	this.iframeSetkeydownEvent = function(iframeObj, thisObj ) {
		try {
			if( !iframeObj.contentWindow.document.body.getAttribute("addedeventkeydownsk"))	{
				iframeObj.contentWindow.document.addEventListener("keydown", function (event) { thisObj.keyDownEventHandler(event, thisObj); }, true);
				iframeObj.contentWindow.document.body.setAttribute("addedeventkeydownsk", true);
			}
		}
		catch(ex){
		}
	}

	/**
	 * メール送信イベント判定
	 */
	this.isMailSendKeyEvent = function(event, thisObj) {
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
		if ($(eventObj).is(".sendButton.o365button")) {
			return true;
		} else if ($(eventObj).parent().is(".sendButton.o365button")) {
			return true;
		} else if ( $(eventObj).is("a#lnkHdrsend.btn")) {			//Lightバージョン
			return true;
		} else if ( $(eventObj).parent().is("a#lnkHdrsend.btn")) {	//Lightバージョン
			return true;
		} else if( $(eventObj).is("button") || $(eventObj).parent().is("button")){
			var button = $(eventObj);
			if( $(eventObj).parent().is("button")){
				button = $(eventObj).parent();
			}

			var children = $(button).children("span");
			var numberOfchild = children.length;

			for( var i = 0 ; i < numberOfchild; ++i){
				var classname = $(children.get(i)).attr("class");
				if( classname.toLowerCase().indexOf("mailsend") != -1 ){
					return true;
				}
				if( ($(children.get(i)).text().toLowerCase().indexOf("送信") != -1 ) || 
					($(children.get(i)).text().toLowerCase().indexOf( "send" ) != -1 )){
					return true;
				}
				
			}

			try {
				if( ( $(button).attr("title").toLowerCase().indexOf( "送信" ) != -1 ) ||
				( $(button).attr("title").toLowerCase().indexOf( "send" ) != -1 ))
				{
					return true;
				}
			}
			catch(e){
			}
			return false;
		}
		else {
			return false;
		}
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
		
		if( $(eventObj).is("span") || $(eventObj).is("button")){
			var text = $(eventObj).text();
			if( 0 < text.length ){
				var KEY = ["電子メール メッセージ", "Email message"];
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
	
	/**
	 * 別ウィンドウで開くイベント判定
	 */
	this.isPopOutKeyEvent = function(event, thisObj) {
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
		if ($(eventObj).is("span.wf-owa-pop-out-hover")) {
			return true;
		}
		else if($(eventObj).is("span.ms-Icon--popout")) {
			return true;
		}

		if ($(eventObj).is("button")) {
			if (0 < $(eventObj).contents().filter("span.wf-owa-pop-out-hover").length) {
				return true;
			}
			else if (0 < $(eventObj).contents().filter("span.ms-Icon--popout").length) {
				return true;
			}
		}
		
		return false;
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
			var KEY = ["textarea[aria-label='メッセージ本文']","textarea[aria-label='Message Body']", "textarea[aria-label='Message body']"];
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
		
		return bElementExist;
	}

	/**
	 * ストレージの取得
	 */
	this.getStorage = function() {
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
		var storage = thisObj.getStorage();
		thisObj.getFromTitle();
		var storagename = "fromRecipient_" + this.rootDoc.domain;
		storage.setItem(storagename, thisObj.fromTitle);

		var sessionstorage = thisObj.getsessionStorageol();
		sessionstorage.setItem(storagename, thisObj.fromTitle);
	
	}
	
	this.getStorageFrom = function(thisObj) {
		try {
			var storagename = "fromRecipient_" + thisObj.rootDoc.domain;
			return this.getStorage().getItem(storagename);
		}
		catch(e){}
		
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
		var naviElement = $("div.o365cs-nav-rightSideButton", thisObj.rootDoc);
		if (naviElement && 1 <= naviElement.length) {
			var fromElement = $("button.o365button", naviElement.get(0));
			if (fromElement && 1 == fromElement.length) {
				return fromElement.attr("aria-label");
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
						return;
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

	/* 会議で全員に返信 */
	this.GetToCcBcc2 = function( toccbcc ) {
		
		var to = "";
		var cc = "";
		var bcc = "";
		var str = "";
		// 宛先/CC/BCC
		var bElementExist = false;
		
		var addressElements = $("span.ms-fwt-sl.bidi", this.rootDoc); // 各要素からアドレス要素リストを取得
		if (addressElements.length > 0 ) {	// 取得できない場合は新フォーマットで試してみる
			var nbsp = String.fromCharCode(160);
			for (j = 0; j < addressElements.length; j++) {
				bElementExist = true;
				var address = addressElements.get(j).textContent.split(nbsp).join("");
				to = to + address + ";";
			}
		}
		else {
			// 2017/10/18 span._pe_l._pe_Pを追加
			// 2016/10/03 span._pe_l._pe_Nを追加
			// 2016/06/07 span._pe_l._pe_Jを追加
			var spans = $("span._pe_l._pe_N, span._pe_l._pe_J, span._pe_h._pe_D, span._pe_l._pe_P", this.rootDoc); // 各要素からアドレス要素リストを取得
			var nbsp = String.fromCharCode(160);
			for (var i = 0; i < spans.length; i++) {
				// 2016/10/03 span[autoid='_pe_o']を追加
				addressElements = $("span[autoid='_pe_o'], span[autoid='_pe_k'], span[autoid='_pe_h'], span._pe_U._pe_q, span._pe_W._pe_q", spans.get(i)); // 各要素からアドレス要素リストを取得
				var address = "";
				/* アカウントAでは_pe_Uと_pe_Wと両方ある、アカウントB(新しい側と思われる)では_pe_Wのみという場合があった。
				_pe_Wには不要なデータが入っているため、
				_pe_Uがとれればこれだけ取得する。*/
				if( addressElements.length > 0 ){
					address = addressElements.get(0).textContent.split(nbsp).join("");
				}

				if( address.length > 0 ){
					
					bElementExist = true;
					to = to + address + ",";
				}
			}
		}

		if(bElementExist){
			toccbcc.to = to;
		}
		
		return bElementExist;
	}

	this.GetSubject = function( _subject ){
		var bElementExist = false;

		var subjectElement = $("input[aria-label='件名、'], input[aria-label='Subject,']", this.rootDoc);	// 2016/12/14 追加
		if( subjectElement.length == 0 ){
			subjectElement = $("input[aria-labelledby='MailCompose.SubjectWellLabel'], input[aria-label='イベントのタイトルを追加'], input[aria-label='Add a title for the event']", this.rootDoc);	// 件名要素内の固有属性で決め打ち
		}
		
		if (0 < subjectElement.length) {
			bElementExist = true;
			_subject.subject = $(subjectElement.get(0)).val();
		}

		return bElementExist;
	}

	this.getReceiverTextLight = function ( DivToCcBcc ) {
		var ret = "";
		if( 0 < DivToCcBcc.length )
		{
			var numberOfBlocks = DivToCcBcc.length;
			for (i = 0; i < numberOfBlocks; ++i) {
				if( 0 < i  ) {
					ret = ret + ",";
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
				var SpanTo = DivTo.find( "span" ).filter("span.rwRO,span.rwURO");
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
				var SpanCc = DivCc.find( "span" ).filter("span.rwRO,span.rwURO");
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
				var SpnBcc = DivBcc.find( "span" ).filter("span.rwRO,span.rwURO");
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
	this.Istransferevent = function(){
		try {
			var popup = $("div.peekShadowAll.peekPopup", this.rootDoc );
			if( popup.length > 0 ){
				var Spans = popup.find("span");
				for( var i = 0 ; i < Spans.length; ++i ){
					if( ( Spans.get(i).textContent == "イベントの転送") || 
						( Spans.get(i).textContent == "Forward event") ) {
						return true;
					} 
				}
			}
		} catch(e){}

		return false;
	}
	/* イベントの転送 */
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

	/* イベントの転送の本文 */
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

	this._getAttachmentSub = function( attachmentBlocks, _attachments ){
		var count = 0;
		var attachments = "";
		var numberOfBlocks = attachmentBlocks.length;
		for (i = 0; i < numberOfBlocks; ++i) {
			//var filenameElements = $("span[title]", attachmentBlocks.get(i));
			var filenameElements = $(attachmentBlocks.get(i)).children("div").children("span");
			var numberOfFiles = filenameElements.length;
			for (j = 0; j < numberOfFiles; ++j) {
				//var filename = $(filenameElements.get(j)).attr("title");

				var style = $(filenameElements.get(j)).parent().attr("style");
				if( style ){
					if( style.length > 0 ){
						if( style.replace(/\s+/g, "").indexOf( "display:none" ) != -1 ){
							continue;
						}
					}
				}
				var autoid = $(filenameElements.get(j)).attr("autoid");
				if( autoid == null ) {
					continue;
				}

				var filename =  $(filenameElements.get(j)).text();
				if (filename.length <= 0) {
					continue;
				}
				if (0 != count) {
					attachments = attachments + "/";
				}
				
				attachments = attachments + filename;
				++count;
			}
		}
		
		_attachments.attachments = attachments;
	}
	
	
	this.getCalenderEventAttachment = function( _attachments ){
		var bElementExist = false;

		var composepanel = $("div[aria-label='イベントの作成フォーム'], div[aria-label='Event compose form']", this.rootDoc);	// 要素内の固有属性で決め打ち
		if (0 < composepanel.length) {
			var attachmentBlocks = $(composepanel.get(0)).find("a.o365button[role='link']");
			if (0 < attachmentBlocks.length) {
				bElementExist = true;
				this._getAttachmentSub( attachmentBlocks, _attachments );
			}
		}

		return bElementExist;
	}

	// 2016/12/14
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
			
			var toccbccaddr;
			if( headerpanel.length > 0 ){
				toccbccaddr = $( "div.allowTextSelection", headerpanel );
			}
			
			var numberOftoccbcc = toccbccaddr.length;
			for (j = 0; j < numberOftoccbcc; ++j) {
				var addr = $( "span.allowTextSelection", toccbccaddr.get(j))
				var numberOfaddr = addr.length;
				var str = "";
				for (k = 0; k < numberOfaddr; ++k) {
					if( str.length > 0 ){
						str = str + ",";
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

			if( bElementExist ){
				toccbcc.to = to;
				toccbcc.cc = cc;
				toccbcc.bcc = bcc;
			}
		} catch(e){}
		
		return bElementExist;
	}
	
	/**
	 * メール情報の抽出とログ出力用コールバックの呼び出し
	 */
	this.parseAndCallback = function() {
		if (null == g_SendMailHandler) {
			return;
		}
		
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
		
		var bcalender = $(this.rootDoc.getElementById("MeetingCompose.CalendarLabel"));
		var trasferevent = this.Istransferevent();
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
						if( (0 >= bcalender.length ) || isPopup ){	// 予定表(ポップアップ以外)の場合はstorageからとらない。
							//console.log( "getDispFrom()で取れず" );
							from  = this.getStorageFrom(this);	// ローカルストレージ
							if (from == null || 0 >= from.length) {
								from = this.getsessionStorageFrom( this );	// セッションストレージ
							}
						}
						
						if (from == null || 0 >= from.length) {
							from = this.fromTitle;	// 保持しているタイトル
							if (from == null || 0 >= from.length) {
								if( false == isPopup ){	// 別ウィンドウのタイトルは件名の場合があるので、この場合は取得しない
									this.getFromTitle();
									from = this.fromTitle;			// ポップアップでなければ、現在のタイトルを取り直し
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

			if (from == null || 0 >= from.length) {
				from = "<取得情報なし>";
			}

			var conductorContent2 = null;
			
			// 宛先/CC/BCC
			var toccbcc_spec = { to:"", cc:"", bcc:"" };
			bExist = false;
			if( bcalender.length > 0){	//予定表
				bExist = this.GetToCcBcc2( toccbcc_spec );
				if( false == bExist ) {
					bErr = true;
				}
				else {
					to = toccbcc_spec.to;
					cc = toccbcc_spec.cc;
					bcc = toccbcc_spec.bcc;
				}
			}
			else if( trasferevent ){	//イベントの転送
				bExist = this.GetToCcBcc3( toccbcc_spec );
				if( false == bExist ) {
					bErr = true;
				}
				else {
					to = toccbcc_spec.to;
					cc = toccbcc_spec.cc;
					bcc = toccbcc_spec.bcc;
				}
			}
			else {
				bExist = this.GetToCcBccMail( toccbcc_spec );	// 2016/12/14
				if( true == bExist ) {
					to = toccbcc_spec.to;
					cc = toccbcc_spec.cc;
					bcc = toccbcc_spec.bcc;
				}
				else {
					var conductorContent = null;
					var smplEdit = null;
					if (!isPopup) {
						conductorContent = $("div.allowTextSelection[TempId*=readingpaneView]", this.rootDoc);
						if (0 == conductorContent.length) {
							smplEdit = $("table.edtMsg", this.rootDoc);
							if( 0 == smplEdit.length ) {
								conductorContent2 = $("div.conductorContent[aria-label='作成パネル']", this.rootDoc);
								if( conductorContent2.length == 0 ){
									conductorContent2 =  $("div.conductorContent[aria-label='Compose Panel']", this.rootDoc);
									if( conductorContent2.length == 0 ){
										conductorContent2 = $(this.rootDoc);
									}
								}
							}
						}
					} else {
						conductorContent = $(this.rootDoc);
					}
					if ( 0 < conductorContent.length) {
						var toCcBccBlocks = conductorContent.find("div.allowTextSelection");
						var numberOfBlocks = toCcBccBlocks.length;
						var bElementExist = false;
						var index = 0;
						for (i = 0; i < numberOfBlocks; ++i) {
							var addressElements = $("span.allowTextSelection", toCcBccBlocks.get(i));
							var addressElements2 = $("input.allowTextSelection", toCcBccBlocks.get(i));
							var addressElements3 = $("span.disableTextSelection", toCcBccBlocks.get(i));
							var numberOfAddresses = addressElements.length;
							var numberOfAddresses2 = addressElements2.length;
							var numberOfAddresses3 = addressElements3.length;
							if (numberOfAddresses <= 0 && numberOfAddresses2 <= 0 && numberOfAddresses3 <= 0) {
								continue;
							}
							
							bElementExist = true;
							
							for (j = 0; j < numberOfAddresses; ++j) {
								var address = $(addressElements.get(j)).html();
								switch (index) {
								case 0:
									if( to.length > 0 ){
										to = to + ",";
									}
									to = to + address;
									break;
								case 1:
									if( cc.length > 0 ){
										cc = cc + ",";
									}
									cc = cc + address;
									break;
								case 2:
									if( bcc.length > 0 ){
										bcc = bcc + ",";
									}
									bcc = bcc + address;
									break;
								}
							}
							for (k = 0; k < numberOfAddresses2; ++k) {
								var address = $(addressElements2.get(k)).val();
								switch (index) {
								case 0:
									if( to.length > 0 ){
										to = to + ",";
									}
									to = to + address;
									break;
								case 1:
									if( cc.length > 0 ){
										cc = cc + ",";
									}
									cc = cc + address;
									break;
								case 2:
									if( bcc.length > 0 ){
										bcc = bcc + ",";
									}
									bcc = bcc + address;
									break;
								}
							}
							for (k = 0; k < numberOfAddresses3; ++k) {
								var address = $(addressElements3.get(k)).text();
								switch (index) {
								case 0:
									if( to.length > 0 ){
										to = to + ",";
									}
									to = to + address;
									break;
								case 1:
									if( cc.length > 0 ){
										cc = cc + ",";
									}
									cc = cc + address;
									break;
								case 2:
									if( bcc.length > 0 ){
										bcc = bcc + ",";
									}
									bcc = bcc + address;
									break;
								}
							}
							
							++index;
						}
						
						if( false == bElementExist ) {
							bErr = true;
						}
					}
					else if( (null != smplEdit) && ( 0 < smplEdit.length )){
						var toccbcc = { to:"", cc:"", bcc:"" };
						bExist = this.GetToCcBccLight( toccbcc );
						if( false == bExist ) {
							bErr = true;
						}
						else {
							to = toccbcc.to;
							cc = toccbcc.cc;
							bcc = toccbcc.bcc;
						}

					}
					else if( 0 < conductorContent2.length ){
						var toCcBccBlocks = conductorContent2.find("div.allowTextSelection");
						var numberOfBlocks = toCcBccBlocks.length;
						var bElementExist = false;
						var index = 0;
						for (i = 0; i < numberOfBlocks; ++i) {
							if( $(  toCcBccBlocks.get(i) ).attr("tabindex") == null )
							{
								continue;
							}

							var addressElements = $("span.allowTextSelection", toCcBccBlocks.get(i));
							var addressElements2 = $("input.allowTextSelection", toCcBccBlocks.get(i));
							var addressElements3 = $("span.disableTextSelection", toCcBccBlocks.get(i));
							var numberOfAddresses = addressElements.length;
							var numberOfAddresses2 = addressElements2.length;
							var numberOfAddresses3 = addressElements3.length;
							if (numberOfAddresses <= 0 && numberOfAddresses2 <= 0 && numberOfAddresses3 <= 0) {
								continue;
							}
							
							bElementExist = true;
							
							for (j = 0; j < numberOfAddresses; ++j) {
								var address = $(addressElements.get(j)).text();
								switch (index) {
								case 0:
									if( to.length > 0 ){
										to = to + ",";
									}
									to = to + address;
									break;
								case 1:
									if( cc.length > 0 ){
										cc = cc + ",";
									}
									cc = cc + address;
									break;
								case 2:
									if( bcc.length > 0 ){
										bcc = bcc + ",";
									}
									bcc = bcc + address;
									break;
								}
							}
							for (k = 0; k < numberOfAddresses2; ++k) {
								var address = $(addressElements2.get(k)).val();
								if (0 < address.length) {
									switch (index) {
									case 0:
										if( to.length > 0 ){
											to = to + ",";
										}
										to = to + address;
										break;
									case 1:
										if( cc.length > 0 ){
											cc = cc + ",";
										}
										cc = cc + address;
										break;
									case 2:
										if( bcc.length > 0 ){
											bcc = bcc + ",";
										}
										bcc = bcc + address;
										break;
									}
								}
							}

							for (k = 0; k < numberOfAddresses3; ++k) {
								var address = $(addressElements3.get(k)).text();
								if (0 < address.length) {
									switch (index) {
									case 0:
										if( to.length > 0 ){
											to = to + ",";
										}
										to = to + address;
										break;
									case 1:
										if( cc.length > 0 ){
											cc = cc + ",";
										}
										cc = cc + address;
										break;
									case 2:
										if( bcc.length > 0 ){
											bcc = bcc + ",";
										}
										bcc = bcc + address;
										break;
									}
								}
							}
							
							index++;
						}

						if( false == bElementExist ) {
							var toccbcc = { to:"", cc:"", bcc:"" };
							bExist = this.GetToCcBcc2( toccbcc );
							if( false == bExist ) {
								bErr = true;
							}
							else {
								to = toccbcc.to;
								cc = toccbcc.cc;
								bcc = toccbcc.bcc;
							}
						}
					}
					else {
						bErr = true;
					}
				}
			}

			// 件名
			var _subject = {subject:""};
			bExist = false;
			if( trasferevent ){	//イベントの転送
				bExist = this.getTransferEventSubject( _subject );
				subject = _subject.subject;
			}
			else if( bcalender.length > 0){	//予定表
				bExist = this.getCalenderEventSubject( _subject );
				subject = _subject.subject;
			}
			else {
				bExist = this.GetSubject( _subject );
				if( false == bExist ){
					if( null != smplEdit ){
						if( 0 < smplEdit.length ) {
							subjectElement = smplEdit.find("input#txtsbj");
							if( subjectElement.length > 0 )
							{
								subject = subjectElement.val();
							}
							else {
								bErr = true;
							}
						}
						else {
							bErr = true;
						}
					}
					else {
						bErr = true;
					}
				}
				else {
					subject = _subject.subject;
				}
			}
			
			// 添付ファイル
			if( bcalender.length > 0){	//予定表
				var _attachments = {attachments:""};
				this.getCalenderEventAttachment( _attachments );
				attachments = _attachments.attachments;
			}
			else {
				var attachmentBlocks = null;
				if( conductorContent2 != null ){
					attachmentBlocks = $("a.o365button[role='link']", conductorContent2);
				}
				else{
					attachmentBlocks = $("a.o365button[role='link']", this.rootDoc);
				}

				if (0 < attachmentBlocks.length) {
					var _attachments = {attachments:""};
					this._getAttachmentSub( attachmentBlocks, _attachments );
					attachments = _attachments.attachments;
				}
				else {	//簡易版か？
					if( null != smplEdit ){
						if( 0 < smplEdit.length )
						{
							var divAtt = smplEdit.find( "div#divAtt" );
							attachmentBlocks = divAtt.find( "span#spnAtmt" );
							if( 0 < attachmentBlocks.length )
							{
								var count = 0;
								var numberOfBlocks = attachmentBlocks.length;
								for (i = 0; i < numberOfBlocks; ++i) {
									var filename = $("a#lnkAtmt", attachmentBlocks.get(i)).attr("title");

									if (filename.length <= 0) {
										continue;
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
			}
			// 本文
			var _body = {body:""};
			bExist = false;
			if( trasferevent ){	//イベントの転送
				bExist = this.getTrasferEventBody( _body );
				body = _body.body;
			}
			else if( bcalender.length > 0){	//予定表
				bExist = this.getCalenderEventBody( _body );
				body = _body.body;
			}
			if(  false == bExist ){
				bExist = this.GetBody( _body );
				if(  false == bExist ){
					//下書きから表示した場合、bodyが0になる。その場合下のシーケンスでなければ取得できない
					//IEの場合は、bodyが0にならなかったので、このbodyの長さの処理を入れていない。
					var bTextArea = false;
					var bodyFrame = $("iframe#EditorBody", this.rootDoc);
					if (1 == bodyFrame.length) {
					
						var isText = false;
						var formatbar = $("div#EditorFormatBar", this.rootDoc);
						if( formatbar == null ) {
							formatbar = $("div.formatbar", this.rootDoc);
						}
		
						if( formatbar != null ) {
							var display = formatbar.css("display");
		
							if( display == "none" )
							{
								isText = true;
							}
						}
						
						if( isText ){	//テキスト形式
							body = $("textarea", bodyFrame.parent()).val();
							if (null == body) {
								body = "";
								bErr = true;
							}
						}
						else {	//HTML形式
							var bodyElement = $("div#MicrosoftOWAEditorRegion.ms-rtestate-write", bodyFrame.contents());
							if (1 <= bodyElement.length) {	//今はおそらくここは通らない
								body = bodyElement.html();
							}
							else {
								bodyElement = $("body", bodyFrame.contents());
								if (1 <= bodyElement.length) {
									body = bodyElement.html();
									if( body.length == 0 ) {
										//HTML形式からテキスト形式に変更するとテキスト形式だがここに入ってくる場合がある。
										bTextArea = true;
									}
								}
								else {
									bErr = true;
								}
							}
						}
					} else {
						bodyFrame = $("td.bdy", this.rootDoc).find("textarea");
						if (0 < bodyFrame.length) {
							 body = bodyFrame.val();
						}
						else {
							//2015/08/07対応  HTML形式
							//下書きの場合　div#divtagdefaultwrapper
							bodyFrame = $("div.allowTextSelection", this.rootDoc).find("div#divtagdefaultwrapper");
							if (0 < bodyFrame.length) {
								//2つ上のdisplayがnoneの場合はテキストの可能性
								display = $(bodyFrame).parent().parent().css("display");
								if( display != "none" )
								{
									body = $(bodyFrame).html();
								}
							}
							else{	//新規作成の場合は"div#divtagdefaultwrapper"がない
								bodyFrame = $("div.allowTextSelection", this.rootDoc);
								for( var q = 0; q < bodyFrame.length; ++q ){
									var arialabel = $(bodyFrame.get(q)).attr("aria-label");
									if( typeof arialabel !== 'undefined' && arialabel !== false ){
										var tabindex = $(bodyFrame.get(q)).attr("tabindex");
										if( tabindex == 0 ){
											display = $(bodyFrame.get(q)).parent().css("display");
											if( display != "none" )
											{
												body = $(bodyFrame.get(q)).html();
												break;
											}
										
										}
									}
								}
							}
		
							if( body.length == 0 ) {
								bTextArea = true;
							}
						}
					}
		
					if( bTextArea == true ) {
						bodyFrame = $("body", this.rootDoc).find("textarea");
						if (0 < bodyFrame.length){
							var bbodyEist = false;
							for( p = 0 ; p < bodyFrame.length; ++p ){
								//var index = bodyFrame[p].className.indexOf("placeholderText");
								//if( index == -1 ) {
									body = bodyFrame[p].value + body;
									bbodyEist = true;
								//	break;
								//}
							}
							
							if( bbodyEist == false ){	//想定しているbodyが見つからない
								bErr = true;
							}
						}
						else {
							bErr = true;
						}
					}
				}
				else {
					body = _body.body;
				}
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
			WAET_WEBACCESS_OUTLOOK_WEB_APP,
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
	this.getGmailSendKeydownEvent = function (event) {
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
		
		// スペースキーに場合
/*		if (keycode == 32) {
			return KEYEVENT_SPACE;
		}
		// Shift同時押しの場合 
		else if (shift) { 
			if (keycode == 13) { 
				return KEYEVENT_SJIS_ENTER;
			} 
		}
		// Ctrl同時押しの場合 
		else */if (ctrl) { 
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
	this.keyDownEventHandler = function (event, thisObj) {
		// エンター系のイベントでない場合は無視
		var keyEventType = thisObj.getGmailSendKeydownEvent(event);
		if (KEYEVENT_UNKNOWN == keyEventType) {
			return;
		}

		var bSend = false;
		var bSendButton = false;
		if( keyEventType == KEYEVENT_ENTER ) {
			if( bSend == false ) {
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
				bSend = true;
			}
		}
		else if( keyEventType == KEYEVENT_CTRL_ENTER ||
				 keyEventType == KEYEVENT_ALT_S ) {
			bSend = true;
		}

		if( bSend == true )
		{
			thisObj.parseAndCallback();
		}	
	};
	
	/**
	 * マウスダウンハンドラ
	 */
	this.mouseDownEventHandler = function (event, thisObj)
	{
		if (thisObj.isMailSendKeyEvent(event, thisObj)) {
			// 1回クリックしただけで6回イベントが通知されるので、そのうちの1回だけ処理するためのおまじない。
			var eventButton = (event.originalTarget) ? event.originalTarget : event.srcElement;
			if (!eventButton.getAttribute('addedeventmousedown')) {
				eventButton.addEventListener("mousedown", function(event) {thisObj.parseAndCallback();}, true);
				eventButton.setAttribute('addedeventmousedown', true);
			}
		}
		else {
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
	};
	
	this.init(doc);
}

/* Copyright (c)2014 Sky Co., LTD. All rights reserved. */
