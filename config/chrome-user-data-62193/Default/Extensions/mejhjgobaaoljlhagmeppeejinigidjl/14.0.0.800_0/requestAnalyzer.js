//////////////////////////
// Definition of package
//////////////////////////
if (null == SkyFrame) {
	var SkyFrame = {};
}
if (null == SkyFrame.WebRequest) {
	SkyFrame.WebRequest = {};
}
if (null == SkyFrame.WebRequest.RequestAnalyzer) {
	SkyFrame.WebRequest.RequestAnalyzer = {};
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

// content_scriptsから受取ったアップロードされた可能性のあるファイルが格納されます。key: tabId, value fileNameList
SkyFrame.WebRequest.RequestAnalyzer.FileNameMap = [];

SkyFrame.WebRequest.RequestAnalyzer.getRequestHeaderValue_ = function(requestHeaders, name) {
	var nameLower = name.toLowerCase();
	for (var i = 0; i < requestHeaders.length; i++) {
		var headInfo = requestHeaders[i];
		if (headInfo.name && headInfo.name.toLowerCase() == nameLower) {
			if (headInfo.value) {
				return headInfo.value;
			}
		}
	}
	
	return "";
}


SkyFrame.WebRequest.RequestAnalyzer.RemoveSingleQuotation_ = function(targetString)
{
	if (0 == targetString.indexOf("'")) {
		targetString = targetString.substr(1);
	}
	if (targetString.length - 1 == targetString.indexOf("'")) {
		targetString = targetString.substr(0, targetString.length - 1);
	}
	return targetString;
}

SkyFrame.WebRequest.RequestAnalyzer.getOffice365OneDriveWebuploadFile_ = function(url) {
	try {
		var urlLower = url.toLowerCase();
		var urlpath = urlLower;
		var urlparams = {};
		var index = urlLower.indexOf("?");
		if (0 <= index) {
			urlpath = urlLower.substr(0, index);
			var urlparam = url.substr(index + 1);
			var keys = urlparam.split("&");
			keys = keys.map( function(e){ return  e.split("="); } )
			urlparams = keys.reduce( function(p, e){  var name=e[0]; var val=e[1]; p[name]=val; return p;  }, {} );
		}
		
		var indexSharePoint = urlpath.indexOf (".sharepoint.com/");
		if (0 >= indexSharePoint) {
			// Not tareget host
			return "";
		}

		var findActionUrl = "/files/add";
		var indexActionUrl = urlpath.indexOf (findActionUrl.toLowerCase());
		if (0 < indexActionUrl) {
			// どこかに一致した場合
			var RemoveSingleQuotation = SkyFrame.WebRequest.RequestAnalyzer.RemoveSingleQuotation_;// alias
			
			// pattern A
			var urlFile = urlparams["@url"];
			if (urlFile && 0 < urlFile.length) {
				var filename = decodeURIComponent(urlFile);
				return RemoveSingleQuotation(filename);
			}
			
			// pattern B
			urlFile = urlparams["@file"];
			if (urlFile && 0 < urlFile.length) {
				var filename = decodeURIComponent(urlFile);
				return RemoveSingleQuotation(filename);
			}
		}
	}
	catch(e) {
		
	}
	
	return "";
}

SkyFrame.WebRequest.RequestAnalyzer.convertHeaders_ = function(headers)
{
	try {
		var headerResult = "";
		for (var header of headers) {
			headerResult += header.name + ": " + header.value + "\r\n"
		}
		return headerResult;
	} catch(ex) {}
	return "";
}

SkyFrame.WebRequest.RequestAnalyzer.deletePostData = function(request)
{
	try {
		if (null == request.dataId) {
			return;
		}

		logchrome.deletePostData(request.dataId);
	} catch(ex) {}
}

SkyFrame.WebRequest.RequestAnalyzer.analyzeCommon = function(request)
{
	try {
		var url		= request.url;
		var method	= request.header.method;
		var header	= SkyFrame.WebRequest.RequestAnalyzer.convertHeaders_(request.header.requestHeaders);

		var usepostdata = true;	// 解析にボディが必要か否か
		{	// 解析要否チェック
			var resultTarget = logchrome.analyzeRequestTarget(url, method, header);
			if (null == resultTarget) {
				return;	// 次の解析処理へ
			}
			if (resultTarget.analyze) {
				// 解析対象(処理継続)
				if (resultTarget.analyzenousepostdata) {
					usepostdata = false;	// bodyいらない
				}
			} else {
				// 解析対象外
				return;	// 次の解析処理へ
			}
		}

		// 解析にbodyが必要な場合のみbodyデータを準備
		var dataId = null;
		if (usepostdata) {
			if (null == request.dataId) {
				// 誰も準備していない場合のみ、準備する
				if (null != request.body.requestBody) {
					if (null != request.body.requestBody.raw) { 
						request.dataId = logchrome.sendPostData(request.body.requestBody.raw);
					} else if (null != request.body.requestBody.formData) { 
						try {
							// 「multipart/form-data」または「application/x-www-form-urlencoded」の場合
							// formDataにkey value形式でparseされ、rawデータがなくなる仕様です。
							// そのため、一律application/x-www-form-urlencoded形式のrawデータに復元して
							// 通知するよう対応しています。
							// content-typeの際はNatvie側で吸収しています。将来はここで対処するかもしれません。
							var postDataStr = SkyFrame.WebRequest.RequestAnalyzer.CreatePostDataFromFormData_(request.body.requestBody.formData);
							var postDataUtf8Array = new TextEncoder().encode(postDataStr);
							request.dataId = logchrome.sendPostData(
								[
									{"bytes" : postDataUtf8Array}
								]
							);
						} catch(ex) {}
					}
				}
			}
			dataId = request.dataId;
		}

		var result = logchrome.analyzeRequest(url, method, header, dataId);
		if (null == result) {
			// 異常な場合は即時禁止
			return {cancel: true};
		}

		if(result.operation) {
			try {
				chrome.tabs.sendMessage(request.tabId, {action: "operation", operation: result.operation});
			}catch(ex){}
		}
		if(result.prohibit) {
			// 即時禁止
			return {cancel: true};
		}

		if(result.analyze) {
			// 解析終了
			return {analyze:true};
		}
	} catch(ex) {
		// 異常な場合は即時禁止
		return {cancel: true};
	}
}

SkyFrame.WebRequest.RequestAnalyzer.checkTabId = function(request)
{
	try {
		var tabId	= request.tabId;

		if (0 > tabId) {
			// 解析終了
			return {analyze:true};
		}
	} catch(ex){}
}


SkyFrame.WebRequest.RequestAnalyzer.checkExcludeUrl = function(request)
{
	try {
		var url = request.url;

		if(logchrome.isExcludeURLPost(url)) {
			// 解析終了
			return {analyze:true};
		}
	} catch(ex){}
}

SkyFrame.WebRequest.RequestAnalyzer.analyzeOffice = function(request)
{
	try {
		var url		= request.url;
		var method	= request.header.method;
		var tabId	= request.tabId;

		if(false == logchrome.isofficeposturl( url, method, tabId)) {
			return;		// 次の解析処理へ
		}
		if ("GET" != method) {
			var body	= request.body.requestBody;
			if (body) {
				// 解析パターン１
				if (null != body.raw) {
					if(0 < body.raw.length) {
						if( null != body.raw[0].bytes ) {
							if (null == request.dataId) {
								request.dataId = logchrome.sendPostData(body.raw); // 全部送って受け先で取るデータを絞る形で
							}

							if (null != request.dataId) {
								// データがある場合のみ処理
								logchrome.webofficecontentsRaw( url, request.dataId);
								return;		// 次の解析処理へ
							}
						}
					}
				}
			}
		}

		// 解析パターン２（１で解析できなかった場合）
		chrome.tabs.sendMessage(tabId, {action: "getOfficeFileName", "tabId": tabId}, function(response) {
			if(response && ("" != response)) {
				// 取得成功時は通知して終了
				var file = response;
				logchrome.weboffice( url, file, tabId );
			} else {
				// 取得できない場合は100ms後にリトライ
				window.setTimeout(function() {
					chrome.tabs.sendMessage(tabId, {action: "getOfficeFileName", "tabId": tabId}, function(response) {
						if(response && ("" != response)) {
							// 取得成功時は通知して終了
							var file = response;
							logchrome.weboffice( url, file, tabId );
						} else {
							// 取得できない場合は1000ms後にリトライ
							window.setTimeout(function() {
								chrome.tabs.sendMessage(tabId, {action: "getOfficeFileName", "tabId": tabId}, function(response) {
									// 成否に関わらずとりあえず送っとく
									var file = response;
									logchrome.weboffice( url, file, tabId );
								});
							}, 1000);
						}
					});
				}, 100);
			}
		});
	} catch(ex){}
}

SkyFrame.WebRequest.RequestAnalyzer.analyzeBodyRawData = function(request)
{
	try {
		var method	= request.header.method;
		var url		= request.url;
		
		if ("POST" != method) {
			// 各メソッドに対するアップロード対象URLならば解析を行なう。
			var uploadTargetUrl = logchrome.getUploadTargetUrl();
			var targetUrlList = uploadTargetUrl[method];
			var isTarget = false;
			if (null != targetUrlList) {
				for (targetUrlObj of targetUrlList) {
					
					if (-1 != url.indexOf(targetUrlObj)) {
						isTarget = true;
						break;
					}
				}
			}
			
			if (!isTarget) {
				return;		// 次の解析処理へ
			}
		}

		var rawData	= request.body.requestBody.raw;
		
		// Gmailで25MB以上のデータをFirefox53以降でアップロードした場合のみ
		// FormDataのキーにjsonデータが入ってきてしまうため
		// ここでrowDataに入れ替えてデータとして扱う
		if (null == rawData) {
			if (0 < url.indexOf(".google.com/upload/drive/resumable?") ||
			    0 < url.indexOf(".google.com/upload/resumableuploadsc?") ||
				0 < url.indexOf(".google.com/upload/att?")
			) {
				try {
					var formData = request.body.requestBody.formData;
					if (formData) {
						for (var key in formData) {
							try {
								var tempData = JSON.parse(key);
								if (tempData instanceof Object) {
									rawData = [{"bytes": (new TextEncoder().encode(key))}];
									break;
								}
							}
							catch (e) {
								// jsonデータじゃない場合は無視
							}
						}
					}
				}
				catch(e) {
				}
			}
		}
		
		if ( (null == rawData) || (0 >= rawData.length ) ) {
			// FirefoxではrawDataがundefinedになり、Chromeではinstanceはできる、といったように挙動が違うため広く待つ。
			if (0 < url.indexOf(".google.com/_/upload?") ||
				0 < url.indexOf(".google.com/upload/drive")) {
				// Gmailで25MB未満のファイルを直接添付した場合URLは[.google.com/_/upload?]になる。
				// この場合ヘッダにファイル情報が入っているのでrawDataにダミーを入れてデータとして扱う。
				var temp = (new Uint8Array([].map.call("empty_data", function(c) {
					return c.charCodeAt(0);
				}))).buffer;
				rawData = [{"bytes": temp}];
			}
		}
		
		if (null == rawData) {
			return;		// 次の解析処理へ
		}

		if( rawData.length > 0) {

			if (null == request.dataId) {
				request.dataId = logchrome.sendPostData(rawData);
			}
			if (null != request.dataId) {
				// データがある場合のみ処理
				var canPost = logchrome.webpostRaw(url, request.dataId);
				if (false == canPost) {
					return {cancel: true};
				}
			}
		}

		for (var i = 0; i < rawData.length; i++) {
			if (null == rawData[i].file) {
				continue;
			}
			
			// ファイルパスに含むことができない文字が入っている場合、除外する。
			// 但し "\","/",":"はファイルパスが来たときに含まれる可能性があるため除外しないようにします。
			var pattern = /[*?"<>|]/;
			if (null != rawData[i].file.match(pattern)) {
				
				// Gmailの添付ファイルはfile: <file>が入っており、ファイル名はHeaderのContent-Dispositionに含まれている。
				// そのため、とりあえず<file>が入ってきた場合、ネイティブアプリケーション側に情報を渡し、解析を依頼する。
				if ("<file>" == rawData[i].file) {
					
					// 解析してもらうためbytesにデータを入れておく。
					var temp = (new Uint8Array([].map.call("empty_data", function(c) {
						return c.charCodeAt(0);
					}))).buffer;
					rawData[0].bytes = temp;
					
					// 予期しないリクエストの場合解析できずWebアップロードログが取得できない可能性があるため、
					//フェイルセーフとしてcontent-scriptsから取り出したファイルを入れておく。
					var tabId = request.tabId;
					var fileNameList = SkyFrame.WebRequest.RequestAnalyzer.FileNameMap[tabId];
					if (null != fileNameList) {
						var fileObj = fileNameList.pop();
						if (null != fileObj) {
							var faleSafeFile = {
								"name": "faleSafeFileName",
								"value": fileObj
							};
							request.header.requestHeaders.push(faleSafeFile);
						}
					}
				}
				
				// それ以外は解析を行なわない。
				continue;
			}
			
			var canUpload = logchrome.webupload(url, rawData[i].file);
			if (false == canUpload) {
				return {cancel: true};
			}
		}
		
		var ondriveFileName = SkyFrame.WebRequest.RequestAnalyzer.getOffice365OneDriveWebuploadFile_(url);
		if ((null != ondriveFileName) && (0 < ondriveFileName.length)) {
			var canUpload = logchrome.webupload(url, ondriveFileName);
			if (false == canUpload) {
				return {cancel: true};
			}
		}

		if( (rawData.length > 0) && (null != rawData[0].bytes) ) {
		
			if (null == request.dataId) {
				request.dataId = logchrome.sendPostData(rawData); // 全部送って受け先で取るデータを絞る形で
			}
			
			if (null != request.dataId) {
				// データがある場合のみ処理
				var header = SkyFrame.WebRequest.RequestAnalyzer.convertHeaders_(request.header.requestHeaders);
				var canUpload = logchrome.webuploadcontentsRaw( url, request.dataId, header );
				if (false == canUpload) {
					return {cancel: true};
				}
			}
		}

	} catch(ex){}
}

SkyFrame.WebRequest.RequestAnalyzer.analyzeBodyFormData = function(request)
{
	try {
		var method	= request.header.method;
		if ("POST" != method) {
			return;		// 次の解析処理へ
		}

		var formData	= request.body.requestBody.formData;
		if (null == formData) {
			return;		// 次の解析処理へ
		}

		var url	= request.url;
		var tabId = request.tabId;
		var canRequest =  SkyFrame.WebRequest.RequestAnalyzer.analyzeFormData_(url, formData, tabId);
		if (false == canRequest) {
			// 即時禁止
			return {cancel: true};
		}
	} catch(ex){}
}

SkyFrame.WebRequest.RequestAnalyzer.analyzeBodyFormDataReady = function(request)
{
	try {
		var method	= request.body.method;
		if ("POST" != method) {
			return;		// 次の解析処理へ
		}

		var formData	= request.body.requestBody.formData;
		if (null == formData) {
			formData = request.body.requestBody.lenientFormData;
			if (null == formData) {
				return;		// 次の解析処理へ
			}
		}

		{ // check
			var isTargetRequest = false;
			for (key in formData) {
			var values = formData[key].join("");
				if (values.match(/[^\u0020-\u007E]/)) {
					isTargetRequest = true;
					break;
				}
			}
			if (false == isTargetRequest) {
				return;
			}
		}
		
		var url			= request.url;
		var tabId		= request.tabId;
		var requestId	= request.requestId;

		// 値に全角文字が含まれる場合、DOMデータを取得する。
		chrome.tabs.sendMessage(tabId, {action: "getFormsData", reqid:requestId, convurl:url}, function(response) {
			if( null == response ){
				return;
			}
			
			var domData = response.formdata;
			for (key in formData) {
				var valuesFormData = formData[key].join("");
				if (null == valuesFormData.match(/[^\u0020-\u007E]/)) {
					// 値に全角文字が含まれない場合、何もしない。
					continue;
				}
				
				if (false == (key in domData)) {
					// DOMにキーが存在しない場合、何もしない。
					continue;
				}
				
				var valuesDomData = domData[key].join("");
				if (null == valuesDomData.match(/[^\u0020-\u007E]/)) {
					// DOMの値に全角文字が含まれない場合、何もしない。
					continue;
				}
				
				if (-1 == formData[key].indexOf("C:\\fakepath\\")) {
					// DOMの値に"C:\fakepath\"が付与されている場合は削除する。
					for (var i = 0; i < domData[key].length; i++) {
						domData[key][i] = domData[key][i].replace("C:\\fakepath\\", "");
					}
				}
				
				// DOMの値を上書きする。
				formData[key] = domData[key];
			}
		});
		// レスポンスより前にDOMデータ取得処理が行われるように、100msスリープする。
		logchrome.sleep(100);
	} catch(ex){}
}

SkyFrame.WebRequest.RequestAnalyzer.CreatePostDataFromFormData_ = function( formData )
{
	try { // analyze post
		var postDataStr = "";
		for (key in formData) {
			try {
				for (var i = 0; i < formData[key].length; i++) {
					if (0 < postDataStr.length) {
						postDataStr += "&";
					}
					// key=value&key=value
					postDataStr += key + "=" + encodeURIComponent(formData[key][i]);
				}
			} catch(e){}
		}
		
		// 改行コードを変換する。
		postDataStr = postDataStr.replace(/\r\n/g, "\n");
		postDataStr = postDataStr.replace(/\n/g, "\r\n");
		return postDataStr;
	} catch (ex){}

	return "";
}

SkyFrame.WebRequest.RequestAnalyzer.analyzeFormData_ = function( url, formData, tabId )
{
	try { // analyze post
		var postDataStr = SkyFrame.WebRequest.RequestAnalyzer.CreatePostDataFromFormData_(formData);
		var canPost = logchrome.webpost(url, postDataStr);
		if (false == canPost) {
			return false;
		}
	} catch(ex){}

	try { // analyze upload
		for (key in formData) {
			try {
				for (var i = 0; i < formData[key].length; i++) {
					if(null == encodeURIComponent(formData[key][i]) ){
						continue;
					}
					var value = formData[key][i];
					
					var fileNameList = SkyFrame.WebRequest.RequestAnalyzer.FileNameMap[tabId];
					var exist = false;
					var index = 0
					if (null != fileNameList) {
						for (index = 0; index < fileNameList.length; index++) {
							var fileNameObj = fileNameList[index];
							if (fileNameObj == value) {
								exist = true;
								break;
							}
						}
					}
					
					if (false == exist) {
						if( key != value ) {
							continue;
						}
						
						//keyとvalueが同じ値であれば、ファイルアップロードの可能性
						if(false == logchrome.ischromeupload( url ) ) {
							continue;
						}
					}
					
					var file = value;
					var canUpload = logchrome.webupload(url, file);
					if (false == canUpload) {
						// Webアップロード禁止
						return false;
					}
					
					if (exist) {
						// Webアップロード禁止しない場合だけ、ファイル名リストから削除する
						// →Webアップロードの要求が複数回くるサイトの場合、禁止できなくなる為
						fileNameList.splice(index, 1);
					}
				}
			} catch(e){}
		}
	} catch(ex){}

	return true;	// リクエスト継続可能
}

SkyFrame.WebRequest.RequestAnalyzer.analyzeBodyLenientFormData = function(request)
{
	try {
		var method = request.header.method;
		
		if ("POST" != method) {
			return;	// 次の解析処理へ
		}
		
		// FxのみlenientFormDataが存在する
		var lenientFormData = request.body.requestBody.lenientFormData;
		if (null == lenientFormData) {
			return;	// 次の解析処理へ
		}
		
		var url = request.url;
		for (key in lenientFormData) {
			try {
				for (var i = 0; i < lenientFormData[key].length; i++) {
					if (null == encodeURIComponent(lenientFormData[key][i])) {
						continue;
					}
					
					var value = lenientFormData[key][i];
					var tabId = request.tabId;
					var fileNameList = SkyFrame.WebRequest.RequestAnalyzer.FileNameMap[tabId];
					var exist = false;
					if (null != fileNameList) {
						var index = 0
						for (index = 0; index < fileNameList.length; index++) {
							var fileNameObj = fileNameList[index];
							if (fileNameObj == value) {
								fileNameList.splice(index, 1);
								exist = true;
								break;
							}
						}
					}
					
					if (false == exist) {
						if( key != value ) {
							continue;
						}
						
						//keyとvalueが同じ値であれば、ファイルアップロードの可能性
						if(false == logchrome.ischromeupload( url ) ) {
							continue;
						}
					}

					var file = value;
					var canUpload = logchrome.webupload(url, file);
					if (false == canUpload) {
						return {cancel: true};
					}
				}
			} catch(ex2){}
		}
	} catch(ex) {}
}

SkyFrame.WebRequest.RequestAnalyzer.analyzeBITS = function(request)
{
	try {
		var headers = request.header.requestHeaders;
		var contenttype = SkyFrame.WebRequest.RequestAnalyzer.getRequestHeaderValue_(headers, "Content-Type");
		if( contenttype.toLowerCase().indexOf("application/octet-stream") == -1 ) {
			return;
		}

		var bitpackettype = SkyFrame.WebRequest.RequestAnalyzer.getRequestHeaderValue_(headers, "BITS-Packet-Type");

		if( bitpackettype.toLowerCase().indexOf("create-session") == -1) {
			return;
		}
		
		var url		= request.header.url;	// 未変換のURLを使用する
		var file	= "";
		{	// 最後のスラッシュ以降がファイルパス
			var decurl	= decodeURI(url);
			var pos = decurl.lastIndexOf("/");
			file = decurl.substring( pos + 1);
		}

		if( file.length > 0 ){
			var canUpload = logchrome.webupload(url, file);
			if (false == canUpload) {
				// 即時禁止
				return {cancel: true};
			}
		}

	} catch(ex){}
}


SkyFrame.WebRequest.RequestAnalyzer.analyzeOutlook = function(request)
{
	try {
		var url		= request.header.url;	// 未変換のURLを使用する
		var method	= request.header.method;
		if (false == logchrome.isoutlookwebuploadurl(url, method)) {
			return;
		}

		var headers = request.header.requestHeaders;
		var urlPostData = SkyFrame.WebRequest.RequestAnalyzer.getRequestHeaderValue_(headers, "X-OWA-UrlPostData");
		if (0 < urlPostData.length) {
			{	// check post
				urlPostData = decodeURIComponent(urlPostData);
				var canPost = logchrome.webpost(url, urlPostData);
				if (false == canPost) {
					// 即時禁止
					return {cancel: true};
				}
			}
			{	// check upload
				var header = SkyFrame.WebRequest.RequestAnalyzer.convertHeaders_(request.header.requestHeaders);
				var canUpload = logchrome.webuploadcontents(url, urlPostData, header);
				if (false == canUpload) {
					// 即時禁止
					return {cancel: true};
				}
			}
		}
	} catch(ex){}
}

SkyFrame.WebRequest.RequestAnalyzer.analyzeOneDrive = function(request)
{
	try {
		var method	= request.header.method;
		var tabId	= request.tabId;
		var url		= request.url;

		chrome.tabs.get(tabId, function callback(tab){
			try {
				logchrome.onedriveaccess( url, method, tab.title, tabId );
			}
			catch(e){}
		} );

		var prohibitAccess 	= logchrome.isonedriveaccessforbidden( url, method, tabId );
		if(prohibitAccess){
			// 即時禁止
			return {cancel: true};
		}
	} catch(ex){}
}