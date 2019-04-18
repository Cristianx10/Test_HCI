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
var Resultados = /** @class */ (function () {
    function Resultados() {
        this.categorias = {};
        this.pruebas = [];
        localStorage.clear();
        if (this.categorias == null) {
            this.categorias = {};
        }
    }
    Resultados.prototype.resultados = function (pru) {
        this.pruebas.push(pru);
    };
    Resultados.prototype.sumar = function (nombre, valor) {
        if (this.categorias[nombre] == null) {
            this.categorias[nombre] = 0;
        }
        this.categorias[nombre] += valor;
    };
    return Resultados;
}());
var RESULTADO = new Resultados();
var Navegable = /** @class */ (function () {
    function Navegable(elementos) {
        this.elementos = elementos;
        this.secciones = elementos.getElementosHTML();
        this.actual = 0;
        this.secciones.forEach(function (s, i) {
            if (i == 0) {
                s.style.display = "block";
            }
            else {
                s.style.display = "none";
            }
        });
    }
    Navegable.prototype.asignarCondiciones = function (recorrer) {
        this.elementos.elementos.forEach(function (e) {
            recorrer(e.objeto);
        });
    };
    Navegable.prototype.getElement = function () {
        return this.secciones;
    };
    Navegable.prototype.mostrar = function (seccion) {
        seccion.style.display = "block";
    };
    Navegable.prototype.ocultar = function (seccion) {
        seccion.style.display = "none";
    };
    Navegable.prototype.siguiente = function (accion, final) {
        this.ocultar(this.secciones[this.actual]);
        if (this.actual < this.secciones.length - 1) {
            if (accion) {
                accion();
            }
            this.actual++;
            this.mostrar(this.secciones[this.actual]);
        }
        else {
            if (final) {
                final();
            }
        }
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
        contenido.push(new ContenidoA(p, o));
    }
    var contenedorPadre = new Contenedor(contenido);
    return contenedorPadre;
}
var Contenedor = /** @class */ (function () {
    function Contenedor(elementos) {
        this.elementos = elementos;
    }
    Contenedor.prototype.foreachElementos = function (elemento) {
        this.elementos.forEach(function (e) {
            elemento.appendChild(e.elementoHTML);
        });
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
var ContenidoA = /** @class */ (function () {
    function ContenidoA(elementoHTML, objeto) {
        this.elementoHTML = elementoHTML;
        this.objeto = objeto;
    }
    ContenidoA.prototype.getElementoHTML = function () {
        return this.elementoHTML;
    };
    ContenidoA.prototype.getObjeto = function () {
        return this.objeto;
    };
    return ContenidoA;
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
function irA(url) {
    $(".principal").load(url);
}
function askConfirmation(evt) {
    var msg = 'Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?';
    evt.returnValue = msg;
    return msg;
}
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
