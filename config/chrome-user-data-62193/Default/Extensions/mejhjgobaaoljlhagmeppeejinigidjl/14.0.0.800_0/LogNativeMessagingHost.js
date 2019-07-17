

var g_arrayremoveids = new Array(); //削除チェックタブ一覧
var g_remotetimerid = null;

//削除チェックタブ一覧の存在チェック
function isCheckingRemoveTab() {
	if (0 < g_arrayremoveids.length) {
		return true;
	}
	else {
		return false;
	}
}
//タブの削除チェック
function checkremovetabs(){

	if (g_remotetimerid != null) {
		clearTimeout(g_remotetimerid);
	}
	
	if (false == isCheckingRemoveTab()) {
		// 削除チェックタブ一覧が無い場合は終了
		return;
	}
	// 削除チェックタブ一覧を本当に削除できているかチェックする再びタイマーをセット
	g_remotetimerid = setTimeout(checkremovetabs, 1000);
	try {
		
		// すべてのタブ一覧を取得して削除チェックタブ一覧と突き合わせる
		chrome.tabs.query( {}, function(tabs){
			if (false == isCheckingRemoveTab()) {
				return;
			}
			var arrayremoveids = new Array();
			for (var i = 0; i < tabs.length; ++i) {
				for (var j = 0; j < g_arrayremoveids.length; ++j) {
					// 削除チェックタブが存在していたら、再び削除する
					if (tabs[i].id == g_arrayremoveids[j]) {
						try {
							chrome.tabs.remove( tabs[i].id );
						}
						catch(e){}
						arrayremoveids.push( tabs[i].id );
						break;
					}
				}
			}
			g_arrayremoveids = arrayremoveids;
		});
	}
	catch(e) {}
}

