//////////////////////////
// Definition of package
//////////////////////////
if (null == SkyFrame) {
	var SkyFrame = {};
}
if (null == SkyFrame.WebRequest) {
	SkyFrame.WebRequest = {};
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



SkyFrame.WebRequest.RequestMgr = function()
{
	// propety
	this.requestRefList_	= {};
	
	// public if
	this.onPreBeforeRequest		= new SkyFrame.Common.Listener();
	this.onBeforeRequest		= new SkyFrame.Common.Listener();
	this.onPostBeforeRequest	= new SkyFrame.Common.Listener();

	// callback
	var thisObj = this;
	
	// 以下のサイトを参考に対応Verにあったオプションにする
	// https://developer.mozilla.org/ja/Add-ons/WebExtensions/API/webRequest/ResourceType
	
	var isInitializeOnBeforeRequest = false;
	var isInitializeOnBeforeSendHeaders = false;
	
	if (g_browserInfo && g_browserInfo.version) {
		var typesData = [];
		if (44 <= g_browserInfo.version) {
			typesData.push("main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest");
		}
		
		if (49 <= g_browserInfo.version) {
			typesData.push("font", "ping");
		}
		
		if (58 <= g_browserInfo.version) {
			typesData.push("csp_report", "media", "websocket");
		}
		
		var options = {urls:["http://*/*", "https://*/*"]};
		if (0 < typesData.length) {
			options.types = typesData;
		}
		
		try {
			chrome.webRequest.onBeforeRequest.addListener(function(details) {
				return thisObj.onBeforeRequest_(thisObj, details);
			}, 
			options,
			["blocking", "requestBody"]);
			isInitializeOnBeforeRequest = true;
			
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
				return thisObj.onBeforeSendHeaders_(thisObj, details);
			},
			options,
			["blocking", "requestHeaders"]);
			isInitializeOnBeforeSendHeaders = true;
		}
		catch(e) {
		}
	}
	
	if (!isInitializeOnBeforeRequest) {
		chrome.webRequest.onBeforeRequest.addListener(function(details) {
			return thisObj.onBeforeRequest_(thisObj, details);
		}, 
		{urls:["http://*/*", "https://*/*"]},
		["blocking", "requestBody"]);
	}
	
	if (!isInitializeOnBeforeSendHeaders) {
		chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
			return thisObj.onBeforeSendHeaders_(thisObj, details);
		},
		{urls:["http://*/*", "https://*/*"]},
		["blocking", "requestHeaders"]);
	}

}

SkyFrame.WebRequest.RequestMgr.prototype.onBeforeRequest_ = function(thisObj, details)
{
	try {
		var requestId		= details.requestId;
		var request			= {};
		request.body		= details;
		request.url			= ConvertPunyCode(details.url);
		request.requestId	= requestId;
		request.tabId		= details.tabId;

		thisObj.requestRefList_[requestId] = request;
		
		for (var ListenerObj of thisObj.onPreBeforeRequest.listenerList) {
			try {
				ListenerObj(request);
			} catch(ex2) {}
		}
	} catch(ex) {}
}

SkyFrame.WebRequest.RequestMgr.prototype.onBeforeSendHeaders_ = function(thisObj, details)
{
	var request = null;
	try {
		var requestId	= details.requestId;
		request = thisObj.requestRefList_[requestId];
		delete thisObj.requestRefList_[requestId];

		request.header		= details;

		for (var ListenerObj of thisObj.onBeforeRequest.listenerList) {
			var result = null;
			try {
				result = ListenerObj(request);
			} catch(ex2) {}

			if (null == result) {
				continue;
			}

			if (result.cancel) {
				return {cancel: true};
			}

			if (result.analyze) {
				return;
			}
		}
	} catch(ex){
		// nop
	} finally {
		try {
			for (var ListenerObj of thisObj.onPostBeforeRequest.listenerList) {
				try {
					ListenerObj(request);
				} catch(ex2) {}
			}
		} catch(ex){}
	}
}