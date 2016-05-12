<!--
author: 小莫
date: 2016-05-11
title: angularjs键盘事件
tags: angularjs
category: angulrjs键盘事件
status: publish
summary: 使用angularjs的键盘事件来增强用户体验。
-->

#今日分享
###绑定键盘事件（尤其注意：不能用a标签，不然会失效）
>推荐button
* 方法一：ng内置指令
```
<button ng-click="login()" ng-keypress="todoSomething($event)" class="btn btn-success btn-lg" ng-disabled="loginForm.$invalid">
    登录
</button>
```
>说明：在对应的控制器中的$scope上绑定一个todoSomething方法
```
    $scope.todoSomething=function($event){
        if($event.keyCode==13){//回车
            login();
        }
    }
```
* 方法二：自定义指令
> html
```
<button ng-click="login()" ng-enter="login()" class="btn btn-success btn-lg" ng-disabled="loginForm.$invalid">
    登录
</button>
```
>指令
```
myApp.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
```
###### 总结：两种方法都能实现敲回车登录的功能，不过推荐指令的方式，对$scope的污染比较低

>参考文档：[angularjs学习笔记—事件指令](https://segmentfault.com/a/1190000002634554#articleHeader8)
