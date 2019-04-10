"use strict";
var Obtaculo = /** @class */ (function () {
    function Obtaculo(stage) {
        this.stage = stage;
    }
    return Obtaculo;
}());
function inicializar() {
    var canvas = document.getElementById("juego-laberinto");
    var stage = new createjs.Stage(canvas);
    stage.enableMouseOver();
    canvas.style.background = "rgb(255,0,0,.5)";
    var carga = new createjs.LoadQueue();
    carga.loadFile({ id: "lab-1", src: "./img/laberinto/laberinto.png" });
    carga.addEventListener("fileload", function (evento) {
        var img = evento.result;
        var imagen = new createjs.Bitmap(img);
        var corStage = stage.canvas;
        var coor = imagen.getBounds();
        imagen.x = (corStage.width - coor.width) / 2;
        imagen.y = (corStage.height - coor.height) / 2;
        stage.addChildAt(imagen, 0);
        stage.update();
        imagen.on("mouseout", function () {
            console.log("Perdiste");
        });
    });
    carga.addEventListener("progress", function (evento) {
        console.log(evento);
    });
    carga.addEventListener("complete", function (evento) {
        console.log(evento);
    });
    carga.addEventListener("error", function (evento) {
        console.log(evento);
    });
    var cursor = new createjs.Shape();
    stage.addChild(cursor);
    stage.on("stagemousemove", function () {
        cursor.graphics.beginFill("#FF55C1").drawCircle(0, 0, 5);
        cursor.x = stage.mouseX;
        cursor.y = stage.mouseY;
    });
    createjs.Ticker.addEventListener("tick", function () {
        stage.update();
    });
}
$(document).ready(function () {
    inicializar();
});
