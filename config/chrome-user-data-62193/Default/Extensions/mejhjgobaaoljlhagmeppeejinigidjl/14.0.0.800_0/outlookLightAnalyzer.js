//////////////////////////
// Definition of package
//////////////////////////
if (null == SkyFrame) {
	var SkyFrame = {};
}
if (null == SkyFrame.WebSendMail) {
	SkyFrame.WebSendMail = {};
}

if (null == SkyFrame.WebSendMail.OutlookLightAnalyzer) {
	SkyFrame.WebSendMail.OutlookLightAnalyzer = {};
}

if (null == SkyFrame.WebSendMail.OutlookAttachFileAnalyzer) {
	SkyFrame.WebSendMail.OutlookAttachFileAnalyzer = {};
}


/**
 * @brief	trim関数をStringオブジェクトに追加します
 */
if(!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g,'');
	};
}

/**
 * @brief	初期化
 * @param	[in]	doc		docment
 * @param	[in]	sender	送信メソッド
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.InitAnalyzer = function(doc, sender)
{
	if (SkyFrame.WebSendMail.OutlookLightAnalyzer.IsOffice365(doc)) {
		var analyzer = {
			sendLog:				sender,
			isTargetMouseDownEvent:	SkyFrame.WebSendMail.OutlookLightAnalyzer.isTargetMouseDownEvent,
			isTargetKeyDownEvent:	SkyFrame.WebSendMail.OutlookLightAnalyzer.isTargetKeyDownEvent,
			mainProc:				SkyFrame.WebSendMail.OutlookLightAnalyzer.AnalyzeSendMail
		};
		
		var outlookLightAnalyzer = new SkyFrame.WebSendMail.WebSendMailMgr(doc, analyzer);
	}
}

/**
 * @brief	Office365 OutlookLightかどうかを判定します
 * @param	[in]	doc		docment
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.IsOffice365 = function(doc)
{	
	try {
		var urlLower = doc.documentURI.toLowerCase();
		if ((0 <= urlLower.indexOf("outlook.office.com/owa")) ||		// 2回目ログイン以降
		    (0 <= urlLower.indexOf("outlook.office365.com/owa"))) {		// キャッシュクリア後の初回ログイン
			// "ae=Item" か "ae=PreFormAction"が含まれる場合のみ送信画面と判定する
			var querySet = SkyFrame.WebSendMail.OutlookLightAnalyzer.GetQuery(doc);
			if (( SkyFrame.WebSendMail.OutlookLightAnalyzer.ExistQuery(querySet, "ae", "PreFormAction") ) ||
			   (SkyFrame.WebSendMail.OutlookLightAnalyzer.ExistQuery(querySet, "ae", "Item"))) {
			   	return true;
			}
		}
	} catch(ex){}
	return false;
}

/**
 * @brief	URLからクエリを取得します
 * @param	[in]	doc		docment
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.GetQuery = function(doc)
{
	var querySet = {};
	try {	// get query
		var query				= doc.location.search.substring(1);	// 先頭の?を除去
		var queryKeyValueSet	= query.split('&');
		for(var i = 0; queryKeyValueSet.length > i; ++i) {
		    var keyValueSet = queryKeyValueSet[i].split('=');
		    if (1 < keyValueSet.length) {
		    	querySet[keyValueSet[0]] = keyValueSet[1];
		    }
		}
	} catch(ex){}
	return querySet;
}

/**
 * @brief	クエリが存在するかどうかを判定します
 * @param	[in]	querySet	クエリ情報
 * @param	[in]	key			キー
 * @param	[in]	value		値
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.ExistQuery = function(querySet, key, value)
{
	try {
		if (querySet[key]) {
			return (value.toLowerCase() === querySet[key].toLowerCase());	// 小文字化して厳密に完全一致判定
		}
	} catch(ex){}
	return false;
}

/**
 * @brief	メール送信ボタンが押下されたかどうかを判定します
 * @param	[in]	event	イベント
 * @return	結果
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.isMailSendKeyEvent = function(event)
{
	try {
		// 送信ボタンのパターン
		var sendButtonTarget = [
			"a#lnkHdrsend.btn",
			"a#lnkHdrsendcancel.btn"
		];
		
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
		var ret = false;
		var leng = sendButtonTarget.length;
		for (var i = 0; leng > i; ++i) {
			if ($(eventObj).is(sendButtonTarget[i])) {
				ret = true;
				break;
			}
			else if ($(eventObj).parent().is(sendButtonTarget[i])) {
				// 送信ボタンの上にimageなどがある場合そのimageが押された場合ここに来る。
				ret = true;
				break;
			}
			else {
				// NOP
			}
		}
	} catch (ex) {}
	
	return ret;
}

/**
 * @brief	対象のマウスダウンイベントかどうかを判定します
 * @param	[in]	event	イベント
 * @return	結果
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.isTargetMouseDownEvent = function(event)
{
	try {
		var ret = false;
		
		// 送信ボタンなら対象
		ret = SkyFrame.WebSendMail.OutlookLightAnalyzer.isMailSendKeyEvent(event);
	} catch (ex) {}
	
	return ret;
}

/**
 * @brief	対象のキーダウンイベントかどうかを判定します
 * @param	[in]	event	イベント
 * @return	結果
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.isTargetKeyDownEvent = function(event)
{
	try {
		var ret = false;
		if ("KEYDOWN" != event.type.toUpperCase()) {
			// KeyDownイベントではないなら終了。
			return ret;
		}
		
		var keycode = event.which;
		if (13 != keycode) {
			// Enter以外は終了。
			return ret;
		}
		
		// 送信ボタンなら対象
		ret = SkyFrame.WebSendMail.OutlookLightAnalyzer.isMailSendKeyEvent(event);
	} catch (ex) {}
	
	return ret;
}

/**
 * @brief	DOMから受信者の文字列を抜き出します
 * @param	[in]	div	特定のdivElement
 * @return	受信者一覧
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.extractDestText = function(div)
{
	try {
		var tempDest = [];
		var span = div.find("span").filter("span.rwRO");
		if (0 < span.length) {
			
		}
		var leng = span.length;
		for (var i = 0; leng > i; ++i) {
			var dest = $(span.get(i)).text();
			var extra = $("span.sq", span.get(i)).text();
			
			// 不要な文字列を切り取る。
			var index = dest.indexOf(extra);
			if(0 <= index){
				dest = dest.substring(0, index);
			}
			dest = dest.trim();
			if (dest && 0 < dest.length) {
				tempDest.push(dest);
			}
		}
	} catch (ex) {}
	
	return tempDest;
}

/**
 * @brief	メール送信情報を解析します
 * @param	[in]	doc		docment
 * @param	[out]	logData	ログデータ
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.AnalyzeSendMail = function(doc, logData)
{
	try {
		// From
		SkyFrame.WebSendMail.OutlookLightAnalyzer.extractFrom(doc, logData);
		
		// To
		SkyFrame.WebSendMail.OutlookLightAnalyzer.extractTo(doc, logData);
		
		// Cc
		SkyFrame.WebSendMail.OutlookLightAnalyzer.extractCc(doc, logData);
		
		// Bcc
		SkyFrame.WebSendMail.OutlookLightAnalyzer.extractBcc(doc, logData);
		
		// 件名
		SkyFrame.WebSendMail.OutlookLightAnalyzer.extractSubject(doc, logData);
		
		// 添付ファイル
		SkyFrame.WebSendMail.OutlookLightAnalyzer.extractAttach(doc, logData);
		
		// 本文
		SkyFrame.WebSendMail.OutlookLightAnalyzer.extractBody(doc, logData);
		
		// StorageType
		logData.storagetype = 3;
		
	} catch (ex) {}
}

/**
 * @brief	From情報を抜き出します
 * @param	[in]	doc		docment
 * @param	[out]	logData	ログデータ
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.extractFrom = function(doc, logData)
{
	try {
		logData.from = "";
		var title = $("title", doc).text();
		if (title && 0 < title.length) {
			var index = title.lastIndexOf(" - ");
			if(0 <= index){
				title = title.substring(0, index);
			}
			
			logData.from = title.trim();
		}
	} catch (ex) {}
}

/**
 * @brief	To情報を抜き出します
 * @param	[in]	doc		docment
 * @param	[out]	logData	ログデータ
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.extractTo = function(doc, logData)
{
	try {
		logData.to = [];
		var divTo = $("div#divTo", doc);
		if (0 < divTo.length) {
			logData.to = SkyFrame.WebSendMail.OutlookLightAnalyzer.extractDestText(divTo);
			
		}
		
		var txtTo = $("input#txtto", doc).val();
		if (0 < txtTo.length) {
			var destArray = txtTo.split(";");
			var leng = destArray.length;
			for (var i = 0; leng > i; ++i) {
				destArray[i] = destArray[i].trim();
				if (0 < destArray[i].length) {
					logData.to.push(destArray[i]);
				}
			}
		}
	} catch (ex) {}
}

/**
 * @brief	Cc情報を抜き出します
 * @param	[in]	doc		docment
 * @param	[out]	logData	ログデータ
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.extractCc = function(doc, logData)
{
	try {
		logData.cc = [];
		var divCc = $("div#divCc", doc);
		if (0 < divCc.length) {
			logData.cc = SkyFrame.WebSendMail.OutlookLightAnalyzer.extractDestText(divCc);
		}
		
		var txtCc = $("input#txtcc", doc).val();
		if (0 < txtCc.length) {
			var destArray = txtCc.split(";");
			var leng = destArray.length;
			for (var i = 0; leng > i; ++i) {
				destArray[i] = destArray[i].trim();
				if (0 < destArray[i].length) {
					logData.cc.push(destArray[i]);
				}
			}
		}
	} catch (ex) {}
}

/**
 * @brief	Bcc情報を抜き出します
 * @param	[in]	doc		docment
 * @param	[out]	logData	ログデータ
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.extractBcc = function(doc, logData)
{
	try {
		logData.bcc = [];
		var divBcc = $("div#divBcc", doc);
		if (0 < divBcc.length) {
			logData.bcc = SkyFrame.WebSendMail.OutlookLightAnalyzer.extractDestText(divBcc);
		}
		
		var txtBcc = $("input#txtbcc", doc).val();
		if (0 < txtBcc.length) {
			var destArray = txtBcc.split(";");
			var leng = destArray.length;
			for (var i = 0; leng > i; ++i) {
				destArray[i] = destArray[i].trim();
				if (0 < destArray[i].length) {
					logData.bcc.push(destArray[i]);
				}
			}
		}
	} catch (ex) {}
}

/**
 * @brief	件名情報を抜き出します
 * @param	[in]	doc		docment
 * @param	[out]	logData	ログデータ
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.extractSubject = function(doc, logData)
{

	try {
		logData.subject = "";
		var txtSubject = $("input#txtsbj", doc).val();;
		if (0 < txtSubject.length) {
			logData.subject = txtSubject;
		}
	} catch (ex) {}
}

/**
 * @brief	本文情報を抜き出します
 * @param	[in]	doc		docment
 * @param	[out]	logData	ログデータ
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.extractBody = function(doc, logData)
{
	try {
		logData.body = "";
		var bodyFrame = $("textarea[name=txtbdy]", doc);
		if (0 < bodyFrame.length) {
			 logData.body = bodyFrame.val();
		}
	} catch (ex) {}
}

/**
 * @brief	添付情報を抜き出します
 * @param	[in]	doc		docment
 * @param	[out]	logData	ログデータ
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.extractAttach = function(doc, logData)
{
	try {
		logData.attach = [];
		var lnkAtmt = $("a#lnkAtmt", doc);
		var leng = lnkAtmt.length;
		for (var i = 0; leng > i; ++i) {
			var filename = $(lnkAtmt.get(i)).attr("title");
			if (filename && 0 < filename.length) {
				logData.attach.push(filename);
			}
		}
	} catch (ex) {}
}

/**
 * @brief	URLを作成します
 */
