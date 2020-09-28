TextControl = function (ops) {
    let me = this;
    me.options = ops;
    me._init();
}

TextControl.prototype._init = function () {
    let me = this;
    $("#" + me.options.container);
    me._createTitle(me.options.titleDiv, me.options.titleText);
    me._createInfo(me.options.textInfoDiv, me.options.timeDiv, me.options.textTime, me.options.authorDiv, me.options.textAuthor);
    me._createPreviewImg(me.options.previewImgDiv, me.options.previewImg)
    me._createBody(me.options.textBodyDiv, me.options.textBody)
}

TextControl.prototype._createTitle = function (div, text) {
    let me = this;
    let titleDiv = $("#" + div).addClass("my-textTitle");
    $("<h1>").appendTo(titleDiv)
        .text(text);
};


TextControl.prototype._createInfo = function (div, timeID, time, authorID, author) {
    let me = this;
    let infoDiv = $("#" + div).addClass("my-textInfo");
    $("<a>").appendTo(infoDiv)
        .attr({
            "id": timeID
        })
        .text(time);
    $("<a>").appendTo(infoDiv)
        .attr({
            "id": authorID
        })
        .text(author);
};

//
TextControl.prototype._createPreviewImg = function (div, img) {
    let me = this;
    let preImg = document.createElement("img");//创建img元素
    preImg.src = img;
    preImg.style.width = 600 + 'px';
    // let previewimgDiv = $("#" + div);
    let previewimgDiv = document.getElementById(div);
    previewimgDiv.classList.add("my-previewImg");
    previewimgDiv.appendChild(preImg);
};

//showdown.js to transposed Markdown to html so that to achieve composing
TextControl.prototype._createBody = function (div, text) {
    let content = text;//@TODO: get text from .md file
    let converter = new showdown.Converter();
    let htmlcontent = converter.makeHtml(content); //transposed MarkDown to html
    let textbody = $("#"+div)
        .addClass("my-textBody");
    textbody.html(htmlcontent);

}