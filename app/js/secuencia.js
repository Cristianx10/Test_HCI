"use strict";
var Secuencias = /** @class */ (function () {
    function Secuencias() {
        this.aciertos = 0;
        this.elementos = new Array();
        this.agregado = 0;
        this.actual = 0;
        this.elemento = document.createElement('div');
        this.elemento.className = "secuencia";
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
        this.contenedor.agregarHtml(tabla);
        this.navegable = new Navegable(this.contenedor);
        this.navegable.permitirAll = true;
        this.contenedor.foreachElementos(this.elemento);
    };
    Secuencias.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    Secuencias.prototype.setIntentoFallo = function (intentoFallo) {
        this.intentoFallo = intentoFallo;
    };
    Secuencias.prototype.setIntentoAcierto = function (intentoAcierto) {
        this.intentoAcierto = intentoAcierto;
    };
    Secuencias.prototype.start = function () {
        if (this.navegable != null) {
            this.navegable.iniciar();
            this.navegable.colocarProgreso();
            this.navegable.colocarTiempo();
        }
    };
    Secuencias.prototype.getElemento = function () {
        return this.elemento;
    };
    return Secuencias;
}());
var SecuenciaElemento = /** @class */ (function () {
    function SecuenciaElemento(padre, elemento, orden, tiempo) {
        var _this = this;
        this.seleccionado = false;
        this.padre = padre;
        this.tiempo = tiempo;
        this.contenedor = document.createElement("div");
        this.elemento = elemento;
        this.contenedor.append(this.elemento);
        this.contenedor.className = "contenedor__imagen";
        this.orden = orden;
        this.elemento.addEventListener("click", function (e) {
            var clasname = _this.contenedor.className;
            if (_this.seleccionado == false) {
                _this.contenedor.className = clasname + " selecionado";
                if (_this.padre.actual == _this.orden) {
                    if (_this.padre.intentoAcierto != null) {
                        _this.padre.intentoAcierto();
                        _this.padre.aciertos++;
                    }
                }
                else {
                    if (_this.padre.intentoFallo != null) {
                        _this.padre.intentoFallo();
                    }
                }
                _this.padre.actual++;
                if (_this.padre.actual >= _this.padre.elementos.length) {
                    if (_this.padre.validacion != null) {
                        var respuesta = false;
                        if (_this.padre.aciertos >= _this.padre.elementos.length) {
                            respuesta = true;
                        }
                        _this.padre.validacion(respuesta);
                    }
                }
            }
            _this.seleccionado = true;
        });
    }
    return SecuenciaElemento;
}());
