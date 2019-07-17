//////////////////////////
// Definition of package
//////////////////////////
if (null == SkyFrame) {
	var SkyFrame = {};
}
if (null == SkyFrame.WebSendMail) {
	SkyFrame.WebSendMail = {};
}

/**
 * @brief	Webメール送信ログを出力する機能を提供します
 * @param	[in]	doc			document
 * @param	[in]	analyzer	解析処理
 */
SkyFrame.WebSendMail.WebSendMailMgr = function(doc, analyzer)
{
	// propety
	this.rootDoc = doc;
	this.analyzer = analyzer;
	
	// callback
	var thisObj = this;
	
	
	// マウスダウンイベント登録
	this.rootDoc.addEventListener("mousedown", function(event) {
		thisObj.onMouseDownEvent(event, thisObj);
	},
	true);
	
	// キーダウンイベント登録
	this.rootDoc.addEventListener("keydown", function(event) {
		thisObj.onKeyDownEvent(event, thisObj);
	},
	true);
	
	// ロードイベント登録
	this.rootDoc.addEventListener("load", function (event) {
		thisObj.onLoadEvent(event, thisObj);
	},
	true);
	
	// iframにloadイベントを登録
	$(this.rootDoc.getElementsByTagName("iframe")).each(function() {
		try {
			var iFrameObj = this;
			thisObj.iframeSetKeyDownEvent(iframeObj, thisObj);
		} catch (ex) {}
	});
}

/**
 * @brief	マウスダウンイベントハンドラー
 * @param	[in]	event		イベント
 * @param	[in]	thisObj		rootdocument
 */
SkyFrame.WebSendMail.WebSendMailMgr.prototype.onMouseDownEvent = function(event, thisObj)
{
	try {
		if (thisObj.analyzer.isTargetMouseDownEvent) {
			if (thisObj.analyzer.isTargetMouseDownEvent(event)) {
				
				var eventButton = (event.originalTarget) ? event.originalTarget : event.srcElement;
				// 1回クリックしただけで6回イベントが通知されるので、そのうちの1回だけ処理するためのおまじない。
				if (!eventButton.getAttribute("addedeventmousedown")) {
					eventButton.addEventListener("mousedown", function(event) {
						thisObj.Analyze(thisObj);
					},
					true);
					
					eventButton.setAttribute("addedeventmousedown", true);
				}
			}
		}
	} catch (ex) {}
}

/**
 * @brief	キーダウンイベントハンドラー
 * @param	[in]	event		イベント
 * @param	[in]	thisObj		rootdocument
 */
SkyFrame.WebSendMail.WebSendMailMgr.prototype.onKeyDownEvent = function(event, thisObj)
{
	try {
		if (thisObj.analyzer.isTargetKeyDownEvent) {
			if (thisObj.analyzer.isTargetKeyDownEvent(event)) {
				thisObj.Analyze(thisObj);
			}
		}
	} catch (ex) {}
}

/**
 * @brief	ロードイベントハンドラー
 * @param	[in]	event		イベント
 * @param	[in]	thisObj		rootdocument
 */
SkyFrame.WebSendMail.WebSendMailMgr.prototype.onLoadEvent = function(event, thisObj)
{
	try {
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
		if($(eventObj).is("iframe")) {
			//iframeにloadイベントを仕掛ける
			thisObj.iframeSetKeyDownEvent(eventObj, thisObj);
			
			eventObj.addEventListener("load", function (event) {
				thisObj.onIframeLoadEvent(event, thisObj);
			},
			true);
		}
	} catch (ex) {}
}

/**
 * @brief	iframeがloadされた際のイベント
 * @param	[in]	event		イベント
 * @param	[in]	thisObj		rootdocument
 */
SkyFrame.WebSendMail.WebSendMailMgr.prototype.onIframeLoadEvent = function(event, thisObj) {
	try {
		var eventObj = (event.originalTarget) ? event.originalTarget : event.srcElement;
		if($(eventObj).is("iframe")) {
			thisObj.iframeSetKeyDownEvent(eventObj, thisObj);
		}
	}
	catch(ex){
	}
}

/**
 * @brief	iframeにkeydownイベントを追加します
 * @param	[in]	event		イベント
 * @param	[in]	thisObj		rootdocument
 */
SkyFrame.WebSendMail.WebSendMailMgr.prototype.iframeSetKeyDownEvent = function(iframeObj, thisObj)
{
	try {
		if(!iframeObj.contentWindow.document.body.getAttribute("addedeventkeydownsk")) {
			iframeObj.contentWindow.document.addEventListener("keydown", function (event) {
				thisObj.onKeyDownEvent(event, thisObj);
			},
			true);
			
			iframeObj.contentWindow.document.body.setAttribute("addedeventkeydownsk", true);
		}
	}
	catch (ex) {}
}

/**
 * @brief	解析処理
 * @param	[in]	thisObj		rootdocument
 */
SkyFrame.WebSendMail.WebSendMailMgr.prototype.Analyze = function(thisObj)
{
	try {
		var logData = {};	// ログデータ
		
		// 解析
		if (thisObj.analyzer.mainProc) {
			thisObj.analyzer.mainProc(thisObj.rootDoc, logData);
		}
		
		// 送信
		if (thisObj.analyzer.sendLog) {
			thisObj.analyzer.sendLog(logData);
		}
	} catch (ex) {}
}