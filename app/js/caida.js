"use strict";
var Tablero__caida = /** @class */ (function () {
    function Tablero__caida() {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.bolita = new createjs.Shape();
        this.bolita.graphics.beginFill("red").drawCircle(100, 100, 50)
            .drawRect(100, 100, 100, 100);
        this.stage.addChild(this.bolita);
        this.stage.update();
        var lineTime = createjs.Tween;
        this.movimmiento = lineTime.get(this.bolita, { loop: true }).to({ x: 1200 }, 5000, createjs.Ease.quadOut).call(function () { console.log("izquierda"); }).to({ x: 0 }, 5000, createjs.Ease.quartIn);
        this.stage.on("stagemouseup", function () {
            _this.movimmiento.paused = true;
            _this.movimmiento = lineTime.get(_this.bolita, { loop: true }).to({ y: 700 }, 5000, createjs.Ease.quadOut).call(function () { console.log("izquierda"); }).to({ y: 0 }, 5000, createjs.Ease.quartIn);
        });
        createjs.Ticker.addEventListener("tick", this.stage);
    }
    return Tablero__caida;
}());
var tab = new Tablero__caida();
$('.canvas_bolita').append(tab.canvas);
