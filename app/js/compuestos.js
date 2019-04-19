"use strict";
var Tablero_Crelacion = /** @class */ (function () {
    function Tablero_Crelacion() {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.baseA = new Tablero_Cbase(this);
        this.baseB = new Tablero_Cbase(this);
        this.baseB.contenedor.x = 500;
        this.stage.update();
        this.stage.on("stagemousemove", function () {
            if (_this.seleccion != null) {
                _this.seleccion.linea.dibujarInicial(_this.stage.mouseX, _this.stage.mouseY);
            }
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
        this.stage.addChild(this.contenedor);
        this.altura = 0;
    }
    Tablero_Cbase.prototype.agregar = function (infomacion, categoria) {
        var tarjeta = new Tablero_Categoria(this, infomacion, categoria);
        this.categorias.push(tarjeta);
        tarjeta.contenedor.y = this.altura;
        this.contenedor.addChild(tarjeta.contenedor);
        this.altura += tarjeta.contenedor.getBounds().height;
        this.stage.update();
    };
    return Tablero_Cbase;
}());
var Tablero_Categoria = /** @class */ (function () {
    function Tablero_Categoria(tablero, texto, categoria) {
        var _this = this;
        this.orientacionLeft = false;
        this.tablero = tablero;
        this.stage = tablero.stage;
        this.contenedor = new createjs.Container();
        this.texto = new createjs.Text(texto, "50px Heebo");
        var tam = this.texto.getBounds();
        this.categoria = categoria;
        var s = new createjs.Shape();
        s.graphics.beginFill("red").drawRect(0, 0, tam.width, tam.height);
        this.contenedor.addChild(s);
        this.contenedor.addChild(this.texto);
        this.clasificado = false;
        this.linea = new LineaCurva(this.stage);
        var p = { x: 0, y: 0 };
        this.contenedor.on("mousedown", function () {
            _this.tablero.tablero.seleccion = _this;
            var tam = _this.contenedor.getBounds();
            _this.linea.iniciar(_this.tablero.contenedor.x + tam.width, _this.tablero.contenedor.y + _this.contenedor.y + tam.height / 2);
            console.log(_this.linea.inicial);
        });
        this.stage.on("stagemouseup", function () {
            if (_this.tablero.tablero.seleccion != null) {
                if (_this.contenedor.hitTest(_this.stage.mouseX - _this.contenedor.x - tablero.contenedor.x, _this.stage.mouseY - _this.contenedor.y - tablero.contenedor.y) &&
                    _this.tablero.tablero.seleccion.tablero.categorias.indexOf(_this) == -1) {
                    var tam_1 = _this.contenedor.getBounds();
                    _this.clasificado = true;
                    _this.tablero.tablero.seleccion.clasificado = true;
                    _this.tablero.tablero.seleccion.linea.terminar(_this.tablero.contenedor.x + _this.contenedor.x, _this.tablero.contenedor.y + _this.contenedor.y + (tam_1.height / 2));
                    _this.tablero.tablero.seleccion.linea.draw();
                    _this.tablero.tablero.seleccion = undefined;
                }
                else {
                    _this.tablero.tablero.seleccion.linea.limpiar();
                }
            }
            //this.tablero.tablero.seleccion = undefined;
        });
    }
    return Tablero_Categoria;
}());
var LineaCurva = /** @class */ (function () {
    function LineaCurva(stage) {
        this.stage = stage;
        this.linea = new createjs.Shape();
        this.stage.addChild(this.linea);
        this.inicial = { x: 100, y: 100 };
        this.final = { x: 0, y: 0 };
        this.dibujando = false;
    }
    LineaCurva.prototype.iniciar = function (x, y) {
        this.inicial.x = x;
        this.inicial.y = y;
        this.dibujando = true;
    };
    LineaCurva.prototype.dibujarInicial = function (x, y) {
        this.final = { x: x, y: y };
        if (this.dibujando) {
            this.linea.graphics.clear();
            var centro = {
                x: (this.inicial.x + this.final.x) / 2, y: (this.inicial.y + this.final.y) / 2
            };
            this.linea.graphics
                .beginStroke("blue")
                .setStrokeStyle(5)
                .drawCircle(this.inicial.x, this.inicial.y, 2.5)
                .bezierCurveTo(this.inicial.x, this.inicial.y, centro.x, this.inicial.y, centro.x, centro.y)
                .bezierCurveTo(centro.x, centro.y, centro.x, this.final.y, this.final.x, this.final.y)
                .drawCircle(this.final.x, this.final.y, 2.5);
            this.stage.update();
        }
    };
    LineaCurva.prototype.terminar = function (x, y) {
        this.final = { x: x, y: y };
        this.dibujando = false;
        this.stage.update();
    };
    LineaCurva.prototype.draw = function () {
        this.linea.graphics.clear();
        var centro = {
            x: (this.inicial.x + this.final.x) / 2, y: (this.inicial.y + this.final.y) / 2
        };
        this.linea.graphics
            .beginStroke("blue")
            .setStrokeStyle(5)
            .bezierCurveTo(this.inicial.x, this.inicial.y, centro.x, this.inicial.y, centro.x, centro.y)
            .bezierCurveTo(centro.x, centro.y, centro.x, this.final.y, this.final.x, this.final.y);
        this.stage.update();
    };
    LineaCurva.prototype.limpiar = function () {
        this.linea.graphics.clear();
        this.stage.update();
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
tablero.baseA.agregar("Perro", "Mascota");
tablero.baseA.agregar("Gato", "Mascota");
tablero.baseB.agregar("Serpiente", "Mascota");
tablero.baseB.agregar("Caballo", "Mascota");
$('.principal').append(tablero.canvas);
