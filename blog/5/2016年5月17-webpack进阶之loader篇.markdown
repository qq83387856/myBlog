<!--
author: 小莫
date: 2016-05-17
title: webpack进阶之loader篇
tags: webpack
category: webpack处理器
status: publish
summary: webpack的loaders是一大特色，也是很重要的一部分。这遍博客我将分类讲解一些常用的laoder
-->

##一、loaders之 预处理##
* css-loader
* style-loader
* sass-loader
* less-loader
* postcss-loader

`cnpm install --save -dev css-loader style-loader sass-loader less-loader postcss-loader`  

栗子:

```
module: {
  loaders: [
    {test: /\.css$/, loader: "style!css?sourceMap!postcss"},
    {test: /\.less$/, loader: "style!css!less|postcss"},
    {test: /\.scss$/, loader: "style!css!sass|postcss"}
  ]
}
```

##二、loaders之 js处理##
* babel-loader
* jsx-loader

`cnpm install --save-dev babel-core
babel-preset-es2015  babel-loader jsx-loader`

栗子  

新建一个名字.babelrc的文件

```
{
  "presets": ["es2015"]
}
```

//webpack.config.js
```
module: {
  loaders: [
    {test: /\.js$/, loader: "babel", exclude: /node_modules/},
    {test: /\.jsx$/, loader: "jsx-loader"}
  ]
}
```

##三、loaders之 图片处理##
* url-loader

`cnpm install --save-dev url-loadr`

```
module: {
  loaders: [
    {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
  ]
}
```

##四、loaders之文件处理##
* file-loader

`cnpm install --save-dev file-loader`

```
module: {
  loaders: [
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
      },
  ]
}

```

##五、loaders之json处理##
* json-loader

`cnpm install --save-dev json-loader`

```
module: {
  loaders: [
    {test: /\.json$/,loader: 'json'},
  ]
}
```

##六、loaders之html处理##
* raw-loader

`cnpm install --save-dev raw-loader`

```
module: {
  loaders: [
    { test: /\.html$/,loader: 'raw'},
  ]
}
```
