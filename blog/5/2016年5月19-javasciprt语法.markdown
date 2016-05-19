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
2. javascipt中this用法不同,它指向调用它的那个对象

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
它只有length属性  

5. `number`   
`Number()`          true=>1 false=>0   null=>0 undefined=>NaN   
`Number.MAX_VALUE`  最大值    
`Number.MIN_VALUE`  最小值   
`NaN`  它是一个特例，不与任何值相等包括自己  

```
parseInt() //可以查找字符串中的数字并转换
parseFloat() //可以查找字符串中的数字并转换
inFinite() //是否在最大值和最小值之间
```

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
