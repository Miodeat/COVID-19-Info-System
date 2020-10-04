EChartViewer = function () {
    let me = this;
    IViewer.call(me);

};

(function () {
    let tmp = function () {};
    tmp.prototype = IViewer.prototype;
    EChartViewer.prototype = new tmp();
})();

EChartViewer.constructor = EChartViewer;

EChartViewer.prototype.drawMap = function (div, data, dataProcessor) {
    let me = this;

    let mapChart = echarts.init(document.getElementById(div));

    let result = me.convertData(data, dataProcessor);
    let current = result.data;
    let min = result.min;
    let options = {
        "tooltip": {
            "formatter": obj => obj.value[3] + ": " + obj.value[2]
        },
        "geo": {
            "center": [0, 0],
            "roam": true,
            "map": "world",
            "itemStyle": {
                "color": "#000f1a",
            },
            "scaleLimit": {
                "min": 1.8,
            },
            "layoutCenter": ["50%", "50%"],
            "layoutSize": "100%",
            "boundingCoords": [
                [-180, 90],
                [180, -90]
            ],
            "emphasis": {
                "label": {
                    "color": "rgb(255,255,255)"
                }
            }
        },
        "series": {
            "type": 'scatter',
            "coordinateSystem": "geo",
            "data": current
        },
        "visualMap": {
            "type": "continuous",
            "min": min,
            "max": result.max,
            "calculable": true,
            "realtime": false,
            "dimension": 2,
            "text": ["High", "Low"],
            "inRange": {
                // "color": ["#313695", "#4575b4",
                //     "#74add1", "#abd9e9", "#e0f3f8",
                //     "#ffffbf", "#fee090", "#fdae61",
                //     "#f46d43", "#d73027", "#a50026"],
                "color": "#d30808",
                "symbolSize": [5, 40],
                "opacity": 0.85
            },
            "textStyle": {
                "color": "rgba(255,255,255,1)"
            }
        }
    };

    mapChart.setOption(options);

    return {"chart": mapChart, "options": options};
};

EChartViewer.prototype.convertData = function (data, dataProcessor) {
    let finalData = [];
    let maxCurrent = 0;
    let minCurrent = Number.POSITIVE_INFINITY;
    for (let i = 0; i < data.length; i++) {
        let current = dataProcessor(parseInt(data[i].confirmed),
            parseInt(data[i].death), parseInt(data[i].recovered));

        current = parseInt(current)

        if (current == 0) {
            continue;
        }

        let area = data[i].province == "nan" ? data[i].country : data[i].province;

        if (current > maxCurrent) {
            maxCurrent = current;
        }

        if (current < minCurrent) {
            minCurrent = current;
        }

        let pt_con = {
            "name": data[i].id,
            "value": [data[i].lat, data[i].lon, current, area, data[i].country]
        };

        finalData.push(pt_con);
    }

    return {"data": finalData, "max": maxCurrent, "min": minCurrent};
};

EChartViewer.prototype.drawStatistic = function (div, type,
                                                 width, height,
                                                 X, Y) {
    let me = this;

    $("#" + div).css({
        "width": width,
        "height": height
    });

    let stChart = echarts.init(document.getElementById(div));
    let options;
    switch (type) {
        case "bar":
            options = me.drawBar(X, Y);
            break;
    }

    stChart.setOption(options);
    return {"chart": stChart, "options": options};
};


EChartViewer.prototype.drawBar = function (X, Y) {
    let ops = {
        "tooltip": {},
        "grid": {
            "containLabel": true,
            "top": "10%",
            "bottom": "10%",
            "left": "2%",
            "right": "2%"
        },
        "xAxis": {
            "data": X
        },
        "yAxis": {},
        "series": [
            {
                "type": "bar",
                "itemStyle": {
                    "color": "#fea900"
                },
                "data": Y
            }
        ],
        "textStyle": {
            "color": "#ffffff"
        }
    };

    return ops;
};

EChartViewer.prototype.drawMapWithOps = function (div, ops) {
    let mapChart = echarts.init(document.getElementById(div));
    mapChart.setOption(ops);
    return mapChart;
};