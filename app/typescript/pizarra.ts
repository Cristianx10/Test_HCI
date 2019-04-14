
var margin = 0;
var width = 110;
var height = 110;
var widthMax = 400;

function insertAfter(e: any, i: any) {
    if (e.nextSibling) {
        e.parentNode.insertBefore(i, e.nextSibling);
    } else {
        e.parentNode.appendChild(i);
    }
}

class Casilla {

    elemento: HTMLElement;
    contenido: HTMLElement;
    placeholder: HTMLElement;
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    tipo: number;
    posicion: number;
    padre?: Pizarra;
    validado: boolean;

    constructor(elemento: HTMLElement, up: boolean, down: boolean, left: boolean, right: boolean, posicion: number, tipo: number) {
        this.contenido = document.createElement('div');
        this.contenido.className = "ficha";
        this.placeholder = document.createElement('div');
        this.placeholder.className = "click";
        this.contenido.style.width = "100px";
        this.contenido.style.height = "100px";
        this.tipo = tipo;

        this.elemento = elemento;
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        this.posicion = posicion;
        this.contenido.appendChild(this.elemento);
        this.validado = false;
    }

    getPadre(padre: Pizarra) {
        this.padre = padre;
        this.contenido.addEventListener("click", (e: any) => {

            if (this.padre != null && this.tipo != 1 && this.padre.lider !=this) {
                if (this.padre.up(this.padre.lider.posicion) == this.posicion
                    || this.padre.down(this.padre.lider.posicion) == this.posicion
                    || this.padre.left(this.padre.lider.posicion) == this.posicion
                    || this.padre.right(this.padre.lider.posicion) == this.posicion) {
                    this.intercambiarPosicion(padre.lider);
                    if (this.padre.intentoFallo != null) {
                        this.padre.intentoFallo();
                    }
                }

            }
            if (this.padre != null) {
                this.padre.validarSecuencia();
            }


        });
    }

    intercambiarPosicion(casilla: Casilla) {
        let elemento = casilla.contenido;
        let x = elemento.style.left;
        let y = elemento.style.top;
        let pos = casilla.posicion;

        if (this.padre != null) {
            this.padre.casillas[this.posicion] = casilla;
            this.padre.casillas[pos] = this;

            //  console.log("Mi posicion: " + this.padre.casillas.indexOf(this) + "  l: " + this.padre.casillas.indexOf(casilla) );
        }

        casilla.posicion = this.posicion;
        this.posicion = pos;

        elemento.style.left = this.contenido.style.left;
        elemento.style.top = this.contenido.style.top;

        this.contenido.style.left = x;
        this.contenido.style.top = y;

    }

    secuencia() {
        if (this.padre != null && this.validado == false) {
            this.validado = true;

            if (this.padre.final.validado) {
                if (this.padre.validacion != null) {
                    this.padre.validacion();
                }
                // console.log("ganaste");
            }

            if (this.up &&
                this.padre.up(this.posicion) != -1 &&
                this.padre.casillas[this.padre.up(this.posicion)].validado == false &&
                this.padre.casillas[this.padre.up(this.posicion)].down) {

                // console.log("up green  " + this.padre.casillas[this.padre.up(this.posicion)].posicion + "  pos de  " + this.posicion);

                this.padre.casillas[this.padre.up(this.posicion)].secuencia();
            }

            if (this.down &&
                this.padre.down(this.posicion) != -1 &&
                this.padre.casillas[this.padre.down(this.posicion)].validado == false &&
                this.padre.casillas[this.padre.down(this.posicion)].up) {
                //   console.log("down green  " + this.padre.down(this.posicion) + "  " + this.padre.casillas[this.padre.down(this.posicion)].posicion + "  pos de  " + this.posicion);

                this.padre.casillas[this.padre.down(this.posicion)].secuencia();
            }

            if (this.left &&
                this.padre.left(this.posicion) != -1 &&
                this.padre.casillas[this.padre.left(this.posicion)].validado == false &&
                this.padre.casillas[this.padre.left(this.posicion)].right) {

                //   console.log("left green  " + this.padre.left(this.posicion) + "  " + this.padre.casillas[this.padre.left(this.posicion)].posicion + "  pos de  " + this.posicion);

                this.padre.casillas[this.padre.left(this.posicion)].secuencia();
            }

            if (this.right &&
                this.padre.right(this.posicion) != -1 &&
                this.padre.casillas[this.padre.right(this.posicion)].validado == false &&
                this.padre.casillas[this.padre.right(this.posicion)].left) {

                // console.log("right green  " + this.padre.casillas[this.padre.right(this.posicion)].posicion + "  pos de  " + this.posicion);
                this.padre.casillas[this.padre.right(this.posicion)].secuencia();
            }

            this.contenido.style.background = "green";
        }

    }

