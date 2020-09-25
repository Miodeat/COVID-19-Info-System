// constructor of menu controlling component
// this component uses bootstrap4 to create menu
//
// @param
// @return
MenuControl = function () {
};

// create drop down menu
//
// @param div: the id of div which will contain the menu
//        menuID: menu's ID
//        menuTxt: menu's text
//        items: the menu items that this drop down menu contains
// @return:
MenuControl.prototype.addDropDownMenu = function (div, menuID, menuTxt, items) {
    let me = this;

    let menu = $("#" + div).addClass("dropdown my-menu");
    $("<button>").appendTo(menu)
        .addClass("btn btn-black dropdown-toggle")
        .attr({
            "data-toggle": "dropdown",
            "id": menuID,
        })
        .text(menuTxt);

    me._addDropDownMenuItem(menu, items);
    return menu;
};

// add menu items to specific drop down menu
//
// @param target: the container of menu items
//        items: array of json objects that contain information of menu item,
//               the object including:
//                  id: the id of menu item
//                  href: the link to another html
//                  text: menu item's text
//               such as:
//               {
//                  "id": "example",
//                  "href": "index.html",
//                  "text": "example"
//               }
MenuControl.prototype._addDropDownMenuItem = function (target, items) {
    let me = this;

    let itemsContainer = $("<div>").appendTo(target)
                            .addClass("dropdown-menu my-dp-menu");
    for (let i = 0; i < items.length; i++) {
        $("<a>").appendTo(itemsContainer)
            .addClass("dropdown-item my-item")
            .attr({
                "id": items[i].id,
                "href": items[i].href
            })
            .text(items[i].text);
    }
};

// create button menu
//
// @param div: the id of div which will contain the menu
//        menuID: menu's id
//        menuTxt: menu's text
//        href: link to another html file
// @return
MenuControl.prototype.addBtnMenu = function(div, menuID, menuTxt, href){
    let me = this;

    let container = $("#" + div).addClass("my-menu");
    return $("<a>").appendTo(container)
        .addClass("btn btn-black")
        .attr({
            "id": menuID,
            "role": "button",
            "href": href
        })
        .text(menuTxt);
};

