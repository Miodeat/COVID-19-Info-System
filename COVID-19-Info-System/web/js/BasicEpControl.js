// run this function after document loading
$(document).ready(function () {
    // the json object contain information of
    // menu item which is linked to collective
    // rationality page
    let CRMenuItemObj = {
        "id": "CRMenuItem",
        "href": "CollectiveRationality.html",
        "text": "Collective Rationality"
    };
    let analysisItemsArr = [CRMenuItemObj]; // the array of analysis menu items

    // params to initialize basic epidemic page
    let ops = {
        "menubarDiv": "menubar",
        "logoDiv": "logoTitle",
        "menuGroupID": "menuBtnGroup",
        "btnMenuObj": {
            "div": "basicEpMenuDiv",
            "menuId": "basisEpMenu",
            "menuTxt": "BASIC EPIDEMIC EXHIBITION",
            "href": "index.html"
        },
        "dpMenuObj": {
            "div": "epAnalysisMenuDiv",
            "menuId": "epAnalysisMenu",
            "menuTxt": "EPIDEMIC ANALYSIS EXHIBITION",
            "items": analysisItemsArr
        },
        "shareIconDiv": "shareIcon",
        "titleDiv": "title",
        "dataTreeListObj": {
            "container": "dataTreeList",
            "treeTitleDiv": "listTitle",
            "treeTitleId": "treeTitle",
            "treeTitleTxt": "Global Cases",
            "treeTargetDiv": "caseList",
            "treeData": [],
            "updateTimeDiv": "listUpdateTime",
            "date": "9/26/2020",
            "time": "14:55"
        },
        "boardContainer": "displayBoards",
        "boardObjArr": [
            {
                "title": "test1",
                "text": "test text 1",
                "href": "#"
            },
            {
                "title": "test2",
                "text": "test text 2",
                "href": "#"
            },
            {
                "title": "test3",
                "text": "test text 3",
                "href": "#"
            }
        ],
        "mapsObj": {
            "mapTabsDiv": "mapTabs",
            "contentId": "mapsContainer",
            "tabs": [
                {
                    "href": "#currentMap",
                    "active": true,
                    "text": "Current"
                },
                {
                    "href": "#confirmedMap",
                    "active": false,
                    "text": "Confirmed"
                },
                {
                    "href": "#deathMap",
                    "active": false,
                    "text": "Death"
                },
                {
                    "href": "#recoveredMap",
                    "active": false,
                    "text": "Recovered"
                }
            ],

        },
        "countryCasesObj": {
            "country": "China",
            "container": "countryCases",
            "titleDivId": "countryCasesTitle",
            "titleTxt": "Country Cases",
            "countrySelectId": "countrySelect",
            "tabsDiv": "countryCasesTabs",
            "contentId": "countryCasesContent",
            "tabs": [
                {
                    "href": "#countryCurrent",
                    "active": true,
                    "text": "Current"
                },
                {
                    "href": "#countryConfirmed",
                    "active": false,
                    "text": "Confirmed"
                },
                {
                    "href": "#countryDeath",
                    "active": false,
                    "text": "Death"
                },
                {
                    "href": "#countryRecovered",
                    "active": false,
                    "text": "Recovered"
                }
            ],
            "mapDivCls": "country-map",
            "stDivCls": "country-st"
        },
        "mapAndStColorObj": {
            "current": "#d30808",
            "confirmed": "#ffb40d",
            "death": "#e4e5e3",
            "recovered": "#65ba24"
        }
    };

    let basicEp = new BasicEpControl(ops); // initialize page
});

// the constructor of controller of basic epidemic page
//
// @param ops: a json object contain all information to initialize the page
//             including:
//                 menubarDiv: the id of div which contains menubar
//                 logoDiv: the id of div which contains logo
//                 menuGroupID: the id of div which contains menus
//                 btnMenuObj: a json object contains param to create a button menu,
//                             more information from MenuControl.js
//                 dpMenuObj: a json object contains param to create a dropdown menu,
//                            more information from MenuControl.js
//                 shareIconDiv: the id of div which contains share icon
//                 titleDiv: the id of div which contains the title
//                 dataTreeListObj: a json object contains param to create data tree list
//                                  more information from DataListControl.js
BasicEpControl = function (ops) {
    let me = this;

    me.options = ops;
    me._init();
};

