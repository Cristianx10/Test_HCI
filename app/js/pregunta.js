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
var Pregunta = /** @class */ (function () {
    function Pregunta(informacion) {
        this.informacion = informacion;
        this.elemento = document.createElement('div');
    }
    Pregunta.prototype.incluirEn = function (lugar) {
        var e = document.querySelector(lugar);
        e.append(this.elemento);
    };
    Pregunta.prototype.getElemento = function () {
        return this.elemento;
    };
    Pregunta.prototype.agregarClases = function (clase) {
        this.elemento.classList.add(clase);
    };
    Pregunta.prototype.removerClases = function (clase) {
        this.elemento.classList.remove(clase);
    };
    return Pregunta;
}());
var PreguntaA = /** @class */ (function (_super) {
    __extends(PreguntaA, _super);
    function PreguntaA(informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = new Array();
        _this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        _this.formulario = document.createElement('form');
        _this.formulario.className = "formulario_opciones";
        _this.formulario.onsubmit = function () { return false; };
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = _this.informacion;
        _this.elemento.appendChild(div_seccionA);
        _this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        div_seccionB.appendChild(_this.formulario);
        _this.contenido = new Contenido(_this.getElemento(), _this);
        return _this;
    }
    PreguntaA.prototype.agregar = function (info, valor) {
        var opcion = new OpcionA(info, valor, this);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
    };
    PreguntaA.prototype.validar = function () {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.elemento.innerText },
                { id: "respuesta", valor: this.seleccion.opcion.innerText }]);
        }
    };
    PreguntaA.prototype.getPregunta = function () {
        return this.contenido;
    };
    return PreguntaA;
}(Pregunta));
var OpcionA = /** @class */ (function () {
    function OpcionA(info, valor, pregunta) {
        var _this = this;
        this.pregunta = pregunta;
        this.opcion = document.createElement("label");
        this.opcion.className = "opcion vertical";
        this.opcion.innerHTML = "\n        <div class=\"opcion__check\">\n            <input class=\"marcador__input\" type=\"radio\" name=\"opcion\"></input><span class=\"marcador\"></span>\n        </div>\n        <div class=\"informacion\">" + info + "</div>";
        this.valor = valor;
        this.opcion.addEventListener("click", function () {
            if (_this.pregunta.seleccion != null) {
                _this.pregunta.seleccion.opcion.classList.remove("seleccion");
            }
            _this.pregunta.seleccion = _this;
            _this.opcion.classList.add("seleccion");
        });
    }
    OpcionA.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            resultados.sumar(v.area, v.valor);
        });
    };
    OpcionA.prototype.getElemento = function () {
        return this.opcion;
    };
    return OpcionA;
}());
var PreguntaB = /** @class */ (function (_super) {
    __extends(PreguntaB, _super);
    function PreguntaB(informacion, opciones) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = opciones;
        _this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        var formulario = document.createElement('div');
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = _this.informacion;
        _this.elemento.appendChild(div_seccionA);
        _this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        opciones.forEach(function (o) {
            o.pregunta = _this;
            formulario.appendChild(o.getElement());
        });
        div_seccionB.appendChild(formulario);
        return _this;
    }
    PreguntaB.prototype.validar = function () {
        var _this = this;
        this.opciones.forEach(function (o) {
            if (o.validado) {
                o.validacion();
                resultados.agregar("pregunta", [{ id: "pregunta", valor: _this.elemento.innerText },
                    { id: "respuesta", valor: o.opcion.innerText }]);
            }
        });
    };
    PreguntaB.prototype.reset = function () {
        this.opciones.forEach(function (o) {
            o.validado = false;
            o.opcion.classList.remove("opcion__select");
        });
    };
    PreguntaB.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaB;
}(Pregunta));
var OpcionB = /** @class */ (function () {
    function OpcionB(info, valor) {
        var _this = this;
        this.opcion = document.createElement("div");
        this.opcion.className = "opcionB";
        this.validado = false;
        this.valor = valor;
        this.opcion.innerHTML = info;
        this.opcion.addEventListener('click', function () {
            if (_this.pregunta != null) {
                _this.pregunta.reset();
                _this.validado = true;
                _this.opcion.classList.add("opcion__select");
                if (_this.pregunta.validacion != null) {
                    _this.pregunta.validacion();
                }
            }
        });
    }
    OpcionB.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            resultados.sumar(v.area, v.valor);
        });
    };
    OpcionB.prototype.getElement = function () {
        return this.opcion;
    };
    return OpcionB;
}());
/*
    Inicio de la pregunta C

*/
var PreguntaC = /** @class */ (function (_super) {
    __extends(PreguntaC, _super);
    function PreguntaC(informacion, opciones) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = opciones;
        _this.elemento.className = "pantalla pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        var formulario = document.createElement('div');
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = _this.informacion;
        _this.elemento.appendChild(div_seccionA);
        _this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        /*
                opciones.forEach(o => {
                    o.pregunta = this;
                    formulario.appendChild(o.getElement());
                });
        */
        div_seccionB.appendChild(_this.opciones.areaTexto);
        _this.contenido = new Contenido(_this.getElemento(), _this);
        return _this;
    }
    PreguntaC.prototype.validar = function () {
        resultados.agregar("pregunta", [{ id: "pregunta", valor: this.informacion },
            { id: "respuesta", valor: this.opciones.areaTexto.value }]);
    };
    PreguntaC.prototype.reset = function () {
        /* this.opciones.forEach(o => {
             o.validado = false;
             o.opcion.classList.remove("opcion__select");
         });*/
    };
    PreguntaC.prototype.getPregunta = function () {
        return this.contenido;
    };
    PreguntaC.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaC;
}(Pregunta));
var OpcionC = /** @class */ (function () {
    function OpcionC(info, valor) {
        var _this = this;
        if (valor != null) {
            this.valor = valor;
        }
        else {
            this.valor = new Array();
        }
        this.opcion = document.createElement("div");
        this.opcion.className = "opcionC";
        this.areaTexto = document.createElement("textarea");
        this.areaTexto.className = "pregunta__parrafo";
        this.areaTexto.spellcheck = false;
        // this.areaTexto.type = "text";
        this.areaTexto.placeholder = "Escribe tu respuesta";
        if (info != null) {
            this.areaTexto.innerText = info;
        }
        this.opcion.append(this.areaTexto);
        this.validado = false;
        this.opcion.addEventListener('click', function () {
            if (_this.pregunta != null) {
                _this.pregunta.reset();
                _this.validado = true;
                _this.opcion.classList.add("opcion__select");
                if (_this.pregunta.validacion != null) {
                    _this.pregunta.validacion();
                }
            }
        });
    }
    OpcionC.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            resultados.sumar(v.area, v.valor);
        });
    };
    OpcionC.prototype.getElement = function () {
        return this.opcion;
    };
    return OpcionC;
}());
/* Escala de linker
*/
var PreguntaD = /** @class */ (function (_super) {
    __extends(PreguntaD, _super);
    function PreguntaD(informacion, valor, p, m) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = new OpcionD(valor, p, m);
        _this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        var formulario = document.createElement('div');
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = _this.informacion;
        _this.elemento.appendChild(div_seccionA);
        _this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        div_seccionB.appendChild(_this.opciones.opcion);
        _this.contenido = new Contenido(_this.getElemento(), _this);
        return _this;
    }
    PreguntaD.prototype.validar = function () {
        this.opciones.validacion();
        resultados.agregar("pregunta", [{ id: "pregunta", valor: this.informacion },
            { id: "respuesta", valor: this.opciones.input.value }]);
    };
    PreguntaD.prototype.getPregunta = function () {
        return this.contenido;
    };
    PreguntaD.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaD;
}(Pregunta));
var OpcionD = /** @class */ (function () {
    function OpcionD(valor, p, m) {
        var _this = this;
        this.opcion = document.createElement("div");
        this.opcion.className = "likert_escala";
        var poco = document.createElement("label");
        poco.className = "likert_label";
        if (p != null) {
            poco.innerText = p;
        }
        else {
            poco.innerText = "Poco";
        }
        var linker = document.createElement("div");
        linker.className = "likert_cont";
        linker.style.position = " relative";
        this.progreso = document.createElement("progress");
        this.progreso.max = 2;
        this.progreso.value = 1;
        this.input = document.createElement("input");
        this.input.className = "likert";
        this.input.type = "range";
        this.input.value = "2";
        this.input.min = "1";
        this.input.max = "3";
        this.input.addEventListener("input", function (e) {
            _this.progreso.value = parseInt(_this.input.value) - 1;
        });
        var label1 = document.createElement("label");
        label1.className = "likert_valores";
        label1.innerText = "1";
        var label2 = document.createElement("label");
        label2.className = "likert_valores";
        label2.innerText = "2";
        var label3 = document.createElement("label");
        label3.className = "likert_valores";
        label3.innerText = "3";
        var mucho = document.createElement("label");
        mucho.className = "likert_label";
        mucho.innerText = "Mucho";
        if (m != null) {
            mucho.innerText = m;
        }
        else {
            mucho.innerText = "Mucho";
        }
        linker.append(this.progreso, this.input, label1, label2, label3);
        this.opcion.append(poco, linker, mucho);
        this.validado = false;
        this.valor = valor;
    }
    OpcionD.prototype.validacion = function () {
        var index = parseInt(this.input.value);
        if (index < parseInt(this.input.max)) {
            var inp = this.valor[index - 1];
            resultados.sumar(inp.area, inp.valor);
        }
    };
    OpcionD.prototype.getElement = function () {
        return this.opcion;
    };
    return OpcionD;
}());
var PreguntaI = /** @class */ (function (_super) {
    __extends(PreguntaI, _super);
    function PreguntaI(informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = new Array();
        _this.elemento.className = "pregunta pimagen";
        var contenedor = document.createElement("div");
        contenedor.className = "pregunta__contenedor";
        _this.elemento.appendChild(contenedor);
        var div_seccionA = document.createElement('div');
        div_seccionA.className = "pregunta__titulo";
        div_seccionA.innerHTML = informacion;
        var div_seccionC = document.createElement('section');
        div_seccionC.className = "pregunta__opciones";
        div_seccionC.style.width = "100%";
        _this.formulario = document.createElement('form');
        _this.formulario.className = "formulario__opciones__imagen";
        _this.formulario.name = "f";
        _this.formulario.method = "GET";
        _this.formulario.onsubmit = function () { return false; };
        contenedor.appendChild(div_seccionA);
        contenedor.append(div_seccionC);
        div_seccionC.append(_this.formulario);
        console.log(_this.getElemento());
        _this.contenido = new Contenido(_this.getElemento(), _this);
        return _this;
    }
    PreguntaI.prototype.agregar = function (info, valor) {
        var elemento = new OpcionI(info, valor, this);
        this.formulario.append(elemento.getElement());
        this.opciones.push(elemento);
    };
    PreguntaI.prototype.validar = function () {
        if (this.seleecion != null) {
            this.seleecion.validacion();
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleecion.opcion.innerText }]);
        }
    };
    PreguntaI.prototype.getPregunta = function () {
        return this.contenido;
    };
    return PreguntaI;
}(Pregunta));
var OpcionI = /** @class */ (function () {
    function OpcionI(info, valor, pregunta) {
        var _this = this;
        this.pregunta = pregunta;
        this.informacion = info;
        this.opcion = document.createElement("label");
        this.opcion.className = "opcion";
        this.opcion.innerHTML = "\n        <div class=\"opcion__check\">\n            <input class=\"marcador__input\" type=\"radio\" name=\"opcion\"></input><span class=\"marcador\"></span>\n        </div>\n        <div class=\"informacion\">" + info + "</div>";
        this.valor = valor;
        this.opcion.addEventListener("click", function () {
            if (_this.pregunta.seleecion != null) {
                _this.pregunta.seleecion.opcion.classList.remove("seleccion");
            }
            _this.pregunta.seleecion = _this;
            _this.opcion.classList.add("seleccion");
        });
    }
    OpcionI.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            resultados.sumar(v.area, v.valor);
        });
    };
    OpcionI.prototype.getElement = function () {
        return this.opcion;
    };
    return OpcionI;
}());
var PreguntaS = /** @class */ (function () {
    function PreguntaS() {
        var _this = this;
        this.opciones = new Array();
        this.texto = document.createElement("p");
        this.texto.innerText = "___";
        this.texto.style.textAlign = "center";
        this.elemento = document.createElement('div');
        this.elemento.style.display = "inline-block";
        this.elemento.className = "elegir__resultado";
        this.elemento.append(this.texto);
        this.lista = document.createElement('span');
        this.lista.className = "elegir__lista";
        this.elemento.append(this.lista);
        this.elemento.addEventListener("click", function () {
            if (_this.lista.style.display == "") {
                _this.lista.style.display = "flex";
            }
            else if (_this.lista.style.display == "flex") {
                _this.lista.style.display = "none";
            }
            else {
                _this.lista.style.display = "flex";
            }
        });
    }
    PreguntaS.prototype.agregar = function (info, valor) {
        var o = new OpcionS(info, valor, this);
        this.opciones.push(o);
        this.lista.append(o.elemento);
    };
    PreguntaS.prototype.incluirEn = function (lugar) {
        var e = document.querySelector(lugar);
        e.append(this.elemento);
    };
    return PreguntaS;
}());
var OpcionS = /** @class */ (function () {
    function OpcionS(info, valor, padre) {
        var _this = this;
        this.padre = padre;
        this.elemento = document.createElement('span');
        this.elemento.className = "elegir__opcion";
        this.elemento.innerText = info;
        this.valor = valor;
        this.elemento.addEventListener("click", function () {
            _this.padre.seleccionActual = _this;
            _this.padre.texto.innerHTML = _this.elemento.innerText;
        });
    }
    return OpcionS;
}());
var PreguntaR = /** @class */ (function (_super) {
    __extends(PreguntaR, _super);
    function PreguntaR(informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = new Array();
        _this.elemento.className = "instruccion";
        _this.preguntaHTML = document.createElement('div');
        _this.preguntaHTML.innerHTML = informacion;
        _this.opcionesHTML = document.createElement('div');
        _this.preguntaHTML.className = "instruccion__pregunta";
        _this.opcionesHTML.className = "instruccion__opciones";
        _this.elemento.append(_this.preguntaHTML);
        _this.elemento.append(_this.opcionesHTML);
        return _this;
    }
    PreguntaR.prototype.agregar = function (info, valor) {
        var opcion = new OpcionR(info, valor);
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.opcion);
    };
    PreguntaR.prototype.validar = function () {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleccion.informacion }]);
        }
    };
    PreguntaR.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaR;
}(Pregunta));
var OpcionR = /** @class */ (function () {
    function OpcionR(info, valor) {
        var _this = this;
        this.informacion = info;
        this.opcion = document.createElement("div");
        this.valor = valor;
        this.opcion.innerHTML = info;
        this.opcion.addEventListener('click', function () {
            if (_this.pregunta != null) {
                if (_this.pregunta.seleccion != null) {
                    _this.pregunta.seleccion.opcion.classList.remove("seleccion");
                }
                _this.pregunta.seleccion = _this;
                _this.opcion.classList.add("seleccion");
            }
        });
    }
    OpcionR.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            resultados.sumar(v.area, v.valor);
        });
    };
    OpcionR.prototype.getElemento = function () {
        return this.opcion;
    };
    return OpcionR;
}());
var PreguntaP = /** @class */ (function (_super) {
    __extends(PreguntaP, _super);
    function PreguntaP(imagen, informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = new Array();
        _this.elemento.className = "preguntaImagen";
        _this.preguntaHTML = document.createElement('div');
        _this.preguntaHTML.className = "preguntaImagen__imagen";
        _this.preguntaHTML.innerHTML = imagen;
        _this.opcionesHTML = document.createElement('div');
        _this.preguntaText = document.createElement('div');
        _this.preguntaText.innerHTML = informacion;
        _this.preguntaText.className = "preguntaImagen__pregunta";
        var cont_temp = document.createElement('div');
        cont_temp.className = "preguntaImagen__info";
        _this.opcionesHTML.className = "preguntaImagen__opciones";
        _this.elemento.append(_this.preguntaHTML);
        cont_temp.appendChild(_this.preguntaText);
        cont_temp.appendChild(_this.opcionesHTML);
        _this.elemento.appendChild(cont_temp);
        return _this;
    }
    PreguntaP.prototype.agregar = function (info, valor) {
        var opcion = new OpcionP(info, valor);
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.opcion);
    };
    PreguntaP.prototype.validar = function () {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleccion.informacion }]);
        }
    };
    PreguntaP.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaP;
}(Pregunta));
var OpcionP = /** @class */ (function () {
    function OpcionP(info, valor) {
        var _this = this;
        this.informacion = info;
        this.opcion = document.createElement("div");
        this.opcion.className = "opcion__boton";
        this.valor = valor;
        this.opcion.innerHTML = info;
        this.opcion.addEventListener('click', function () {
            if (_this.pregunta != null) {
                if (_this.pregunta.seleccion != null) {
                    _this.pregunta.seleccion.opcion.classList.remove("seleccion");
                }
                _this.pregunta.seleccion = _this;
                _this.opcion.classList.add("seleccion");
            }
        });
    }
    OpcionP.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            resultados.sumar(v.area, v.valor);
        });
    };
    OpcionP.prototype.getElemento = function () {
        return this.opcion;
    };
    return OpcionP;
}());
