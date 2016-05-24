<!--
author: 小莫
date: 2016-05-20
title: javscript学习笔记
tags: javascript
category: javascript
status: publish
summary: 一直对javscript抱有敬畏的态度，也没有一直深入学习。当学到各种js框架的时候才发现力不从心，感觉到了javascript基础的重要性，重新认真的系统的学习一下。
-->

##一些不同##
1. javscript没有块级作用域 于是es6中有了let和var    
模拟js的块级作用域    

```
  function outputNumbers(count){
    (function(){
      for(var i=0;i<count;i++){
        console.log(i);
      }
      })();
  }
  console.log(i) //会报错
```

2. javascipt中this用法不同,它指向调用它的那个对象
3. 闭包是指有权访问另一个函数作用域中的变量的函数。

```
  function createAFunction(){
    return function(){
      return '这是一个闭包';
    }
  }
```

##一、基本数据类型##  
`undefined`、`null`、`boolean`、`string`、`number` 、`object`、`function`  
它们有对应的方法`Boolean()`、`String()`、`Number()` 、`Object()`  

1. `undefined`   
没有被定义就会返回`undefined`,是`null`衍生出来的,因些`undefined==null` 返回true

2. `null`   
由于历史原因 `typeof null`返回`object`

3. `boolean`  
`Boolean()`   
非0返回true  
0、null、undefined返回false

4. `string`   
`String()`        
不管传入什么都会原样返回,但如果是`function`,会执行该方法并返回`undefined`    
`toString(参数,进制)`   
`toUpperCase()`  
`toLowerCase()`   
`substring(parm1,parm2)`     
`substr()`   
`charAt(1)`    
`charCodeAt(2)`    
`concat()`  
`slice()`  
`indexof()`  
`lastIndexOf`  
`trim()`  
`search(pattern)`  //返回索引   
`replcae('原','新')` //第一个参数支持正则    第二个参数也可以是一个function     
`splice(',')`    //支持正则，支持指定长度    
它只有length属性   

5. `number`   
`Number()`          true=>1 false=>0   null=>0 undefined=>NaN   
`Number.MAX_VALUE`  最大值    
`Number.MIN_VALUE`  最小值    
`NaN`  它是一个特例，不与任何值相等包括自己    
`parseInt()` //可以查找字符串中的数字并转换   
`parseFloat()` //可以查找字符串中的数字并转换   
`inFinite()` //是否在最大值和最小值之间   
`toFixed(小数点位数)`
说明：它能够识别科学计数法 比如 2.15e5 => 215000   

6. `object`  
`constructor`  构造函数   
`obj.hasOwnProperty()` 是否具有自己的方法  
`obj.isProtoTypeOf(object)`  检查传入的对象是否是另一个对象的原型   
`ob.propertyIsEnumerable(propetyName)`  检查给定的属性能否使用for-in
`obj.toLocaleString()` 返回执行地区对应的对象的字符串 =>['Object']  
`obj.toString()`    返回执行对象的字符串 =>['Object']    
`obj.valueOf()`   返回对象序列化之后的结果


##二、运算符##
1. 大于和小于  
`'23'<'3' `  //true,字符串的比较跟数字的比较不同   
`'a'<3`   //false a会被转成NaN   
`特别注意`:NaN和任何数比都是false
`NaN>3` //false   
`NaN<3` //false  
`'23'<3` //false  '23'会被转成23再与3比较

2. 全等和不全等  
`'55'==55` //true 不全等只判断值不判断类型  
`'55'===55` //false  全等不仅判断值还判断类型  

##三、条件控制语句##
```
  for(proertyName in global){
    console.log(proertyName)
  }
```

##四、方法##  
注意：javascript和java不同，它没有重载,定义两个方法名相同的方法后面一个会覆盖前面一个。

##五、检测类型##

`typeof xxx`
// 返回数据类型

##六、引用类型##

1. `object`  
声明对象的方法  
`var obj = new Object();`   
`var obj = {};`

赋值   
`obj.name='xiaomo';`   

使用对象的属性
`obj.name`  
`obj['name']`  

2. `Array`   可以存任何类型    
声明
`var arr = new Array();`   
`var arr = new Array(3);`   
`var arr = [];`  

