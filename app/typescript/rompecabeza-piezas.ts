var temp_seleccion: any;
var sobre: boolean;

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371;
  var dLat = (lat2 - lat1) * (Math.PI / 180);
  var dLon = (lon2 - lon1) * (Math.PI / 180);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

class Ficha {
  elemento: HTMLElement;
  original: HTMLElement;
  orden: number;
  posicion: number;
  tem_pos: any;
  tablero: any;
  angulo: number;
  rotar: boolean;
  cotenido: HTMLElement;
  placeholder: HTMLElement;

  constructor(elemento: HTMLElement, orden: number, posicion: number, rotacion: number) {
    this.elemento = document.createElement('div');
    this.elemento.className = "ficha";
    this.cotenido = document.createElement("div");
    this.cotenido.className = "ficha_cotenido"
    this.placeholder = document.createElement("div");
    this.placeholder.className = "ficha_holder";
    this.placeholder.style.position = "absolute";
    this.placeholder.style.bottom = "0";
    this.placeholder.style.width = "100%";
    this.placeholder.style.height = "100%";
    this.placeholder.style.backgroundSize = "contain";
    this.cotenido.append(elemento);
    this.elemento.append(this.cotenido, this.placeholder);
    this.tem_pos = {};
    this.tem_pos.left = this.elemento.style.left;
    this.tem_pos.top = this.elemento.style.top;
    this.angulo = rotacion;
    this.rotar = false;
    this.cotenido.style.transform = `rotate(${this.angulo * 90}deg)`;

    this.elemento.addEventListener("click", () => {
     
      if (this.rotar) {
        this.angulo += 1;
        this.cotenido.style.transition = "all .5s ease";
        this.cotenido.style.transform = `rotate(${this.angulo * 90}deg)`;
        setTimeout(() => {
          this.cotenido.style.transition = "none";
          this.tablero.validar();
        }, 500);
        this.rotar = false;
      }
    });


    this.original = document.createElement("div");
    this.original.className = "zona";
    this.orden = orden;
    this.posicion = posicion;
  }

  setPlaceholder(url: string) {
    this.placeholder.style.backgroundImage = `url(${url})`;
  }

  soloRotacion() {
    this.rotar = true;
    this.elemento.addEventListener("click", () => {
      this.rotar = true;
    });
  }

  activarArrastre() {

    this.elemento.addEventListener("mouseup", () => {

      if (this.elemento.style.left == this.tem_pos.left && this.elemento.style.top == this.tem_pos.top) {
        this.rotar = true;
      }
      this.elemento.style.left = this.tem_pos.left;
      this.elemento.style.top = this.tem_pos.top;
      this.elemento.style.zIndex = "0";
      sobre = true;
      setTimeout(() => {
        sobre = false;
      }, 30);
    });

    this.elemento.addEventListener("mousedown", () => {
      this.tem_pos.left = this.elemento.style.left;
      this.tem_pos.top = this.elemento.style.top;
      temp_seleccion = { elemento: this.elemento, x: this.tem_pos.left, y: this.tem_pos.top, angulo: this.angulo };
      this.elemento.style.zIndex = "1000000";
    });


    this.elemento.addEventListener("mouseover", (e: any) => {

      if (sobre) {
        this.elemento.style.transition = "all .5s ease";
        //temp_seleccion.elemento.style.transition = "all .5s ease";

        temp_seleccion.elemento.style.left = this.elemento.style.left;
        temp_seleccion.elemento.style.top = this.elemento.style.top;
        this.elemento.style.left = temp_seleccion.x;
        this.elemento.style.top = temp_seleccion.y;

        let a = temp_seleccion.angulo - 1;

        temp_seleccion.elemento.style.zIndex = "0";
        temp_seleccion = null;
        sobre = false;

        setTimeout(() => {
          this.elemento.style.transition = "none";
          //temp_seleccion.elemento.style.transition = "none";

          this.tablero.validar();

        }, 500);

      }
      sobre = false;
    });


  }
}

class Tablero {
  fichas: Array<Ficha>;
  width: number;
  height: number;
  columnas: number;
  filas: number;
  margin = 10;
  tablero: HTMLElement;
  tablero__zonas: HTMLElement;
  tablero__fichas: HTMLElement;
  posiciones: any;
  validacion?: Function;
  intentoFallo?: Function;
  intentos: number;

  constructor(fichas: Array<Ficha>, columnas: number, filas: number, tamano: number) {
    this.fichas = fichas;
    this.columnas = columnas;
    this.width = tamano;
    this.height = tamano;
    this.filas = filas;
    this.intentos = 0;
    this.tablero = document.createElement("div");
    this.tablero__zonas = document.createElement("div");
    this.tablero__fichas = document.createElement("div");
    fichas.forEach(e => {
      e.tablero = this;
    });
    this.crearTablero();
    this.repartir();

  }

  crearTablero() {
    this.tablero.className = "rompecabeza";
    this.tablero__zonas.className = "rompecabeza__zona";
    this.tablero__fichas.className = "rompecabeza__ficha";


    this.tablero.appendChild(this.tablero__zonas);
    this.tablero.appendChild(this.tablero__fichas);
  }

  setTamano(width:number, height:number){
    this.tablero.style.width = width + "px";
    this.tablero.style.height = height + "px";
  }

  getMatrix(posicion: number) {

  }

  repartir() {
    this.posiciones = crearMatrix(this.columnas, this.filas, this.width, this.height);

    for (let i = 0; i < this.fichas.length; i++) {
      let o = this.fichas[this.fichas[i].posicion].original;

      o.style.left = this.posiciones[i].x + "px";
      o.style.top = this.posiciones[i].y + "px";
      this.tablero__zonas.appendChild(o);

      let e = this.fichas[i].elemento;
      e.style.left = this.posiciones[this.fichas[i].orden].x + "px";
      e.style.top = this.posiciones[this.fichas[i].orden].y + "px";
      //console.log(this.posiciones[i].x, this.posiciones[this.fichas[i].orden].x);

      this.tablero__fichas.appendChild(e);

    }
  }

  setPlaceholder(url: string) {
    this.fichas.forEach((f) => {
      f.setPlaceholder(url);
    });
  }

  activarArrastre() {

    this.fichas.forEach((f) => {
      f.activarArrastre();
    });
    $(".ficha").draggable();

  }

  activarRotacion() {

    this.fichas.forEach((f) => {
      f.soloRotacion();
    });


  }

  validar() {
    let con = 0;
    for (let i = 0; i < this.fichas.length; i++) {
      let f = this.fichas[i];
      if (f.original.style.left == f.elemento.style.left && f.original.style.top == f.elemento.style.top && (f.angulo * 90) % 360 == 0) {
        con++;
      }
    }

    if (con == this.fichas.length) {
      if (this.validacion != null) {
        this.validacion(this.intentos);
      }
      return true;
    } else {
      this.intentos++;
      if (this.intentoFallo != null) {
        this.intentoFallo(this.intentos);
      }
      return false;
    }

  }

  getTablero() {
    return this.tablero;
  }

  setValidacion(validacion: Function) {
    this.validacion = validacion;
  }
  setIntentoFallo(intentoFallo: Function) {
    this.intentoFallo = intentoFallo;
  }

}

