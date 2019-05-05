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
var Clasificar_elemento = /** @class */ (function () {
    function Clasificar_elemento(url, categoria, padre) {
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
    Clasificar_elemento.prototype.validar = function () {
        this.clasificado = true;
    };
    return Clasificar_elemento;
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
var Clasificar = /** @class */ (function (_super) {
    __extends(Clasificar, _super);
    function Clasificar() {
        var _this = _super.call(this) || this;
        _this.elementos = new Array();
        return _this;
    }
    Clasificar.prototype.agregar = function (basura) {
        basura.padre = this;
        this.elementos.push(basura);
        this.elemento.append(basura.basura);
    };
    Clasificar.prototype.reset = function (style) {
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
    Clasificar.prototype.validarBasura = function (comparacion) {
        if (this.seleccion != null) {
            this.seleccion.clasificado = true;
            this.validar();
            if (this.seleccion.categoria == comparacion) {
                this.aciertos++;
                return true;
            }
            else {
                this.fallos++;
                return false;
            }
        }
    };
    Clasificar.prototype.validar = function () {
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
    return Clasificar;
}(Interaccion));
