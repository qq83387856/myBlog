/* Copyright (c)2015 Sky Co., LTD. All rights reserved. */
var selector	= "input,textarea,select,button,[onclick],[role*='button']";
var attrClick	= "onclick";

function convertFilter(extendFilter) {
	if (null == extendFilter) {
		return selector;
	}
	if (0 == extendFilter.length) {
		return selector;
	}
	return selector + "," + extendFilter;
}

function getElementTag(element) {
	try {
		var domElement	= element.get(0);
		if (null != domElement) {
			return checkString(domElement.tagName);
		}
	} catch (ex){
		// NOP
	}
	return "";
}

function IsNormalTargetElementTag(element) {
	try {
		var tag = getElementTag(element).toLowerCase();
		if 		("input"	== tag)	{}	// NOP
		else if ("textarea" == tag)	{}	// NOP
		else if ("select"	== tag)	{}	// NOP
		else if ("button"	== tag)	{}	// NOP
		else 						{return false;}
	} catch (ex){
		return false;
	}
	return true;
}

function getElementType(element) {
	try {
		if (IsNormalTargetElementTag(element)) {
			return checkString(element.prop("type"));
		} else {
			var tag = getElementTag(element).toLowerCase();
			var clickAttr = checkString(element.attr(attrClick));
			if (0 == clickAttr.length) {
				return tag;
			} else {
				return tag + "." + attrClick + "." + clickAttr;
			}
		}
	} catch (ex){
		// NOP
	}
	return "";
}

function getElementValue(element) {
	try {
		var val			= checkString(element.val());

		// check val
		var tag			= getElementTag(element).toLowerCase();
		if ("select" == tag) {
			element.children("option:selected").each(function() {
				if (0 != val.length) {
					val += ",";
				}
				var chileElement = $(this);
				val += chileElement.text();
			});
		}

		var typeLowerCase = getElementType(element).toLowerCase();
		if ("password" == typeLowerCase) {			// erase passward value
			val = "";
		} else if (("checkbox" == typeLowerCase) || ("radio" == typeLowerCase)) {
			if (0 == element.filter(":checked").length) {	// Check Off
				val = "";
			} else {										// Check On
				val = "○";
			}
			
		}

		if (IsNormalTargetElementTag(element)) {
			return val;	// 規定タグの場合はそのまま値を返却

		} else if (0 < checkString(element.attr(attrClick)).length) {
			return val;	// クリック属性の場合はそのまま値を返却

		} else if (0 < val.length) {
			return val;	// 上記以外でも値があればそのまま返却

		} else {
			return checkString(element.text());	// 値がない場合はテキストを返却
		}
	} catch (ex){
		// NOP
	}
	return "";
}

function setControlColor(doc, controlId, color, extendFilter) {
	try {
		var controlElementList = $(doc).find(convertFilter(extendFilter));
		if (controlId < controlElementList.length) {
			var element 	= $(controlElementList[controlId]);
			var type		= getElementType(element).toLowerCase();
			if (("checkbox"	== type) ||
				("radio"	== type) ||
				("range"	== type)
			) {
				if (0 == color.length) {
					element.css("outline-style", "none");
				} else {
					element.css("outline-style", "double"); //double or dotted style.
				}
				element.css("outline-color", color);
			} else {
				element.css("background-color", color);
			}
		}
	} catch (ex){
		// NOP
	}
}

function controlList(doc, extendFilter) {
	var controlList = new Array();
	try {
		$(doc).find(convertFilter(extendFilter)).each(function() {
			var element 	= $(this);

			var type		= getElementType(element);
			var name		= checkString(element.prop("name"));
			var id			= checkString(element.prop("id"));
			var val			= getElementValue(element);

			controlList.push({"type":type, "name":name, "id":id, "value":val});
		});
	} catch (ex){
		// NOP
	}
	
	return controlList;
}

