/* Copyright (c)2016 Sky Co., LTD. All rights reserved. */

/**
 * @file		googledrive.js
 * @brief		Google Driveファイルアップロード解析のJavaScript部
 * @date		2016/03/14
 * @author		K.Higashihara
 */

var g_WebUploadHandler = null;

var CLogGoogleDriveAnalyser = function(doc, browserId) {

	this.rootDoc = doc;
	this.browserId = browserId;

	/**
	 * 初期化
	 */
	this.init = function(doc) {
		try {
			var thisObj = this;

			// 各種イベントを設定
			doc.addEventListener("change",		function (event) { thisObj.changeEventHandler(event, thisObj); },	true);
			doc.addEventListener("drop",		function (event) { thisObj.dropEventHandler(event, thisObj); },		true);
		}
		catch(ex){
			//console.log(ex);
		}
	};

	/**
	 * ファイル選択ハンドラ
	 */
	this.changeEventHandler = function (event, thisObj)
	{
		if (null == g_WebUploadHandler) {
			return;
		}

		try {
			var fileList = event.target.files;
			if (fileList) {
				var num = fileList.length;
				for (var i = 0; i < num; i++) {
					var file = fileList[i];
					
					// Webアップロードを通知する。
					g_WebUploadHandler(
						file.name);
				}
			}
		}
		catch(ex){
			//console.log(ex);
		}
	};

	/**
	 * ドロップハンドラ
	 */
	this.dropEventHandler = function (event, thisObj)
	{
		try {
			var dataTransfer = event.dataTransfer;
			if (dataTransfer && dataTransfer.items) {
				var items = dataTransfer.items;
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var entry = item.webkitGetAsEntry();
					
					// Entryを解析する。
					thisObj.traverseEntry(entry, thisObj);
				}
			}
		}
		catch(ex){
			//console.log(ex);
		}
	};

	/**
	 * Entry解析処理
	 */
	this.traverseEntry = function (entry, thisObj)
	{
		if (null == g_WebUploadHandler) {
			return;
		}
		
		if (entry.isFile) {
			// ファイル
			// Webアップロードを通知する。
			g_WebUploadHandler(
				entry.name);
		} else if (entry.isDirectory) {
			// フォルダ
			var reader = entry.createReader();
			reader.readEntries(
				function(results) {
					for (var i = 0; i < results.length; i++) {
						// 再度Entryを解析する。
						thisObj.traverseEntry(results[i], thisObj);
					}
				},
				function(error) {
					//console.log(error);
				}
			);
		}
	};

	this.init(doc);
}

/* Copyright (c)2016 Sky Co., LTD. All rights reserved. */
