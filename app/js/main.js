"use strict";
var Resultados = /** @class */ (function () {
    function Resultados() {
        this.categorias = {};
        this.pruebas = [];
        localStorage.clear();
        if (this.categorias == null) {
            this.categorias = {};
        }
    }
    Resultados.prototype.resultados = function (pru) {
        this.pruebas.push(pru);
    };
    Resultados.prototype.sumar = function (nombre, valor) {
        if (this.categorias[nombre] == null) {
            this.categorias[nombre] = 0;
        }
        this.categorias[nombre] += valor;
    };
    return Resultados;
}());
var RESULTADO = new Resultados();
var Navegable = /** @class */ (function () {
    function Navegable(elementos) {
        this.elementos = elementos;
        this.secciones = elementos.getElementosHTML();
        this.actual = 0;
        this.secciones.forEach(function (s, i) {
            if (i == 0) {
                s.style.display = "block";
            }
            else {
                s.style.display = "none";
            }
        });
    }
    Navegable.prototype.getElement = function () {
        return this.secciones;
    };
    Navegable.prototype.mostrar = function (seccion) {
        seccion.style.display = "block";
    };
    Navegable.prototype.ocultar = function (seccion) {
        seccion.style.display = "none";
    };
    Navegable.prototype.siguiente = function (accion, final) {
        this.ocultar(this.secciones[this.actual]);
        if (this.actual < this.secciones.length - 1) {
            this.actual++;
            this.mostrar(this.secciones[this.actual]);
            if (accion) {
                accion();
            }
        }
        else {
            if (final) {
                final();
            }
        }
    };
    return Navegable;
}());
var Contenedor = /** @class */ (function () {
    function Contenedor(elementos) {
        this.elementos = elementos;
    }
    Contenedor.prototype.foreachElementos = function (elemento) {
        this.elementos.forEach(function (e) {
            elemento.appendChild(e.elementoHTML);
        });
    };
    Contenedor.prototype.getObjectIndex = function (index) {
        var ElementoHTML = this.elementos[index].getObjeto();
        return ElementoHTML;
    };
    Contenedor.prototype.getElementosHTML = function () {
        var ElementosHTML = new Array();
        this.elementos.forEach(function (e) {
            ElementosHTML.push(e.getElementoHTML());
        });
        this.elementos;
        return ElementosHTML;
    };
    return Contenedor;
}());
var ContenidoA = /** @class */ (function () {
    function ContenidoA(elementoHTML, objeto) {
        this.elementoHTML = elementoHTML;
        this.objeto = objeto;
    }
    ContenidoA.prototype.getElementoHTML = function () {
        return this.elementoHTML;
    };
    ContenidoA.prototype.getObjeto = function () {
        return this.objeto;
    };
    return ContenidoA;
}());
function shuffle(array) {
    array.sort(function () { return Math.random() - 0.5; });
}
function loadJson(ruta, result) {
    var valor;
    var carga = new createjs.LoadQueue();
    carga.loadFile(ruta);
    carga.on("fileload", function (e) {
        valor = e.result;
        result(valor);
    });
}
function askConfirmation(evt) {
    var msg = 'Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?';
    evt.returnValue = msg;
    return msg;
}
//window.addEventListener('beforeunload', askConfirmation);
