TabControl = function () {
};

TabControl.prototype.createTabs = function (div, contentId, tabs) {
    let me = this;
    let tabsContainer = $("#" + div);

    let tabsUlContainer = $("<div>").appendTo(tabsContainer)
        .addClass("tabs-container");
    let tabsUl = $("<ul>").appendTo(tabsUlContainer)
        .addClass("nav nav-tabs tab-ul");
    let content = $("<div>").appendTo(tabsContainer)
        .addClass("tab-content")
        .attr({
            "id": contentId
        });
    for (let i = 0; i < tabs.length; i++) {
        me._createTab(tabs[i], tabsUl, content);
    }
};

TabControl.prototype._createTab = function (tab, tabsUl, contentContainer) {
    let tabLi = $("<li>").appendTo(tabsUl)
        .addClass("nav-item tab-li");
    let tabContent = $("<div>").appendTo(contentContainer)
        .addClass("tab-pane fade my-pane")
        .attr({
            "id": tab.href.substring(1)
        });
    let tab_a = $("<a>").appendTo(tabLi)
        .addClass("nav-link tab-a")
        .attr({
            "data-toggle": "tab",
            "href": tab.href
        })
        .text(tab.text);
    if (tab.active) {
        tab_a.addClass("active");
        tabContent.addClass("in active show")
    }



};