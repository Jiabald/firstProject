$(function() {
    let currentPage = 1;
    let pageSize = 5;
    //保存图片地址
    let picArr = [];

    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(info) {
                console.log(info);
                $('tbody').html(template('tmp', info))
                setPage(info.total)
            }
        })
    };

    render();

    //2-分页
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

    //3-渲染列表
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        data: {
            page: currentPage,
            pageSize: 100
        },
        dataType: 'json',
        success: function(info) {
            console.log(info);
            $('.brand-list').html(template('tmp-list', info))
        }
    });

    //4-点击二级分类下拉列表，把选择品牌文字赋值给按钮 用隐藏域保持数据id
    $('.brand-list').on('click', 'a', function() {
        //把当前a标签文字 赋值给按钮
        $('.title-text').text($(this).text());
        //隐藏域保存数据id
        $('[name="brandId"]').val($(this).data('id'));

        //选择二级分类之后手动改变状态
        $("#form1").data('bootstrapValidator').updateStatus('brandId', 'VALID');
    });

    //5-上传图片
    $("#file").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        //数组方法
        //push() 追加 pop() 删除最后一个元素
        //unshift() 向最前面添加 shift() 删除第一个元素
        done: function(e, data) {
            // console.log(data);
            // 把最新上传的图片 添加到数组的前面
            picArr.unshift(data.result);
            // //显示当前的图片 向盒子前面添加
            $('.pic-box').prepend('<img src="' + data.result.picAddr + '" height="100">');

            // //图片大于三张
            if (picArr.length > 3) {
                //删除最后一个元素
                picArr.pop();

                // 图片容器删除最后一个图片
                $('.pic-box  img:last-child').remove();
            }
            // console.log(picArr);
            if (picArr.length == 3) {
                //选择二级分类之后手动改变状态
                $("#form1").data('bootstrapValidator').updateStatus('picStatus', 'VALID');
            }
        }
    });

    // 6-校验表单
    $("#form1").bootstrapValidator({

        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3-校验字段
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '库存必须为非零数字开头'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入尺码范围'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d{1}-[1-9]\d{1}$/,
                        message: '尺码格式必须为xx-xx'
                    }
                },
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入旧价格'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d+$/,
                        message: '必须输入数字'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入价格'
                    }
                },
                //正则校验
                regexp: {
                    regexp: /^\d+$/g,
                    message: '必须输入数字'
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请选择三张图片'
                    }
                }
            }
        }
    });

    //7-表单验证通过后 向后台发送Ajax请求 添加商品数据
    $('#form1').on('success.form.bv', function(e) {
        e.preventDefault(); //阻止默认行为
        //处理数据
        let str = $('#form1').serialize();
        //把数组中三张图片的数据转化成json字符串 拼接在查询字符串后面
        str += '&' + 'picArr=' + JSON.stringify(picArr);

        console.log(str);
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: str,
            dataType: 'json',
            success: function(info) {
                console.log(info);
                //添加成功后
                //1-隐藏模态框
                $('.modal-add').modal('hide');
                //2-重新渲染第一页
                currentPage = 1;
                render();
                //3-表单重置样式 和数据
                $("#form1").data('bootstrapValidator').resetForm(true);
                //手动重置 图片列表 和下拉列表
                $('.pic-box').empty(); //清空盒子内部
                $('.title-text').text('请选择二级分类');
                //5-重置数组
                picArr = []; //避免影响下次判断
            }
        })
    })
})