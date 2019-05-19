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
    function Clasificar_elemento(url, categoria) {
        var _this = this;
        this.clasificado = false;
        this.elemento = document.createElement('div');
        var img = document.createElement('img');
        this.categoria = categoria;
        this.validado = true;
        this.elemento.append(img);
        img.className = "recurso";
        img.src = url;
        this.elemento.style.marginTop = Math.floor((Math.random() * 40) + 1) + "px";
        this.elemento.style.marginBottom = Math.floor((Math.random() * 40) + 1) + "px";
        this.elemento.style.marginRight = Math.floor((Math.random() * 62) + 1) + "px";
        this.elemento.style.marginLeft = Math.floor((Math.random() * 62) + 1) + "px";
        this.elemento.addEventListener("mousedown", function () {
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
var Clasificar_elemento_item = /** @class */ (function () {
    function Clasificar_elemento_item(elemento, categoria) {
        var _this = this;
        this.clasificado = false;
        this.elemento = document.createElement('div');
        var img = document.createElement('img');
        this.categoria = categoria;
        this.validado = true;
        this.elemento = elemento;
        img.className = "recurso";
        this.elemento.addEventListener("mousedown", function () {
            if (_this.padre != null) {
                _this.padre.seleccion = _this;
            }
        });
    }
    Clasificar_elemento_item.prototype.validar = function () {
        this.clasificado = true;
    };
    return Clasificar_elemento_item;
}());
var Clasificar = /** @class */ (function (_super) {
    __extends(Clasificar, _super);
    function Clasificar() {
        var _this = _super.call(this) || this;
        _this.zona = "";
        _this.clasificados = 0;
        _this.elementos = new Array();
        _this.tipoId = "Clasificacion";
        return _this;
    }
    Clasificar.prototype.agregarImagen = function (elemento) {
        elemento.padre = this;
        this.elementos.push(elemento);
        this.elemento.append(elemento.elemento);
    };
    Clasificar.prototype.agregar = function (elemento, categoria) {
        var element = new Clasificar_elemento_item(elemento, categoria);
        element.padre = this;
        this.elementos.push(element);
        this.elemento.append(element.elemento);
    };
    Clasificar.prototype.reset = function (style) {
        if (style == null) {
            if (this.seleccion != null) {
                this.seleccion.elemento.style.left = "0";
                this.seleccion.elemento.style.top = "0";
                this.seleccion.elemento.style.margin = "15px";
            }
        }
        else {
            if (this.seleccion != null) {
                style(this.seleccion.elemento);
            }
        }
    };
    Clasificar.prototype.validarelemento = function (comparacion) {
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
    Clasificar.prototype.almacenaje = function (lugares, div, zonas) {
        var _this = this;
        var contenedores = [];
        lugares.forEach(function (element) {
            var con = $(element);
            contenedores.push(con);
        });
        contenedores.forEach(function (c) {
            c.droppable({
                accept: div,
                drop: function (event, ui) {
                    _this.deleteImage(ui.draggable, c, zonas);
                }
            });
        });
    };
    Clasificar.prototype.deleteImage = function ($item, t, zonas) {
        var _this = this;
        $item.fadeIn(function () {
            $item.appendTo(t);
            $item.find(zonas).css("left", "0px");
            _this.clasificados++;
            _this.intentos++;
            if (_this.seleccion != null) {
                if (_this.validarelemento(t[0].id)) {
                    _this.aciertos++;
                    if (_this.intentoAcierto != null) {
                        _this.intentoAcierto();
                    }
                }
                else {
                    if (_this.intentoFallo != null) {
                        _this.intentoFallo();
                    }
                    _this.fallos++;
                }
                if (_this.resetear != null) {
                    _this.resetear(_this.seleccion.elemento);
                }
                else {
                    _this.reset();
                }
            }
            if (_this.clasificados >= _this.elementos.length) {
                if (_this.validacion != null) {
                    _this.valido = true;
                    _this.validacion();
                }
            }
        });
    };
    Clasificar.prototype.arrastrables = function (tipo, padre) {
        var elementos = $(padre);
        $(tipo, elementos).draggable({
            cancel: "a.ui-icon",
            revert: "invalid",
            containment: "document",
            // helper: "clone",
            cursor: "move"
        });
    };
    Clasificar.prototype.setResetear = function (t) {
        this.resetear = t;
    };
    return Clasificar;
}(Interaccion));
