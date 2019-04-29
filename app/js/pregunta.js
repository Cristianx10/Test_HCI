"use strict";
var Opcion = /** @class */ (function () {
    function Opcion(info, valor) {
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
    Opcion.prototype.validacion = function () {
        this.valor.forEach(function (v) {
            resultados.sumar(v.area, v.valor);
        });
    };
    Opcion.prototype.getElemento = function () {
        return this.opcion;
    };
    return Opcion;
}());
var Pregunta = /** @class */ (function () {
    function Pregunta(pregunta) {
        this.pregunta = pregunta;
        this.opciones = new Array();
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";
        var div_seccionA = document.createElement('section');
        var div_seccionA_h1 = document.createElement('h2');
        var div_seccionB = document.createElement('section');
        this.formulario = document.createElement('form');
        this.formulario.className = "formulario_opciones";
        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";
        div_seccionA_h1.innerHTML = this.pregunta;
        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        /*
                opciones.forEach(element => {
        
                    this.formulario.appendChild(element.getElemento());
                });*/
        div_seccionB.appendChild(this.formulario);
        this.contenido = new Contenido(this.getElemento(), this);
    }
    Pregunta.prototype.agregar = function (info, valor) {
        var opcion = new Opcion(info, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
    };
    Pregunta.prototype.validar = function () {
        var _this = this;
        this.opciones.forEach(function (opcion) {
            if (opcion.check.checked) {
                opcion.validacion();
                resultados.agregar("pregunta", [{ id: "pregunta", valor: _this.elemento.innerText },
                    { id: "respuesta", valor: opcion.opcion.innerText }]);
            }
        });
    };
    Pregunta.prototype.getPregunta = function () {
        return this.contenido;
    };
    Pregunta.prototype.getElemento = function () {
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
var PreguntaC = /** @class */ (function () {
    function PreguntaC(pregunta, opciones) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pantalla pregunta";
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
        this.contenido = new Contenido(this.getElemento(), this);
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
    PreguntaC.prototype.getPregunta = function () {
        return this.contenido;
    };
    PreguntaC.prototype.getElemento = function () {
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
    function PreguntaD(pregunta, valor, p, m) {
        this.pregunta = pregunta;
        this.opciones = new OpcionD(valor, p, m);
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
        div_seccionB.appendChild(this.opciones.opcion);
        this.contenido = new Contenido(this.getElemento(), this);
    }
    PreguntaD.prototype.validar = function () {
        this.opciones.validacion();
        resultados.agregar("pregunta", [{ id: "pregunta", valor: this.pregunta },
            { id: "respuesta", valor: this.opciones.input.value }]);
    };
    PreguntaD.prototype.getPregunta = function () {
        return this.contenido;
    };
    PreguntaD.prototype.getElemento = function () {
        return this.elemento;
    };
    PreguntaD.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    return PreguntaD;
}());
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
var PreguntaI = /** @class */ (function () {
    function PreguntaI(pregunta) {
        this.pregunta = pregunta;
        this.opciones = new Array();
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
        this.formulario = document.createElement('form');
        this.formulario.className = "formulario_opciones";
        contenedor.appendChild(div_seccionA);
        contenedor.append(div_seccionB);
        div_seccionB.append(div_seccionC);
        div_seccionC.append(this.formulario);
        console.log(this.getElemento());
        this.contenido = new Contenido(this.getElemento(), this);
    }
    PreguntaI.prototype.agregar = function (info, valor) {
        var elemento = new OpcionI(info, valor);
        this.formulario.append(elemento.getElement());
        this.opciones.push(elemento);
    };
    PreguntaI.prototype.validar = function () {
        var _this = this;
        this.opciones.forEach(function (opcion) {
            if (opcion.check.checked) {
                opcion.validacion();
                resultados.agregar("pregunta", [{ id: "pregunta", valor: _this.pregunta },
                    { id: "respuesta", valor: opcion.opcion.innerText }]);
            }
        });
    };
    PreguntaI.prototype.getPregunta = function () {
        return this.contenido;
    };
    PreguntaI.prototype.getElemento = function () {
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
        var informacion = document.createElement('div');
        this.opcion.append(this.check);
        this.opcion.append(this.contenido);
        this.opcion.append(informacion);
        informacion.innerHTML = info;
        this.valor = valor;
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
        this.bloque = document.createElement('div');
        this.bloque.style.display = "inline-block";
        this.bloque.className = "elegir__resultado";
        this.bloque.append(this.texto);
        this.lista = document.createElement('span');
        this.lista.className = "elegir__lista";
        this.bloque.append(this.lista);
        this.bloque.addEventListener("click", function () {
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
        this.elemento.append(this.preguntaHTML);
        this.elemento.append(this.opcionesHTML);
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
    function PreguntaP(imagen, pregunta) {
        this.pregunta = pregunta;
        this.opciones = new Array();
        this.elemento = document.createElement('div');
        this.elemento.className = "preguntaImagen";
        this.preguntaHTML = document.createElement('div');
        this.preguntaHTML.className = "preguntaImagen__imagen";
        this.preguntaHTML.innerHTML = imagen;
        this.opcionesHTML = document.createElement('div');
        this.preguntaText = document.createElement('div');
        this.preguntaText.innerHTML = pregunta;
        this.preguntaText.className = "preguntaImagen__pregunta";
        this.opcionesHTML.className = "preguntaImagen__info";
        this.opcionesHTML.append(this.preguntaText);
        this.elemento.appendChild(this.preguntaHTML);
        this.elemento.appendChild(this.opcionesHTML);
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
        this.opcion = document.createElement("button");
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