SkyFrame.WebSendMail.OutlookLightAnalyzer.BuildUrl = function()
{
	try {
		var url = "LogWebOpr://OutlookLight/SendMail";
		var query = {
			Version: 1
		};
		
		var queryString = "";
		for(var key in query) {
			var value = query[key];
			queryString += key + "=" + value + "&";
		}
		
		if (0 < queryString.length) {
			// 最後の＆を取り除く
			queryString = queryString.substring(0, queryString.length - 1);
			url = url + "?" + queryString;
		}
		
	} catch (ex) {}
	
	return url;
}

SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.BuildUrl = function()
{
	try {
		var url = "LogWebOpr://AttachFile/Forward";
		var query = {
			Version: 1
		};
		
		var queryString = "";
		for(var key in query) {
			var value = query[key];
			queryString += key + "=" + value + "&";
		}
		
		if (0 < queryString.length) {
			// 最後の＆を取り除く
			queryString = queryString.substring(0, queryString.length - 1);
			url = url + "?" + queryString;
		}
		
	} catch (ex) {}
	
	return url;
}

SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.getAttachFile = function(doc, sender)
{
	try {
		var fileSet		= [];
		var storagetype	= 0;
		if (SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.isOffice365(doc)) {
			fileSet		= fileSet.concat(SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.getAttachFile1(doc));
			storagetype = 3;	// LOG_ACCESS_WEB_SERVICE_TYPE_OFFICE365

		} else if (SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.isOutlookComBeta(doc)) {
			fileSet		= fileSet.concat(SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.getAttachFile2(doc));	// 画像ファイル以外の添付
			fileSet		= fileSet.concat(SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.getAttachFile3(doc));	// 画像ファイルの添付
			storagetype = 5;	// LOG_ACCESS_WEB_SERVICE_TYPE_OUTLOOKCOM

		} else if (SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.isOutlookCom(doc)) {
			fileSet		= fileSet.concat(SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.getAttachFile1(doc));
			storagetype = 5;	// LOG_ACCESS_WEB_SERVICE_TYPE_OUTLOOKCOM
		} else {
			return false;
		}
		
		if (0 < fileSet.length) {
			sender({fileset: fileSet, storagetype:storagetype});
			return true;
		}
	} catch(ex){}
	return false;
}

SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.isOffice365 = function(doc)
{	
	try {
		var urlLower = doc.documentURI.toLowerCase();
		if ((0 <= urlLower.indexOf("outlook.office.com/owa")) ||		// 2回目ログイン以降
		    (0 <= urlLower.indexOf("outlook.office365.com/owa"))) {		// キャッシュクリア後の初回ログイン
		    return true;
		}
	} catch(ex){}
	return false;
}


SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.isOutlookCom = function(doc)
{	
	try {
		var urlLower = doc.documentURI.toLowerCase();
		if (0 <= urlLower.indexOf("outlook.live.com/owa")) {
		    return true;
		}
	} catch(ex){}
	return false;
}

SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.isOutlookComBeta = function(doc)
{	
	try {
		var urlLower = doc.documentURI.toLowerCase();
		if ((0 <= urlLower.indexOf("outlook.live.com/mail")) ||
		   (0 <= urlLower.indexOf("outlook.live.com/calendar"))) {
			return true;
		}
	} catch(ex){}
	return false;
}

SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.getAttachFile1 = function(doc)
{
	var fileSet = [];
	try {
		// 添付ファイル情報の取得（１つ分）
		//
		// <div>
		//   <span title="filename">          <- 2. get filename
		//   </span>
		// </div>
		// <span class=attachmentFileSize>    <- 1. search unique key
		// </span>
		//
		
		// 1. search unique key
		var query = $("span.attachmentFileSize", doc);
		for (var index = 0; query.length > index; ++index) {
			try {
				// 2. get filename
				var filename = $(query.get(index)).prev().children("span").attr("title");
				if (filename) {
					{
						// 暫定対応
						var tmp = filename.split("\n");
						if (tmp) {
							for ( var i = 0; tmp.length > i; ++i) {
								if (tmp[i]) {
									var a = tmp[i].trim();
									if (( 0 < a.length) && ( -1 == a.indexOf("https://"))) {
										fileSet.push(a);
									}
								}
							}
						} else {
							if ( 0 < filename.length) {
								fileSet.push(filename);
							}
						}
					}
				}
			} catch(ex2){}
		}
	} catch(ex){}
	
	return fileSet;
}

SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.getAttachFile2 = function(doc)
{
	var fileSet = [];
	try {
		// １ファイル分
		// <div>                                      <- fileInfoBlock
		//   <div>
		//     <div>
		//      filename                              <- 3. get filename
		//     </div>
		//   </div>
		// </div>
		// <div>                                      <- operationBlock
		//   <button>
		//     <div>
		//       <i dat-icon-name="Cancel">           <- 1. search cancel icon
		//       </i>
		//     </div>
		//   </button>
		//   <button>
		//     <div>
		//       <i dat-icon-name="ChevronDownMed">   <- 2. search chevrondownmed icon after cancel icon
		//       </i>
		//     </div>
		//   </button>
		// </div>
		
		// 1. search cancel icon
		var query = $("i[data-icon-name=Cancel]",doc);
		for (var index = 0; query.length > index; ++index) {
			try {
				// 2. search chevrondownmed icon after cancel icon
				// キャンセルアイコンとドロップダウンアイコンがセットの場合は添付ファイルブロックの可能性
				var cancelIcon			= $(query.get(index));
				var chevrondonmedIcon	= cancelIcon.parent().parent().next().find("i[data-icon-name=ChevronDownMed]");
				if (0 < chevrondonmedIcon.length) {
					// 3. get filename
					var operationBlock	= cancelIcon.parent().parent().parent();
					var fileInfoBlock	= operationBlock.prev();
					var filename		= fileInfoBlock.children("div").children("div").attr("title");
					if (filename) {
						{
							// 暫定対応
							var tmp = filename.split("\n");
							if (tmp) {
								for ( var i = 0; tmp.length > i; ++i) {
									if (tmp[i]) {
										var a = tmp[i].trim();
										if (( 0 < a.length) && ( -1 == a.indexOf("https://"))) {
											fileSet.push(a);
										}
									}
								}
							} else {
								if ( 0 < filename.length) {
									fileSet.push(filename);
								}
							}
						}
					}
				}
			} catch(ex2){}
		}
	} catch(ex){}
	return fileSet;
}

