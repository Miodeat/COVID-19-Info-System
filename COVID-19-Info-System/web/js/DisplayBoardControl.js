DisplayBoardControl = function () {

};

DisplayBoardControl.prototype.addDisplayBoard = function (div, title, text, href) {
    let me = this;

    let targetDiv = $("#" + div);
    let cell = $("<div>").appendTo(targetDiv)
        .addClass("col-xl-4 col-lg-4 col-md-4");
    let board = $("<div>").appendTo(cell)
        .addClass("display-board");
    $("<div>").appendTo(board)
        .addClass("board-title")
        .text(title);
    $("<div>").appendTo(board)
        .addClass("board-text")
        .text(text);
    $("<button>").appendTo(board)
        .addClass("btn btn-outline-light learn-more-btn")
        .attr({
            "type": "button",
            "onclick": function () {
                window.location.href = href;
            }
        })
        .text("learn more")
};