"use strict";
var Tablero_hielo = /** @class */ (function () {
    function Tablero_hielo() {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.carga = new createjs.LoadQueue();
        this.carga.loadFile({ id: "lienzo", src: "../img/programacion/juego.png" });
        this.carga.loadFile({ id: "negativo", src: "../img/programacion/juego_bw.png" });
        this.carga.loadFile({ id: "gafas", src: "../img/programacion/gafas.png" });
        this.carga.on("fileload", function (r) {
            if (r.item.id == "gafas") {
                var data = {
                    images: [r.result],
                    frames: { width: 102, height: 44, regX: 51, regY: 2 },
                    animations: {
                        frente: [0, 3]
                    },
                    framerate: 10
                };
                var SpriteSheet = new createjs.SpriteSheet(data);
                _this.gafas = new createjs.Sprite(SpriteSheet);
                _this.stage.addChild(_this.gafas);
                _this.gafas.gotoAndPlay("frente");
                _this.gafas.x = 1200;
                _this.gafas.y = 600;
                _this.stage.update();
            }
            if (r.item.id == "lienzo") {
                _this.lienzo = new createjs.Bitmap(r.result);
                _this.stage.addChildAt(_this.lienzo, 0);
                _this.stage.update();
            }
            if (r.item.id == "negativo") {
                _this.negativo = new createjs.Bitmap(r.result);
                _this.negativo.x = 0;
                _this.negativo.y = 0;
                _this.stage.addChildAt(_this.negativo, 0);
                _this.stage.update();
            }
            if (r.item.id == "pinguino") {
                r.item.personaje.cargaArchivos(r.result);
            }
        });
        createjs.Ticker.addEventListener("tick", this.stage);
    }
    return Tablero_hielo;
}());
var Piguino = /** @class */ (function () {
    function Piguino(tablero) {
        this.velocidad = 70;
        this.vel_time = 1000;
        this.impacto = new createjs.Shape();
        this.m_up = false;
        this.m_down = false;
        this.m_right = false;
        this.m_left = false;
        this.tablero = tablero;
        this.tablero.carga.loadFile({ id: "pinguino", src: "../img/programacion/pinguino.png", personaje: this });
    }
    Piguino.prototype.cargaArchivos = function (img) {
        var _this = this;
        var data = {
            images: [img],
            frames: { width: 115, height: 117, regX: 57.5, regY: 58.5 },
            animations: {
                frente: 8,
                right: [0, 3],
                left: [4, 7],
                down: [8, 11],
                up: [12, 15]
            },
            framerate: 10
        };
        var vista = new createjs.SpriteSheet(data);
        this.personaje = new createjs.Sprite(vista);
        this.personaje.x = 100;
        this.personaje.y = 200;
        this.personaje.gotoAndStop("frente");
        this.tablero.stage.addChild(this.personaje);
        this.tablero.stage.addChild(this.impacto);
        this.tablero.stage.update();
        createjs.Ticker.addEventListener("tick", function () {
            if (_this.personaje != null && _this.tablero.negativo != null && _this.tablero.gafas != null) {
                var cor = _this.personaje.getBounds();
                if (_this.m_up || _this.m_down || _this.m_left || _this.m_right) {
                    if (Math.abs(_this.personaje.x - _this.tablero.gafas.x) < 80 && Math.abs(_this.personaje.y - _this.tablero.gafas.y) < 80) {
                        console.log("Ganaste");
                    }
                }
                if (_this.m_up) {
                    if (_this.personaje.y - (cor.height / 2) < 0) {
                        _this.personaje.y++;
                        if (_this.movimiento != null && !_this.movimiento.paused) {
                            _this.movimiento.paused = true;
                            _this.personaje.gotoAndStop("frente");
                            _this.m_up = false;
                        }
                    }
                    if (_this.tablero.negativo.hitTest(_this.personaje.x, _this.personaje.y - (cor.height / 2))) {
                        console.log("Perdio Arriba");
                        _this.m_up = false;
                        _this.impacto.graphics.beginFill("red").drawCircle(_this.personaje.x, _this.personaje.y - (cor.height / 2), 5);
                    }
                }
                if (_this.m_down) {
                    if (_this.personaje.y + (cor.height / 2) > 720) {
                        _this.personaje.y--;
                        if (_this.movimiento != null && !_this.movimiento.paused) {
                            _this.movimiento.paused = true;
                            _this.personaje.gotoAndStop("frente");
                            _this.m_down = false;
                        }
                    }
                    if (_this.tablero.negativo.hitTest(_this.personaje.x, _this.personaje.y + (cor.height / 2))) {
                        console.log("Perdio abajo");
                        _this.m_down = false;
                        _this.impacto.graphics.beginFill("red").drawCircle(_this.personaje.x, _this.personaje.y + (cor.height / 2), 5);
                    }
                }
                if (_this.m_left) {
                    if (_this.personaje.x - (cor.width / 2) < 0) {
                        _this.personaje.x++;
                        if (_this.movimiento != null && !_this.movimiento.paused) {
                            _this.movimiento.paused = true;
                            _this.personaje.gotoAndStop("frente");
                            _this.m_left = false;
                        }
                    }
                    if (_this.tablero.negativo.hitTest(_this.personaje.x - (cor.width / 2), _this.personaje.y)) {
                        console.log("Perdio Izquieda");
                        _this.m_left = false;
                        _this.impacto.graphics.beginFill("red").drawCircle(_this.personaje.x - (cor.width / 2), _this.personaje.y, 5);
                    }
                }
                if (_this.m_right) {
                    if (_this.personaje.x + (cor.width / 2) > 1280) {
                        _this.personaje.x--;
                        if (_this.movimiento != null && !_this.movimiento.paused) {
                            _this.movimiento.paused = true;
                            _this.personaje.gotoAndStop("frente");
                            _this.m_right = false;
                        }
                    }
                    if (_this.tablero.negativo.hitTest(_this.personaje.x + (cor.width / 2), _this.personaje.y)) {
                        console.log("Perdio drerecha");
                        _this.m_right = false;
                        _this.impacto.graphics.beginFill("red").drawCircle(_this.personaje.x + (cor.width / 2), _this.personaje.y, 5);
                    }
                }
            }
        });
    };
    Piguino.prototype.left = function (pasos) {
        var _this = this;
        if (this.personaje != null) {
            var cor = this.personaje.getBounds();
            this.movimiento = createjs.Tween.get(this.personaje)
                .to({ x: this.personaje.x - (this.velocidad * pasos) }, this.vel_time * pasos, createjs.Ease.quadInOut)
                .call(function () {
                if (_this.personaje != null) {
                    _this.personaje.gotoAndStop("frente");
                    _this.m_left = false;
                }
            });
            this.m_left = true;
            this.personaje.gotoAndPlay("left");
        }
    };
    Piguino.prototype.right = function (pasos) {
        var _this = this;
        if (this.personaje != null) {
            var cor = this.personaje.getBounds();
            this.movimiento = createjs.Tween.get(this.personaje)
                .to({ x: this.personaje.x + (this.velocidad * pasos) }, this.vel_time * pasos, createjs.Ease.quadInOut)
                .call(function () {
                if (_this.personaje != null) {
                    _this.personaje.gotoAndStop("frente");
                    _this.m_right = false;
                }
            });
            this.personaje.gotoAndPlay("right");
            this.m_right = true;
        }
    };
    Piguino.prototype.up = function (pasos) {
        var _this = this;
        if (this.personaje != null) {
            var cor = this.personaje.getBounds();
            this.movimiento = createjs.Tween.get(this.personaje)
                .to({ y: this.personaje.y - (this.velocidad * pasos) }, this.vel_time * pasos, createjs.Ease.quadInOut)
                .call(function () {
                if (_this.personaje != null) {
                    _this.personaje.gotoAndStop("frente");
                    _this.m_up = false;
                }
            });
            this.personaje.gotoAndPlay("up");
            this.m_up = true;
        }
    };
    Piguino.prototype.down = function (pasos) {
        var _this = this;
        if (this.personaje != null) {
            var cor = this.personaje.getBounds();
            this.movimiento = createjs.Tween.get(this.personaje)
                .to({ y: this.personaje.y + (this.velocidad * pasos) }, this.vel_time * pasos, createjs.Ease.quadInOut)
                .call(function () {
                if (_this.personaje != null) {
                    _this.personaje.gotoAndStop("frente");
                    _this.m_down = false;
                }
            });
            this.personaje.gotoAndPlay("down");
            this.m_down = true;
        }
    };
    return Piguino;
}());
