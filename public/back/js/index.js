$(function() {
    //图表一

    // 基于准备好的dom，初始化echarts实例
    const myChart1 = echarts.init(document.getElementById('char1'));

    // 指定图表的配置项和数据
    let option1 = {
        title: {
            text: '大炮每月吃shi份额'
        },
        //提示工具
        tooltip: {},
        //图例
        legend: {
            data: ['吨数', '时间']
        },
        //x轴
        xAxis: {
            data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        yAxis: {}, //y轴自动生成
        series: [ //数据
            {
                name: '吨数',
                type: 'bar',
                data: [150, 100, 250, 108, 110, 201]
            }, {
                name: '时间',
                type: 'line',
                data: [50, 60, 190, 84, 70, 88]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);

    //图表二

    // 基于准备好的dom，初始化echarts实例
    const myChart2 = echarts.init(document.getElementById('char2'));

    // 指定图表的配置项和数据
    let option2 = {
        title: {
            text: '畅销品牌',
            subtext: '2019',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪达斯', '彪马', '李宁', '安踏']
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: '耐克' },
                { value: 310, name: '阿迪达斯' },
                { value: 234, name: '彪马' },
                { value: 135, name: '李宁' },
                { value: 1548, name: '安踏' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };;

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
})