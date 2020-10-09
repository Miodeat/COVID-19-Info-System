CRmapControl = function (div, data) {
    let me = this;
    me.drawMap(div, data);
}

CRmapControl.prototype.drawMap = function (div, data) {
    let me = this;
    let formData = me.setData(data);
    let option = me.getOption(formData);
    let myoption = {
        baseOption: {
            timeline: {
                axisType: 'category',
                autoPlay: true,
                playInterval: 3000,
                y: 630,
                data : (function(){
                    var a = [];
                    for (var i = 2009; i <= 2019; i++) {
                        a.push( i + '-01-01');
                    }
                    return a;
                })(),
                label: {
                    formatter : function(s) {
                        return (new Date(s)).getFullYear();
                    }
                }
            },
            title: {
                text: 'Word Country Rationality',
                subtext: "世界国家集体理性"
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
    console.log(myoption);
    let dom = document.getElementById(div);
    let myChart = echarts.init(dom);
    if (myoption && typeof myoption === "object") {
        myChart.setOption(myoption, true);

    }
}


//option
CRmapControl.prototype.getOption = function (obj) {
    let option = [];
    obj.forEach((item, index) => {
        let current = {
            title: {'text': 'WEEK' + index.toString()},
            series: [
                {'data': item}
            ]
        };

        option[index - 1] = current;
    })
    return option;
}

CRmapControl.prototype.setData = function (data) {
    let me = this;
    let time_period = 0;
    let length = 0;

    data["res"].forEach((item, index) => {
        if (Number(item.update_time) > Number(time_period)) {
            time_period = Number(item.update_time);
        }
        length += 1;
    })

    //get CollectiveRationality AND country name(divide by time)
    let cr = new Array();
    let co = new Array();
    let dataCR = new Array();
    let dataCountry = new Array();
    for (let i = 1; i < Number(time_period); i++) {
        data["res"].forEach((item, index) => {
            if (item.update_time == i) {
                cr.push(item.rationality);
                co.push(item.country);
            }
        })
        dataCR[i] = cr;
        dataCountry[i] = co;
        co = [];
        cr = [];

    }
    ;

    //get formal data
    let obj = me.dataFormatter(dataCR, dataCountry);

    return obj;
}


//转换后的数据
CRmapControl.prototype.dataFormatter = function (obj, pList) {
    let temp;
    let max = 0;
    for (let time = 1; time <= obj.length; time++) {
        temp = obj[time]
        if (temp != null) {
            for (let i = 0, l = temp.length; i < l; i++) {
                max = Math.max(max, temp[i]);
                obj[time][i] = {
                    // time[i] = {
                    name: pList[time][i],
                    value: temp[i]
                }
            }
            ;
            obj[time + 'max'] = Math.floor(max / 100) * 100;

        }
    }
    // console.log(obj);
    return obj;
}