// initialize function of BasicEpControl
// using it to initialize function
//
// @param
// @return
BasicEpControl.prototype._init = function () {
    let me = this;

    let menubar = $("#" + me.options.menubarDiv);
    // load logo
    let logoDiv = $("#" + me.options.logoDiv)
        .addClass("logoDiv");
    $("<div>").appendTo(logoDiv)
        .addClass("CSU-logo")
        .css("background-image", "url(html/icon/中南大学校徽-黑白.jpg)");
    $("<div>").appendTo(logoDiv)
        .addClass("CSU-name")
        .css("background-image", "url(html/icon/中南大学-白英文标.png)");

    // create menus
    me._initMenu();
    // load sharing icon
    let shareIcon = $("#" + me.options.shareIconDiv);
    $("<img>").appendTo(shareIcon)
        .addClass("bar-right-icon")
        .attr({
            "src": "html/icon/分享.png",
            "width": "28px",
            "height": "28px",
        });

    // create title
    let titleDiv = $("#" + me.options.titleDiv);
    $("<h1>").appendTo(titleDiv)
        .text("COVID19 BASIC EPIDEMIC DASHBOARD");

    let dataListControl = new DataListControl(me.options.dataTreeListObj);
    me._initMapTabs();
    $.ajax({
        "type": "POST",
        "url": "/COVID_19_Info_System/getTreeDataServlet",
        "data": {},
        "success": function (res) {
            me._initTree(res, dataListControl);
        },
        "err": function (err) {
            console.log(err)
        }
    });

    $.ajax({
        "type": "POST",
        "url": "/COVID_19_Info_System/getEpidemicInfoServlet",
        "data": {},
        "success": function (res) {
            let json = JSON.parse(res);
            me._initMaps(json);
            me._initCountrySelect(me.options.countryCasesObj.countrySelectId,
                me._getCountriesFromMapData(json), me.options.countryCasesObj.country);
        },
        "err": (err) => {console.log(err)}
    });

    let countryCasesControl = new CountryCasesControl(me.options.countryCasesObj);

    $.ajax({
        "type": "POST",
        "url": "/COVID_19_Info_System/getEpidemicTimeSeriesServlet",
        "data": {},
        "success": function (res) {
            me._updateCountryCasesSt(res, countryCasesControl,
                me.options.countryCasesObj.country);
        },
        "err": (err) => {console.log(err)}
    });

    me._initDisplayBoard();
};

// create a button menu and a dropdown menu
//
// @param:
// @return
BasicEpControl.prototype._initMenu = function () {
    let me = this;
    let menuControl = new MenuControl();

    let btnObj = me.options.btnMenuObj;
    let basicEpMenu = menuControl.addBtnMenu(btnObj.div, btnObj.menuId,
        btnObj.menuTxt, btnObj.href);

    let dpObj = me.options.dpMenuObj;
    let analysisMenu = menuControl.addDropDownMenu(dpObj.div, dpObj.menuId,
        dpObj.menuTxt, dpObj.items);

};

BasicEpControl.prototype._initDisplayBoard = function () {
    let me = this;

    let boardControl = new DisplayBoardControl();

    for (let i = 0; i < 3; i++) {
        boardControl.addDisplayBoard(me.options.boardContainer,
            me.options.boardObjArr[i].title,
            me.options.boardObjArr[i].text,
            me.options.boardObjArr[i].href)
    }
};

BasicEpControl.prototype._initMapTabs = function () {
    let me = this;

    let mapsTabControl = new TabControl();
    mapsTabControl.createTabs(me.options.mapsObj.mapTabsDiv,
        me.options.mapsObj.contentId,
        me.options.mapsObj.tabs);

};

