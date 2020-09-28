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
    let options = {
        "geo": {
            "center": [0, 0],
            "roam": true,
            "map": "world",
            "itemStyle": {
                "color": "rgb(0,0,0)",
                "borderColor": "rgba(255,255,255,0.5)",
                "boarderWidth": 1,
            },
            "scaleLimit": {
                "min": 1.5,
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
            "min": 0,
            "max": result.max,
            "calculable": true,
            "realtime": false,
            "dimension": 2,
            "text": ["High", "Low"],
            "inRange": {
                "color": ["#313695", "#4575b4",
                    "#74add1", "#abd9e9", "#e0f3f8",
                    "#ffffbf", "#fee090", "#fdae61",
                    "#f46d43", "#d73027", "#a50026"],
                "symbolSize": [10, 40],
                "opacity": 0.6
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
    for (let i = 0; i < data.length; i++) {
        let current = dataProcessor(parseInt(data[i].confirmed),
            parseInt(data[i].death), parseInt(data[i].recovered));
        if (current > maxCurrent) {
            maxCurrent = current;
        }
        let pt_con = {
            "name": data[i].id,
            "value": [data[i].lat, data[i].lon, current]
        };

        finalData.push(pt_con);
    }

    return {"data": finalData, "max": maxCurrent};
};
