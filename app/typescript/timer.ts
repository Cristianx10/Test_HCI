class Timer {
    time: number;
    horas: number;
    minutos: number;
    segundos: number;
    milisegundos: number;
    intervalo: any;
  
    constructor() {
      this.time = 0;
      this.horas = 0;
      this.minutos = 2;
      this.segundos = 5;
      this.milisegundos = 0;
    }
  
    start() {
  
      this.intervalo = setInterval(() => {
        
        this.comenzarTempo();
        console.log("Hora:" + this.horas + " Minutos: " + this.minutos + " Segundos: "+ this.segundos + " Millis: " + this.milisegundos + " Total: " +this.time);
      }, 10);
    
     
    }
  
    stop(){
      clearInterval(this.intervalo);
      //console.log("Hora:" + this.horas + " Minutos: " + this.minutos + " Segundos: "+ this.segundos + " Millis: " + this.milisegundos + " Total: " +this.time);
    }
  
    getTime():number{
      return this.time;
    }
  
    comenzar(){
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
         this.segundos= 0;
        }
        if ( (this.milisegundos == 0)&&(this.segundos == 0) ) {
          this.minutos++;
    
        }
        if (this.minutos == 60) {
          this.minutos = 0;
        }
        if ( (this.milisegundos == 0)&&(this.segundos == 0)&&(this.minutos == 0) ) {
          this.horas ++;
          
        }
        
      }

      comenzarTempo(){
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
          this.horas --;
        }

        
        
      }
  }
  