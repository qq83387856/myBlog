function initContentScript(count, interval) {
	chrome.runtime.sendMessage({action: "IsAllowContentScript"}, function(allowContentScript) {
		if (chrome.runtime.lastError) {
			// 問い合わせ先のbackgroundがまだ準備できていないのでリトライ
			if (0 < count) {
				setTimeout(initContentScript, interval, --count, interval);
			}
			return;
		}

		if (!allowContentScript || !allowContentScript.enable) {
			return;
		}

		CLogGMailAnalyzer.init();
		
		// Content_ScriptでのGoogleDriveのDom解析に対応している場合のみ
		if (allowContentScript.enableGoogleDriveDomAnalyze) {
			CLogWebUploadAnalyzer.init();
		}
	});
}

initContentScript(30, 300);
