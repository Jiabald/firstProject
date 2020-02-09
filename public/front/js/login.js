$(function() {

    $('#loginBtn').click(function() {
        let username = $('#username').val();
        let password = $('#password').val();

        if (username.trim().length === 0) {
            mui.toast('输入密码');
            return;
        }
        if (password.trim().length === 0) {
            mui.toast('输入密码');
            return;
        }
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password,
            },
            dataType: 'json',
            success: function(info) {
                console.log(info);
                if (info.error) {
                    mui.toast('用户名或密码错误');
                } else {
                    //默认跳转个人中心
                    location.href = 'user.html';
                }
            }
        })
    })
})