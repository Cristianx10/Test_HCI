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
var Descartes = /** @class */ (function (_super) {
    __extends(Descartes, _super);
    function Descartes() {
        var _this = _super.call(this) || this;
        _this.imagenes = new Array();
        return _this;
    }
    Descartes.prototype.agregar = function (imagen, valor) {
        var ima = new Descarte_elemento(this, imagen, valor);
        this.imagenes.push(ima);
        this.elemento.append(imagen);
    };
    Descartes.prototype.validar = function () {
        var cont = 0;
        this.imagenes.forEach(function (i) {
            if (i.validado) {
                cont++;
            }
        });
        if (cont >= this.imagenes.length) {
            return true;
        }
        else {
            return false;
        }
    };
    return Descartes;
}(Interaccion));
var Descarte_elemento = /** @class */ (function () {
    function Descarte_elemento(tablero, elemento, valor) {
        var _this = this;
        this.tablero = tablero;
        this.elemento = elemento;
        this.valor = valor;
        this.validado = !valor;
        this.elemento.addEventListener("click", function () {
            if (_this.valor) {
                if (_this.tablero.intentoAcierto != null) {
                    _this.tablero.intentoAcierto();
                }
                console.log("acierto");
            }
            if (_this.valor == false) {
                if (_this.tablero.intentoFallo != null) {
                    _this.tablero.intentoFallo();
                }
                console.log("fallo");
            }
            _this.validado = true;
            if (_this.tablero.validar()) {
                if (_this.tablero.validacion != null) {
                    _this.tablero.validacion();
                }
                console.log("Gano");
            }
            _this.ocultar();
        });
    }
    Descarte_elemento.prototype.ocultar = function () {
        this.elemento.style.display = "none";
    };
    return Descarte_elemento;
}());
var c = matrixFija("../img/arte/ojoveloz1.png", 100, 50, 5, 5);
var descartes = new Descartes();
descartes.agregar(c[0], false);
descartes.agregar(c[1], true);
descartes.agregar(c[2], false);
descartes.agregar(c[3], false);
descartes.agregar(c[4], false);
descartes.agregar(c[5], false);
descartes.agregar(c[6], false);
descartes.agregar(c[7], true);
descartes.agregar(c[8], false);
descartes.agregar(c[9], false);
descartes.agregar(c[10], false);
descartes.agregar(c[11], true);
descartes.agregar(c[12], false);
descartes.agregar(c[13], false);
descartes.agregar(c[14], false);
descartes.agregar(c[15], false);
descartes.agregar(c[16], false);
descartes.agregar(c[17], true);
descartes.agregar(c[18], false);
descartes.agregar(c[19], false);
descartes.agregar(c[20], false);
descartes.agregar(c[21], false);
descartes.agregar(c[22], false);
descartes.agregar(c[23], false);
descartes.agregar(c[24], false);
descartes.incluirEn(".principal");
