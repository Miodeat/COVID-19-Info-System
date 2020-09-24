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
        "shareIconDiv": "shareIcon"
    };
    let basicEp = new BasicEpControl(ops);
});


BasicEpControl = function (ops) {
    let me = this;

    me.options = ops;
    me._init();
};

BasicEpControl.prototype._init = function () {
    let me = this;

    let menubar = $("#" + me.options.menubarDiv).addClass("row");
    let logoDiv = $("#" + me.options.logoDiv)
        .addClass("logoDiv col-xl-4 col-lg-4 col-md-4");
    $("<div>").appendTo(logoDiv)
        .addClass("CSU-logo")
        .css("background-image", "url(html/icon/中南大学校徽-黑白.jpg)");
    $("<img>").appendTo(logoDiv)
        .addClass("CSU-name")
        .css("background-image", "url(html/icon/中南大学-白英文标.png)");
    $("#" + me.options.menuGroupID).addClass("col-xl-7 col-lg-7 col-md-7");
    me._initMenu();

    $("#" + me.options.shareIconDiv).addClass("col-xl-1 col-lg-1 col-md-1")
};

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
