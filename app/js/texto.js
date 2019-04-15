"use strict";
/*
    Comentarios abajo del archivo
*/
var Texto_palabra = /** @class */ (function () {
    function Texto_palabra(palabra) {
        this.palabra = palabra;
        this.validado = false;
        this.coincidencia = false;
        this.coincidencia_strict = false;
        this.coincidencia_mayus = true;
        this.puntuacion = true;
    }
    return Texto_palabra;
}());
var Texto_validar = /** @class */ (function () {
    function Texto_validar(original, texto) {
        var _this = this;
        this.original = original.replace("  ", " ").replace("  ", " ");
        this.texto = texto.replace("  ", " ").replace("  ", " ");
        this.coincidencias = 0;
        this.coincidencias_strict = 0;
        this.coincidencias_mayusculas = 0;
        this.erroresPuntuacion = 0;
        this.palabras_original = new Array();
        this.palabras_texto = new Array();
        var palabras_o = this.original.split(" ");
        var palabras_t = this.texto.split(" ");
        palabras_o.forEach(function (p) {
            _this.palabras_original.push(new Texto_palabra(p));
        });
        palabras_t.forEach(function (p) {
            _this.palabras_texto.push(new Texto_palabra(p));
        });
        this.getCoincidencias();
        this.getCoincidenciasStrict();
        this.getErroresMayus();
    }
    Texto_validar.prototype.getCoincidencias = function () {
        for (var i = 0; i < this.palabras_texto.length; i++) {
            var p = this.palabras_texto[i];
            for (var j = 0; j < this.palabras_original.length; j++) {
                var o = this.palabras_original[j];
                if (o.coincidencia == false) {
                    var temp_p = p.palabra.replace(",", "");
                    var temp_o = o.palabra.replace(",", "");
                    temp_p = temp_p.replace(".", "");
                    temp_o = temp_o.replace(".", "");
                    if (temp_p.toLowerCase() == temp_o.toLowerCase()) {
                        o.coincidencia = true;
                        p.coincidencia = true;
                        if ((o.puntuacion && o.palabra.indexOf(",") != -1 && p.palabra.indexOf(",") == -1) ||
                            (o.puntuacion && o.palabra.indexOf(".") != -1 && p.palabra.indexOf(".") == -1)) {
                            p.puntuacion = false;
                            o.puntuacion = false;
                        }
                        j = this.palabras_original.length;
                    }
                }
            }
        }
        var puntos = 0;
        var coincidencia = 0;
        this.palabras_texto.forEach(function (p) {
            if (p.coincidencia) {
                coincidencia++;
            }
            if (p.puntuacion == false) {
                puntos++;
            }
        });
        this.erroresPuntuacion = puntos;
        this.coincidencias = coincidencia;
    };
    Texto_validar.prototype.getCoincidenciasStrict = function () {
        for (var i = 0; i < this.palabras_texto.length; i++) {
            var p = this.palabras_texto[i];
            for (var j = 0; j < this.palabras_original.length; j++) {
                var o = this.palabras_original[j];
                if (o.coincidencia_strict == false && p.palabra == o.palabra) {
                    o.coincidencia_strict = true;
                    p.coincidencia_strict = true;
                    j = this.palabras_original.length;
                }
            }
        }
        var coincidencia = 0;
        this.palabras_texto.forEach(function (p) {
            if (p.coincidencia_strict) {
                coincidencia++;
            }
        });
        this.coincidencias_strict = coincidencia;
    };
    Texto_validar.prototype.getErroresMayus = function () {
        for (var i = 0; i < this.palabras_texto.length; i++) {
            var p = this.palabras_texto[i];
            for (var j = 0; j < this.palabras_original.length; j++) {
                var o = this.palabras_original[j];
                if (o.coincidencia_mayus && p.palabra.toLowerCase() == o.palabra.toLowerCase()) {
                    //console.log("n: "  + this.palabras_texto.length);
                    if (p.palabra == o.palabra) {
                    }
                    else {
                        o.coincidencia_mayus = false;
                        p.coincidencia_mayus = false;
                        j = this.palabras_original.length;
                    }
                }
            }
        }
        var erroresMayus = 0;
        this.palabras_texto.forEach(function (p) {
            if (p.coincidencia_mayus) {
            }
            else {
                erroresMayus++;
            }
        });
        this.coincidencias_mayusculas = erroresMayus;
    };
    Texto_validar.prototype.getErrores = function () {
        return this.palabras_original.length - this.coincidencias;
    };
    Texto_validar.prototype.getErroresStrict = function () {
        return this.palabras_original.length - this.coincidencias_strict;
    };
    Texto_validar.prototype.getErroresMayusculas = function () {
        return this.coincidencias_mayusculas;
    };
    Texto_validar.prototype.getErroresPuntuacion = function () {
        return this.erroresPuntuacion;
    };
    Texto_validar.prototype.getErroresFalto = function () {
        return this.palabras_original.length - this.palabras_texto.length;
    };
    return Texto_validar;
}());
//Aqui hay un ejemplo------------------------------------------------------------------------------------------------
/*
let original = "Mi cara es cuadrada.";
let usuario = "Mi Cara Es";



let texto = new Texto_validar(original, usuario);

//Da los errores sin tener encuenta mayusculas o puntuacion y las que faltaron
console.log(texto.getErrores());

//Da los errores de coincidencia exacta
console.log(texto.getErroresStrict());

//Da los errores de Mayusculas
console.log(texto.getErroresMayusculas());

//Da los errores de Puntuacion, solo "," y "."
console.log(texto.getErroresPuntuacion());

//Da los errores de palabras que faltaron
console.log(texto.getErroresFalto());

*/ 
