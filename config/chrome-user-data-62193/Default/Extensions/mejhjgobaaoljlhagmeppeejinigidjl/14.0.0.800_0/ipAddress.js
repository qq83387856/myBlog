/* Copyright (c)2015 Sky Co., LTD. All rights reserved. */
SkyIPv4 = function(ipString){
	this.ipByteArray = null;
	this.parseString(ipString);
}

SkyIPv4.prototype.parseString = function(ipString) {
	try {
		if (null == ipString) {
			return;
		}
		
		var ipStringList = ipString.split(".");
		if (4 != ipStringList.length) {
			return;
		}
		
		var byteArray = [];
		for (var nIndex=0; nIndex < ipStringList.length; nIndex++) {
			var targetString = ipStringList[nIndex];
			var splitString = targetString.match(/([0-2][0-9][0-9]|[0-9][0-9]|[0-9])/g);
			if (1 != splitString.length) {
				retrun; // 完全一致しない
			}
			if (targetString != splitString[0]) {
				retrun; // 完全一致しない
			}
			byteArray.push(parseInt(targetString, 10));
		}
		this.ipByteArray = byteArray;
	} catch(ex){
	}
}

SkyIPv4.prototype.IsIPv4 = function() {
	return (null != this.ipByteArray);
}

// C++相当の下記制限あり
// ・IPv4射影アドレスは非対応
// ・インターフェース指定は非対応
// ・サブネットマスク指定は非対応
SkyIPv6 = function(ipString){
	this.ipByteArray = null;
	this.parseString(ipString);
}

SkyIPv6.prototype.parseString = function(ipString) {
	try {
		if (null == ipString) {
			return;
		}
		var tmpIpString = ipString;
		if (0 == tmpIpString.indexOf("[")) {
			tmpIpString = tmpIpString.substr(1); // 先頭の[を除去
		}
		if ((tmpIpString.length - 1) == tmpIpString.indexOf("]")) {
			tmpIpString = tmpIpString.substr(0, (tmpIpString.length - 1)); // 末尾の]を除去
		}
		
		var tmpList = tmpIpString.split("::"); // まず省略形で分割
		var tmpListFront	= [];	// 省略部からの前半部
		var tmpListBack		= [];	// 省略部からの後半部

		if (1 == tmpList.length) {			// 非省略形
			tmpListFront = tmpList[0].split(":");
			if (8 != tmpListFront.length) {
				return; // 要素数不足
			}
		} else if (2 == tmpList.length) {	// 省略形
			tmpListFront = tmpList[0].split(":");
			tmpListBack = tmpList[1].split(":");
		} else {							// 不正な形式
			return;
		}
		var tmpListCut	= [];	// 省略部
		var tmpNum = 8 - tmpListFront.length - tmpListBack.length; // 省略数
		for (var nIndex=0; nIndex < tmpNum; nIndex++) {
			tmpListCut = Array.prototype.concat(tmpListCut, "0");	//省略部を復元
		}

		// 省略部を復元した:分割リスト
		var ipStringList = Array.prototype.concat(tmpListFront, tmpListCut, tmpListBack);
		
		var byteArray = [];
		for (var nIndex=0; nIndex < ipStringList.length; nIndex++) {
			var targetString = ipStringList[nIndex];
			var splitString = targetString.match(/([a-zA-Z0-9]{1,4})/g);
			if (null == splitString) {
				retrun; // 完全一致しない
			}
			if (1 != splitString.length) {
				retrun; // 完全一致しない
			}
			if (targetString != splitString[0]) {
				retrun; // 完全一致しない
			}

			while (4 > targetString.length) {
				targetString = "0" + targetString;	// セクション内の省略を復元(16bit-4文字表現)
			}

			byteArray.push(parseInt(targetString.substr(0, 2), 16));	// セクション(16bit)前半の8bit(2文字)
			byteArray.push(parseInt(targetString.substr(2, 2), 16));	// セクション(16bit)後半の8bit(2文字)
		}
		this.ipByteArray = byteArray;

	} catch(ex){
	}
}

SkyIPv6.prototype.IsIPv6 = function() {
	return (null != this.ipByteArray);
}
/* Copyright (c)2015 Sky Co., LTD. All rights reserved. */