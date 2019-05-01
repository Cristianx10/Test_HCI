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
        if (informacion == null) {
            this.informacion = "";
        }
        else {
            this.informacion = informacion;
        }
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
    Pregunta.prototype.registro = function () {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleccion.informacion }]);
        }
    };
    return Pregunta;
}());
var Opcion = /** @class */ (function () {
    function Opcion(pregunta, valor) {
        var _this = this;
        this.pregunta = pregunta;
        this.elemento = document.createElement('label');
        this.informacion = "";
        this.valor = valor;
        this.elemento.addEventListener("click", function () {
            if (_this.pregunta.seleccion != null) {
                _this.pregunta.seleccion.elemento.classList.remove("seleccion");
            }
            _this.pregunta.seleccion = _this;
            _this.elemento.classList.add("seleccion");
        });
    }
    Opcion.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            resultados.sumar(v.area, v.valor);
        });
    };
    Opcion.prototype.getElemento = function () {
        return this.elemento;
    };
    return Opcion;
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
        var opcion = new OpcionA(this, info, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
    };
    PreguntaA.prototype.validar = function () {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.elemento.innerText },
                { id: "respuesta", valor: this.seleccion.elemento.innerText }]);
        }
    };
    PreguntaA.prototype.getPregunta = function () {
        return this.contenido;
    };
    return PreguntaA;
}(Pregunta));
var OpcionA = /** @class */ (function (_super) {
    __extends(OpcionA, _super);
    function OpcionA(pregunta, info, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.elemento.className = "opcion vertical";
        _this.elemento.innerHTML = "\n        <div class=\"opcion__check\">\n            <input class=\"marcador__input\" type=\"radio\" name=\"opcion\"></input><span class=\"marcador\"></span>\n        </div>\n        <div class=\"informacion\">" + info + "</div>";
        _this.valor = valor;
        return _this;
    }
    return OpcionA;
}(Opcion));
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
            formulario.appendChild(o.getElemento());
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
                    { id: "respuesta", valor: o.elemento.innerText }]);
            }
        });
    };
    PreguntaB.prototype.reset = function () {
        this.opciones.forEach(function (o) {
            o.validado = false;
            o.elemento.classList.remove("opcion__select");
        });
    };
    PreguntaB.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaB;
}(Pregunta));
var OpcionB = /** @class */ (function (_super) {
    __extends(OpcionB, _super);
    function OpcionB(pregunta, info, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.elemento.className = "opcionB";
        _this.validado = false;
        _this.valor = valor;
        _this.elemento.innerHTML = info;
        return _this;
    }
    return OpcionB;
}(Opcion));
/*
    Inicio de la pregunta C

*/
var PreguntaC = /** @class */ (function (_super) {
    __extends(PreguntaC, _super);
    function PreguntaC(informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.elemento.className = "pantalla pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        _this.div_seccionB = document.createElement('section');
        var formulario = document.createElement('div');
        div_seccionA.className = "pregunta__titulo";
        _this.div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = _this.informacion;
        _this.elemento.appendChild(div_seccionA);
        _this.elemento.appendChild(_this.div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        _this.contenido = new Contenido(_this.getElemento(), _this);
        return _this;
    }
    PreguntaC.prototype.agregar = function (info, valor) {
        var p = new OpcionC(this, info, valor);
        this.div_seccionB.appendChild(p.areaTexto);
        this.opciones = p;
    };
    PreguntaC.prototype.validar = function () {
        if (this.opciones != null) {
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.opciones.areaTexto.value }]);
        }
    };
    PreguntaC.prototype.getPregunta = function () {
        return this.contenido;
    };
    PreguntaC.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaC;
}(Pregunta));
var OpcionC = /** @class */ (function (_super) {
    __extends(OpcionC, _super);
    function OpcionC(pregunta, info, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.elemento.className = "opcionC";
        _this.areaTexto = document.createElement("textarea");
        _this.areaTexto.className = "pregunta__parrafo";
        _this.areaTexto.spellcheck = false;
        // this.areaTexto.type = "text";
        _this.areaTexto.placeholder = "Escribe tu respuesta";
        _this.areaTexto.innerText = info;
        _this.elemento.append(_this.areaTexto);
        _this.validado = false;
        return _this;
    }
    return OpcionC;
}(Opcion));
/* Escala de linker
*/
var PreguntaD = /** @class */ (function (_super) {
    __extends(PreguntaD, _super);
    function PreguntaD(informacion, valor, p, m) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = new OpcionD(_this, valor, p, m);
        _this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = _this.informacion;
        _this.elemento.appendChild(div_seccionA);
        _this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        div_seccionB.appendChild(_this.opciones.elemento);
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
var OpcionD = /** @class */ (function (_super) {
    __extends(OpcionD, _super);
    function OpcionD(pregunta, valor, p, m) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.elemento.className = "likert_escala";
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
        _this.progreso = document.createElement("progress");
        _this.progreso.max = 2;
        _this.progreso.value = 1;
        _this.input = document.createElement("input");
        _this.input.className = "likert";
        _this.input.type = "range";
        _this.input.value = "2";
        _this.input.min = "1";
        _this.input.max = "3";
        _this.input.addEventListener("input", function (e) {
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
        linker.append(_this.progreso, _this.input, label1, label2, label3);
        _this.elemento.append(poco, linker, mucho);
        _this.validado = false;
        _this.valor = valor;
        return _this;
    }
    OpcionD.prototype.validacion = function () {
        var index = parseInt(this.input.value);
        if (index < parseInt(this.input.max)) {
            var inp = this.valor[index - 1];
            resultados.sumar(inp.area, inp.valor);
        }
    };
    return OpcionD;
}(Opcion));
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
        var elemento = new OpcionI(this, info, valor);
        this.formulario.append(elemento.getElemento());
        this.opciones.push(elemento);
    };
    PreguntaI.prototype.validar = function () {
        if (this.seleecion != null) {
            this.seleecion.validacion();
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleecion.elemento.innerText }]);
        }
    };
    PreguntaI.prototype.getPregunta = function () {
        return this.contenido;
    };
    return PreguntaI;
}(Pregunta));
var OpcionI = /** @class */ (function (_super) {
    __extends(OpcionI, _super);
    function OpcionI(pregunta, info, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.informacion = info;
        _this.elemento.className = "opcion";
        _this.elemento.innerHTML = "\n        <div class=\"opcion__check\">\n            <input class=\"marcador__input\" type=\"radio\" name=\"opcion\"></input><span class=\"marcador\"></span>\n        </div>\n        <div class=\"informacion\">" + info + "</div>";
        _this.valor = valor;
        return _this;
    }
    return OpcionI;
}(Opcion));
var PreguntaS = /** @class */ (function (_super) {
    __extends(PreguntaS, _super);
    function PreguntaS() {
        var _this = _super.call(this) || this;
        _this.opciones = new Array();
        _this.texto = document.createElement("p");
        _this.texto.innerText = "___";
        _this.texto.style.textAlign = "center";
        _this.elemento.style.display = "inline-block";
        _this.elemento.className = "elegir__resultado";
        _this.elemento.append(_this.texto);
        _this.lista = document.createElement('span');
        _this.lista.className = "elegir__lista";
        _this.elemento.append(_this.lista);
        _this.elemento.addEventListener("click", function () {
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
        return _this;
    }
    PreguntaS.prototype.agregar = function (info, valor) {
        var o = new OpcionS(this, info, valor);
        this.opciones.push(o);
        this.lista.append(o.elemento);
    };
    return PreguntaS;
}(Pregunta));
var OpcionS = /** @class */ (function (_super) {
    __extends(OpcionS, _super);
    function OpcionS(pregunta, info, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        var con_temp = document.createElement('span');
        _this.elemento.append(con_temp);
        _this.elemento.className = "elegir__opcion";
        _this.elemento.innerText = info;
        _this.valor = valor;
        _this.elemento.addEventListener("click", function () {
            if (_this.pregunta.seleccion != null) {
                _this.pregunta.seleccion.elemento.classList.remove("seleccion");
            }
            _this.pregunta.seleccion = _this;
            _this.elemento.classList.add("seleccion");
            var ptem = (_this.pregunta);
            ptem.texto.innerHTML = _this.elemento.innerText;
        });
        return _this;
    }
    return OpcionS;
}(Opcion));
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
        var opcion = new OpcionR(this, info, valor);
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
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
var OpcionR = /** @class */ (function (_super) {
    __extends(OpcionR, _super);
    function OpcionR(pregunta, info, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.informacion = info;
        _this.elemento.innerHTML = info;
        return _this;
    }
    return OpcionR;
}(Opcion));
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
        var opcion = new OpcionP(this, info, valor);
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
    };
    PreguntaP.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaP;
}(Pregunta));
var OpcionP = /** @class */ (function (_super) {
    __extends(OpcionP, _super);
    function OpcionP(pregunta, info, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.informacion = info;
        _this.elemento.className = "opcion__boton";
        _this.elemento.innerHTML = info;
        return _this;
    }
    return OpcionP;
}(Opcion));
