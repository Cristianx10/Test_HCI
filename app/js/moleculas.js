"use strict";
var Tablero_moleculas = /** @class */ (function () {
    function Tablero_moleculas() {
        this.canvas = document.createElement('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.moleculas = new Array();
        createjs.Ticker.addEventListener("tick", this.stage);
        this.lineas = new Array();
    }
    Tablero_moleculas.prototype.refrescarTodo = function () {
        this.lineas.forEach(function (l) {
            l.pintarSolo();
        });
    };
    Tablero_moleculas.prototype.setValida = function (valida) {
        this.valida = valida;
    };
    Tablero_moleculas.prototype.enlace = function (resultado) {
        if (this.valida != null) {
            this.valida(resultado);
        }
    };
    Tablero_moleculas.prototype.equals = function (texto, compara) {
        var tex = texto.split(",");
        var com = compara.split(",");
        var total = com.length;
        var num = 0;
        for (var i = 0; i < tex.length; i++) {
            var t = tex[i];
            for (var j = 0; j < com.length; j++) {
                var c_1 = com[j];
                if (t == c_1) {
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
    Tablero_moleculas.prototype.agregar = function (tipo, enlaces, moleculas) {
        var m = new Molecula(this);
        m.crear(tipo, enlaces, moleculas);
        this.moleculas.push(m);
    };
    Tablero_moleculas.prototype.size = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    };
    return Tablero_moleculas;
}());
var Molecula = /** @class */ (function () {
    function Molecula(tablero) {
        var _this = this;
        this.tablero = tablero;
        this.stage = this.tablero.stage;
        this.contenedor = new createjs.Container();
        this.fondo = new createjs.Shape();
        this.contenedor.addChild(this.fondo);
        this.tipo = "";
        this.nEnlaces = 0;
        this.actualizado = false;
        this.moleculas = new Array();
        this.enlaces = new Array();
        this.stage.addChild(this.contenedor);
        this.radio = random(25, 45);
        var h = random(0, 360);
        var c = hsvToRgb(h, 90, 60);
        this.color = "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
        this.pos = { x: random(50, 1200), y: random(50, 600) };
        this.contenedor.on("mousedown", function () {
            _this.tablero.seleccion = _this;
            _this.contenedor.x = _this.stage.mouseX;
            _this.contenedor.y = _this.stage.mouseY;
            _this.stage.update();
        });
        this.contenedor.on("pressmove", function () {
            _this.contenedor.x = _this.stage.mouseX;
            _this.contenedor.y = _this.stage.mouseY;
            _this.stage.update();
        });
        this.stage.on("stagemouseup", function () {
            if (_this.tablero.seleccion != null && _this.tablero.seleccion != _this) {
                if (_this.moleculas.length < _this.nEnlaces && _this.tablero.seleccion.moleculas.length < _this.tablero.seleccion.nEnlaces && _this.contenedor.hitTest(_this.stage.mouseX - _this.contenedor.x, _this.stage.mouseY - _this.contenedor.y)) {
                    var enlazar = false;
                    for (var i = 0; i < _this.enlaces.length; i++) {
                        var e = _this.enlaces[i];
                        if (_this.tablero.seleccion.tipo == e) {
                            enlazar = true;
                        }
                    }
                    if (enlazar) {
                        var desX = 0;
                        var desY = 0;
                        desX = random(-(_this.radio * 3 + _this.tablero.seleccion.radio * 3), (_this.radio * 3 + _this.tablero.seleccion.radio * 3));
                        if (_this.contenedor.x + desX > _this.tablero.canvas.width || _this.contenedor.x + desX < _this.tablero.seleccion.radio * 3) {
                            desX *= -1;
                        }
                        desY = random(-(_this.radio * 3 + _this.tablero.seleccion.radio * 3), (_this.radio * 3 + _this.tablero.seleccion.radio * 3));
                        if (_this.contenedor.y + desY > _this.tablero.canvas.width || _this.contenedor.y + desY < _this.tablero.seleccion.radio) {
                            desY *= -1;
                        }
                        var linea_1 = new Enlace(_this.stage);
                        _this.tablero.lineas.push(linea_1);
                        createjs.Tween.get(_this.tablero.seleccion.contenedor)
                            .to({ x: _this.tablero.seleccion.contenedor.x + desX, y: _this.tablero.seleccion.contenedor.y + desY }, 300).call(function () {
                            if (linea_1 != null && _this.tablero.seleccion != null) {
                                linea_1.pintar(_this.tablero.seleccion.contenedor.x, _this.tablero.seleccion.contenedor.y);
                                _this.stage.update();
                            }
                            _this.tablero.refrescarTodo();
                            _this.tablero.seleccion = undefined;
                        });
                        // this.tablero.seleccion.contenedor.x = des;
                        _this.contenedor.x + _this.radio * 4 + _this.tablero.seleccion.radio * 4;
                        _this.moleculas.push(_this.tablero.seleccion);
                        _this.tablero.seleccion.moleculas.push(_this);
                        _this.tablero.seleccion.dibujarEnlace();
                        _this.dibujarEnlace();
                        linea_1.seguir(_this.tablero.seleccion.contenedor, _this.contenedor);
                        var resultado = _this.tipo;
                        for (var i = 0; i < _this.moleculas.length; i++) {
                            var e = _this.moleculas[i];
                            var tem = resultado;
                            resultado = tem + "," + e.tipo;
                        }
                        _this.tablero.enlace(resultado);
                    }
                }
            }
            _this.stage.update();
        });
    }
    Molecula.prototype.dibujarEnlace = function () {
        this.fondo.graphics.clear().beginFill(this.color).drawCircle(0, 0, this.radio * 2)
            .endFill().beginStroke("red").setStrokeStyle(5).drawCircle(0, 0, this.radio * 2 + 20);
    };
    Molecula.prototype.crear = function (tipo, enlaces, moleculas) {
        this.enlaces = moleculas;
        this.nEnlaces = enlaces;
        this.tipo = tipo;
        this.texto = new createjs.Text(tipo, "40px Heebo");
        var tam = this.texto.getBounds();
        this.texto.x = -(tam.width / 2);
        this.texto.y = -(tam.height / 2) + 5;
        this.fondo.graphics.beginFill(this.color).drawCircle(0, 0, this.radio * 2);
        this.fondo.alpha = .7;
        this.contenedor.addChild(this.texto);
        this.contenedor.x = this.pos.x;
        this.contenedor.y = this.pos.y;
        this.stage.update();
    };
    return Molecula;
}());
var Enlace = /** @class */ (function () {
    function Enlace(stage) {
        this.stage = stage;
        this.linea = new createjs.Shape();
        this.stage.addChildAt(this.linea, 0);
    }
    Enlace.prototype.seguir = function (puntoA, puntoB) {
        var _this = this;
        this.puntoA = puntoA;
        this.puntoB = puntoB;
        this.draw(puntoA, puntoB);
        puntoA.on("mousedown", function () {
            _this.draw(puntoA, puntoB);
        });
        puntoB.on("mousedown", function () {
            _this.draw(puntoA, puntoB);
        });
        puntoA.on("pressmove", function () {
            _this.draw(puntoA, puntoB);
        });
        puntoB.on("pressmove", function () {
            _this.draw(puntoA, puntoB);
        });
    };
    Enlace.prototype.pintar = function (x, y) {
        if (this.puntoA != null && this.puntoB != null) {
            this.linea.graphics.clear().beginStroke("red")
                .setStrokeStyle(5)
                .lineTo(this.puntoA.x, this.puntoA.y).lineTo(x, y).endStroke();
            this.stage.update();
        }
    };
    Enlace.prototype.pintarSolo = function () {
        if (this.puntoA != null && this.puntoB != null) {
            this.linea.graphics.clear().beginStroke("red")
                .setStrokeStyle(5)
                .lineTo(this.puntoA.x, this.puntoA.y).lineTo(this.puntoB.x, this.puntoB.y).endStroke();
            this.stage.update();
        }
    };
    Enlace.prototype.draw = function (puntoA, puntoB) {
        this.linea.graphics.clear().beginStroke("red")
            .setStrokeStyle(5)
            .moveTo(puntoA.x, puntoA.y).lineTo(puntoB.x, puntoB.y).endStroke();
    };
    return Enlace;
}());
