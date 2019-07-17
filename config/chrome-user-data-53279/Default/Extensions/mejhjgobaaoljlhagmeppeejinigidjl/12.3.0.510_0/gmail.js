/* Copyright (c)2006-2009 Sky Co., LTD. All rights reserved. */

/**
 * @file		gmail.js
 * @brief		GMAILアドオンのJavaScript部
 * @date		2013/07/22
 * @author		misaki-s
 * @attention	
 */

var SEARCH_BASIC_SENDBUTTON_SELECT = "input[type='submit'][value='送信'],input[type='submit'][value='Send']";
var SEARCH_BASIC_SIMPLE_REPLY_SELECT = "input[type='submit'][value='返信オプション'],input[type='submit'][value='More Reply Options']";
var SEARCH_BASIC_SIMPLE_TO_REPLY_SELECT = "input#reply[type='radio']:checked";
var SEARCH_BASIC_SIMPLE_TO_REPLY_LABEL_SELECT = "label[for='reply']";
var SEARCH_BASIC_SIMPLE_TO_REPLYALL_SELECT = "input#replyall[type='radio']:checked";
var SEARCH_BASIC_SIMPLE_TO_REPLYALL_LABEL_SELECT = "label[for='replyall']";

var SEARCH_BASIC_SIMPLE_TO_REPLY_REMOVE_STRING = "To: ";
var SEARCH_BASIC_SIMPLE_TO_REPLYALL_REMOVE_STRING_J = "全員に: ";
var SEARCH_BASIC_SIMPLE_TO_REPLYALL_REMOVE_STRING_E = "To all: ";

var SEARCH_BASIC_SIMPLE_SUBJECT_PHASE1_SELECT = "a[href='?\\&']:has(font:contains('受信トレイ')),a[href='?\\&']:has(font:contains('Inbox'))";
var SEARCH_BASIC_SIMPLE_SUBJECT_PHASE2_SELECT = "h2 > font";
var SEARCH_BASIC_SIMPLE_TO_SELECT = "td:first";

var SEARCH_BASIC_FROM_SELECT = "div#guser > nobr > b:first";
var SEARCH_BASIC_TO_SELECT = "*[name='to']";
var SEARCH_BASIC_CC_SELECT = "*[name='cc']";
var SEARCH_BASIC_BCC_SELECT = "*[name='bcc']";
var SEARCH_BASIC_SUBJECT_SELECT = "*[name='subject']";
var SEARCH_BASIC_BODY_SELECT = "*[name='body']";
var SEARCH_BASIC_QUICK_REPLY_NEW_ATTACHMENT_SAVE_SELECT = "input[type='hidden'][name='attach'] + b";
var SEARCH_BASIC_NEW_ATTACHMENT_SAVE_SELECT = "input[name='attach']:checked + b";
var SEARCH_BASIC_NEW_ATTACHMENT_SELECT = "input[type='file']";

var SEARCH_STANDARD_FROM_SELECT = "*[name='from']";
var SEARCH_STANDARD_TO_SELECT = "*[name='to']";
var SEARCH_STANDARD_CC_SELECT = "*[name='cc']";
var SEARCH_STANDARD_BCC_SELECT = "*[name='bcc']";
var SEARCH_STANDARD_SUBJECT_SELECT = "input[name='subject']";
var SEARCH_STANDARD_SUBJECTBOX_SELECT = "input[name='subjectbox']";
var SEARCH_STANDARD_BODY_SELECT = "input[name='body']";

var SEARCH_STANDARD_OLD_BODY_IFRAME_SELECT = "form iframe";
var SEARCH_STANDARD_OLD_SENDBUTTON_SELECT_ONE_1 = "div[role='button']";
var SEARCH_STANDARD_OLD_SENDBUTTON_SELECT_ONE_2 = "b:contains('送信'),b:contains('送信 \\& アーカイブ'),b:contains('Send'),b:contains('Send \\& Archive')";
var SEARCH_STANDARD_OLD_SENDBUTTON_SELECT_TWO = "div[role='button']:contains('送信'),div[role='button']:contains('送信 \\& アーカイブ'),div[role='button']:contains('Send'),div[role='button']:contains('Send \\& Archive')";
var SEARCH_STANDARD_OLD_SAVE_ATTACHMENT_SELECT = "input[name='attach']:checked + a";
var SEARCH_STANDARD_OLD_ATTACHMENT_SELECT = "span[role='link']:contains('別のファイルを添付'),span[role='link']:contains('Attach another file')";
var SEARCH_STANDARD_OLD_ATTACHMENT_PREV_SELECT = "div input:checked + span";
var SEARCH_STANDARD_OLD_ATTACHMENT_UPLOADING_SELECT = "span[role='link']:contains('キャンセル'),span[role='link']:contains('Cancel')";

var SEARCH_STANDARD_NEW_EXCLUDE_ELEMENT_SELECT = "label[data-tooltip='連絡先の選択'],label[data-tooltip='Select Contacts']";
var SEARCH_STANDARD_NEW_DIALOG_SEARCH_SELECT = SEARCH_STANDARD_TO_SELECT;
var SEARCH_STANDARD_NEW_BODY_IFRAME_SELECT = "div[aria-label='メッセージ本文'] iframe,div[aria-label='Message Body'] iframe";
var SEARCH_STANDARD_NEW_BODY_DIV_SELECT = "div[role='textbox'][aria-label='メッセージ本文'],div[role='textbox'][aria-label='Message Body']";
var SEARCH_STANDARD_NEW_SENDBUTTON_SELECT = "div[role='button'][data-tooltip]:contains('送信'),div[role='button'][data-tooltip]:contains('送信と'),div[role='button'][data-tooltip]:contains('Send'),div[role='button'][data-tooltip]:contains('Send \\+')";
var SEARCH_STANDARD_NEW_SENDBUTTON_ARCHIVE_IMG_SELECT = "img[role='button']";
var SEARCH_STANDARD_NEW_ATTACHMENT_SAVE_SELECT = "input[name='attach'] + a > div:first-child";
var SEARCH_STANDARD_NEW_ATTACHMENT_SELECT = "input[name='att_f'] + span[id='undefined'] > div:first-child";
var SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_END_LABEL_J = " をアップロードしています。キャンセルするには Delete キーを押してください";
var SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_START_LABEL_J = "添付ファイル ";
var SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_SELECT_J = "div[aria-label*='" + SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_END_LABEL_J + "']";
var SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_END_LABEL_E = " Press delete to cancel";
var SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_START_LABEL_E = "Uploading attachment: ";
var SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_SELECT_E = "div[aria-label*='" + SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_END_LABEL_E + "']";

