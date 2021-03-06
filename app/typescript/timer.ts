class Timer {
  time: number;
  horas: number;
  minutos: number;
  segundos: number;
  milisegundos: number;
  intervalo: any;
  termino?: Function;
  progreso?: Function;
  enEjecucion: boolean;
  accionFinal?: Function;
  terminado = false;

  inicial__segundos:number;
  cont__segundos:number;

  constructor() {
    this.inicial__segundos = 0;
    this.cont__segundos = 0;

    this.time = 0;
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;
    this.milisegundos = 0;
    this.enEjecucion = true;
  }

  //Inicia un cronometro
  start() {
    this.time = 0;
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;
    this.milisegundos = 0;

    this.intervalo = setInterval(() => {
      this.comenzar();
    }, 10);
  }

  //Inicia un temporizador
  startTempo(segundos: number) {

    this.time = 0;
    this.horas = 0;
    this.minutos = parseInt((segundos / 60) + "", 10);
    this.segundos = segundos % 60;
    this.milisegundos = 0;
    this.enEjecucion = true;
    this.inicial__segundos = segundos;

    this.intervalo = setInterval(() => {

      this.comenzarTempo();
      if (this.progreso != null) {
        this.progreso(this.minutos, this.segundos);
      }
    }, 10);
  }

  //Detiene los intervalos
  stop() {
    if (this.terminado == false) {

      this.terminado = true;
  
      clearInterval(this.intervalo);

      if (this.termino != null) {
        this.termino();
      }

      if (this.accionFinal != null) {
        this.accionFinal();
      }
    }
    console.log("Termino");
    //console.log("Hora:" + this.horas + " Minutos: " + this.minutos + " Segundos: "+ this.segundos + " Millis: " + this.milisegundos + " Total: " +this.time);
  }

  getTime(): number {
    return this.time;
  }

  comenzar() {
    if (this.milisegundos < 99) {
      this.milisegundos++;
      this.time++;
    }

    if (this.milisegundos == 99) {
      this.milisegundos = -1;
    }
    if (this.milisegundos == 0) {
      this.segundos++;


    }
    if (this.segundos == 60) {
      this.segundos = 0;
    }
    if ((this.milisegundos == 0) && (this.segundos == 0)) {
      this.minutos++;

    }
    if (this.minutos == 60) {
      this.minutos = 0;
    }
    if ((this.milisegundos == 0) && (this.segundos == 0) && (this.minutos == 0)) {
      this.horas++;

    }

  }

  comenzarTempo() {

    if (this.enEjecucion) {

      if (this.milisegundos <= 99) {
        this.milisegundos--;
        this.time--;
      }

      if (this.milisegundos < 0) {
        this.milisegundos = 99;
        this.segundos--;
        this.cont__segundos++;
      }

      if (this.segundos < 0) {
        this.segundos = 59;
        this.minutos--;
      }

      if (this.minutos < 0) {
        this.minutos = 59;
        this.horas--;
      }

      if (this.horas < 0) {
        this.enEjecucion = false;
        this.stop();
      }
    }
  }

  setProgreso(progreso?: Function) {
    this.progreso = progreso;
  }


  setTermino(ter: Function) {
    this.termino = ter;
  }

  setAccionFinal(accionFinal: Function) {
    this.accionFinal = accionFinal;
  }

  getTiempo(){
    return this.cont__segundos;
  }
}

/*
class Observadores{

  elementos:Array<HTMLElement>;

  constructor(elemento:HTMLElement){
    this.elementos = new Array();
    this.elementos.push(elemento);
  }

  agregar(){
    this.elementos[0].cloneNode();
  }
}

*/