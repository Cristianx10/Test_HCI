
  function selector(id: string) {
    let elemento: HTMLElement = <any>document.querySelector(id);
    if (elemento == null) {
      alert(`No existe la etiqueta: ${id}`);
    }
    return elemento;
  }

  function selectorAll(id: string) {
    let elemento: Array<HTMLElement> = <any>document.querySelectorAll(id);
    if (elemento == null) {
      alert(`No existe la etiqueta: ${id}`);
    }
    return elemento;
  }

  var bloqueActual: Bloque;
  var nulo: any = null;
  var bloquear: boolean = false;
  let nav:Navegable;

  class Bloque {
    public cliqueado: boolean;
    public ficha: HTMLElement;
    public bloque: HTMLElement;
    public validado: boolean;
    public padre: Pareja;
    public tablero?:tablero_tarjetas;
    public tarjeta: HTMLElement;
    

    constructor(ficha: HTMLElement, padre: Pareja) {
      this.ficha = ficha;
      this.validado = false;
      this.cliqueado = false;
      this.padre = padre;
      let element: HTMLElement = document.createElement("div");
      element.className = "tablero__bloque";

      let bloque = document.createElement("div");
      bloque.className = "bloque";

      let cara = document.createElement("div");
      cara.className = "bloque__cara";

      let sello = ficha;
      sello.className = "bloque__sello";

      element.appendChild(bloque);
      bloque.appendChild(cara);
      bloque.appendChild(sello);

      this.bloque = element;
      this.tarjeta = bloque;

      this.bloque.addEventListener("click", () => {
        //console.log(this.padre);
        this.tablero = this.padre.tablero;
        if (bloquear == false) {
          if (this.validado === false && bloqueActual !== this) {
            if (this.tarjeta.style.transform === "rotateY(180deg)") {
              this.ocultar();
            } else {
              this.mostrar();

              if (this.padre.validar(bloqueActual)) {
                this.padre.confirmado();
                
                if(this.tablero != null){
                  if(this.tablero.intentoAcierto != null){
                    this.tablero.intentoAcierto();
                  }
                }
                bloqueActual = nulo;
              } else if (bloqueActual !== null && bloqueActual !== undefined) {
                bloquear = true;
                setTimeout(() => {
                  bloqueActual.ocultar();
                  this.ocultar();
                  bloqueActual = nulo;
                  bloquear = false;
                  if(this.tablero != null){
                    if(this.tablero.intentoFallo != null){
                      this.tablero.intentoFallo();
                    }
                  }
                }, 1000);
              } else {
                bloqueActual = this;
              }
            }
          } else if (this.validado === false && bloqueActual === this) {
            this.cliqueado = false;
            this.bloque.style.transform = "rotateY(0deg)";
          }
        }
        if(this.tablero != null && this.tablero.verificar()){
          if(this.tablero.validacion != null){
            this.tablero.validacion();
          }
        }
      });
   
      
    }

    ocultar() {
      this.cliqueado = false;
      this.tarjeta.style.transform = "rotateY(0deg)";

    }

    mostrar() {
      this.cliqueado = true;
      this.tarjeta.style.transform = "rotateY(180deg)";
   
    }

    getBloque() {
      return this.bloque;
    }

    reset() {
      this.cliqueado = false;
      this.tarjeta.style.transform = "rotateY(0deg)";
    }

    validar() {

    }
  }

  class Pareja {
    public elementos: Bloque[];
    public validado:boolean;
    public tablero?:tablero_tarjetas;
    

    constructor(elementoA: HTMLElement, elementoB: HTMLElement) {
      this.elementos = new Array<Bloque>();
      let a = new Bloque(elementoA, this);
      let b = new Bloque(elementoB, this);
      this.elementos.push(a);
      this.elementos.push(b);
      this.validado = false;
    }

    getElementoA(): HTMLElement {
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
      this.elementos.forEach(element => {
        element.validado = true;
      });
      this.validado = true;
    }
  }

  class tablero_tarjetas{

    fichas: Array<Pareja>;
    tarjetas: Array<HTMLElement>;
    tablero:HTMLElement;
    tab_global:HTMLElement;
    posiciones:Array<number>;
    validacion?:Function;
    intentoAcierto?:Function;
    intentoFallo?:Function;

    constructor(){
      this.fichas = new Array();
      this.tarjetas= new Array();
      this.posiciones = new Array();
      //console.log(this.posiciones);
      
      this.tablero = document.createElement("div");
      this.tablero.className = "tablero";

      this.tab_global = document.createElement("div");
      this.tab_global.className = "tablerog";
      this.tab_global.appendChild(this.tablero);
    }

    agregar(url:string, orden:number, url2:string, orden2:number){
      let a = document.createElement("div");
      a.innerHTML = `<div style="background-image:url('${url}'); width:100%; height:100%;background-size: contain;background-repeat: no-repeat;"></div>`;
      this.posiciones.push(orden);

      let b = document.createElement("div");
      b.innerHTML = `<div style="background-image:url('${url2}'); width:100%; height:100%;background-size: contain;background-repeat: no-repeat;"></div>`;
      this.posiciones.push(orden2);


      let par = new Pareja(a, b);
      this.fichas.push(par);
    }

    iniciar(){
      for (let i = 0; i < this.fichas.length; i++) {
        let par = this.fichas[i];
        par.tablero = this;
        this.tarjetas.push(par.getElementoA());
        this.tarjetas.push(par.getElementoB());
      }

      //shuffle(this.tarjetas);
      
      for (let i = 0; i < this.tarjetas.length; i++) {
        this.tarjetas[this.posiciones[i]].draggable = false;
        this.tablero.appendChild(this.tarjetas[this.posiciones[i]]);
      }
    }

    incluirEn(ubicacion:string){
      let u:HTMLElement = <HTMLElement>document.querySelector(ubicacion);
      u.append(this.tab_global);
    }

    verificar(){
      let cont = 0;
      for (let i = 0; i < this.fichas.length; i++) {
        let f = this.fichas[i];
        if(f.validado){
          cont++;
        }
      }
      if(cont == this.fichas.length){
        return true;
      }else{
        return false;
      }
    }

    setValidacion(validacion:Function){
      this.validacion = validacion;
    }

    setIntentoAcierto(intentoAcierto:Function){
      this.intentoAcierto = intentoAcierto;
    }

    setIntentoFallo(intentoFallo:Function){
      this.intentoFallo = intentoFallo;
    }
  }

  

 /* var bloques = selector(".tableros");
  var carga = new createjs.LoadQueue(true);

  
 
  carga.loadFile({ src: "../../data/emparejado.json" });


  carga.on("fileload", function(event: any) {
    if (event.item.type == "json") {
      for (let i = 0; i < event.result.secciones.length; i++) {
        let sec = event.result.secciones[i];
        let fichas: Array<HTMLElement> = new Array();

        for (let j = 0; j < sec.recursos.length; j++) {
          let recur = sec.recursos[j];
          let a = document.createElement("div");
          a.innerHTML = `<img src="${recur}" />`;

          fichas.push(a);
        }

        let parejas = new Array<Pareja>();
        for (let i = 0; i < fichas.length; i++) {
          let a = fichas[i];
          i++;
          let b = fichas[i];
          let par = new Pareja(a, b);
          parejas.push(par);
      
        }

        let tab = new tablero_tarjetas(parejas);
        bloques.appendChild(tab.tab_global);

      }

      let n:any = document.querySelectorAll(".tablerog");
      nav = new Navegable(n);
      console.log(n);
    }
  });
  */



