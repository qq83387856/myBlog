<!--
author: 小莫
date: 2016-06-02
title: package.json常用script
tags: npm
category: npm
status: publish
summary: 好的script能够大大减少我们对命令行的操作，直接使用npm run xxx 就可以执行。
-->

## 一、git相关

```
"查看":"-------------------------",
"branch": "git branch -a",
"tag": "git tag",
"标签":"-------------------------",
"createtag": "git tag -a 0.1.2 -m Release^-^",
"pushtag": "npm run createtag && git push origin --tags",
"delbranch": "git push origin --delete",
"推送":"-------------------------",
"fetch":"git fetch -p",
"push":"git push origin master",
"commit":"git commit -a ",
"checkout":"git checkout",
"删除":"-------------------------",
"deltag": "git push origin --delete tag",
"delbranck": "git branch -d",
"delbranchall": "git branch -D",
"重命名":" param1 原 param2 新----",
"renamebranch": "git branch -m",
```

## 二、webpack相关

```
  // cnpm install rimraf
  "clean": "rimraf dist",
  "build": "npm run clean && webpack --progress --colors --profile",
  "start": "webpack-dev-server --progress --colors --profile",
  "test": "karma start",
  "test-watch": "karma start --auto-watch --no-single-run"
```

## 三、 angular2 相关

```
"tslint": "tslint",
"typedoc": "typedoc",
"typings": "typings",
"webpack": "webpack",
"webpack-dev-server": "webpack-dev-server",
"webdriver-manager": "webdriver-manager",
"protractor": "protractor",

"clean": "npm cache clean && npm run rimraf -- node_modules doc typings coverage dist",
"clean:dist": "npm run rimraf -- dist",
"preclean:install": "npm run clean",
"clean:install": "npm set progress=false && npm install",
"preclean:start": "npm run clean",
"clean:start": "npm start",

"watch": "npm run watch:dev",
"watch:dev": "npm run build:dev -- --watch",
"watch:dev:hmr": "npm run watch:dev -- --hot",
"watch:test": "npm run test -- --auto-watch --no-single-run",
"watch:prod": "npm run build:prod -- --watch",

"build": "npm run build:dev",
"prebuild:dev": "npm run clean:dist",
"build:dev": "webpack --config config/webpack.dev.js --progress --profile --colors --display-error-details --display-cached",
"prebuild:prod": "npm run clean:dist",
"build:prod": "webpack --config config/webpack.prod.js  --progress --profile --colors --display-error-details --display-cached --bail",

"server": "npm run server:dev",
"server:dev": "webpack-dev-server --config config/webpack.dev.js --inline --progress --profile --colors --watch --display-error-details --display-cached --content-base src/",
"server:dev:hmr": "npm run server:dev -- --hot",
"server:prod": "http-server dist --cors",

"webdriver:update": "npm run webdriver-manager update",
"webdriver:start": "npm run webdriver-manager start",

"lint": "npm run tslint 'src/**/*.ts'",

"pree2e": "npm run webdriver:update -- --standalone",
"e2e": "npm run protractor",
"e2e:live": "npm run e2e -- --elementExplorer",

"test": "node --max-old-space-size=4096 node_modules/karma/bin/karma start",

"ci": "npm run e2e && npm run test",

"docs": "npm run typedoc -- --options typedoc.json --exclude '**/*.spec.ts' ./src/",

"start": "npm run server:dev",
"start:hmr": "npm run server:dev:hmr",

"postinstall": "npm run typings -- install",

"preversion": "npm test",
"version": "npm run build",
"postversion": "git push && git push --tags"
```
