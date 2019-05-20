class Descartes extends Interaccion {

    imagenes: Array<Descarte_elemento>;

    constructor() {
        super();
        this.imagenes = new Array();
    }

    agregar(imagen: HTMLElement, valor: boolean) {
        let ima = new Descarte_elemento(this, imagen, valor);
        this.imagenes.push(ima);
        this.elemento.append(imagen);
    }

    valida() {
        let cont = 0;
        this.imagenes.forEach(i => {
            if (i.validado) {
                cont++;
            }
        });
        if (cont >= this.imagenes.length) {
            return true;
        } else {
            return false;
        }
    }

}

class Descarte_elemento {

    tablero: Descartes;
    elemento: HTMLElement;
    valor: boolean;
    validado: boolean;

    constructor(tablero: Descartes, elemento: HTMLElement, valor: boolean) {
        this.tablero = tablero;
        this.elemento = elemento;
        this.valor = valor;
        this.validado = !valor;

        this.elemento.addEventListener("click", () => {



            if (this.valor) {
                if (this.tablero.intentoAcierto != null) {
                    this.tablero.intentoAcierto();
                }
                this.tablero.aciertos++;
                this.tablero.intentos++;
            }


            if (this.valor == false) {
                if (this.tablero.intentoFallo != null) {
                    this.tablero.intentoFallo();
                }
                tablero.fallos++;
                this.tablero.intentos++;
               
            }

            this.validado = true;

            if (this.tablero.valida()) {
                if (this.tablero.validacion != null) {
                    this.tablero.validacion();
                }
                tablero.valido = true;    
            }

            this.ocultar();
           
        });
    }

    ocultar(){
        this.elemento.style.display = "none";
    }
}


