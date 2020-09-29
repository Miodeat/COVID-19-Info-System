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
        "url": "/COVID_19_Info_System/getEpidemicInfoServlet",
        "data": {},
        "success": function (res) {
            let json = JSON.parse(res);
            let countryEpObj = json.total.everyCountryTotal;
            me.options.dataTreeListObj.treeData = (function (countryEpObj) {
                let treeData = [];
                for (let key in countryEpObj) {
                    let node = {};
                    let epObj = countryEpObj[key];
                    let confirmed = epObj["confirmed"];
                    let death = epObj["death"];
                    let recovered = epObj["recovered"];
                    let current = confirmed - death - recovered;
                    node["current"] = current;
                    node["name"] = key + "  " + current;
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
            })(countryEpObj);
            dataListControl.createList(me.options.dataTreeListObj.treeTargetDiv,
                me.options.dataTreeListObj.treeData);
            let eChartViewer = new EChartViewer();

            let currentEC = eChartViewer.drawMap(me.options.mapsObj.tabs[0].href.substring(1),
                json.res, (a, b, c) => a-b-c);
            currentEC.chart.setOption({
                "visualMap": {
                    "inRange": {
                        "color": "#d30808",
                        "symbolSize": [5, 40],
                        "opacity": 0.85
                    }
                }
            });

            let confirmedEC = eChartViewer.drawMap(me.options.mapsObj.tabs[1].href.substring(1),
                json.res, (a, b, c) => a);
            confirmedEC.chart.setOption({
                "visualMap": {
                    "inRange": {
                        "color": "#ffb40d",
                        "symbolSize": [5, 40],
                        "opacity": 0.85
                    }
                }
            });

            let deathEC = eChartViewer.drawMap(me.options.mapsObj.tabs[2].href.substring(1),
                json.res, (a, b, c) => b);
            deathEC.chart.setOption({
                "visualMap": {
                    "inRange": {
                        "color": "#e4e5e3",
                        "symbolSize": [5, 40],
                        "opacity": 0.85
                    }
                }
            });


            let recoveredEC = eChartViewer.drawMap(me.options.mapsObj.tabs[3].href.substring(1),
                json.res, (a, b, c) => c);
            recoveredEC.chart.setOption({
                "visualMap": {
                    "inRange": {
                        "color": "#65ba24",
                        "symbolSize": [5, 40],
                        "opacity": 0.85
                    }
                }
            });


            $("a[href=\"" + me.options.mapsObj.tabs[0].href +"\"]").on("shown.bs.tab",
                function (e) {
                    currentEC.chart.resize();
                });
            $("a[href=\"" + me.options.mapsObj.tabs[1].href +"\"]").on("shown.bs.tab",
                function (e) {
                    confirmedEC.chart.resize();
                });
            $("a[href=\"" + me.options.mapsObj.tabs[2].href +"\"]").on("shown.bs.tab",
                function (e) {
                    deathEC.chart.resize();
                });
            $("a[href=\"" + me.options.mapsObj.tabs[3].href +"\"]").on("shown.bs.tab",
                function (e) {
                    recoveredEC.chart.resize();
                });

            window.addEventListener("resize",function (){
                currentEC.chart.resize();
                confirmedEC.chart.resize();
                deathEC.chart.resize();
                recoveredEC.chart.resize();
            });
        },
        "err": function (err) {
            console.log(err)
        }
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

    let mapsTabControl = new MapsTabControl();
    mapsTabControl.createTabs(me.options.mapsObj.mapTabsDiv,
        me.options.mapsObj.tabs);

};