SkyFrame.WebSendMail.OutlookAttachFileAnalyzer.getAttachFile3 = function(doc)
{
	var fileSet = [];
	try {
		// １ファイル分
		// <div aria-label="画像.jpg">       <- 3. get filename
		//   <div>
		//     <div>
		//       <i data-icon-name="Edit">   <- 1. search edit icon
		//       </i>
		//       <span>
		//       </span>
		//     </div>
		//   </div>
		//   <div>
		//     <span>
		//       <span>
		//         <div class="ms-Image">    <- 2. search ms-Image class after edit icon
		//           <img src="https://attachment.outlook.office.net/owa/shouji.skygroup.local@gmail.com/service.svc/s/GetAttachmentThumbnail?id=AQMkADAwATNiZmYAZC1mYmMxLWViOGUtMDACLTAwCgBGAAADxQuFsYJTpkKq194ELJOnqQcA%2FD7EeJxB7UuZjQln9t%2BYOAAAAgEPAAAAeWz9OtmfI0esNyrN%2BY88sAAAAKHDraIAAAABEgAQAOyfcDFjzz9NltF9N8KwJso%3D&amp;owa=outlook.live.com&amp;scriptVer=20180216.01&amp;isc=1&amp;X-OWA-CANARY=k48_vd9S0kS24YW-U3XccMCuuhd8etUYpKZzy4w1sKGPkrclQ_PqQBb-a6O_QIUh_R81Gsg7lQk.&amp;token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImVuaDlCSnJWUFU1aWpWMXFqWmpWLWZMMmJjbyJ9.eyJ2ZXIiOiJFeGNoYW5nZS5DYWxsYmFjay5WMSIsImFwcGN0eHNlbmRlciI6Ik93YURvd25sb2FkQDg0ZGY5ZTdmLWU5ZjYtNDBhZi1iNDM1LWFhYWFhYWFhYWFhYSIsImFwcGN0eCI6IntcIm1zZXhjaHByb3RcIjpcIm93YVwiLFwicHJpbWFyeXNpZFwiOlwiUy0xLTI4MjctMjQ1NzU3LTQyMjM3ODk5NjZcIixcInB1aWRcIjpcIjEwNTU1MjI1MDE1NTMwMzhcIixcIm9pZFwiOlwiMDAwM2JmZmQtZmJjMS1lYjhlLTAwMDAtMDAwMDAwMDAwMDAwXCIsXCJzY29wZVwiOlwiT3dhRG93bmxvYWRcIn0iLCJpc3MiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDBAODRkZjllN2YtZTlmNi00MGFmLWI0MzUtYWFhYWFhYWFhYWFhIiwiYXVkIjoiMDAwMDAwMDItMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL2F0dGFjaG1lbnQub3V0bG9vay5vZmZpY2UubmV0QDg0ZGY5ZTdmLWU5ZjYtNDBhZi1iNDM1LWFhYWFhYWFhYWFhYSIsImV4cCI6MTUxOTM2MzM2NiwibmJmIjoxNTE5MzYyNzY2fQ.t9sjM3z02SsWhZQWUPoLZxJk1TYzuKSZWKypxYm1jlqa179tkWPqgb99WLFzp34Wa7kX0FZ3hvH8X9vW-eWbJmA-guFJSS05ITuiHkdRprdqHxiIQHrKSRUq40uRBHtcwfaCIBW9c19RPEZ8mzvRQvhT0e_Ph0DB-JNsDupFJo-wdL1DQZ9KH8gkqsFMobskaoW5fayBOTkS5yMsWUkm_gdSNOBI5r82d0CNpM0Pau03rXR3XyOCe_YiyNce3t5AFH9axl9c-odzl4EoLFb7xKJ1TVsRNBarItj8yIxRNNEvSTIdOsWxIEIfy7jnG0GT3FudY2jEfABBZEED5k5vCg&amp;animation=true">
		//         </div>
		//       </span>
		//     </span>
		//   </div>
		// </div>

		
		// 1. search edit icon
		var query = $("i[data-icon-name=Edit]",doc);
		for (var index = 0; query.length > index; ++index) {
			try {

				// 2. search ms-Image class after edit icon
				// 編集アイコンと画像クラスがセットの場合は画像添付ファイルブロックの可能性
				var editIcon	= $(query.get(index));
				var msImage		= editIcon.parent().parent().next().find("div.ms-Image");
				if (0 < msImage.length) {

					// 3. get filename
					var fileBlock	= editIcon.parent().parent().parent();
					var filename	= fileBlock.attr("aria-label");
					if (filename) {
						{
							// 暫定対応
							var tmp = filename.split("\n");
							if (tmp) {
								for ( var i = 0; tmp.length > i; ++i) {
									if (tmp[i]) {
										var a = tmp[i].trim();
										if (( 0 < a.length) && ( -1 == a.indexOf("https://"))) {
											fileSet.push(a);
										}
									}
								}
							} else {
								if ( 0 < filename.length) {
									fileSet.push(filename);
								}
							}
						}
					}
				}
			} catch(ex2){}
		}
	} catch(ex){}
	return fileSet;
}
