class Timer {
  time: number;
  horas: number;
  minutos: number;
  segundos: number;
  milisegundos: number;
  intervalo: any;
  termino?:Function;

  constructor() {
    this.time = 0;
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;
    this.milisegundos = 0;
  }

  start() {

    this.time = 0;
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;
    this.milisegundos = 0;

    this.intervalo = setInterval(() => {
      this.comenzar();
      //console.log("Hora:" + this.horas + " Minutos: " + this.minutos + " Segundos: "+ this.segundos + " Millis: " + this.milisegundos + " Total: " +this.time);
    }, 10);


  }

  startTempo(minutos:number, segundos:number) {

    this.time = 0;
    this.horas = 0;
    this.minutos = minutos;
    this.segundos = segundos;
    this.milisegundos = 0;
    

    this.intervalo = setInterval(() => {
      this.comenzarTempo();
      //console.log("Hora:" + this.horas + " Minutos: " + this.minutos + " Segundos: "+ this.segundos + " Millis: " + this.milisegundos + " Total: " +this.time);
    }, 10);
  }

  stop() {
    clearInterval(this.intervalo);
    if(this.termino != null){
      this.termino();
    }
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

    if (this.milisegundos <= 99) {
      this.milisegundos--;
      this.time--;
    }

    if (this.milisegundos < 0) {
      this.milisegundos = 99;
      this.segundos--;
    }

    if (this.segundos < 0) {
      this.segundos = 59;
      this.minutos--;
    }

    if (this.minutos < 0) {
      this.minutos = 59;
      this.horas--;
    }

    if(this.horas < 0){
      this.stop();
    }

  }

  setTermino(ter:Function){
    this.termino = ter;
  }
}
