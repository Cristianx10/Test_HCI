"use strict";
function startgame() {
    var tablero__rompecabeza = document.querySelector(".table__rompecabezas");
    var temp_seleccion;
    var sobre;
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
        function Ficha(elemento, orden, posicion, rotacion) {
            var _this = this;
            this.elemento = document.createElement('div');
            this.elemento.className = "ficha";
            this.elemento.appendChild(elemento);
            this.tem_pos = {};
            this.tem_pos.left = this.elemento.style.left;
            this.tem_pos.top = this.elemento.style.top;
            this.angulo = rotacion;
            this.rotar = false;
            this.elemento.style.transform = "rotate(" + this.angulo * 90 + "deg)";
            this.elemento.addEventListener("mousedown", function () {
                _this.tem_pos.left = _this.elemento.style.left;
                _this.tem_pos.top = _this.elemento.style.top;
                temp_seleccion = { elemento: _this.elemento, x: _this.tem_pos.left, y: _this.tem_pos.top, angulo: _this.angulo };
                _this.elemento.style.zIndex = "1000000";
            });
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
            this.elemento.addEventListener("click", function () {
                if (_this.rotar) {
                    _this.angulo += 1;
                    /*  if (this.angulo > 3) {
                        this.angulo = 0;
                      }*/
                    _this.elemento.style.transition = "all .5s ease";
                    _this.elemento.style.transform = "rotate(" + _this.angulo * 90 + "deg)";
                    setTimeout(function () {
                        _this.elemento.style.transition = "none";
                        _this.tablero.validacion();
                    }, 500);
                    _this.rotar = false;
                }
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
                        _this.tablero.validacion();
                    }, 500);
                }
                sobre = false;
            });
            this.original = document.createElement("div");
            this.original.className = "zona";
            this.orden = orden;
            this.posicion = posicion;
        }
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
            this.posiciones = crearMatrix(this.columnas, this.filas, this.width, this.height);
            for (var i = 0; i < this.fichas.length; i++) {
                var o = this.fichas[this.fichas[i].posicion].original;
                o.style.left = this.posiciones[i].x + "px";
                o.style.top = this.posiciones[i].y + "px";
                this.tablero__zonas.appendChild(o);
                var e = this.fichas[i].elemento;
                e.style.left = this.posiciones[this.fichas[i].orden].x + "px";
                e.style.top = this.posiciones[this.fichas[i].orden].y + "px";
                this.tablero__fichas.appendChild(e);
            }
        };
        Tablero.prototype.validacion = function () {
            var con = 0;
            for (var i = 0; i < this.fichas.length; i++) {
                var f = this.fichas[i];
                if (f.original.style.left == f.elemento.style.left && f.original.style.top == f.elemento.style.top && (f.angulo * 90) % 360 == 0) {
                    con++;
                }
            }
            if (con == this.fichas.length) {
                alert("Felicitaciones Ganaste");
                RESULTADO.sumar("ingenieria", 5);
                return true;
            }
            else {
                console.log("Sigue intentando");
                RESULTADO.sumar("ingenieria", -1);
                return false;
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
    function shuffle(array) {
        array.sort(function () { return Math.random() - 0.5; });
    }
    function cargarRecursos() {
        var width = 200;
        var columnas = 3;
        var filas = 3;
        var url = info.secciones.rompecabeza;
        var fichas = [];
        var imagenes = cargarImagen(url, width, width, columnas, filas);
        //console.log(imagenes);
        var orden = [];
        var rota = [];
        for (var i = 0; i < imagenes.length; i++) {
            orden.push(i);
            rota.push(90 * i);
        }
        shuffle(orden);
        // console.log(rota);
        for (var i = 0; i < imagenes.length; i++) {
            var e = imagenes[i];
            fichas.push(new Ficha(e, orden[i], i, rota[i]));
        }
        var tab = new Tablero(fichas, columnas, filas, width);
        tablero__rompecabeza.appendChild(tab.getTablero());
        $(".ficha").draggable();
    }
}
$(document).ready(function () {
    startgame();
});
