class Secuencias {

    elementos: Array<SecuenciaElemento>;
    navegable?: Navegable;
    contenedor?: Contenedor;
    agregado: number;
    actual: number;
    validacion?: Function;
    intentoFallo?: Function;
    intentoAcierto?: Function;
    elemento: HTMLElement;
    aciertos = 0;

    constructor() {
        this.elementos = new Array();
        this.agregado = 0;
        this.actual = 0;
        this.elemento = document.createElement('div');
        this.elemento.className = "secuencia";
    }

    agregar(element: HTMLElement, tiempo: number) {
        let e = new SecuenciaElemento(this, element, this.agregado, tiempo);
        this.elementos.push(e);
        this.agregado++;
    }

    terminar() {
        if (this.navegable != null){
            this.navegable.siguiente();
            this.navegable.ocultarProgreso();
            this.elemento.style.display = "none";
        }
    }


    crearTablero() {
        let con: Array<ContenidoA> = [];
        let elementos: Array<HTMLElement> = [];
        let tabla = document.createElement('div');
        let total = document.createElement('div');

        this.elementos.forEach((e: SecuenciaElemento) => {
            let ele: any = e.elemento.cloneNode();
            con.push(new ContenidoA(ele, e, 3));
          
            
            elementos.push(e.contenedor);
        });

        shuffle(elementos);

        elementos.forEach((e: any) => {
            total.append(e);
        });
        tabla.className = "tabla";
        total.className = "tabla__secuencia";
        tabla.append(total);
        let pantalla = new PantallaHTML(tabla);
        con.push(new ContenidoA(tabla, pantalla));

        this.contenedor = new Contenedor(con);
        this.navegable = new Navegable(this.contenedor, false);
        this.navegable.permitirAll = true;
        this.contenedor.foreachElementos(this.elemento);
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

    start() {
        if (this.navegable != null) {
            this.navegable.comenzar();
            this.navegable.colocarProgreso();
        }

    }

    getElemento() {
        return this.elemento;
    }

}

class SecuenciaElemento {
    elemento: HTMLElement;
    contenedor:HTMLElement;
    orden: number;
    padre: Secuencias;
    tiempo: Number;
    seleccionado = false;

    constructor(padre: Secuencias, elemento: HTMLElement, orden: number, tiempo: Number) {
        this.padre = padre;
        this.tiempo = tiempo;
        this.contenedor = document.createElement("div");
        this.elemento = elemento;
        this.contenedor.append(this.elemento);
        this.contenedor.className = "contenedor__imagen";
        this.orden = orden;

        this.elemento.addEventListener("click", (e:any) => {
            let clasname =this.contenedor.className;
          
            if(this.seleccionado == false){

                this.contenedor.className = clasname + " selecionado";
                if (this.padre.actual == this.orden) {
                    if (this.padre.intentoAcierto != null) {
                        this.padre.intentoAcierto();
                        this.padre.aciertos++;
                    }
                } else {
                    if (this.padre.intentoFallo != null) {
                        this.padre.intentoFallo();
                    }
                }
                this.padre.actual++;
                if (this.padre.actual >= this.padre.elementos.length) {
                    if (this.padre.validacion != null) {
                        let respuesta = false;
                        if(this.padre.aciertos >= this.padre.elementos.length){
                            respuesta = true;
                        }
                        this.padre.validacion(respuesta);
                    }
                }
            }
            this.seleccionado = true;
        });
    }


}