function canExecuteTriggerKeyDown(event, element) {
	try {
		var type		= checkString(element.prop("type"));
		if (("text" == type) || ("password" == type) || ("textarea" == type)) {
			if(13 == event.keyCode) {							 // Enter is true
				return true;
			}
		} else {
			if((13 == event.keyCode) || (32 == event.keyCode)) { // Enter or Space is true
				return true;
			}
		}
	} catch (ex){
		// NOP
	}
	return false;
}

function canExecuteTriggerMouseDown(event, element) {
	try {
		var type		= checkString(element.prop("type"));
		if (("text" == type) || ("password" == type) || ("textarea" == type)) {
			// Always false
		} else {
			return true;	// Always true
		}
	} catch (ex){
		// NOP
	}
	return false;
}

function executeTrigger(doc, element, setting, sendResponse, sysType, extendFilter) {
	try {
		if (2 == sysType) {	// 2:Chrome mode
			var ret = setting.isTrigger(doc, element, 2); // 2:Chrome
			if (false == ret[0]) {
				ret = setting.isTrigger(doc, element, 1); // 1:Internet Explorer
				if (false == ret[0]) {
					ret = setting.isTrigger(doc, element, 3); // 3:FireFox
					if (false == ret[0]) {
						return false;	// あきらめる
					}
				}
			}
		} else {				// other or 3:Firefox mode
			var ret = setting.isTrigger(doc, element, 3); // 3:FireFox
			if (false == ret[0]) {
				ret = setting.isTrigger(doc, element, 1); // 1:Internet Explorer
				if (false == ret[0]) {
					ret = setting.isTrigger(doc, element, 2); // 2:Chrome
					if (false == ret[0]) {
						return false;	// あきらめる
					}
				}
			}
		}
		// TEST element.css("background-color", 'red');

		var appId 		= ret[1];
		var wndId 		= ret[2];
		var controlIndex= ret[3];
		var url			= decodeURIComponent(doc.URL);
		if (2 == sysType) { // Chrome
			url			= ConvertPunyCode(url);
		}
		var title		= doc.title;

		sendResponse(appId, wndId, controlIndex, url, title, controlList(doc, extendFilter));
	} catch (ex){
		return false;
	}
	return true;
}

function setTrigger(doc, setting, sendResponse, sysType, extendFilter) {
	try {
		doc.addEventListener('mousedown',
			function(event) {
				var element = $(event.target);
				if (canExecuteTriggerMouseDown(event, element)) {
					executeTrigger(doc, element, setting, sendResponse, sysType, extendFilter);
				}
			},	true);
		doc.addEventListener('keydown',	
			function(event) {
				var element = $(event.target);
				if (canExecuteTriggerKeyDown(event, element)) {
					executeTrigger(doc, element, setting, sendResponse, sysType, extendFilter);
				}
			},	true);
		$(doc.getElementsByTagName("form")).each(function(){
			this.addEventListener('submit',
				function(event) {
					var form = $(event.target);

					var list = $(form).find(convertFilter(extendFilter)).toArray();
					for (var nIndex=0; nIndex < list.length; nIndex++) {
						var element = $(list[nIndex]);
						if (executeTrigger(doc, element, setting, sendResponse, sysType, extendFilter)) {
							return;
						}
					}
				},	true);
		});
	} catch (ex){
		// NOP
	}
}

function checkString(str) {
	if (null == str) {
		return "";
	}
	return str;
}

function matchPartStr(str1, str2)
{
	var strLocal1 = str1.toLocaleLowerCase();
	var strLocal2 = str2.toLocaleLowerCase();
	return (-1 != strLocal1.indexOf(strLocal2))
}

function matchFrontStr(str1, str2)
{
	var strLocal1 = str1.toLocaleLowerCase();
	var strLocal2 = str2.toLocaleLowerCase();
	return (0 == strLocal1.indexOf(strLocal2))
}

function matchFullStr(str1, str2)
{
	var strLocal1 = str1.toLocaleLowerCase();
	var strLocal2 = str2.toLocaleLowerCase();
	return (strLocal1 === strLocal2)
}

