# grunt-requirejs
grunt+requirejs的老旧项目的模板，主要用于requirejs构建多页面项目。<br/>
页面通过引入`config.js`来配置requriejs的依赖的库，然后每个页面各自的业务代码通过另外的js来引入，这样做是为了模块化开发。
开发的时候，会看到加载很多个js文件，当部署的时候，只看到两个js文件，一个是`config.js`，它会把其他依赖的库都打包成一个js文件；另外一个js是
当前页面的业务，它不会打包到config.js里面的，按需加载。

****

* 列表1
* 列表2
    * 子列表1
    * 子列表2
        * 孙列表1

______________
        
#一级标题
##二级标题
###三级标题
####四级标题
#####五级标题
######六级标题

```
我是单独一行文本的
哈哈
哈哈
哈哈
```

|语法|效果|
|---|----|
|`*斜体1*`|*斜体1*|
|`_斜体2_`|_斜体2_|
|`**粗体1**`|**粗体1**|
|`__粗体2__`|__粗体2__|
|`~~删除线~~`|~~删除线~~|
|`~~**删除线**~~`|~~**删除线**~~|
        

图片
------
![甜心是你][abc]

链接
---

[甜心是你][abc]

[![](http://service.ixingtu.com/ixtres/Advertisement/0bcebfecc18844778381e772433cba6f_shortPic.png '甜心是你')](http://service.ixingtu.com/ixtres/Advertisement/0bcebfecc18844778381e772433cba6f_shortPic.png "甜心是你")

[abc]:http://service.ixingtu.com/ixtres/Advertisement/0bcebfecc18844778381e772433cba6f_shortPic.png "甜心是你"

- [x] 选择
- [x] 选择
- [x] 选择
- [ ] 不选择
- [ ] 不选择
- [ ] 不选择

>Tips:
>>我是一条Tips

代码高亮
----
```
我是一段javascript代码
document.getElementById("myH1").innerHTML="Welcome to my Homepage"; //javascipt
```






















