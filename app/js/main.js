"use strict";
// Converts from degrees to radians.
function radians(degrees) {
    return degrees * Math.PI / 180;
}
;
// Converts from radians to degrees.
function degrees(radians) {
    return radians * 180 / Math.PI;
}
;
function shuffle(array) {
    array.sort(function () { return Math.random() - 0.5; });
}
var Navegable = /** @class */ (function () {
    function Navegable(elementos) {
        this.permitir = false;
        this.permitirAll = false;
        this.iniciado = false;
        this.elementos = elementos;
        this.progreso = new Progress(elementos.elementos.length, 0);
        this.actual = 0;
        createjs.Sound.registerSound("../audios/siguiente.mp3", "seguir");
        this.tiempo = document.createElement('div');
        this.tiempo.className = "nav_tiempo";
        var c = document.createElement('div');
        c.className = "conteo";
        var c_ima = document.createElement('img');
        c_ima.className = "conteo__relog";
        c_ima.src = "../../img/relog.png";
        this.ti = document.createElement('p');
        this.ti.className = "conteo__p";
        c.append(c_ima, this.ti);
        this.tiempo.append(c);
        this.avance = document.createElement('div');
        this.avance.className = "nav_avance";
        var a = document.createElement('div');
        a.className = "avance";
        this.av = document.createElement('p');
        this.av.className = "avance__p";
        this.avance.append(a);
        a.append(this.av);
        this.progress = document.createElement('div');
        this.progress.append(this.progreso.getElemento());
        this.ti.innerText = "0:00";
    }
    Navegable.prototype.iniciar = function () {
        var _this = this;
        if (this.iniciado == false) {
            this.elementos.elementos.forEach(function (e) {
                e.setTermino(function () {
                    if (e == _this.actualPantalla() && _this.actualPantalla().tiempoDefinido == false) {
                        _this.permitir = true;
                        _this.siguiente();
                        _this.permitir = false;
                    }
                });
                e.setProgreso(function (m, s) {
                    if (e == _this.actualPantalla()) {
                        if (_this.fcambioTiempo != null) {
                            _this.fcambioTiempo(m, s);
                        }
                        if (s < 10 && s < 60 && s > -1 && m < 59) {
                            _this.ti.innerText = "0" + m + ":0" + s;
                        }
                        else {
                            _this.ti.innerText = "0" + m + ":" + s;
                        }
                    }
                });
            });
            this.av.innerText = this.actual + 1 + "/" + this.elementos.elementos.length;
            this.progreso.setTotal(this.elementos.elementos.length);
            this.elementos.getElementosHTML().forEach(function (s, i) {
                if (i == 0) {
                    s.style.display = "flex";
                    // s.style.flexDirection = "column";
                }
                else {
                    s.style.display = "none";
                }
            });
            this.actualPantalla().start();
            this.iniciado = true;
        }
    };
    Navegable.prototype.cambioTiempo = function (cambio) {
        this.fcambioTiempo = cambio;
    };
    Navegable.prototype.getTiempoHTML = function () {
        return this.tiempo;
    };
    Navegable.prototype.getAvanceHTML = function () {
        return this.avance;
    };
    Navegable.prototype.ocultarProgreso = function () {
        this.progress.style.display = "none";
    };
    Navegable.prototype.ocultarTiempo = function () {
        this.tiempo.style.display = "none";
    };
    Navegable.prototype.ocultarAvance = function () {
        this.avance.style.display = "none";
    };
    Navegable.prototype.colocarProgreso = function () {
        $(".principal").append(this.progress);
        this.progress.style.position = "absolute";
        this.progress.style.display = "block";
        this.progress.style.left = "0px";
        this.progress.style.bottom = "10px";
    };
    Navegable.prototype.colocarTiempo = function () {
        $(".principal").append(this.tiempo);
        this.tiempo.style.position = "absolute";
        this.tiempo.style.top = "20px";
        this.tiempo.style.right = "40px";
    };
    Navegable.prototype.colocarAvance = function () {
        $(".principal").append(this.avance);
        this.avance.style.position = "absolute";
        this.avance.style.top = "20px";
        this.avance.style.left = "10px";
    };
    Navegable.prototype.comenzar = function () {
        this.actualPantalla().start();
    };
    Navegable.prototype.actualObjeto = function () {
        return this.elementos.elementos[this.actual].getObjeto();
    };
    Navegable.prototype.actualPantalla = function () {
        return this.elementos.elementos[this.actual];
    };
    Navegable.prototype.actualPantallaHtml = function () {
        return this.elementos.elementos[this.actual].getElementoHTML();
    };
    Navegable.prototype.asignarCondiciones = function (recorrer) {
        this.elementos.elementos.forEach(function (e) {
            recorrer(e.objeto);
        });
    };
    Navegable.prototype.mostrar = function (seccion) {
        seccion.style.display = "flex";
    };
    Navegable.prototype.ocultar = function (seccion) {
        seccion.style.display = "none";
    };
    Navegable.prototype.setSiguiente = function (accion) {
        this.inicio = accion;
    };
    Navegable.prototype.getActual = function () {
        return this.actual;
    };
    Navegable.prototype.ocultarActual = function () {
        this.ocultar(this.actualPantallaHtml());
    };
    Navegable.prototype.setFinal = function (final) {
        this.final = final;
    };
    Navegable.prototype.setPermitir = function (permiso) {
        this.permitir = permiso;
    };
    Navegable.prototype.setPermitirAll = function (permiso) {
        this.permitirAll = permiso;
    };
    Navegable.prototype.siguiente = function () {
        if (this.permitir || this.permitirAll) {
            createjs.Sound.play("seguir");
            this.ocultar(this.actualPantallaHtml());
            if (this.actual < this.elementos.elementos.length - 1) {
                if (this.inicio != null) {
                    this.inicio(this.actualPantalla(), this.actual);
                }
                this.actualPantalla().tiempoDefinido = true;
                this.actualPantalla().timer.stop();
                this.actual++;
                this.av.innerText = this.actual + 1 + "/" + this.elementos.elementos.length;
                this.progreso.actualizarPosicion(this.actual);
                this.mostrar(this.actualPantallaHtml());
                this.actualPantalla().start();
            }
            else {
                this.progreso.actualizarPosicion(this.actual + 1);
                if (this.final != null) {
                    this.final();
                }
            }
        }
        this.permitir = false;
    };
    return Navegable;
}());
var PantallaHTML = /** @class */ (function () {
    function PantallaHTML(elemento) {
        this.elemento = elemento;
    }
    PantallaHTML.prototype.agregarResultados = function () {
    };
    PantallaHTML.prototype.registro = function () {
    };
    PantallaHTML.prototype.getElemento = function () {
        return this.elemento;
    };
    return PantallaHTML;
}());
function toPantallas(pantallas) {
    var contenido = [];
    for (var i = 0; i < pantallas.length; i++) {
        var p = pantallas[i];
        var o = new PantallaHTML(p);
        contenido.push(new Contenido(p, o));
    }
    return contenido;
}
var Contenedor = /** @class */ (function () {
    function Contenedor() {
        this.elementos = new Array();
    }
    Contenedor.prototype.agregarAll = function (elemetos, tiempo) {
        var _this = this;
        elemetos.forEach(function (e) {
            if (tiempo != null) {
                e.tiempo(tiempo);
                e.ocultar();
            }
            _this.elementos.push(e);
        });
    };
    Contenedor.prototype.agregar = function (elemeto, tiempo) {
        if (tiempo != null) {
            elemeto.tiempo(tiempo);
        }
        elemeto.ocultar();
        this.elementos.push(elemeto);
        return elemeto;
    };
    Contenedor.prototype.agregarHTML = function (elemeto, tiempo) {
        var e = new PantallaHTML(elemeto);
        if (tiempo != null) {
            var c_1 = new Contenido(elemeto, e, tiempo);
            c_1.ocultar();
            this.elementos.push(c_1);
            return c_1;
        }
        else {
            var c_2 = new Contenido(elemeto, e);
            c_2.ocultar();
            this.elementos.push(c_2);
            return c_2;
        }
    };
    Contenedor.prototype.agregarHTMLAll = function (elemetos, tiempo) {
        var _this = this;
        if (tiempo != null) {
            elemetos.forEach(function (ele) {
                var e = new PantallaHTML(ele);
                var c = new Contenido(ele, e, tiempo);
                c.ocultar();
                _this.elementos.push(c);
            });
        }
        else {
            elemetos.forEach(function (ele) {
                var e = new PantallaHTML(ele);
                var c = new Contenido(ele, e);
                c.ocultar();
                _this.elementos.push(c);
            });
        }
    };
    Contenedor.prototype.foreachElementos = function (elemento) {
        this.elementos.forEach(function (e) {
            elemento.append(e.elementoHTML);
        });
    };
    Contenedor.prototype.incluirEn = function (elemento) {
        this.elementos.forEach(function (e) {
            elemento.append(e.elementoHTML);
        });
    };
    Contenedor.prototype.getHtmlIndex = function (index) {
        var ElementoHTML = this.elementos[index].getElementoHTML();
        return ElementoHTML;
    };
    Contenedor.prototype.getObjectIndex = function (index) {
        var ElementoHTML = this.elementos[index].getObjeto();
        return ElementoHTML;
    };
    Contenedor.prototype.getElementosHTML = function () {
        var ElementosHTML = new Array();
        this.elementos.forEach(function (e) {
            ElementosHTML.push(e.getElementoHTML());
        });
        this.elementos;
        return ElementosHTML;
    };
    return Contenedor;
}());
var Contenido = /** @class */ (function () {
    function Contenido(elementoHTML, objeto, segundos) {
        this.elementoHTML = elementoHTML;
        this.objeto = objeto;
        this.timer = new Timer();
        this.tiempoDefinido = false;
        if (segundos != null) {
            this.segundos = segundos;
        }
        this.setAccionFinal(function () {
            objeto.agregarResultados();
            objeto.registro();
        });
    }
    Contenido.prototype.mostrar = function () {
        this.elementoHTML.style.display = "flex";
    };
    Contenido.prototype.ocultar = function () {
        this.elementoHTML.style.display = "none";
    };
    Contenido.prototype.tiempo = function (segundos) {
        this.segundos = segundos;
    };
    Contenido.prototype.start = function () {
        if (this.accion != null) {
            this.accion(this.objeto);
        }
        if (this.segundos != null) {
            this.timer.startTempo(this.segundos);
        }
    };
    Contenido.prototype.setProgreso = function (progreso) {
        this.timer.setProgreso(progreso);
    };
    Contenido.prototype.setAccion = function (accion) {
        this.accion = accion;
        return this;
    };
    Contenido.prototype.setTermino = function (termino) {
        this.timer.termino = termino;
        return this;
    };
    Contenido.prototype.setAccionFinal = function (accionFinal) {
        this.timer.accionFinal = accionFinal;
    };
    Contenido.prototype.getElementoHTML = function () {
        return this.elementoHTML;
    };
    Contenido.prototype.agregarResultados = function () {
        this.objeto.agregarResultados();
    };
    Contenido.prototype.getObjeto = function () {
        return this.objeto;
    };
    Contenido.prototype.getSegundos = function () {
        return this.timer.getTiempo();
    };
    return Contenido;
}());
function loadJson(ruta, result) {
    var valor;
    var carga = new createjs.LoadQueue();
    carga.loadFile(ruta);
    carga.on("fileload", function (e) {
        valor = e.result;
        result(valor);
    });
}
function ocultar(ubicacion) {
    var e = document.querySelector(ubicacion);
    e.style.display = "none";
}
function mostrar(ubicacion) {
    var e = document.querySelector(ubicacion);
    e.style.display = "flex";
}
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
function cargarImagen(url, width, height, columnas, filas) {
    var imagenes = new Array();
    var c = -1;
    var f = 0;
    var image = document.createElement("div");
    image.style.backgroundImage = "url(" + url + ")"; // load the image
    image.style.width = width * columnas + "px";
    image.style.height = height * filas + "px";
    image.style.position = "absolute";
    // console.log("ejecutando");
    var total = filas * columnas;
    for (var i = 0; i < total; i++) {
        var contenedor = document.createElement('div');
        contenedor.style.position = "relative";
        contenedor.style.width = (width + 1) + "px";
        contenedor.style.height = (height + 1) + "px";
        contenedor.style.overflow = "hidden";
        var fragmentoImg = image.cloneNode();
        c++;
        fragmentoImg.style.left = -(c * width) + "px";
        fragmentoImg.style.top = f + "px";
        if ((c + 1) == columnas) {
            c = -1;
            f -= height;
        }
        contenedor.append(fragmentoImg);
        imagenes.push(contenedor);
    }
    return imagenes;
}
function matrixFija(url, width, height, columnas, filas) {
    var matrix = crearMatrix(columnas, filas, width, height);
    var imagenes = new Array();
    var c = -1;
    var f = 0;
    var image = document.createElement("div");
    image.style.backgroundImage = "url(" + url + ")"; // load the image
    image.style.width = width * columnas + "px";
    image.style.height = height * filas + "px";
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
        contenedor.style.position = "absolute";
        contenedor.style.left = matrix[i].x + "px";
        contenedor.style.top = matrix[i].y + "px";
        contenedor.style.width = matrix[i].width;
        contenedor.style.height = matrix[i].height;
        contenedor.append(fragmentoImg);
        imagenes.push(contenedor);
    }
    return imagenes;
}
var Progress = /** @class */ (function () {
    function Progress(total, inicial) {
        this.total = total;
        this.actual = inicial;
        this.contenedor = document.createElement('div');
        this.contenedor.className = "progreso";
        var con_contendor = document.createElement('div');
        con_contendor.className = "cont_progreso";
        this.progress = document.createElement('progress');
        this.progress.className = "progreso_barra";
        this.indice = document.createElement('div');
        this.indice.className = "progreso_numero";
        this.progress.value = inicial;
        this.progress.max = total;
        this.indice.innerText = inicial + "";
        this.contenedor.append(con_contendor);
        con_contendor.append(this.progress, this.indice);
        this.actualizarPosicion(this.actual);
    }
    Progress.prototype.setTotal = function (total) {
        this.total = total;
        this.progress.max = total;
    };
    Progress.prototype.actualizarPosicion = function (ini) {
        var maximo = 550;
        var actual = maximo * ini / this.total;
        this.indice.style.left = actual + "px";
        this.progress.value = ini;
        this.indice.innerText = ini + 1 + "";
        this.actual = ini;
    };
    Progress.prototype.getElemento = function () {
        return this.contenedor;
    };
    return Progress;
}());
function fondo(fondo) {
    $('.cont-principal').css("background-image", "url('" + fondo + "')");
}
function irA(url) {
    $(".principal").load(url);
}
function goTo(url) {
    window.location.href = url + ".html";
}
function askConfirmation(evt) {
    var msg = 'Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?';
    evt.returnValue = msg;
    return msg;
}
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
    if (s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default: // case 5:
            r = v;
            g = p;
            b = q;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}