function ConvertDomain( domain )
{
	var convertComain = "";
	var splitDomainList = domain.split(".");
	for (var i = 0; i < splitDomainList.length; i++) {
		if (0 != convertComain.length) {
			convertComain += ".";
		}
		var punysign = "xn--";
		var splitDomain = splitDomainList[i];
		if( 0 == splitDomain.indexOf( punysign ) ) {
			convertComain += Punycode.decode(splitDomain.substring(punysign.length));
		} else {
			convertComain += splitDomain;
		}
	}
	return convertComain;
}

function initSettingIDAdt(doc, settingIDAdt, sendResponse, sysType, extendFilter) {
	try {
		var setting		= initIDAdtAppList(settingIDAdt);
		var domain		= decodeURIComponent(doc.domain);
		if (2 == sysType) { // Chrome
			domain		= ConvertDomain(domain);
		}
		var directory	= decodeURIComponent(doc.location.pathname + doc.location.search);
		if (0 == directory.indexOf("/")) {
			directory = directory.substr(1);  // デコード済みURLから「protocol://domain:port/」を除去(pathnameは先頭に/がある)
		}
		if (false == setting.isTarget(domain, directory, doc.title)) {
			return false;
		}
		setTrigger(doc, setting, sendResponse, sysType, extendFilter);
	} catch (ex){
		// NOP
	}
}

//IDAdtCtlクラス
IDAdtCtl = function(index, type, name, id, trigger) {
	this.index	= index;
	this.type	= type;
	this.name	= name;
	this.id		= id;
	this.trigger= trigger;
}

IDAdtCtl.prototype.isTriggerParent = function(element) {
	try {
		if (false == this.trigger) {
			return false;
		}
		var typeList = this.type.split(".");
		if (3 > typeList.length) { // tag.attr.data
			return false;
		}
		var typeParamTag	= typeList[0];
		var typeParamAttr	= typeList[1];

		var parentList =  element.parents(typeParamTag + "," + "["+ typeParamAttr +"]");
		for (var index=0; index<parentList.length; index++) {
			var parentElement = $(parentList[index]);
			if (IsNormalTargetElementTag(parentElement)) {
				continue;
			}
			if (this.isTrigger(parentElement)) {
				return true;
			}
		}
	} catch (ex) {
		// NOP
	}
	return false;
}

IDAdtCtl.prototype.isTrigger = function(element) {
	try {
		if (false == this.trigger) {
			return false;
		}

		var type	= getElementType(element);
		var name	= checkString(element.prop("name"));
		var id		= checkString(element.prop("id"));

		if (false == matchFullStr(this.type, type)) {
			return false; // type不一致時は即時不一致
		}

		if ( ((null == this.name) || (0 == this.name.length)) && ((null == name) || (0 == name.length)) && ((null == this.id) || (0 == this.id.length))&& ((null == id) || (0 == id.length)) ){
			return true;	// nameとidが空の場合はtype判定の結果のみで判定
		}

		if ( (false == ((null == this.name) || (0 == this.name.length))) && matchFullStr(this.name, name) ){
			return true;
		}
		
		if ( (false == ((null == this.id) || (0 == this.id.length))) && matchFullStr(this.id, id) ){
			return true;
		}
	} catch (ex) {
		// NOP
	}
	return false;
}

//IDAdtWndクラス
IDAdtWnd = function(wndId, url, urlMatch, title, titleMatch, match, systype, domainList, directory, ipBytesList, list) {
	this.wndId		= wndId;
	this.url		= url;
	this.urlMatch	= urlMatch;
	this.title		= title;
	this.titleMatch	= titleMatch;
	this.match		= match;
	this.systype	= systype;
	this.domainList	= domainList;
	this.ipBytesList= ipBytesList;
	this.directory	= directory;
	this.list		= list;
}

