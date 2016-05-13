<!--
author: 小莫
date: 2016-05-11
title: 使用angularjs的$http异步删除数据
tags: angularjs
category: angularjs增删改查
status: publish
summary: 因为我在使用angularjs做异步删除数据的时候遇到了一些问题，所以把这些问题记录下面供大家参考，也加深自己的印象。
-->
#### 有人会说删除这东西有什么可讲的，写个删除的service，controller调用一下不就完了。
嗯...看起来是这样，但是具体实现起来真的有这么简单吗？首先有以下几个坑
* 怎么确定数据是否删除成功？
* 怎么同步视图的数据库的内容？

# 1.思路
####1.实现方式一
删除数据库中对应的内容,然后将$scope中的对应的内容splice
####2.实现方式二
删除数据库中对应的内容，然后再reload一下数据(也就是再调用一次查询方法，这种消耗可想而知，并且还要保证先删除数据再查询)

#2.具体实现方式
>删除数据的service：用异步，返回promise
```
service('deleteBlogService',//删除博客
        ['$rootScope',
            '$http',
            '$q',
            function ($rootScope, $http, $q) {
                var result = {};
                result.operate = function (blogId) {
                    var deferred = $q.defer();
                    $http({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        url: $rootScope.$baseUrl + "/admin/blog/deleteBlogById",
                        method: 'GET',
                        dataType: 'json',
                        params: {
                            id: blogId
                        }
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log("删除成功！");
                        })
                        .error(function () {
                            deferred.reject();
                            alert("删除失败！")
                        });
                    return deferred.promise;
                };
                return result;
            }])
```
controller里面注意事项
>要特别注意执行顺序：确保己经删除完成之后再去reload数据，不然会出来视图不更新

```
                /**
                 * 删除博客
                 */
                $scope.deleteBlog = function (blogId) {
                    var deletePromise = deleteBlogService.operate(blogId);
                    deletePromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = getBlogListService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.blogs = data.blogs;
                                $scope.pageCount = $scope.blogs.totalPages;
                            });
                        }
                    });
                };
```
