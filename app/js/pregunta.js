"use strict";
var Opcion = /** @class */ (function () {
    function Opcion(info, valor) {
        this.opcion = document.createElement("label");
        this.check = document.createElement("input");
        this.check.type = "radio";
        this.check.name = "opcion";
        this.opcion.append(this.check);
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
        this.opciones.forEach(function (opcion) {
            if (opcion.valor === opcion.check.checked) {
                console.log("verdadero");
            }
        });
    };
    Pregunta.prototype.getElement = function () {
        return this.elemento;
    };
    return Pregunta;
}());
$(document).ready(function () {
    var preguntas = document.querySelector(".cuestionario__preguntas");
    /*
    
      var opcionA = new Opcion("Opcion A", []);
      var opcionB= new Opcion("Opcion B", 5);
      var opcionC = new Opcion("Opcion C", 5);
      var opcionD = new Opcion("Opcion D", 5);
     
    
      var opciones = [opcionA, opcionB, opcionC, opcionD];
    
      var pregunta = new Pregunta("Cual es la capital de", opciones);
    
    
      preguntas.appendChild(preguntas.appendChild(pregunta.getElement()));
    */
});
