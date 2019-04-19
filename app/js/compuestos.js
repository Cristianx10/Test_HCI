"use strict";
var Tablero_Crelacion = /** @class */ (function () {
    function Tablero_Crelacion() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.linea = new createjs.Shape();
        this.stage.addChild(this.linea);
        this.linea.graphics
            .beginStroke("blue")
            .beginFill("red")
            .drawCircle(100, 100, 4)
            .beginFill("green")
            .drawCircle(300, 300, 4)
            .beginFill("blue")
            .drawCircle(200, 300, 4)
            .beginFill("")
            .bezierCurveTo(100, 100, 100, 300, 200, 300)
            .lineTo(300, 100)
            .lineTo(300, 500);
        this.stage.update();
    }
    return Tablero_Crelacion;
}());
var tablero = new Tablero_Crelacion();
$('.principal').append(tablero.canvas);
