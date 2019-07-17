function initDomAanalyze(count, interval) {
	// タブIDを取得する。
	chrome.runtime.sendMessage({action: "IsAllowContentScript"}, function(allowContentScript) {
		if (chrome.runtime.lastError) {
			// 問い合わせ先のbackgroundがまだ準備できていないのでリトライ
			if (0 < count) {
				setTimeout(initDomAanalyze, interval, --count, interval);
			}
			return;
		}
		if (!allowContentScript || !allowContentScript.enable) {
			return;
		}
		var tabId = 0;
		chrome.runtime.sendMessage({action: "GetTabId"}, function(response) {
			tabId = response;
		});

		function ResponsData(formdata, reqid, url) {
		    this.formdata = formdata;
		    this.reqid = reqid;
			this.url = url;
		}

		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.action == "getFormsData") {
				// DOMからformsデータを取得する。
				var formsInfo = new Object();
				var forms = $(document.forms);
				forms.each(function() {
					for (var i = 0; i < this.length; i++) {
						var name = this[i].name;
						var value = this[i].value;
						var type = this[i].type;
						if ("select-multiple" == type) {
							var valueList = new Array();
							for (var j = 0; j < this[i].length; j++) {
								var selected = this[i][j].selected;
								if ((null != selected) && (true != selected)) {
									// "selected"がtrueでない場合は追加しない。
									continue;
								}
								
								if (this[i][j].value) {
									valueList.push(this[i][j].value);
								}
							}
							if (0 < valueList.length) {
								formsInfo[name] = valueList;
							}
							continue;
						} else {
							if (("radio" == type) || ("checkbox") == type) {
								var checked = this[i].checked;
								if ((null != checked) && (true != checked)) {
									// "checked"がtrueでない場合は追加しない。
									continue;
								}
							}
							
							var valueList = new Array();
							if (name in formsInfo) {
								// 同じキーが存在する場合は追加する。(radioやcheckboxの場合)
								formsInfo[name].push(value);
							} else {
								valueList.push(value);
								formsInfo[name] = valueList;
							}
						}
					}
				});
				
				var response = new ResponsData( formsInfo, request.reqid, request.convurl);
				
				sendResponse(response);
				
				delete response;
			} 
			else if( request.action == "getOfficeFileName") {
				if (tabId != request.tabId) {
					// タブIDが一致しない場合は何もしない。
					// tabIdが初期値の場合は、タイミングによって、tabIdが設定されていないので、
					// リトライのため、空文字を返す
					if( 0 == tabId ){
						var title = "";
						sendResponse( title );
					}
					return;
				}
				
				//console.log( document );
				var title = "";
				var mt_title = document.getElementById('mt_title');
				if (mt_title) {
					title = mt_title.getAttribute('content');
				} else {
					title = document.title;
				}
				
				sendResponse( title );
			}
			else {
				//sendResponse(null);
			}
		});
	});

}

initDomAanalyze(30, 300);
