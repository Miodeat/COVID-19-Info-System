
ZTreeControl = function () {
    let me = this;

    ITreeControl.call(me); // inherit constructor

    me._init();
};

// inherit prototype
(function () {
    let tmp = function () {};
    tmp.prototype = ITreeControl.prototype;
    ZTreeControl.prototype = new tmp();
})();

ZTreeControl.constructor = ZTreeControl; // restore constructor

ZTreeControl.prototype._init = function () {
    let me = this;

    me.treeDiv = $("<div>")
        .addClass("ztree")
        .attr({
            "id": "dataTree"
        });
    me.setting = {
        "view": {
            "showIcon": false,
            "showLine": false,
            "fontCss": function (treeId, treeNode) {
                let cssObj = {
                    "color": "white"
                };
                if (treeNode.level == 0) {
                    cssObj["font-weight"] = "bold";
                }

                return cssObj;
            }
        },
        "edit": {
            "enable": false
        },
        "callback": {
            "beforeClick": () => false
        }
    };
};

ZTreeControl.prototype.createTree = function (div, data) {
    let me = this;

    let scrollDiv = $("#" + div);
    me.treeDiv.appendTo(scrollDiv);

    me._tree = $.fn.zTree.init(me.treeDiv, me.setting, data);
};