class Secuencias{

    elementos:Array<SecuenciaElemento>;
    navegable?:Navegable;
    contenedor?:Contenedor;
    agregado:number;
    actual:number;
    comenzar = false;

    constructor(){
        this.elementos = new Array();
        this.agregado = 0;
        this.actual = 0;
       
    }

    agregar(element:HTMLElement){
        let e = new SecuenciaElemento(this, element, this.agregado);
        this.elementos.push(e);
        this.agregado++;
    }

    crearTablero(){
        let con:Array<ContenidoA> = [];

        this.elementos.forEach((e)=>{
            con.push(new ContenidoA(e.elemento, e));
        });

        this.contenedor = new Contenedor(con);
        this.navegable = new Navegable(this.contenedor);

        return this.navegable;
    }

    iniciar(){
        this.comenzar = true;
    }

    detener(){
        this.comenzar = false;
    }

    getElemento(){
       
    }

}

class SecuenciaElemento{
    elemento:HTMLElement;
    orden:number;
    padre:Secuencias;

    constructor(padre:Secuencias, elemento:HTMLElement, orden:number){
        this.padre = padre;
        this.elemento = elemento,
        this.orden = orden;

        
        this.elemento.addEventListener("click", ()=>{
            if(this.padre.comenzar){
                if(this.padre.actual == this.orden){
                    console.log("bien");
                }else{
                    console.log("mal");
                }
                this.padre.actual++;
            }
        });
    }


}


let s = new Secuencias();

let ima = document.createElement('img');
ima.className = "imagen";
let ima2 = document.createElement('img');
ima2.className = "imagen";

s.agregar(ima);

s.agregar(ima2);

let n = s.crearTablero();

let se:any = document.querySelector('.secuencia');

n.elementos.foreachElementos(se);

n.colocarAvance();
n.colocarTiempo();



