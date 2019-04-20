"use strict";
var Secuencias = /** @class */ (function () {
    function Secuencias() {
        this.comenzar = false;
        this.elementos = new Array();
        this.agregado = 0;
        this.actual = 0;
    }
    Secuencias.prototype.agregar = function (element) {
        var e = new SecuenciaElemento(this, element, this.agregado);
        this.elementos.push(e);
        this.agregado++;
    };
    Secuencias.prototype.crearTablero = function () {
        var con = [];
        this.elementos.forEach(function (e) {
            con.push(new ContenidoA(e.elemento, e));
        });
        this.contenedor = new Contenedor(con);
        this.navegable = new Navegable(this.contenedor);
        return this.navegable;
    };
    Secuencias.prototype.iniciar = function () {
        this.comenzar = true;
    };
    Secuencias.prototype.detener = function () {
        this.comenzar = false;
    };
    Secuencias.prototype.getElemento = function () {
    };
    return Secuencias;
}());
var SecuenciaElemento = /** @class */ (function () {
    function SecuenciaElemento(padre, elemento, orden) {
        var _this = this;
        this.padre = padre;
        this.elemento = elemento,
            this.orden = orden;
        this.elemento.addEventListener("click", function () {
            if (_this.padre.comenzar) {
                if (_this.padre.actual == _this.orden) {
                    console.log("bien");
                }
                else {
                    console.log("mal");
                }
                _this.padre.actual++;
            }
        });
    }
    return SecuenciaElemento;
}());
var s = new Secuencias();
var ima = document.createElement('img');
ima.className = "imagen";
var ima2 = document.createElement('img');
ima2.className = "imagen";
s.agregar(ima);
s.agregar(ima2);
var n = s.crearTablero();
var se = document.querySelector('.secuencia');
n.elementos.foreachElementos(se);
n.colocarAvance();
n.colocarTiempo();
