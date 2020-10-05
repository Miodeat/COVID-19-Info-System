
DataListControl = function (ops) {
    let me = this;
    me.options = $.extend({}, ops);

    me._init();
};

DataListControl.prototype._init = function () {
    let me = this;

    $("#" + me.options.container);
    me._createTitle(me.options.treeTitleDiv, me.options.treeTitleId,
        me.options.treeTitleTxt);

    me._createUpdateTime(me.options.updateTimeDiv, me.options.date,
        me.options.time);
};

DataListControl.prototype._createTitle = function (div, id, text) {
    let me = this;

    let titleDiv = $("#" + div);
    $("<h4>").appendTo(titleDiv)
        .attr({
            "id": id
        })
        .text(text);
};

DataListControl.prototype.createList = function (div, data) {
    let me = this;

    $("#" + div)
        .addClass("scroll-container tree-container");
    let zTreeControl = new ZTreeControl();

    zTreeControl.createTree(div, data)
};

DataListControl.prototype._createUpdateTime = function (div, date, time) {
    let me = this;
    let updateTimeDiv = $("#" + div)
        .addClass("update-time-container");
    let labelContainer = $("<div>").appendTo(updateTimeDiv)
        .addClass("update-time-label-container");
    $("<div>").appendTo(labelContainer)
        .text("LAST")
        .css({
            "font-weight": "bold",
            "font-size": "150%"
        });
    $("<div>").appendTo(labelContainer)
        .text("UPDATE")
        .css({
            "font-weight": "bold",
            "font-size": "110%"
        });

    let timeContainer = $("<div>").appendTo(updateTimeDiv)
        .addClass("time-area");
    $("<div>").appendTo(timeContainer)
        .text(date);

    $("<div>").appendTo(timeContainer)
        .text(time);
};