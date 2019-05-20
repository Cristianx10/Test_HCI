"use strict";
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
var margin = 0;
var width = 110;
var height = 110;
var widthMax = 400;
function insertAfter(e, i) {
    if (e.nextSibling) {
        e.parentNode.insertBefore(i, e.nextSibling);
    }
    else {
        e.parentNode.appendChild(i);
    }
}
var Casilla = /** @class */ (function () {
    function Casilla(elemento, up, down, left, right, posicion, tipo) {
        this.contenido = document.createElement('div');
        this.contenido.className = "ficha";
        this.placeholder = document.createElement('div');
        this.placeholder.className = "click";
        this.contenido.style.width = "100px";
        this.contenido.style.height = "100px";
        this.tipo = tipo;
        this.elemento = elemento;
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        this.posicion = posicion;
        this.contenido.appendChild(this.elemento);
        this.validado = false;
    }
    Casilla.prototype.getPadre = function (padre) {
        var _this = this;
        this.padre = padre;
        this.contenido.addEventListener("click", function (e) {
            if (_this.padre != null && _this.padre.lider != null && padre.lider != null && _this.tipo != 1 && _this.padre.lider != _this) {
                if (_this.padre.up(_this.padre.lider.posicion) == _this.posicion
                    || _this.padre.down(_this.padre.lider.posicion) == _this.posicion
                    || _this.padre.left(_this.padre.lider.posicion) == _this.posicion
                    || _this.padre.right(_this.padre.lider.posicion) == _this.posicion) {
                    _this.intercambiarPosicion(padre.lider);
                    if (_this.padre.intentoFallo != null) {
                        _this.padre.intentoFallo();
                    }
                    _this.padre.intentos++;
                }
            }
            if (_this.padre != null) {
                _this.padre.validarSecuencia();
            }
        });
    };
    Casilla.prototype.intercambiarPosicion = function (casilla) {
        var elemento = casilla.contenido;
        var x = elemento.style.left;
        var y = elemento.style.top;
        var pos = casilla.posicion;
        if (this.padre != null) {
            this.padre.casillas[this.posicion] = casilla;
            this.padre.casillas[pos] = this;
            //  console.log("Mi posicion: " + this.padre.casillas.indexOf(this) + "  l: " + this.padre.casillas.indexOf(casilla) );
        }
        casilla.posicion = this.posicion;
        this.posicion = pos;
        elemento.style.left = this.contenido.style.left;
        elemento.style.top = this.contenido.style.top;
        this.contenido.style.left = x;
        this.contenido.style.top = y;
    };
    Casilla.prototype.secuencia = function () {
        if (this.padre != null && this.validado == false) {
            this.validado = true;
            if (this.padre.final != null && this.padre.final.validado) {
                if (this.padre.validacion != null) {
                    this.padre.validacion();
                    this.padre.valido = true;
                }
                // console.log("ganaste");
            }
            if (this.up &&
                this.padre.up(this.posicion) != -1 &&
                this.padre.casillas[this.padre.up(this.posicion)].validado == false &&
                this.padre.casillas[this.padre.up(this.posicion)].down) {
                // console.log("up green  " + this.padre.casillas[this.padre.up(this.posicion)].posicion + "  pos de  " + this.posicion);
                this.padre.casillas[this.padre.up(this.posicion)].secuencia();
            }
            if (this.down &&
                this.padre.down(this.posicion) != -1 &&
                this.padre.casillas[this.padre.down(this.posicion)].validado == false &&
                this.padre.casillas[this.padre.down(this.posicion)].up) {
                //   console.log("down green  " + this.padre.down(this.posicion) + "  " + this.padre.casillas[this.padre.down(this.posicion)].posicion + "  pos de  " + this.posicion);
                this.padre.casillas[this.padre.down(this.posicion)].secuencia();
            }
            if (this.left &&
                this.padre.left(this.posicion) != -1 &&
                this.padre.casillas[this.padre.left(this.posicion)].validado == false &&
                this.padre.casillas[this.padre.left(this.posicion)].right) {
                //   console.log("left green  " + this.padre.left(this.posicion) + "  " + this.padre.casillas[this.padre.left(this.posicion)].posicion + "  pos de  " + this.posicion);
                this.padre.casillas[this.padre.left(this.posicion)].secuencia();
            }
            if (this.right &&
                this.padre.right(this.posicion) != -1 &&
                this.padre.casillas[this.padre.right(this.posicion)].validado == false &&
                this.padre.casillas[this.padre.right(this.posicion)].left) {
                // console.log("right green  " + this.padre.casillas[this.padre.right(this.posicion)].posicion + "  pos de  " + this.posicion);
                this.padre.casillas[this.padre.right(this.posicion)].secuencia();
            }
            this.contenido.style.background = "#E64973";
        }
    };
    Casilla.prototype.setSalidas = function (up, down, left, right) {
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
    };
    return Casilla;
}());
var Pizarra = /** @class */ (function (_super) {
    __extends(Pizarra, _super);
    function Pizarra(inicial, final, lider) {
        var _this = _super.call(this) || this;
        _this.columnas = 5;
        _this.filas = 3;
        _this.width = 103;
        _this.height = 103;
        _this.tipoId = "Tuberias";
        _this.elemento.className = "pizarra";
        _this.casillas = new Array();
        _this.nInicial = inicial;
        _this.nFinal = final;
        _this.nLider = lider;
        _this.fichas = document.createElement('section');
        _this.fichas.className = "pizarra__fichas";
        _this.guias = document.createElement('section');
        _this.guias.className = "pizarra__clicks";
        _this.elemento.appendChild(_this.guias);
        _this.elemento.appendChild(_this.fichas);
        return _this;
    }
    Pizarra.prototype.agregar = function (img, up, down, left, right, posicion, tipo) {
        var a = new Casilla(img, up, down, left, right, posicion, tipo);
        this.casillas.push(a);
    };
    Pizarra.prototype.cargarTablero = function (columnas, filas, width, height) {
        var _this = this;
        this.columnas = columnas;
        this.filas = filas;
        this.width = width;
        this.height = height;
        this.elemento.style.width = columnas * width + "px";
        this.elemento.style.height = filas * height + "px";
        this.inicial = this.casillas[this.nInicial];
        this.final = this.casillas[this.nFinal];
        this.lider = this.casillas[this.nLider];
        // this.inicial.setSalidas(true, true, true, true);
        // this.final.setSalidas(true, true, true, true);
        this.lider.setSalidas(false, false, false, false);
        this.matrix = crearMatrix(this.columnas, this.filas, this.width, this.height);
        this.fichas.style.width = (this.width - margin) + "px";
        this.fichas.style.height = (this.height - margin) + "px";
        this.guias.style.width = (this.width - margin) + "px";
        this.guias.style.height = (this.height - margin) + "px";
        this.casillas.forEach(function (c, i) {
            c.getPadre(_this);
            _this.fichas.appendChild(c.contenido);
            _this.guias.appendChild(c.placeholder);
            c.contenido.style.width = _this.width + "px";
            c.contenido.style.height = _this.height + "px";
            c.contenido.style.left = _this.matrix[i].x + "px";
            c.contenido.style.top = _this.matrix[i].y + "px";
            c.placeholder.style.left = _this.matrix[i].x + "px";
            c.placeholder.style.top = _this.matrix[i].y + "px";
        });
        this.fichas.insertBefore(this.lider.contenido, this.casillas[0].contenido);
        this.guias.insertBefore(this.lider.placeholder, this.casillas[0].placeholder);
        this.lider.contenido.style.background = "#C4C4C3";
        this.validarSecuencia();
    };
    Pizarra.prototype.up = function (posicion) {
        if (posicion < this.casillas.length && posicion - this.columnas >= 0) {
            var pos = posicion - this.columnas;
            return pos;
        }
        else {
            return -1;
        }
    };
    Pizarra.prototype.down = function (posicion) {
        if (posicion + this.columnas < this.casillas.length && posicion >= 0) {
            var pos = posicion + this.columnas;
            return pos;
        }
        else {
            return -1;
        }
    };
    Pizarra.prototype.left = function (posicion) {
        if (posicion < this.casillas.length && posicion - 1 > 0) {
            var pos = 0;
            if (posicion % this.columnas == 0) {
            }
            else {
                pos = posicion - 1;
            }
            return pos;
        }
        else {
            return -1;
        }
    };
    Pizarra.prototype.right = function (posicion) {
        if (posicion + 1 < this.casillas.length && posicion >= 0) {
            var pos = 0;
            if ((posicion + 1) % this.columnas == 0) {
            }
            else {
                pos = posicion + 1;
            }
            // console.log(this.casillas[pos].posicion);
            return pos;
        }
        else {
            return -1;
        }
    };
    Pizarra.prototype.validarSecuencia = function () {
        var _this = this;
        this.casillas.forEach(function (c) {
            c.validado = false;
            if (c != _this.lider && c != _this.inicial) {
                c.contenido.style.background = "#C4C4C3";
            }
        });
        if (this.inicial != null) {
            this.inicial.secuencia();
        }
    };
    Pizarra.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    Pizarra.prototype.setIntentoFallo = function (intentoFallo) {
        this.intentoFallo = intentoFallo;
    };
    return Pizarra;
}(Interaccion));