IDAdtWnd.prototype.isTarget = function(domain, directory, title) {
	// IDAuditCfgInfo.cpp IsTargetと同じロジック
	// URLとタイトルから対象外かどうか判定
	// プロトコル		＝評価対象外
	// ドメイン名、IP	＝完全一致
	// ディレクトリ		＝完全一致or前方一致
	// タイトル			＝完全一致or部分一致
	// URL、タイトル両方設定されている場合は、AND条件、OR条件を考慮する
	try {
		// URLの評価
		var urlMatch = true;
		if (0 == this.url.length) {
			// 指定がないので評価しない
		} else {
			var ipv4 = new SkyIPv4(domain);
			var ipv6 = new SkyIPv6(domain);
		 	// ドメイン部の評価
		 	if (ipv4.IsIPv4()) {
		 		if (false == this.ipMatch(ipv4.ipByteArray)) {
					// アドレスが完全一致でない
				 	urlMatch = false;
		 		}
		 	} else if (ipv6.IsIPv6()) {
		 		if (false == this.ipMatch(ipv6.ipByteArray)) {
					// アドレスが完全一致でない
				 	urlMatch = false;
		 		}
		 	} else {
		 		if (false == this.domainMatch(domain)) {
					// ドメインが完全一致でない
			 		urlMatch = false;
			 	}
		 	}
		 	
		 	// ディレクトリ部の評価
		 	if (urlMatch) {
		 		var decodeDirectory = this.directory;
		 		if (null != decodeDirectory) {
		 			decodeDirectory = decodeURIComponent(decodeDirectory);
		 		}
		 		if (0 == this.urlMatch) {	// full match
			 		if (false == matchFullStr(directory, decodeDirectory)) {
						// ディレクトリ部が完全一致でない
			 			urlMatch = false;
			 		}
		 		} else {					// front match
			 		if (false == matchFrontStr(directory, decodeDirectory)) {
						// ディレクトリ部が前方一致でない
			 			urlMatch = false;
			 		}
		 		}
		 	}

		 	if ((false == urlMatch) && (0 == this.match)) {	// AND
		 		// URL評価だけで不一致確定
		 		return false;
		 	} else if (urlMatch && (1 == this.match)) {		// OR
		 		// URL評価だけで一致確定
		 		return true;
		 	}
		}

		// タイトルの評価
		var titleMatch = true;
		if (0 == this.title.length) {
			// 指定がないので評価しない
		} else {
			if (0 == this.titleMatch) {	// full match
				if (false == matchFullStr(title, this.title)) {
					// タイトルが完全一致でない
					titleMatch = false;
				}
			} else {
				if (false == matchPartStr(title, this.title)) {
					// タイトルが部分一致でない
					titleMatch = false;
				}
			}
		}

		// 収集条件を考慮
		var match = false;
		if ((0 != this.url.length) || (0 != this.title.length)) {
			if (1 == this.match) {	// OR
				match = (urlMatch || titleMatch);;
			} else {				// AND
				match = (urlMatch && titleMatch);
			}
		} else {
			// URLもタイトルも空の場合、NG（UIでガードするのでありえない）
		}
		return match;
	} catch (ex){
		// NOP
	}
	return false;
}

IDAdtWnd.prototype.isTrigger = function(element, systype) {
	if(this.systype != systype) {
		return false;
	}

	for (var index=0; index<this.list.length; index++) {
		var ctl = this.list[index];
		if(ctl.isTrigger(element) || ctl.isTriggerParent(element)) {
			return Array.prototype.concat(true, this.wndId, ctl.index);
		}
	}
	return [false];
}

IDAdtWnd.prototype.ipMatch = function(ipBytes) {
	if (null == this.ipBytesList) {
		return false;
	}
	if (null == ipBytes) {
		return false;
	}

	try {
		for (var nIndex=0; nIndex<this.ipBytesList.length; nIndex++ ) {
			if (matchFullStr(this.ipBytesList[nIndex].toString(), ipBytes.toString())) {  // byte配列を文字列化して比較
				return true;
			}
	 	}
 	} catch (ex){
		// NOP
	}
	return false;
}