添加对象   
`arr.push('a',b',1,3,4,true)`   
操作对象(删除、插入、替换)     

`删除`：起始位置，要删除的个数       
`arr.splice(起始位置,删除的个数)`     
例子：`arr.splice(2,1)` //返回[1] 返回删除的那个数   

`插入`：起始位置、要删除的个数(0)、要插入的数,可以是多个,返回空数组    
`arr.splice(起始位置,删除的个数,参数1,参数2,参数n)`   
例子:`arr.splice(1,0,'插入的值1','插入的值2','插入的值n')`  

`替换`：起始位置、要删除的项目、要插入的任意项，可以是多个,返回被替换的值  
`arr.splice(起始位置,删除的个数,参数1,参数2,参数n)`  
例子:`arr.splice(0,2,'test1','test2') `   


其他数组操作
`arr.push('test')` 插入到数组的最后面   
`arr.unshift('xiaomo')` 插入到数组的最前面   
`arr.pop()`   //删除数组的最后一个值   
`arr.shift()` //删除数组第一个值

使用对象   
`arr[1]`   

数组自带的方法
`arr.reverse();`   反转数组
`arr.sort()`   默认升序排列
`arr.sort((a,b)=>{reutrn b-a})`  传入排序方法会按照自定义排序   
`arr.concat(另一个数组或者单个参数)`  如果传入数组也会被展开拿出来,不会影响原数组   
`arr.slice(0,3)`  会把选定的部分截取出来生成一个新的数组，不会影响原数组     
`arr.indexOf(4)`   返回该值存在的下标,不存在返回-1   
`arr.lastIndexOf(4)` 从倒数开始查找,返回该值存在的下标,不存在返回-1
`arr.every(fn)`   对每个参数进行处理，全部符合返回true   
```
fn=(item,index,array){//当前值、索引、该数组
  return item>2
}
```
`arr.some(fn)`   对每个参数进行处理，有一个符合就返回true  
```
fn=(item,index,array){//当前值、索引、该数组
  return item>2
}
```
`arr.filter(fn)` 对每个参数进行处理，返回过滤后的数组   
```
fn=(item,index,array){//当前值、索引、该数组
  return item>2
}
```
`arr.map(fn)`    对每个参数进行处理，返回处理后的数组  
```
fn=(item,index,array){//当前值、索引、该数组
  return item*2
}
```
`arr.forEach(fn)`  对每个参数进行处理，没有返回值
`arr.reduce(fn)`    对每个参数进行处理，迭代返回最终结果    
```
fn=(prev,cur,index,array){//前一个值、当前值、索引、数组
  return prev+cur
}
```
`arr.reduceRight(fn)`  从右边对每个参数进行处理，迭代返回最终结果   
```
fn=(prev,cur,index,array){//前一个值、当前值、索引、数组
  return prev+cur
}
```

3. Date类型    
声明:   
`var date = new Date();`  创建当前时间 也可以接收参数     
`Date.parse(pattern)`    //   6/13/2016  May 25,2016  或者 yyyy-MM-dd hh:mm:ss格式的  返回时间戳   
`new Date(Date.parse(pattern))`   //   将时间戳格式化为正常的时间    
`new Date(2016,5,19,20,49,15)`  //也可以用逗号 2016-05-19 20:49:15
`Date.now()`  //当前时间的时间戳    
`toDateString()` //返回时间的字符串 星期、日、月、年   
`toTimeString()` //时、分、秒、时区  
`toLocaleDateString()`   特定时区的星期、日、月、年
`toLocaleTimeString()`   特定时区的时、分、秒、时间    

时间格式   
```
var date = new Date();
var time = date.getTime() //当前时间的时间戳
var fullYear = date.getFullYear(); //2016
var year = date.getYear();   //116  
var month = date.getMonth(); //04 从0开始
var d = date.getDate(); //日  19
var day = date.getDay();  //4 返回星期几
var min = date.getMinitues(); //0
var sec = date.getSeconds() //秒
var mill = date.getMilliSeconds() //毫秒
```

4. 正则 RegExp类型   