BasicEpControl.prototype._initTree = function (res, dataListControl) {
    let me = this;

    let json = JSON.parse(res);
    let countryEpArr = json.res;
    me.options.dataTreeListObj.treeData = (function (countryEpArr) {
        let treeData = [];
        for (let key in countryEpArr) {
            let node = {};
            let epObj = countryEpArr[key];
            let confirmed = epObj["confirmed"];
            let death = epObj["death"];
            let recovered = epObj["recovered"];
            let current = confirmed - death - recovered;
            node["current"] = current;
            node["name"] = epObj["country"] + "  " + current;
            node["children"] = [];
            node["children"].push({
                "name": "Deaths  " + death
            });
            node["children"].push({
                "name": "Recovered  " + recovered
            });
            node["children"].push({
                "name": "Total  " + confirmed
            });

            treeData.push(node);
        }

        treeData.sort(function (a, b) {
            return b.current - a.current;
        });

        return treeData;
    })(countryEpArr);
    dataListControl.createList(me.options.dataTreeListObj.treeTargetDiv,
        me.options.dataTreeListObj.treeData);
};

BasicEpControl.prototype._initMaps = function (json) {
    let me = this;

    let eChartViewer = new EChartViewer();

    let currentEC = me._initSingleMap(me.options.mapsObj.tabs[0].href, eChartViewer,
        json, me.options.mapAndStColorObj.current, (a, b, c) => a-b-c,
        me.options.countryCasesObj.tabs[0].href.substring(1) + "Map",
        me.options.countryCasesObj.country);

    me.currentMapOption = currentEC.options;

    let confirmedEC = me._initSingleMap(me.options.mapsObj.tabs[1].href, eChartViewer,
        json, me.options.mapAndStColorObj.confirmed, (a, b, c) => a,
        me.options.countryCasesObj.tabs[1].href.substring(1) + "Map",
        me.options.countryCasesObj.country);

    me.confirmedMapOption = confirmedEC.options;

    let deathEC = me._initSingleMap(me.options.mapsObj.tabs[2].href, eChartViewer,
        json, me.options.mapAndStColorObj.death, (a, b, c) => b,
        me.options.countryCasesObj.tabs[2].href.substring(1) + "Map",
        me.options.countryCasesObj.country);

    me.deathMapOption = deathEC.options;

    let recoveredEC = me._initSingleMap(me.options.mapsObj.tabs[3].href, eChartViewer,
        json, me.options.mapAndStColorObj.recovered, (a, b, c) => c,
        me.options.countryCasesObj.tabs[3].href.substring(1) + "Map",
        me.options.countryCasesObj.country);

    me.recoveredMapOption = recoveredEC.options;

};

BasicEpControl.prototype._initSingleMap = function (worldHref, eChartViewer,
                                                    json, color, dataProcessor,
                                                    countryMapDiv, country) {
    let me = this;

    let ec = eChartViewer.drawMap(worldHref.substring(1),
        json.res, dataProcessor);
    ec.chart.setOption({
        "visualMap": {
            "inRange": {
                "color": color,
                "symbolSize": [5, 40],
                "opacity": 0.85
            }
        }
    });

    ec.options.visualMap.inRange = {
        "color": color,
        "symbolSize": [5, 40],
        "opacity": 0.85
    };

    $("a[href=\"" + worldHref +"\"]").on("shown.bs.tab",
        e => {ec.chart.resize();});

    window.addEventListener("resize",function (){
        ec.chart.resize();
    });

    me._updateSingleCountryCasesMap(countryMapDiv, ec.options, country);

    return ec;
};

BasicEpControl.prototype._updateCountryCasesSt = function (res, countryCasesControl, country) {
    let me = this;

    let json = JSON.parse(res);

    let ts = json.timeSeries;
    let countryCurrentSt = me._updateSingleSt(me.options.countryCasesObj.tabs[0].href,
        country, ts, countryCasesControl, (a, b, c) => a - b - c,
        me.options.mapAndStColorObj.current);

    let countryConfirmedSt = me._updateSingleSt(me.options.countryCasesObj.tabs[1].href,
        country, ts, countryCasesControl, (a, b, c) => a,
        me.options.mapAndStColorObj.confirmed);
    let countryDeathSt = me._updateSingleSt(me.options.countryCasesObj.tabs[2].href,
        country, ts, countryCasesControl, (a, b, c) => b,
        me.options.mapAndStColorObj.death);
    let countryRecoveredSt = me._updateSingleSt(me.options.countryCasesObj.tabs[3].href,
        country, ts, countryCasesControl, (a, b, c) => c,
        me.options.mapAndStColorObj.recovered);

};

