
class Tablero_tarjetas extends Interaccion {

  fichas: Array<Pareja>;
  tarjetas: Array<HTMLElement>;

  posiciones: Array<number>;
  bloqueActual?: Bloque;
  bloqueador: boolean;

  constructor() {
    super();
    this.fichas = new Array();
    this.tarjetas = new Array();
    this.posiciones = new Array();
    this.tipoId = "Tablero Relacion";
    this.elemento.className = "tablero";
    this.bloqueador = false;
  }

  agregar(url: string, orden: number, url2: string, orden2: number) {

    this.posiciones.push(orden);


    this.posiciones.push(orden2);
    let par = new Pareja(this, url, url2);
    this.fichas.push(par);
  }

  iniciar() {
    for (let i = 0; i < this.fichas.length; i++) {
      let par = this.fichas[i];
      par.tablero = this;
      this.tarjetas.push(par.getElementoA());
      this.tarjetas.push(par.getElementoB());
    }

    //shuffle(this.tarjetas);

    for (let i = 0; i < this.tarjetas.length; i++) {
      this.tarjetas[this.posiciones[i]].draggable = false;
      this.elemento.append(this.tarjetas[this.posiciones[i]]);
    }
  }

  verificar() {
    let cont = 0;
    for (let i = 0; i < this.fichas.length; i++) {
      let f = this.fichas[i];
      if (f.validado) {
        cont++;
      }
    }
    if (cont == this.fichas.length) {
      return true;
    } else {
      return false;
    }

  }
}

class Pareja {

  public elementos: Array<Bloque>;
  public validado: boolean;
  public tablero: Tablero_tarjetas;

  constructor(tablero: Tablero_tarjetas, elementoA: string, elementoB: string) {
    this.elementos = new Array<Bloque>();
    this.tablero = tablero;
    this.validado = false;
    this.agregar(elementoA, elementoB);
  }

  agregar(elementoA: string, elementoB: string) {
    let a = new Bloque(elementoA, this);
    let b = new Bloque(elementoB, this);
    this.elementos.push(a);
    this.elementos.push(b);
  }

  getElementoA() {
    return this.elementos[0].getBloque();
  }

  getElementoB() {
    return this.elementos[1].getBloque();
  }

  validar(bloque: Bloque) {
    if (this.elementos.indexOf(bloque) !== -1) {
      return true;
    }
    return false;
  }

  confirmado() {
    this.validado = true;
  }
}

class Bloque {

  public elemento: HTMLElement;
  public pareja: Pareja;
  public bloque: HTMLElement;
  public valido: boolean;

  constructor(url: string, pareja: Pareja) {
    this.pareja = pareja;
    this.valido = false;

    this.elemento = document.createElement('div');
    this.elemento.className = "tablero__bloque";
    this.bloque = document.createElement('div');
    this.bloque.className = "bloque";
    this.bloque.innerHTML = `
        <div class="bloque__cara">
          </div><div class="bloque__sello">
            <div style="background-image:url('${url}'); width:100%; height:100%;background-size: contain;background-repeat: no-repeat;">
            </div>
        </div>`;

    this.elemento.addEventListener("click", () => {

      if (this.valido == false) {

        if (this.pareja.tablero.bloqueador == false && this.pareja.tablero.bloqueActual !== this) {

          if (this.bloque.style.transform === "rotateY(180deg)") {
            this.ocultar();
          } else {
            this.mostrar();
            

            if (this.pareja.tablero.bloqueActual != null) {

              if (this.pareja.validar(this.pareja.tablero.bloqueActual)) {

                this.pareja.validado = true;
                

                this.pareja.tablero.aciertos++;
                this.valido = true;
                this.pareja.tablero.bloqueActual.valido = true;
                this.pareja.tablero.intentos++;
                
                if (this.pareja.tablero.intentoAcierto != null) {
                  this.pareja.tablero.intentoAcierto(this.pareja.tablero.intentos, this.pareja.tablero.aciertos, this.pareja.tablero.fallos, this.pareja.tablero.valido);
                }

                this.pareja.tablero.bloqueActual = undefined;

              } else {

                this.pareja.tablero.bloqueador = true;
                this.pareja.tablero.intentos++;
                this.pareja.tablero.fallos++;
                if (this.pareja.tablero.intentoFallo != null) {
                  this.pareja.tablero.intentoFallo(this.pareja.tablero.intentos, this.pareja.tablero.aciertos, this.pareja.tablero.fallos, this.pareja.tablero.valido);
                }

                setTimeout(() => {
                  if (this.pareja.tablero.bloqueActual != null) {
                    this.pareja.tablero.bloqueActual.ocultar();
                  }
                  this.ocultar();
                  this.pareja.tablero.bloqueActual = undefined;
                  this.pareja.tablero.bloqueador = false;
                }, 1000);
              }
            } else {
              this.pareja.tablero.bloqueActual = this;
            }
          }
        }

        if (this.pareja.tablero.verificar()) {
          this.pareja.tablero.valido = true;
          if (this.pareja.tablero.validacion != null) {
            this.pareja.tablero.validacion(this.pareja.tablero.intentos, this.pareja.tablero.aciertos, this.pareja.tablero.fallos, this.pareja.tablero.valido);
          }
        }
      }


    });
    this.elemento.append(this.bloque);
  }

  ocultar() {
    this.bloque.style.transform = "rotateY(0deg)";
  }

  mostrar() {
    this.bloque.style.transform = "rotateY(180deg)";
  }

  getBloque() {
    return this.elemento;
  }
}