$(function() {
    //1-模仿一些搜索记录到local storage
    //2-动态渲染历史记录
    //3-清空历史记录
    //指定清楚历史记录

    //1-模仿一些搜索记录到local storage
    let search = ['大炮', '跑鞋', '泡泡'];
    //存储到localStorage中
    localStorage.setItem('search', JSON.stringify(search));

    //2-动态渲染历史记录
    function render() {
        //1-获取数据
        let str = localStorage.getItem('search') || '[]';
        let arr = JSON.parse(str);
        console.log(arr);
        //渲染
        $('.search-content').html(template('tmp', { list: arr }))
    };

    render();
    //3-清空历史记录
    //mui.confirm('提示信息','标题','[按钮的值]',callback)
    $('.search-content').on('click', '.clear', function() {
        mui.confirm('确定要删除历史记录吗?', '清空历史', ['否', '是'], function(data) {
            console.log(data);
            //false 0 true 1
            if (data.index == 1) {
                //data.inde 按钮的索引值
                localStorage.removeItem('search');
                //重新渲染页面
                render();
            }
        })
    });


    /*
        事件委托 事件只绑定一次 
    */
    //4-删除指定记录
    //1-点击删除按钮 弹出对话框 获取当前数据id
    //2-把搜索历史获取出来转成数组
    //3-从数组进行删除
    //4-完成删除后 在转出json 存回localstroage中
    //5-重新渲染
    $('.search-content').on('click', '.del', function() {
        // console.log($(this));
        let that = this;
        mui.confirm('确定要删除这条记录吗?', '清除记录', ['否', '是'], function(data) {
            if (data.index == 1) {
                //进行删除
                let id = $(that).data('id');
                // alert(id);
                //获取全部历史记录
                let arr = JSON.parse(localStorage.getItem('search'));
                //从数组删除
                //arr.splice(从哪删，删几个，替换项)
                arr.splice(id, 1);
                //存储到localStorage中
                localStorage.setItem('search', JSON.stringify(arr));
                //重新渲染
                render();
            }
        })
    });

    //5-添加搜索记录
    //1-点击按钮，获取输入框值 值不能为空
    //2-把搜索记录添加到localStorage中
    //3-注意点
    //1-长度不能大于八
    //2-不能重复

    $('.search-btn').click(function() {
        let txt = $('.search-text').val();
        $('.search-text').val(''); //清空输入框

        setSearch(txt);
        //重新渲染
        render();

        location.href = "searchList.html?key=" + txt;
    })
})