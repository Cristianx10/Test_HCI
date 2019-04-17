// Converts from degrees to radians.
function radians(degrees: number) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function degrees(radians: number) {
    return radians * 180 / Math.PI;
};

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

    constructor(elementos:Contenedor){
        this.elementos = elementos;

        this.secciones = elementos.getElementosHTML();
        this.actual = 0;
        this.secciones.forEach((s, i) => {
            if(i == 0){
                s.style.display = "block";
            }else{
                s.style.display = "none";
            }
        });
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
                accion();
            }
            this.actual++;
            this.mostrar(this.secciones[this.actual]);
        }else{
            if(final){
                final();
            }
        }      
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

    constructor(elementoHTML:HTMLElement, objeto:Object){
        this.elementoHTML = elementoHTML;
        this.objeto = objeto;
    }

    getElementoHTML(){
        return this.elementoHTML;
    }

    getObjeto(){
        return this.objeto;
    }

}

function shuffle(array: any) {
    array.sort(() => Math.random() - 0.5);
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

    let image = new Image();
    image.src = url; // load the image

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





function askConfirmation (evt:any) {
    var msg = 'Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?';
    evt.returnValue = msg;
    return msg;
}

//window.addEventListener('beforeunload', askConfirmation);


/*

    validacion?:Function;
    intentoAcierto?:Function;
    intentoFallo?:Function;


setValidacion(validacion:Function){
      this.validacion = validacion;
    }

    setIntentoAcierto(intentoAcierto:Function){
      this.intentoAcierto = intentoAcierto;
    }

    setIntentoFallo(intentoFallo:Function){
      this.intentoFallo = intentoFallo;
    }


    //Implementacion
    con_tablero.getObjectIndex(nav.actual).setValidacion(()=>{
        
    });

    con_tablero.getObjectIndex(nav.actual).setIntentoAcierto(()=>{
        
    });

    con_tablero.getObjectIndex(nav.actual).setIntentoFallo(()=>{
        
    });



*/
