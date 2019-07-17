//////////////////////////
// Definition of package
//////////////////////////
if (null == SkyFrame) {
	var SkyFrame = {};
}
if (null == SkyFrame.Download) {
	SkyFrame.Download = {};
}
//////////////////////////

// ■propety関数は指定名前空間クラスのメンバ関数のイメージ
//   testnamespace.ClassSample = function() {
//      クラスのコンストラクタ
//   }
//   testnamespace.ClassSample.propety.methodSample = function() {
//      クラスのメンバ関数
//   }
//   呼び出し方
//   var sampleInstance = new testnamespace.ClassSample(); // newしてオブジェクト化する必要あり
//   sampleInstance.methodSample();
//
// ■propetyなし関数は指定名前空間の静的関数のイメージ
//   testnamespace.namespaceSample = {} 名前空間
//   testnamespace.namespaceSample.staticMethodSample = function() {
//      名前空間内の静的関数
//   }
//   呼び出し方
//   testnamespace.namespaceSample.staticMethodSample(); // そのまま呼べる



SkyFrame.Download.DownloadMgr = function()
{
	// propety
	this.DownloadtemCacheList_	= {};
	
	// public if
	this.onDownload = new SkyFrame.Common.Listener();

	// callback
	var thisObj = this;
	chrome.downloads.onDeterminingFilename.addListener(function(delta) {
		try {
			thisObj.onDeterminingFilename(thisObj, delta);
		} catch(ex){}
	});

	chrome.downloads.onChanged.addListener(function(downloadItem, suggestFunc) {
		try {
			thisObj.onCangedDownloadItem(thisObj, downloadItem, suggestFunc);
		} catch(ex){}
	});

	chrome.downloads.onCreated.addListener(function(downloadItem) {
		try {
			thisObj.onCreated(thisObj, downloadItem);
		} catch(ex){}
	});
}

SkyFrame.Download.DownloadMgr.prototype.onCangedDownloadItem = function(thisObj, delta)
{
	try {
		var downloadId = delta.id;
		var downloadItem = thisObj.DownloadtemCacheList_[downloadId];
		if (null == downloadItem) { // 無いときは作っておく
			downloadItem = 
			{
				"id" : downloadId
			};
		}

		for (var key in delta) {
			if (key != 'id') {	// IDは変更内容では無いので上書き対象外
				downloadItem[key] = delta[key].current;
			}
		}
		
		if (null != delta.filename) {	// file名がフルパスに更新されたタイミングでダウンロード通知を行う
			chrome.downloads.pause(downloadId);

			var cancel = false;
			for (var ListenerObj of thisObj.onDownload.listenerList) {
				var result = null;
				try {
					result = ListenerObj(downloadItem);
				} catch(ex2) {}

				if (null == result) {
					continue;
				}

				if (result.cancel) {
					cancel = true;
					break;
				}

				if (result.analyze) {
					break;
				}
			}
			if (cancel) {
				chrome.downloads.cancel( downloadId);
				chrome.downloads.removeFile(downloadId);
			} else {
				chrome.downloads.resume( downloadId );
			}
		}
		
		if (null != delta.state) {	// ステータス更新あり
			// https://developer.chrome.com/extensions/downloads#type-State
			if (("complete" 	== delta.state.current) ||	// 完了
				("interrupted"	== delta.state.current)) {	// キャンセル or 失敗
				// ダウンロード処理が終了したため不要となったダウンロード情報を削除
				delete thisObj.DownloadtemCacheList_[downloadId];
			}
		}
	} catch(ex){}
}

SkyFrame.Download.DownloadMgr.prototype.onDeterminingFilename = function(thisObj, downloadItem, suggestFunc)
{
	try {
		// 更新情報を丸ごと上書き
		thisObj.DownloadtemCacheList_[downloadItem.id] = downloadItem;
	} catch(ex){}
}

SkyFrame.Download.DownloadMgr.prototype.onCreated = function(thisObj, downloadItem)
{
	try {
		// 初期情報をキャッシュ
		thisObj.DownloadtemCacheList_[downloadItem.id] = downloadItem;
	} catch(ex){}
}