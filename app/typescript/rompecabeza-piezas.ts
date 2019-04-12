function startgame() {

  var intentos = 0;

  var tablero__rompecabeza: HTMLElement = <HTMLElement>document.querySelector(".table__rompecabezas");

  var temp_seleccion: any;
  var sobre: boolean;

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

    constructor(elemento: HTMLElement, orden: number, posicion: number, rotacion: number) {
      this.elemento = document.createElement('div');
      this.elemento.className = "ficha";
      this.elemento.appendChild(elemento);
      this.tem_pos = {};
      this.tem_pos.left = this.elemento.style.left;
      this.tem_pos.top = this.elemento.style.top;
      this.angulo = rotacion;
      this.rotar = false;
      this.elemento.style.transform = `rotate(${this.angulo * 90}deg)`;

      this.elemento.addEventListener("mousedown", () => {
        this.tem_pos.left = this.elemento.style.left;
        this.tem_pos.top = this.elemento.style.top;
        temp_seleccion = { elemento: this.elemento, x: this.tem_pos.left, y: this.tem_pos.top, angulo: this.angulo };
        this.elemento.style.zIndex = "1000000";

      });

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

      this.elemento.addEventListener("click", () => {

        if (this.rotar) {
          this.angulo += 1;
        /*  if (this.angulo > 3) {
            this.angulo = 0;
          }*/
          this.elemento.style.transition = "all .5s ease";
          this.elemento.style.transform = `rotate(${this.angulo * 90}deg)`;
          setTimeout(() => {
            this.elemento.style.transition = "none";
            this.tablero.validacion();
          }, 500);
          this.rotar = false;
         
        }

        
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

            this.tablero.validacion();
            
          }, 500);

        }
        sobre = false;
      });



      this.original = document.createElement("div");
      this.original.className = "zona";
      this.orden = orden;
      this.posicion = posicion;
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

    constructor(fichas: Array<Ficha>, columnas: number, filas: number, tamano: number) {
      this.fichas = fichas;
      this.columnas = columnas;
      this.width = tamano;
      this.height = tamano;
      this.filas = filas;
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
        console.log(this.posiciones[i].x, this.posiciones[this.fichas[i].orden].x);

        this.tablero__fichas.appendChild(e);

      }
    }
 
    validacion() {
      let con = 0;
      for (let i = 0; i < this.fichas.length; i++) {
        let f = this.fichas[i];
        if (f.original.style.left == f.elemento.style.left && f.original.style.top == f.elemento.style.top && (f.angulo*90)%360 == 0) {
          con++;
        }
      }

      if (con == this.fichas.length) {
        alert("Felicitaciones Ganaste");
        RESULTADO.sumar("ingenieria", 5);
        return true;
      } else {
        console.log("Sigue intentando");
        intentos++;
        if(intentos > 5){
          RESULTADO.sumar("ingenieria", -1);
          RESULTADO.sumar("diseño", 2);
        }
        
        return false;
      }

    }

    getTablero() {
      return this.tablero;
    }
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


  let carga = new createjs.LoadQueue();
  let info: any;

  carga.loadFile({ src: "../data/rompecabezas.json" });

  carga.on("fileload", (e: any) => {
    info = e.result;
    cargarRecursos();
  });

  function shuffle(array:any) {
    array.sort(function () { return Math.random() - 0.5; });
  }

  function cargarRecursos() {
    let width = 200;
    
    let columnas = 3;
    let filas = 3;
    
    let url = info.secciones.rompecabeza;
    let fichas = [];
    let imagenes = cargarImagen(url, width, width, columnas, filas);
    //console.log(imagenes);

    let orden = [];
    let rota = [];
    for (let i = 0; i < imagenes.length; i++) {
      orden.push(i);
      rota.push(90*i);
    }

    /*
    console.log(orden);
    shuffle(orden);
    orden[0] = 1;
    orden[1] = 0;
    console.log(rota);
    */

    for (let i = 0; i < imagenes.length; i++) {
      let e = imagenes[i];
      fichas.push(new Ficha(e, orden[i], i, rota[i]));
    }

    var tab = new Tablero(fichas, columnas, filas, width);

    tablero__rompecabeza.appendChild(tab.getTablero());
    $(".ficha").draggable();
  
  }

}

$(document).ready(() => {
  startgame();
  console.log(window.location.origin);
});