//$(document).ready(init);

/*
  bloques.forEach(element => {
    element.addEventListener("click", () => {
      if (element.style.transform === "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      } else {
        element.style.transform = "rotateY(180deg)";
      }

      console.log();
    });
  });
*/
/*
  let fichas: Array<HTMLElement> = new Array();
  let tarjetas: Array<HTMLElement> = new Array();
  
  let a = document.createElement("div");
  let b = document.createElement("div");
  a.innerHTML = "mono" + "A";
  b.innerHTML = "mono" + "B";

  fichas.push(a);
  fichas.push(b);

  a = document.createElement("div");
  b = document.createElement("div");

  a.innerHTML = "Lobo" + "A";
  b.innerHTML = "Lobo" + "B";

  fichas.push(a);
  fichas.push(b);

  a = document.createElement("div");
  b = document.createElement("div");

  a.innerHTML = "Arana" + "A";
  b.innerHTML = "Arana" + "B";

  fichas.push(a);
  fichas.push(b);


  for (let i = 0; i < fichas.length; i++) {
    let a = fichas[i];
    i++;
    let b = fichas[i];
    let par = new Pareja(a, b);
    tarjetas.push(par.getElementoA());
    tarjetas.push(par.getElementoB());
  }

  function shuffle(array: any) {
    array.sort(() => Math.random() - 0.5);
  }

  shuffle(tarjetas);

  function addBloques() {
    var columnas = 5;
    var tr = document.createElement("tr");

    for (let i = 0; i < tarjetas.length; i++) {
      if (i % columnas == 0) {
        bloques.appendChild(tr);
        tr = document.createElement("tr");
      }
      tr.appendChild(tarjetas[i]);
    }
    bloques.appendChild(tr);
  }

  addBloques();
  */
