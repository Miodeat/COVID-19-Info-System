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

        //@TODO:Statistic and Map
        "mapDiv":"dataMapExhibition",

        "textControlObj":{
            "container":"Introduction",
            "titleDiv":"textTitle",
            "titleText":"A model of collective rational assessment based on internal group dynamics",
            "textInfoDiv":"textInfo",
            "timeDiv":"textTime",
            "textTime":"27 September",
            "authorDiv":"textAuthor",
            "textAuthor":"The Victory of Budweiser Group, Centre South University",
            "previewImgDiv":"previewImg",
            "previewImg":"html/icon/模型示意图.png",
            "textBodyDiv":"textBody",
            //@TODO:open file
            "textBody":"## 1. Introduction\n" +
                "\n" +
                "​\t人类天生具有一种社会性。在发展的过程中，个体之间的交流、合作起到了至关重要的作用。而随着互联网技术的发展，人与人之间的交流变得更加的灵活快捷。特别是Twitter、微博等社交媒体的流行，更是让信息的传播广度、速度达到了前所未有的水平。这种发展让人类集体的联系变得更加紧密，也让人类集体所表现的行为、决策发生了重大的改变，如，在“疫苗接种”的话题下，极端不理性反疫苗主义使得集体接种疫苗减少，间接导致死亡人数增高[5,6]。2020年以来，全球各地相继爆发了COVID19新冠疫情，同时，关于该话题的讨论也占据了各互联网信息平台的首页\\cite{merchant2020social,WHOdashboard}。在这样的突发事件中对集体理性进行认识评估，对于一个集体的健康发展来说就至关重要的。\n" +
                "\n" +
                "​\t在以往的研究中，关于“集体理性”的探讨较少。Franck(2020) \\cite{franck2002scientific} 小范围讨论科学领域，以“科学经济”的视角提出使用注意力作为理性评估标准。池莉萍等（2019）\\cite{池丽萍2019群体决策质量评估方法及其在大学生和社区居民中的应用} 提出使用问卷评估的方式对群体决策进行质量评估。辛自强（2020）\\cite{辛自强2020理性的达成} 等提出集体理性是一种社会心态，是社会治理体系的重要组成部分，并对该心态建设提出了相关建议。总的来说，具体的相关研究较少，对于“集体理性”的概念相对模糊，具有难量化，量化模型泛化使用难度高的特点。\n" +
                "\n" +
                "​\t因此，本文期望，通过构建人类集体内部的动态信息交流模型，模拟信息在集体中传播，从而对集体的理性进行量化评估，并对本次COVID19疫情中各国表现出的理性状态进行计算。\n" +
                "\n" +
                "## 2 基于内部群体动态的集体理性量化模型\n" +
                "\n" +
                "#### 2.1 基本假设\n" +
                "\n" +
                "1. 集体：集体由多个个体所构成。在集体内部会发生信息的传递和交流。\n" +
                "\n" +
                "2.  信息传播时间有限性：对于某一种话题信息的讨论，在集体内传播持续时间是有限的，最终均会被遗忘或者被新的话题信息取代。\n" +
                "3. 集体内部信息交流平等性：理想状态下，对于一条传入集体的信息，我们假设认为组成集体的个体有相同的机会够获得这条信息，并对其进行判断。在传统信息传播模式下，这一点有些过于理想，然而借助于网络社交平台却能较为容易的实现。这里我们构建的模型也基于这一条假设。\n" +
                "\n" +
                "#### 2.2 基本定义\n" +
                "\n" +
                "l ***定义1\\******集体理性：\\*** 集体理性是衡量一个集体意识形态决策能力和状态的量。它反映了一个集体内部结构、信息传播、以及面对不良干预所产生反应的特性。比如，一个具有较低理性的集体内部，错误观念存在传播的时间会更长，因为它对不良干预所做出的正确决定能力更差。反之，具有较高理性的集体，总是能很快消化掉不良干预，使得正确决策观点主导整个信息传播流程。\n" +
                "\n" +
                "在本模型当中，我们借用Twitter平台来观测集体的表现。我们将每一条推文看作一种我们能观测到的表现行为，推文可能是支持正确观点的“普通言论”，也有可能是支持错误观点的“谣言”。每一条推文的发布者，与推文的转发者一并看做集体内部的小集群，这种小集群具有相同的观念。各种各样可观测的小集群，构成了整个大集体。如图1所示，图中每一个小圆圈代表一个集群，其颜色代表观测的观念，整个集群构成了集体。\n" +
                "\n" +
                "随着时间的推移，集体内部的小集群会发生活动状态的改变或观念的转移，并最终趋向于消失。我们认为，集体内部“谣言”时间存在越久，则集体理性程度越低，反之则越高。\n" +
                "\n" +
                "l ***定义2\\******活跃状态转换：\\***在一段时间过后，群体内部的集群，有一定概率P会从关心本话题的“活跃状态”转变为不关心本话题的“非活跃”状态，如图1-1所示。当这个概率为负数时，则表示群体内部对话题关注度逐渐提高，原本无法观测到的“不活跃”状态的个体开始转变为“活跃”状态。\n" +
                "\n" +
                "l ***定义3\\******观念转换：\\***在一段时间过后，群体内部仍然保持“活跃”状态的集群可能进行观念的交流，如图1-2所示。持有A观念的集群与持有B观念的集群进行交流后，两个集群将会发展成新的集群。Johnson, N.F.等（2020）\\cite{johnson2020online}通过数值回归模拟得到，集群内的交流后，个体数目更多的集群所持有的观念将会代表新集群的观念，而构成集群的个体数目将转变为原来两个集群个体数目之差。\n" +
                "\n" +
                "l ***定义4\\******观念保持：\\***在一段时间过后，群体内部仍然保持“活跃”状态，并持有相同观念的集群有一定几率在这段时间内进行交流，如图1-3所示。它们不会简单加和成一个更大的集群，而是以一种协调模式存在。这种交流不会马上在宏观意义上改变我们的观察结果，而是在下一观察时间段中对观察结果产生影响。"
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

    // create MapBox
    me._initMap()
    //create Statistic

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

CRControl.prototype._initText = function () {
    let me = this;
    let textControl = new TextControl(me.options.textControlObj);
};

CRControl.prototype._initMap = function(){
    // let me =this;
    // let crmapControl= new CRMapControl(me.options.mapDiv)
}


