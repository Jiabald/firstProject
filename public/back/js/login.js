$(function() {
    //1-表单验证
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        //2.指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3.对表单进行验证 fields 字段 对那些字段进行验证
        fields: {
            //表单name属性
            username: {
                //验证规则
                validators: {
                    //非空
                    notEmpty: {
                        message: '用户名不能为空!'
                    },
                    //限制长度
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '长度应为2-6位!'
                    },
                    //拓展错误信息
                    callback: {
                        message: '用户不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空!'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '长度应为6-18位!'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    });

    //2-表单重置
    //$('#form').data('bootstrapValidator')获取表单校验实例, 通过实例可以调用插件方法
    //reaet 按钮的默认行为是重置表单数据
    //resetForm 用于重置表单样式
    $('.btn-reset').click(function() {
        //重置表单全部样式
        $('#form').data('bootstrapValidator').resetForm();
    });

    //3-表单校验通过后，发送ajax请求进行登录，要组织表单默认行为
    //当点击提交按钮是，插件会进行验证，如果验证通过触发表单自身 success.form.bv事件
    $('#form').on('success.form.bv', function(e) {
        //阻止默认行为
        e.preventDefault();
        //把表单数据发送给后端进行判断
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function(info) {
                // console.log(info);
                if (info.error) {
                    //失败
                    if (info.error == 1000) {
                        //用户名错误
                        $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    }
                    if (IIRFilterNode.error == 1001) {
                        //密码错误
                        $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }
                } else {
                    //成功
                    //跳转首页
                    location.href = './index.html';
                }
            }
        })
    })
})