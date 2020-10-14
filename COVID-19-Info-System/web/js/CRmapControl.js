CRmapControl = function (div, width, height, data) {
    let me = this;
    $("#" + div).css({
        "width": width,
        "height": height
    });
    me.drawMap(div, data);
}

CRmapControl.prototype.drawMap = function (div, data) {
    let me = this;
    let timeDataProcessor = new CRTimeDataProcessor(data);
    let formData = timeDataProcessor.setData(data);
    let option = timeDataProcessor.getOption(formData);
    let myoption = {
        baseOption: {
            timeline: {
                axisType: 'category',
                autoPlay: true,
                playInterval: 3000,
                y: 1000,
                //@TODO:修改
                data: timeDataProcessor.getTimeText(data)
            },
            title: {
                text: 'Word Country Rationality',
                subtext: "世界国家集体理性",
                textStyle: {
                    fontSize: 30
                }
                // left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },

            visualMap: {
                min: -6,
                max: 8,
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
                // orient: 'vertical',
                // left: 'right',
                // top: 'bottom',
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
                    roam: true,
                    itemStyle: {
                        normal: {
                            color: 'rgb(0,0,0)',//默认的地图板块
                            borderColor: 'rgba(255,255,255,0.5)',
                            borderWidth: 1
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
        }
    };

    myoption["options"] = option;


    let dom = document.getElementById(div);
    let myChart = echarts.init(dom);
    if (myoption && typeof myoption === "object") {
        myChart.setOption(myoption, true);

    }
}





