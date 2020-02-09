$(function() {
    //1-动态渲染一级分类
    //2-渲染一级分类对应的二级分类
    //3-点击一级分类 高亮 切换对应的二级分类

    //1-动态渲染一级分类
    $.ajax({
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function(info) {
            console.log(info);
            $('.nav-list').html(template('tmp-one', info));
            //默认加载第一个导航分类
            let id = $('.nav-list li:first-child a').data('id');
            renderSecond(id);
        }
    });

    //2-封装根据一级分类id渲染对应二级分类

    function renderSecond(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(info) {
                // console.log(info);
                $('.content-list').html(template('tmp-two', info));
            }
        })
    };

    // renderSecond(1); 不合理

    $('.nav-list').on('click', 'a', function() {
        //排他
        $(this).parent().addClass('current').siblings().removeClass('current');
        //渲染当前一级分类对应二级分类
        let id = $(this).data('id');
        renderSecond(id);
    })
})