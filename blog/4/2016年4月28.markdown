<!--
author: 小莫
date: 2016-05-11
title: 表单添加之ng-options
tags: angularjs
category: angulrjs之ng-options
status: publish
summary: 我们在使用select>option的时候经常会遇到一些问题，这里是对ng-options使用的一些总结。
-->
#今日分享：表单添加之ng-options
######这个ng-options感觉略坑啊，跟原生的select、option不太一样

#### 要解决的几个问题
1. select下拉框的默认值
2. 通过选择不同的值传给后台
3. ng-options的值要设置在$scope中
###下面正式开始
1.html中的展示
```
<div class="form-group">
    <label class="col-md-2 control-label">
        权限：
    </label>
    <div class="col-md-10">
        <select title="权限" ng-model="adminUser.authLevel"
                ng-options="authLevel.name for authLevel in adminUser.authLevels">
            <option value="">-- 请选择 --</option>
        </select>
        {{adminUser.authLevel}}
    </div>
</div>
```
>代码解释：ng-options类似于ng-repeat,把$scope中的内容循环展示出来,设置一个ng-model

***
 controller中设置ng-options的默认值
```
 $scope.adminUser = {};
 $scope.adminUser.authLevels = [{'id': 1, 'name': '超级管理员'}, {'id': 2, 'name': '普通管理员'}];
```
>controller中接收设置的ng-model,就可以解决html和controller之间的通讯了

> ######参考自 ：[runjs源码](http://runjs.cn/code/nhi8ubrb)
