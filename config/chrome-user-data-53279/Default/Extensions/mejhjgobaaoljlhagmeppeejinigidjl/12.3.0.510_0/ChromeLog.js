const WAET_WEBACCESS_GMAIL				= 17;	// 操作種別"Gmail送信"を表す識別子
const WAET_WEBACCESS_OUTLOOK_WEB_APP	= 19;	// 操作種別"Outlook送信"を表す識別子
const WAET_WEBACCESS_OUTLOOK_COM		= 23;	// 操作種別"Outlook.com送信"を表す識別子

const BROWSER_ID_FIREFOX			= 0;	// Firefox
const BROWSER_ID_GOOGLE_CHROME		= 1;	// Google Chrome

/**
 * @brief		メール解析クラス
 * @author		misaki-s
 */
var CLogGMailAnalyzer =
{
	/**
	 *	初期化
	 */
	init: function()
	{
		initAnalyzer(document, this.sendMailHandler, BROWSER_ID_GOOGLE_CHROME);
	},
	/**
	 *	終了処理
	 */
	finish: function()
	{
	},
	
    /**
	 * メール送信通知
	 */
	sendMailHandler: function(_type, _from, _to, _cc, _bcc, _subject, _body, _attachments, _errorData)
	{	
	    //alert( "from[" + _from + "]\n to[" + (_to) + "]\n cc[" + (_cc) + "]\n bcc[" + (_bcc) + "]\n subject[" + _subject + "]\n body[" + _body + "]\n attachments[" + (_attachments) + "]\n");

	    chrome.runtime.sendMessage(
		{
			action: "SendMail",
			type: _type,
		    from: _from,
		    to: _to,
		    cc: _cc,
		    bcc: _bcc,
		    subject: _subject,
		    body: _body,
		    attachments: _attachments,
			errorData: _errorData
		},
		function(response) {
		    // console.log("content-script result: " + response.result);
		});
	}
};

/**
 * @brief		Webアップロード解析クラス
 * @author		K.Higashihara
 */
var CLogWebUploadAnalyzer =
{
	/**
	 *	初期化
	 */
	init: function()
	{
		initAnalyzerWebUpload(document, this.webUploadHandler, BROWSER_ID_GOOGLE_CHROME);
	},
	/**
	 *	終了処理
	 */
	finish: function()
	{
	},

	/**
	 * Webアップロード通知
	 */
	webUploadHandler: function(_fileName)
	{
		chrome.runtime.sendMessage(
		{
			action: "WebUpload",
			fileName: _fileName
		},
		function(response) {
		});
	}
};
