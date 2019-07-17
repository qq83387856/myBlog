function initAdtChrome(count, interval) {
	chrome.runtime.sendMessage({action: "IsAllowContentScript"}, function(allowContentScript) {
		if (chrome.runtime.lastError) {
			// 問い合わせ先のbackgroundがまだ準備できていないのでリトライ
			if (0 < count) {
				setTimeout(initAdtChrome, interval, --count, interval);
			}
			return;
		}

		if (!allowContentScript || !allowContentScript.enable) {
			return;
		}
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			try {
				if( request.action == "getControlList") {
					sendResponse(controlList(document, request.extendFilter));
				} else if( request.action == "setControlColor") {
					setControlColor(document, request.controlId, request.color, request.extendFilter);
					// No responce
				} else if( request.action == "settingIDAdt") {
					initSettingIDAdt(document, request.settingIDAdt, sendLogIDAdt, 2, request.extendFilter); // 2:Chrome Mode
					// No responce
				}
			} catch (ex){
				// NOP
			}
		});

		function sendLogIDAdt (appId, wndId, controlIndex, url, title, controlList) {
			try {
				chrome.runtime.sendMessage({
					action : "sendIDAdtLog",
					appId : appId,
					wndId : wndId,
					controlIndex : controlIndex,
					url : url,
					title : title,
					controlList : controlList
				});
			} catch (ex){
				// NOP
			}
		}
	});
}

initAdtChrome(30, 300);
