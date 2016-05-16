<!--
author: 小莫
date: 2016-05-18
title: webpack相关命令参数
tags: webpack
category: webpack
status: publish
summary: 使用webpack的同学，你真的熟练应用webpack么？
-->

##一、基础参数##

```
webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包
webpack --watch   //监听变动并自动打包
webpack 执行一次开发时的编译
webpack -p 执行一次生成环境的编译（压缩）
webpack --watch 在开发时持续监控增量编译（很快）
webpack -d 让他生成SourceMaps
webpack --progress 显示编译进度
webpack --colors 显示静态资源的颜色
webpack --sort-modules-by, --sort-chunks-by, --sort-assets-by 将modules/chunks/assets进行列表排序
webpack --display-chunks 展示编译后的分块
webpack --display-reasons 显示更多引用模块原因
webapck --display-error-details 显示更多报错信息
```

## 二、使用babel##  
`npm install babel-loader babel-core babel-preset-es2015 --save-dev`   
创建babel的配置文件.babelrc 内容如下：

```{
  "presets": ["es2015"]
}
修改webpack.config.js文件，指定loader处理js文件

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,     
    filename: 'bundle.js'
  },
  module: {     
    loaders: [
      {test: /\.js$/, loader: 'babel'},
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
};
```

>内容摘自 [Web开发笔记](https://www.magentonotes.com/)
