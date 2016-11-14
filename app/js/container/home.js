/**
 * Created by Administrator on 2015/6/23.
 */


/*首页*/
require( ['config'], function() {
    require(['nav'], function(nav){
        nav.init();
        $('.navbar-brand').text('我是首页');
    });

});