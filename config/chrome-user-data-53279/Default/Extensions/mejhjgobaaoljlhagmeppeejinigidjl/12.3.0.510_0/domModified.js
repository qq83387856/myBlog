function initDomModified(count, interval) {
	chrome.runtime.sendMessage({action: "IsAllowContentScript"}, function(allowContentScript) {
		if (chrome.runtime.lastError) {
			// 問い合わせ先のbackgroundがまだ準備できていないのでリトライ
			if (0 < count) {
				setTimeout(initDomModified, interval, --count, interval);
			}
			return;
		}
		if (!allowContentScript || !allowContentScript.enable) {
			return;
		}
		/**
		 * タイトルの変更を検知し、backgroundページに通知する。
		 */
		var title = document.getElementsByTagName('title')[0];
		if (title) {
			title.addEventListener('DOMSubtreeModified', function (e) {
				chrome.runtime.sendMessage({action: "TitleModified"}, function(response) {});
			}, false);
		}

		// DOM準備完了時に各種イベントを登録し、アップロードファイルの可能性があるものをキャッシュしておく
		// 変更イベント追加
		document.addEventListener('change', function(event) {
			try {
				var files = event.target.files;
				var _fileNameList = [];
				
				for (var fileObj of files) {
					var fileName = fileObj.name;
					if (null != fileName) {
						_fileNameList.push(fileName);
					}
				}
				
				if (0 < _fileNameList.length) {
					chrome.runtime.sendMessage(
						{
							action: "SetFileNameList",
							fileNameList: _fileNameList
						},
						function(response) {}
					);
				}
			} catch(ex) {}
		}, true);

		// ドロップイベント追加
		document.addEventListener("drop", function(event) {
			try {
				var dataTransfer = event.dataTransfer;
				if (dataTransfer && dataTransfer.items) {
					var items = dataTransfer.items;
					for (var itemObj of items) {
						var entry = itemObj.webkitGetAsEntry();
						
						// Entry解析処理
						var traverseEntry = function(entry) {
							if (entry.isFile) {
								chrome.runtime.sendMessage(
									{
										action: "SetFileNameList",
										fileNameList: [entry.name]
									},
									function(response) {}
								);
							}
							else if (entry.isDirectory) {
								var reader = entry.createReader();
								reader.readEntries(function(results) {
									for (resultObj of results) {
										// 再度Entryを解析する
										traverseEntry(resultObj);
									}
								}, function(error) {
								});
							}
						}
						
						traverseEntry(entry);
					}
				}
			} catch(ex) {}
		}, true);
	});
}

initDomModified(30, 300);