var SEARCH_SMARTPHONE_SENDBUTTON_SELECT   = "div[role='button']:contains('送信'),div[role='button']:contains('Send')";
var SEARCH_SMARTPHONE_FROM                = 'div#cmcfrom';
var SEARCH_SMARTPHONE_TO                  = 'div#cmcc_composeto';
var SEARCH_SMARTPHONE_CC                  = 'div#cmcc_composecc';
var SEARCH_SMARTPHONE_BCC                 = 'div#cmcc_composebcc';
var SEARCH_SMARTPHONE_BODY_IFRAME_SELECT  = 'iframe#cmcrichbody';
var SEARCH_SMARTPHONE_SUBJECT_EXIST_CHECK = 'div#cmccsubj';
var SEARCH_SMARTPHONE_SUBJECT_SELECT      = 'div#cmccsubj > input';


var SEARCH_SMARTPHONE_ATTACHMENT_SELECT = "div#cmuaap > div[style!='display: none;']";


var SEARCH_MOBILE_SENDBUTTON_SELECT = "input#send[type='submit']";
var SEARCH_MOBILE_FROM_SELECT       = "*[name='from']";

var TYPE_UNKNOWN_GMAIL = 0;
var TYPE_BASIC_GMAIL = 1;
var TYPE_STANDARD_OLD_GMAIL = 2;
var TYPE_STANDARD_NEW_GMAIL = 3;
var TYPE_SMARTPHONE_GMAIL = 4;

var KEYEVENT_UNKNOWN = 0;
var KEYEVENT_SJIS_ENTER = 1;
var KEYEVENT_CTRL_ENTER = 2;
var KEYEVENT_ENTER = 3;
var KEYEVENT_SPACE = 4;
var KEYEVENT_COMMAND_ENTER = 5;
var KEYEVENT_ALT_S = 6;

var ATTACHMENTS_SEPARATOR_WIN = "/";
var ATTACHMENTS_SEPARATOR_MAC = ":";

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

// メール送信イベントハンドラ
//
// function sendMailHandler(from, to, cc, bcc, subject, body, attachments);
//
// param String from
// param Array(String) to
// param Array(String) cc
// param Array(String) bcc
// param String subject
// param String fbodyrom
// param Array(String) attachments

var g_SendMailHandler = null;

function event_loadEventHandler(event, doc) { loadEventHandler(event, doc); };
function event_clickEventHandler(event, thisObj) { thisObj.clickEventHandler(event, thisObj); };
function event_mousedownEventHandler(event, thisObj) { thisObj.mousedownEventHandler(event, thisObj); };
function event_keydownEventHandler(event, thisObj) { thisObj.keydownEventHandler(event, thisObj); };
function event_keydownEventIFrameHandler(event, obj, thisObj) { thisObj.keydownEventIFrameHandler(event, obj, thisObj); };

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

//outlook.js,outlookcom.jsにも同じ関数があります。
//jsロード順でここのcreateErrorDataが呼ばれるようです。
//mac版側なども共通のjsを使っており、ブラウザで挙動が異なる可能性があるため、outlook.js,outlookcom.js側の処理も残しています。
//修正する場合はここをマスターとして修正し、outlook.js,outlookcom.jsにも同様の修正をしてください。
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

