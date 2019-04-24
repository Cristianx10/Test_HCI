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
                    if (e == _this.elementos.elementos[_this.actual]) {
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
                    s.style.display = "block";
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
        seccion.style.display = "block";
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
            this.ocultar(this.actualPantallaHtml());
            if (this.actual < this.elementos.elementos.length - 1) {
                if (this.inicio != null) {
                    this.inicio(this.actualPantalla(), this.actual);
                }
                this.actualPantalla().tiempoDefinido = true;
                if (this.elementos.elementos[this.actual].timer.enEjecucion) {
                    this.elementos.elementos[this.actual].timer.stop();
                }
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
    Contenedor.prototype.agregarAll = function (elemetos) {
        var _this = this;
        elemetos.forEach(function (e) {
            _this.elementos.push(e);
        });
    };
    Contenedor.prototype.agregar = function (elemeto) {
        this.elementos.push(elemeto);
    };
    Contenedor.prototype.agregarHtml = function (elemeto, tiempo) {
        var e = new PantallaHTML(elemeto);
        if (tiempo != null) {
            this.elementos.push(new Contenido(elemeto, e, tiempo));
        }
        else {
            this.elementos.push(new Contenido(elemeto, e, tiempo));
        }
    };
    Contenedor.prototype.agregarHtmlAll = function (elemetos, tiempo) {
        var _this = this;
        if (tiempo != null) {
            elemetos.forEach(function (ele) {
                var e = new PantallaHTML(ele);
                var c = new Contenido(ele, e, tiempo);
                _this.elementos.push(c);
            });
        }
        else {
            elemetos.forEach(function (ele) {
                var e = new PantallaHTML(ele);
                var c = new Contenido(ele, e);
                _this.elementos.push(c);
            });
        }
    };
    Contenedor.prototype.foreachElementos = function (elemento) {
        this.elementos.forEach(function (e) {
            elemento.appendChild(e.elementoHTML);
        });
    };
    Contenedor.prototype.incluirEn = function (elemento) {
        this.elementos.forEach(function (e) {
            elemento.appendChild(e.elementoHTML);
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
        this.elementoHTML.style.display = "none";
        this.objeto = objeto;
        this.timer = new Timer();
        this.tiempoDefinido = false;
        if (segundos != null) {
            this.segundos = segundos;
        }
    }
    Contenido.prototype.tiempo = function (segundos) {
        this.tiempoDefinido = true;
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
    };
    Contenido.prototype.setTermino = function (termino) {
        this.timer.termino = termino;
    };
    Contenido.prototype.getElementoHTML = function () {
        return this.elementoHTML;
    };
    Contenido.prototype.getObjeto = function () {
        return this.objeto;
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
        contenedor.appendChild(fragmentoImg);
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
/*

if (!Math.cbrt) {
      Math.cbrt = (function (pow) {
        return function cbrt() {
          // ensure negative numbers remain negative:
          return x < 0 ? -pow(-x, 1 / 3) : pow(x, 1 / 3);
        };
      })(Math.pow); // localize Math.pow to increase efficiency
}*/
//window.addEventListener('beforeunload', askConfirmation);
/*

    validacion?:Function;
    intentoFallo?:Function;
    intentoAcierto?:Function;


setValidacion(validacion:Function){
      this.validacion = validacion;
    }
    setIntentoFallo(intentoFallo:Function){
      this.intentoFallo = intentoFallo;
    }

    setIntentoAcierto(intentoAcierto:Function){
      this.intentoAcierto = intentoAcierto;
    }



    //Implementacion
    con_tablero.getObjectIndex(nav.actual).setValidacion(()=>{

    });

    con_tablero.getObjectIndex(nav.actual).setIntentoAcierto(()=>{

    });

    con_tablero.getObjectIndex(nav.actual).setIntentoFallo(()=>{

    });



*/
/*
  let e = ()=>{
            console.log("Finalizo");
    };
        createjs.Ticker.addEventListener("tick", e);
        createjs.Ticker.removeEventListener("tick", e);


        $( "p" ).addClass( "myClass yourClass" );
This method is often used with .removeClass() to switch elements' classes from one to another, like so:

1
$( "p" ).removeClass( "myClass noClass" ).addClass( "yourClass" );
*/
var resultados = new Resultados("resultados");
