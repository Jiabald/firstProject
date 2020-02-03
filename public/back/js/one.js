$(function() {

    let currentPage = 1;
    let pageSize = 5;

    //1-数据渲染
    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(info) {
                // console.log(info);
                $('tbody').html(template('tmp', info));
                //生成分页标签
                setPage(info.total);
            }
        })
    }

    render();

    //2-分页功能
    function setPage(total) {
        $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentPage, //当前页
            totalPages: Math.ceil(total / pageSize), //总页数
            size: "small", //设置控件的大小，mini, small, normal,large
            onPageClicked: function(event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                currentPage = page;
                //重新渲染
                render();
            }

        });
    };

    //表单校验
    $('#form1').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在3到6之间'
                    },
                }
            },
        }

    });

    //4-当点击添加按钮时 对数据进行添加 重新渲染表单
    $('.btn-add').click(function(e) {
        //阻止表单默认行为
        e.preventDefault();

        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('#form1').serialize(),
            dataType: 'json',
            success: function(info) {
                console.log(info);
                //重新到第一页 重新渲染第一页
                currentPage = 1;
                render();
                //隐藏模态框
                $('.modal-add').modal('hide');
                //重置表单
                //resetForm(); 默认只重置相关样式 如果要重置数据设置参数为true
                $('#form1').data('bootstrapValidator').resetForm(true);
            }
        })
    })
})