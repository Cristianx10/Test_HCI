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
        this.maximos = new Array();
        this.elemento = document.createElement('div');
        this.contenido = new Contenido(this.getElemento(), this);
    }
    Pregunta.prototype.incluirEn = function (lugar) {
        var e = document.querySelector(lugar);
        if (e == null) {
            alert("tu refenencia de " + lugar + " es nula");
        }
        e.append(this.elemento);
    };
    Pregunta.prototype.getElemento = function () {
        return this.elemento;
    };
    Pregunta.prototype.agregarClase = function (clase) {
        this.elemento.classList.add(clase);
    };
    Pregunta.prototype.agregarMaximos = function (maximos) {
        resultados.agregarMaximo(maximos);
        this.maximos = maximos;
    };
    Pregunta.prototype.agregarResultado = function (valores) {
    };
    Pregunta.prototype.removerClase = function (clase) {
        this.elemento.classList.remove(clase);
    };
    Pregunta.prototype.agregarResultados = function () {
        if (this.validacion != null) {
            this.validacion();
        }
        else {
            if (this.seleccion != null) {
                this.seleccion.validacion();
                this.maximos = resultados.calcularMaximo(this.valores);
            }
        }
        console.log("Validado");
    };
    Pregunta.prototype.setValidacion = function (validar) {
        this.validacion = validar;
    };
    Pregunta.prototype.registro = function () {
        console.log(this.seleccion);
        if (this.seleccion != null) {
            resultados.agregar(this.tipoId, [
                { id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleccion.informacion },
                { id: "Tiempo usado (segundos)", valor: this.contenido.getSegundos() + "" },
                { id: "Valor de respuesta", valor: JSON.stringify(this.seleccion.valor) + "" },
                { id: "Valores maximos", valor: JSON.stringify(this.maximos) + "" }
            ]);
        }
    };
    Pregunta.prototype.getPregunta = function () {
        return this.contenido;
    };
    Pregunta.prototype.setAccionInicial = function (accionInicial) {
        this.contenido.setAccionInicialActividad(accionInicial);
    };
    Pregunta.prototype.setAccionFinal = function (accionFinal) {
        this.contenido.setAccionFinalActividad(accionFinal);
    };
    Pregunta.prototype.setContenedor = function (ruta) {
        var elemento = document.querySelector(ruta);
        this.contenido.setElemento(elemento);
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
        console.log("El valor es:");
        console.log(this.valor);
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
}(Opcion));
/*
    Inicio de la pregunta C

*/
var Escribir = /** @class */ (function (_super) {
    __extends(Escribir, _super);
    function Escribir(informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.tipoId = "P AreaTexto";
        _this.elemento.className = "pregunta";
        _this.opciones = new Array();
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        _this.div_seccionB = document.createElement('section');
        div_seccionA.className = "pregunta__titulo";
        _this.div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = _this.informacion;
        _this.elemento.appendChild(div_seccionA);
        _this.elemento.appendChild(_this.div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        return _this;
    }
    Escribir.prototype.agregar = function (info) {
        var opcion = new OpcionEscribir(this, info);
        this.seleccion = opcion;
        this.div_seccionB.appendChild(opcion.areaTexto);
        this.opciones.push(opcion);
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
    };
    Escribir.prototype.validarCon = function (original, acciones) {
        var _this = this;
        this.setValidacion(function () {
            var usuario = _this.getTexto();
            var texto = new Texto_validar(original, usuario);
            var error_general = (texto.getErrores());
            //Da los errores de coincidencia exacta
            var error_coincidencia = (texto.getErroresStrict());
            //Da los errores de Mayusculas
            var error_mayuscula = (texto.getErroresMayusculas());
            //Da los errores de Puntuacion, solo "," y "."
            var error_puntuacion = (texto.getErroresPuntuacion());
            //Da los errores de palabras que faltaron
            var error_falto = (texto.getErroresFalto());
            acciones(error_general, error_coincidencia, error_mayuscula, error_puntuacion, error_falto);
        });
    };
    Escribir.prototype.placeholder = function (info) {
        this.opciones.forEach(function (o) {
            o.areaTexto.placeholder = info;
        });
    };
    Escribir.prototype.focus = function () {
        this.opciones.forEach(function (o) {
            o.areaTexto.focus();
        });
    };
    Escribir.prototype.getTexto = function () {
        var texto = "";
        this.opciones.forEach(function (o) {
            texto = o.areaTexto.value;
        });
        return texto;
    };
    Escribir.prototype.isEscritura = function (escritura) {
        this.opciones.forEach(function (o) {
            o.escribiendo(escritura);
        });
    };
    return Escribir;
}(Pregunta));
var OpcionEscribir = /** @class */ (function (_super) {
    __extends(OpcionEscribir, _super);
    function OpcionEscribir(pregunta, info) {
        var _this = _super.call(this, pregunta, []) || this;
        _this.elemento.className = "opcionC";
        _this.areaTexto = document.createElement("textarea");
        _this.areaTexto.className = "pregunta__parrafo";
        _this.areaTexto.spellcheck = false;
        _this.informacion = info;
        _this.areaTexto.placeholder = "Escribe tu respuesta";
        _this.areaTexto.innerText = info;
        _this.elemento.append(_this.areaTexto);
        _this.areaTexto.addEventListener("click", function () {
            _this.areaTexto.focus();
        });
        return _this;
    }
    OpcionEscribir.prototype.placeholder = function (info) {
        this.areaTexto.placeholder = info;
    };
    OpcionEscribir.prototype.escribiendo = function (escritura) {
        this.areaTexto.addEventListener("keydown", function () {
            if (escritura != null) {
                escritura();
            }
        });
    };
    return OpcionEscribir;
}(Opcion));
/* Escala de linker
*/
var PreguntaD = /** @class */ (function (_super) {
    __extends(PreguntaD, _super);
    function PreguntaD(informacion, p, m) {
        var _this = _super.call(this, informacion) || this;
        _this.tipoId = "Likert";
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
        _this.tipoId = "P Imagen";
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
    function PreguntaS(informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.tipoId = "P Seleccion";
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
        var opcion = new OpcionS(this, info, valor);
        this.opciones.push(opcion);
        this.lista.append(opcion.elemento);
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
        _this.informacion = info;
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
var PreguntaSall = /** @class */ (function (_super) {
    __extends(PreguntaSall, _super);
    function PreguntaSall(preguntas) {
        var _this = _super.call(this) || this;
        _this.preguntas = preguntas;
        _this.setValidacion(function () {
            _this.preguntas.forEach(function (pregunta) {
                pregunta.contenido.timer.stop();
            });
        });
        return _this;
    }
    return PreguntaSall;
}(Pregunta));
var PreguntaR = /** @class */ (function (_super) {
    __extends(PreguntaR, _super);
    function PreguntaR(informacion) {
        var _this = _super.call(this, informacion) || this;
        _this.tipoId = "P Instruccion";
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
        _this.tipoId = "P Imagen";
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
/*-------------------------------------------------------------------------------------------*/
/*
    Comentarios abajo del archivo
*/
var Texto_palabra = /** @class */ (function () {
    function Texto_palabra(palabra) {
        this.palabra = palabra;
        this.validado = false;
        this.coincidencia = false;
        this.coincidencia_strict = false;
        this.coincidencia_mayus = true;
        this.puntuacion = true;
        this.tildes = true;
    }
    return Texto_palabra;
}());
var Texto_validar = /** @class */ (function () {
    function Texto_validar(original, texto) {
        var _this = this;
        this.original = original.replace("  ", " ").replace("  ", " ");
        this.texto = texto.replace("  ", " ").replace("  ", " ");
        this.coincidencias = 0;
        this.coincidencias_strict = 0;
        this.coincidencias_mayusculas = 0;
        this.erroresPuntuacion = 0;
        this.erroresTildes = 0;
        this.palabras_original = new Array();
        this.palabras_texto = new Array();
        var palabras_o = this.original.split(" ");
        var palabras_t = this.texto.split(" ");
        palabras_o.forEach(function (p) {
            _this.palabras_original.push(new Texto_palabra(p));
        });
        palabras_t.forEach(function (p) {
            _this.palabras_texto.push(new Texto_palabra(p));
        });
        this.getCoincidencias();
        this.getCoincidenciasStrict();
        this.getErroresMayus();
    }
    Texto_validar.prototype.getCoincidencias = function () {
        for (var i = 0; i < this.palabras_texto.length; i++) {
            var p = this.palabras_texto[i];
            for (var j = 0; j < this.palabras_original.length; j++) {
                var o = this.palabras_original[j];
                if (o.coincidencia == false) {
                    var temp_p = p.palabra.replace(",", "").replace("Á", "A")
                        .replace("É", "E")
                        .replace("Í", "I")
                        .replace("Ó", "O")
                        .replace("Ú", "U")
                        .replace("á", "a")
                        .replace("é", "e")
                        .replace("í", "i")
                        .replace("ó", "o")
                        .replace("ú", "u");
                    var temp_o = o.palabra.replace(",", "").replace("Á", "A")
                        .replace("É", "E")
                        .replace("Í", "I")
                        .replace("Ó", "O")
                        .replace("Ú", "U")
                        .replace("á", "a")
                        .replace("é", "e")
                        .replace("í", "i")
                        .replace("ó", "o")
                        .replace("ú", "u");
                    temp_p = temp_p.replace(".", "");
                    temp_o = temp_o.replace(".", "");
                    if (temp_p.toLowerCase() == temp_o.toLowerCase()) {
                        o.coincidencia = true;
                        p.coincidencia = true;
                        if ((o.puntuacion && o.palabra.indexOf(",") != -1 && p.palabra.indexOf(",") == -1) ||
                            (o.puntuacion && o.palabra.indexOf(".") != -1 && p.palabra.indexOf(".") == -1)) {
                            p.puntuacion = false;
                            o.puntuacion = false;
                        }
                        j = this.palabras_original.length;
                    }
                }
            }
        }
        var puntos = 0;
        var coincidencia = 0;
        this.palabras_texto.forEach(function (p) {
            if (p.coincidencia) {
                coincidencia++;
            }
            if (p.puntuacion == false) {
                puntos++;
            }
        });
        this.erroresPuntuacion = puntos;
        this.coincidencias = coincidencia;
    };
    Texto_validar.prototype.getCoincidenciasStrict = function () {
        for (var i = 0; i < this.palabras_texto.length; i++) {
            var p = this.palabras_texto[i];
            for (var j = 0; j < this.palabras_original.length; j++) {
                var o = this.palabras_original[j];
                if (o.coincidencia_strict == false && p.palabra == o.palabra) {
                    o.coincidencia_strict = true;
                    p.coincidencia_strict = true;
                    j = this.palabras_original.length;
                }
            }
        }
        var coincidencia = 0;
        this.palabras_texto.forEach(function (p) {
            if (p.coincidencia_strict) {
                coincidencia++;
            }
        });
        this.coincidencias_strict = coincidencia;
    };
    Texto_validar.prototype.getErroresMayus = function () {
        for (var i = 0; i < this.palabras_texto.length; i++) {
            var p = this.palabras_texto[i];
            for (var j = 0; j < this.palabras_original.length; j++) {
                var o = this.palabras_original[j];
                var pa = p.palabra.replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u");
                var oa = o.palabra.replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u");
                if (o.coincidencia_mayus && pa.toLowerCase() == oa.toLowerCase()) {
                    if (pa == oa) {
                        o.coincidencia_mayus = false;
                        p.coincidencia_mayus = false;
                        j = this.palabras_original.length;
                    }
                }
                if (o.tildes && pa.toLowerCase() == oa.toLowerCase()) {
                    if ((o.palabra.indexOf("Á") != -1 && p.palabra.indexOf("Á") == -1)
                        || (o.palabra.indexOf("É") != -1 && p.palabra.indexOf("É") == -1)
                        || (o.palabra.indexOf("Í") != -1 && p.palabra.indexOf("Í") == -1)
                        || (o.palabra.indexOf("Ó") != -1 && p.palabra.indexOf("Ó") == -1)
                        || (o.palabra.indexOf("Ú") != -1 && p.palabra.indexOf("Ú") == -1)
                        || (o.palabra.indexOf("á") != -1 && p.palabra.indexOf("á") == -1)
                        || (o.palabra.indexOf("é") != -1 && p.palabra.indexOf("é") == -1)
                        || (o.palabra.indexOf("í") != -1 && p.palabra.indexOf("í") == -1)
                        || (o.palabra.indexOf("ó") != -1 && p.palabra.indexOf("ó") == -1)
                        || (o.palabra.indexOf("ú") != -1 && p.palabra.indexOf("ú") == -1)) {
                        o.tildes = false;
                        p.tildes = false;
                    }
                }
            }
        }
        var erroresMayus = 0;
        var erroresTilde = 0;
        this.palabras_texto.forEach(function (p) {
            if (p.coincidencia_mayus) {
                erroresMayus++;
            }
            if (p.tildes == false) {
                erroresTilde++;
            }
        });
        this.erroresTildes = erroresTilde;
        this.coincidencias_mayusculas = erroresMayus;
    };
    Texto_validar.prototype.getErrores = function () {
        return this.palabras_original.length - this.coincidencias;
    };
    Texto_validar.prototype.getErroresStrict = function () {
        return this.palabras_original.length - this.coincidencias_strict;
    };
    Texto_validar.prototype.getErroresTilde = function () {
        return this.erroresTildes;
    };
    Texto_validar.prototype.getErroresMayusculas = function () {
        return this.coincidencias_mayusculas;
    };
    Texto_validar.prototype.getErroresPuntuacion = function () {
        return this.erroresPuntuacion;
    };
    Texto_validar.prototype.getErroresFalto = function () {
        return this.palabras_original.length - this.palabras_texto.length;
    };
    return Texto_validar;
}());
//Aqui hay un ejemplo------------------------------------------------------------------------------------------------
/*
let original = "Mi cara es cuadrada.";
let usuario = "Mi Cara Es";



let texto = new Texto_validar(original, usuario);

//Da los errores sin tener encuenta mayusculas o puntuacion y las que faltaron
console.log(texto.getErrores());

//Da los errores de coincidencia exacta
console.log(texto.getErroresStrict());

//Da los errores de Mayusculas
console.log(texto.getErroresMayusculas());

//Da los errores de Puntuacion, solo "," y "."
console.log(texto.getErroresPuntuacion());

//Da los errores de palabras que faltaron
console.log(texto.getErroresFalto());

*/ 