```
var re = new RegExp('pattern');
re.test(parm);

// exec 返回匹配的结果
var test = 'abcdef.js';
var pattern = /\.js$/
var matches = parrten.exec(test);
console.log(matches); // '.js' ,index:6 input:'abcdef.js'

//test 返回true/false
var text = 'abcdef.js';
var pattern = /\.js$/
pattern.test(text); // true
```

5. 方法　function     
方法没有重载,如果是同名,不管参数个数是不是相同,后面定义的方法都会覆盖前面的方法  
每个方法都包含两个属性:`length`(参数个数)和`protoType`(原型链)   
```
  function test(a,b){
    return a+b;
  }
  function test(a){
    return a;
  }
  test(1)    //1
  test(1,2)  //1
```
你可以不按正常顺序执行方法,因为在执行的时候 function都会被提前    
```
test();
function test(){
  console.log('这是一个方法');
}
```

但如果是立即执行的函数则不行

```
(
  function test(){

  }()
  )
```

方法有两个特殊的内部属性和两个非继承来的方法 `call()`、`apply()`,以及其他方法 `toString()、valueOf()`    
`arguments`和`this`   
`arguments`是类数组,保存着参数。它有`arguments.callee()`方法   
```
  function factorial(num){
      if(num<=1){
        return 1;
      } else {
        return num * arguments.callee(num-1);
      }
  }

  factorial(5); // 5! 1*2*3*4*5

```

`this`在javascript中用法比较特殊,它指向它的调用者

```
var color='green';
function sayColor(){
    console.log(this.color);
  }
var o = {
  color='pink';
}
o.sayColor(); //pink
sayColor(); //green
```

`protoType` 原型链    

```
  function sum (num1,num2){
    return num1+num2;
  }
  // call 参数1:运行函数的作用域 参数2 agruments或者Array
  function callSum1(num1,num2){
    return sum.apply(this,arguments);
  }
  function callSum2(num1,num2){
    return sum.apply(this,[num1,num2])
  }
  // apply 参数1：运行函数的作用域 其他参数:就是把apply中的数组拆开
  function callSum2(num1,num2){
    return sum.apply(this,num1,num2)
  }
```

`encodeURIComponent()` //encode字符串          
`decodeURICopmonent()` //decode字符串   
`eval(express)` //解析字符串表达式   
`eval("console.log('我是被解析的表达式')")`   

6. `Math`    
`Math.E` //e   
`Math.LN10` //10的自然对数  
`Math.LOG10E` //以10为底e的对数   
`Math.PI`  //PI  
`Math.SQRT2` //2的平方根   
`Math.SQRT1_2`  // 1/2的平方根   

方法：
`Math.min(Array)`    
`Math.max(Array)`    
`Math.ceil(parm)` //向上取整  
`Math.floor(parm)` //向下取整   
`Math.round(parm)` //标准的四舍五入   
`Math.random()`  // 0-1之间的数   
`Math.abs(parm)` //绝对值

##七、面向对象的编程方法##  

```
  var person = {
    name:'xiaomo',
    age:25，
    sayHello:function(){
      console.log(this.name);
    }
  }
```

工厂模式

```
  function createPerson(name,age,job){
      var o = new Object();
      o.name = name;
      o.age= age;
      o.job =job;
      o.sayName=function(){
        console.log(this.name);
      }
      return o;
  }
  var person1 = createPerson('xiaomo',25,'programer');
  var person2 = createPerson('xiaoming',20,'it');
```

构造函数(不用显式的创建对象，不用返回值，直接把属性赋给this)

```
  function Person(name,age,job){
    this.name = name;
    this.age = age,
    this.job = job;
    this.sayName = function(){
      console.log(this.name);
    }
  }

var person1 = new Person('xiaomo',25,'programer');
var person2 = new Person('xiaoming',20,'it');
```

判断类型 `instanceof`  

```
  person1 instanceof Object //true
  person1 instanceof Person //true
```

原型模式    

