<!--
author: 小莫
date: 2016-05-24
title: nodejs框架koa学习
tags: nodejs
category: koa
status: publish
summary: Koa 是一个类似于 Express 的Web开发框架，创始人也都是TJ。Koa 的主要特点是，使用了 ES6 的 Generator 函数，进行了架构的重新设计。Koa 的原理和内部结构很像 Express，但是语法和内部结构进行了升级。
-->

## 一、国际惯例 hello world##    
当前版本1.2    
`cnpm install --save koa`   

代码撸起来   

```
  let koa = require('koa');
  let app = koa();
  app.use(function*(){
      this.body = "hello xiaomo";
    });
  app.listen(8080);
```

如此这般我们就创建了一个简单的http服务器。这段程序的作用是监听 8080 端口，当收到 GET 请求的时候，答复 hello xiaomo   
你应该注意到了，我没有只用 var 关键词。我使用了 let 代替。在 ES6 中这基本上就是新的 var。这改变了变量的作用域，但是我不想在这里多说。  

另一件事情有些奇怪，就是我们使用关键词 function*。这个星号表示这个函数是一个生成器函数。这意味着这个函数可以在运行的时候跳出然后再跳回来。这个概念很难去表述，所以我给你举个栗子。

```
  function* inc () {
   let number = 0
   while (true)
   yield number++
  }

  let test = inc()

  console.log(test.next().value) // -> 0
  console.log(test.next().value) // -> 1
  console.log(test.next().value) // -> 2
```

我分解一下这个程序：

inc 函数定义了一个生成器函数，在每一次 while 循环中，产出 number 变量然后 number 变量加 1
inc 函数被指派给了变量 test
inc 函数被迭代了 3 次，第一次的时候，number 变量在函数中被初始化了。然后，这个函数进入到了一个 while 循环，在之后的迭代中这个循环也不会退出。然后 number 0 被产出，所以这个可以用 .value 方法接收。在后来的迭代中这个变量 number 自增了两次。
我希望这可以帮助理解一点生成器的工作原理。这只是非常复杂的 ES6 中的一小部分。

但是无论如何，让我们回到 koa。koa 非常简单，甚至不包含一个路由。你需要在中间件生成器函数中手动做路由匹配：

```
  let koa = require('koa')

  let app = koa()

  // normal route
  app.use(function* (next) {
  if (this.path !== '/') {
  return yield next
  }

  this.body = 'hello world'
  });

  // /404 route
  app.use(function* (next) {
  if (this.path !== '/404') {
  return yield next;
  }

  this.body = 'page not found'
  });

  // /500 route
  app.use(function* (next) {
  if (this.path !== '/500') {
  return yield next;
  }

  this.body = 'internal server error'
  });

  app.listen(8080)
```

你可以看到，我们只要用 if 就可以做路由匹配了。你是不是很疑惑在这个上下文中的 this 是什么，express 中的 req 和 res 去哪里了。其实 this 绑定了大部分的 req 和 res 的函数和属性。如果你想知道更多关于 this 的详情，[请点这里](http://koajs.com/#context)。

让我们写一个将请求中的内容大写的中间件：

```
  let koa = require('koa')

  let app = koa()

  app.use(upcaser())

  function upcaser () {
  return function* (next) {
  yield next
  this.body = this.body.toUpperCase()
  }
  }

  app.listen(8080)
```


## 我的github地址
[https://github.com/qq83387856](https://github.com/qq83387856)

## 原文地址
[在koa中使用mongoose操作mongodb数据库](http://blog.xiaomo.info/blog/5/2016%25E5%25B9%25B45%25E6%259C%258824-nodejs%25E6%25A1%2586%25E6%259E%25B6koa%25E5%25AD%25A6%25E4%25B9%25A0.html)
