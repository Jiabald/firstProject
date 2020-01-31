/*
基本使用
开始
NProgress.start();
结束
setTimeout(function() {
    NProgress.done();
}, 1000);*/
/*
    页面ajax请求开始是， 进度条出现
    页面ajax请求结束是， 进度条完成

    $.ajax({
        url:'./01.php',
        data:{},
        beforeSend:function(){},
        success:function(){},
        error:function(){},
        complete:function(){}
    })

    全局ajax事件,这些事件绑定页面后，页面任何一个ajax请求发送，只要满足条件就会触发
    ajaxSend() 当页面中有ajax发送时会触发
    ajaxSuccess() 当页面中有ajax成功响应后会触发
    ajaxComplete() 当页面中有ajax完成时会触发
    ajaxError() 当页面中有ajax出错时会触发
    ajaxStart() 当页面中第一个ajax请求发送时会触发
    ajaxStop() 当页面中最后一个ajax请求完成时会触发
*/

//进度条禁止显示小圆圈
NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function() {
    //console.log('第一个请求结束了');
    NProgress.start();
});
$(document).ajaxStop(function() {
    //console.log('最后一个请求结束了');
    NProgress.done();
});