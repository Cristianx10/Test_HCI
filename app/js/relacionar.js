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
var Relacionar = /** @class */ (function (_super) {
    __extends(Relacionar, _super);
    function Relacionar() {
        var _this = _super.call(this) || this;
        _this.encontrado = false;
        _this.baseA = new Relacionar_base(_this);
        _this.baseA.contenedor.x = 5;
        _this.baseA.contenedor.y = 5;
        _this.baseB = new Relacionar_base(_this);
        _this.baseB.contenedor.x = 5;
        _this.baseB.contenedor.y = 5;
        _this.baseA.setOrientacion(true);
        _this.baseB.setOrientacion(false);
        _this.update();
        _this.stage.on("stagemousemove", function () {
            if (_this.seleccion != null) {
                _this.seleccion.linea.dibujarInicial(_this.stage.mouseX, _this.stage.mouseY);
            }
        });
        return _this;
    }
    Relacionar.prototype.ocultar = function () {
        if (this.seleccion != null) {
            this.seleccion.ocultar();
        }
        this.seleccion = undefined;
    };
    Relacionar.prototype.reset = function () {
        if (this.seleccion != null) {
            this.seleccion.reset();
        }
        this.seleccion = undefined;
    };
    Relacionar.prototype.style = function () {
        this.baseA.styleDraw();
        this.baseB.styleDraw();
    };
    Relacionar.prototype.size = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    };
    Relacionar.prototype.distancia = function (x) {
        this.baseB.contenedor.x = x;
    };
    Relacionar.prototype.setStyle = function (width, height, style, h, w) {
        this.baseA.drawTablero(width, height, style, h, w);
        this.baseB.drawTablero(width, height, style, h, w);
    };
    Relacionar.prototype.setStyleA = function (width, height, style, h, w) {
        this.baseA.drawTablero(width, height, style, h, w);
    };
    Relacionar.prototype.setStyleB = function (width, height, style, h, w) {
        this.baseB.drawTablero(width, height, style, h, w);
    };
    return Relacionar;
}(Actividad));
var Relacionar_base = /** @class */ (function () {
    function Relacionar_base(tablero) {
        this.background = new createjs.Shape();
        this.tablero = tablero;
        this.stage = tablero.stage;
        this.contenedor = new createjs.Container();
        this.categorias = new Array();
        this.contenedor.addChild(this.background);
        this.stage.addChild(this.contenedor);
        this.altura = 0;
        this.orientation = true;
    }
    Relacionar_base.prototype.drawTablero = function (width, height, style, w, h) {
        this.width = width;
        this.height = height;
        var tam = this.contenedor.getBounds();
        if (style != null) {
            this.style = style;
        }
        if (h != null) {
            this.w = w;
            this.h = h;
        }
        if (tam != null) {
            this.contenedor.setBounds(tam.x, tam.y, width, height);
        }
        else {
            this.contenedor.setBounds(0, 0, width, height);
        }
        this.stage.update();
    };
    Relacionar_base.prototype.styleDraw = function () {
        if (this.width != null && this.height != null) {
            this.background.graphics.beginStroke("#D9D9D9").beginFill("#FFFFFF").setStrokeStyle(5).drawRoundRect(0, 0, this.width, this.height, 50);
        }
        this.stage.update();
    };
    Relacionar_base.prototype.setOrientacion = function (orientation) {
        this.orientation = orientation;
    };
    Relacionar_base.prototype.agregar = function (infomacion, categoria) {
        var tarjeta;
        if (this.style != null) {
            tarjeta = new Tablero_Categoria(this, infomacion, categoria, this.style);
        }
        else {
            tarjeta = new Tablero_Categoria(this, infomacion, categoria, "20px Arial");
        }
        if (this.h != null && this.w != null) {
            tarjeta.setTamano(this.w, this.h);
        }
        this.categorias.push(tarjeta);
        var tam = tarjeta.contenedor.getBounds();
        if (this.altura == 0) {
            this.altura += tam.height + (tam.height / 2);
        }
        tarjeta.contenedor.y = this.altura;
        this.contenedor.addChild(tarjeta.contenedor);
        this.altura += tam.height + (tam.height / 2);
        var cor = this.contenedor.getBounds();
        tarjeta.contenedor.x += Math.abs(tam.width - cor.width) / 2;
        tarjeta.setConexion(this.orientation);
        this.stage.update();
    };
    Relacionar_base.prototype.actualizarTamano = function (width, height) {
        this.categorias.forEach(function (c) {
            c.setTamano(width, height);
        });
    };
    Relacionar_base.prototype.actualizarPuntuacion = function () {
        var _this = this;
        this.tablero.aciertos = 0;
        this.categorias.forEach(function (c) {
            _this.tablero.aciertos += c.puntos;
        });
        this.tablero.fallos = this.categorias.length - this.tablero.aciertos;
    };
    Relacionar_base.prototype.validar = function () {
        var con = 0;
        this.categorias.forEach(function (c) {
            if (c.clasificado) {
                con++;
            }
        });
        if (con >= this.categorias.length) {
            return true;
        }
        return false;
    };
    return Relacionar_base;
}());
var Tablero_Categoria = /** @class */ (function () {
    function Tablero_Categoria(base, texto, categoria, style) {
        var _this = this;
        this.orientacionLeft = true;
        this.base = base;
        this.stage = base.stage;
        this.puntos = 0;
        this.visible = true;
        this.contenedor = new createjs.Container();
        if (style != null) {
            this.texto = new createjs.Text(texto, style);
        }
        else {
            this.texto = new createjs.Text(texto, "50px Heebo");
        }
        this.categoria = categoria;
        this.contenedor.addChild(this.texto);
        this.clasificado = false;
        this.linea = new LineaCurva(this.stage);
        this.place = new createjs.Shape();
        this.contenedor.addChildAt(this.place, 0);
        this.conexion = { x: 0, y: 0 };
        this.contenedor.on("mousedown", function () {
            if (_this.visible) {
                _this.base.tablero.encontrado = false;
                _this.base.tablero.seleccion = undefined;
                _this.base.tablero.seleccion = _this;
                if (_this.pareja != null) {
                    _this.pareja.linea.limpiar();
                    _this.pareja.clasificado = false;
                    _this.pareja.pareja = undefined;
                    _this.pareja = undefined;
                }
                _this.clasificado = false;
                _this.linea.iniciar(_this.conexion.x, _this.conexion.y);
            }
        });
        this.stage.on("stagemouseup", function () {
            if (_this.visible) {
                if (_this.base.tablero.encontrado == false && _this.base.tablero.seleccion != null) {
                    var sobre = _this.contenedor.hitTest(_this.stage.mouseX - _this.contenedor.x - base.contenedor.x, _this.stage.mouseY - _this.contenedor.y - base.contenedor.y);
                    if (_this.clasificado == false && sobre &&
                        _this.base.tablero.seleccion.base.categorias.indexOf(_this) == -1) {
                        _this.base.tablero.encontrado = true;
                        _this.base.tablero.intentos++;
                        _this.pareja = _this.base.tablero.seleccion;
                        _this.pareja.pareja = _this;
                        _this.clasificado = true;
                        _this.pareja.clasificado = true;
                        _this.pareja.linea.terminar(_this.conexion.x, _this.conexion.y);
                        _this.pareja.linea.draw();
                        if (_this.categoria == _this.pareja.categoria) {
                            //console.log(this.pareja, this)
                            if (_this.base.tablero.intentoAcierto != null) {
                                _this.base.tablero.intentoAcierto();
                            }
                            _this.puntos = 1;
                            _this.pareja.puntos = 1;
                        }
                        else {
                            _this.puntos = -1;
                            _this.pareja.puntos = -1;
                            if (_this.base.tablero.intentoFallo != null) {
                                _this.base.tablero.intentoFallo();
                            }
                        }
                        if (_this.base.validar() || _this.pareja.base.validar()) {
                            if (_this.base.tablero.validacion != null) {
                                _this.base.tablero.validacion();
                            }
                        }
                        _this.base.actualizarPuntuacion();
                    }
                    else {
                        _this.base.tablero.seleccion.linea.limpiar();
                    }
                }
            }
        });
    }
    Tablero_Categoria.prototype.reset = function () {
        if (this.pareja != null) {
            this.pareja.linea.limpiar();
            this.pareja.clasificado = false;
        }
        this.linea.limpiar();
        this.clasificado = false;
    };
    Tablero_Categoria.prototype.ocultar = function () {
        if (this.pareja != null) {
            this.pareja.base.contenedor.removeChild(this.pareja.contenedor);
            this.pareja.base.contenedor.removeChild(this.pareja.linea.linea);
            this.pareja.linea.limpiar();
            this.pareja.clasificado = true;
            this.pareja.visible = false;
        }
        this.visible = false;
        this.clasificado = true;
        this.base.contenedor.removeChild(this.contenedor);
        this.base.contenedor.removeChild(this.linea.linea);
        this.linea.limpiar();
        this.stage.update();
    };
    Tablero_Categoria.prototype.setTamano = function (width, height) {
        var tam = this.texto.getBounds();
        var cor = this.contenedor.getBounds();
        this.contenedor.setBounds(cor.x, cor.y, width, height);
        this.texto.x = Math.abs(tam.width - width) / 2;
        this.texto.y = Math.abs(tam.height - height) / 2;
        this.place.graphics.beginFill("rgb(255,255,255,.01)").drawRect(0, 0, width, height);
        this.stage.update();
    };
    Tablero_Categoria.prototype.actualizarTamano = function () {
        var tam = this.texto.getBounds();
        var cor = this.contenedor.getBounds();
        this.contenedor.setBounds(cor.x, cor.y, cor.width, cor.height);
        this.texto.x = Math.abs(tam.width - cor.width) / 2;
        this.place.graphics.beginFill("rgb(255,255,255, 0.001)").drawRect(0, 0, cor.width, cor.height);
        this.stage.update();
    };
    Tablero_Categoria.prototype.setConexion = function (value) {
        var tam = this.contenedor.getBounds();
        if (value) {
            this.conexion = {
                x: this.base.contenedor.x + this.contenedor.x + tam.width,
                y: this.base.contenedor.y + this.contenedor.y + (tam.height / 2)
            };
        }
        else {
            this.conexion = {
                x: this.base.contenedor.x + this.contenedor.x,
                y: this.base.contenedor.y + this.contenedor.y + (tam.height / 2)
            };
        }
    };
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
        this.color = { r: random(50, 200), g: random(50, 200), b: random(50, 200) };
    }
    LineaCurva.prototype.iniciar = function (x, y) {
        this.inicial = { x: x, y: y };
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
                .beginStroke("rgb(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ")")
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
            x: (this.inicial.x + this.final.x) / 2,
            y: (this.inicial.y + this.final.y) / 2
        };
        this.linea.graphics
            .beginStroke("rgb(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ")")
            .setStrokeStyle(5)
            .drawCircle(this.inicial.x, this.inicial.y, 3)
            .bezierCurveTo(this.inicial.x, this.inicial.y, centro.x, this.inicial.y, centro.x, centro.y)
            .bezierCurveTo(centro.x, centro.y, centro.x, this.final.y, this.final.x, this.final.y)
            .drawCircle(this.final.x, this.final.y, 3);
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
            .beginStroke("rgb(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ")")
            .bezierCurveTo(inicial.x, inicial.y, centro.x, inicial.y, centro.x, centro.y)
            .bezierCurveTo(centro.x, centro.y, centro.x, final.y, final.x, final.y);
        this.stage.update();
    };
    return LineaCurva;
}());