```
  function Person(){}
  //实际上隐式的创建一个构造函数constructor
  Person.prototype.name='xiaomo';
  Person.prototype.age=25;
  Person.prototype.job='programmer';
  Person.prototype.sayName=function(){
    console.log(this.name);
  }

  //当前也可以这样
  Person.prototype={
    name='xiaomo';
    age=25;
    job='programmer';
    sayName=function(){
      console.log(this.name);
    }
  }

  var person1 = new Person();
  Person.prototype.isPrototypeOf(person1); //true
  Object.getPrototypeOf(person1.name); //xiaomo
  person1.hasOwnProperty('name') //false 存在于protoType中，不存在于实例中
  'name' in person1 //true  虽然实例中没有,但是它的原型链有,所以返回true
  Object.keys(person1) //会枚举出实例中所有的属性
```

##八、定时器和延迟执行##

```
//延迟一秒执行fn函数，只执行一次
  let timeout = 1000;
  var fn = function(){
    console.log('hello');
  }
  var timeoutId = setTimeout(fn,timeout)
  //清除间歇执行函数
  clearTimeout(timeoutId);


  //定时器，每秒执行fn函数，直到清除定时器
  var timeout = 1000;
  var fn = function(){
    console.log('定时器')
  }
  var intervalId = setInterval(fn,timout)
  //清除定时器
  clearInterval(itervalId);
```

##九、BOM(浏览器相关)##

1. 系统对话框

```
  alert(); //弹出框

  confirm();//确认框
  if(confirm('are you sure?')){
    console.log('sure');
  } else{
    console.log('I am not sure!');
  }

  prompt();//交互框
  var result = promot("what's up?"，'默认值');
  if(result!=null){
    alert(result);
  }

```

2. location对象  

参数

```
location.hash //#contents url的hash值
location.host // ip
location.hostname //域名
location.href //http域名
location.pathname //url的目录
location.port //8080
location.protocool //协议
location.search //?q=search
location.reload() //可能从缓存加载
location.reload(true) //重新加载
```

3. navigator对象 检测浏览器属性    

```
navigator.appCodeName //浏览器的名字
navigator.appName //完整的浏览器名称
navigator.appVersion //浏览器的版本
navigator.cookieEnabled //cookie是否启用
navigator.javaEnabled() //java是否启用
navigator.language //主语言 zh-CH
navigator.languages //支持的语言
navigator.onLine //浏览器是否连接到了internet
navigator.platofrm //浏览器的平台 "Win32"
navigator.plugins //返回浏览器安装的插件的数组
function hasPlugin(name){
  name  = name.toLowerCase();
  for(var i = 0 ; i<navigator.plugins.length;i++){
    // >-1表示找到了
    var isTrue = navigator.plugins[i].name.toLowerCase().indexOf(name)>-1;
    if(isTrue){
      return true;
    }
  }
  return false ;
}
```

4. history对象   

```
  history.go(-1);//后退一页
  history.back();

  history.go(1);//前进一页
  history.forward();

  history.go('xiaomo.info')//跳转到最近访问过的该页面
  history.length==0 //表示这是用户打开浏览器的第一个页面
```

##十、表单##

1. 表单属性

```
  acceptCharset 服务器能够处理的字符集
  action 接受请求的url
  elements 表单所有控件的集合
  enctype 请求的编码类型
  length 表单中控件的数量
  method get/post
  name 表单的名字
  reset() 重置
  submit() 提交
  target
```

`document.forms` 可以取到表单的所有控件    


2. 控件

```
  disabled 当前字段是否禁用
  form 指向当前字段所属表单的指针:只读
  name 当前字段的名字
  readOnly 当前字段只读
  tabIndex tab切换的序号
  type 当前字段的类型
  value 当前字段提交给服务器的值
```

修改控件的值

```
  var input = document.getElementById('name');
  name.value='xiaomo'
  name.focus(); //把焦点设置到当前字段
  //在控件中加入 autofocus="focus" 是一样的效果
```

选择文本   
`element.select()`     

取得选中的文本
```
    function alertText(username){
      var username = document.getElementById('username');
      alert(getSelectText(username));
      }
    function getSelectText(textbox){
      return textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);
    }

    // html
  <input type="input" id="username" value="我是测试文本，看一下能不能被选中">
  <input type="button" value="确定" onclick="alertText()">
```

3. 剪贴板事件

