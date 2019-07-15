"use strict";
/*--------------------------------------------------------------
## Funciones Matematicas
--------------------------------------------------------------*/
// Convierte de grados a radianes
function radians(degrees) {
    return degrees * Math.PI / 180;
}
;
// Convierte de radianes a grados
function degrees(radians) {
    return radians * 180 / Math.PI;
}
;
// Desordena una lista de elementos o que este en un objeto de tipo Array
function shuffle(array) {
    array.sort(function () { return Math.random() - 0.5; });
}
// Crea un numero ramdon entre un minimo y un maximo 
function random(minimo, maximo) {
    return Math.round(Math.random() * (maximo - minimo) + minimo);
}
//Convierte un color en HSV to RGB
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
/*--------------------------------------------------------------
## Clase Contenido

# Se encarga de la administración del contenido de forma individual
--------------------------------------------------------------*/
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
    //Inicia la actividad y si posee tiempo lo comenzara a contabilizar
    Contenido.prototype.start = function () {
        if (this.accion != null) {
            this.accion(this.objeto);
        }
        if (this.segundos != null) {
            this.timer.startTempo(this.segundos);
        }
    };
    //Muestra el contenido en el caso de que este oculto
    Contenido.prototype.mostrar = function () {
        this.elementoHTML.style.display = "flex";
    };
    //Oculta el contenido que contiene la actividad
    Contenido.prototype.ocultar = function () {
        this.elementoHTML.style.display = "none";
    };
    //Define un tiempo en caso de que no halla sido inicializado
    Contenido.prototype.tiempo = function (segundos) {
        this.segundos = segundos;
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
    //Obtiene los segundos usados en la actividad
    Contenido.prototype.getSegundos = function () {
        return this.timer.getTiempo();
    };
    return Contenido;
}());
/*--------------------------------------------------------------
## Contenedor de cada pantalla que visualiza actividades
--------------------------------------------------------------*/
var Contenedor = /** @class */ (function () {
    function Contenedor() {
        this.elementos = new Array();
    }
    Contenedor.prototype.agregarAll = function (elemetos, tiempo) {
        var _this = this;
        elemetos.forEach(function (elemento) {
            if (tiempo != null) {
                elemento.tiempo(tiempo);
                elemento.ocultar();
            }
            _this.elementos.push(elemento);
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
            var contenido = new Contenido(elemeto, e, tiempo);
            contenido.ocultar();
            this.elementos.push(contenido);
            return contenido;
        }
        else {
            var contenido = new Contenido(elemeto, e);
            contenido.ocultar();
            this.elementos.push(contenido);
            return contenido;
        }
    };
    Contenedor.prototype.agregarHTMLAll = function (elemetos, tiempo) {
        var _this = this;
        if (tiempo != null) {
            elemetos.forEach(function (elemento) {
                var pantalla = new PantallaHTML(elemento);
                var contenido = new Contenido(elemento, pantalla, tiempo);
                contenido.ocultar();
                _this.elementos.push(contenido);
            });
        }
        else {
            elemetos.forEach(function (elemento) {
                var pantalla = new PantallaHTML(elemento);
                var contenido = new Contenido(elemento, pantalla);
                contenido.ocultar();
                _this.elementos.push(contenido);
            });
        }
    };
    Contenedor.prototype.incluirEn = function (elemento) {
        this.elementos.forEach(function (e) {
            elemento.append(e.elementoHTML);
        });
    };
    Contenedor.prototype.getHTMLIndex = function (index) {
        var ElementoHTML = this.elementos[index].getElementoHTML();
        return ElementoHTML;
    };
    Contenedor.prototype.getObjectIndex = function (index) {
        var ElementoHTML = this.elementos[index].getObjeto();
        return ElementoHTML;
    };
    Contenedor.prototype.getElementosHTML = function () {
        var elementosHTML = new Array();
        this.elementos.forEach(function (e) {
            elementosHTML.push(e.getElementoHTML());
        });
        return elementosHTML;
    };
    return Contenedor;
}());
/*--------------------------------------------------------------
## Navegacion de la pagina
--------------------------------------------------------------*/
var Navegable = /** @class */ (function () {
    function Navegable(elementos) {
        this.permitir = false;
        this.permitirAll = false;
        this.iniciado = false;
        this.contenedor = elementos;
        this.progreso = new Progress(elementos.elementos.length, 0);
        this.actual = 0;
        createjs.Sound.registerSound("/audios/siguiente.mp3", "seguir");
        this.tiempo = document.createElement('div');
        this.tiempo.className = "nav_tiempo";
        var c = document.createElement('div');
        c.className = "conteo";
        var c_ima = document.createElement('img');
        c_ima.className = "conteo__reloj";
        c_ima.src = "/img/relog.png";
        this.tiempo.append(c);
        this.ti = document.createElement('p');
        this.ti.className = "conteo__p";
        this.ti.innerText = "00:00";
        c.append(c_ima, this.ti);
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
    }
    Navegable.prototype.iniciar = function () {
        var _this = this;
        if (this.iniciado == false) {
            this.contenedor.elementos.forEach(function (e) {
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
            this.av.innerText = this.actual + 1 + "/" + this.contenedor.elementos.length;
            this.progreso.setTotal(this.contenedor.elementos.length);
            this.contenedor.getElementosHTML().forEach(function (s, i) {
                if (i == 0) {
                    s.style.display = "flex";
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
        var bloque = document.querySelector(".principal");
        bloque.append(this.progress);
        this.progress.style.position = "absolute";
        this.progress.style.display = "block";
        this.progress.style.left = "-50px";
        this.progress.style.bottom = "10px";
    };
    Navegable.prototype.colocarTiempo = function () {
        var bloque = document.querySelector(".principal");
        bloque.append(this.tiempo);
        this.tiempo.style.position = "absolute";
        this.tiempo.style.top = "20px";
        this.tiempo.style.right = "40px";
    };
    Navegable.prototype.colocarAvance = function () {
        var bloque = document.querySelector(".principal");
        bloque.append(this.avance);
        this.avance.style.position = "absolute";
        this.avance.style.top = "20px";
        this.avance.style.left = "10px";
    };
    Navegable.prototype.comenzar = function () {
        this.actualPantalla().start();
    };
    Navegable.prototype.actualObjeto = function () {
        return this.contenedor.elementos[this.actual].getObjeto();
    };
    Navegable.prototype.actualPantalla = function () {
        return this.contenedor.elementos[this.actual];
    };
    Navegable.prototype.actualPantallaHtml = function () {
        return this.contenedor.elementos[this.actual].getElementoHTML();
    };
    Navegable.prototype.asignarCondiciones = function (recorrer) {
        this.contenedor.elementos.forEach(function (e) {
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
            if (this.actual < this.contenedor.elementos.length) {
                if (this.inicio != null) {
                    this.inicio(this.actualPantalla(), this.actual);
                }
                this.actualPantalla().tiempoDefinido = true;
                this.actualPantalla().timer.stop();
                if (this.actual + 1 < this.contenedor.elementos.length) {
                    this.actual++;
                    this.av.innerText = this.actual + 1 + "/" + this.contenedor.elementos.length;
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
/*--------------------------------------------------------------
## Pantalla HTML
*Convierte cualquier contenedor HTML en un contenido compatible con la clase Contenido para establecer tiempo y otras funcionalidades
--------------------------------------------------------------*/
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
/*--------------------------------------------------------------
## Interaccion
*Se ocupa de las interacciones hechas en HTML que NO usan canvas
--------------------------------------------------------------*/
var Interaccion = /** @class */ (function () {
    function Interaccion() {
        this.aciertos = 0;
        this.fallos = 0;
        this.intentos = 0;
        this.valido = true;
        this.puntos = 0;
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
    Interaccion.prototype.setValidar = function (validar) {
        this.validar = validar;
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
        if (this.validar != null) {
            this.validar();
        }
    };
    Interaccion.prototype.registro = function () {
        resultados.agregar(this.tipoId, [
            { id: "aciertos", valor: this.aciertos + "" },
            { id: "fallos", valor: this.fallos + "" },
            { id: "intentos", valor: this.intentos + "" },
            { id: "puntuacion", valor: this.puntos + "" },
            { id: "validacion", valor: this.valido + "" },
            { id: "Tiempo usado (segundos)", valor: this.contenido.getSegundos() + "" }
        ]);
    };
    return Interaccion;
}());
/*--------------------------------------------------------------
## Interaccion
*Se ocupa de las interacciones hechas en HTML que usan canvas
--------------------------------------------------------------*/
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
        this.update();
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
    Actividad.prototype.setValidar = function (validar) {
        this.validar = validar;
    };
    Actividad.prototype.getElemento = function (id) {
        if (id != null) {
            this.elemento.id = id;
        }
        return this.elemento;
    };
    Actividad.prototype.agregarResultados = function () {
        if (this.validar != null) {
            this.validar();
        }
    };
    Actividad.prototype.registro = function () {
        resultados.agregar(this.tipoId, [
            { id: "aciertos", valor: this.aciertos + "" },
            { id: "fallos", valor: this.fallos + "" },
            { id: "intentos", valor: this.intentos + "" },
            { id: "validacion", valor: this.valido + "" },
        ]);
    };
    return Actividad;
}());
/*--------------------------------------------------------------
## metodo crearMatrix

#crea un arreglo con posiciones (x, y) con un tamaño definido
--------------------------------------------------------------*/
function crearMatrix(columas_inicial, filas_inicial, width_inicial, height_inicial) {
    //Inicializacion de las variables
    var columnas_total = columas_inicial;
    var filas_total = filas_inicial;
    var width = width_inicial;
    var height = height_inicial;
    var columna = 0;
    var fila = 0;
    //Tamaño total del numero de bloques
    var length = columnas_total * filas_total;
    var arreglo = new Array();
    //Distribucion de las posiciones
    for (var i = 0; i < length; i++) {
        //Asignacion de la coordenada en X
        var posx = columna * width;
        //Asignacion de la coordenada en Y
        var posy = fila;
        //Creación de un vector de posicion (x, y) con el Tamaño
        var pos = { x: posx, y: posy, width: width, height: height };
        //Se alamacena el vector creado
        arreglo.push(pos);
        //Asignacion de la secuecia
        columna++;
        //Reseteo de la secuencia cuando llega a los bordes
        if (columna == columnas_total) {
            columna = 0;
            fila += height;
        }
    }
    return arreglo;
}
/*--------------------------------------------------------------
## metodo matrixImagen

#A partir de una imagen puede dividirla en fragmentos de la misma en cuadrados de un tamaño definido
#Devuelve una arreglo de imagenes fragmentos de la original SIN coordenadas (x,y)
--------------------------------------------------------------*/
function matrixImagen(url, width, height, columnas, filas) {
    //Inicializacion de las variables
    var imagenes = new Array();
    var columna = 0;
    var fila = 0;
    var image = document.createElement("div");
    // Cargar la imagen base de la division
    image.style.backgroundImage = "url(" + url + ")";
    // Asignacion del tamaño de los fragmentos
    image.style.width = width + "px";
    image.style.height = height + "px";
    image.style.position = "absolute";
    //Tamaño total del numero de bloques
    var length = filas * columnas;
    //Creacion de los fragmentos
    for (var i = 0; i < length; i++) {
        //Creacion del contenedor base que contiene el fragmento
        var contenedor = document.createElement('div');
        contenedor.style.position = "relative";
        contenedor.style.width = (width + 1) + "px";
        contenedor.style.height = (height + 1) + "px";
        contenedor.style.overflow = "hidden";
        //Se clona el original para señalar uno mas especifico
        var fragmentoImg = image.cloneNode();
        //Posicion del nuevo fragmento
        fragmentoImg.style.backgroundPositionX = -(columna * width) + "px";
        fragmentoImg.style.backgroundPositionY = fila + "px";
        contenedor.append(fragmentoImg);
        imagenes.push(contenedor);
        //Asignacion de la secuecia
        columna++;
        //Reseteo de la secuencia cuando llega a los bordes
        if (columna == columnas) {
            columna = 0;
            fila -= height;
        }
    }
    return imagenes;
}
/*--------------------------------------------------------------
## metodo matrixFija

#A partir de una imagen puede dividirla en fragmentos de la misma en cuadrados de un tamaño definido con posiciones definidas
#Devuelve una arreglo de imagenes fragmentos de la original CON coordenadas (x,y)
--------------------------------------------------------------*/
function matrixFija(url, width, height, columnas, filas) {
    var matrix = crearMatrix(columnas, filas, width, height);
    var imagenes = new Array();
    var columna = 0;
    var fila = 0;
    var image = document.createElement("div");
    // Cargar la imagen base de la division
    image.style.backgroundImage = "url(" + url + ")";
    image.style.width = width + "px";
    image.style.height = height + "px";
    image.style.position = "absolute";
    //Tamaño total del numero de bloques
    var length = filas * columnas;
    //Creacion de los fragmentos
    for (var i = 0; i < length; i++) {
        var contenedor = document.createElement('div');
        contenedor.style.position = "absolute";
        contenedor.style.overflow = "hidden";
        //Se clona el original para señalar uno mas especifico
        var fragmentoImg = image.cloneNode();
        //Posicion del nuevo fragmento
        fragmentoImg.style.backgroundPositionX = -(columna * width) + "px";
        fragmentoImg.style.backgroundPositionY = fila + "px";
        //Posicion estatica del contenedor
        contenedor.style.left = matrix[i].x + "px";
        contenedor.style.top = matrix[i].y + "px";
        contenedor.style.width = matrix[i].width + "px";
        contenedor.style.height = matrix[i].height + "px";
        contenedor.append(fragmentoImg);
        imagenes.push(contenedor);
        //Asignacion de la secuecia
        columna++;
        //Reseteo de la secuencia cuando llega a los bordes
        if (columna == columnas) {
            columna = 0;
            fila -= height;
        }
    }
    return imagenes;
}
function loadJson(ruta, result) {
    var valor;
    var carga = new createjs.LoadQueue();
    carga.loadFile(ruta);
    carga.on("fileload", function (e) {
        valor = e.result;
        result(valor);
    });
}
function toPantallas(pantallas) {
    var contenido = [];
    for (var i = 0; i < pantallas.length; i++) {
        var p = pantallas[i];
        var o = new PantallaHTML(p);
        contenido.push(new Contenido(p, o));
    }
    return contenido;
}
/*--------------------------------------------------------------
## mostrar

*Revela objetos HTML que pueden estar ocultos, basta con tener un identificador o una clase del elemento
--------------------------------------------------------------*/
function mostrar(ubicacion) {
    var e = document.querySelector(ubicacion);
    e.style.display = "flex";
}
/*--------------------------------------------------------------
## ocultar

*Oculta objetos HTML que pueden estar visibles, basta con tener un identificador o una clase del elemento
--------------------------------------------------------------*/
function ocultar(ubicacion) {
    var e = document.querySelector(ubicacion);
    e.style.display = "none";
}
/*--------------------------------------------------------------
## Progress

*Crea una barra de progreso que tener un control del avance de las actividades
--------------------------------------------------------------*/
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
    var contenedor_fondo = document.querySelector(".cont-principal");
    contenedor_fondo.style.backgroundImage = "url('" + fondo + "')";
}
/*--------------------------------------------------------------
## irA

*Permite cargar un bloque html de otra actividad que este ubicada en un html distinto
*NOTA: Requiere de la libreria de Jquery.JS
--------------------------------------------------------------*/
function irA(url) {
    $(".principal").load(url);
}
/*--------------------------------------------------------------
## goTo

*Permite cargar un bloque html de otra actividad que este ubicada en un html distinto
*NOTA: Requiere de la libreria de Jquery.JS
--------------------------------------------------------------*/
function goTo(url) {
    if (url.indexOf(".html") == -1) {
        window.location.href = url + ".html";
    }
    else {
        window.location.href = url;
    }
}
function askConfirmation(evt) {
    var msg = 'Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?';
    evt.returnValue = msg;
    return msg;
}
var resultados = new Resultados("resultados");
function cargar(name) {
    if (name != null) {
        loadJson("/" + name, function (result) {
            var r = JSON.stringify(result);
            localStorage.setItem(resultados.id, r);
            location.reload();
        });
    }
    else {
        loadJson("/carga.json", function (result) {
            var r = JSON.stringify(result);
            localStorage.setItem(resultados.id, r);
            location.reload();
        });
    }
}
/*
this.pareja.tablero.intentos,this.pareja.tablero.aciertos,this.pareja.tablero.fallos, this.pareja.tablero.valido

*/
/*
resultados.agregarMaximo([{area:"matematicas", valor:50}, {area:"fuerza publica", valor:50}]);
resultados.agregarResultados([{area:"matematicas", valor:50}, {area:"fuerza publica", valor:50}]);

*/
/*
resultados.calcularMaximo([

    {id:"pregunta",valores:[{id:"Diseño",valor:10},{id:"Deportes",valor:5},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:50},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]},

    {id:"pregunta2",valores:[{id:"Diseño",valor:30},{id:"Deportes",valor:5},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:10},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]}

]);*/
