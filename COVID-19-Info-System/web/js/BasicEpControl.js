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

    let ops = {
        "menubarDiv": "menubar",
        "logoDiv": "logoTitle",
        "menuGroupID": "menuBtnGroup",
        "btnMenuObj": {
            "div": "basicEpMenuDiv",
            "menuID": "basisEpMenu",
            "menuTxt": "BASIC EPIDEMIC EXHIBITION",
            "href": "index.html"
        },
        "dpMenuObj": {
            "div": "epAnalysisMenuDiv",
            "menuID": "epAnalysisMenu",
            "menuTxt": "EPIDEMIC ANALYSIS EXHIBITION",
            "items": analysisItemsArr
        },
        "shareIconDiv": "shareIcon",
        "titleDiv": "title"
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
//                 btnMenuObj: a json object contains param to create a button menu
//                 dpMenuObj: a json object contains param to create a dropdown menu
//                 shareIconDiv: the id of div which contains share icon
//                 titleDiv: the id of div which contains the title
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

    let menubar = $("#" + me.options.menubarDiv).addClass("row");
    // load logo
    let logoDiv = $("#" + me.options.logoDiv)
        .addClass("logoDiv col-xl-4 col-lg-4 col-md-4");
    $("<div>").appendTo(logoDiv)
        .addClass("CSU-logo")
        .css("background-image", "url(html/icon/中南大学校徽-黑白.jpg)");
    $("<div>").appendTo(logoDiv)
        .addClass("CSU-name")
        .css("background-image", "url(html/icon/中南大学-白英文标.png)");

    // create menus
    $("#" + me.options.menuGroupID).addClass("col-xl-8 col-lg-8 col-md-8");
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
    let titleDiv = $("#" + me.options.titleDiv)
        .addClass("row");
    $("<h1>").appendTo(titleDiv)
        .text("COVID19 BASIC EPIDEMIC DASHBOARD");


};

// create a button menu and a dropdown menu
//
// @param:
// @return
BasicEpControl.prototype._initMenu = function () {
    let me = this;
    let menuControl = new MenuControl();

    let btnObj = me.options.btnMenuObj;
    let basicEpMenu = menuControl.addBtnMenu(btnObj.div, btnObj.menuID,
        btnObj.menuTxt, btnObj.href);

    let dpObj = me.options.dpMenuObj;
    let analysisMenu = menuControl.addDropDownMenu(dpObj.div, dpObj.menuID,
        dpObj.menuTxt, dpObj.items);

};
