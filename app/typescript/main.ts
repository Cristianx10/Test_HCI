// Converts from degrees to radians.
function radians(degrees: number) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function degrees(radians: number) {
    return radians * 180 / Math.PI;
};

function shuffle(array:any) {
    array.sort(function () { return Math.random() - 0.5; });
}

class Resultados{
    categorias: any = {};
    pruebas:any = [];

    constructor(){
        localStorage.clear();
       
        if(this.categorias == null){
            this.categorias = {};
        }
    }

    resultados(pru:any){
        this.pruebas.push(pru);
    }

    sumar(nombre:string, valor:number){
        if(this.categorias[nombre] == null){
            this.categorias[nombre] = 0;
        }
        this.categorias[nombre] += valor;
    }

}

var RESULTADO:Resultados = new Resultados();

interface Validable{
    getElementosHTML():Array<HTMLElement>;
}

class Navegable{

    elementos:Contenedor;
    secciones:Array<HTMLElement>;
    actual:number;
    progreso:Progress;

    constructor(elementos:Contenedor){
        this.elementos = elementos;
        this.progreso = new Progress(elementos.elementos.length, 0);
        
        this.elementos.elementos.forEach(e => {
            e.tiempoDefinido = true;
            e.setTiempo(()=>{
                if(e.tiempoDefinido == false){
                    this.siguiente();
                }
            });
        });

        this.secciones = elementos.getElementosHTML();
        this.actual = 0;
        this.secciones.forEach((s, i) => {
            if(i == 0){
                s.style.display = "block";
            }else{
                s.style.display = "none";
            }
        });

        this.actualPantalla().start();
    }

    actualObjeto() : any{
        return this.elementos.elementos[this.actual].getObjeto();
    }

    actualPantalla() : ContenidoA{
        return this.elementos.elementos[this.actual];
    }

    asignarCondiciones(recorrer:Function){
        this.elementos.elementos.forEach(e => {
            recorrer(e.objeto);    
        });
    }

    getElement(){
        return this.secciones;
    }

    mostrar(seccion:HTMLElement){
        seccion.style.display = "block";
    }

    ocultar(seccion:HTMLElement){
        seccion.style.display = "none";
    }

    siguiente(accion?:Function, final?:Function):void{
        this.ocultar(this.secciones[this.actual]);
        if(this.actual < this.secciones.length-1){
            if(accion){
                accion(this.actualPantalla(), this.actual);
            }
            this.actualPantalla().tiempoDefinido = true;
            this.actual++;
            this.progreso.actualizarPosicion(this.actual);
            this.mostrar(this.secciones[this.actual]);
            this.actualPantalla().start();
        }else{
            if(final){
                final();
            }
        }      
    }
}

class Progress{
    contenedor:HTMLElement;
    progress:HTMLProgressElement;
    indice:HTMLElement;
    total:number;
    actual:number;

    constructor(  total:number, inicial:number){
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
        this.indice.innerText = inicial+"";

        this.contenedor.append(con_contendor);
        con_contendor.append(this.progress, this.indice);
        this.actualizarPosicion(this.actual);
    }

    actualizarPosicion(ini:number){
        let maximo = 550;
        let actual = maximo*ini/this.total;
        this.indice.style.left = actual + "px";
        this.progress.value = ini;
        this.indice.innerText = ini+"";
        this.actual = ini;
    }

    getElemento(){
        return this.contenedor;
    }
}

class PantallaHTML{
    elemento:HTMLElement;

    constructor(elemento:HTMLElement){
        this.elemento = elemento;
    }
    getElemento(){
        return this.elemento;
    }
}

function toPantallas(pantallas:Array<HTMLElement>){

    let contenido = [];
    for (let i = 0; i < pantallas.length; i++) {
        let p = pantallas[i];
        let o = new PantallaHTML(p);
        contenido.push(new ContenidoA(p, o));
    }

    let contenedorPadre = new Contenedor(contenido);
    return contenedorPadre;
}

class Contenedor implements Validable{

    elementos:Array<ContenidoA>;

    constructor(elementos:Array<ContenidoA>){
        this.elementos = elementos;
    }

    foreachElementos(elemento:HTMLElement){
        this.elementos.forEach(e => {
            elemento.appendChild(e.elementoHTML);
        });
    }

    getObjectIndex(index:number){
        let ElementoHTML:Object = this.elementos[index].getObjeto();
        return ElementoHTML;
    }

    getElementosHTML(): Array<HTMLElement>{
        let ElementosHTML:Array<HTMLElement> = new Array();
        this.elementos.forEach(e => {
            ElementosHTML.push(e.getElementoHTML());
        });
        this.elementos;
        return ElementosHTML;
    }
    
}

class ContenidoA{

    objeto:Object;
    elementoHTML:HTMLElement;
    timer:Timer;
    minutos?:number;
    segundos?:number;
    tiempoDefinido:boolean;

    constructor(elementoHTML:HTMLElement, objeto:Object, minutos?:number, segundos?:number){
        this.elementoHTML = elementoHTML;
        this.objeto = objeto;
        this.timer = new Timer();
        this.tiempoDefinido = false;

        if(segundos != null){
            this.minutos = minutos;
            this.segundos = segundos;
         
        }else if(minutos !=null){
            this.segundos = minutos;
            this.minutos = 0;
        }
        
    }

    tiempo(minutos?:number, segundos?:number){
        this.minutos = minutos;
        this.segundos = segundos;
    }
    
    start(){
        if(this.minutos != null && this.segundos != null){
            this.timer.startTempo(this.minutos, this.segundos);
        }
    }
    

    setTiempo(termino:Function){
        this.timer.termino = termino;
    }

    getElementoHTML(){
        return this.elementoHTML;
    }

    getObjeto(){
        return this.objeto;
    }

}


function loadJson(ruta:string, result:Function){
    let valor;
    let carga = new createjs.LoadQueue();
    carga.loadFile(ruta);
    carga.on("fileload",(e:any)=>{

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
    image.style.width = width*columnas + "px";
    image.style.height = height*filas + "px";

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


function irA(url:string){
    $(".principal").load(url);
}



function askConfirmation (evt:any) {
    var msg = 'Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?';
    evt.returnValue = msg;
    return msg;
}



function random(min:number, max:number) {
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
     
    if(s == 0) {
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
     
    switch(i) {
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
