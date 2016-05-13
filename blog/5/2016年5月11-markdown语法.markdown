<!--
author: 小莫
date: 2016-05-11
title: markdown语法
tags: markdown
category: markdown
status: publish
summary: markdown的一些基本语法，大致够用了
-->

# 1.标题(h标签)
h1-h6对应1-6个#

# 2.列表(li>li)
#### 无序列表
* 1
* 2
* 3

#### 有序列表
1. 1
2. 2
3. 3

# 3.引用(blockquote)
>这个是引用的内容

# 4.图片与链接
#### 图片:名字、url
![小莫](http://mouapp.com/Mou_128.png)
#### 链接
[小莫的主页](http://www.xiaomo.info)

# 5.粗体与斜体
#### 说明：用两个 * 包含一段文本就是粗体的语法，用一个 * 包含一段文本就是斜体的语法。
**这里是粗体**

*这里是斜体*

# 6.表格
###### 说明：冒号控制居中样式 连续三根短横线表格
| Tables        | Are           | Cool  |
| :-----------: |:--------:  | :---:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

# 7.代码框（一个tab即可,如果没效果用3个飘号[esc下面那个]）

    function Hello(){
            console.log("hello");
        }


# 8.分割线(hr)  
三个或三个以上的星号、减号或者下划线

# 9.换行、分段  
行末加两个或以上个空格
分段：两个回车

#10. 带url的目录
[1. 安装][1]  
[2. 目录结构][2]  
[3. 配置说明][3]  
[4. 编写博客][4]  

[1]:http://gitblogdoc.sinaapp.com/blog/gitblog/install.html
[2]:http://gitblogdoc.sinaapp.com/blog/gitblog/struct.html
[3]:http://gitblogdoc.sinaapp.com/blog/gitblog/config.html
[4]:http://gitblogdoc.sinaapp.com/blog/gitblog/edit.html