var LogNativeMessagingHost = function() {

	// this
	var self = this;

	// Native Messaging API 用ポート
	var port = null;
	
	// ネイティブアプリケーションのプロセスID
	var procId = 0;
	
	// ローカルwebサーバーのポート
	var webPort = 0;
	
	// Web書き込み時に無視するURL（前方一致）
	var excludeURLPost = [];

	// 設定受信コールバック
	var funcSettingResponse = null;
	
	// ID監査設定
	var settingIDAdt = null;

	// ID監査用拡張フィルター
	var extendFilter = null;
	
	// モード
	var mode = "windows";
	
	// 分割データバッファ
	var splitTempData = {};
	
	// 	遅延実行カウンター
	var delayExecute = 0;
	
	// アップロードターゲットURL
	var uploadTargetUrl = [];
	
	// URLフィルタ生成
	var urlFilterCommon   = new UrlFilter( "common"   );
	var urlFilterOffice   = new UrlFilter( "office"   );
	var urlFilterOutlook  = new UrlFilter( "outlook"  );
	var urlFilterOneDrive = new UrlFilter( "onedrive" );

	// URLフィルタマネージャ生成
	var urlFilterManager = new UrlFilterManager();

	// 遅延実行するか判定処理
	this.isDelayExecute = function() {
		var result = false;
		if (1 < delayExecute) {
			result = true;
		}
		return result;
	}
	// 遅延強制実行するか判定処理
	this.isDelayForceExecute = function() {
		var result = false;
		if (4 < delayExecute) {
			result = true;
		}
		return result;
	}
	
	// モード設定
	this.setMode = function(_mode) {
		mode = _mode;
	}
	
	// アップロードターゲットURL取得処理
	this.getUploadTargetUrl = function() {
		return uploadTargetUrl;
	}
	
	// 公開メソッド
	this.tabcreated = function(url, title, tabId) {
		postMessage({
			"func": "tabcreated",
			"arg": {
				"url": url,
				"title": title,
				"tabId": tabId
			}});
	}
	
	this.tabactived = function(tabId, windowId, active) {
		postMessage({
			"func": "tabactived",
			"arg": {
				"tabId": tabId,
				"windowId": windowId,
				"active": active
			}});
	}
	
	this.tabupdated = function(url, title, tabId) {
		postMessage({
			"func": "tabupdated",
			"arg": {
				"url": url,
				"title": title,
				"tabId": tabId
			}});
		if (null != settingIDAdt) {
			chrome.tabs.sendMessage(
				tabId,
				{action: "settingIDAdt", "settingIDAdt":settingIDAdt, "extendFilter":extendFilter}
			);
		}
	
	}
	
	this.tabremoved = function(tabId) {
		postMessage({
			"func": "tabremoved",
			"arg": {
				"tabId": tabId
			}});
	}
	
	this.isofficeposturl = function(url, method, tabId) {

		// URLフィルタに一致すればC++側では処理はしない
		if ( false == urlFilterOffice.isHitList( url, method ) ) {
			return false;
		}

		return sendMessage({
			"func": "isofficeposturl",
			"arg": {
				"url": url,
				"tabId": tabId
			}
			}, false);
	}
	
	this.isoutlookwebuploadurl = function(url, method) {

		// URLフィルタに一致すればC++側では処理はしない
		if ( false == urlFilterOutlook.isHitList( url, method ) ) {
			return false;
		}

		return sendMessage({
				"func": "isoutlookwebuploadurl",
				"arg": {
					"url": url
				}
				}, false);
	}
	
	this.ischromeupload = function(url) {
		return sendMessage({
			"func": "ischromeupload",
			"arg": {
				"url": url,
			}
			}, false);
	}
	
	this.webofficecontents = function(url, strOfficeData) {
		postMessage({
			"func": "webofficecontents",
			"arg": {
				"url": url,
				"strOfficeData": strOfficeData
			}});
	}
	
	this.webofficecontentsRaw = function(url, dataId) {
		postMessage(
			{
				"func": "webofficecontentsRaw",
				"arg": {
					"dataId" : dataId,
					"url": url
				}
			}
			);
	}
	
	this.weboffice = function(url, file, tabId) {
		postMessage({
			"func": "weboffice",
			"arg": {
				"url": url,
				"file": file,
				"tabId": tabId
			}});
	}
	this.webupload = function(url, file) {
		if (mode == "mac") {
			 postMessage({
				"func": "webupload",
				"arg": {
					"url": url,
					"file": file
				}
				});
		}
		else {
			return sendMessage({
				"func": "webupload",
				"arg": {
					"url": url,
					"file": file
				}
				}, false);
		}
	}

	this.webuploadcontents = function(url, post, header) {
		return sendMessage({
			"func": "webuploadcontents",
			"arg": {
				"url": url,
				"post": post,
				"header" : header
			}
			}, false);
	}

	this.webuploadcontentsRaw = function(url, dataId, header) {
		return sendMessage(
			{
				"func": "webuploadcontentsRaw",
				"arg": {
					"dataId" : dataId,
					"url": url,
					"header" : header
				}
			}, 
			false);
	}

	this.webpost = function(url, postDataStr) {
		if (mode == "mac") {
			postMessage({
				"func": "webpost",
				"arg": {
					"url": url,
					"postDataStr": postDataStr
				}
				});
		}
		else {
			return sendMessage({
				"func": "webpost",
				"arg": {
					"url": url,
					"postDataStr": postDataStr
				}
				}, false);
		}
	}

	this.webpostRaw = function(url, dataId) {
		return sendMessage(
			{
				"func": "webpostraw",
				"arg": {
					"dataId" : dataId,
					"url": url
				}
			},
			false);
	}

	this.notifydownload = function(downloadID, path) {
		postMessage({
			"func": "notifydownload",
			"arg": {
				"downloadID": downloadID,
				"path": path
			}});
	}
	this.isdownloadforbidden = function(downloadID) {
		return sendMessage({
			"func": "isdownloadforbidden",
			"arg": {
				"downloadID": downloadID
			}
			}, true);
	}
	this.ondeterminingfilename = function(downloadID, url) {
		postMessage({
			"func": "ondeterminingfilename",
			"arg": {
				"downloadID": downloadID,
				"url": url
			}});
	}
	this.getsetting = function(funcResponse) {
		getsettingLocal();
		funcSettingResponse = funcResponse;
	}
	this.gmailsend = function(type, from, to, cc, bcc, subject, body, attachments, errordata) {
		postMessage({
			"func": "gmailsend",
			"arg": {
				"type": type,
				"from": from,
				"to": to,
				"cc": cc,
				"bcc": bcc,
				"subject": subject,
				"body": body,
				"attachments": attachments,
				"errordata": errordata
			}});
	}
	
	this.checkTabId = function(tabids) {
		postMessage({
			"func": "checkTabId",
			"arg": {
				"tabids": tabids
			}});
	}
	this.sleep = function(time) {
		sleepLocal(time)
	}
	this.incognito = function() {
		postMessage({
			"func": "incognito",
			});
	}
	//内部メソッド
	function sleepLocal(time) {
		delayExecute++;
		try {
			var request = new XMLHttpRequest();
			request.open('POST', "http://localhost:" + webPort + "/", false);
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify({"timeout": time, "type":"sleep"}));
		} catch(e) {
		}
		delayExecute--;
		return;
	}
	function getsettingLocal() {
		postMessage({
			"func": "getSetting"
			});
	}
	// URLフィルタ情報の取得要求を送信する
	function getsettingFilterLocal() {
		if (mode == "windows") {
			postMessage({
				"func": "getSettingUrlFilter"
				});
		}
	}
	function getsettingIDAdtLocal() {
		postMessage({
			"func": "getSettingIDAdt"
			});
	}
	function connectNative() {
		if (false == enableNativeHostLocal()) {
			return;
		}
		port = chrome.runtime.connectNative(NATIVE_MESSAGING_NAME);
		port.onMessage.addListener(function(msg) {
			receiveMessage(msg);
		});
		port.onDisconnect.addListener(function() {
			sleepLocal(100);
			connectNative();
		});
		port.postMessage({
				"func": "getSetting"
			});
		getsettingFilterLocal();
	}
	
	function receiveMessage(msg) {
		if ("splitData" == msg.type) {
			// 続きがある場合は先に要求を出しておく
			if (0 != msg.nextPos) {
				postMessage({
					"func": "splitData",
					"arg" : {
						"splitType": msg.splitType,
						"splitId": msg.splitId,
						"startPos": msg.nextPos
					}
				});
			}
			var splitData = (msg.splitType in splitTempData) ? splitTempData[msg.splitType] : null;
			if (!splitData || null == splitData || msg.splitId != splitData.splitId) {
				//console.log("splitid init[" + (msg.splitId) + "][" + (splitData ? splitData.splitId : 0) + "]");
				splitTempData[msg.splitType] = {"splitId": msg.splitId, "data":""};
			}
			
			splitTempData[msg.splitType].data += msg.value;
			if (0 == msg.nextPos) {
				var bingMsg = JSON.parse(decodeURIComponent(splitTempData[msg.splitType].data));
				receiveMessage(bingMsg);
				splitTempData[msg.splitType] = null;
			}
		}
		
		if ("getSetting" == msg.type) {
			procId = msg.procId;
			webPort = msg.webPort;
			excludeURLPost = msg.excludeurlpost;
			uploadTargetUrl = msg.uploadTargetUrl;
			if (funcSettingResponse != null) {
				funcSettingResponse(msg.setting);
				funcSettingResponse = null;
			}
		}

		if ("getSettingIDAdt" == msg.type) {
			settingIDAdt = msg.setting;
			extendFilter = msg.extendFilter;
		}
		
		if ("removeTab" == msg.type) {
			
			if (false == isCheckingRemoveTab()) {
				// 削除チェックタブ一覧を本当に削除できているかチェックするタイマーをセット
				g_remotetimerid = setTimeout(checkremovetabs, 1000);
			}
			
			// 削除チェックタブ一覧に追加しておく
			var removeid = msg.id;
			g_arrayremoveids.push(removeid);
			
			// 先にWebページの内容を消去しておく
			try {
				chrome.tabs.update(removeid, {url:"about:blank"});
			}
			catch(e) {}
			
			try {
				chrome.tabs.remove( removeid );
			}
			catch(e) {}
		}
		
		if ("getControlList" == msg.type) {
			getControlList(msg.tabId, msg.windowIndex, msg.extendFilter);
		}

		if ("setControlColor" == msg.type) {
			setControlColor(msg.tabId, msg.controlId, msg.color, msg.extendFilter);
		}

		if ("getSettingUrlFilter" == msg.type) {

			// 最初のブロックの場合は、フィルタを空にする
			if ( 0 == msg.block_index ) {
				urlFilterManager.clearFilter( msg.filterName );
			}

			// フィルタのマージ
			urlFilterManager.margeFilter( msg.filterName, msg.filter );
		}
	}
	
	function getResponse(reqId, errRes, timeout) {
		try {
			delayExecute++;
			var request = new XMLHttpRequest();
			request.open('POST', "http://localhost:" + webPort + "/", false);
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify({"timeout": timeout, "type":"getResponse", "reqId": reqId}));
			if (request.status === 200) {
			  	return {"status":request.status, "retVal": JSON.parse(request.responseText).retVal};
			}
			else {
				if (mode == "windows") {
					getsettingLocal();
					getsettingFilterLocal();
					getsettingIDAdtLocal();
				}
			  	return {"status":request.status, "retVal": errRes};
			}
		} catch(e) {
			if (mode == "windows") {
				getsettingLocal();
				getsettingFilterLocal();
				getsettingIDAdtLocal();
			}
			return {"status":0, "retVal": errRes};
		} finally {
			delayExecute--;
		}
	}
	
	function ReqId() {
		return procId + "_" + new Date().getTime();
	}

	function postMessage(data) {
		if (false == enableNativeHostLocal()) {
			return;
		}
		try {
			port.postMessage(data);
		}
		catch(e) {
			connectNative();
			try {
				port.postMessage(data);
			}
			catch(e) {
			
			}
		}
	}

	function sendMessage(data, errRes) {
		var reqId = ReqId();
		data["reqId"] = reqId;
		postMessage(data);
		var response = getResponse(reqId, errRes, 100);
		// 100ミリ秒でタイムアウトした場合は少し長い時間追加で待つ、
		// それ以外は普通に失敗なので失敗で返却する。
		if (response["status"] == 408) {
			response = getResponse(reqId, errRes, 3000);
		}
		return response["retVal"];
	}

	this.deletePostData = function(dataId) {
		postMessage({
			"func": "deletePostData",
			"arg": {
				"dataId": dataId
			}});
	}
	
	function deletePostDataLocal(dataId) {
		postMessage({
			"func": "deletePostData",
			"arg": {
				"dataId": dataId
			}});
	}

	function sendPostDataArray(dataArray, header, webPort) {
		// 分割データ通知
		var request = new XMLHttpRequest();
		request.open('POST', "http://localhost:" + webPort + "/", false);
		request.setRequestHeader('Content-Type',	'application/octet-stream');
		request.setRequestHeader('x-sky-data',		JSON.stringify(header));

		var blobData = new Blob(dataArray);
		request.send(blobData);
	
	}
	this.sendPostData = function(rawData) {
		try {
			delayExecute++;
			if (null == rawData) {
				return null;
			}

			// ヘッダ情報用に全体のデータサイズを取得
			var totalDataSize = 0;
			for (key in rawData) {
				try {
					if( null == rawData[key].bytes ){
						continue;
					}
					var data = new Uint8Array( rawData[key].bytes);
					totalDataSize += data.length;
				} catch(ex) {
					// NOP
				}
			}
			
			if (totalDataSize <= 0) {
				return null;
			}
			
			var dataId = ReqId();
			var dataOffset = 0;
			var headerInfo =
			{
				"dataId" : dataId,
				"arrayOffsetList" : [0],	// 現在使われていない
				"totalDataSize" : totalDataSize
			};
			
			// 分割送信
			var SPIRIT_SIZE	= 1024 * 1024 * 100;
			
			if (10 < rawData.length) {
				var tempDataArray = [];
				var tempDataSize = 0;
				try {
					for (key in rawData) {
						if( null == rawData[key].bytes ){
							continue;
						}

						var data		= new Uint8Array( rawData[key].bytes);
						
						var splitNumMax	= Math.ceil(data.length / SPIRIT_SIZE);
						
						if (splitNumMax == 1) {
							if (SPIRIT_SIZE < (tempDataSize + data.length)) {
								// ヘッダ情報の分割データ情報更新
								headerInfo.dataOffset	= dataOffset;
								headerInfo.dataSize		= tempDataSize;

								sendPostDataArray(tempDataArray, headerInfo, webPort);

								dataOffset += tempDataSize;
								
								tempDataArray = [];
								tempDataSize = 0;
							}
							
							tempDataArray.push(data);
							tempDataSize += data.length;
							
						}
						else {
							if (0 < tempDataArray.length) {
								headerInfo.dataOffset	= dataOffset;
								headerInfo.dataSize		= tempDataSize;

								sendPostDataArray(tempDataArray, headerInfo, webPort);

								dataOffset += tempDataSize;
								
								tempDataArray = [];
								tempDataSize = 0;
							}
							for (var splitIndex=0; splitIndex < splitNumMax; splitIndex++) {
								var splitOffsetStart	= SPIRIT_SIZE * splitIndex;
								var splitOffsetEnd		= SPIRIT_SIZE * (splitIndex + 1);

								// 分割データ情報
								var splitData			= data.subarray(splitOffsetStart, splitOffsetEnd);
								var splitDataSize		= splitData.length;

								// ヘッダ情報の分割データ情報更新
								headerInfo.dataOffset	= dataOffset;
								headerInfo.dataSize		= splitDataSize;

								{	// 分割データ通知
									var request = new XMLHttpRequest();
									request.open('POST', "http://localhost:" + webPort + "/", false);
									request.setRequestHeader('Content-Type',	'application/octet-stream');
									request.setRequestHeader('x-sky-data',		JSON.stringify(headerInfo));

									var blobData = new Blob([splitData]);
									request.send(blobData);
								}

								dataOffset += splitDataSize;
							}
						}
					}
					
					if (0 < tempDataArray.length) {
						headerInfo.dataOffset	= dataOffset;
						headerInfo.dataSize		= tempDataSize;

						sendPostDataArray(tempDataArray, headerInfo, webPort);

						dataOffset += tempDataSize;
						
						tempDataArray = [];
						tempDataSize = 0;
					}
					
				} catch(ex) {
					if (0 < dataOffset) {
						deletePostDataLocal(dataId);
					}
					// 失敗した場合は念のため元の処理を行う
					dataOffset = 0;
					dataId = ReqId();
					headerInfo.dataId = dataId;
				}
			}
			
			if (0 == dataOffset) {
				
				for (key in rawData) {
					try {
						if( null == rawData[key].bytes ){
							continue;
						}

						var data		= new Uint8Array( rawData[key].bytes);
						var splitNumMax	= Math.ceil(data.length / SPIRIT_SIZE);

						for (var splitIndex=0; splitIndex < splitNumMax; splitIndex++) {
							var splitOffsetStart	= SPIRIT_SIZE * splitIndex;
							var splitOffsetEnd		= SPIRIT_SIZE * (splitIndex + 1);

							// 分割データ情報
							var splitData			= data.subarray(splitOffsetStart, splitOffsetEnd);
							var splitDataSize		= splitData.length;

							// ヘッダ情報の分割データ情報更新
							headerInfo.dataOffset	= dataOffset;
							headerInfo.dataSize		= splitDataSize;

							{	// 分割データ通知
								var request = new XMLHttpRequest();
								request.open('POST', "http://localhost:" + webPort + "/", false);
								request.setRequestHeader('Content-Type',	'application/octet-stream');
								request.setRequestHeader('x-sky-data',		JSON.stringify(headerInfo));

								var blobData = new Blob([splitData]);
								request.send(blobData);
							}

							dataOffset += splitDataSize;
						}
					} catch(ex) {
						// NOP
					}
				}
			}

			if (totalDataSize <= dataOffset) {
				return dataId;
			}
		} catch(ex) {
		} finally {
			delayExecute--;
		}
		return null;
	}
	
	function requestPolling() {
		postMessage({
			"func": "requestpolling"
			});
	}

	function getControlList(tabId, windowIndex, extendFilter) {
		chrome.tabs.sendMessage(tabId, {action: "getControlList", "extendFilter":extendFilter}, function(controlList) {
			postMessage({
				"func": "responseGetControlList",
				"arg": {
					"tabId": tabId,
					"windowIndex": windowIndex,
					"controlList" : controlList
				}
				});
		});
	}

	function setControlColor(tabId, controlId, color, extendFilter) {
		chrome.tabs.sendMessage(tabId, {action: "setControlColor", "controlId":controlId, "color":color, "extendFilter":extendFilter});
	}
	
	function OnResponseJsonSync(json)
	{
 		var errRes = null;
		try {
			return sendMessage(json, errRes);
		} catch(ex) {
		}
		return errRes;
	}

	this.analyzeRequestTarget = function(url, method, header)
	{
		// URLフィルタに一致すればC++側では処理はしない
		if ( false == urlFilterCommon.isHitList( url, method ) ) {
			return null;
		}

		try {
			var response = OnResponseJsonSync(
				{
					"type" : "requestTarget",
					"method" : method,
					"url" : url,
					"header" : header
				}
			);

			if (null == response) {
				return null;	// 未解析
			}
			
			return response;	// 解析対象情報返却
		} catch(ex){}

		return null;	// 未解析
	}

	this.analyzeRequest = function(url, method, header, dataId)
	{
		try {
			// データIDをリクエストに含めると
			// Native側でのデータ取得させる事ができる。
			var request =  {
				"type" : "request",
				"method" : method,
				"url" : url,
				"header" : header
			};
			if (null != dataId) {
				request.dataId = dataId;
			}
			return OnResponseJsonSync(request);
		} catch(ex){}
		return null;
	}

	this.analyzeDownload = function(url, path)
	{

		try {
			return  OnResponseJsonSync(
				{
					"type" : "download",
					"url" : url,
					"file" : path
				}
			);
		} catch(ex){}

		return null;
	}
	
	this.sendLogIDAdt = function (appId, wndId, controlIndex, url, title, controlList) {
		postMessage({
			"func": "sendIDAdtLog",
			"arg":{
				"appId": appId,
				"wndId": wndId,
				"controlIndex": controlIndex,
				"url": url,
				"title": title,
				"controlList" : controlList
			}
		});
	}

	// 除外URLかどうか判定する
	this.isExcludeURLPost = function(url) {
		if(!excludeURLPost) {
			// 除外UR設定が無効な場合は何もしない
			return false;
		}
		var ret = false;
		var lowerURL = url.toLowerCase();
		for (idx in excludeURLPost) {
			if(lowerURL.indexOf(excludeURLPost[idx]) == 0) {
				ret = true;
				break;
			}
		}
		return ret;
	}

	this.init = function( pcMode ) {

		// PCモード設定
		self.setMode( pcMode );

		/*
			初期フィルタ(common)
		*/
		var initUrlFilterCommon = {
			white: {
				filters: [
					{
						// バージョン
				  		ver: 1,

						/*
							conditions:
								[
									  0:"||"  / 1:"&&"					// 接続条件
									, 0:"0==" / 1:"0<=" / -1: "-1=="	// 一致条件(indexOf)
									, string							// マッチング文字列
								]
						*/
						conditions: [
							  [ 1, 0, "" ]
						]
					}
				],
				// 0: POST / 1: GET / 2: PUT / 3: その他
				methods: [ [ 0 ], [   ], [ 0 ], [   ] ]
			},
			black: {
				filters: [], 
				methods: [ [], [], [], [] ]
			}
		};


		/*
			初期フィルタ(office)
		*/
		var initUrlFilterOffice = {
			white: {
				filters: [
					{
						// バージョン
				  		ver: 1,

						/*
							conditions:
								[
									  0:"||"  / 1:"&&"					// 接続条件
									, 0:"0==" / 1:"0<=" / -1: "-1=="	// 一致条件(indexOf)
									, string							// マッチング文字列
								]
						*/
						conditions: [
							  [ 1, 0, "" ]
						]
					}
				],
				// 0: POST / 1: GET / 2: PUT / 3: その他
				methods: [ [ 0 ], [ 0 ], [   ], [   ] ]
			},
			black: {
				filters: [], 
				methods: [ [], [], [], [] ]
			}
		};


		/*
			初期フィルタ(outlook)
		*/
		var initUrlFilterOutlook = {
			white: {
				filters: [
					{
						// バージョン
				  		ver: 1,

						/*
							conditions:
								[
									  0:"||"  / 1:"&&"					// 接続条件
									, 0:"0==" / 1:"0<=" / -1: "-1=="	// 一致条件(indexOf)
									, string							// マッチング文字列
								]
						*/
						conditions: [
							  [ 1, 0, "" ]
						]
					}
				],
				// 0: POST / 1: GET / 2: PUT / 3: その他
				methods: [ [ 0 ], [ 0 ], [ 0 ], [ 0 ] ]
			},
			black: {
				filters: [], 
				methods: [ [], [], [], [] ]
			}
		};


		/*
			初期フィルタ(onedrive)
		*/
		var initUrlFilterOneDrive = {
			white: {
				filters: [
					{
						// バージョン
				  		ver: 1,

						/*
							conditions:
								[
									  0:"||"  / 1:"&&"					// 接続条件
									, 0:"0==" / 1:"0<=" / -1: "-1=="	// 一致条件(indexOf)
									, string							// マッチング文字列
								]
						*/
						conditions: [
							  [ 1, 0, "" ]
						]
					}
				],
				// 0: POST / 1: GET / 2: PUT / 3: その他
				methods: [ [ 0 ], [ 0 ], [ 0 ], [   ] ]
			},
			black: {
				filters: [], 
				methods: [ [], [], [], [] ]
			}
		};

		// URLフィルタの登録
		urlFilterManager.addUrlFilter( urlFilterCommon  ,initUrlFilterCommon   );
		urlFilterManager.addUrlFilter( urlFilterOffice  ,initUrlFilterOffice   );
		urlFilterManager.addUrlFilter( urlFilterOutlook ,initUrlFilterOutlook  );
		urlFilterManager.addUrlFilter( urlFilterOneDrive,initUrlFilterOneDrive );

		connectNative();
	}
	
	this.initIDAdt = function() {
		getsettingIDAdtLocal();
		setInterval(requestPolling, 5000);
	}

	this.isonedriveaccessforbidden = function(url, method, tabId) {

		// URLフィルタに一致すればC++側では処理はしない
		if ( false == urlFilterOneDrive.isHitList( url, method ) ) {
			return null;
		}

		return sendMessage({
			"func": "isonedriveaccessforbidden",
			"arg": {
				"url": url,
				"tabId": tabId
			}
			}, false);
	}

	this.onedriveaccess = function(url, method, title, tabId) {

		// URLフィルタに一致すればC++側では処理はしない
		if ( false == urlFilterOneDrive.isHitList( url, method ) ) {
			return;
		}

		return postMessage({
			"func": "onedriveaccesspost",
			"arg": {
				"url": url,
				"title": title,
				"tabId": tabId
			}
			}, false);
	}
	
	function enableNativeHostLocal() {
		if (chrome.runtime.connectNative === void 0) {
			return false;
		} else {
			return true;
		}
	}
	
	this.enableNativeHost = function() {
		return enableNativeHostLocal();
	}
};

var logchrome = new LogNativeMessagingHost();
logchrome.init(PC_MODE);
