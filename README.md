# grunt-requirejs
grunt+requirejs的老旧项目的模板，主要用于requirejs构建多页面项目。<br/>
页面通过引入`config.js`来配置requriejs的依赖的库，然后每个页面各自的业务代码通过另外的js来引入，这样做是为了模块化开发。
开发的时候，会看到加载很多个js文件，当部署的时候，只看到两个js文件，一个是`config.js`，它会把其他依赖的库都打包成一个js文件；另外一个js是
当前页面的业务，它不会打包到config.js里面的。

****

