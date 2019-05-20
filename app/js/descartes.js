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
    Descartes.prototype.valida = function () {
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
                _this.tablero.aciertos++;
                _this.tablero.intentos++;
            }
            if (_this.valor == false) {
                if (_this.tablero.intentoFallo != null) {
                    _this.tablero.intentoFallo();
                }
                tablero.fallos++;
                _this.tablero.intentos++;
            }
            _this.validado = true;
            if (_this.tablero.valida()) {
                if (_this.tablero.validacion != null) {
                    _this.tablero.validacion();
                }
                tablero.valido = true;
            }
            _this.ocultar();
        });
    }
    Descarte_elemento.prototype.ocultar = function () {
        this.elemento.style.display = "none";
    };
    return Descarte_elemento;
}());
