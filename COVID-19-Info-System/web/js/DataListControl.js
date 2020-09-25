
DataListControl = function () {
    let me = this;
};

DataListControl.prototype._createTitle = function (div, id, text) {
    let me = this;

    let titleDiv = $("#" + div);
    $("<h6>").appendTo(titleDiv)
        .attr({
            "id": id
        })
        .text(text);
};

DataListControl.prototype._createList = function (div) {

};