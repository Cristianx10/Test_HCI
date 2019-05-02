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

class Navegable {

    elementos: Contenedor;
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
    fcambioTiempo?: Function;
    iniciado = false;

    constructor(elementos: Contenedor) {
        this.elementos = elementos;
        this.progreso = new Progress(elementos.elementos.length, 0);
        this.actual = 0;

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
        this.ti.innerText = "0:00";
    }

    iniciar() {
        if (this.iniciado == false) {

            this.elementos.elementos.forEach(e => {
                e.setTermino(() => {
                    if (e == this.actualPantalla() && this.actualPantalla().tiempoDefinido == false) {
                        this.permitir = true;
                     
                        this.siguiente();
                        this.permitir = false;

                    }
                });

                e.setProgreso((m: number, s: number) => {
                    if (e == this.actualPantalla()) {
                        if (this.fcambioTiempo != null) {
                            this.fcambioTiempo(m, s);
                        }
                        if (s < 10 && s < 60 && s > -1 && m < 59) {
                            this.ti.innerText = "0" + m + ":0" + s;
                        } else {
                            this.ti.innerText = "0" + m + ":" + s;
                        }
                    }
                });
            });

            this.av.innerText = this.actual + 1 + "/" + this.elementos.elementos.length;

            this.progreso.setTotal(this.elementos.elementos.length);
            this.elementos.getElementosHTML().forEach((s, i) => {
                if (i == 0) {
                    s.style.display = "flex";
                    // s.style.flexDirection = "column";
                } else {
                    s.style.display = "none";
                }
            });


            this.actualPantalla().start();
            this.iniciado = true;
        }

    }

    cambioTiempo(cambio: Function) {
        this.fcambioTiempo = cambio;
    }

    getTiempoHTML() {
        return this.tiempo;
    }

    getAvanceHTML() {
        return this.avance;
    }

    ocultarProgreso() {
        this.progress.style.display = "none";
    }

    ocultarTiempo() {
        this.tiempo.style.display = "none";
    }

