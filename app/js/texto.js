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
        this.tildes = true;
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
        this.erroresTildes = 0;
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
                    var temp_p = p.palabra.replace(",", "").replace("Á", "A")
                        .replace("É", "E")
                        .replace("Í", "I")
                        .replace("Ó", "O")
                        .replace("Ú", "U")
                        .replace("á", "a")
                        .replace("é", "e")
                        .replace("í", "i")
                        .replace("ó", "o")
                        .replace("ú", "u");
                    var temp_o = o.palabra.replace(",", "").replace("Á", "A")
                        .replace("É", "E")
                        .replace("Í", "I")
                        .replace("Ó", "O")
                        .replace("Ú", "U")
                        .replace("á", "a")
                        .replace("é", "e")
                        .replace("í", "i")
                        .replace("ó", "o")
                        .replace("ú", "u");
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
                var pa = p.palabra.replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u");
                var oa = o.palabra.replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u");
                if (o.coincidencia_mayus && pa.toLowerCase() == oa.toLowerCase()) {
                    if (pa == oa) {
                        o.coincidencia_mayus = false;
                        p.coincidencia_mayus = false;
                        j = this.palabras_original.length;
                    }
                }
                if (o.tildes && pa.toLowerCase() == oa.toLowerCase()) {
                    if ((o.palabra.indexOf("Á") != -1 && p.palabra.indexOf("Á") == -1)
                        || (o.palabra.indexOf("É") != -1 && p.palabra.indexOf("É") == -1)
                        || (o.palabra.indexOf("Í") != -1 && p.palabra.indexOf("Í") == -1)
                        || (o.palabra.indexOf("Ó") != -1 && p.palabra.indexOf("Ó") == -1)
                        || (o.palabra.indexOf("Ú") != -1 && p.palabra.indexOf("Ú") == -1)
                        || (o.palabra.indexOf("á") != -1 && p.palabra.indexOf("á") == -1)
                        || (o.palabra.indexOf("é") != -1 && p.palabra.indexOf("é") == -1)
                        || (o.palabra.indexOf("í") != -1 && p.palabra.indexOf("í") == -1)
                        || (o.palabra.indexOf("ó") != -1 && p.palabra.indexOf("ó") == -1)
                        || (o.palabra.indexOf("ú") != -1 && p.palabra.indexOf("ú") == -1)) {
                        o.tildes = false;
                        p.tildes = false;
                    }
                }
            }
        }
        var erroresMayus = 0;
        var erroresTilde = 0;
        this.palabras_texto.forEach(function (p) {
            if (p.coincidencia_mayus) {
                console.log("Error: " + p.palabra);
                erroresMayus++;
            }
            if (p.tildes == false) {
                erroresTilde++;
            }
        });
        this.erroresTildes = erroresTilde;
        this.coincidencias_mayusculas = erroresMayus;
    };
    Texto_validar.prototype.getErrores = function () {
        return this.palabras_original.length - this.coincidencias;
    };
    Texto_validar.prototype.getErroresStrict = function () {
        return this.palabras_original.length - this.coincidencias_strict;
    };
    Texto_validar.prototype.getErroresTilde = function () {
        return this.erroresTildes;
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
