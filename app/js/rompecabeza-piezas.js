"use strict";
var temp_seleccion;
var sobre;
function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}
var Ficha = /** @class */ (function () {
    function Ficha(elemento, orden, posicion, rotacion) {
        var _this = this;
        this.elemento = document.createElement('div');
        this.elemento.className = "ficha";
        this.cotenido = document.createElement("div");
        this.cotenido.className = "ficha_cotenido";
        this.placeholder = document.createElement("div");
        this.placeholder.className = "ficha_holder";
        this.placeholder.style.position = "absolute";
        this.placeholder.style.bottom = "0";
        this.placeholder.style.width = "100%";
        this.placeholder.style.height = "100%";
        this.placeholder.style.backgroundSize = "contain";
        this.cotenido.append(elemento);
        this.elemento.append(this.cotenido, this.placeholder);
        this.tem_pos = {};
        this.tem_pos.left = this.elemento.style.left;
        this.tem_pos.top = this.elemento.style.top;
        this.angulo = rotacion;
        this.rotar = false;
        this.cotenido.style.transform = "rotate(" + this.angulo * 90 + "deg)";
        this.elemento.addEventListener("click", function () {
            if (_this.rotar) {
                _this.angulo += 1;
                _this.cotenido.style.transition = "all .5s ease";
                _this.cotenido.style.transform = "rotate(" + _this.angulo * 90 + "deg)";
                setTimeout(function () {
                    _this.cotenido.style.transition = "none";
                    _this.tablero.validar();
                }, 500);
                _this.rotar = false;
            }
        });
        this.original = document.createElement("div");
        this.original.className = "zona";
        this.orden = orden;
        this.posicion = posicion;
    }
    Ficha.prototype.setPlaceholder = function (url) {
        this.placeholder.style.backgroundImage = "url(" + url + ")";
    };
    Ficha.prototype.soloRotacion = function () {
        var _this = this;
        this.rotar = true;
        this.elemento.addEventListener("click", function () {
            _this.rotar = true;
        });
    };
    Ficha.prototype.activarArrastre = function () {
        var _this = this;
        this.elemento.addEventListener("mouseup", function () {
            if (_this.elemento.style.left == _this.tem_pos.left && _this.elemento.style.top == _this.tem_pos.top) {
                _this.rotar = true;
            }
            _this.elemento.style.left = _this.tem_pos.left;
            _this.elemento.style.top = _this.tem_pos.top;
            _this.elemento.style.zIndex = "0";
            sobre = true;
            setTimeout(function () {
                sobre = false;
            }, 30);
        });
        this.elemento.addEventListener("mousedown", function () {
            _this.tem_pos.left = _this.elemento.style.left;
            _this.tem_pos.top = _this.elemento.style.top;
            temp_seleccion = { elemento: _this.elemento, x: _this.tem_pos.left, y: _this.tem_pos.top, angulo: _this.angulo };
            _this.elemento.style.zIndex = "1000000";
        });
        this.elemento.addEventListener("mouseover", function (e) {
            if (sobre) {
                _this.elemento.style.transition = "all .5s ease";
                //temp_seleccion.elemento.style.transition = "all .5s ease";
                temp_seleccion.elemento.style.left = _this.elemento.style.left;
                temp_seleccion.elemento.style.top = _this.elemento.style.top;
                _this.elemento.style.left = temp_seleccion.x;
                _this.elemento.style.top = temp_seleccion.y;
                var a = temp_seleccion.angulo - 1;
                temp_seleccion.elemento.style.zIndex = "0";
                temp_seleccion = null;
                sobre = false;
                setTimeout(function () {
                    _this.elemento.style.transition = "none";
                    //temp_seleccion.elemento.style.transition = "none";
                    _this.tablero.validar();
                }, 500);
            }
            sobre = false;
        });
    };
    return Ficha;
}());
var Tablero = /** @class */ (function () {
    function Tablero(fichas, columnas, filas, tamano) {
        var _this = this;
        this.margin = 10;
        this.fichas = fichas;
        this.columnas = columnas;
        this.width = tamano;
        this.height = tamano;
        this.filas = filas;
        this.intentos = 0;
        this.tablero = document.createElement("div");
        this.tablero__zonas = document.createElement("div");
        this.tablero__fichas = document.createElement("div");
        fichas.forEach(function (e) {
            e.tablero = _this;
        });
        this.crearTablero();
        this.repartir();
    }
    Tablero.prototype.crearTablero = function () {
        this.tablero.className = "rompecabeza";
        this.tablero__zonas.className = "rompecabeza__zona";
        this.tablero__fichas.className = "rompecabeza__ficha";
        this.tablero.appendChild(this.tablero__zonas);
        this.tablero.appendChild(this.tablero__fichas);
    };
    Tablero.prototype.setTamano = function (width, height) {
        this.tablero.style.width = width + "px";
        this.tablero.style.height = height + "px";
    };
    Tablero.prototype.getMatrix = function (posicion) {
    };
    Tablero.prototype.repartir = function () {
        this.posiciones = crearMatrix(this.columnas, this.filas, this.width, this.height);
        for (var i = 0; i < this.fichas.length; i++) {
            var o = this.fichas[this.fichas[i].posicion].original;
            o.style.left = this.posiciones[i].x + "px";
            o.style.top = this.posiciones[i].y + "px";
            this.tablero__zonas.appendChild(o);
            var e = this.fichas[i].elemento;
            e.style.left = this.posiciones[this.fichas[i].orden].x + "px";
            e.style.top = this.posiciones[this.fichas[i].orden].y + "px";
            //console.log(this.posiciones[i].x, this.posiciones[this.fichas[i].orden].x);
            this.tablero__fichas.appendChild(e);
        }
    };
    Tablero.prototype.setPlaceholder = function (url) {
        this.fichas.forEach(function (f) {
            f.setPlaceholder(url);
        });
    };
    Tablero.prototype.activarArrastre = function () {
        this.fichas.forEach(function (f) {
            f.activarArrastre();
        });
        $(".ficha").draggable();
    };
    Tablero.prototype.activarRotacion = function () {
        this.fichas.forEach(function (f) {
            f.soloRotacion();
        });
    };
    Tablero.prototype.validar = function () {
        var con = 0;
        for (var i = 0; i < this.fichas.length; i++) {
            var f = this.fichas[i];
            if (f.original.style.left == f.elemento.style.left && f.original.style.top == f.elemento.style.top && (f.angulo * 90) % 360 == 0) {
                con++;
            }
        }
        if (con == this.fichas.length) {
            if (this.validacion != null) {
                this.validacion(this.intentos);
            }
            return true;
        }
        else {
            this.intentos++;
            if (this.intentoFallo != null) {
                this.intentoFallo(this.intentos);
            }
            return false;
        }
    };
    Tablero.prototype.getTablero = function () {
        return this.tablero;
    };
    Tablero.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    Tablero.prototype.setIntentoFallo = function (intentoFallo) {
        this.intentoFallo = intentoFallo;
    };
    return Tablero;
}());
