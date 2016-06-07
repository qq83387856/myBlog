<!--
author: 小莫
date: 2016-06-07
title: gulp构建工具的使用
tags: gulp
category: gulp
status: publish
summary: 先前学习了webpack,但是总是感觉webpack略显复杂，并且现在很多公司gulp工作流用的比较多，因此就入gulp的坑来踩一踩，技多不压身，霍霍霍...。
-->


## 一、简介(增强和使你的工作程自动化)
1. 使用简单  
没有繁琐的配置，一个任务一个task。通过代码优于配置的策略，Gulp 让简单的任务简单，复杂的任务可管理。  
2. 高效  
利用node强大的工作流，快速的构建项目并减少频繁的 IO 操作。  
3. 高质量  
gulp生态圈有相当多优秀的插件以供我们使用，Gulp 严格的插件指南确保插件如你期望的那样简洁高质得工作。
4. 易学  
通过最少的 API，掌握 Gulp 毫不费力，构建工作尽在掌握：如同一系列流管道。

## 二、gulp相关api
1. gulp.src: 来源
2. gulp.dest: 目标
3. gulp.pipe: 管道
4. gulp.watch: 监视文件系统，文件改动时自动处理

```
  var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
```

5. gulp.task: 任务
5. gulp.task('default'): 默认任务,必须存在

## 三、使用(工作流程)  
1. 全局安装gulp   
`npm install -g gulp`  
2. 建立项目  
`mkdir gulp-test && cd gulp-test`
3. 初始化项目(会生成package.json)
`npm init -y`
4. 安装项目依赖
`npm install --save-dev gulp`
5. 创建配置文件
`touch gulpfile.js`
6. gulp常用的功能：转码（gulp-babel babel-preset-es2015 gulp-sass gulp-less gulp-react）、合并（gulp-concat）、压缩（gulp-uglify）、模块化（gulp-browserify）、测试（gulp-jasmine），请依次安装这些依赖。
7. 小常识，因为国外的网站比较慢 npm经常会卡住。我们可以设置镜像源或使用`cnpm`  
`npm config set registry https://registry.npm.taobao.org `
8. 写配置（gulpfile一定有一个default的任务，你可以把每个任务分文件书写然后再require进来，这种方式适合多人同时书写任务时，可以防止多人修改同一文件导致的冲突）

```
var gulp = require("gulp");
var babel = require("gulp-babel");
var react = require("gulp-react");
var sass = require("gulp-sass");
var less = require("gulp-less");
var uglify = require("gulp-uglify");
var jasmine = require("gulp-jasmine");
var concat = require("gulp-concat");

//定义常量
const transformJs = "transformJs";
const transformSass = "transformSass";
const transformLess = "transformLess";
const test = 'test';


//js
gulp.task(transformJs, function () {
    return gulp.src("src/*.js")
        .pipe(react())
        .pipe(babel(
            {
                presets: ["babel-preset-es2015"]
            }
        ))
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist"))
});

// scss
gulp.task(transformSass, function () {
    return gulp.src("src/css/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist"))
});


// less
gulp.task(transformLess, function () {
    return gulp.src("src/css/*.less")
        .pipe(less())
        .pipe(gulp.dest("./dist"))
});


// jasmine
gulp.task(test, function () {
    return gulp.src("./test/*.js")
        .pipe(jasmine())
});

gulp.task("default", [transformJs, transformSass, transformLess, test]);
```

# 四、配置文件解读

1. 第一部分的一堆`reqire`,是引用gulp相应的插件。在引用之前要确保己经安装。
2. 第二部分的几个`const`,是定义任务名常量，有多几任务就定义多少常量。
3. 第三部分的几个`task`,每个task对应一个任务，具有不同的功能。可以使用 `gulp xxx`来启动这个任务。
4. 第四部分的`default`,是执行`gulp`之后就会开始的任务 常用参数('default',[task1,task2,...],callback[可选])。

## 五、执行
1. 如果要执行`default`任务，直接gulp

```
  [09:56:04] Using gulpfile e:\oscchina\gulp-start-kit\gulpfile.js
  [09:56:04] Starting 'transformJs'...
  [09:56:04] Starting 'transformSass'...
  [09:56:04] Starting 'transformLess'...
  [09:56:04] Starting 'test'...
  .

  1 spec, 0 failures
  Finished in 0 seconds
  [09:56:04] Finished 'test' after 62 ms
  [09:56:06] Finished 'transformLess' after 2.66 s
  [09:56:06] Finished 'transformSass' after 2.68 s
  [09:56:06] Finished 'transformJs' after 2.7 s
  [09:56:06] Finished 'default' after 32 μs

  Process finished with exit code 0
```

2. 如果想要执行单个任务，请输入 `gulp taskName`,例如`gulp test`

```
  [09:56:47] Using gulpfile e:\oscchina\gulp-start-kit\gulpfile.js
  [09:56:47] Starting 'test'...
  .

  1 spec, 0 failures
  Finished in 0 seconds
  [09:56:47] Finished 'test' after 77 ms

  Process finished with exit code 0
```

## 六、gulp常见任务
### 1. 处理js（包括转码、合并、压缩）([gulp-babel](https://npm.taobao.org/package/gulp-babel) babel-preset-es2015 [gulp-concat](https://npm.taobao.org/package/gulp-concat) [gulp-uglify](https://npm.taobao.org/package/gulp-uglify))

