<!--
author: 小莫
date: 2016-05-10
title: angularjs的验证系统,
tags: angularjs
category: angularjs表单验证
status: publish
summary: 使用angularjs的验证系统来做前端验证需要注意的一些地方
-->

### 今日分享
#### angularjs的验证系统
### 1. 效果图
 ![angularjs验证效果图](./../img/validate.gif)
 如果看起来比较小也可以手动点击下面的链接查看大图  
 [uirouter效果](./../img/validate.gif)
### 2. 要点

##### a:要点1：给form起一个名字,并禁掉原生的验证
##### b:要点2：这个div是要在内容发生变化且不合法才会显示

```
   <div class="error" ng-show="addBlogForm.title.$dirty && addBlogForm.title.$invalid">
                    <small class="error" ng-show="addBlogForm.title.$error.required">请输入标题内容</small>
                    <small class="error" ng-show="addBlogForm.title.$error.minlength">标题内容最少长度为3</small>
                    <small class="error" ng-show="addBlogForm.title.$error.maxlength">标题最大长度为64</small>
                    <small class="error" ng-show="addBlogForm.title.$error.unique">
                        这个标题己经被用过了，请换一个标题吧
                    </small>
     </div>
```
##### c:要点3：格式为fromName.inputName.$error.xxx   例子如上

##### d:要点4：将提交按钮是否可用交给ng来判断:合法的时候才可用

>代码示例

```
 <button ng-click="addBlog()" class="btn btn-info" ng-disabled="addBlogForm.$invalid">添加博客
```
#### 3. 以上介绍的是angularjs的原生的验证，下面是一些关于验证的扩展插件
|所属|名字|
| :----: |:------:|
|angular-ui|  ng-messages|
|第三方扩展| w5cValidator|
|jquery-validate|JQ的插件|

附上我github的地址
   [https://github.com/qq83387856](https://github.com/qq83387856)
