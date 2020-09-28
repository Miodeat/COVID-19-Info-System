var dom = document.getElementById("dataMapExhibition");
var myChart = echarts.init(dom);
option = null;
var dataMap1 = {};

function dataFormatter(obj) {
    var pList = ['Canada', 'United States', 'India', 'United Kingdom'];
    var temp;
    var max = 0;

    for (var year = 1; year <= 6; year++) {
        temp = obj[year];
        for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            obj[year][i] = {
                name: pList[i],
                value: temp[i]
            }
        }
        obj[year + 'max'] = Math.floor(max / 100) * 100;
    }
    return obj;
}

dataMap1.dataGDP = dataFormatter({
    //max : 60000,
    1: [7.85, 11.15, 14.82, 13.79],
    2: [6.91, 11.30, 13.14, 14.17],
    3: [4.92, 5.48, 13.64, 8.57],
    4: [2.58, 3.42, 7.82, 4.08],
    5: [9.44, 11.33, 9.41, 14.20],
    6: [10.11, 4.43, 9.87, 1.04]
});


option = {
    baseOption: {
        timeline: {
            axisType: 'category',
            autoPlay: true,
            playInterval: 3000,
            y: 630,
            data: (function () {
                var a = [];
                for (var i = 1; i <= 6; i++) {
                    a.push(i + '-01-01');
                }
                return a;
            })(),
            label: {
                formatter: function (s) {
                    return (new Date(s)).getFullYear();
                }
            }
        },
        title: {
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
        },

        visualMap: {
            min: 2,
            max: 30,
            left: 'left',
            top: 'bottom',
            text: ['high', 'low'],           // 文本，默认为数值文本
            calculable: true,
            color: ['#d94e5d', '#eac736', '#50a3ba'],
            // borderColor:"rgba(255,255,255,0.5)",
            // areaColor:"rgb(255,255,255)"
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            },
        },
        series: [
            {
                name: 'Collective Rationality',
                type: 'map',
                mapType: 'world',
                roam: false,
                itemStyle: {
                    normal: {
                        color: 'rgb(0,0,0)',//默认的地图板块
                        borderColor: 'rgba(255,255,255,0.5)',
                        borderWidth:1
                    },
                    emphasis: {
                        label: {
                            show: true,
                        },
                        // areaStyle: {
                        //     color: '#90c31d',//选中状态的地图板块颜色
                        // },
                    },
                },
            },
        ]
    },


    options: [
        {
            title: {'text': 'week1'},
            series: [
                {'data': dataMap1.dataGDP['1']}
            ]
        },
        {
            title: {'text': 'week2'},
            series: [
                {data: dataMap1.dataGDP['2']}
            ]
        },
        {
            title: {'text': 'week3'},
            series: [
                {'data': dataMap1.dataGDP['3']}
            ]
        },
        {
            title: {'text': 'week4'},
            series: [
                {'data': dataMap1.dataGDP['4']}
            ]
        },
        {
            title: {'text': 'week5'},
            series: [
                {'data': dataMap1.dataGDP['5']}
            ]
        },
        {
            title: {'text': 'week6'},
            series: [
                {'data': dataMap1.dataGDP['6']}
            ]
        }
    ]
};
;


if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
