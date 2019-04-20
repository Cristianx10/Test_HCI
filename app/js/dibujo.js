"use strict";
function distancia(puntoO, puntoA, puntoB) {
    var OAX = puntoA.x - puntoO.x;
    var OAY = puntoA.y - puntoO.y;
    var OAD = Math.sqrt((OAX * OAX) + (OAY * OAY));
    var OBX = puntoB.x - puntoO.x;
    var OBY = puntoB.y - puntoO.y;
    var OBD = Math.sqrt((OBX * OBX) + (OBY * OBY));
    var esc = (OAX * OBX) + (OAY * OBY);
    var angulo = degrees(Math.acos(esc / (OAD * OBD)));
    var dis = OBD * Math.sin(radians(angulo));
    return dis;
}
function obtenerMenorDistancia(ref, matrix) {
    var cordenadaA = { x: 0, y: 0 };
    var cordenadaB = { x: 0, y: 0 };
    var menor = 1000;
    var menorB = 1000;
    for (var i = 0; i < matrix.length; i++) {
        var m = matrix[i];
        var entro = true;
        var dis = Math.sqrt(((m.x - ref.x) * (m.x - ref.x)) + ((m.y - ref.y) * (m.y - ref.y)));
        if (dis < menor) {
            cordenadaA = m;
            menor = dis;
            entro = false;
        }
        if (entro) {
            if (dis < menorB) {
                cordenadaB = m;
                menorB = dis;
            }
        }
    }
    return [cordenadaA, cordenadaB];
}
var Tablero_lienzo = /** @class */ (function () {
    function Tablero_lienzo() {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 392;
        this.canvas.height = 427;
        this.dibujando = false;
        this.history = new Array();
        this.stage = new createjs.Stage(this.canvas);
        this.dibujo = new createjs.Shape();
        this.stage.addChild(this.dibujo);
        this.valores = 0;
        this.stage.on("stagemousedown", function () {
            _this.dibujando = true;
        });
        this.stage.on("stagemouseup", function () {
            _this.dibujando = false;
            console.log(_this.valores / _this.history.length);
        });
        this.stage.on("stagemousemove", function () {
            if (_this.dibujando && _this.matrix != null) {
                var x = _this.stage.mouseX;
                var y = _this.stage.mouseY;
                _this.dibujo.graphics.beginFill("#AFACA4").drawCircle(x, y, 3);
                _this.history.push({ x: x, y: y });
                _this.stage.update();
                var e_1 = obtenerMenorDistancia({ x: x, y: y }, _this.matrix);
                var d = distancia(e_1[0], e_1[1], { x: x, y: y });
                _this.valores += d;
            }
        });
    }
    Tablero_lienzo.prototype.dibujar = function (matrix) {
        var _this = this;
        this.matrix = matrix;
        this.matrix.forEach(function (c) {
            _this.dibujo.graphics.beginFill("#DAD9D9").drawCircle(c.x, c.y, 4);
        });
        this.stage.update();
    };
    return Tablero_lienzo;
}());