    ocultarAvance() {
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

    comenzar() {
        this.actualPantalla().start();
    }

    actualObjeto(): any {
        return this.elementos.elementos[this.actual].getObjeto();
    }

    actualPantalla(): Contenido {
        return this.elementos.elementos[this.actual];
    }

    actualPantallaHtml(): HTMLElement {
        return this.elementos.elementos[this.actual].getElementoHTML();
    }

    asignarCondiciones(recorrer: Function) {
        this.elementos.elementos.forEach(e => {
            recorrer(e.objeto);
        });
    }

    mostrar(seccion: HTMLElement) {
        seccion.style.display = "flex";


    }

    ocultar(seccion: HTMLElement) {
        seccion.style.display = "none";
    }

    setSiguiente(accion?: Function) {
        this.inicio = accion;
    }

    getActual() {
        return this.actual;
    }

    ocultarActual() {
        this.ocultar(this.actualPantallaHtml())
    }

    setFinal(final?: Function) {
        this.final = final;
    }

    setPermitir(permiso: boolean) {
        this.permitir = permiso;
    }
    setPermitirAll(permiso: boolean) {
        this.permitirAll = permiso;
    }

    siguiente(): void {
    
        if (this.permitir || this.permitirAll) {

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

class PantallaHTML implements Validable {

    elemento: HTMLElement;

    constructor(elemento: HTMLElement) {
        this.elemento = elemento;
    }

    getElemento() {
        return this.elemento;
    }

    agregarResultados(): void {

    }

    registro() {

    }
}

function toPantallas(pantallas: Array<HTMLElement>) {

    let contenido = [];
    for (let i = 0; i < pantallas.length; i++) {
        let p = pantallas[i];
        let o = new PantallaHTML(p);
        contenido.push(new Contenido(p, o));
    }

    return contenido;
}


class Contenedor {

    elementos: Array<Contenido>;

    constructor() {
        this.elementos = new Array();
    }

    agregarAll(elemetos: Array<Contenido>, tiempo?: number) {

        elemetos.forEach((e) => {
            if (tiempo != null) {
                e.tiempo(tiempo);
            }
            this.elementos.push(e)
        });
    }

    agregar(elemeto: Contenido, tiempo?: number) {
        if (tiempo != null) {
            elemeto.tiempo(tiempo);
        }
        this.elementos.push(elemeto)
        return elemeto;
    }

    agregarHTML(elemeto: HTMLElement, tiempo?: number) {
        let e = new PantallaHTML(elemeto);
        if (tiempo != null) {
            let c = new Contenido(elemeto, e, tiempo);
            this.elementos.push(c);
            return c;
        } else {
            let c = new Contenido(elemeto, e);
            this.elementos.push(c);
            return c;
        }
    }

    agregarHTMLAll(elemetos: Array<HTMLElement>, tiempo?: number) {

        if (tiempo != null) {
            elemetos.forEach((ele) => {
                let e = new PantallaHTML(ele);
                let c = new Contenido(ele, e, tiempo);
                this.elementos.push(c);
            });
        } else {
            elemetos.forEach((ele) => {
                let e = new PantallaHTML(ele);
                let c = new Contenido(ele, e);
                this.elementos.push(c);
            });
        }


    }

    foreachElementos(elemento: HTMLElement) {
        this.elementos.forEach(e => {

            elemento.append(e.elementoHTML);
        });
    }

    incluirEn(elemento: HTMLElement) {
        this.elementos.forEach(e => {

            elemento.append(e.elementoHTML);
        });
    }

    getHtmlIndex(index: number) {
        let ElementoHTML: Object = this.elementos[index].getElementoHTML();
        return ElementoHTML;
    }

    getObjectIndex(index: number) {
        let ElementoHTML: Object = this.elementos[index].getObjeto();
        return ElementoHTML;
    }

    getElementosHTML(): Array<HTMLElement> {
        let ElementosHTML: Array<HTMLElement> = new Array();
        this.elementos.forEach((e) => {
            ElementosHTML.push(e.getElementoHTML());
        });
        this.elementos;
        return ElementosHTML;
    }

}

interface Validable {
    agregarResultados(): void;
    registro(): void;
}

class Contenido {

    objeto: Validable;
    elementoHTML: HTMLElement;
    timer: Timer;
    segundos?: number;
    tiempoDefinido: boolean;
    accion?: Function;

    constructor(elementoHTML: HTMLElement, objeto: Validable, segundos?: number) {
        this.elementoHTML = elementoHTML;
      
        this.elementoHTML.style.display = "none";
        this.objeto = objeto;
        this.timer = new Timer();
        this.tiempoDefinido = false;
        if (segundos != null) {
            this.segundos = segundos;
        }

        this.setAccionFinal(() => {
            objeto.agregarResultados();
            objeto.registro();
        });
    }

    tiempo(segundos?: number) {
        this.segundos = segundos;
    }

    start() {
        if (this.accion != null) {
            this.accion(this.objeto);
        }
        if (this.segundos != null) {
            this.timer.startTempo(this.segundos);

        }

    }

    setProgreso(progreso: Function) {
        this.timer.setProgreso(progreso);
    }

    setAccion(accion: Function) {
        this.accion = accion;
        return this;
    }

    setTermino(termino: Function) {
        this.timer.termino = termino;
        return this;
    }

    setAccionFinal(accionFinal: Function) {
        this.timer.accionFinal = accionFinal;
    }

    getElementoHTML() {
        return this.elementoHTML;
    }

    agregarResultados() {
        this.objeto.agregarResultados();
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

function ocultar(ubicacion: string) {
    let e: HTMLElement = <HTMLElement>document.querySelector(ubicacion);
    e.style.display = "none";
}

function mostrar(ubicacion: string) {
    let e: HTMLElement = <HTMLElement>document.querySelector(ubicacion);
    e.style.display = "flex";
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

    setTotal(total: number) {
        this.total = total;
        this.progress.max = total;
    }

    actualizarPosicion(ini: number) {
        let maximo = 550;
        let actual = maximo * ini / this.total;
        this.indice.style.left = actual + "px";
        this.progress.value = ini;
        this.indice.innerText = ini + 1 + "";
        this.actual = ini;
    }

    getElemento() {
        return this.contenedor;
    }
}



function irA(url: string) {
    $(".principal").load(url);
}

function goTo(url: string) {
    window.location.href = url + ".html";
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





interface ResultadoA {
    area: string;
    valor: number;
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


class Interaccion implements Validable {

    aciertos: number;
    fallos: number;
    intentos: number;
    valido: boolean;

    validacion?: Function;
    intentoFallo?: Function;
    intentoAcierto?: Function;
    elemento: HTMLElement;

    tipoId: string;

    constructor() {
        this.aciertos = 0;
        this.fallos = 0;
        this.intentos = 0;
        this.valido = true;
        this.elemento = document.createElement('div');
        this.tipoId = "pregunta";
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }
    setIntentoFallo(intentoFallo: Function) {
        this.intentoFallo = intentoFallo;
    }

    setIntentoAcierto(intentoAcierto: Function) {
        this.intentoAcierto = intentoAcierto;
    }

    incluirEn(ubicacion: string) {
        let u: HTMLElement = <HTMLElement>document.querySelector(ubicacion);
        u.append(this.elemento);
    }

    agregarResultados(): void {

    }

    registro() {
        resultados.agregar(this.tipoId, [
            { id: "aciertos", valor: this.aciertos + "" },
            { id: "fallos", valor: this.fallos + "" },
            { id: "intentos", valor: this.intentos + "" },
            { id: "validacion", valor: this.valido + "" },
        ]);
    }
}

/*
this.pareja.tablero.intentos,this.pareja.tablero.aciertos,this.pareja.tablero.fallos, this.pareja.tablero.valido

*/