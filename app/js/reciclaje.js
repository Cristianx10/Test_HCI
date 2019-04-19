"use strict";
// There's the gallery and the trash
var $gallery = $(".basura__elementos"), $trash = $("#trash"), $trash2 = $("#trash2");
// Let the gallery items be draggable
$("div", $gallery).draggable({
    cancel: "a.ui-icon",
    revert: "invalid",
    containment: "document",
    // helper: "clone",
    cursor: "move"
});
// Let the trash be droppable, accepting the gallery items
$trash.droppable({
    accept: "#gallery > div",
    drop: function (event, ui) {
        deleteImage(ui.draggable, $trash);
    }
});
$trash2.droppable({
    accept: "#gallery > div",
    drop: function (event, ui) {
        deleteImage(ui.draggable, $trash2);
    }
});
// Image deletion function
function deleteImage($item, t) {
    $item.fadeOut(function () {
        var $list = $("ul", t).length ?
            $("ul", t) :
            $("<ul class='gallery ui-helper-reset'/>").appendTo(t);
        $item.find("a.ui-icon-trash").remove();
        $item.appendTo($list).fadeIn(function () {
            $item
                .animate({ width: "48px" })
                .find("img")
                .animate({ height: "36px" });
        });
    });
}
