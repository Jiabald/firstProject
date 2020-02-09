// 滚动区域
mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
// 轮播
//获得slider插件对象
let gallery = mui('.mui-slider');
gallery.slider({
    interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
});

function getData(name) {
    let str = decodeURI(location.search);
    str = str.substr(1); //去掉？ substr(起始索引，截取长度)
    let arr = str.split('&');
    let obj = {}; //把数据存储到对象中
    arr.forEach(function(v, i) {
        let key = v.split('=')[0];
        let value = v.split('=')[1];
        obj[key] = value; //把数据存储到对象中
    });

    console.log(obj);
    return obj[name];
};

function setSearch(txt) {
    //判断值是否为空
    if (txt.trim().length === 0) {
        mui.toast('搜索不能为空');
        return;
    }

    //把数据添加到localStorage中
    //取原有数据
    let arr = JSON.parse(localStorage.getItem('search') || '[]');

    //在添加之前要去重 判断搜索记录 是否已存在 (删除之前那条记录 添加当前记录)
    let index = arr.indexOf(txt);
    if (index > -1) {
        //删除之前 那条记录
        arr.splice(index, 1);
    }
    //往前面添加
    arr.unshift(txt);
    //判断长度不能超过八条
    if (arr.length > 8) {
        arr.pop(); //删除最后一条

    }
    //存储到localStorage
    localStorage.setItem('search', JSON.stringify(arr));
}