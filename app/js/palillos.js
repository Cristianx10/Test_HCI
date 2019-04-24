"use strict";
var Palillos = /** @class */ (function () {
    function Palillos(width, height) {
        this.largo = 120;
        this.inicial = 0;
        this.fila = 0;
        this.conte = 0;
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.stage = new createjs.Stage(this.canvas);
        this.base = new createjs.Container();
        this.base.x = 450;
        this.base.y = 200;
        this.stage.addChild(this.base);
        this.basePalillos = new Array();
        this.palillos = new Array();
        this.contenedor = new createjs.Container();
        this.stage.addChild(this.contenedor);
        var marco = new createjs.Shape();
        this.contenedor.addChild(marco);
        this.contenedor.x = 900;
        this.contenedor.y = 360;
        marco.graphics.beginStroke("#FF9900").setStrokeStyle(5).drawRoundRect(-50, -10, 400, 350, 20);
    }
    Palillos.prototype.cuadrado = function () {
        this.baseAgregar(3, "horizontal");
        this.baseAgregar(4, "vertical");
        this.baseAgregar(3, "horizontal");
        this.baseAgregar(4, "vertical");
        this.baseAgregar(3, "horizontal");
        this.baseAgregar(4, "vertical");
        this.baseAgregar(3, "horizontal");
        this.stage.update();
    };
    Palillos.prototype.baseAgregar = function (num, oriente) {
        if (oriente == "horizontal") {
            for (var i = 0; i < num; i++) {
                var p1 = new EPalillos(this, this.largo * i, this.fila, this.inicial);
                p1.cuadrado();
                this.basePalillos.push(p1);
                p1.horizontal();
                this.inicial++;
            }
        }
        else if (oriente == "vertical") {
            for (var i = 0; i < num; i++) {
                var p1 = new EPalillos(this, this.largo * i, this.fila, this.inicial);
                p1.cuadrado();
                this.basePalillos.push(p1);
                p1.vertical();
                this.inicial++;
            }
            this.fila += this.largo;
        }
        this.stage.update();
    };
    Palillos.prototype.crear = function (x, y, oriente) {
        if (oriente == "diagonalLeftDown") {
            var p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.diagonalLeftDown();
            this.palillos.push(p1);
            this.inicial++;
        }
        else if (oriente == "diagonalRightDown") {
            var p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.largo = 200;
            p1.diagonalRightDown();
            this.palillos.push(p1);
            this.inicial++;
        }
        else if (oriente == "diagonalLeftTop") {
            var p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.largo = 200;
            p1.diagonalLeftTop();
            this.palillos.push(p1);
            this.inicial++;
        }
        else if (oriente == "diagonalRightTop") {
            var p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.largo = 200;
            p1.diagonalRightTop();
            this.palillos.push(p1);
            this.inicial++;
        }
        else if (oriente == "vertical") {
            var p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.verticalDown();
            this.palillos.push(p1);
            this.inicial++;
        }
        else if (oriente == "horizontal") {
            var p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.horizontalLeft();
            this.palillos.push(p1);
            this.inicial++;
        }
        else {
            console.log("no se reconoce");
        }
        this.stage.update();
    };
    Palillos.prototype.agregar = function (pos) {
        if (pos < this.basePalillos.length) {
            var ref = this.basePalillos[pos];
            ref.contiene = true;
            var p1 = new EPalillos(this, ref.posx, ref.posy, ref.id, "#E64973");
            p1.cuadrado();
            p1.contiene = true;
            if (ref.Ohorizontal) {
                p1.horizontal();
            }
            else {
                p1.vertical();
            }
            this.palillos.push(p1);
            this.stage.update();
        }
        else {
            console.log("No se encuantra la referencia");
        }
    };
    Palillos.prototype.equals = function (texto, compara) {
        var tex = texto.split(",");
        var com = compara.split(",");
        var total = com.length;
        var num = 0;
        for (var i = 0; i < tex.length; i++) {
            var t = tex[i];
            for (var j = 0; j < com.length; j++) {
                var c = com[j];
                if (t == c) {
                    num++;
                    com[j] = "";
                    j = com.length;
                }
            }
        }
        if (num >= total) {
            return true;
        }
        else {
            return false;
        }
    };
    Palillos.prototype.setResultado = function (fresultado) {
        this.fresultado = fresultado;
    };
    Palillos.prototype.resultado = function () {
        var result = "";
        this.palillos.forEach(function (p, i) {
            var temp_r = result;
            if (i == 0) {
                result = p.id + "";
            }
            else {
                result = temp_r + "," + p.id;
            }
        });
        if (this.fresultado != null) {
            this.fresultado(result);
        }
    };
    return Palillos;
}());
var EPalillos = /** @class */ (function () {
    function EPalillos(palillo, x, y, orden, color) {
        this.largo = 120;
        this.ancho = 10;
        this.contiene = false;
        this.palillo = palillo;
        this.id = orden;
        this.palo = new createjs.Shape();
        this.palo.x = x;
        this.palo.y = y;
        this.posx = x;
        this.posy = y;
        this.movido = false;
        this.Ohorizontal = true;
        this.palillo.base.addChild(this.palo);
        if (color != null) {
            this.color = color;
        }
        else {
            //this.color = "rgb(255,255,255, 0.1)";
            this.color = "blue";
        }
    }
    EPalillos.prototype.cuadrado = function () {
        var _this = this;
        if (this.color == null) {
            this.palillo.stage.on("stagemousemove", function () {
                if (_this.palillo.seleccion != null && _this.Ohorizontal == _this.palillo.seleccion.Ohorizontal) {
                    if (_this.palo.hitTest(_this.palillo.stage.mouseX - _this.palillo.base.x - _this.palo.x, _this.palillo.stage.mouseY - _this.palillo.base.y - _this.palo.y)) {
                        if (_this.Ohorizontal) {
                            _this.palo.graphics.clear()
                                .beginFill("#D9D6D6")
                                .drawRoundRect(0, 0, _this.largo, _this.ancho, 10)
                                .beginFill("rgb(255, 255, 255, .01)")
                                .drawRoundRect(0, -_this.ancho * 2, _this.largo, _this.ancho * 5, 10);
                        }
                        else {
                            _this.palo.graphics
                                .clear()
                                .beginFill("#D9D6D6")
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
            //  this.palillo.stage.update();
            this.palo.on("mousedown", function () {
                _this.palillo.seleccion = _this;
            });
            this.palo.on("pressmove", function (e) {
                var tam = _this.palo.getBounds();
                _this.palo.x = _this.palillo.stage.mouseX - _this.palillo.base.x - tam.width / 2;
                _this.palo.y = _this.palillo.stage.mouseY - _this.palillo.base.y - tam.height / 2;
                _this.palillo.stage.update();
            });
            this.palo.on("pressup", function (e) {
                if (_this.movido == false) {
                    _this.palo.x = _this.posx;
                    _this.palo.y = _this.posy;
                }
                _this.movido = false;
                _this.palillo.stage.update();
            });
        }
        this.palillo.stage.on("stagemouseup", function () {
            if (_this.palillo.seleccion != null && _this.palillo.seleccion != _this && _this.palo.hitTest(_this.palillo.stage.mouseX - _this.palillo.base.x - _this.palo.x, _this.palillo.stage.mouseY - _this.palillo.base.y - _this.palo.y)) {
                if (_this.contiene == false && _this.Ohorizontal == _this.palillo.seleccion.Ohorizontal) {
                    _this.palillo.basePalillos[_this.palillo.seleccion.id].contiene = false;
                    _this.palillo.seleccion.id = _this.id;
                    _this.palillo.seleccion.palo.x = _this.posx;
                    _this.palillo.seleccion.palo.y = _this.posy;
                    _this.palillo.seleccion.posx = _this.posx;
                    _this.palillo.seleccion.posy = _this.posy;
                    _this.palillo.seleccion.movido = true;
                    _this.contiene = true;
                }
            }
            _this.palillo.stage.update();
        });
    };
    EPalillos.prototype.diagonalLeftDown = function () {
        var _this = this;
        this.largo = 140;
        this.palo.rotation = 65;
        this.vertical();
        this.palo.on("click", function () {
            if (_this.palillo.palillos.indexOf(_this) != -1) {
                _this.palillo.palillos.splice(_this.palillo.palillos.indexOf(_this), 1);
            }
            _this.palillo.base.removeChild(_this.palo);
            _this.palillo.contenedor.addChild(_this.palo);
            _this.palillo.stage.update();
            _this.palillo.resultado();
        });
    };
    EPalillos.prototype.diagonalRightDown = function () {
        var _this = this;
        this.largo = 140;
        this.palo.rotation = -65;
        this.vertical();
        this.palo.on("click", function () {
            if (_this.palillo.palillos.indexOf(_this) != -1) {
                _this.palillo.palillos.splice(_this.palillo.palillos.indexOf(_this), 1);
            }
            _this.palillo.base.removeChild(_this.palo);
            _this.palillo.contenedor.addChild(_this.palo);
            _this.palillo.stage.update();
            _this.palillo.resultado();
        });
    };
    EPalillos.prototype.diagonalLeftTop = function () {
        var _this = this;
        this.largo = 140;
        this.palo.rotation = 115;
        this.vertical();
        this.palo.on("click", function () {
            if (_this.palillo.palillos.indexOf(_this) != -1) {
                _this.palillo.palillos.splice(_this.palillo.palillos.indexOf(_this), 1);
            }
            _this.palillo.base.removeChild(_this.palo);
            _this.palillo.contenedor.addChild(_this.palo);
            _this.palillo.stage.update();
            _this.palillo.resultado();
        });
    };
    EPalillos.prototype.diagonalRightTop = function () {
        var _this = this;
        this.largo = 140;
        this.palo.rotation = -115;
        this.vertical();
        this.palo.on("click", function () {
            if (_this.palillo.palillos.indexOf(_this) != -1) {
                _this.palillo.palillos.splice(_this.palillo.palillos.indexOf(_this), 1);
            }
            _this.palillo.base.removeChild(_this.palo);
            _this.palillo.contenedor.addChild(_this.palo);
            _this.palillo.stage.update();
            _this.palillo.resultado();
        });
    };
    EPalillos.prototype.verticalDown = function () {
        var _this = this;
        this.vertical();
        this.palo.on("click", function () {
            if (_this.palillo.palillos.indexOf(_this) != -1) {
                _this.palillo.palillos.splice(_this.palillo.palillos.indexOf(_this), 1);
            }
            _this.palillo.base.removeChild(_this.palo);
            _this.palillo.contenedor.addChild(_this.palo);
            _this.palillo.stage.update();
            _this.palillo.resultado();
        });
    };
    EPalillos.prototype.horizontalLeft = function () {
        var _this = this;
        this.horizontal();
        this.palo.on("click", function () {
            if (_this.palillo.palillos.indexOf(_this) != -1) {
                _this.palillo.palillos.splice(_this.palillo.palillos.indexOf(_this), 1);
            }
            _this.palillo.base.removeChild(_this.palo);
            _this.palillo.contenedor.addChild(_this.palo);
            _this.palillo.stage.update();
            _this.palillo.resultado();
        });
    };
    EPalillos.prototype.horizontal = function () {
        this.Ohorizontal = true;
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
