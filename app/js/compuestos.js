"use strict";
var Tablero_Crelacion = /** @class */ (function () {
    function Tablero_Crelacion() {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.stage.update();
        var l = new LineaCurva(this.stage);
        var p = { x: 0, y: 0 };
        this.stage.on("stagemousedown", function () {
            l.iniciar(_this.stage.mouseX, _this.stage.mouseY);
        });
        this.stage.on("stagemousemove", function () {
            l.dibujarInicial(_this.stage.mouseX, _this.stage.mouseY);
        });
        this.stage.on("stagemouseup", function () {
            l.terminar(_this.stage.mouseX, _this.stage.mouseY);
        });
    }
    return Tablero_Crelacion;
}());
var Tablero_Cbase = /** @class */ (function () {
    function Tablero_Cbase(tablero) {
        this.tablero = tablero;
        this.stage = tablero.stage;
        this.contenedor = new createjs.Container();
        this.categorias = new Array();
    }
    Tablero_Cbase.prototype.agregar = function (tarjeta) {
        this.categorias.push(tarjeta);
        this.contenedor.addChild(tarjeta.contenedor);
    };
    return Tablero_Cbase;
}());
var Tablero_Categoria = /** @class */ (function () {
    function Tablero_Categoria(stage) {
        this.stage = stage;
        this.contenedor = new createjs.Container();
        this.texto = new createjs.Text("Nuevo texto");
        this.contenedor.addChild(this.texto);
    }
    return Tablero_Categoria;
}());
var LineaCurva = /** @class */ (function () {
    function LineaCurva(stage) {
        this.stage = stage;
        this.linea = new createjs.Shape();
        this.stage.addChild(this.linea);
        this.inicial = { x: 0, y: 0 };
        this.final = { x: 0, y: 0 };
        this.dibujando = false;
    }
    LineaCurva.prototype.iniciar = function (x, y) {
        this.inicial = { x: x, y: y };
        this.dibujando = true;
    };
    LineaCurva.prototype.dibujarInicial = function (x, y) {
        var final = { x: x, y: y };
        if (this.dibujando) {
            this.linea.graphics.clear();
            var centro = {
                x: (this.inicial.x + final.x) / 2, y: (this.inicial.y + final.y) / 2
            };
            this.linea.graphics
                .beginStroke("blue")
                .setStrokeStyle(5)
                .drawCircle(this.inicial.x, this.inicial.y, 2.5)
                .bezierCurveTo(this.inicial.x, this.inicial.y, centro.x, this.inicial.y, centro.x, centro.y)
                .bezierCurveTo(centro.x, centro.y, centro.x, final.y, final.x, final.y)
                .drawCircle(final.x, final.y, 2.5);
            this.stage.update();
        }
    };
    LineaCurva.prototype.terminar = function (x, y) {
        this.final = { x: x, y: y };
        this.dibujando = false;
    };
    LineaCurva.prototype.dibujar = function (inicial, final) {
        this.linea.graphics.clear();
        var centro = {
            x: (inicial.x + final.x) / 2, y: (inicial.y + final.y) / 2
        };
        this.linea.graphics
            .beginStroke("blue")
            .bezierCurveTo(inicial.x, inicial.y, centro.x, inicial.y, centro.x, centro.y)
            .bezierCurveTo(centro.x, centro.y, centro.x, final.y, final.x, final.y);
        this.stage.update();
    };
    return LineaCurva;
}());
var tablero = new Tablero_Crelacion();
$('.principal').append(tablero.canvas);
