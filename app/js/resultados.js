"use strict";
var Resultados = /** @class */ (function () {
    function Resultados(id) {
        this.id = id;
        var reconozido = false;
        var val = localStorage.getItem(id);
        if (val) {
            var variables = JSON.parse(val);
            this.categorias = variables.categorias;
            this.pruebas = variables.pruebas;
            reconozido = true;
        }
        if (reconozido == false) {
            this.categorias = new Array();
            this.pruebas = new Array();
        }
    }
    Resultados.prototype.save = function () {
        localStorage.setItem(this.id, JSON.stringify(this));
    };
    Resultados.prototype.agregar = function (id, prueba) {
        if (this.pruebas != null) {
            this.pruebas.push({ id: id, pruebas: prueba });
        }
        this.save();
    };
    Resultados.prototype.sumar = function (nombre, valor) {
        var categoria = 0;
        var encontrado = false;
        if (this.categorias != null) {
            this.categorias.forEach(function (c, index) {
                if (c.nombre == nombre) {
                    categoria = index;
                    encontrado = true;
                }
            });
            if (encontrado) {
                this.categorias[categoria].valor += valor;
            }
            else {
                this.categorias.push({ nombre: nombre, valor: valor });
            }
        }
        this.save();
    };
    Resultados.prototype.limpiarTodo = function () {
        localStorage.clear();
    };
    Resultados.prototype.removerThis = function () {
        localStorage.removeItem(this.id);
    };
    Resultados.prototype.removerOtro = function (otro) {
        localStorage.removeItem(otro);
    };
    Resultados.prototype.getDatasize = function () {
        var _lsTotal = 0, _xLen, _x;
        for (_x in localStorage) {
            _xLen = ((localStorage[_x].length + _x.length) * 2);
            _lsTotal += _xLen;
            console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
        }
        ;
        console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    };
    Resultados.prototype.descargar = function () {
        var text = JSON.stringify(this), blob = new Blob([text], { type: 'text/plain' }), anchor = document.createElement('a');
        anchor.download = "resultadoDictado.json";
        anchor.href = ( /*window.webkitURL ||*/window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    };
    return Resultados;
}());
var VerResultado = /** @class */ (function () {
    function VerResultado() {
        this.elemento = document.createElement("div");
        this.elemento.className = "resultado__cuadro";
        this.init = random(0, 360);
    }
    VerResultado.prototype.generar = function (categoria, valor, src) {
        this.categoria = categoria;
        this.valor = valor;
        this.src = src;
        this.elemento.innerHTML = "\n        <div class=\"resultado__porcentaje\">\n        <div class=\"circulo\">\n            <input class=\"porcentaje\" type=\"text\" value=\"" + this.valor + "\" data-linecap=round data-angleOffset = \"" + this.init + "\">\n        </div>\n        <img class=\"icono\" src=\"" + this.src + "\" alt=\"\">\n        </div>\n        <div class=\"resultado__informacion\">\n            <h2 class=\"titulo\">" + this.categoria + "</h2>\n            <h3 class=\"valor\">" + this.valor + "%</h3>\n        </div>\n    ";
    };
    VerResultado.prototype.getElemento = function () {
        return this.elemento;
    };
    VerResultado.prototype.felicidades = function () {
        var e = document.createElement("div");
        e.className = "cuadro_felicitaciones";
        e.innerHTML = "\n        <div class=\"cuadro_bordes_lados\">\n        <p><b>\u00A1Felicitaciones!</b> tienes un <b>" + this.valor + "%</b> de aptitud de ser un gran <b>" + this.categoria + "</b></p>\n\n        <div class=\"medalla_icon\">\n                <img src=\"../../includes/iconos/medalla.svg\" alt=\"\">\n                <img class=\"icono\" src=\"" + this.src + "\" alt=\"\">\n            </div>\n        </div>\n        ";
        return e;
    };
    return VerResultado;
}());
