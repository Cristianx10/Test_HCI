"use strict";
/*
interface RespuestaV {
    id: string;
    valor: number;
}
*/
var Resultados = /** @class */ (function () {
    function Resultados(id) {
        this.id = id;
        var reconozido = false;
        var val = localStorage.getItem(id);
        if (val) {
            var variables = JSON.parse(val);
            this.categorias = variables.categorias;
            this.pruebas = variables.pruebas;
            this.maximos = variables.maximos;
            reconozido = true;
        }
        if (reconozido == false) {
            this.categorias = new Array();
            this.pruebas = new Array();
            this.maximos = new Array();
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
        //console.log({ id: id, pruebas: prueba });
    };
    Resultados.prototype.getAreas = function (areas) {
        var areasArray = [];
        for (var i = 0; i < areas.length; i++) {
            var a = areas[i];
            if (this.categorias != null) {
                for (var j = 0; j < this.categorias.length; j++) {
                    var c = this.categorias[j];
                    if (a == c.nombre) {
                        areasArray.push(c);
                        j = this.categorias.length;
                    }
                }
            }
        }
        return areasArray;
    };
    Resultados.prototype.getAreasMaximo = function (areas) {
        var areasArray = [];
        for (var i = 0; i < areas.length; i++) {
            var a = areas[i];
            if (this.maximos != null) {
                for (var j = 0; j < this.maximos.length; j++) {
                    var c = this.maximos[j];
                    if (a == c.area) {
                        areasArray.push(c);
                        j = this.maximos.length;
                    }
                }
            }
        }
        return areasArray;
    };
    Resultados.prototype.getMaximo = function (area) {
        var max;
        if (this.maximos != null) {
            this.maximos.forEach(function (e) {
                if (area == e.area) {
                    max = e;
                }
            });
        }
        return max;
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
        //console.log({ nombre: nombre, valor: valor });
    };
    Resultados.prototype.calcularMaximo = function (valores) {
        var valorTotal = [];
        valores.forEach(function (v) {
            if (valorTotal != null) {
                for (var i = 0; i < v.valores.length; i++) {
                    var val = v.valores[i];
                    var encontro = false;
                    for (var j = 0; j < valorTotal.length; j++) {
                        var t = valorTotal[j];
                        if (val.area == t.area) {
                            encontro = true;
                            if (val.valor > t.valor) {
                                t.valor = val.valor;
                            }
                        }
                    }
                    if (encontro == false) {
                        valorTotal.push({ area: val.area, valor: val.valor });
                    }
                }
            }
        });
        var categoria = 0;
        var encontrado = false;
        var _loop_1 = function (h) {
            var v = valorTotal[h];
            if (this_1.maximos != null) {
                this_1.maximos.forEach(function (c, index) {
                    if (c.area == v.area) {
                        categoria = index;
                        encontrado = true;
                    }
                });
                if (encontrado) {
                    this_1.maximos[categoria].valor += v.valor;
                }
                else {
                    this_1.maximos.push({ area: v.area, valor: v.valor });
                    // console.log({ area: v.area, valor: v.valor });
                }
            }
        };
        var this_1 = this;
        for (var h = 0; h < valorTotal.length; h++) {
            _loop_1(h);
        }
        this.save();
    };
    /*
    [
        {id:"materia", valor:5},
        {id:"materia2", valor:10},
        {id:"materia3", valor:15},
    ],
    [
        {id:"materia2", valor:5},
        {id:"materia1", valor:10},
        {id:"materia3", valor:15},
    ],



    */
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
        this.color = "#007ACC";
    }
    VerResultado.prototype.cambiarColor = function (color) {
        this.color = color;
    };
    VerResultado.prototype.generar = function (categoria, valor, src) {
        this.categoria = categoria;
        this.valor = valor;
        this.src = src;
        var simpli = categoria.split(" ");
        this.elemento.innerHTML = "\n        <div class=\"resultado__porcentaje\">\n        <div class=\"resultado__porcentaje__circulo\">\n            <input id=\"" + simpli[0] + "\" class=\"porcentaje\" type=\"text\" value=\"" + this.valor + "\" data-linecap=round data-angleOffset = \"" + this.init + "\">\n        </div>\n        <img class=\"icono\" src=\"" + this.src + "\" alt=\"\">\n        </div>\n        <div class=\"resultado__informacion\">\n            <h2 class=\"rtitulo\">" + this.categoria + "</h2>\n            <h3 class=\"rvalor\" style=\"color:" + this.color + ";\">" + this.valor + "%</h3>\n        </div>\n    ";
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
