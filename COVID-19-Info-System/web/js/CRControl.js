// run this function after document loading
$(document).ready(function () {
    // the json object contain information of
    // menu item which is linked to collective
    // rationality page
    let CRMenuItemObj = {
        "id": "MenuItem",
        "href": "CollectiveRationality.html",
        "text": "Collective Rationality"
    };
    let analysisItemsArr = [CRMenuItemObj]; // the array of analysis menu items


    //params to initialize basic epidemic page
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

        "mapDiv": "dataMapExhibition",
        "statDiv": {
            "barDiv": "countryCompare",
            "lineDiv": "countryItself",
        },

        "textControlObj": {
            "container": "Introduction",
            "titleDiv": "textTitle",
            "titleText": "A model of collective rational assessment based on internal group dynamics",
            "textInfoDiv": "textInfo",
            "timeDiv": "textTime",
            "textTime": "27 September",
            "authorDiv": "textAuthor",
            "textAuthor": "The Victory of Budweiser Group, Centre South University",
            "previewImgDiv": "previewImg",
            "previewImg": "html/icon/模型示意图.png",
            "textBodyDiv": "textBody",
            "textBody": "html/markdown/CollectiveRationality.md"
        },

        "crmapObj": {
            "mapTabDiv": "dataMapExhibition",
            "tabs": [
                {
                    "href": "#rationalityMap",
                    "active": true,
                    "text": "Rationality"
                }
            ]
        }
    };
    let crControl = new CRControl(ops); // initialize page
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
CRControl = function (ops) {
    let me = this;

    me.options = ops;
    me._init();
};

// initialize function of BasicEpControl
// using it to initialize function
//
// @param
// @return
CRControl.prototype._init = function () {
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
    // $("#" + me.options.menuGroupID).addClass("col-xl-8 col-lg-8 col-md-8");
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
        .text("COVID19 COLLECTIVE RATIONALITY");

    // create MapBox and Statistic
    $.ajax({
        "type": "POST",
        "url": "/COVID_19_Info_System/getCollectiveRationalityInfoServlet",
        "data": {},
        "success": function (res) {
            let json = JSON.parse(res);
            // let countryCRObj = json.total;
            me._initMap(me.options.mapDiv, json);
            me._initStat(me.options.statDiv, json);
        },
        "err": function (err) {
            console.log(err)
        }
    })

    //create Text
    // let textControl = new TextControl(me.options.textControlObj)
    me._initText();
};

// create a button menu and a dropdown menu
//
// @param:
// @return
CRControl.prototype._initMenu = function () {
    let me = this;
    let menuControl = new MenuControl();

    let btnObj = me.options.btnMenuObj;
    let basicEpMenu = menuControl.addBtnMenu(btnObj.div, btnObj.menuId,
        btnObj.menuTxt, btnObj.href);

    let dpObj = me.options.dpMenuObj;
    let analysisMenu = menuControl.addDropDownMenu(dpObj.div, dpObj.menuId,
        dpObj.menuTxt, dpObj.items);

};

CRControl.prototype._initMap = function (div, data) {
    let me = this;
    // console.log(data);
    let crmapcontrol = new CRmapControl(div, data);

    // let crmapTabControl = new MapsTabControl();
    // crmapTabControl.createTabs(me.options.crmapObj.mapTabDiv,me.options.crmapObj.tabs);
}

CRControl.prototype._initStat = function (div, data) {
    let me = this;
    // me._initSelector();
    let echartviewer = new EChartViewer();
    let crtimedataprocessor = new CRTimeDataProcessor(data);

    let X = crtimedataprocessor.getTime(data);

    // let da= crtimedataprocessor.getGoodData(data);
    echartviewer.drawStatistic(div.barDiv, 'timebar', 600, 300,X ,data );


    echartviewer.drawStatistic(div.lineDiv, 'multiline', 600, 200, X , data);


}

// CRControl.prototype._initSelector= function(div, time , selectTime){
//     let me = this;
//     let timeSelect = $("#"+div);
//     time.forEach((item)=>{
//        let option = $("<option>").appendTo(timeSelect)
//            .attr({
//                "value":item
//            })
//            .text(item);
//        if(item == selectTime){
//            option.attr({
//                "selected":true
//            });
//        }
//     });
//
//     timeSelect.on("change", ev=>{
//        let time = $("#"+me.options).val();
//        let opsArr = [ me.]
//     });
// };

CRControl.prototype._initText = function () {
    let me = this;
    let textControl = new TextControl(me.options.textControlObj);
};
