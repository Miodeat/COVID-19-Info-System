CRTimeDataProcessor = function (data) {
    let me = this;
};

CRTimeDataProcessor.constructor = function () {

};


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
CRTimeDataProcessor.prototype.afterDate = function (date, n) {


    let mTimes = new Date(date);
    let endTimes = mTimes.valueOf() + n * 24 * 60 * 60 * 1000;
    let endDate = new Date(endTimes);
    return endDate.getFullYear() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getDate();
}

//option
CRTimeDataProcessor.prototype.getOption = function (obj) {
    let me = this;
    let option = [];
    let beginday = new Date("2020-03-21");
    obj.forEach((item, index) => {
        let current = {
            title: {'text': me.afterDate(beginday, (index - 1) * 7) + "~" + me.afterDate(beginday, (index + 1) * 7)},
            series: [
                {'data': item}
            ]
        };

        option[index - 1] = current;
    })
    return option;
};

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


CRTimeDataProcessor.prototype.setData = function (data) {
    let me = this;
    let da = me.getGoodData(data);
    //get formal data
    let obj = me.dataFormatter(da["dataCR"], da["dataCountry"]);

    return obj;
}


//转换后的数据
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


CRTimeDataProcessor.prototype.getCountryName = function (data) {
    let me = this;
    let cname = [];
    data["res"].forEach((item, index) => {
        cname.push(item.country);
    });
    cname = Array.from(new Set(cname));
    return cname
}

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


CRTimeDataProcessor.prototype.getTime = function (data) {
    let time = [];
    data['res'].forEach((items) => {
        time.push(items.update_time);
    });

    return Array.from(new Set(time));
};

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
                    'barWidth':100
                }
            ]
        };
        options.push(currentopt);


    }

    console.log(options);
    return options;
    // cname = Array.from(new Set(cname));
}

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