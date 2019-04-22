// Converts from degrees to radians.
function radians(degrees: number) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function degrees(radians: number) {
    return radians * 180 / Math.PI;
};

function shuffle(array: any) {
    array.sort(function () { return Math.random() - 0.5; });
}



interface Validable {
    getElementosHTML(): Array<HTMLElement>;
}

class Navegable {

    elementos: Contenedor;
    secciones: Array<HTMLElement>;
    actual: number;
    progreso: Progress;
    tiempo: HTMLElement;
    avance: HTMLElement;
    progress: HTMLElement;
    inicio?: Function;
    final?: Function;
    ti: HTMLElement;
    av: HTMLElement;
    permitir = false;
    permitirAll = false;

    constructor(elementos: Contenedor, comenzar?:boolean) {
        this.elementos = elementos;
        this.progreso = new Progress(elementos.elementos.length, 0);

        this.elementos.elementos.forEach(e => {
            e.setTiempo(() => {
                if (e.tiempoDefinido && e == this.elementos.elementos[this.actual]) {
                    this.permitir = true;
                    this.siguiente();
                    this.permitir = false;
                }
            });

            e.timer.setProgreso((m: number, s: number) => {
                if (e == this.elementos.elementos[this.actual]) {
                    if (s < 10 && s < 60 && s > -1 && m < 59) {
                        this.ti.innerText = "0" + m + ":0" + s;
                    } else {
                        this.ti.innerText = "0" + m + ":" + s;
                    }
                }
            });
        });

        this.secciones = elementos.getElementosHTML();
        this.actual = 0;
        this.secciones.forEach((s, i) => {
            if (i == 0) {
                s.style.display = "block";
            } else {
                s.style.display = "none";
            }
        });

        if(comenzar != null && comenzar){
            this.actualPantalla().start();
        }
        

        this.tiempo = document.createElement('div');
        this.tiempo.className = "nav_tiempo"
        let c = document.createElement('div');
        c.className = "conteo";

        let c_ima = document.createElement('img');
        c_ima.className = "conteo__relog";
        c_ima.src = "../../img/relog.png";

        this.ti = document.createElement('p');
        this.ti.className = "conteo__p";
        c.append(c_ima, this.ti);
        this.tiempo.append(c);

        this.avance = document.createElement('div');
        this.avance.className = "nav_avance";

        let a = document.createElement('div');
        a.className = "avance";

        this.av = document.createElement('p');
        this.av.className = "avance__p";

        this.avance.append(a);
        a.append(this.av);

        this.progress = document.createElement('div');
        this.progress.append(this.progreso.getElemento());

        this.av.innerText = this.actual + 1 + "/" + this.secciones.length;
        this.ti.innerText = "0:00";
    }

    getTiempoHTML() {
        return this.tiempo;
    }

    getAvanceHTML() {
        return this.avance;
    }

    ocultarProgreso(){
        this.progress.style.display = "none";
    }

    ocultarTiempo(){
        this.tiempo.style.display = "none";
    }

    ocultarAvance(){
        this.avance.style.display = "none";
    }

    colocarProgreso() {
        $(".principal").append(this.progress);
        this.progress.style.position = "absolute";
        this.progress.style.display = "block";
        this.progress.style.left = "0px";
        this.progress.style.bottom = "10px";
    }

    colocarTiempo() {
        $(".principal").append(this.tiempo);
        this.tiempo.style.position = "absolute";
        this.tiempo.style.top = "20px";
        this.tiempo.style.right = "40px";
    }

    colocarAvance() {
        $(".principal").append(this.avance);
        this.avance.style.position = "absolute";
        this.avance.style.top = "20px";
        this.avance.style.left = "10px";
    }

    comenzar(){
        this.actualPantalla().start();
    }

    actualObjeto(): any {
        return this.elementos.elementos[this.actual].getObjeto();
    }

    actualPantalla(): ContenidoA {
        return this.elementos.elementos[this.actual];
    }

    asignarCondiciones(recorrer: Function) {
        this.elementos.elementos.forEach(e => {
            recorrer(e.objeto);
        });
    }

    getElement() {
        return this.secciones;
    }

    mostrar(seccion: HTMLElement) {
        seccion.style.display = "block";
    }

    ocultar(seccion: HTMLElement) {
        seccion.style.display = "none";
    }

    setSiguiente(accion?: Function) {
        this.inicio = accion;

    }

    setFinal(final?: Function) {
        this.final = final;
    }

    setPermitir(permiso:boolean){
        this.permitir = permiso;
    }
    setPermitirAll(permiso:boolean){
        this.permitirAll = permiso;
    }

    siguiente(): void {
        if (this.permitir || this.permitirAll) {
            this.ocultar(this.secciones[this.actual]);
            if (this.actual < this.secciones.length - 1) {
                if (this.inicio != null) {
                    this.inicio(this.actualPantalla(), this.actual);
                }
                this.actualPantalla().tiempoDefinido = true;

                if (this.elementos.elementos[this.actual].timer.enEjecucion) {
                    this.elementos.elementos[this.actual].timer.stop();
                }

                this.actual++;
                this.av.innerText = this.actual + 1 + "/" + this.secciones.length;
                this.progreso.actualizarPosicion(this.actual);
                this.mostrar(this.secciones[this.actual]);
                this.actualPantalla().start();
            } else {
                this.progreso.actualizarPosicion(this.actual + 1);
                if (this.final != null) {
                    this.final();
                }
            }
        }
        this.permitir = false;
    }
}