IDAdtWnd.prototype.domainMatch = function(domain) {
	var decodeDomain = "";
	
	if (null == this.domainList) {
		return false;
	}
	if (null == domain) {
		return false;
	}

	try {
		for (var nIndex=0; nIndex<this.domainList.length; nIndex++ ) {
			decodeDomain = this.domainList[nIndex];
	 		if (null != decodeDomain) {
	 			decodeDomain = decodeURIComponent(decodeDomain);
	 		}
			if (matchFullStr(domain, decodeDomain)) {
				return true;
			}
	 	}
 	} catch (ex){
		// NOP
	}
	return false;
}

//IDAdtAppクラス
IDAdtApp = function(appId, list) {
	this.appId	= appId;
	this.list	= list;
}

IDAdtApp.prototype.isTarget = function(domain, directory, title) {

	for (var index=0; index<this.list.length; index++) {
		var wnd = this.list[index];
		if(wnd.isTarget(domain, directory, title)) {
			return true;
		}
	}
	return false;
}

IDAdtApp.prototype.isTrigger = function(doc, element, systype) {
	var domain		= decodeURIComponent(doc.domain);
	if (2 == systype) { // Chrome
		domain		= ConvertDomain(domain);
	}
	var directory	= decodeURIComponent(doc.location.pathname + doc.location.search);
	if (0 == directory.indexOf("/")) {
		directory = directory.substr(1);  // デコード済みURLから「protocol://domain:port/」を除去(pathnameは先頭に/がある)
	}

	for (var index=0; index<this.list.length; index++) {
		var wnd = this.list[index];
		if (false == wnd.isTarget(domain, directory, doc.title)) {
			continue;
		}
		var ret = wnd.isTrigger(element, systype);
		if(ret[0]) {
			return Array.prototype.concat(true, this.appId, ret[1], ret[2]);
		}
	}
	return [false];
}

//IDAdtAppListクラス
IDAdtAppList = function(list) {
	this.list	= list;
}
IDAdtAppList.prototype.isTarget = function(domain, directory, title) {

	for (var index=0; index<this.list.length; index++) {
		var app = this.list[index];
		if(app.isTarget(domain, directory, title)) {
			return true;
		}
	}
	return false;
}

IDAdtAppList.prototype.isTrigger = function(doc, element, systype) {

	for (var index=0; index<this.list.length; index++) {
		var app = this.list[index];
		var ret = app.isTrigger(doc, element, systype);
		if(ret[0]) {
			return Array.prototype.concat(true, ret[1], ret[2], ret[3]);
		}
	}
	return [false];
}

// 設定をIDAdtWndに変換
function initIDAdtWnd(wnd) {
	var list = wnd.list;
	var array = new Array();
	for (var index=0; index<list.length; index++) {
		var ctl = list[index];
		array.push(new IDAdtCtl(ctl.index, ctl.type, ctl.name, ctl.id, ctl.trigger));
	}
	return new IDAdtWnd(wnd.wndId, wnd.url, wnd.urlMatch, wnd.title, wnd.titleMatch, wnd.match, wnd.type, wnd.domainList, wnd.directory, wnd.ipBytesList, array);
}

// 設定をIDAdtAppに変換
function initIDAdtApp(app) {
	var list = app.list;
	var array = new Array();
	for (var index=0; index<list.length; index++) {
		var wnd = list[index];
		array.push(initIDAdtWnd(wnd));
	}
	return new IDAdtApp(app.appId, array);
}

// 設定をIDAdtAppListに変換
function initIDAdtAppList(appList) {
	var list = appList.list;
	var array = new Array();
	for (var index=0; index<list.length; index++) {
		var app = list[index];
		array.push(initIDAdtApp(app));
	}
	return new IDAdtAppList(array);
}
/* Copyright (c)2015 Sky Co., LTD. All rights reserved. */