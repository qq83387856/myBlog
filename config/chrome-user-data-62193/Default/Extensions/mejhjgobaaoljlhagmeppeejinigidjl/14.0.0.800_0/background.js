// native hostが使用できない環境では基本的に処理は全て終了する

// contents script側でnative hostが使用できるか
// 判断できるよう事前にリスナーを登録しておく
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (!sender.tab) {
			return;
		}

		if (request.action == "IsAllowContentScript") {
			var enableGoogleDriveDomAnalyze = true;
			
			// chrome バージョン58未満のみ有効
			if (g_browserInfo) {
				if (g_browserInfo.type == "chrome") {
					if (g_browserInfo.version && 58 < g_browserInfo.version) {
						enableGoogleDriveDomAnalyze = false;
					}
					else {
						// それ以外は念のため取得
					}
				}
				// Chrome以外のブラウザは取得しない
				else {
					enableGoogleDriveDomAnalyze = false;
				}
			}
			else {
				// それ以外は念のため取得
			}
			var responseAllowContentScript = {
				"enable" : logchrome.enableNativeHost(),
				"enableGoogleDriveDomAnalyze" : enableGoogleDriveDomAnalyze
			};
			sendResponse(responseAllowContentScript);
		}
	}
);

if (false == logchrome.enableNativeHost()) {
	// native hostが使用できない段階で即終了(returnが使えないのでif-elseで)
	// NOP

} else {
	// native hostが使用できる環境では各種処理を進めていく

	logchrome.initIDAdt();

	// ---- Web AccessLog ----
	function ontabcreated(tab)
	{
		logchrome.tabcreated(tab.url, tab.title, tab.id);
		logchrome.tabactived(tab.id, tab.windowId, tab.active);
	};

	function ontabupdated(tabId, changeInfo, tab)
	{
		if( changeInfo.status == "complete" )
		{
			var result = false;

			var url = ConvertPunyCode(tab.url);
			
			result = logchrome.tabupdated( url, tab.title, tabId);
			if( result == false )
			{
				logchrome.tabupdated( url, tab.title, tabId);
			}

			logchrome.tabactived(tabId, tab.windowId, tab.active);
		}
	};

	function ontabremoved( tabid )
	{
		delete SkyFrame.WebRequest.RequestAnalyzer.FileNameMap[tabid];
		
		logchrome.tabremoved(tabid);
	};

	function ontabactived(activeInfo)
	{
		logchrome.tabactived(activeInfo.tabId, activeInfo.windowId, true);
	};

	chrome.tabs.onCreated.addListener(ontabcreated);
	chrome.tabs.onUpdated.addListener(ontabupdated);
	chrome.tabs.onRemoved.addListener(ontabremoved);
	chrome.tabs.onActivated.addListener(ontabactived);

	var RequestMgrInstance = new SkyFrame.WebRequest.RequestMgr;
	logchrome.getsetting(function(setting)
	{

		// 上から順番に処理されます。
		// キャンセルまたは解析終了となった時点で呼び出しが終了します
		// その場合は、それ以降の呼び出し自体がキャンセルされます。
		// 
		try {	// chrome.webRequest.onBeforeRequestのタイミング
			// 新解析処理はいまのところなし

			//以下は旧解析処理

			// 事前チェック処理
			RequestMgrInstance.onPreBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.checkTabId);
			RequestMgrInstance.onPreBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.checkExcludeUrl);

			if (setting.iswebupload){
				// オフィス事前準備処理
				RequestMgrInstance.onPreBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.analyzeBodyFormDataReady);
			}
		} catch(ex){}


		try {	// chrome.webRequest.onBeforeSendHeadersのタイミング
			// 事前チェック処理
			RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.checkTabId);
			RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.checkExcludeUrl);
			
			// 各種解析処理の前に、onedrive禁止判定を優先して行います。
			// ※各種解析で解析対象としてして判定された場合、付加軽減のために次移行の解析処理を行わないため。
			// OneDrive解析
			RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.analyzeOneDrive);

			// 新解析処理
			RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.analyzeCommon);

			if (setting.iswebupload){
				// オフィス作成データ解析処理
				RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.analyzeOffice);
				
				// ポストデータ解析処理
				RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.analyzeBodyRawData);
				RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.analyzeBodyFormData);
				RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.analyzeBodyLenientFormData);

				// OndDrive解析(BITS)
				RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.analyzeBITS);

				// Outlook解析
				RequestMgrInstance.onBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.analyzeOutlook);
			}
		} catch(ex){}


		try {	// chrome.webRequest.onBeforeSendHeadersの処理が終わった後のタイミング
			RequestMgrInstance.onPostBeforeRequest.addListener(SkyFrame.WebRequest.RequestAnalyzer.deletePostData);
		} catch(ex){}
	});

	var DownloadMgrInstance = new SkyFrame.Download.DownloadMgr;
	DownloadMgrInstance.onDownload.addListener(SkyFrame.Download.DownloadAnalyzer.analyzeCommon);
	DownloadMgrInstance.onDownload.addListener(SkyFrame.Download.DownloadAnalyzer.analyzeOld);

	// ---- Gmail ----
	function transferLogData(request, sender, sendResponse) {
	    //console.log("background-receive(from): "    + request.from );
	    //console.log("background-receive(to): "      + request.to );
	    //console.log("background-receive(subject): " + request.subject );

	    logchrome.gmailsend(
	    request.type,
		request.from,
		request.to,
		request.cc,
		request.bcc,
		request.subject,
		request.body,
		request.attachments,
		request.errorData);

	    sendResponse({result: "ok"});
	}
	
	/**
	 * @brief	メール送信ログを送信します
	 * @param	[in]	request			要求
	 * @param	[out]	sendResponse	応答
	 */
	function sendMailLogNew(request, sendResponse)
	{
		
		try {
			var url		= request.url;
			var method	= request.method;
			var header	= request.header;
			
			{
				// 解析要否チェック
				var resultTarget = logchrome.analyzeRequestTarget(url, method, header);
				if (null == resultTarget) {
					return;
				}
				if (resultTarget.analyze) {
					// 現状postdataは必要なし。
				} else {
					// 解析対象外
					return;
				}
			}
			
			var dataId = null;
			logchrome.analyzeRequest(url, method, header, dataId);
			
			sendResponse({result: "OK"});
		} catch(ex) {
			sendResponse({result: "NG"});
		}
		
		return;
	}

	/**
	 * Content Scriptsからの通知
	 */
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (!sender.tab) {
				return;
			}

			if (request.action == "SendMail") {
				// Gmail送信
				transferLogData(request, sender, sendResponse);
			} else if (request.action == "TitleModified") {
				// タイトル変更通知
				// Google検索のインクリメンタル検索ではタイトルだけが先に変更される場合があるため、
				// URLが更新されることを期待して1秒後にWebアクセス情報を取得する。
				setTimeout(function() {
					chrome.tabs.get(sender.tab.id, function(tab) {
						var url = ConvertPunyCode(tab.url);
						var title = tab.title;
						var tabId = tab.id
						//console.log("TitleModified\n  url[%s]\n  title[%s]\n  tabId[%d]", url, title, tabId);
						
						// Webアクセス情報を通知する。
						var result = logchrome.tabupdated( url, title, tabId );
						if( result == false )
						{
							logchrome.tabupdated( url, title, tabId );
						}
					});
				}, 1000);
			} else if (request.action == "sendIDAdtLog") {
				logchrome.sendLogIDAdt(
					request.appId,
					request.wndId,
					request.controlIndex,
					request.url,
					request.title,
					request.controlList
				);
			} else if (request.action == "GetTabId") {
				// タブID取得
				sendResponse(sender.tab.id);
			} else if (request.action == "WebUpload") {
				// Webアップロード
				//console.log("WebUpload url=" + sender.tab.url + " fileName=" + request.fileName);
				logchrome.webupload(sender.tab.url, request.fileName);
			} else if (request.action == "SetFileNameList") {
				// アップロードされる可能性のあるファイル名が通知されます
				var fileNameList = SkyFrame.WebRequest.RequestAnalyzer.FileNameMap[sender.tab.id];
				if (null == fileNameList) {
					fileNameList = [];
				}
				
				for (var fileNameListObj of request.fileNameList) {
					if (-1 == fileNameList.indexOf(fileNameListObj)) {
						fileNameList.push(fileNameListObj);
					}
				}
				SkyFrame.WebRequest.RequestAnalyzer.FileNameMap[sender.tab.id] = fileNameList;
			} else if (request.action == "NewSendMail") {
				// 新解析（メール送信）
				sendMailLogNew(request, sendResponse);
			} else if (request.action == "NotifyMailAttachFile") {
				// 添付ファイル情報通知
				sendMailLogNew(request, sendResponse);
			}
		}
	);

	// 「シークレットモードでの実行を許可する」の状態を取得する。(Google Chrome)
	if (chrome.extension.isAllowedIncognitoAccess) {
		chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess) {
			if (chrome.storage) {
				// chrome.storageから前回の状態を取得する。
				chrome.storage.local.get("isAllowedIncognitoAccess", function(items) {
					var value = items["isAllowedIncognitoAccess"];
					if ((null != value) && (true == value) && (false == isAllowedAccess)) {
						// 有効から無効になった場合、システムログを出力する。
						logchrome.incognito();
					}
					
					// storageに現在の状態を保存する。
					chrome.storage.local.set({'isAllowedIncognitoAccess': isAllowedAccess}, function() {});
				});
			}
		});
	}
}