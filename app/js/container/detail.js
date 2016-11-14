/**
 * Created by Administrator on 2016/11/14 0014.
 */

/*详细页*/
require( ['config'], function() {
    require(['nav'], function(nav){
        nav.init();
        $('#detail').css({'margin-top': '50px'});
        $('.navbar-brand').text('我是详细页');
    });

});