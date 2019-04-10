"use strict";
function startgame() {
    var tablero__rompecabeza = document.querySelector(".table__rompecabezas");
    var temp_seleccion;
    var temp_objetivo;
    function crearMatrix(colum, fil, wid, hei) {
        var columnas = colum;
        var filas = fil;
        var columna = -1;
        var fila = 0;
        var width = wid;
        var height = hei;
        var length = columnas * filas;
        var arreglo = [];
        for (var i = 0; i < length; i++) {
            columna++;
            var posx = columna * width;
            var posy = fila;
            if ((columna + 1) == columnas) {
                columna = -1;
                fila += height;
            }
            var pos = { x: posx, y: posy, width: width, height: height };
            arreglo.push(pos);
        }
        return arreglo;
    }
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
        function Ficha(elemento, orden, posicion) {
            var _this = this;
            this.elemento = document.createElement('div');
            this.elemento.className = "ficha";
            this.elemento.appendChild(elemento);
            this.tem_pos = {};
            this.elemento.addEventListener("mousedown", function () {
                _this.tem_pos.left = _this.elemento.style.left;
                _this.tem_pos.top = _this.elemento.style.top;
                temp_seleccion = { elemento: _this.elemento, x: _this.tem_pos.left, y: _this.tem_pos.top };
                console.log(temp_seleccion);
            });
            this.elemento.addEventListener("mouseup", function () {
                for (var i = 0; i < _this.tablero.posiciones.length; i++) {
                    var e = _this.tablero.posiciones[i];
                    var x = parseInt(temp_seleccion.x);
                    var y = parseInt(temp_seleccion.y);
                    console.log(x, y);
                    if (getDistance(e.x, e.y, x, y) < e.width / 2) {
                        temp_seleccion.elemento.style.left = _this.elemento.style.left;
                        temp_seleccion.elemento.style.top = _this.elemento.style.top;
                        _this.elemento.style.left = temp_seleccion.x;
                        _this.elemento.style.left = temp_seleccion.y;
                        console.log(_this.elemento);
                        return;
                    }
                }
            });
            this.original = document.createElement("div");
            this.original.className = "zona";
            this.orden = orden;
            this.posicion = posicion;
        }
        return Ficha;
    }());
    var Tablero = /** @class */ (function () {
        function Tablero(fichas) {
            var _this = this;
            this.width = 100;
            this.height = 100;
            this.columnas = 5;
            this.margin = 10;
            this.fichas = fichas;
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
        Tablero.prototype.getMatrix = function (posicion) {
        };
        Tablero.prototype.repartir = function () {
            this.posiciones = crearMatrix(this.columnas, 5, this.width, this.height);
            for (var i = 0; i < this.fichas.length; i++) {
                var o = this.fichas[this.fichas[i].posicion].original;
                o.style.left = this.posiciones[i].x + "px";
                o.style.top = this.posiciones[i].y + "px";
                this.tablero__zonas.appendChild(o);
                var e = this.fichas[this.fichas[i].orden].elemento;
                e.style.left = this.posiciones[this.fichas[i].orden].x + "px";
                e.style.top = this.posiciones[this.fichas[i].orden].y + "px";
                this.tablero__fichas.appendChild(e);
            }
        };
        Tablero.prototype.getTablero = function () {
            return this.tablero;
        };
        return Tablero;
    }());
    function cargarImagen(url, width, height, columnas, filas) {
        var imagenes = new Array();
        var c = -1;
        var f = 0;
        var image = new Image();
        image.src = url; // load the image
        image.style.position = "absolute";
        // console.log("ejecutando");
        var total = filas * columnas;
        for (var i = 0; i < total; i++) {
            var contenedor = document.createElement('div');
            contenedor.style.position = "relative";
            contenedor.style.width = width + "px";
            contenedor.style.height = height + "px";
            contenedor.style.overflow = "hidden";
            var fragmentoImg = image.cloneNode();
            c++;
            fragmentoImg.style.left = -(c * width) + "px";
            fragmentoImg.style.top = f + "px";
            if ((c + 1) == columnas) {
                c = -1;
                f -= height;
            }
            contenedor.appendChild(fragmentoImg);
            imagenes.push(contenedor);
        }
        return imagenes;
    }
    var carga = new createjs.LoadQueue();
    var info;
    carga.loadFile({ src: "../data/rompecabezas.json" });
    carga.on("fileload", function (e) {
        info = e.result;
        cargarRecursos();
    });
    function cargarRecursos() {
        var url = info.secciones.rompecabeza;
        var fichas = [];
        var imagenes = cargarImagen(url, 100, 100, 4, 3);
        console.log(imagenes);
        for (var i = 0; i < imagenes.length; i++) {
            var e = imagenes[i];
            fichas.push(new Ficha(e, i, i));
        }
        var tab = new Tablero(fichas);
        tablero__rompecabeza.appendChild(tab.getTablero());
        $(".ficha").draggable();
    }
}
$(document).ready(function () {
    startgame();
});
