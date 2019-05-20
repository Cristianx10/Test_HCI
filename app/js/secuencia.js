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
var Secuencias = /** @class */ (function (_super) {
    __extends(Secuencias, _super);
    function Secuencias() {
        var _this = _super.call(this) || this;
        _this.elementos = new Array();
        _this.agregado = 0;
        _this.actual = 0;
        _this.nactual = 0;
        _this.elemento.className = "secuencia";
        return _this;
    }
    Secuencias.prototype.agregar = function (element, tiempo) {
        var e = new SecuenciaElemento(this, element, this.agregado, tiempo);
        this.elementos.push(e);
        this.agregado++;
    };
    Secuencias.prototype.terminar = function () {
        if (this.navegable != null) {
            this.navegable.siguiente();
            this.navegable.ocultarProgreso();
            this.elemento.style.display = "none";
        }
    };
    Secuencias.prototype.crearTablero = function () {
        var _this = this;
        this.contenedor = new Contenedor();
        var elementos = [];
        var tabla = document.createElement('div');
        var total = document.createElement('div');
        this.elementos.forEach(function (e) {
            var ele = e.elemento.cloneNode();
            if (_this.contenedor != null) {
                _this.contenedor.agregar(new Contenido(ele, e, e.tiempo));
            }
            elementos.push(e.contenedor);
        });
        shuffle(elementos);
        elementos.forEach(function (e) {
            total.append(e);
        });
        tabla.className = "tabla";
        total.className = "tabla__secuencia";
        tabla.append(total);
        this.contenedor.agregarHTML(tabla);
        this.navegable = new Navegable(this.contenedor);
        this.navegable.permitirAll = true;
        this.contenedor.foreachElementos(this.elemento);
    };
    Secuencias.prototype.start = function () {
        if (this.navegable != null) {
            this.navegable.iniciar();
            this.navegable.colocarProgreso();
            this.navegable.colocarTiempo();
        }
    };
    return Secuencias;
}(Interaccion));
var SecuenciaElemento = /** @class */ (function (_super) {
    __extends(SecuenciaElemento, _super);
    function SecuenciaElemento(padre, elemento, orden, tiempo) {
        var _this = _super.call(this) || this;
        _this.seleccionado = false;
        _this.padre = padre;
        _this.tiempo = tiempo;
        _this.contenedor = document.createElement("div");
        _this.elemento = elemento;
        _this.contenedor.append(_this.elemento);
        _this.contenedor.className = "contenedor__imagen";
        _this.orden = orden;
        _this.tipoId = "Secuencia";
        _this.actual = 0;
        _this.elemento.addEventListener("click", function (e) {
            var clasname = _this.contenedor.className;
            if (_this.seleccionado == false) {
                _this.contenedor.className = clasname + " selecionado";
                if (_this.padre.actual == _this.orden) {
                    _this.padre.aciertos++;
                    _this.padre.intentos++;
                    _this.aciertos++;
                    if (_this.padre.intentoAcierto != null) {
                        _this.padre.intentoAcierto();
                    }
                }
                else {
                    _this.padre.fallos++;
                    _this.fallos++;
                    _this.padre.intentos++;
                    _this.registroOpcional();
                    if (_this.padre.intentoFallo != null) {
                        _this.padre.intentoFallo();
                    }
                }
                _this.padre.actual++;
                console.log(_this.padre.actual, _this.padre.elementos.length);
                if (_this.padre.actual >= _this.padre.elementos.length) {
                    var respuesta = false;
                    if (_this.padre.aciertos >= _this.padre.elementos.length) {
                        respuesta = true;
                        _this.padre.valido = true;
                        _this.valido = true;
                        _this.registroOpcional();
                    }
                    if (_this.padre.validacion != null) {
                        _this.padre.validacion(respuesta);
                    }
                }
            }
            _this.seleccionado = true;
        });
        return _this;
    }
    SecuenciaElemento.prototype.registroOpcional = function () {
        console.log("Hola");
        resultados.agregar(this.tipoId, [
            { id: "aciertos", valor: this.padre.aciertos + "" },
            { id: "fallos", valor: this.padre.fallos + "" },
            { id: "intentos", valor: this.padre.intentos + "" },
            { id: "validacion", valor: this.padre.valido + "" },
        ]);
    };
    SecuenciaElemento.prototype.registro = function () {
    };
    return SecuenciaElemento;
}(Interaccion));
