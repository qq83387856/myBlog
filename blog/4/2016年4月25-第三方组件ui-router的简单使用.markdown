<!--
author: 小莫
date: 2016-05-11
title: 第三方组件ui-router的简单使用
tags: angularjs
category: angularjs之ui-router
status: publish
summary: 因为1.x的angularjs自带的ng-router功能比较弱，不支持路由嵌套。因些我们要使用到ui-router这个组件
-->

# ui-router使用
1. 多视图用@，嵌套用parent.child这种子路由
>要切换的视图(main)用ui-view,始终不会变成其他内容的不需要路由

2.要切换的路由ui-sref用子路由
* main.a
* main.b
* main.c
* main.d
*  ....

>效果图
![uirouter效果](./../img/uirouter.gif)

如果看起来比较小也可以手动点击下面的链接查看大图  
[uirouter效果](./../img/uirouter.gif)

>html 使用ui-sref
```
    <div class="col-md-1 list-group" style="text-align: center">
        <a ui-sref="main.authority" class="list-group-item">权限管理</a>
        <a ui-sref="main.blog" class="list-group-item">博客管理</a>
        <a ui-sref="main.user" class="list-group-item">用户管理</a>
        <a ui-sref="main.tag" class="list-group-item">标签管理</a>
        <a ui-sref="main.changeLog" class="list-group-item">更新日志</a>
        <a ui-sref="main.links" class="list-group-item">友情连接</a>
        <a ui-sref="main.systemSet" class="list-group-item">系统设置</a>
    </div>

```

>app.js 路由配置
```
	myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    /* ===========================================================登录===========================================================================*/
        .state('login', {//登录
            url: '/login',
            templateUrl: './login.html',
            controller: 'AdminLoginController'
        })
        .state('main', {//主界面
            url: '/main',
            templateUrl: './src/tpls/common/home.html',
            controller: 'BasicInfoController'
        })
        /* ===========================================================博客===========================================================================*/
        .state('main.blog', {//博客列表
            url: '/blog',
            templateUrl: './src/tpls/blog/blogList.html',
            controller: 'BlogListController'
        })
        .state('main.addBlog', {//添加博客
            url: '/addBlog',
            templateUrl: './src/tpls/blog/addBlog.html',
            controller: 'BlogAddController'
        })
        .state('main.editBlog', {//编辑博客
            url: '/editBlog/:id',
            templateUrl: './src/tpls/blog/editBlog.html',
            controller: 'BlogEditController'
        })
        /* ===========================================================权限===========================================================================*/
        .state('main.authority', {//权限列表
            url: '/authority',
            templateUrl: './src/tpls/authority/authorityList.html',
            controller: 'AdminListController'
        })
        .state('main.addAuthority', {//添加权限
            url: '/addAuthority',
            templateUrl: './src/tpls/authority/AddAuthority.html',
            controller: 'AdminAddController'
        })
        .state('main.editAuthority', {//编辑权限
            url: '/editAuthority/:id',
            templateUrl: './src/tpls/authority/authorityEdit.html',
            controller: 'AdminEditController'
        })
        /* ===========================================================用户===========================================================================*/
        .state('main.user', {//用户列表
            url: '/user',
            templateUrl: './src/tpls/user/userList.html',
            controller: 'UserListController'
        })
        .state('main.addUser', {//添加用户
            url: '/addUser',
            templateUrl: './src/tpls/user/addUser.html',
            controller: 'UserAddController'
        })
        .state('main.editUser', {//编辑用户
            url: '/editUser/:id',
            templateUrl: './src/tpls/user/editUser.html',
            controller: 'UserEditController'
        })
        /* ===========================================================标签===========================================================================*/
        .state('main.tag', {//标签列表
            url: '/tag',
            templateUrl: './src/tpls/tag/tagList.html',
            controller: 'TagListController'
        })
        .state('main.addTag', {//添加标签
            url: '/addTag',
            templateUrl: './src/tpls/tag/addTag.html',
            controller: 'TagAddController'
        })
        .state('main.editTag', {//编辑标签
            url: '/editTag',
            templateUrl: './src/tpls/tag/editTag.html',
            controller: 'TagEditController'
        })
        /* ===========================================================日志===========================================================================*/
        .state('main.changeLog', {//更新日志列表
            url: '/changeLog',
            templateUrl: './src/tpls/changeLog/changeLog.html',
            controller: 'ChangeLogListController'
        })
        .state('main.addChangeLog', {//添加更新日志
            url: '/addChangeLog',
            templateUrl: './src/tpls/changeLog/addChangeLog.html',
            controller: 'ChangeLogAddController'
        })
        .state('main.editChangeLog', {//编辑更新日志
            url: '/editChangeLog',
            templateUrl: './src/tpls/changeLog/editChangeLog.html',
            controller: 'ChangeLogEditController'
        })
        /* ===========================================================友链===========================================================================*/
        .state('main.links', {//友情链接列表
            url: '/links',
            templateUrl: './src/tpls/links/linkList.html',
            controller: 'LinkListController'
        })
        .state('main.addLink', {//添加友情链接
            url: '/addLink',
            templateUrl: './src/tpls/links/addLink.html',
            controller: 'LinkAddController'
        })
        .state('main.editLink', {//编辑友情链接
            url: '/editLink',
            templateUrl: './src/tpls/links/editLink.html',
            controller: 'LinkEditController'
        })
        /* ===========================================================系统===========================================================================*/
        .state('main.systemSet', {//系统设置
            url: '/systemSet',
            templateUrl: './src/tpls/systemSet/systemSet.html'
        })
});

```

附上我github的地址
   [https://github.com/qq83387856](https://github.com/qq83387856)
