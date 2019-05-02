"use strict";
var Timer = /** @class */ (function () {
    function Timer() {
        this.terminado = false;
        this.time = 0;
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;
        this.milisegundos = 0;
        this.enEjecucion = true;
    }
    Timer.prototype.setProgreso = function (progreso) {
        this.progreso = progreso;
    };
    Timer.prototype.start = function () {
        var _this = this;
        this.time = 0;
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;
        this.milisegundos = 0;
        this.intervalo = setInterval(function () {
            _this.comenzar();
            //console.log("Hora:" + this.horas + " Minutos: " + this.minutos + " Segundos: "+ this.segundos + " Millis: " + this.milisegundos + " Total: " +this.time);
        }, 10);
    };
    Timer.prototype.startTempo = function (segundos) {
        var _this = this;
        this.time = 0;
        this.horas = 0;
        this.minutos = parseInt((segundos / 60) + "", 10);
        this.segundos = segundos % 60;
        this.milisegundos = 0;
        this.enEjecucion = true;
        this.intervalo = setInterval(function () {
            _this.comenzarTempo();
            if (_this.progreso != null) {
                _this.progreso(_this.minutos, _this.segundos);
            }
            //console.log("Hora:" + this.horas + " Minutos: " + this.minutos + " Segundos: "+ this.segundos + " Millis: " + this.milisegundos + " Total: " +this.time);
        }, 10);
    };
    Timer.prototype.stop = function () {
        clearInterval(this.intervalo);
        if (this.termino != null && this.enEjecucion == false) {
            this.termino();
        }
        else {
            this.enEjecucion = false;
        }
        if (this.terminado == false && this.accionFinal != null) {
            this.accionFinal();
            this.terminado = true;
        }
        //console.log("Hora:" + this.horas + " Minutos: " + this.minutos + " Segundos: "+ this.segundos + " Millis: " + this.milisegundos + " Total: " +this.time);
    };
    Timer.prototype.getTime = function () {
        return this.time;
    };
    Timer.prototype.comenzar = function () {
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
    };
    Timer.prototype.comenzarTempo = function () {
        if (this.enEjecucion) {
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
            if (this.horas < 0) {
                this.enEjecucion = false;
                this.stop();
            }
        }
    };
    Timer.prototype.setTermino = function (ter) {
        this.termino = ter;
    };
    Timer.prototype.setAccionFinal = function (accionFinal) {
        this.accionFinal = accionFinal;
    };
    return Timer;
}());