```
  beforecopy
  copy
  cut
  beforepaste
  paste

  //写一个公用方
  var EventUtil = {

    getClipboardText:function(event){
      var clipboardData  = (event.clipboardData || window.clipboardData);
      return clipboardData.getData('text');
    }

    setClipboardText:function(event,value){
      if(event.clipboardData){
        return event.clipboardData.setData("text/plain",value);
      } else if (window.clipboardData){
        return window.clipboardData.setData("txt",value);
      }
    }

  }

  EventUtil.addHander(txtbox,"paste",function(event)){
    event  = EventUtil.getEvent(event);
    var text = EventUtil.getClipboardText(event);
    if(!/^\d*$/.test(text)){
      EventUtil.preventDefault(event);
    }
  }

```

[EventUtil](http://www.cnblogs.com/hykun/p/EventUtil.html)

自动切换焦点

```
  (function(){
    function tabForward(event){
      event = EventUtil.getEvent(event);
      var target = EventUtil.getTarget(event);
      if(target.value.length = target.maxLength){
        var form = target.form;
        for( var i =0; len = form.elements.length;i<len;i++){
          if(form.elements[i]==target){
            if(form.elements[i+1]){
              form.elements[i+1].focus();
            }
            return;
          }
        }
      }
    }
    var text1 = document.getElementById('text1');
    var text2 = document.getElementById('text2');
    var text3 = document.getElementById('text3');
    EventUtil.addHander(text1,'keyup',tabForward);
    EventUtil.addHander(text2,'keyup',tabForward
    EventUtil.addHander(text3,'keyup',tabForward
    })()
```


4. 下拉框 select   

```
  add(newOption,relOption) 插入一个option
  //最佳做法(在列表最后插入一个option)
  var newOption = new Option("text","value");
  selectBox.add(newOption,undefined);

  multiple 是否允许多选
  options 控件中所有options的HTMLCollection
  remove(index) 移除指定位置的选项
  //移除指定的选项(这里移除的是第一项)
  var index = 0
  selectBox.remove(selectBox.options[index])
  selectedIndex 基于0的选中项的索引,没有选中项-1
  size 选择框中可见的行数
  text 选中项的文本内容
  value 选项的值
  //移动一个选项到特定位置(将第2个选项移动到最后一个选项)
  var optionToMove = selectBox.options[1];
  selectBox.insertBefore(optionToMove,selectBox.options[optionToMove.index-1])
  /添加一个选项(把当前列表中的第一个选项添加到当前列表的最后)
  selectBox.appendChind(selectBox.options[0]);
```

5. 表单序列化    

原则：   
对表单字段的名字和值进行url编码,使用&分割    
不发送禁用的表单字段    
只发送勾选的单选按钮和复选框   
不发送type为reset和button的按钮   
多选框中的每选中的值单独一个条目    
submit的时候,本按钮也会被提交   
select发送的时候如果有value就发value的值 没有就发text内容  

`form.serialize()`  

6. 富文本编辑器  
只要加上`contenteditable`就可以让div可以编辑   
`<div id="richedit" contenteditable></div>`
也可以用js控制

```
  var richedit = document.getElementById('richedit');
  richedit.contenteditable="true";
  // true false inherit
  document.exexCommand(命令,false,值);
  //document.exexCommand('bold',false,null);
```


## 十一、canvas ##   

```
  //定义一个canvas   
  <canvas id="drawing" width="200" height="200">
      您的浏览器不支持canvas
  </canvas>
  //获取canvas
  document.getElementById('drawing');
  if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.fillReact(30,30,30,30); //画了一个正方形
    context.fillStyle='#fff'; //填充
    context.strokeStyle='red'; //描边
    // todo
  }
```


## 十二、html5脚本编程##

```
  //跨文档消息传送
  EventUtil.addHander(window,"message",function(event){
      if(event.origin="http://www.wrox.com"){//发送消息的文档所在的域
        //接受参数
        processMessage(event.data);
        //可选:向窗口来源发送回执
        event.source.postMessage("Receiived","http://xiaomo.info")
      }


    })
```


## 十三、cookie##   

```
  var CookUtil = {
      get:function(name){
        var cookieName
      }

  }
```
