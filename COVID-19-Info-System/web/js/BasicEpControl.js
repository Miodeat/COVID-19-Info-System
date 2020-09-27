// run this function after document loading
$(document).ready(function () {
    // the json object contain information of
    // menu item which is linked to collective
    // rationality page
    let CRMenuItemObj = {
        "id": "CRMenuItem",
        "href": "collectiveRationality.html",
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
            "treeData": [
                {
                    "name": "test",
                    "children": [
                        {
                            "name": "c1"
                        },
                        {
                            "name": "c2"
                        }
                    ]
                },
                {
                    "name": "test2",
                    "children": [
                        {
                            "name": "c3",
                        },
                        {
                            "name": "c4"
                        }
                    ]
                }
            ],
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
        ]
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
