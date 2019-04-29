"use strict";
var Basura = /** @class */ (function () {
    function Basura(url, categoria, padre) {
        var _this = this;
        this.clasificado = false;
        this.basura = document.createElement('div');
        var img = document.createElement('img');
        this.categoria = categoria;
        this.validado = true;
        this.basura.append(img);
        img.className = "recurso";
        img.src = url;
        this.basura.style.marginTop = Math.floor((Math.random() * 40) + 1) + "px";
        this.basura.style.marginBottom = Math.floor((Math.random() * 40) + 1) + "px";
        this.basura.style.marginRight = Math.floor((Math.random() * 62) + 1) + "px";
        this.basura.style.marginLeft = Math.floor((Math.random() * 62) + 1) + "px";
        this.basura.addEventListener("mousedown", function () {
            if (_this.padre != null) {
                _this.padre.seleccion = _this;
            }
        });
    }
    Basura.prototype.validar = function () {
        this.clasificado = true;
    };
    return Basura;
}());
var Basura_elemento = /** @class */ (function () {
    function Basura_elemento(elemento, categoria, padre) {
        var _this = this;
        this.clasificado = false;
        this.basura = document.createElement('div');
        var img = document.createElement('img');
        this.categoria = categoria;
        this.validado = true;
        this.basura = elemento;
        img.className = "recurso";
        this.basura.addEventListener("mousedown", function () {
            if (_this.padre != null) {
                _this.padre.seleccion = _this;
            }
        });
    }
    Basura_elemento.prototype.validar = function () {
        this.clasificado = true;
    };
    return Basura_elemento;
}());
var Reciclaje = /** @class */ (function () {
    function Reciclaje() {
        this.aciertos = 0;
        this.fallas = 0;
        this.elementos = new Array();
        this.contenedor = document.createElement('div');
    }
    Reciclaje.prototype.agregar = function (basura) {
        basura.padre = this;
        this.elementos.push(basura);
        this.contenedor.append(basura.basura);
    };
    Reciclaje.prototype.reset = function (style) {
        if (style == null) {
            if (this.seleccion != null) {
                this.seleccion.basura.style.left = "0";
                this.seleccion.basura.style.top = "0";
                this.seleccion.basura.style.margin = "15px";
            }
        }
        else {
            if (this.seleccion != null) {
                style(this.seleccion.basura);
            }
        }
    };
    Reciclaje.prototype.validarBasura = function (comparacion) {
        if (this.seleccion != null) {
            this.seleccion.clasificado = true;
            this.validar();
            if (this.seleccion.categoria == comparacion) {
                this.aciertos++;
                return true;
            }
            else {
                this.fallas;
                return false;
            }
        }
    };
    Reciclaje.prototype.getElemento = function () {
        return this.contenedor;
    };
    Reciclaje.prototype.validar = function () {
        var num = 0;
        this.elementos.forEach(function (b) {
            if (b.clasificado) {
                num++;
            }
        });
        if (num >= this.elementos.length) {
            return true;
        }
        else {
            return false;
        }
    };
    return Reciclaje;
}());