BasicEpControl.prototype._updateSingleSt = function (href, country, ts,
                                                     countryCasesControl,
                                                     dataProcessor, color) {
    let me = this;
    let st = countryCasesControl.drawSt(ts, country,
        dataProcessor, href.substring(1) + "St");

    st.chart.setOption({
        "series": [{
            "itemStyle": {
                "color": color
            }
        }]
    });

    $("a[href=\"" + href +"\"]").on("shown.bs.tab",
        function (e) {
            st.chart.resize();
        });

    window.addEventListener("resize",function (){
        st.chart.resize();
    });

    return st;
};

BasicEpControl.prototype._updateSingleCountryCasesMap = function (div, ops, country) {
    let me = this;

    $("#" + div).removeAttr("_echarts_instance_")
        .removeAttr("style")
        .empty();

    let options = JSON.parse(JSON.stringify(ops));

    let data = options.series.data;
    let minLong = 180;
    let maxLong = -180;
    let minLat = 90;
    let maxLat = -90;

    for (let i = 0; i < data.length; i++) {
        let valueArr = data[i].value;
        if(valueArr[valueArr.length - 1] == country) {
            let lat = parseFloat(valueArr[1]);
            let long = parseFloat(valueArr[0]);
            minLat = lat < minLat ? lat : minLat;
            maxLat = lat > maxLat ? lat : maxLat;
            minLong = long < minLong ? long : minLong;
            maxLong = long > maxLong ? long : maxLong;
        }
        else {
            data.splice(i, 1);
            i--;
        }
    }

    minLat -= 7;
    maxLat += 7;
    minLong -= 5;
    maxLong += 5;

    options.series.data = data;
    options.geo.boundingCoords = [
        [minLong, maxLat],
        [maxLong, minLat]
    ];
    options.geo.roam = "scale";
    options.geo.scaleLimit = {
        "min": 0.5
    };

    options.geo.center = [(maxLong + minLong) / 2, (maxLat + minLat) / 2];
    options.tooltip = ops.tooltip;

    let eChartViewer = new EChartViewer();
    let mapC = eChartViewer.drawMapWithOps(div, options);

    $("a[href=\"" + "#" + div.substr(0, div.length - 3) +"\"]").on("shown.bs.tab",
        function (e) {
            mapC.resize();
        });

    window.addEventListener("resize", () => {mapC.resize()})
};

BasicEpControl.prototype._initCountrySelect = function (id, countries, selectedCountry) {
    let me = this;
    let countrySelect = $("#" + id);
    for (let i = 0; i < countries.length; i++) {
        let option = $("<option>").appendTo(countrySelect)
            .attr({
                "value": countries[i]
            })
            .text(countries[i]);

        if (countries[i] == selectedCountry) {
            option.attr({
                "selected": true
            });
        }
    }

    countrySelect.on("change", ev => {
        let opsArr = [me.currentMapOption, me.confirmedMapOption,
            me.deathMapOption, me.recoveredMapOption];
        for (let i = 0; i < 4; i++) {
            me._updateSingleCountryCasesMap(
                me.options.countryCasesObj.tabs[i].href.substring(1) + "Map",
                opsArr[i],
                $("#" + me.options.countryCasesObj.countrySelectId).val());
        }
        // me._updateCountryCasesSt()
    })
};

BasicEpControl.prototype._getCountriesFromMapData = function (json) {
    let me = this;

    let arr = json.res;
    let countryList = [];
    arr.forEach((value, key) => {
        if (countryList.indexOf(value.country) === -1) {
            countryList.push(value.country);
        }
    });

    return countryList;
};
