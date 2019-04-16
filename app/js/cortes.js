"use strict";
// Converts from degrees to radians.
function radians(degrees) {
    return degrees * Math.PI / 180;
}
;
// Converts from radians to degrees.
function degrees(radians) {
    return radians * 180 / Math.PI;
}
;
function raizN(x, n) {
    return Math.exp(Math.log(x) / n);
}
var salaCirugia = /** @class */ (function () {
    function salaCirugia() {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.sala = new createjs.Stage(this.canvas);
        this.cortando = false;
        this.canvas.width = 1000;
        this.canvas.height = 480;
        this.canvas.style.background = "#AEE9DB";
        var bisturi_img = document.createElement('img');
        bisturi_img.src = "../img/cortes/bisturi.png";
        var corte = new createjs.Shape();
        this.sala.addChild(corte);
        bisturi_img.addEventListener("load", function () {
            _this.bisturi = new createjs.Bitmap(bisturi_img);
            _this.sala.addChild(_this.bisturi);
            _this.sala.on("stagemousemove", function () {
                var x = _this.sala.mouseX;
                var y = _this.sala.mouseY;
                if (_this.bisturi != null) {
                    _this.bisturi.x = x - 5;
                    _this.bisturi.y = y;
                }
                if (_this.cortando) {
                    corte.graphics.beginFill("red").drawCircle(x, y, 1);
                }
                _this.sala.update();
            });
        });
    }
    salaCirugia.prototype.cargarCuerpo = function (url) {
        var _this = this;
        var cuerpoA = document.createElement('img');
        cuerpoA.src = url;
        cuerpoA.addEventListener("load", function () {
            var ima = new createjs.Bitmap(cuerpoA);
            var cor = ima.getBounds();
            ima.x = (_this.canvas.width - cor.width) / 2;
            _this.sala.addChildAt(ima, 0);
            _this.sala.update();
        });
    };
    return salaCirugia;
}());
var CorteLinea = /** @class */ (function () {
    // puntos:Array<>;
    function CorteLinea(lienzo, dis) {
        var _this = this;
        this.color = "#EF3838";
        this.dis = dis;
        this.puntos = new Array();
        this.historial = {};
        this.lienzo = lienzo;
        this.registrando = false;
        this.linea = new createjs.Shape();
        this.linea.on("mousedown", function () {
            _this.registrando = true;
            _this.lienzo.cortando = true;
        });
        lienzo.sala.on("stagemouseup", function () {
            if (_this.registrando) {
                console.log("Des" + _this.getDesviacion());
            }
            _this.registrando = false;
            _this.lienzo.cortando = false;
        });
        lienzo.sala.on("stagemousemove", function () {
            if (_this.registrando) {
                var y = Math.round(_this.lienzo.sala.mouseY);
                var x = Math.round(_this.lienzo.sala.mouseX);
                _this.historial[y] = x;
            }
        });
    }
    CorteLinea.prototype.trazoCurva = function (inicio, final, distancia, dist) {
        var nPuntos = final.y - inicio.y;
        var dis = dist;
        for (var i = 0; i < nPuntos; i++) {
            var x = Math.round(inicio.x + Math.sin(radians(i * dis)) * distancia);
            var y = Math.round(inicio.y + (i));
            if (i % this.dis == 0) {
                this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            }
            this.puntos.push({ x: x, y: y });
        }
        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);
    };
    CorteLinea.prototype.trazadoLineal = function (inicio, final) {
        var nPuntos = final.y - inicio.y;
        var m = 0;
        if ((final.x - inicio.x) == 0) {
        }
        else {
            m = (final.y - inicio.y) / (final.x - inicio.x);
        }
        for (var i = 0; i < nPuntos; i++) {
            var y = Math.round(i + inicio.y);
            var x = inicio.x;
            if (m != 0) {
                x = (y - inicio.y + (m * inicio.x)) / m;
            }
            if (i % this.dis == 0) {
                this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            }
            this.puntos.push({ x: x, y: y });
        }
        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);
        this.linea.graphics.beginFill("blue").drawCircle(final.x, final.y, 5);
    };
    CorteLinea.prototype.trazadoCurvaDerecha = function (inicio, final) {
        var distancia = final.y - inicio.y;
        for (var i = 0; i < distancia; i++) {
            var index = i / distancia * 90;
            var x = Math.round(inicio.x + Math.cos(radians(index)) * distancia);
            var y = Math.round(inicio.y + Math.sin(radians(index)) * distancia);
            this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            this.puntos.push({ x: x, y: y });
        }
        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);
        this.linea.graphics.beginFill("blue").drawCircle(final.x, final.y, 5);
    };
    CorteLinea.prototype.trazadoCurvaIzquierda = function (inicio, final) {
        var distancia = final.y - inicio.y;
        for (var i = 0; i < distancia; i++) {
            var index = i / distancia * 90;
            var x = Math.round(inicio.x + -Math.cos(radians(index)) * distancia);
            var y = Math.round(inicio.y + Math.sin(radians(index)) * distancia);
            if (i % this.dis == 0) {
                this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            }
            this.puntos.push({ x: x, y: y });
        }
        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);
        this.linea.graphics.beginFill("blue").drawCircle(final.x, final.y, 5);
    };
    CorteLinea.prototype.getDesviacion = function () {
        var matrix = [];
        var total_matrix = 0;
        for (var i = 0; i < this.puntos.length; i++) {
            var x = this.puntos[i].x;
            var y = this.puntos[i].y;
            if (this.historial[y] != null) {
                matrix.push(this.historial[y]);
                var dis = Math.abs(x - this.historial[y]);
                total_matrix += dis;
            }
        }
        return total_matrix / matrix.length;
    };
    return CorteLinea;
}());
function cargarSalaCirugias() {
    var sala = new salaCirugia();
    sala.cargarCuerpo("../img/cortes/CuerpoB.png");
    var corteA = new CorteLinea(sala, 20);
    corteA.trazadoLineal({ x: 500, y: 100 }, { x: 500, y: 430 });
    var corteB = new CorteLinea(sala, 10);
    corteB.trazadoLineal({ x: 400, y: 350 }, { x: 470, y: 430 });
    var corteC = new CorteLinea(sala, 10);
    corteC.trazadoLineal({ x: 600, y: 350 }, { x: 530, y: 430 });
    sala.sala.addChild(corteA.linea, corteB.linea, corteC.linea);
    sala.sala.update();
    $(".principal").append(sala.canvas);
}
cargarSalaCirugias();
