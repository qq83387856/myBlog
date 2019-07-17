//////////////////////////
// Definition of package
//////////////////////////
if (null == SkyFrame) {
	var SkyFrame = {};
}
if (null == SkyFrame.Download) {
	SkyFrame.Download = {};
}
if (null == SkyFrame.Download.DownloadAnalyzer) {
	SkyFrame.Download.DownloadAnalyzer = {};
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

SkyFrame.Download.DownloadAnalyzer.analyzeCommon = function(downloadItem)
{
	try {
		var downloadId	= downloadItem.id;
		var url			= ConvertPunyCode(downloadItem.url);
		var filename	= downloadItem.filename;

		var result = logchrome.analyzeDownload(url, filename);
		if (null == result) {
			// 異常な場合は即時禁止
			return {cancel: true};
		}

		if(result.prohibit) {
			// 即時禁止
			return {"cancel": true};
		}

		if(result.analyze) {
			// 解析終了
			return {analyze:true};
		}
	} catch(ex){
		// 異常な場合は即時禁止
		return {cancel: true};
	}
}

SkyFrame.Download.DownloadAnalyzer.analyzeOld = function(downloadItem)
{
	var cancel = true;	// デフォルトは禁止
	try {
		var downloadId	= downloadItem.id;
		var url			= ConvertPunyCode(downloadItem.url);
		var filename	= downloadItem.filename;

		logchrome.ondeterminingfilename( downloadId, url );

		cancel = logchrome.isdownloadforbidden( downloadId );

		logchrome.notifydownload(downloadId, filename );
	} catch(ex){}

	return {"cancel" : cancel};
}
