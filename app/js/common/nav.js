/**
 * Created by Administrator on 2016/11/14 0014.
 */

/*nav组件*/
define(function(require, exports, module) {
    var $ = require('jquery');
    var leftNav = require('text!templatePath/nav.html');

    /**
     * 初始化
     * element: 传入需要插入到哪个元素，默认body
     * */
    var init = function(body){
        var body = body || 'body';
        $(body).append(leftNav);
        console.log('nav init');

    }

    return {
        element: leftNav,
        init: init
    };
});