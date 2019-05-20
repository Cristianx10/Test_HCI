"use strict";
/*var temp_seleccion: any;
var sobre: boolean;

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371;
  var dLat = (lat2 - lat1) * (Math.PI / 180);
  var dLon = (lon2 - lon1) * (Math.PI / 180);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var init_arrastrables = 0;
var Ficha = /** @class */ (function () {
    function Ficha(elemento, orden, posicion, rotacion, tablero) {
        this.tablero = tablero;
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
            _this.tablero.sobre = true;
            setTimeout(function () {
                _this.tablero.sobre = false;
            }, 30);
        });
        this.elemento.addEventListener("mousedown", function () {
            _this.tem_pos.left = _this.elemento.style.left;
            _this.tem_pos.top = _this.elemento.style.top;
            _this.tablero.seleccion = _this; //{ elemento: this.elemento, x: this.tem_pos.left, y: this.tem_pos.top, angulo: this.angulo };
            _this.elemento.style.zIndex = "1000000";
        });
        this.elemento.addEventListener("mouseover", function (e) {
            if (_this.tablero.sobre) {
                _this.elemento.style.transition = "all .5s ease";
                //temp_seleccion.elemento.style.transition = "all .5s ease";
                if (_this.tablero.seleccion != null) {
                    var x = _this.tablero.seleccion.elemento.style.left;
                    var y = _this.tablero.seleccion.elemento.style.top;
                    _this.tablero.seleccion.elemento.style.left = _this.elemento.style.left; //.elemento.style.left = this.elemento.style.left;
                    _this.tablero.seleccion.elemento.style.top = _this.elemento.style.top;
                    _this.elemento.style.left = x;
                    _this.elemento.style.top = y;
                    var a = _this.tablero.seleccion.angulo - 1;
                    _this.tablero.seleccion.elemento.style.zIndex = "0";
                    _this.tablero.seleccion = undefined;
                    _this.tablero.sobre = false;
                }
                setTimeout(function () {
                    _this.elemento.style.transition = "none";
                    //temp_seleccion.elemento.style.transition = "none";
                    _this.tablero.validar();
                }, 500);
            }
            _this.tablero.sobre = false;
        });
    };
    return Ficha;
}());
var Tablero = /** @class */ (function (_super) {
    __extends(Tablero, _super);
    function Tablero(columnas, filas, tamano) {
        var _this = _super.call(this) || this;
        _this.margin = 10;
        _this.sobre = false;
        _this.fichas = [];
        _this.columnas = columnas;
        _this.width = tamano;
        _this.height = tamano;
        _this.filas = filas;
        _this.intentos = 0;
        _this.elemento = document.createElement("div");
        _this.tablero__zonas = document.createElement("div");
        _this.tablero__fichas = document.createElement("div");
        _this.elemento.style.width = columnas * tamano + "px";
        _this.elemento.style.height = filas * tamano + "px";
        _this.crearTablero();
        init_arrastrables += 1;
        _this.nameF = "fichan" + init_arrastrables;
        return _this;
    }
    Tablero.prototype.agregar = function (elemento, orden, posicion, rotacion) {
        var elem = new Ficha(elemento, orden, posicion, rotacion, this);
        elem.elemento.classList.add(this.nameF);
        this.fichas.push(elem);
    };
    Tablero.prototype.crearTablero = function () {
        this.elemento.className = "rompecabeza";
        this.tablero__zonas.className = "rompecabeza__zona";
        this.tablero__fichas.className = "rompecabeza__ficha";
        this.elemento.appendChild(this.tablero__zonas);
        this.elemento.appendChild(this.tablero__fichas);
    };
    Tablero.prototype.setTamano = function (width, height) {
        this.elemento.style.width = width + "px";
        this.elemento.style.height = height + "px";
    };
    Tablero.prototype.iniciar = function () {
        this.repartir();
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
        $("." + this.nameF).draggable();
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
    return Tablero;
}(Interaccion));
