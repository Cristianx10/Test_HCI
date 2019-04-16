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
var CorteLinea = /** @class */ (function () {
    // puntos:Array<>;
    function CorteLinea(inicio, final, distancia) {
        this.inicio = inicio;
        this.final = final;
        this.distanacia = distancia;
        this.puntos = new Array();
        this.historial = {};
        var nPuntos = final.y - inicio.y;
        this.linea = new createjs.Shape();
        for (var i = 0; i < nPuntos; i++) {
            var x = Math.round(this.inicio.x + Math.sin(radians(i)) * distancia);
            var y = Math.round(this.inicio.y + i);
            this.linea.graphics.beginFill("red").drawCircle(x, y, 3);
            this.puntos.push({ x: x, y: y });
        }
        this.linea.graphics.beginFill("blue").drawCircle(this.inicio.x, this.inicio.y, 3);
    }
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
var canvas = document.createElement('canvas');
canvas.width = 1280;
canvas.height = 720;
var lienzo = new createjs.Stage(canvas);
var corte = new CorteLinea({ x: 600, y: 100 }, { x: 600, y: 600 }, 80);
var val = false;
lienzo.on("stagemousedown", function () {
    val = true;
    console.log("true");
});
lienzo.on("stagemouseup", function () {
    val = false;
});
lienzo.on("stagemousemove", function () {
    if (val) {
        corte.historial[Math.round(lienzo.mouseY)] = Math.round(lienzo.mouseX);
        console.log(corte.historial[Math.round(lienzo.mouseY)]);
    }
});
createjs.Ticker.addEventListener("tick", function () {
    if (val) {
        corte.historial[Math.round(lienzo.mouseY)] = Math.round(lienzo.mouseX);
        console.log(corte.historial[Math.round(lienzo.mouseY)]);
    }
});
lienzo.addChild(corte.linea);
lienzo.update();
$(".principal").append(canvas);
/*
               let x = Math.round(this.inicio.x + Math.sin(radians(i)) * distancia);
               let y = Math.round(this.inicio.y + i);
               

            index++;

            if(Math.cos(radians(index)) < 1){
                //dis = Math.round(this.inicio.y + Math.cos(radians(index)) * distancia) + distancia + dis;
                //index = 0;
            }*/ 
