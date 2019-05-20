/*var temp_seleccion: any;
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
}*/

let init_arrastrables = 0;

class Ficha {
  elemento: HTMLElement;
  original: HTMLElement;
  orden: number;
  posicion: number;
  tem_pos: any;
  tablero: Tablero;
  angulo: number;
  rotar: boolean;
  cotenido: HTMLElement;
  placeholder: HTMLElement;

  constructor(elemento: HTMLElement, orden: number, posicion: number, rotacion: number, tablero: Tablero) {
    this.tablero = tablero;
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

    this.elemento.addEventListener("click", () => {
      if (this.rotar) {
        this.angulo += 1;
        this.cotenido.style.transition = "all .5s ease";
        this.cotenido.style.transform = `rotate(${this.angulo * 90}deg)`;
        setTimeout(() => {
          this.cotenido.style.transition = "none";
          this.tablero.valida();
        }, 500);
        this.rotar = false;
      }
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
      this.tablero.sobre = true;
      setTimeout(() => {
        this.tablero.sobre = false;
      }, 30);
    });

    this.elemento.addEventListener("mousedown", () => {
      this.tem_pos.left = this.elemento.style.left;
      this.tem_pos.top = this.elemento.style.top;
      this.tablero.seleccion = this;//{ elemento: this.elemento, x: this.tem_pos.left, y: this.tem_pos.top, angulo: this.angulo };
      this.elemento.style.zIndex = "1000000";
    });


    this.elemento.addEventListener("mouseover", (e: any) => {

      if (this.tablero.sobre) {
        this.elemento.style.transition = "all .5s ease";
        //temp_seleccion.elemento.style.transition = "all .5s ease";

        if (this.tablero.seleccion != null) {
          let x = this.tablero.seleccion.elemento.style.left;
          let y = this.tablero.seleccion.elemento.style.top;

          this.tablero.seleccion.elemento.style.left = this.elemento.style.left; //.elemento.style.left = this.elemento.style.left;
          this.tablero.seleccion.elemento.style.top = this.elemento.style.top;
          this.elemento.style.left = x;
          this.elemento.style.top = y;

          let a = this.tablero.seleccion.angulo - 1;

          this.tablero.seleccion.elemento.style.zIndex = "0";
          this.tablero.seleccion = undefined;
          this.tablero.sobre = false;
        }


        setTimeout(() => {
          this.elemento.style.transition = "none";
          //temp_seleccion.elemento.style.transition = "none";

          this.tablero.valida();

        }, 500);

      }
      this.tablero.sobre = false;
    });


  }
}

class Tablero extends Interaccion {
  fichas: Array<Ficha>;
  width: number;
  height: number;
  columnas: number;
  filas: number;
  margin = 10;
  tablero__zonas: HTMLElement;
  tablero__fichas: HTMLElement;
  posiciones: any;
  sobre = false;
  seleccion?: Ficha;
  nameF:string;


  constructor(columnas: number, filas: number, tamano: number) {
    super();
    this.fichas = [];
    this.columnas = columnas;
    this.width = tamano;
    this.height = tamano;
    this.filas = filas;
    this.intentos = 0;
    this.elemento = document.createElement("div");
    this.tablero__zonas = document.createElement("div");
    this.tablero__fichas = document.createElement("div");
    this.elemento.style.width = columnas*tamano + "px";
    this.elemento.style.height = filas*tamano + "px";
    this.crearTablero();
    init_arrastrables += 1;
    this.nameF = "fichan" + init_arrastrables;

  }

  agregar(elemento: HTMLElement, orden: number, posicion: number, rotacion: number){
    let elem = new Ficha(elemento, orden, posicion,rotacion, this);
    elem.elemento.classList.add(this.nameF);
    this.fichas.push(elem);
  }

  crearTablero() {
    this.elemento.className = "rompecabeza";
    this.tablero__zonas.className = "rompecabeza__zona";
    this.tablero__fichas.className = "rompecabeza__ficha";

    this.elemento.appendChild(this.tablero__zonas);
    this.elemento.appendChild(this.tablero__fichas);
  }

  setTamano(width: number, height: number) {
    this.elemento.style.width = width + "px";
    this.elemento.style.height = height + "px";
  }

  iniciar(){
    this.repartir();
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
    $("." + this.nameF).draggable();

  }

  activarRotacion() {

    this.fichas.forEach((f) => {
      f.soloRotacion();
    });


  }

  valida() {
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


}

