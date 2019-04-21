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
    return Resultados;
}());