```
gulp.task(transformJs, function () {
  return gulp.src("src/*.js")
      .pipe(react())
      .pipe(babel(
          {
              presets: ["babel-preset-es2015"]
          }
      ))
      .pipe(concat('bundle.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest("./dist"))
});
```

### 2. 处理scss(包括转码、合并、压缩)（[gulp-sass](https://npm.taobao.org/package/gulp-sass)  [gulp-concat](https://npm.taobao.org/package/gulp-concat) [gulp-uglify](https://npm.taobao.org/package/gulp-uglify))）

```
  // scss
  gulp.task(transformSass, function () {
      return gulp.src("src/css/*.scss")
          .pipe(sass())
          .pipe(gulp.dest("./dist"))
  });
```


### 3. 处理less(包括转码、合并、压缩)（[gulp-less](https://npm.taobao.org/package/gulp-less)  [gulp-concat](https://npm.taobao.org/package/gulp-concat) [gulp-uglify](https://npm.taobao.org/package/gulp-uglify))）

```
  // less
  gulp.task(transformLess, function () {
    return gulp.src("src/css/*.less")
        .pipe(less())
        .pipe(gulp.dest("./dist"))
  });
```

### 4. 测试([gulp-jasmine](https://npm.taobao.org/package/gulp-jasmine))

```
  // jasmine
  gulp.task(test, function () {
      return gulp.src("./test/*.js")
          .pipe(jasmine())
  });

  //测试文件 test.spec.js
  describe('test one', function () {
      it('test', function () {
          expect(true).toBe(true);
      })
  });
```

### 5. 清理([gulp-clean](https://npm.taobao.org/package/gulp-clean))

```
gulp.task('clean', function () {
  return gulp.src(config.dist + '/*', {read: false})
      .pipe(clean());
});
```

### 6. 热加载([gulp-util](https://npm.taobao.org/package/gulp-util) [gulp-watch](https://npm.taobao.org/package/gulp-watch))

```
  var util = require('gulp-util');
  var watch = require('gulp-watch');
  var config = {};
  config.dist = 'dist';
  config.static = [
    'bin/**/*',
    'package.json'
  ];
  // sync static resource in production mode
  gulp.task('static-sync', function () {
    return gulp.src(config.static, {base: './'})
        .pipe(gulp.dest(config.dist));
  });

  gulp.task('static-sync:dev', ['static-sync'], function () {
    util.log('[Sync] starting file watch');
    return watch(config.static, function (obj) {
      if (obj.event === 'change' || obj.event === 'add')
        return gulp.src(obj.path, {base: './'})
            .pipe(gulp.dest(config.dist))
            .pipe(print(function () {
              return '[Sync] file sync success: ' + obj.path.replace(obj.base, '');
            }));
      else if (obj.event === 'unlink') {
        var distFilePath = obj.path.replace(__dirname, __dirname + '/' + config.dist);
        return gulp.src(distFilePath)
            .pipe(clean())
            .pipe(print(function () {
              return '[Sync] file remove success: ' + obj.path.replace(obj.base, '');
            }));
      }
    });
  });

```

### 7. debug([gulp-print](https://npm.taobao.org/package/gulp-print):处理了哪些文件都会打印出来)

```
//下载
npm install gulp-print
//引用
var gulp = require('gulp');
var print = require('gulp-print');
// 注册任务
gulp.task('print', function() {
  gulp.src('test/*.js')
    .pipe(print())
});
```

### 8. sourceMap([gulp-sourcemaps](https://npm.taobao.org/package/gulp-sourcemaps))

```
  var sourcemaps = require('gulp-sourcemaps');
  // compile server script in production mode
  gulp.task('compile:server', function () {
    if (config.babel.sourceMaps){
      return gulp.src('**/*.es6', {base: './'})
          .pipe(sourcemaps.init())
          .pipe(babel(config.babel))
          .pipe(sourcemaps.write('.', {sourceRoot: '/ustar'}))
          .pipe(gulp.dest(config.dist));
    }else{
      return gulp.src('**/*.es6', {base: './'})
          .pipe(babel({
            preset:'babel-preset-es2015'
            }))
          .pipe(gulp.dest('./dist'));
  });
```

### 9. 复制静态资源

```
gulp.task('static-sync', function () {
    return gulp.src('src/css/*', {base: './'})
        .pipe(gulp.dest('./dist'));
});
```

### 10. 处理css雪碧图([gulp-css-spriter](https://npm.taobao.org/package/gulp-css-spriter))

```
  var gulp = require('gulp');
  var spriter = require('gulp-css-spriter');

  gulp.task('css', function() {
    return gulp.src('./src/css/styles.css')
        .pipe(spriter({
            // The path and file name of where we will save the sprite sheet
            'spriteSheet': './dist/images/spritesheet.png',
            // Because we don't know where you will end up saving the CSS file at this point in the pipe,
            // we need a litle help identifying where it will be.
            'pathToSpriteSheetFromCSS': '../images/spritesheet.png'
        }))
        .pipe(gulp.dest('./dist/css'));
  });
```

## 七、网上配置文件参考
[gulp-webpack-demo](https://github.com/fwon/gulp-webpack-demo/blob/master/gulpfile.js)
