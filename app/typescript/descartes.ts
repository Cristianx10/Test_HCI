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

    validar() {
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
                console.log("acierto");
            }


            if (this.valor == false) {
                if (this.tablero.intentoFallo != null) {
                    this.tablero.intentoFallo();
                }
                console.log("fallo");
            }

            this.validado = true;

            if (this.tablero.validar()) {
                if (this.tablero.validacion != null) {
                    this.tablero.validacion();
                }
                console.log("Gano");
            }
            this.ocultar();
           
        });
    }

    ocultar(){
        this.elemento.style.display = "none";
    }
}

let c = matrixFija("../img/arte/ojoveloz1.png", 100, 50, 5, 5);
let descartes = new Descartes();

descartes.agregar(c[0], false);
descartes.agregar(c[1], true);
descartes.agregar(c[2], false);
descartes.agregar(c[3], false);
descartes.agregar(c[4], false);
descartes.agregar(c[5], false);
descartes.agregar(c[6], false);
descartes.agregar(c[7], true);
descartes.agregar(c[8], false);
descartes.agregar(c[9], false);
descartes.agregar(c[10], false);
descartes.agregar(c[11], true);
descartes.agregar(c[12], false);
descartes.agregar(c[13], false);
descartes.agregar(c[14], false);
descartes.agregar(c[15], false);
descartes.agregar(c[16], false);
descartes.agregar(c[17], true);
descartes.agregar(c[18], false);
descartes.agregar(c[19], false);
descartes.agregar(c[20], false);
descartes.agregar(c[21], false);
descartes.agregar(c[22], false);
descartes.agregar(c[23], false);
descartes.agregar(c[24], false);


descartes.incluirEn(".principal");


