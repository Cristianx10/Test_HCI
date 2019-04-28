"use strict";
var Cable1_style = /** @class */ (function () {
    function Cable1_style(color) {
        this.color = color;
        this.normal = new createjs.Graphics();
        this.click = new createjs.Graphics();
        this.hover = new createjs.Graphics();
        this.normal.beginFill("black").drawRect(0, 3, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(10, 6, 35, 19, 50, 5).bezierCurveTo(50, 5, 60, -10, 78, 5);
        this.click.beginFill("black").drawRect(0, 3, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(10, 6, 35, 19, 40, 5).beginStroke("").moveTo(60, 5).beginStroke(this.color).bezierCurveTo(55, 5, 60, -10, 78, 5);
        this.hover.beginFill("black").drawRect(0, 3, 13, 8).beginFill("").setStrokeStyle(8).beginStroke(this.color).bezierCurveTo(10, 6, 35, 19, 50, 5).bezierCurveTo(50, 5, 60, -10, 78, 5);
    }
    return Cable1_style;
}());
var Cable2_style = /** @class */ (function () {
    function Cable2_style(color) {
        this.color = color;
        this.normal = new createjs.Graphics();
        this.click = new createjs.Graphics();
        this.hover = new createjs.Graphics();
        this.normal.beginFill("black").drawRect(0, 13, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(11, 17, 20, 14, 34, 27).bezierCurveTo(34, 27, 55, 31, 60, 11).bezierCurveTo(60, 11, 60, 0, 76, 2);
        this.click.beginFill("black").drawRect(0, 13, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(11, 17, 20, 14, 34, 27).beginStroke("").moveTo(53, 20).beginStroke(this.color).bezierCurveTo(53, 20, 60, 0, 76, 2);
        this.hover.beginFill("black").drawRect(0, 13, 13, 8).beginFill("").setStrokeStyle(8).beginStroke(this.color).bezierCurveTo(11, 17, 20, 14, 34, 27).bezierCurveTo(34, 27, 55, 31, 60, 11).bezierCurveTo(60, 11, 60, 0, 76, 2);
    }
    return Cable2_style;
}());
var Cable3_style = /** @class */ (function () {
    function Cable3_style(color) {
        this.color = color;
        this.normal = new createjs.Graphics();
        this.click = new createjs.Graphics();
        this.hover = new createjs.Graphics();
        this.normal.beginFill("black").drawRect(0, 0, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(11, 5, 50, -12, 76, 13);
        this.click.beginFill("black").drawRect(0, 0, 13, 8).beginFill("").setStrokeStyle(4).beginStroke(this.color).bezierCurveTo(11, 5, 30, -5, 40, 13).beginStroke("").moveTo(55, 13).beginStroke(this.color).bezierCurveTo(55, 13, 70, -5, 76, 13);
        this.hover.beginFill("black").drawRect(0, 0, 13, 8).beginFill("").setStrokeStyle(8).beginStroke(this.color).bezierCurveTo(11, 5, 50, -12, 76, 13);
    }
    return Cable3_style;
}());
var Cable4_style = /** @class */ (function () {
    function Cable4_style(color) {
        this.color = color;
        this.normal = new createjs.Graphics();
        this.click = new createjs.Graphics();
        this.hover = new createjs.Graphics();
        this.normal.beginFill("black").drawRect(0, 12, 13, 8).beginFill("").setStrokeStyle(2).beginStroke(this.color).bezierCurveTo(11, 17, 55, 22, 76, 0);
        this.click.beginFill("black").drawRect(0, 12, 13, 8).beginFill("").setStrokeStyle(2).beginStroke(this.color).bezierCurveTo(11, 17, 35, 22, 40, 15).beginStroke("").moveTo(55, 13).beginStroke(this.color).bezierCurveTo(55, 13, 70, -5, 76, 0);
        this.hover.beginFill("black").drawRect(0, 12, 13, 8).beginFill("").setStrokeStyle(8).beginStroke(this.color).bezierCurveTo(11, 17, 55, 22, 76, 0);
    }
    return Cable4_style;
}());
var Bomba = /** @class */ (function () {
    function Bomba() {
        var _this = this;
        this.nActual = 0;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.cables = new Array();
        this.contenedor = new createjs.Container();
        this.stage.enableMouseOver();
        this.contenedor.x = 410;
        this.contenedor.y = 270;
        this.contenedor.scaleX = 1.5;
        this.contenedor.scaleY = 1.1;
        var carga = new createjs.LoadQueue();
        this.fondo = new createjs.Shape();
        this.fondo.graphics.beginFill("#251E20").drawRoundRect(400, 210, 480, 300, 30);
        this.stage.addChild(this.fondo);
        this.stage.addChild(this.contenedor);
        carga.loadFile({ id: "fondo", src: "../img/salud/bomba.png" });
        carga.loadFile({ id: "mouse", src: "../img/salud/mano.png" });
        carga.on("fileload", function (r) {
            if (r.item.id == "fondo") {
                _this.bomba = new createjs.Bitmap(r.result);
                var tam = _this.bomba.getBounds();
                _this.bomba.x = (_this.canvas.width / 2) - tam.width / 2;
                _this.bomba.y = (_this.canvas.height / 2) - tam.height / 2;
                _this.stage.addChild(_this.bomba);
                _this.stage.update();
            }
            if (r.item.id == "mouse") {
                _this.mouse = new createjs.Bitmap(r.result);
                _this.stage.addChild(_this.mouse);
                _this.stage.on("stagemousemove", function () {
                    if (_this.mouse != null) {
                        _this.mouse.x = _this.stage.mouseX;
                        _this.mouse.y = _this.stage.mouseY;
                    }
                    _this.stage.update();
                });
            }
        });
    }
    Bomba.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    Bomba.prototype.setIntentoFallo = function (intentoFallo) {
        this.intentoFallo = intentoFallo;
    };
    Bomba.prototype.setIntentoAcierto = function (intentoAcierto) {
        this.intentoAcierto = intentoAcierto;
    };
    Bomba.prototype.mesclar = function () {
        var _this = this;
        var distancia = 40;
        this.contenedor.removeAllChildren();
        shuffle(this.cables);
        var altura = 0;
        this.cables.forEach(function (c) {
            c.cable.y = distancia * c.orden;
            _this.contenedor.addChild(c.cable);
        });
        this.stage.update();
        this.nActual = 0;
        this.actual = this.cables[this.nActual];
        $(".bomba__instruccion").html("Corta el cable <span style=\"color:" + this.actual.color + ";\">" + this.actual.nombre + "</span>");
    };
    Bomba.prototype.siguiente = function () {
        this.nActual++;
        if (this.nActual < this.cables.length) {
            this.actual = this.cables[this.nActual];
            $(".bomba__instruccion").html("Corta el cable <span style=\"color:" + this.actual.color + ";\">" + this.actual.nombre + "</span>");
        }
    };
    Bomba.prototype.agregarCable = function (nombre, color, color2) {
        var tipo = random(0, 3);
        var cable;
        switch (tipo) {
            case 0:
                cable = new Cable(this, nombre, color, color2, new Cable1_style(color2), this.cables.length);
                break;
            case 1:
                cable = new Cable(this, nombre, color, color2, new Cable2_style(color2), this.cables.length);
                break;
            case 2:
                cable = new Cable(this, nombre, color, color2, new Cable3_style(color2), this.cables.length);
                break;
            default:
                cable = new Cable(this, nombre, color, color2, new Cable4_style(color2), this.cables.length);
                break;
        }
        this.cables.push(cable);
    };
    return Bomba;
}());
var Cable = /** @class */ (function () {
    function Cable(bomba, nombre, color, color2, tipo, orden) {
        var _this = this;
        this.cortado = false;
        this.bomba = bomba;
        this.stage = bomba.stage;
        this.nombre = nombre;
        this.real = color2;
        this.color = color;
        this.style = tipo;
        this.cable = new createjs.Shape();
        this.cable.graphics = tipo.normal;
        this.orden = orden;
        this.cable.graphics.endStroke().beginFill("rgb(0,0,0,0.01)").drawRect(0, 0, 80, 30);
        this.cable.on("click", function () {
            if (_this.bomba != null) {
                if (_this.bomba.actual == _this) {
                    if (_this.bomba.intentoAcierto != null) {
                        _this.bomba.intentoAcierto();
                    }
                    if (_this.bomba.nActual + 1 >= _this.bomba.cables.length) {
                        if (_this.bomba.validacion != null) {
                            _this.bomba.validacion();
                        }
                    }
                }
                else {
                    if (_this.bomba.intentoFallo != null) {
                        _this.bomba.intentoFallo();
                    }
                }
                _this.bomba.siguiente();
            }
            _this.cable.graphics = _this.style.click;
            _this.stage.update();
            _this.cortado = true;
        });
        this.cable.on("mouseover", function () {
            if (_this.cortado == false) {
                _this.cable.graphics = _this.style.hover;
                _this.cable.graphics.endStroke().beginFill("rgb(0,0,0,0.01)").drawRect(0, 0, 80, 30);
                _this.stage.update();
            }
        });
        this.cable.on("mouseout", function () {
            if (_this.cortado == false) {
                _this.cable.graphics = _this.style.normal;
                _this.stage.update();
            }
        });
    }
    return Cable;
}());
