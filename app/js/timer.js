"use strict";
var Timer = /** @class */ (function () {
    function Timer() {
        this.time = 0;
        this.horas = 0;
        this.minutos = 2;
        this.segundos = 5;
        this.milisegundos = 0;
    }
    Timer.prototype.start = function () {
        var _this = this;
        this.intervalo = setInterval(function () {
            _this.comenzarTempo();
            console.log("Hora:" + _this.horas + " Minutos: " + _this.minutos + " Segundos: " + _this.segundos + " Millis: " + _this.milisegundos + " Total: " + _this.time);
        }, 10);
    };
    Timer.prototype.stop = function () {
        clearInterval(this.intervalo);
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
    };
    return Timer;
}());
