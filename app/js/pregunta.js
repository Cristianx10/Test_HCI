"use strict";
var Opcion = /** @class */ (function () {
    function Opcion(info, valor) {
        this.opcion = document.createElement("label");
        this.check = document.createElement("input");
        this.contenido = document.createElement("span");
        this.opcion.className = "opcion_check";
        this.contenido.className = "opcion";
        this.check.className = "marcador";
        this.check.type = "radio";
        this.check.name = "opcion";
        this.check.checked = false;
        this.opcion.append(this.check);
        this.opcion.append(this.contenido);
        this.opcion.append(info);
        this.valor = valor;
    }
    Opcion.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            RESULTADO.sumar(v.area, v.valor);
        });
    };
    Opcion.prototype.getElement = function () {
        return this.opcion;
    };
    return Opcion;
}());
var Pregunta = /** @class */ (function () {
    function Pregunta(pregunta, opciones) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        var formulario = document.createElement('form');
        formulario.className = "formulario_opciones";
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = this.pregunta;
        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        opciones.forEach(function (element) {
            formulario.appendChild(element.getElement());
        });
        div_seccionB.appendChild(formulario);
    }
    Pregunta.prototype.validar = function () {
        var _this = this;
        this.opciones.forEach(function (opcion) {
            if (opcion.check.checked) {
                opcion.validacion();
                RESULTADO.pruebas.push({ pregunta: _this.elemento.innerText, respuesta: opcion.opcion.innerText });
            }
        });
    };
    Pregunta.prototype.getElement = function () {
        return this.elemento;
    };
    return Pregunta;
}());
var OpcionB = /** @class */ (function () {
    function OpcionB(info, valor) {
        var _this = this;
        this.opcion = document.createElement("div");
        this.opcion.className = "opcionB";
        this.validado = false;
        this.valor = valor;
        this.opcion.innerHTML = info;
        this.opcion.addEventListener('click', function () {
            if (_this.pregunta != null) {
                _this.pregunta.reset();
                _this.validado = true;
                _this.opcion.classList.add("opcion__select");
                if (_this.pregunta.validacion != null) {
                    _this.pregunta.validacion();
                }
            }
        });
    }
    OpcionB.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            RESULTADO.sumar(v.area, v.valor);
        });
    };
    OpcionB.prototype.getElement = function () {
        return this.opcion;
    };
    return OpcionB;
}());
var PreguntaB = /** @class */ (function () {
    function PreguntaB(pregunta, opciones) {
        var _this = this;
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        var formulario = document.createElement('div');
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = this.pregunta;
        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        opciones.forEach(function (o) {
            o.pregunta = _this;
            formulario.appendChild(o.getElement());
        });
        div_seccionB.appendChild(formulario);
    }
    PreguntaB.prototype.validar = function () {
        var _this = this;
        this.opciones.forEach(function (o) {
            if (o.validado) {
                o.validacion();
                RESULTADO.pruebas.push({ pregunta: _this.elemento.innerText, respuesta: o.opcion.innerText });
            }
        });
    };
    PreguntaB.prototype.reset = function () {
        this.opciones.forEach(function (o) {
            o.validado = false;
            o.opcion.classList.remove("opcion__select");
        });
    };
    PreguntaB.prototype.getElement = function () {
        return this.elemento;
    };
    PreguntaB.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaB;
}());
