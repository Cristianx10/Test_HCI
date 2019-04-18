"use strict";
var Timer = /** @class */ (function () {
    function Timer() {
        this.time = 0;
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;
        this.milisegundos = 0;
    }
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
    Timer.prototype.startTempo = function (minutos, segundos) {
        var _this = this;
        this.time = 0;
        this.horas = 0;
        this.minutos = minutos;
        this.segundos = segundos;
        this.milisegundos = 0;
        this.intervalo = setInterval(function () {
            _this.comenzarTempo();
            //console.log("Hora:" + this.horas + " Minutos: " + this.minutos + " Segundos: "+ this.segundos + " Millis: " + this.milisegundos + " Total: " +this.time);
        }, 10);
    };
    Timer.prototype.stop = function () {
        clearInterval(this.intervalo);
        if (this.termino != null) {
            this.termino();
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
            this.stop();
        }
    };
    Timer.prototype.setTermino = function (ter) {
        this.termino = ter;
    };
    return Timer;
}());
