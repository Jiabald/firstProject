$(function() {
    //第一页
    let currentPage = 1;
    let pageSize = 5;

    //记录当前操作用户状态
    let currentId = null;
    let isDelete = null;
    //1-获取用户数据进行渲染
    function render() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(info) {
                console.log(info);
                //渲染
                $('tbody').html(template('tmp', info))

                //分页功能
                setPage(info.total)
            }
        })
    };

    //第一页数据渲染完成
    render();

    //2-分页功能
    function setPage(total) {
        $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentPage, //当前页
            totalPages: Math.ceil(total / pageSize), //总页数
            //size: "small", //设置控件的大小，mini, small, normal,large
            onPageClicked: function(event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                // console.log(page); 当前页码值
                //重新赋值当前页码
                currentPage = page;
                //渲染当前页
                render();
            }
        })
    }

    //3-点击禁用启用按钮，获取当前id， 记录要进行的操作（根据按钮颜色）
    $('tbody').on('click', '.button', function() {
        // currentId = $(this).parent().data('id');
        //dataset.id data-id 用$('div').data('id');
        currentId = $(this).parent().data('id');
        isDelete = $(this).hasClass('btn-success') ? 1 : 0; //1启用 0禁用

        console.log(currentId);
        console.log(isDelete);
    });

    //4-点击确定按钮发送请求
    $('.btn-ok').click(function() {
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: 'json',
            success: function(info) {
                // console.log(info);
                //重新渲染当前页
                render();
                //显示 .modal('show');
                $('.modal-user').modal('hide');
            }
        });
    });
})