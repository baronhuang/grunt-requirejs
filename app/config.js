
/*配置requirejs*/
(function(){
    requirejs.config({
        baseUrl: '',
        paths: {
            /*第三方插件库*/
            'jquery': 'lib/jquery/dist/jquery.min',
            'text' : 'lib/requirejs-text/text',
            'bootstrap': 'lib/bootstrap/dist/js/bootstrap.min',


            /*自定义模块*/
            'jquery.custom': 'js/common/jquery.custom',
            'leftNav': 'js/common/leftNav',

            'templatePath': 'text' /*模板路径*/



        },
        shim: {
            'bootstrap': {
                deps: ['jquery'],
                exports: 'bootstrap'
            },


        }
    });

    /*重要：首先加载所有的依赖，为了后续js压缩合并做准备*/
    require([
        "jquery",
        "text",
        "bootstrap"
    ]);

})();
