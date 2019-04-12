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

class Navegable{

    secciones:Array<HTMLElement>;
    actual:number;

    constructor(secciones:Array<HTMLElement>){
        this.secciones = secciones;
        this.actual = 0;
        this.secciones.forEach((s, i) => {
            if(i == 0){
                s.style.display = "block";
            }else{
                s.style.display = "none";
            }
        });
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
            this.actual++;
            this.mostrar(this.secciones[this.actual]);
            if(accion){
                accion();
            }
        }else{
            if(final){
                final();
            }
        }
        
       

        
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







function askConfirmation (evt:any) {
    var msg = 'Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?';
    evt.returnValue = msg;
    return msg;
}

//window.addEventListener('beforeunload', askConfirmation);

