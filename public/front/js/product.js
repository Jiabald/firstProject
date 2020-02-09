$(function() {
    //获取要展示商品id
    let productId = getData('productId');
    // console.log(productId);
    $.ajax({
        url: '/product/queryProductDetail',
        data: { id: productId },
        dataType: "json",
        success: function(info) {
            console.log(info);
            $('.mui-scroll').html(template('tmp', info));

            // 轮播 动态生成
            //获得slider插件对象
            let gallery = mui('.mui-slider');
            gallery.slider({
                interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            //输入框 动态生成
            mui('.mui-numbox').numbox()
        }
    });

    //2-选择尺码
    $('.mui-scroll').on('click', '.lt_size span', function() {
        $(this).addClass('current').siblings().removeClass('current');
    });

    //3-点击购物车
    $('#addCart').click(function() {
        let size = $('.lt_size .current').text();
        let num = mui('.mui-numbox').numbox().getValue();
        // console.log(size, num);
        if (!size) {
            mui.toast('请选择尺码');
            return; //到此结束
        }

        //把商品加入到购物车
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                size: size,
                num: num,
                productId: productId
            },
            dataType: 'json',
            success: function(info) {
                console.log(info);
                //失败 去登陆页
                //成功 弹框 去购物车 还是继续浏览
                if (info.error) {
                    location.href = 'login.html';
                } else {
                    mui.confirm('添加成功', '温馨提示', ['去购物车', '继续看看'], function() {
                        if (data.index === 0) {
                            //去购物车
                            location.href = 'cart.html';
                        }
                    })
                }
            }
        })
    })
})