"use strict";
var Palillos = /** @class */ (function () {
    function Palillos() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.base = new createjs.Container();
        this.base.x = 300;
        this.base.y = 200;
        this.stage.addChild(this.base);
        this.basePalillos = new Array();
        this.palillos = new Array();
        var largo = 120;
        for (var i = 0; i < 3; i++) {
            var p1 = new EPalillos(this, largo * i, 0);
            this.basePalillos.push(p1);
            p1.horizontal();
        }
        for (var i = 0; i < 4; i++) {
            var p1 = new EPalillos(this, largo * i, 0);
            this.basePalillos.push(p1);
            p1.vertical();
        }
        for (var i = 0; i < 3; i++) {
            var p1 = new EPalillos(this, largo * i, largo);
            this.basePalillos.push(p1);
            p1.horizontal();
        }
        for (var i = 0; i < 4; i++) {
            var p1 = new EPalillos(this, largo * i, largo);
            this.basePalillos.push(p1);
            p1.vertical();
        }
        for (var i = 0; i < 3; i++) {
            var p1 = new EPalillos(this, largo * i, largo * 2);
            this.basePalillos.push(p1);
            p1.horizontal();
        }
        for (var i = 0; i < 4; i++) {
            var p1 = new EPalillos(this, largo * i, largo * 2);
            this.basePalillos.push(p1);
            p1.vertical();
        }
        for (var i = 0; i < 3; i++) {
            var p1 = new EPalillos(this, largo * i, largo * 3);
            this.basePalillos.push(p1);
            p1.horizontal();
        }
        for (var i = 1; i < 3; i++) {
            var p1 = new EPalillos(this, largo * i, 0, "blue");
            this.palillos.push(p1);
            p1.vertical();
        }
        for (var i = 0; i < 3; i++) {
            var p1 = new EPalillos(this, largo * i, largo, "blue");
            this.palillos.push(p1);
            p1.horizontal();
        }
        for (var i = 1; i < 3; i++) {
            var p1 = new EPalillos(this, largo * i, largo, "blue");
            this.palillos.push(p1);
            p1.vertical();
        }
        for (var i = 0; i < 3; i++) {
            var p1 = new EPalillos(this, largo * i, largo * 2, "blue");
            this.palillos.push(p1);
            p1.horizontal();
        }
        for (var i = 1; i < 3; i++) {
            var p1 = new EPalillos(this, largo * i, largo * 2, "blue");
            this.palillos.push(p1);
            p1.vertical();
        }
        /*
let p2 = new EPalillos(this, largo*i, 0);
            this.basePalillos.push(p2);
            p2.vertical();
*/
        this.stage.update();
    }
    return Palillos;
}());
var EPalillos = /** @class */ (function () {
    function EPalillos(palillo, x, y, color) {
        var _this = this;
        this.largo = 120;
        this.ancho = 10;
        this.palillo = palillo;
        this.palo = new createjs.Shape();
        this.palo.x = x;
        this.palo.y = y;
        this.posx = x;
        this.posy = y;
        this.movido = false;
        this.Ohorizontal = true;
        this.palillo.base.addChild(this.palo);
        if (color == null) {
            this.color = "red";
            this.palillo.stage.on("stagemousemove", function () {
                if (_this.palillo.seleccion != null && _this.Ohorizontal == _this.palillo.seleccion.Ohorizontal) {
                    if (_this.palo.hitTest(_this.palillo.stage.mouseX - _this.palillo.base.x - _this.palo.x, _this.palillo.stage.mouseY - _this.palillo.base.y - _this.palo.y)) {
                        if (_this.Ohorizontal) {
                            _this.palo.graphics.clear()
                                .beginFill("green")
                                .drawRoundRect(0, 0, _this.largo, _this.ancho, 10)
                                .beginFill("rgb(255, 255, 255, .01)")
                                .drawRoundRect(0, -_this.ancho * 2, _this.largo, _this.ancho * 5, 10);
                        }
                        else {
                            _this.palo.graphics
                                .clear()
                                .beginFill("green")
                                .drawRoundRect(0, 0, _this.ancho, _this.largo, 10)
                                .beginFill("rgb(255, 255, 255, .01)")
                                .drawRoundRect(-_this.ancho * 2, 0, _this.ancho * 5, _this.largo, 10);
                        }
                        _this.palillo.stage.update();
                    }
                    else {
                        if (_this.Ohorizontal) {
                            _this.horizontal();
                        }
                        else {
                            _this.vertical();
                        }
                    }
                }
            });
        }
        else {
            this.color = color;
            //  this.palillo.stage.update();
            this.palo.on("mousedown", function () {
                _this.palillo.seleccion = _this;
            });
            this.palo.on("pressmove", function () {
                var tam = _this.palo.getBounds();
                _this.palo.x = _this.palillo.stage.mouseX - _this.palillo.base.x - tam.width / 2;
                _this.palo.y = _this.palillo.stage.mouseY - _this.palillo.base.y - tam.height / 2;
                _this.palillo.stage.update();
            });
            this.palo.on("pressup", function () {
                console.log("solto");
                if (_this.movido == false) {
                    _this.palo.x = _this.posx;
                    _this.palo.y = _this.posy;
                    _this.palillo.stage.update();
                }
                _this.movido = false;
            });
        }
        this.palillo.stage.on("stagemouseup", function () {
            if (_this.palo.hitTest(_this.palillo.stage.mouseX - _this.palillo.base.x - _this.palo.x, _this.palillo.stage.mouseY - _this.palillo.base.y - _this.palo.y)) {
                if (_this.palillo.seleccion != null && _this.Ohorizontal == _this.palillo.seleccion.Ohorizontal) {
                    _this.palillo.seleccion.palo.x = _this.posx;
                    _this.palillo.seleccion.palo.y = _this.posy;
                    _this.palillo.seleccion.movido = true;
                    _this.palillo.seleccion = undefined;
                }
            }
            _this.palillo.stage.update();
        });
    }
    EPalillos.prototype.horizontal = function () {
        this.palo.graphics
            .clear()
            .beginFill(this.color)
            .drawRoundRect(0, 0, this.largo, this.ancho, 10)
            .beginFill("rgb(255, 255, 255, .01)")
            .drawRoundRect(0, -this.ancho * 2, this.largo, this.ancho * 5, 10);
        this.palo.setBounds(0, 0, this.largo, this.ancho);
    };
    EPalillos.prototype.vertical = function () {
        this.Ohorizontal = false;
        this.palo.graphics
            .clear()
            .beginFill(this.color)
            .drawRoundRect(0, 0, this.ancho, this.largo, 10)
            .beginFill("rgb(255, 255, 255, .01)")
            .drawRoundRect(-this.ancho * 2, 0, this.ancho * 5, this.largo, 10);
        this.palo.setBounds(0, 0, this.ancho, this.largo);
    };
    return EPalillos;
}());
var palo = new Palillos();
$(".principal").append(palo.canvas);