var resultados = new Resultados("resultados");
/*
resultados.calcularMaximo([

    {id:"pregunta",valores:[{id:"Diseño",valor:10},{id:"Deportes",valor:5},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:50},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]},

    {id:"pregunta2",valores:[{id:"Diseño",valor:30},{id:"Deportes",valor:5},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:10},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]}

]);

resultados.calcularMaximo([

    {id:"pregunta",valores:[{id:"Diseño",valor:10},{id:"Deportes",valor:55},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:50},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]},

    {id:"pregunta2",valores:[{id:"Diseño",valor:30},{id:"Deportes",valor:5},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:10},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]}

]);

resultados.calcularMaximo([

    {id:"pregunta",valores:[{id:"Diseño",valor:10},{id:"Deportes",valor:5},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:50},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]},

    {id:"pregunta2",valores:[{id:"Diseño",valor:30},{id:"Deportes",valor:5},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:10},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]}

]);*/
var Interaccion = /** @class */ (function () {
    function Interaccion() {
        this.aciertos = 0;
        this.fallos = 0;
        this.intentos = 0;
        this.valido = true;
        this.elemento = document.createElement('div');
        this.tipoId = "pregunta";
        this.contenido = new Contenido(this.elemento, this);
    }
    Interaccion.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    Interaccion.prototype.setIntentoFallo = function (intentoFallo) {
        this.intentoFallo = intentoFallo;
    };
    Interaccion.prototype.setIntentoAcierto = function (intentoAcierto) {
        this.intentoAcierto = intentoAcierto;
    };
    Interaccion.prototype.incluirEn = function (ubicacion) {
        var u = document.querySelector(ubicacion);
        u.append(this.elemento);
    };
    Interaccion.prototype.getElemento = function () {
        return this.elemento;
    };
    Interaccion.prototype.getActividad = function () {
        return this.contenido;
    };
    Interaccion.prototype.agregarResultados = function () {
    };
    Interaccion.prototype.registro = function () {
        console.log("Hola");
        resultados.agregar(this.tipoId, [
            { id: "aciertos", valor: this.aciertos + "" },
            { id: "fallos", valor: this.fallos + "" },
            { id: "intentos", valor: this.intentos + "" },
            { id: "validacion", valor: this.valido + "" },
            { id: "Tiempo usado (segundos)", valor: this.contenido.getSegundos() + "" }
        ]);
    };
    return Interaccion;
}());
var Actividad = /** @class */ (function () {
    function Actividad() {
        this.canvas = document.createElement("canvas");
        this.stage = new createjs.Stage(this.canvas);
        this.contenedor = new createjs.Container();
        this.stage.addChild(this.contenedor);
        this.elemento = document.createElement('div');
        this.elemento.append(this.canvas);
        this.aciertos = 0;
        this.fallos = 0;
        this.intentos = 0;
        this.valido = true;
        this.tipoId = "Interaccion";
        this.contenido = new Contenido(this.elemento, this);
    }
    Actividad.prototype.update = function () {
        this.stage.update();
    };
    Actividad.prototype.size = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    };
    Actividad.prototype.incluirEn = function (lugar) {
        var e = document.querySelector(lugar);
        e.append(this.elemento);
    };
    Actividad.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    Actividad.prototype.setIntentoFallo = function (intentoFallo) {
        this.intentoFallo = intentoFallo;
    };
    Actividad.prototype.setIntentoAcierto = function (intentoAcierto) {
        this.intentoAcierto = intentoAcierto;
    };
    Actividad.prototype.getElemento = function (id) {
        if (id != null) {
            this.elemento.id = id;
        }
        return this.elemento;
    };
    Actividad.prototype.agregarResultados = function () {
    };
    Actividad.prototype.registro = function () {
        console.log("Hola");
        resultados.agregar(this.tipoId, [
            { id: "aciertos", valor: this.aciertos + "" },
            { id: "fallos", valor: this.fallos + "" },
            { id: "intentos", valor: this.intentos + "" },
            { id: "validacion", valor: this.valido + "" },
        ]);
    };
    return Actividad;
}());
/*
this.pareja.tablero.intentos,this.pareja.tablero.aciertos,this.pareja.tablero.fallos, this.pareja.tablero.valido

*/ 
