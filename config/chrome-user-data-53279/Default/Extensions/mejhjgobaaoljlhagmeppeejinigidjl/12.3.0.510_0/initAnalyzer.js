/* Copyright (c)2006-2016 Sky Co., LTD. All rights reserved. */
/**
 * Gmail/Outlook/Outlook.com解析初期化
 * param doc 読み込みの完了したdocument
 * param handler メール送信通知ハンドラ
 * param browserId ブラウザ種別
 */
function initAnalyzer(doc, handler, browserId) {
	if( 0 <= doc.documentURI.indexOf("mail.google.com/mail") )
	{
		g_SendMailHandler = handler;
		var gmailAnalyser = new CLogGMailAnalyser(doc);
		return true;
	}
	else if( 0 <= doc.documentURI.indexOf("outlook.office365.com") ||
			 0 <= doc.documentURI.indexOf("outlook.office.com") ||
			 0 <= doc.documentURI.indexOf("outlook.com") )
	{
		g_SendMailHandler = handler;
		var mailAnalyser = new CLogOutlookAnalyser(doc, browserId);
		return true;
	}
	else if( 0 <= doc.documentURI.indexOf(".mail.live.com") ||
			 0 <= doc.documentURI.indexOf("outlook.live.com") ||
			 0 <= doc.documentURI.indexOf("calendar.live.com"))
	{
		g_SendMailHandler = handler;
		var mailAnalyser = new CLogOutlookComAnalyser(doc, browserId);
		return true;
	}

	return true;
}

/**
 * Webアップロード解析初期化
 * param doc 読み込みの完了したdocument
 * param handler Webアップロード通知ハンドラ
 * param browserId ブラウザ種別
 */
function initAnalyzerWebUpload(doc, handler, browserId) {
	if( 0 <= doc.documentURI.indexOf("drive.google.com") )
	{
		// Google Drive
		g_WebUploadHandler = handler;
		var mailAnalyser = new CLogGoogleDriveAnalyser(doc, browserId);
		return true;
	}

	return true;
}

/* Copyright (c)2006-2016 Sky Co., LTD. All rights reserved. */