var CLogGMailAnalyser = function(doc) {
	
	this.rootDoc = doc;
	
	this.gmailType = TYPE_UNKNOWN_GMAIL;
	
	/**
	 * 初期化
	 */
	this.init = function(doc) {
		var thisObj = this;
				
		doc.addEventListener("click", function (event) { event_clickEventHandler(event, thisObj); }, true);
		doc.addEventListener("mousedown", function (event) { event_mousedownEventHandler(event, thisObj); }, true);
		doc.addEventListener("keydown", function (event) { event_keydownEventHandler(event, thisObj); }, true);
		doc.addEventListener("load", function(event) {
			var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
			if( $(eventObj).is("iframe")) {
				try {
					if (!eventObj.contentWindow.document.body.getAttribute("addedeventframesk")) {
						eventObj.contentWindow.document.addEventListener("keydown", function (event) { event_keydownEventIFrameHandler(event, eventObj, thisObj); }, true);
						eventObj.contentWindow.document.body.setAttribute("addedeventframesk", true);
					}
				}
				catch(e){}
			}
		}, true);
		$(doc).find("iframe").each(function() {
			var iframeObj = this;
			try {
				if (!iframeObj.contentWindow.document.body.getAttribute("addedeventframesk")) {
					iframeObj.contentWindow.document.addEventListener("keydown", function (event) { event_keydownEventIFrameHandler(event, iframeObj, thisObj); }, true);
					iframeObj.contentWindow.document.body.setAttribute("addedeventframesk", true);
				}
			}
			catch(e){}
		});
	};
	
	/**
	 * To,Cc,Bccをログ形式の文字列で取得（旧）
	 */
	this.getItemToLogStringToOld = function (xpath, searchDoc) {
		var values = $(xpath, searchDoc);
		
		var retValues = new Array();
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).val().trim();
				if (0 < strVal.length) {
					retValues.push(strVal);
				}
			});
		}
		
		return {
			str:     getStringFromArray(retValues, ","),
			success: ( 0 < values.length )
		};
	};
	/**
	 * To,Cc,Bccをログ形式の文字列で取得（新）
	 */
	this.getItemToLogStringToNew = function (xpath, searchDoc) {
		var values = $(xpath, searchDoc);
		
		var retValues = new Array();
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).val().trim();
				if (0 < strVal.length) {
					retValues.push(strVal);
				}
			});
		}
		
		return {
			str:     getStringFromArray(retValues, ","),
			success: ( 0 < values.length )
		};
	};
	
	/**
	 * 添付ファイル一覧取得(ベーシック（簡易返信）)
	 */
	this.getItemToLogStringAttachmentBasicQuickReply = function (replyTreeRoot) {
		var retValues = new Array();

		// アップロード済み添付ファイルを取得（下書き保存済み)
		var values = $(SEARCH_BASIC_QUICK_REPLY_NEW_ATTACHMENT_SAVE_SELECT, replyTreeRoot);
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).text().trim();
				if (0 < strVal.length) {
					retValues.push(strVal);
				}
			});
		}
		
        if (navigator.platform.indexOf("Mac") != -1) {
            return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_MAC);
        }
        return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_WIN);
	};
	
	/**
	 * 添付ファイル一覧取得(ベーシック)
	 */
	this.getItemToLogStringAttachmentBasic = function (searchDoc) {
		var retValues = new Array();

		// アップロード済み添付ファイルを取得（下書き保存済み)
		var values = $(SEARCH_BASIC_NEW_ATTACHMENT_SAVE_SELECT, searchDoc);
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).text().trim();
				if (0 < strVal.length) {
					retValues.push(strVal);
				}
			});
		}
		
		// 未アップロードの添付ファイルを取得
		values = $(SEARCH_BASIC_NEW_ATTACHMENT_SELECT, searchDoc);
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).val().trim();
				if (0 < strVal.length) {
					retValues.push(strVal.substring(strVal.lastIndexOf("\\") + 1, strVal.length));
				}
			});
		}
		
        if (navigator.platform.indexOf("Mac") != -1) {
            return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_MAC);
        }
        return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_WIN);
	};
	
	/**
	 * 添付ファイル一覧取得(スタンダードUI（旧）)
	 */
	this.getItemToLogStringAttachmentOld = function (searchDoc) {
		
		var retValues = new Array();
		
		// アップロード済み添付ファイルを取得（下書き未保存)
		var values = $(SEARCH_STANDARD_OLD_ATTACHMENT_SELECT, searchDoc).parent().find(SEARCH_STANDARD_OLD_ATTACHMENT_PREV_SELECT);
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).text().trim();
				strVal = strVal.substring(0, strVal.lastIndexOf(" ")).trim();
				if (0 < strVal.length) {
					retValues.push(strVal);
				}
			});
		}
		
		// アップロード済み添付ファイルを取得（下書き保存済み)
		values = $(SEARCH_STANDARD_OLD_SAVE_ATTACHMENT_SELECT, searchDoc);
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).text().trim();
				strVal = strVal.substring(0, strVal.lastIndexOf(" ", strVal.lastIndexOf(" ") - 1)).trim();
				if (0 < strVal.length) {
					retValues.push(strVal);
				}
			});
		}
		
		// アップロード中の添付ファイルを取得
		values = $(SEARCH_STANDARD_OLD_ATTACHMENT_UPLOADING_SELECT, searchDoc);
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).parent().parent().parent().find("tr > td:first-child > span").text().trim();
				strVal = strVal.substring(0, strVal.lastIndexOf(" ")).trim();
				if (0 < strVal.length) {
					retValues.push(strVal);
				}
			});
		}
		
        if (navigator.platform.indexOf("Mac") != -1) {
            return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_MAC);
        }
        return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_WIN);
	};
	/**
	 * 添付ファイル一覧取得(スタンダードUI（新）)
	 */
	this.getItemToLogStringAttachmentNew = function (searchDoc) {
		
		var retValues = new Array();
		
		// アップロード済み添付ファイルを取得
		var values = $(SEARCH_STANDARD_NEW_ATTACHMENT_SELECT + "," + SEARCH_STANDARD_NEW_ATTACHMENT_SAVE_SELECT, searchDoc);
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).text();
				if (0 < strVal.length) {
					retValues.push(strVal);
				}
			});
		}
		
		// アップロード中の添付ファイルを取得(日本語)
		values = $(SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_SELECT_J, searchDoc);
		if (0 < values.length) {
			values.each(function(){
				var labelString = this.getAttribute("aria-label");
				labelString = labelString.substring(SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_START_LABEL_J.length, labelString.lastIndexOf(SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_END_LABEL_J));
				if (0 < labelString.length) {
					retValues.push(labelString);
				}
			});
		}

		// アップロード中の添付ファイルを取得(英語)
		values = $(SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_SELECT_E, searchDoc);
		if (0 < values.length) {
			values.each(function(){
				var labelString = this.getAttribute("aria-label");
				labelString = labelString.substring(SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_START_LABEL_E.length, labelString.lastIndexOf(SEARCH_STANDARD_NEW_ATTACHMENT_UPLOADING_END_LABEL_E));
				if (0 < labelString.length) {
					retValues.push(labelString);
				}
			});
		}

        if (navigator.platform.indexOf("Mac") != -1) {
            return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_MAC);
        }
        return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_WIN);
	};

	/**
	 * 添付ファイル一覧取得(スマートフォン)
	 */
	this.getItemToLogStringAttachmentSmartphone = function (searchDoc) {
		
		var retValues = new Array();
		
		// アップロード済み添付ファイルを取得
		var values = $(SEARCH_SMARTPHONE_ATTACHMENT_SELECT, searchDoc).children('span');
		if (0 < values.length) {
			values.each(function(){
				var strVal = $(this).text();
				if (0 < strVal.length) {
					// ファイル名を分離する
					var findIndex = strVal.indexOf("\xA0-\xA0");
					if (0 < findIndex) {
						retValues.push( strVal.substring(0,findIndex) );
					}
				}
			});
		}
		
        if (navigator.platform.indexOf("Mac") != -1) {
            return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_MAC);
        }
        return getStringFromArray(retValues, ATTACHMENTS_SEPARATOR_WIN);
	};

	/**
	 * メール送信イベント判定
	 */
	this.isMailSendKeyEvent = function(event, thisObj) {
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
		return thisObj.isMailSendKey(event, eventObj, thisObj);
	};
	this.isMailSendKey = function(event, eventObj, thisObj) {
		var keyEventType = thisObj.getGmailSendKeydownEvent(event);
		var gmailType = thisObj.getGmailTypeFromSendButton(thisObj);
		
		// 送信ボタンのイベントであれば、OK
		var bSendButton = false;
		
		if (TYPE_BASIC_GMAIL == gmailType)
		{
			// ベーシックUI
			if ($(eventObj).is(SEARCH_BASIC_SENDBUTTON_SELECT)) {
				bSendButton = true;
			}
		}
		else if (TYPE_STANDARD_OLD_GMAIL == gmailType)
		{
			// スタンダードUI（旧）
			if ($(eventObj).is(SEARCH_STANDARD_OLD_SENDBUTTON_SELECT_ONE_1)) {
				if (0 < $(eventObj).children(SEARCH_STANDARD_OLD_SENDBUTTON_SELECT_ONE_2).length) {
					bSendButton = true;
				}
			}
			// スタンダードUI（旧）
			if ($(eventObj).is(SEARCH_STANDARD_OLD_SENDBUTTON_SELECT_TWO)) {
				bSendButton = true;
			}
		}
		else if (TYPE_STANDARD_NEW_GMAIL == gmailType)
		{
			// スタンダードUI（新）
			if ($(eventObj).is(SEARCH_STANDARD_NEW_SENDBUTTON_SELECT)) {
				bSendButton = true;
			}

			// スタンダードUI（新）のアーカイブimg付きボタン #7653
			if ($(eventObj).is(SEARCH_STANDARD_NEW_SENDBUTTON_ARCHIVE_IMG_SELECT)) {
				var parent = $(eventObj).parent();
				if( parent.is(SEARCH_STANDARD_NEW_SENDBUTTON_SELECT)) {
					bSendButton = true;
				}
			}
			
			// キー操作での送信検知
			var bSendKey = false;
			if (navigator.platform.indexOf("Win") != -1) {
				// Windowsの場合の処理
				// 新画面でCtrlエンターを押された場合
				if (KEYEVENT_CTRL_ENTER == keyEventType) {
					bSendKey = true;
				}
			}
			else if (navigator.platform.indexOf("Mac") != -1) {
				// Macの場合の処理
				// 新画面でcommandエンターを押された場合
				if (KEYEVENT_COMMAND_ENTER == keyEventType) {
					bSendKey = true;
				}
			}
			
			if (bSendKey) {
				// 送信ボタンでCtrl+Enterを押された場合は無視
				if (bSendButton) {
					return false;
				}
				
				// 親ノードをたどっていき、ダイアログのノードまでの間に送信ボタンが見つかればOK
				searchDoc = eventObj;
				while (!searchDoc.getAttribute("role") || "DIALOG" != searchDoc.getAttribute("role").toUpperCase()) {
					if (0 < $(SEARCH_STANDARD_NEW_SENDBUTTON_SELECT, searchDoc).length) {
						return true;
					}
					searchDoc = (searchDoc.parent) ? searchDoc.parent : searchDoc.parentNode;
				}
				
				return false;
			}
			
		}
		else if (TYPE_SMARTPHONE_GMAIL == gmailType)
		{
			// スマートフォン用
			if ($(eventObj).parent().is(SEARCH_SMARTPHONE_SENDBUTTON_SELECT)) {
				bSendButton = true;
			}

		    	// スマートフォン用(キーイベントのイベントソース)
			if ($(eventObj).is(SEARCH_SMARTPHONE_SENDBUTTON_SELECT)) {
				bSendButton = true;
			}

		}

		return bSendButton;	
		
	};

	this.getSearchTargetString = function (url) {
		var str = "";
		var index = url.indexOf("//mail.google.com/mail/");
		if ( 0 < index ) {
			str = url.substring( index + "//mail.google.com/mail/".length-1 );
			// query引数があれば切る
			var endIndex = str.indexOf( "?" );
			if ( 0 <= endIndex ) {
				str = str.substring( 0, endIndex );
			}
			endIndex = str.indexOf( "#" );
			if ( 0 <= endIndex ) {
				str = str.substring( 0, endIndex );
			}
			endIndex = str.indexOf( "&" );
			if ( 0 <= endIndex ) {
				str = str.substring( 0, endIndex );
			}
		}
		return str;
	};

	/**
	 * 送信ボタンから、Gmailの画面のタイプを取得
	 */
	this.getGmailTypeFromSendButton = function (thisObj) {
		if (TYPE_UNKNOWN_GMAIL == thisObj.gmailType)
		{
			// スタンダードUI（新）
			thisObj.gmailType = TYPE_STANDARD_NEW_GMAIL;

			var targetStr = thisObj.getSearchTargetString( thisObj.rootDoc.URL );
			if ( 0 <= targetStr.indexOf( "/mu/mp/" ))
			{
				// SMARTPHONE UI
				thisObj.gmailType = TYPE_SMARTPHONE_GMAIL;
			}
			else if ( 0 <= targetStr.indexOf( "/h/" ) ||
				  0 <= targetStr.indexOf( "/x/" ))
			{
				// ベーシックUI or モバイルUI
				thisObj.gmailType = TYPE_BASIC_GMAIL;
			}
			
		}

		return thisObj.gmailType;
	};
	
	/**
	 * メール送信で使用するキーイベントのタイプを取得
	 */
	this.getGmailSendKeydownEvent = function (event) {
		if ("KEYDOWN" != event.type.toUpperCase()) {
			return KEYEVENT_UNKNOWN;
		}
		
		var shift, ctrl, keycode; 
		// Mozilla(Firefox, NN) and Opera 
		if (event != null) { 
			keycode = event.which; 
			ctrl    = typeof event.modifiers == 'undefined' ? event.ctrlKey : event.modifiers & Event.CONTROL_MASK; 
			shift   = typeof event.modifiers == 'undefined' ? event.shiftKey : event.modifiers & Event.SHIFT_MASK; 
		// Internet Explorer 
		} else { 
			keycode = event.keyCode; 
			ctrl    = event.ctrlKey; 
			shift   = event.shiftKey; 
		}
		
		// スペースキーに場合
		if (keycode == 32) {
			return KEYEVENT_SPACE;
		}
		// Shift同時押しの場合 
		else if (shift) { 
			if (keycode == 13) { 
				return KEYEVENT_SJIS_ENTER;
			} 
		}
		// Ctrl同時押しの場合 
		else if (ctrl) { 
			if (keycode == 13) {
				return KEYEVENT_CTRL_ENTER;
			}
		} 
		// metaキー同時押しの場合 
		else if (event.metaKey) {
			// metaキーが押された（Windowsキー(Windows) or commandキー(Mac)）
			if (keycode == 13 && navigator.platform.indexOf("Mac") != -1) {
				return KEYEVENT_COMMAND_ENTER;
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
	 * ベーシックHTMLの簡易返信のDOMツリーを見つける
	 * 
	 * K.Nishiyama
	 * return [ 編集画面のrootエレメント, optionボタンエレメント ]
	 */
	this.analyzeBasicHTMLReply = function (event, thisObj) {
		// どの返信画面が "送信" されようとしているか
		var eventButton   = ((event.originalTarget) ? event.originalTarget : event.srcElement);
		var replyTreeRoot = $(eventButton).parent().parent().parent();
		
		if ( 0 < replyTreeRoot.length ) {
			// 親が見つかったなら、返信オプションボタンがあるか確認する
			var root = replyTreeRoot.get(0);
			if ( 'TBODY' == root.tagName ) {
				// 返信オプションボタンを探す
				var replyOption = $(SEARCH_BASIC_SIMPLE_REPLY_SELECT, root);
				if ( 0 < replyOption.length ) {
					return root;
				}
			}
		}
		return null;
	}

	/**
	 * ベーシックUI解析ハンドラ ( モバイル画面も兼用 )
	 */
	this.analyzeMailOldHandler = function (event, thisObj) {
		// キーイベントの場合エンター系のイベントでない場合は無視
		if ("KEYDOWN" == event.type.toUpperCase()) {
			return;
		}
		
		var searchDoc = thisObj.rootDoc;

		var fromSuccess = true;
		var from = "";
		// Fromを取得
		if ( 0 < $(SEARCH_MOBILE_SENDBUTTON_SELECT, searchDoc).length ) { // 不具合 #7688対応  モバイル画面かどうかを判定する
			// selectタグから選択中のfromを取得する( Gmailにアカウントが1件しか登録されていない場合は、fromが取れなくてもOKは仕様です )
			var queryFrom = $(SEARCH_MOBILE_FROM_SELECT, searchDoc);
			if ( 0 < queryFrom.length ) {
				from = queryFrom.val();
				if (-1 == from.indexOf( "@" )) {
					fromSuccess = false;
				}
			}
		}
		else { // モバイル画面ではない。すなわちBasicHTML画面
			var queryFrom = $(SEARCH_BASIC_FROM_SELECT, searchDoc);
			if ( 0 < queryFrom.length ) {
				from = queryFrom.text();
			}
			if (-1 == from.indexOf( "@" )) {
				fromSuccess = false;
			}
		}
		
		var body = "";
		var subject = "";
		var to = "";
		var cc = "";
		var bcc = "";
		var attachments = "";

		var queryBody    = [];
		var querySubject = ["dummy"];
		var queryTo      = ["dummy"]; // length=1にするため
		var queryCc      = ["dummy"]; // length=1にするため
		var queryBcc     = ["dummy"]; // length=1にするため

		// 簡易返信内容の解析
		var replyTreeRoot = this.analyzeBasicHTMLReply(event, thisObj);
		if( replyTreeRoot ) {
			// 返信オプションボタンを探す
			var replyOption = $(SEARCH_BASIC_SIMPLE_REPLY_SELECT, replyTreeRoot);
			queryBody = $(SEARCH_BASIC_BODY_SELECT, replyTreeRoot);
			if( 0 < queryBody.length ) {
				body = queryBody.val();
			}
			subject = thisObj.rootDoc.title;
			var findIndex = thisObj.rootDoc.title.indexOf("Gmail - ");
			if (0 == findIndex) {
				subject = subject.substring(8);
			}
			
			attachments = thisObj.getItemToLogStringAttachmentBasicQuickReply(replyTreeRoot);
			
			var reply = $(SEARCH_BASIC_SIMPLE_TO_REPLY_SELECT, replyTreeRoot);
			var replyall = $(SEARCH_BASIC_SIMPLE_TO_REPLYALL_SELECT, replyTreeRoot);
			// 返信元メールの宛先にCCあ存在する場合
			if (0 < reply.length || 0 < replyall.length) {
				queryTo = $(SEARCH_BASIC_SIMPLE_TO_REPLY_LABEL_SELECT, replyTreeRoot)
				if ( 0 < queryTo.length ) {
					to = queryTo.text();
					to = to.substring(SEARCH_BASIC_SIMPLE_TO_REPLY_REMOVE_STRING.length, to.length).trim(); // To: を削除する。
				}
				
				// 全員へ返信の場合 Ccを付け加える。
				if (0 < replyall.length) {
					cc = $(SEARCH_BASIC_SIMPLE_TO_REPLYALL_LABEL_SELECT, replyTreeRoot).text();
					var tag = cc.substring(0, SEARCH_BASIC_SIMPLE_TO_REPLYALL_REMOVE_STRING_J.length);
					if ( tag === SEARCH_BASIC_SIMPLE_TO_REPLYALL_REMOVE_STRING_J ) {
						// 日本語
						cc = cc.substring(SEARCH_BASIC_SIMPLE_TO_REPLYALL_REMOVE_STRING_J.length, cc.length).trim(); // 全員に: を削除する。
					}
					else {
						// 英語
						cc = cc.substring(SEARCH_BASIC_SIMPLE_TO_REPLYALL_REMOVE_STRING_E.length, cc.length).trim(); // To all: を削除する。
					}
					// ccからtoの宛先を削除
					if(to.length > 0 && cc.length >= to.length)
					{
						cc = cc.substring(to.length + 1).trim();
					}
				}
			}
			// 返信元メールの宛先がTO もしくは、下書き保存済みの場合
			else {
				queryTo = replyOption.parent().parent().parent().find(SEARCH_BASIC_SIMPLE_TO_SELECT);
				if ( 0 < queryTo.length ) {
					to = queryTo.text();
					to = to.substring(SEARCH_BASIC_SIMPLE_TO_REPLY_REMOVE_STRING.length, to.length).trim(); // To: を削除する。
					
					// 下書き保存済みのメールヘッダの Cc: Bcc: の欄から送信先を取得する
					var queryNext = queryTo.parent().next("tr").find("td:first");
					if ( 0 < queryNext.length ) {
						var text = queryNext.text().trim();
						if ( 'Cc:' == text.substring( 0, 'Cc:'.length )) {
							cc  = text.substring( 'Cc:'.length, text.length ).trim();
						}
						else if ( 'Bcc:' == text.substring( 0, 'Bcc:'.length )) {
							bcc = text.substring( 'Bcc:'.length, text.length ).trim();
						}
						text = queryNext.parent().next("tr").find("td:first").text().trim();
						if ( 'Bcc:' == text.substring( 0, 'Bcc:'.length )) {
							bcc = text.substring( 'Bcc:'.length, text.length ).trim();
						}
					}
				}
			}
		}
		// ふつうの作成モードの場合
		else {
			queryBody = $(SEARCH_BASIC_BODY_SELECT, searchDoc);
			if( 0 < queryBody.length ) {
				body = queryBody.val().trim();
			}
			querySubject = $(SEARCH_BASIC_SUBJECT_SELECT, searchDoc);
			if( 0 < querySubject.length ) {
				subject = querySubject.val().trim();
			}
			queryTo = $(SEARCH_BASIC_TO_SELECT, searchDoc);
			if( 0 < queryTo.length ) {
				to = queryTo.val().trim();
			}
			queryCc = $(SEARCH_BASIC_CC_SELECT, searchDoc);
			if( 0 < queryCc.length ) {
				cc = queryCc.val().trim();
			}
			queryBcc = $(SEARCH_BASIC_BCC_SELECT, searchDoc);
			if ( 0 < queryBcc.length ) {
				bcc = queryBcc.val().trim();
			}
			attachments = thisObj.getItemToLogStringAttachmentBasic(searchDoc);
		}
		
		if (!g_SendMailHandler) {
			return;
		}

		if ( 0 < $(SEARCH_MOBILE_SENDBUTTON_SELECT, searchDoc).length ) { // #9368 モバイル(i-mode)画面
			// モバイル画面は、Cc,BccのDOMが無い場合があるe
			queryCc      = ["dummy"]; // length=1にするため
			queryBcc     = ["dummy"]; // length=1にするため
		}

		if ( fromSuccess && ( 0 < queryBody.length ) && ( 0 < querySubject.length ) && ( 0 < queryTo.length ) && ( 0 < queryCc.length ) && ( 0 < queryBcc.length )) {
			g_SendMailHandler(WAET_WEBACCESS_GMAIL, from, to, cc, bcc, subject, body, attachments, "");
		}
		else {
			g_SendMailHandler(WAET_WEBACCESS_GMAIL, from, to, cc, bcc, subject, body, attachments, createErrorData(thisObj.rootDoc, {}));
		}
	};

	/**
	 * スマートフォンUI解析ハンドラ 2014/03/26
	 */
	this.analyzeMailSmartphoneHandler = function (event, thisObj) {
		
		// キーイベントの場合エンター系またはスペースのイベントでない場合は無視
		if ("KEYDOWN" == event.type.toUpperCase() && KEYEVENT_UNKNOWN == thisObj.getGmailSendKeydownEvent(event)) {
			return;
		}
		
		// メール作成系のイベントでない場合は無視
		if (!thisObj.isMailSendKeyEvent(event, thisObj)) {
			return;

		}

		var eventButton = ((event.originalTarget) ? event.originalTarget : event.srcElement);
		thisObj.analyzeMailSmartphone(eventButton, thisObj);
		return;
	};

	/**
	 * コンマ区切りのメールアドレスリストを返す
	 */
	this.makeMailAddressList = function (spanQuerys) {
		var arr = new Array();
		spanQuerys.each (function () {
			var first = $('span:first', $(this)).text();
			var last  = $('span:last',  $(this)).text();
			if ( first == last ) {
				// aaa@example.com形式
				arr.push( first );
			}
			else {
				// 名前 <aaa@example.com> 形式
				arr.push( first + " <" + last + ">" );
			}
		});
		return getStringFromArray(arr, ",");
	};


	/**
	 * スマートフォンUI解析ハンドラ
	 */
	this.analyzeMailSmartphone = function (event, thisObj) {

		var searchDoc = thisObj.rootDoc;
		var str = "";

		var fromSuccess = false;
		var from = "";
		// スマート用画面の場合
		if (TYPE_SMARTPHONE_GMAIL == thisObj.gmailType) {
			// 選択中のGmailアドレスを取得
			var dom1 = $(SEARCH_SMARTPHONE_FROM, searchDoc);
			from = dom1.text();
			fromSuccess = true;
		}

		var body = "";
		var subject = "";
		var to = "";
		var cc = "";
		var bcc = "";
		var attachments = "";

		// TO,CC,BCC
		var queryTo  =      $(SEARCH_SMARTPHONE_TO,searchDoc);
		var queryCc  =      $(SEARCH_SMARTPHONE_CC,searchDoc);
		var queryBcc =      $(SEARCH_SMARTPHONE_BCC,searchDoc);
		var toSpanQuerys  = $(SEARCH_SMARTPHONE_TO,searchDoc).children().find( 'span:first' );
		var ccSpanQuerys  = $(SEARCH_SMARTPHONE_CC,searchDoc).children().find( 'span:first' );
		var bccSpanQuerys = $(SEARCH_SMARTPHONE_BCC,searchDoc).children().find( 'span:first' );

		to  = thisObj.makeMailAddressList( toSpanQuerys );
		cc  = thisObj.makeMailAddressList( ccSpanQuerys );
		bcc = thisObj.makeMailAddressList( bccSpanQuerys );

		// Subject
		var querySubject  =      $(SEARCH_SMARTPHONE_SUBJECT_EXIST_CHECK,searchDoc);
		subject           =      $(SEARCH_SMARTPHONE_SUBJECT_SELECT).val();

		var bodySuccess = false;
		// 本文(Body)をiframeから取得
		if (0 < $(SEARCH_SMARTPHONE_BODY_IFRAME_SELECT, searchDoc).length) {
			body = $(SEARCH_SMARTPHONE_BODY_IFRAME_SELECT, searchDoc)[0].contentWindow.document.body.innerHTML;
			bodySuccess = true;
		}

		// 添付ファイル名を取得
		var getAttachFunc = thisObj.getItemToLogStringAttachmentSmartphone;
		attachments = getAttachFunc(searchDoc);

		if (!g_SendMailHandler) {
			return;
		}

		if ( fromSuccess && bodySuccess && ( 0 < querySubject.length ) && ( 0 < queryTo.length ) && ( 0 < queryCc.length ) && ( 0 < queryBcc.length )) {
			g_SendMailHandler(WAET_WEBACCESS_GMAIL, from, to, cc, bcc, subject, body, attachments, "");
		}
		else {
			g_SendMailHandler(WAET_WEBACCESS_GMAIL, from, to, cc, bcc, subject, body, attachments, createErrorData(thisObj.rootDoc, {}));
		}
	};
	
	/**
	 * スタンダードUI解析ハンドラ
	 */
	this.analyzeMailNewHandler = function (event, thisObj) {
		
		// キーイベントの場合エンター系またはスペースのイベントでない場合は無視
		if ("KEYDOWN" == event.type.toUpperCase() && KEYEVENT_UNKNOWN == thisObj.getGmailSendKeydownEvent(event)) {
			return;
		}
		
		// メール作成系のイベントでない場合は無視
		if (!thisObj.isMailSendKeyEvent(event, thisObj)) {
			return;

		}

		var eventButton = ((event.originalTarget) ? event.originalTarget : event.srcElement);
		thisObj.analyzeMailNew(eventButton, thisObj);
		return;
	};
	
	/**
	 * スタンダードUI解析処理
	 */
	this.analyzeMailNew = function (eventObj, thisObj) {
		
		var eventButton = eventObj;
		
		var searchDoc = null;
		
		//検索元エレメントを取得
		var gmailType = thisObj.getGmailTypeFromSendButton(thisObj);
		
		// 旧の場合はルートから検索する。
		if (TYPE_STANDARD_OLD_GMAIL == gmailType) {
			searchDoc = thisObj.rootDoc;
		}
		// 新の場合は複数立ち上がるので、メール作成画面のルートを探す
		else {
			var findTR = false;
			searchDoc = eventObj;
			while (searchDoc) {
				if (searchDoc.getAttribute ) {
					if ( searchDoc.getAttribute("role")) {
				    		if ( "DIALOG" == searchDoc.getAttribute("role").toUpperCase()) {
							break;
						}
					}
				}
				if (!findTR) {
					var UpperTagName = "";
					if ( searchDoc.tagName ) {
					    UpperTagName = searchDoc.tagName.toUpperCase();
					}
					if ("TR" == UpperTagName || "TBODY" == UpperTagName || "TABLE" == UpperTagName || "FORM" == UpperTagName) {
						findTR = true;
					}
					// To:Cc:Bccの場合はメール送信しない
					else if (0 < $(searchDoc).prev().find(SEARCH_STANDARD_NEW_EXCLUDE_ELEMENT_SELECT).length) {
						return;
					}
				}
				
				
				searchDoc = (searchDoc.parent) ? searchDoc.parent : searchDoc.parentNode;
			}
			
			if (null == searchDoc) {
				searchDoc = thisObj.rootDoc;
			}
		}
		
		// Fromを取得
		var from = "";
		// 複数から選択できる場合はそのまま取得
		var selectFrom = $(SEARCH_STANDARD_FROM_SELECT, searchDoc);
		if (selectFrom && 0 < selectFrom.length) {
			from = selectFrom.val();
		}
		// 取得できなかった場合は、ブラウザのTitleからログインしているGmailアドレスを取得
		if (0 >= from.length) {
			var endIndex = thisObj.rootDoc.title.lastIndexOf(" - ");
			var startIndex = thisObj.rootDoc.title.lastIndexOf(" - ", endIndex - 1);
			if (0 > endIndex || 0 > startIndex) {
				return;
			}
			
			from = thisObj.rootDoc.title.substring(startIndex + 3, endIndex);
		}
		
		// とりあえず本文を取得
		var bodySuccess = false;
		var body = "";
		var bodyQuery = $(SEARCH_STANDARD_BODY_SELECT, searchDoc);
		if ( 0 < bodyQuery.length) {
			body = bodyQuery.val();
			bodySuccess = true;
		}
		
		var getAttachFunc = function(searchDoc){return "";};
		var getToFunc = function(xpath, searchDoc){return "";};
		// 旧の場合
		if (TYPE_STANDARD_OLD_GMAIL == gmailType) {
			// 本文をiframeから取得
			if (0 < $(SEARCH_STANDARD_OLD_BODY_IFRAME_SELECT, searchDoc).length) {
				body = $(SEARCH_STANDARD_OLD_BODY_IFRAME_SELECT, searchDoc)[0].contentWindow.document.body.innerHTML;
				bodySuccess = true;
			}
			getToFunc = thisObj.getItemToLogStringToOld;
			getAttachFunc = thisObj.getItemToLogStringAttachmentOld;
		}
		// 新の場合
		else {
			if (0 < $(SEARCH_STANDARD_NEW_BODY_DIV_SELECT, searchDoc).length) {
				body = $(SEARCH_STANDARD_NEW_BODY_DIV_SELECT, searchDoc)[0].innerHTML;
				bodySuccess = true;
			}
			// 本文をiframeから取得
			else if (0 < $(SEARCH_STANDARD_NEW_BODY_IFRAME_SELECT, searchDoc).length) {
				body = $(SEARCH_STANDARD_NEW_BODY_IFRAME_SELECT, searchDoc)[0].contentWindow.document.body.innerHTML;
				bodySuccess = true;
			}
			getToFunc = thisObj.getItemToLogStringToNew;
			getAttachFunc = thisObj.getItemToLogStringAttachmentNew;
		}
		
		var subject = "";
		var subjectQuery = $(SEARCH_STANDARD_SUBJECT_SELECT, searchDoc);
		if ( 0 < subjectQuery.length ) {
			subject = subjectQuery.val();
		}
		// 新の場合
		if (TYPE_STANDARD_NEW_GMAIL == gmailType) {
			// 新規メールを開いて速攻送信ボタンを押した場合の対応 #7524
			subjectQuery = $(SEARCH_STANDARD_SUBJECTBOX_SELECT, searchDoc);
			if ( 0 < subjectQuery.length ) {
				subject = subjectQuery.val();
			}
		}
		
		var toResult = getToFunc(SEARCH_STANDARD_TO_SELECT, searchDoc);
		var to = toResult.str.trim();
		var ccResult = getToFunc(SEARCH_STANDARD_CC_SELECT, searchDoc);
		var cc = ccResult.str.trim();
		var bccResult = getToFunc(SEARCH_STANDARD_BCC_SELECT, searchDoc);
		var bcc = bccResult.str.trim();
		var attachments = getAttachFunc(searchDoc);

		if (!g_SendMailHandler) {
			return;
		}

		if ( (0 <= from.indexOf( "@" )) && bodySuccess && (0 < subjectQuery.length) && toResult.success && ccResult.success && bccResult.success ) {
			g_SendMailHandler(WAET_WEBACCESS_GMAIL, from, to, cc, bcc, subject, body, attachments, "");
		}
		else {
			g_SendMailHandler(WAET_WEBACCESS_GMAIL, from, to, cc, bcc, subject, body, attachments, createErrorData(thisObj.rootDoc, {}));
		}
	};

	/**
	 * メール解析ハンドラ取得処理
	 */
	this.getAnalyzeMailHandler = function (gmailType, thisObj) {
		if (TYPE_BASIC_GMAIL == gmailType) {
			return function(event) { thisObj.analyzeMailOldHandler(event ,thisObj); };
		}
		else if ( TYPE_SMARTPHONE_GMAIL == gmailType ) {
			return function(event) { thisObj.analyzeMailSmartphoneHandler(event, thisObj); };
		}
		else if (TYPE_STANDARD_OLD_GMAIL == gmailType || TYPE_STANDARD_NEW_GMAIL == gmailType ) {
			return function(event) { thisObj.analyzeMailNewHandler(event, thisObj); };
		}
		
		return (function(){});
	};
	
	/**
	 * キーイベントハンドラ
	 */
	this.keydownEventHandler = function (event, thisObj)
	{
		// エンター系のイベントでない場合は無視
		if (KEYEVENT_UNKNOWN == thisObj.getGmailSendKeydownEvent(event)) {
			return;
		}
		
		// メール作成系のイベントでない場合は無視
		if (!thisObj.isMailSendKeyEvent(event, thisObj)) {
			return;
		}
		
		var gmailType = thisObj.getGmailTypeFromSendButton(thisObj);
		var analyzeFunc = thisObj.getAnalyzeMailHandler(gmailType, thisObj);
		var eventButton = (event.originalTarget) ? event.originalTarget : event.srcElement;
		
		// キーイベントを新たに付与
		if (!eventButton.getAttribute('addedeventkeydownsk')) {
			eventButton.addEventListener("keydown",  analyzeFunc, true);
			eventButton.setAttribute('addedeventkeydownsk', true);
		}
	};
	
	/**
	 * iframe内キーイベントハンドラ
	 */
	this.keydownEventIFrameHandler = function (event, iframeObj, thisObj)
	{
		// エンター系のイベントでない場合は無視
		if (KEYEVENT_UNKNOWN == thisObj.getGmailSendKeydownEvent(event)) {
			return;
		}
		
		// メール作成系のイベントでない場合は無視
		if (!thisObj.isMailSendKey(event, iframeObj, thisObj)) {
			return;
		}
		
		var gmailType = thisObj.getGmailTypeFromSendButton(thisObj);
		if (TYPE_STANDARD_NEW_GMAIL != gmailType) {
			return;
		}
		
		var analyzeFunc = thisObj.getAnalyzeMailHandler(gmailType, thisObj);
		var eventButton = (event.originalTarget) ? event.originalTarget : event.srcElement;
		
		// キーイベントを新たに付与
		if (!eventButton.getAttribute('addedeventkeydownsk')) {
			eventButton.addEventListener("keydown",  function(ev) {
					// キーイベントの場合エンター系のイベントでない場合は無視
					if ("KEYDOWN" != ev.type.toUpperCase()) {
						return;
					}
					if (KEYEVENT_CTRL_ENTER != thisObj.getGmailSendKeydownEvent(ev) && KEYEVENT_COMMAND_ENTER != thisObj.getGmailSendKeydownEvent(ev)) {
						return;
					}
					thisObj.analyzeMailNew(iframeObj, thisObj);
				}, true);
			eventButton.setAttribute('addedeventkeydownsk', true);
		}
	};
	
	/**
	 * クリックハンドラ
	 */
	this.clickEventHandler = function (event, thisObj)
	{
		// 送信ボタンでない場合は無視
		if (!thisObj.isMailSendKeyEvent(event, thisObj)) {
			return;
		}
		
		// ベーシック以外は無視
		var gmailType = thisObj.getGmailTypeFromSendButton(thisObj);
		if (TYPE_BASIC_GMAIL != gmailType) {
			return;
		}
		var analyzeFunc = thisObj.getAnalyzeMailHandler(gmailType, thisObj);
		var eventButton = (event.originalTarget) ? event.originalTarget : event.srcElement;
		
		if (!eventButton.getAttribute('addedeventclicksk')) {
			eventButton.addEventListener("click", analyzeFunc, true);
			eventButton.setAttribute('addedeventclicksk', true);
		}
		
		return true;
	};
	
	/**
	 * マウスダウンハンドラ
	 */
	this.mousedownEventHandler = function (event, thisObj)
	{
		// 送信ボタンでない場合は無視
		if (!thisObj.isMailSendKeyEvent(event, thisObj)) {
			return;
		}
		
		//ベーシックは無視
		var gmailType = thisObj.getGmailTypeFromSendButton(thisObj);
		if (TYPE_BASIC_GMAIL == gmailType) {
			return;
		}
		var analyzeFunc = thisObj.getAnalyzeMailHandler(gmailType, thisObj);
		var eventButton = (event.originalTarget) ? event.originalTarget : event.srcElement;
		
		if (!eventButton.getAttribute('addedeventmousedown')) {
			eventButton.addEventListener("mousedown", analyzeFunc, true);
			eventButton.setAttribute('addedeventmousedown', true);
		}
		
		return true;
	};
	
	this.init(doc);
}

/* Copyright (c)2006-2009 Sky Co., LTD. All rights reserved. */
