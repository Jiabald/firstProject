$(function() {
    //1-搜索内容关键字
    let key = getData('key')
        // console.log(key);
        // 2-把关键字放入输入框中
    $('.search_input').val(key);
    // 根据关键字请求对应的商品

    //3-1 保存参数
    let obj = {
        proName: key,
        page: 1,
        pageSize: 100
    };

    function render() {
        $.ajax({
            url: '/product/queryProduct',
            data: obj,
            dataType: 'json',
            beforeSend: function() {
                $('.lt_product').html('<div class="loading"></div>');
            },
            success: function(info) {
                console.log(info);
                // setTimeout(function() {
                $('.lt_product').html(template('tmp', info))
                    // }, 500)
            }
        })
    };
    render() //渲染

    //4-点击价格 根据按钮方向进行排序
    $('.price').click(function() {
        //如果洋浦current就切换i标签箭头方向
        if ($(this).hasClass('current')) {
            $(this).find('i').toggleClass('fa-angle-up fa-angle-down');
        }

        $(this).addClass('current'); //添加current类名
        //判断升序还是降序
        let price = $(this).find('i').hasClass('fa-angle-up') ? 1 : 2;

        obj.price = price;
        render();
    });

    //5-点击搜索按钮 获取输入的值
    //1-根据搜索框值添加到历史记录中
    //2-根据输入框值 获取相对应的商品
    $('.search_btn').click(function() {
        //获取输入框值
        let txt = $('.search_input').val();
        //把输入框值存储到历史记录中
        setSearch(txt);
        //修改搜索关键字
        obj.proName = txt;
        //渲染
        render();
    })
})