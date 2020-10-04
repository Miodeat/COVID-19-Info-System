CountryCasesControl = function (ops) {
    let me = this;
    me.options = $.extend({
        "titleDivId": "countryCasesTitle",
        "titleTxt": "Country Cases",
        "tabsDiv": "countryCasesTabs",
        "contentId": "countryCasesContent",
        "mapDivCls": "country-map",
        "stDivCls": "country-st"
    }, ops);
    me._init();
};

CountryCasesControl.prototype._init = function () {
    let me = this;

    me._createTitle();
    me._createTabs();
    me._createMapAndSt();
};

CountryCasesControl.prototype._createTitle = function () {
    let me = this;

    $("<h4>").appendTo(me.options.container)
        .attr({
            "id": me.options.titleDivId
        })
        .text(me.options.titleTxt);

};

CountryCasesControl.prototype._createTabs = function () {
    let me = this;
    let tabC = new TabControl();

    tabC.createTabs(me.options.container, me.options.contentId, me.options.tabs);
};

CountryCasesControl.prototype._createMapAndSt = function () {
    let me = this;

    for (let i = 0; i < me.options.tabs.length; i++){
        let content = $(me.options.tabs[i].href);
        $("<div>").appendTo(content)
            .addClass(me.options.mapDivCls)
            .attr({
                "id": me.options.tabs[i].href.substring(1) + "Map"
            });
        $("<div>").appendTo(content)
            .addClass(me.options.stDivCls)
            .attr({
                "id": me.options.tabs[i].href.substring(1) + "St"
            });
    }
};

CountryCasesControl.prototype.drawSt = function (data, country, dataProcessor, div) {
    let me = this;

    let x = [];
    let y = [];
    for (let key in data) {
        x.push(key);
        let dateData = data[key];
        let countryDD = dateData[country];
        let countryY = dataProcessor(parseInt(countryDD["confirmed"]),
            parseInt(countryDD["death"]), parseInt(countryDD["recovered"]));
        y.push(countryY);
    }
    x.reverse();
    y.reverse();

    let countryBar = new EChartViewer();
    return countryBar.drawStatistic(div, "bar", "100%", "50%", x, y);

};