class Progress {
    contenedor: HTMLElement;
    progress: HTMLProgressElement;
    indice: HTMLElement;
    total: number;
    actual: number;

    constructor(total: number, inicial: number) {
        this.total = total;
        this.actual = inicial;
        this.contenedor = document.createElement('div');
        this.contenedor.className = "progreso";
        let con_contendor = document.createElement('div');
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

    actualizarPosicion(ini: number) {
        let maximo = 550;
        let actual = maximo * ini / this.total;
        this.indice.style.left = actual + "px";
        this.progress.value = ini;
        this.indice.innerText = ini+1 + "";
        this.actual = ini;
    }

    getElemento() {
        return this.contenedor;
    }
}

class PantallaHTML {
    elemento: HTMLElement;

    constructor(elemento: HTMLElement) {
        this.elemento = elemento;
    }

    getElemento() {
        return this.elemento;
    }
}

function toPantallas(pantallas: Array<HTMLElement>) {

    let contenido = [];
    for (let i = 0; i < pantallas.length; i++) {
        let p = pantallas[i];
        let o = new PantallaHTML(p);
        contenido.push(new ContenidoA(p, o));
    }

    let contenedorPadre = new Contenedor(contenido);
    return contenedorPadre;
}

class Contenedor implements Validable {

    elementos: Array<ContenidoA>;

    constructor(elementos: Array<ContenidoA>) {
        this.elementos = elementos;
    }

    foreachElementos(elemento: HTMLElement) {
        this.elementos.forEach(e => {
            elemento.appendChild(e.elementoHTML);
        });
    }

    getObjectIndex(index: number) {
        let ElementoHTML: Object = this.elementos[index].getObjeto();
        return ElementoHTML;
    }

    getElementosHTML(): Array<HTMLElement> {
        let ElementosHTML: Array<HTMLElement> = new Array();
        this.elementos.forEach(e => {
            ElementosHTML.push(e.getElementoHTML());
        });
        this.elementos;
        return ElementosHTML;
    }

}

class ContenidoA {

    objeto: Object;
    elementoHTML: HTMLElement;
    timer: Timer;
    minutos?: number;
    segundos?: number;
    tiempoDefinido: boolean;

    constructor(elementoHTML: HTMLElement, objeto: Object, minutos?: number, segundos?: number) {
        this.elementoHTML = elementoHTML;
        this.objeto = objeto;
        this.timer = new Timer();
        this.tiempoDefinido = false;

        if (segundos != null) {
            this.minutos = minutos;
            this.segundos = segundos;

        } else if (minutos != null) {
            this.segundos = minutos;
            this.minutos = 0;
        }

    }

    tiempo(minutos?: number, segundos?: number) {
        this.minutos = minutos;
        this.segundos = segundos;
    }

    start() {
        if (this.minutos != null && this.segundos != null) {
            this.timer.startTempo(this.minutos, this.segundos);
        }
    }


    setTiempo(termino: Function) {
        this.tiempoDefinido = true;
        this.timer.termino = termino;

    }

    getElementoHTML() {
        return this.elementoHTML;
    }

    getObjeto() {
        return this.objeto;
    }

}


function loadJson(ruta: string, result: Function) {
    let valor;
    let carga = new createjs.LoadQueue();
    carga.loadFile(ruta);
    carga.on("fileload", (e: any) => {

        valor = e.result;
        result(valor);

    });

}



function crearMatrix(colum: number, fil: number, wid: number, hei: number) {
    let columnas = colum;
    let filas = fil;

    let columna = -1;
    let fila = 0;
    let width = wid;
    let height = hei;
    let length = columnas * filas;
    let arreglo: any = [];


    for (let i = 0; i < length; i++) {
        columna++;
        let posx = columna * width;
        let posy = fila;
        if ((columna + 1) == columnas) {
            columna = -1;
            fila += height;
        }
        let pos = { x: posx, y: posy, width: width, height: height };
        arreglo.push(pos);
    }
    return arreglo;
}

function cargarImagen(url: string, width: number, height: number, columnas: number, filas: number) {

    let imagenes = new Array<HTMLElement>();
    let c = -1;
    let f = 0;

    let image = document.createElement("div");
    image.style.backgroundImage = `url(${url})`; // load the image
    image.style.width = width * columnas + "px";
    image.style.height = height * filas + "px";

    image.style.position = "absolute";

    // console.log("ejecutando");
    let total = filas * columnas;
    for (let i = 0; i < total; i++) {

        let contenedor = document.createElement('div');
        contenedor.style.position = "relative";
        contenedor.style.width = width + "px";
        contenedor.style.height = height + "px";
        contenedor.style.overflow = "hidden";

        let fragmentoImg: HTMLElement = <any>image.cloneNode();

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


function irA(url: string) {
    $(".principal").load(url);
}



function askConfirmation(evt: any) {
    var msg = 'Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?';
    evt.returnValue = msg;
    return msg;
}



function random(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

function hsvToRgb(h: any, s: any, v: any) {
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