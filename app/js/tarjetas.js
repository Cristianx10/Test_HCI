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
var Tablero_tarjetas = /** @class */ (function (_super) {
    __extends(Tablero_tarjetas, _super);
    function Tablero_tarjetas() {
        var _this = _super.call(this) || this;
        _this.fichas = new Array();
        _this.tarjetas = new Array();
        _this.posiciones = new Array();
        _this.tipoId = "Tablero Relacion";
        _this.elemento.className = "tablero";
        _this.bloqueador = false;
        return _this;
    }
    Tablero_tarjetas.prototype.agregar = function (url, orden, url2, orden2) {
        this.posiciones.push(orden);
        this.posiciones.push(orden2);
        var par = new Pareja(this, url, url2);
        this.fichas.push(par);
    };
    Tablero_tarjetas.prototype.iniciar = function () {
        for (var i = 0; i < this.fichas.length; i++) {
            var par = this.fichas[i];
            par.tablero = this;
            this.tarjetas.push(par.getElementoA());
            this.tarjetas.push(par.getElementoB());
        }
        //shuffle(this.tarjetas);
        for (var i = 0; i < this.tarjetas.length; i++) {
            this.tarjetas[this.posiciones[i]].draggable = false;
            this.elemento.append(this.tarjetas[this.posiciones[i]]);
        }
    };
    Tablero_tarjetas.prototype.verificar = function () {
        var cont = 0;
        for (var i = 0; i < this.fichas.length; i++) {
            var f = this.fichas[i];
            if (f.validado) {
                cont++;
            }
        }
        if (cont == this.fichas.length) {
            return true;
        }
        else {
            return false;
        }
    };
    return Tablero_tarjetas;
}(Interaccion));
var Pareja = /** @class */ (function () {
    function Pareja(tablero, elementoA, elementoB) {
        this.elementos = new Array();
        this.tablero = tablero;
        this.validado = false;
        this.agregar(elementoA, elementoB);
    }
    Pareja.prototype.agregar = function (elementoA, elementoB) {
        var a = new Bloque(elementoA, this);
        var b = new Bloque(elementoB, this);
        this.elementos.push(a);
        this.elementos.push(b);
    };
    Pareja.prototype.getElementoA = function () {
        return this.elementos[0].getBloque();
    };
    Pareja.prototype.getElementoB = function () {
        return this.elementos[1].getBloque();
    };
    Pareja.prototype.validar = function (bloque) {
        if (this.elementos.indexOf(bloque) !== -1) {
            return true;
        }
        return false;
    };
    Pareja.prototype.confirmado = function () {
        this.validado = true;
    };
    return Pareja;
}());
var Bloque = /** @class */ (function () {
    function Bloque(url, pareja) {
        var _this = this;
        this.pareja = pareja;
        this.valido = false;
        this.elemento = document.createElement('div');
        this.elemento.className = "tablero__bloque";
        this.bloque = document.createElement('div');
        this.bloque.className = "bloque";
        this.bloque.innerHTML = "\n        <div class=\"bloque__cara\">\n          </div><div class=\"bloque__sello\">\n            <div style=\"background-image:url('" + url + "'); width:100%; height:100%;background-size: contain;background-repeat: no-repeat;\">\n            </div>\n        </div>";
        this.elemento.addEventListener("click", function () {
            if (_this.valido == false) {
                if (_this.pareja.tablero.bloqueador == false && _this.pareja.tablero.bloqueActual !== _this) {
                    if (_this.bloque.style.transform === "rotateY(180deg)") {
                        _this.ocultar();
                    }
                    else {
                        _this.mostrar();
                        if (_this.pareja.tablero.bloqueActual != null) {
                            if (_this.pareja.validar(_this.pareja.tablero.bloqueActual)) {
                                _this.pareja.validado = true;
                                _this.pareja.tablero.aciertos++;
                                _this.valido = true;
                                _this.pareja.tablero.bloqueActual.valido = true;
                                _this.pareja.tablero.intentos++;
                                if (_this.pareja.tablero.intentoAcierto != null) {
                                    _this.pareja.tablero.intentoAcierto(_this.pareja.tablero.intentos, _this.pareja.tablero.aciertos, _this.pareja.tablero.fallos, _this.pareja.tablero.valido);
                                }
                                _this.pareja.tablero.bloqueActual = undefined;
                            }
                            else {
                                _this.pareja.tablero.bloqueador = true;
                                _this.pareja.tablero.intentos++;
                                _this.pareja.tablero.fallos++;
                                if (_this.pareja.tablero.intentoFallo != null) {
                                    _this.pareja.tablero.intentoFallo(_this.pareja.tablero.intentos, _this.pareja.tablero.aciertos, _this.pareja.tablero.fallos, _this.pareja.tablero.valido);
                                }
                                setTimeout(function () {
                                    if (_this.pareja.tablero.bloqueActual != null) {
                                        _this.pareja.tablero.bloqueActual.ocultar();
                                    }
                                    _this.ocultar();
                                    _this.pareja.tablero.bloqueActual = undefined;
                                    _this.pareja.tablero.bloqueador = false;
                                }, 1000);
                            }
                        }
                        else {
                            _this.pareja.tablero.bloqueActual = _this;
                        }
                    }
                }
                if (_this.pareja.tablero.verificar()) {
                    _this.pareja.tablero.valido = true;
                    if (_this.pareja.tablero.validacion != null) {
                        _this.pareja.tablero.validacion(_this.pareja.tablero.intentos, _this.pareja.tablero.aciertos, _this.pareja.tablero.fallos, _this.pareja.tablero.valido);
                    }
                }
            }
        });
        this.elemento.append(this.bloque);
    }
    Bloque.prototype.ocultar = function () {
        this.bloque.style.transform = "rotateY(0deg)";
    };
    Bloque.prototype.mostrar = function () {
        this.bloque.style.transform = "rotateY(180deg)";
    };
    Bloque.prototype.getBloque = function () {
        return this.elemento;
    };
    return Bloque;
}());
