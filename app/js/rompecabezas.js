"use strict";
function iniciar() {
    var pizarra = document.querySelector('.pizarras');
    var margin = 10;
    var width = 110;
    var height = 110;
    var widthMax = 400;
    var Pareja = /** @class */ (function () {
        function Pareja(rama, orden, inipos) {
            this.master = document.createElement('div');
            this.rama = rama;
            this.orden = orden;
            this.inipos = inipos;
            this.master.className = "pizarra__click";
            this.master.style.width = (width - margin) + "px";
            this.master.style.height = (height - margin) + "px";
            this.rama.className = "pizarra__ficha";
            this.rama.style.width = (width - margin) + "px";
            this.rama.style.height = (height - margin) + "px";
        }
        Pareja.prototype.getRama = function () {
            return this.rama;
        };
        Pareja.prototype.validar = function () {
            if (this.master.style.left === this.rama.style.left
                && this.master.style.top === this.rama.style.top) {
                return true;
            }
            else {
                return false;
            }
        };
        return Pareja;
    }());
    var Pizarra = /** @class */ (function () {
        function Pizarra(parejas, lider) {
            this.parejas = parejas;
            this.lider = parejas[lider].getRama();
            this.asignar();
        }
        Pizarra.prototype.asignar = function () {
            var lidera = this.lider;
            this.parejas.forEach(function (p) {
                p.rama.addEventListener("click", function () {
                    var pos = { x: lidera.style.left, y: lidera.style.top };
                    var obj = { x: p.rama.style.left, y: p.rama.style.top };
                    if ((Math.abs(parseInt(pos.x) - parseInt(obj.x)) <= width
                        && Math.abs(parseInt(pos.y) - parseInt(obj.y)) <= 0)
                        || (Math.abs(parseInt(pos.x) - parseInt(obj.x)) <= 0
                            && Math.abs(parseInt(pos.y) - parseInt(obj.y)) <= height)) {
                        lidera.style.left = p.rama.style.left;
                        lidera.style.top = p.rama.style.top;
                        p.rama.style.left = pos.x;
                        p.rama.style.top = pos.y;
                    }
                });
            });
        };
        return Pizarra;
    }());
    var pizarra_fichas = new Array();
    for (var i = 0; i < 24; i++) {
        var a = new Pareja(document.createElement('div'), i, i);
        pizarra_fichas.push(a);
    }
    function crearPizarra(array_fichas, lider) {
        var table = document.createElement('div');
        table.className = "pizarra";
        var guias = document.createElement('section');
        guias.className = "pizarra__clicks";
        var fichas = document.createElement('section');
        fichas.className = "pizarra__fichas";
        table.appendChild(guias);
        table.appendChild(fichas);
        var pos = { x: 0, y: 0 };
        var ramas = [];
        for (var i = 0; i < array_fichas.length; i++) {
            var f = array_fichas[i];
            f.master.style.left = pos.x + 'px';
            f.master.style.top = pos.y + 'px';
            f.rama.style.left = pos.x + 'px';
            f.rama.style.top = pos.y + 'px';
            if (pos.x > widthMax) {
                pos.x = -width;
                pos.y += height;
            }
            pos.x += width;
            if (i == lider) {
                f.rama.style.background = "rgb(0,0,0,0)";
            }
            guias.appendChild(f.master);
            ramas[i] = f.rama;
        }
        pos = { x: 0, y: 0 };
        ramas.forEach(function (f) {
            f.style.left = pos.x + 'px';
            f.style.top = pos.y + 'px';
            if (pos.x > widthMax) {
                pos.x = -width;
                pos.y += height;
            }
            pos.x += width;
            fichas.appendChild(f);
        });
        pizarra.appendChild(table);
        var piza = new Pizarra(array_fichas, lider);
    }
    crearPizarra(pizarra_fichas, 1);
}
$(document).ready(function () {
    iniciar();
});
