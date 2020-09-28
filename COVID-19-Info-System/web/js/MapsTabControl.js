MapsTabControl = function () {
};

MapsTabControl.prototype.createTabs = function (div, tabs) {
    let me = this;
    let tabsContainer = $("#" + div);
    let tabsUl = $("<ul>").appendTo(tabsContainer)
        .addClass("nav nav-tabs")
        .attr({
            "id": "tabs"
        });
    let content = $("<div>").appendTo(tabsContainer)
        .addClass("tab-content")
        .attr({
            "id": "mapsContainer"
        });
    for (let i = 0; i < tabs.length; i++) {
        me._createTab(tabs[i], tabsUl, content);
    }
};

MapsTabControl.prototype._createTab = function (tab, tabsUl, contentContainer) {
    let tabLi = $("<li>").appendTo(tabsUl)
        .addClass("nav-item");
    let tabContent = $("<div>").appendTo(contentContainer)
        .addClass("tab-pane fade myMap")
        .attr({
            "id": tab.href.substring(1)
        });
    let tab_a = $("<a>").appendTo(tabLi)
        .addClass("nav-link")
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