    setSalidas(up: boolean, down: boolean, left: boolean, right: boolean) {
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
    }


    validar() {

    }
}

class Pizarra {

    pizarra_html: HTMLElement;
    casillas: Array<Casilla>;
    inicial: Casilla;
    final: Casilla;
    lider: Casilla;
    matrix: any;
    columnas = 5;
    filas = 3;
    width = 103;
    height = 103;
    fichas: HTMLElement;
    guias: HTMLElement;
    validacion?: Function;
    intentoFallo?: Function;

    constructor(casillas: Array<Casilla>, inicial: number, final: number, lider: number) {
        this.pizarra_html = document.createElement('div');
        this.pizarra_html.className = "pizarra";
        this.casillas = casillas;
        this.inicial = casillas[inicial];
        this.final = casillas[final];
        this.lider = casillas[lider];


        // this.inicial.setSalidas(true, true, true, true);
        // this.final.setSalidas(true, true, true, true);
        this.lider.setSalidas(false, false, false, false);

        this.fichas = document.createElement('section');
        this.fichas.className = "pizarra__fichas";
        this.guias = document.createElement('section');
        this.guias.className = "pizarra__clicks";

        this.pizarra_html.appendChild(this.guias);
        this.pizarra_html.appendChild(this.fichas);


    }

    cargarTablero(columnas: number, filas: number, width: number, height: number) {
        this.columnas = columnas;
        this.filas = filas;
        this.width = width;
        this.height = height;
        this.matrix = crearMatrix(this.columnas, this.filas, this.width, this.height);

        this.fichas.style.width = (this.width - margin) + "px";
        this.fichas.style.height = (this.height - margin) + "px";
        this.guias.style.width = (this.width - margin) + "px";
        this.guias.style.height = (this.height - margin) + "px";

        this.casillas.forEach((c, i) => {
            c.getPadre(this);
            this.fichas.appendChild(c.contenido);
            this.guias.appendChild(c.placeholder);
            c.contenido.style.width = this.width + "px";
            c.contenido.style.height = this.height + "px";
            c.contenido.style.left = this.matrix[i].x + "px";
            c.contenido.style.top = this.matrix[i].y + "px";
            c.placeholder.style.left = this.matrix[i].x + "px";
            c.placeholder.style.top = this.matrix[i].y + "px";
        });

        this.fichas.insertBefore(this.lider.contenido, this.casillas[0].contenido);
        this.guias.insertBefore(this.lider.placeholder, this.casillas[0].placeholder);



        this.lider.contenido.style.background = "blue";

        this.validarSecuencia();

    }

    up(posicion: number) {
        if (posicion < this.casillas.length && posicion - this.columnas >= 0) {
            let pos = posicion - this.columnas;
            return pos;
        } else {
            return -1;
        }
    }

    down(posicion: number) {
        if (posicion + this.columnas < this.casillas.length && posicion >= 0) {
            let pos = posicion + this.columnas;
            return pos;
        } else {
            return -1;
        }
    }

    left(posicion: number) {

        if (posicion < this.casillas.length && posicion - 1 > 0) {
            let pos = 0;
            if (posicion % this.columnas == 0) {

            } else {
                pos = posicion - 1;
            }

            return pos;
        } else {
            return -1;
        }
    }

    right(posicion: number) {

        if (posicion + 1 < this.casillas.length && posicion >= 0) {
            let pos = 0;
            if ((posicion + 1) % this.columnas == 0) {

            } else {
                pos = posicion + 1;
            }
            // console.log(this.casillas[pos].posicion);
            return pos;
        } else {
            return -1;
        }
    }

    validarSecuencia() {
        this.casillas.forEach(c => {
            c.validado = false;
            if (c != this.lider && c != this.inicial) {
                c.contenido.style.background = "red";
            }

        });
        this.inicial.secuencia();
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

    setIntentoFallo(intentoFallo: Function) {
        this.intentoFallo = intentoFallo;
    }

    getElemento() {
        return this.pizarra_html;
    }



}

/*
var pizarra_fichas: Array<Casilla> = new Array();

for (let i = 0; i < 12; i++) {
    let a = new Casilla(document.createElement('div'), false, false, false, false, i);
    pizarra_fichas.push(a);
}


pizarra_fichas[5].up = true;
pizarra_fichas[5].right = true;
pizarra_fichas[6].left = true;
pizarra_fichas[6].right = true;
/*
let p = new Pizarra(pizarra_fichas, 1, 7, 3);
p.cargarTablero( 4, 3,100, 100);
$(".pizarras").append(p.getElemento());

p.validarSecuencia();
*/