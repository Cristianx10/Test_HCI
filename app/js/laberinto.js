"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Laberinto_Meta = /** @class */ (function () {
    function Laberinto_Meta(laberinto, x, y, width, height) {
        this.laberinto = laberinto;
        this.meta = new createjs.Shape();
        this.meta.x = x;
        this.meta.y = y;
        this.activado = false;
        this.meta.graphics.beginFill("red").drawRect(0, 0, width, height);
        this.meta.setBounds(x, y, 30, 49);
        this.laberinto.l_interfaz.addChild(this.meta);
    }
    Laberinto_Meta.prototype.sobre = function (forma) {
        var sobre = false;
        if (this.meta != null) {
            var tamForm = forma.getBounds();
            var tam = this.meta.getBounds();
            if (forma.x + (tamForm.width / 2) > this.meta.x && forma.x - (tamForm.width / 2) < this.meta.x + tam.width &&
                forma.y + (tamForm.height / 2) > this.meta.y && forma.y - (tamForm.height / 2) < this.meta.y + tam.height) {
                sobre = true;
            }
        }
        return sobre;
    };
    return Laberinto_Meta;
}());
var Laberinto_cursor = /** @class */ (function () {
    function Laberinto_cursor(laberinto, x, y) {
        var _this = this;
        this.laberinto = laberinto;
        this.ellipse = new createjs.Shape();
        this.ellipse.x = x;
        this.ellipse.y = y;
        this.inicio = false;
        this.activado = false;
        this.ellipse.graphics.beginFill("#1E1E1E").drawCircle(0, 0, 5);
        this.ellipse.setBounds(x, y, 10, 10);
        this.ellipse.on("click", function (e) {
            _this.activado = true;
            _this.inicio = true;
            e.remove();
        });
        this.laberinto.stage.on("stagemousemove", function () {
            if (_this.activado) {
                _this.mover(_this.laberinto.stage.mouseX, _this.laberinto.stage.mouseY);
            }
            if (_this.inicio && _this.activado == false) {
                _this.mover(_this.laberinto.stage.mouseX, _this.laberinto.stage.mouseY);
                _this.laberinto.update();
            }
        });
        this.laberinto.l_interfaz.addChild(this.ellipse);
    }
    Laberinto_cursor.prototype.mover = function (x, y) {
        this.ellipse.x = x;
        this.ellipse.y = y;
    };
    Laberinto_cursor.prototype.getX = function () {
        return this.ellipse.x;
    };
    Laberinto_cursor.prototype.getY = function () {
        return this.ellipse.y;
    };
    return Laberinto_cursor;
}());
var Laberinto = /** @class */ (function (_super) {
    __extends(Laberinto, _super);
    function Laberinto() {
        var _this = _super.call(this) || this;
        _this.stage.enableMouseOver();
        _this.l_mapa = new createjs.Container();
        _this.l_interfaz = new createjs.Container();
        _this.contenedor.addChild(_this.l_mapa, _this.l_interfaz);
        _this.carga = new createjs.LoadQueue();
        return _this;
    }
    Laberinto.prototype.crearLaberinto = function (url, width, height, cont, speed) {
        var _this = this;
        var var_speed = 1;
        if (speed != null) {
            var_speed = speed;
        }
        this.carga.loadFile(url);
        this.carga.on("fileload", function (r) {
            var piezas = new createjs.SpriteSheet({
                images: [r.result],
                frames: { width: width, height: height },
                animations: {
                    normal: [0, cont - 1, "normal", var_speed],
                },
            });
            _this.laberinto = new createjs.Sprite(piezas, "normal");
            _this.contenedor.setBounds(0, 0, width, height);
            _this.contenedor.x = (_this.canvas.width - width) / 2;
            _this.contenedor.y = (_this.canvas.height - height) / 2;
            _this.l_mapa.addChildAt(_this.laberinto, 0);
        });
        this.stage.update();
    };
    Laberinto.prototype.crearCursor = function (x, y) {
        this.cursor = new Laberinto_cursor(this, x, y);
        this.iniciar(false);
    };
    Laberinto.prototype.iniciar = function (inicio) {
        var _this = this;
        if (this.cursor != null) {
            if (inicio == null) {
                this.cursor.activado = true;
            }
            else {
                this.cursor.activado = inicio;
            }
        }
        createjs.Ticker.addEventListener("tick", function () {
            if (_this.cursor != null && _this.cursor.activado) {
                if (_this.cursor.activado && _this.sobre(_this.cursor.ellipse)) {
                    if (_this.intentoAcierto != null) {
                        _this.intentoAcierto();
                    }
                }
                else {
                    _this.detener();
                    if (_this.intentoFallo != null) {
                        _this.intentoFallo();
                    }
                }
                if (_this.meta != null && _this.meta.sobre(_this.cursor.ellipse)) {
                    _this.detener();
                    if (_this.laberinto != null) {
                        _this.laberinto.stop();
                    }
                    if (_this.validacion != null) {
                        _this.validacion();
                    }
                }
            }
            _this.update();
        });
    };
    Laberinto.prototype.detener = function () {
        createjs.Ticker.removeAllEventListeners("tick");
        if (this.cursor != null) {
            this.cursor.activado = false;
        }
    };
    Laberinto.prototype.crearMeta = function (x, y, width, height) {
        this.meta = new Laberinto_Meta(this, x, y, width, height);
        this.stage.update();
    };
    Laberinto.prototype.sobre = function (forma) {
        var sobre = false;
        if (this.laberinto != null) {
            var tamForm = forma.getBounds();
            if (this.laberinto.hitTest(forma.x - this.laberinto.x + (tamForm.width / 2), forma.y - this.laberinto.y)) {
                sobre = true;
            }
            else {
                return false;
            }
            if (this.laberinto.hitTest(forma.x - this.laberinto.x - (tamForm.width / 2), forma.y - this.laberinto.y)) {
                sobre = true;
            }
            else {
                return false;
            }
            if (this.laberinto.hitTest(forma.x - this.laberinto.x, forma.y + (tamForm.height / 2) - this.laberinto.y)) {
                sobre = true;
            }
            else {
                return false;
            }
            if (this.laberinto.hitTest(forma.x - this.laberinto.x, forma.y - (tamForm.height / 2) - this.laberinto.y)) {
                sobre = true;
            }
            else {
                return false;
            }
        }
        return sobre;
    };
    return Laberinto;
}(Actividad));
