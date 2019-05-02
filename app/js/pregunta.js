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
        this.tipoId = "pregunta";
        this.valores = new Array();
        this.elemento = document.createElement('div');
        this.contenido = new Contenido(this.getElemento(), this);
    }
    Pregunta.prototype.incluirEn = function (lugar) {
        var e = document.querySelector(lugar);
        e.append(this.elemento);
    };
    Pregunta.prototype.getElemento = function () {
        return this.elemento;
    };
    Pregunta.prototype.agregarClase = function (clase) {
        this.elemento.classList.add(clase);
    };
    Pregunta.prototype.removerClase = function (clase) {
        this.elemento.classList.remove(clase);
    };
    Pregunta.prototype.agregarResultados = function () {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.calcularMaximo(this.valores);
        }
    };
    Pregunta.prototype.registro = function () {
        if (this.seleccion != null) {
            resultados.agregar(this.tipoId, [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleccion.informacion }]);
        }
    };
    Pregunta.prototype.getPregunta = function () {
        return this.contenido;
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
        return _this;
    }
    PreguntaA.prototype.agregar = function (info, valor) {
        var opcion = new OpcionA(this, info, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
    };
<<<<<<< HEAD
    Pregunta.prototype.getElement = function () {
        return this.elemento;
    };
    return Pregunta;
}());
var PreguntaB = /** @class */ (function () {
    function PreguntaB(pregunta, opciones) {
        var _this = this;
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        var formulario = document.createElement('div');
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = this.pregunta;
        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        opciones.forEach(function (o) {
            o.pregunta = _this;
            formulario.appendChild(o.getElement());
        });
        div_seccionB.appendChild(formulario);
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
    PreguntaB.prototype.getElement = function () {
        return this.elemento;
    };
    PreguntaB.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaB;
}());
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
=======
    return PreguntaA;
}(Pregunta));
var OpcionA = /** @class */ (function (_super) {
    __extends(OpcionA, _super);
    function OpcionA(pregunta, info, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.elemento.className = "opcion";
        _this.elemento.innerHTML = "\n        <div class=\"opcion__check\">\n            <input class=\"marcador__input\" type=\"radio\" name=\"opcion\"></input><span class=\"marcador\"></span>\n        </div>\n        <div class=\"informacion\">" + info + "</div>";
        _this.valor = valor;
        _this.informacion = info;
        return _this;
>>>>>>> master
    }
    return OpcionA;
}(Opcion));
var PreguntaB = /** @class */ (function (_super) {
    __extends(PreguntaB, _super);
    function PreguntaB(informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = new Array();
        _this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        _this.formulario = document.createElement('form');
        _this.formulario.onsubmit = function () { return false; };
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = _this.informacion;
        _this.elemento.appendChild(div_seccionA);
        _this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        div_seccionB.appendChild(_this.formulario);
        return _this;
    }
    PreguntaB.prototype.agregar = function (info, valor) {
        var opcion = new OpcionB(this, info, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
        _this.informacion = info;
        return _this;
    }
    return OpcionB;
<<<<<<< HEAD
}());
=======
}(Opcion));
>>>>>>> master
/*
    Inicio de la pregunta C

*/
<<<<<<< HEAD
var PreguntaC = /** @class */ (function () {
    function PreguntaC(pregunta, opciones) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        var formulario = document.createElement('div');
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = this.pregunta;
        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        /*
                opciones.forEach(o => {
                    o.pregunta = this;
                    formulario.appendChild(o.getElement());
                });
        */
        div_seccionB.appendChild(this.opciones.areaTexto);
    }
    PreguntaC.prototype.validar = function () {
        resultados.agregar("pregunta", [{ id: "pregunta", valor: this.pregunta },
            { id: "respuesta", valor: this.opciones.areaTexto.value }]);
        /* this.opciones.forEach((o: any) => {
             if (o.validado) {
                 o.validacion();
                 
             }
         });*/
    };
    PreguntaC.prototype.reset = function () {
        /* this.opciones.forEach(o => {
             o.validado = false;
             o.opcion.classList.remove("opcion__select");
         });*/
    };
    PreguntaC.prototype.getElement = function () {
        return this.elemento;
    };
    PreguntaC.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaC;
}());
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
var PreguntaD = /** @class */ (function () {
    function PreguntaD(pregunta, opciones) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";
=======
var PreguntaC = /** @class */ (function (_super) {
    __extends(PreguntaC, _super);
    function PreguntaC(informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.elemento.className = "pantalla pregunta";
        _this.opciones = new Array();
>>>>>>> master
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
        return _this;
    }
    PreguntaC.prototype.agregar = function (info, valor) {
        var opcion = new OpcionC(this, info, valor);
        this.div_seccionB.appendChild(opcion.areaTexto);
        this.opciones.push(opcion);
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
        _this.informacion = info;
        _this.areaTexto.placeholder = "Escribe tu respuesta";
        _this.areaTexto.innerText = info;
        _this.elemento.append(_this.areaTexto);
        return _this;
    }
    return OpcionC;
}(Opcion));
/* Escala de linker
*/
var PreguntaD = /** @class */ (function (_super) {
    __extends(PreguntaD, _super);
    function PreguntaD(informacion, p, m) {
        var _this = _super.call(this, informacion) || this;
        _this.opciones = new Array();
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
<<<<<<< HEAD
        div_seccionB.appendChild(this.opciones.opcion);
    }
    PreguntaD.prototype.validar = function () {
        this.opciones.validacion();
        resultados.agregar("pregunta", [{ id: "pregunta", valor: this.pregunta },
            { id: "respuesta", valor: this.opciones.input.value }]);
    };
    PreguntaD.prototype.getElement = function () {
        return this.elemento;
    };
    PreguntaD.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaD;
}());
var OpcionD = /** @class */ (function () {
    function OpcionD(valor) {
        var _this = this;
        this.opcion = document.createElement("div");
        this.opcion.className = "likert_escala";
        var poco = document.createElement("label");
        poco.className = "likert_label";
        poco.innerText = "Poco";
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
var PreguntaI = /** @class */ (function () {
    function PreguntaI(pregunta, opciones) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";
        var contenedor = document.createElement("div");
        contenedor.className = "cont_imgYabc";
        this.elemento.appendChild(contenedor);
        var div_seccionA = document.createElement('div');
        div_seccionA.className = "cont_imgYabc_img";
        div_seccionA.style.backgroundImage = "url(" + pregunta + ")";
        var div_seccionB = document.createElement('div');
        div_seccionB.className = "cont_imgYabc_abc";
        var div_seccionC = document.createElement('section');
        div_seccionC.className = "pregunta__opciones";
        div_seccionC.style.width = "100%";
        var formulario = document.createElement('form');
        formulario.className = "formulario_opciones";
        contenedor.appendChild(div_seccionA);
        contenedor.appendChild(div_seccionB);
        div_seccionB.appendChild(div_seccionC);
        div_seccionC.append(formulario);
        opciones.forEach(function (element) {
            formulario.appendChild(element.getElement());
        });
    }
    PreguntaI.prototype.validar = function () {
        var _this = this;
        this.opciones.forEach(function (opcion) {
            if (opcion.check.checked) {
                opcion.validacion();
                resultados.agregar("pregunta", [{ id: "pregunta", valor: _this.pregunta },
                    { id: "respuesta", valor: opcion.opcion.innerText }]);
=======
        //Configuracion de la barra de linker
        var linker = document.createElement('div');
        linker.className = "likert_escala";
        var poco = document.createElement("label");
        poco.className = "likert_label";
        if (p != null) {
            poco.innerText = p;
        }
        else {
            poco.innerText = "Poco";
        }
        _this.formulario = document.createElement("div");
        _this.formulario.className = "likert__opciones";
        _this.formulario.style.position = " relative";
        _this.progreso = document.createElement("progress");
        _this.progreso.max = _this.opciones.length - 1;
        _this.input = document.createElement("input");
        _this.input.className = "likert";
        _this.input.type = "range";
        _this.input.min = "1";
        _this.progreso.value = parseInt(_this.input.value) - 1;
        _this.input.addEventListener("input", function (e) {
            var v = parseInt(_this.input.value);
            _this.progreso.value = v - 1;
            if (_this.seleccion != null) {
                _this.seleccion.elemento.classList.remove("seleccion");
            }
            _this.seleccion = _this.opciones[v - 1];
            _this.seleccion.elemento.classList.add("seleccion");
        });
        var mucho = document.createElement("label");
        mucho.className = "likert_label";
        mucho.innerText = "Mucho";
        if (m != null) {
            mucho.innerText = m;
        }
        else {
            mucho.innerText = "Mucho";
        }
        var linker__barra = document.createElement('div');
        linker__barra.className = "likert__barra";
        linker__barra.append(_this.progreso, _this.input);
        var linker__lateral = document.createElement('div');
        linker__lateral.className = "likert__lateral";
        linker__lateral.append(poco, linker__barra, mucho);
        linker.append(linker__lateral, _this.formulario);
        div_seccionB.appendChild(linker);
        return _this;
    }
    PreguntaD.prototype.agregar = function (informacion, valor) {
        var opcion = new OpcionD(this, informacion, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
        this.progreso.max = this.opciones.length - 1;
        this.input.max = this.opciones.length + "";
        var resul = this.opciones.length / 2;
        if (resul % 2 == 0) {
            this.input.value = ((this.opciones.length) / 2) + "";
            this.progreso.value = (((this.opciones.length) / 2) - 1);
        }
        else {
            this.input.value = ((this.opciones.length + 1) / 2) + "";
            this.progreso.value = (((this.opciones.length + 1) / 2) - 1);
        }
        var v = parseInt(this.input.value);
        this.progreso.value = v - 1;
        if (this.seleccion != null) {
            this.seleccion.elemento.classList.remove("seleccion");
        }
        this.seleccion = this.opciones[v - 1];
        this.seleccion.elemento.classList.add("seleccion");
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
    };
    PreguntaD.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaD;
}(Pregunta));
var OpcionD = /** @class */ (function (_super) {
    __extends(OpcionD, _super);
    function OpcionD(pregunta, informacion, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.informacion = informacion;
        _this.elemento = document.createElement("label");
        _this.elemento.className = "likert_valores";
        _this.elemento.innerText = _this.informacion;
        _this.valor = valor;
        return _this;
    }
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
        return _this;
    }
    PreguntaI.prototype.agregar = function (info, valor) {
        var opcion = new OpcionI(this, info, valor);
        this.formulario.append(opcion.getElemento());
        this.opciones.push(opcion);
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
>>>>>>> master
            }
        });
        return _this;
    }
    PreguntaS.prototype.agregar = function (info, valor) {
        var opcion = new OpcionS(this, info, valor);
        this.opciones.push(opcion);
        this.lista.append(opcion.elemento);
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
    };
<<<<<<< HEAD
    PreguntaI.prototype.getElement = function () {
        return this.elemento;
    };
    return PreguntaI;
}());
var OpcionI = /** @class */ (function () {
    function OpcionI(info, valor) {
        this.opcion = document.createElement("label");
        this.check = document.createElement("input");
        this.contenido = document.createElement("span");
        this.opcion.className = "opcion_check";
        this.contenido.className = "opcion";
        this.check.className = "marcador";
        this.check.type = "radio";
        this.check.name = "opcion";
        this.check.checked = false;
        this.opcion.append(this.check);
        this.opcion.append(this.contenido);
        this.opcion.append(info);
        this.valor = valor;
    }
    OpcionI.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            resultados.sumar(v.area, v.valor);
=======
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
        _this.informacion = info;
        _this.elemento.addEventListener("click", function () {
            if (_this.pregunta.seleccion != null) {
                _this.pregunta.seleccion.elemento.classList.remove("seleccion");
            }
            _this.pregunta.seleccion = _this;
            _this.elemento.classList.add("seleccion");
            var ptem = (_this.pregunta);
            ptem.texto.innerHTML = _this.elemento.innerText;
>>>>>>> master
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
        _this.elemento.style.display = "flex";
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
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
    };
<<<<<<< HEAD
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
        this.bloque = document.createElement('div');
        this.bloque.style.display = "inline-block";
        this.bloque.className = "elegir__resultado";
        this.bloque.append(this.texto);
        this.lista = document.createElement('span');
        this.lista.className = "elegir__lista";
        this.bloque.append(this.lista);
        this.bloque.addEventListener("click", function () {
            console.log(_this.lista.style.display);
            if (_this.lista.style.display == "") {
                _this.lista.style.display = "flex";
                console.log("puso vacio");
            }
            else if (_this.lista.style.display == "flex") {
                _this.lista.style.display = "none";
                console.log("puso none");
            }
            else {
                _this.lista.style.display = "flex";
                console.log("puso flex");
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
        e.append(this.bloque);
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
var PreguntaR = /** @class */ (function () {
    function PreguntaR(pregunta) {
        this.pregunta = pregunta;
        this.opciones = new Array();
        this.elemento = document.createElement('div');
        this.elemento.className = "instruccion";
        this.preguntaHTML = document.createElement('div');
        this.preguntaHTML.innerHTML = pregunta;
        this.opcionesHTML = document.createElement('div');
        this.preguntaHTML.className = "instruccion__pregunta";
        this.opcionesHTML.className = "instruccion__opciones";
        this.elemento.appendChild(this.preguntaHTML);
        this.elemento.appendChild(this.opcionesHTML);
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
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.pregunta },
                { id: "respuesta", valor: this.seleccion.informacion }]);
        }
    };
    PreguntaR.prototype.incluirEn = function (lugar) {
        var e = document.querySelector(lugar);
        e.append(this.elemento);
    };
    PreguntaR.prototype.getElemento = function () {
        return this.elemento;
    };
    PreguntaR.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaR;
}());
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
var PreguntaP = /** @class */ (function () {
    function PreguntaP(pregunta) {
        this.pregunta = pregunta;
        this.opciones = new Array();
        this.elemento = document.createElement('div');
        this.elemento.className = "instruccion";
        this.preguntaHTML = document.createElement('div');
        this.preguntaHTML.innerHTML = pregunta;
        this.opcionesHTML = document.createElement('div');
        this.preguntaHTML.className = "instruccion__pregunta";
        this.opcionesHTML.className = "instruccion__opciones";
        this.elemento.appendChild(this.preguntaHTML);
        this.elemento.appendChild(this.opcionesHTML);
    }
    PreguntaP.prototype.agregar = function (info, valor) {
        var opcion = new OpcionR(info, valor);
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.opcion);
    };
    PreguntaP.prototype.validar = function () {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar("pregunta", [{ id: "pregunta", valor: this.pregunta },
                { id: "respuesta", valor: this.seleccion.informacion }]);
        }
    };
    PreguntaP.prototype.incluirEn = function (lugar) {
        var e = document.querySelector(lugar);
        e.append(this.elemento);
    };
    PreguntaP.prototype.getElemento = function () {
        return this.elemento;
    };
    PreguntaP.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaP;
}());
var OpcionP = /** @class */ (function () {
    function OpcionP(info, valor) {
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
=======
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
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
    };
    PreguntaP.prototype.agregarB = function (info, valor) {
        var opcion = new OpcionPB(this, info, valor);
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
var OpcionPB = /** @class */ (function (_super) {
    __extends(OpcionPB, _super);
    function OpcionPB(pregunta, info, valor) {
        var _this = _super.call(this, pregunta, valor) || this;
        _this.informacion = info;
        _this.elemento.className = "opcion";
        _this.elemento.innerHTML = "\n        <div class=\"opcion__check\">\n            <input class=\"marcador__input\" type=\"radio\" name=\"opcion\"></input><span class=\"marcador\"></span>\n        </div>\n        <div class=\"informacion\">" + info + "</div>";
        return _this;
    }
    return OpcionPB;
}(Opcion));
>>>>>>> master
