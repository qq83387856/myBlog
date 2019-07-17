const NATIVE_MESSAGING_NAME = "net.skyseaclientview.log_chrome_native_host";

var g_browserInfo = {
	"type":"chrome",
	"version": 1
}

function initBrowserInfo() {
	try {
		var userAgent = window.navigator.userAgent.toLowerCase();
		var nStart = userAgent.indexOf("chrome/");
		if (nStart < 0) {
			return;
		}
		
		nStart += "chrome/".length;
		var nEnd = userAgent.indexOf(" ", nStart);
		var versionString = userAgent.slice(nStart, nEnd);
		var version = parseInt(versionString, 10);
		g_browserInfo.version = version;
	}
	catch(e){
	}
}

initBrowserInfo();
	