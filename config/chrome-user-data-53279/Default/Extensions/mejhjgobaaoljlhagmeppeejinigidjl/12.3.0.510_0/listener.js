//////////////////////////
// Definition of package
//////////////////////////
if (null == SkyFrame) {
	var SkyFrame = {};
}
if (null == SkyFrame.Common) {
	SkyFrame.Common = {};
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


SkyFrame.Common.Listener = function()
{
	this.listenerList	= [];
}

SkyFrame.Common.Listener.prototype.index_ = function(func)
{
	try {
		for ( var i = 0; i < this.listenerList.length; ++i ) {
			if(this.listenerList[i] == func) {
				return i;
			}
		}
	} catch(ex) {}
	return -1;
}

SkyFrame.Common.Listener.prototype.addListener = function(func)
{
	try {
		if(-1 != this.index_(func)) {
			return;
		}
		this.listenerList.push(func);
	} catch(ex){}
}

SkyFrame.Common.Listener.prototype.removeListener = function(func)
{
	try {
		var index = this.index_(func);
		if(-1 == index) {
			return;
		}
		
		this.listenerList.splice(index, 1);
	} catch(ex){}
}
