CRTimeDataProcessor = function (data) {
    let me = this;
};

CRTimeDataProcessor.constructor = function () {

};

//这里一共是三条线：
//第一条线：Map：需要将原始的data->待formatter的data->formatter后的data->地图的options
//第二条线：multiline 就是数据处理，返回options
//第三条线：timebar 数据处理，返回options，返回series。
//注意，这里的options和option不同，options是option内控制时间轴的选项


// 返回待formatter处理的数据格式
CRTimeDataProcessor.prototype.getGoodData = function (data) {
    let me = this;
    let time_period = 0;
    // console.log(data);
    data["res"].forEach((item, index) => {
        time_period = Math.max(time_period, Number(item.update_time));
    });

    //get CollectiveRationality AND country name(divide by time)
    let cr = [];
    let co = [];
    let dataCR = [];
    let dataCountry = [];
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

    let obj = {
        dataCR: dataCR,
        dataCountry: dataCountry
    };

    return obj;
}


// 返回在date后n天的时间
CRTimeDataProcessor.prototype.afterDate = function (date, n) {

    let mTimes = new Date(date);
    let endTimes = mTimes.valueOf() + n * 24 * 60 * 60 * 1000;
    let endDate = new Date(endTimes);
    return endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
}


// 通过处理好的数据，获取地图的option
CRTimeDataProcessor.prototype.getOption = function (obj) {
    let me = this;
    let option = [];
    let beginday = new Date("2020-03-21");
    obj.forEach((item, index) => {
        let name = 'Week' + index+": "+ me.afterDate(beginday, (index) * 7) + "~" + me.afterDate(beginday, (index + 1) * 7);
        let current = {
            title: {'text':name},
            series: [
                {'data': item}
            ]
        };

        option[index - 1] = current;
    })
    return option;
};

// 获得选择国家所有时间的理性值
CRTimeDataProcessor.prototype.getCountryData = function (country, data) {
    let me = this;
    let cr = [];
    let time = [];
    data['res'].forEach((items) => {
        if (items.country == country) {
            cr.push(items.rationality);
            time.push(items.update_time);
        }
    });
    let obj = {
        update_time: time,
        rationality: cr
    }
    return obj;
};


// 相当于一个总调用的，输入基础数据，返回获得opt的好数据
CRTimeDataProcessor.prototype.setData = function (data) {
    let me = this;
    let da = me.getGoodData(data);
    //get formal data
    let obj = me.dataFormatter(da["dataCR"], da["dataCountry"]);

    return obj;
}


// 转换数据（good->完全好的）
CRTimeDataProcessor.prototype.dataFormatter = function (obj, pList) {
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

// 获得所有国家的名字
CRTimeDataProcessor.prototype.getCountryName = function (data) {
    let me = this;
    let cname = [];
    data["res"].forEach((item, index) => {
        cname.push(item.country);
    });
    cname = Array.from(new Set(cname));
    return cname
}

// 获得线段统计图的option
CRTimeDataProcessor.prototype.getMultiLineOption = function (data) {
    let me = this;
    let cname = me.getCountryName(data);

    let mlp = [];
    let series = [];
    let legend = [];
    cname.forEach((name) => {
        let temp = me.getCountryData(name, data);
        let opt = {
            name: name,
            type: 'line',
            data: temp.rationality
        }
        series.push(opt);
        legend.push(name);
        opt = {};
    });

    mlp['series'] = series;
    mlp['legend'] = legend;

    return mlp;
};

// 获得时间序列[1,2,3.....]
CRTimeDataProcessor.prototype.getTime = function (data) {
    let time = [];
    data['res'].forEach((items) => {
        time.push(items.update_time);
    });

    return Array.from(new Set(time));
};

// 获得时间序列的文字标识[week1,week2,.....]
CRTimeDataProcessor.prototype.getTimeText = function (data) {
    let time = [];
    data['res'].forEach((items) => {
        time.push('week'+items.update_time);
    });

    return Array.from(new Set(time));
};


// 获得变化时间的option
CRTimeDataProcessor.prototype.getTimeBarOption = function (data) {
    let me = this;
    let options = [];
    let time = me.getTime(data);
    for (let i = 1; i <= time.length; i++) {
        // console.log(i)
        let oneTimeData = [];
        data["res"].forEach((item, index) => {
            // console.log(item.update_time);
            if (item.update_time == i) {
                // let temp = {
                //     name: item.country,
                //     value: item.rationality
                // }

                // oneTimeData.push(temp);
                oneTimeData.push(item.rationality)
            }
        });
        // console.log(index)

        let currentopt = {
            // title: {'text': 'WEEK' + i.toString()},
            series: [
                {
                    'data': oneTimeData,
                    'barWidth': 100
                }
            ]
        };
        options.push(currentopt);


    }

    console.log(options);
    return options;
    // cname = Array.from(new Set(cname));
}

// 帮助timebar获取series
CRTimeDataProcessor.prototype.getCountryTypeOption = function (data) {
    let me = this;
    let cname = me.getCountryName(data);
    let opt = [];
    cname.forEach((name) => {
        let temp = {
            name: name,
            type: 'bar'
        };
        opt.push(temp);
    });
    return opt;

}