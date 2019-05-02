"use strict";
function selector(id) {
    var elemento = document.querySelector(id);
    if (elemento == null) {
        alert("No existe la etiqueta: " + id);
    }
    return elemento;
}
function selectorAll(id) {
    var elemento = document.querySelectorAll(id);
    if (elemento == null) {
        alert("No existe la etiqueta: " + id);
    }
    return elemento;
}
var bloqueActual;
var nulo = null;
var bloquear = false;
var nav;
var Bloque = /** @class */ (function () {
    function Bloque(ficha, padre) {
        var _this = this;
        this.ficha = ficha;
        this.validado = false;
        this.cliqueado = false;
        this.padre = padre;
        var element = document.createElement("div");
        element.className = "tablero__bloque";
        var bloque = document.createElement("div");
        bloque.className = "bloque";
        var cara = document.createElement("div");
        cara.className = "bloque__cara";
        var sello = ficha;
        sello.className = "bloque__sello";
        element.appendChild(bloque);
        bloque.appendChild(cara);
        bloque.appendChild(sello);
        this.bloque = element;
        this.tarjeta = bloque;
        this.bloque.addEventListener("click", function () {
            //console.log(this.padre);
            _this.tablero = _this.padre.tablero;
            if (bloquear == false) {
                if (_this.validado === false && bloqueActual !== _this) {
                    if (_this.tarjeta.style.transform === "rotateY(180deg)") {
                        _this.ocultar();
                    }
                    else {
                        _this.mostrar();
                        if (_this.padre.validar(bloqueActual)) {
                            _this.padre.confirmado();
                            if (_this.tablero != null) {
                                if (_this.tablero.intentoAcierto != null) {
                                    _this.tablero.intentoAcierto();
                                }
                            }
                            bloqueActual = nulo;
                        }
                        else if (bloqueActual !== null && bloqueActual !== undefined) {
                            bloquear = true;
                            setTimeout(function () {
                                bloqueActual.ocultar();
                                _this.ocultar();
                                bloqueActual = nulo;
                                bloquear = false;
                                if (_this.tablero != null) {
                                    if (_this.tablero.intentoFallo != null) {
                                        _this.tablero.intentoFallo();
                                    }
                                }
                            }, 1000);
                        }
                        else {
                            bloqueActual = _this;
                        }
                    }
                }
                else if (_this.validado === false && bloqueActual === _this) {
                    _this.cliqueado = false;
                    _this.bloque.style.transform = "rotateY(0deg)";
                }
            }
            if (_this.tablero != null && _this.tablero.verificar()) {
                if (_this.tablero.validacion != null) {
                    _this.tablero.validacion();
                }
            }
        });
    }
    Bloque.prototype.ocultar = function () {
        this.cliqueado = false;
        this.tarjeta.style.transform = "rotateY(0deg)";
    };
    Bloque.prototype.mostrar = function () {
        this.cliqueado = true;
        this.tarjeta.style.transform = "rotateY(180deg)";
    };
    Bloque.prototype.getBloque = function () {
        return this.bloque;
    };
    Bloque.prototype.reset = function () {
        this.cliqueado = false;
        this.tarjeta.style.transform = "rotateY(0deg)";
    };
    Bloque.prototype.validar = function () {
    };
    return Bloque;
}());
var Pareja = /** @class */ (function () {
    function Pareja(elementoA, elementoB) {
        this.elementos = new Array();
        var a = new Bloque(elementoA, this);
        var b = new Bloque(elementoB, this);
        this.elementos.push(a);
        this.elementos.push(b);
        this.validado = false;
    }
    Pareja.prototype.getElementoA = function () {
        return this.elementos[0].getBloque();
    };
    Pareja.prototype.getElementoB = function () {
        return this.elementos[1].getBloque();
    };
    Pareja.prototype.validar = function (bloque) {
        if (this.elementos.indexOf(bloque) !== -1) {
            return true;
        }
        return false;
    };
    Pareja.prototype.confirmado = function () {
        this.elementos.forEach(function (element) {
            element.validado = true;
        });
        this.validado = true;
    };
    return Pareja;
}());
var tablero_tarjetas = /** @class */ (function () {
    function tablero_tarjetas() {
        this.fichas = new Array();
        this.tarjetas = new Array();
        this.posiciones = new Array();
        //console.log(this.posiciones);
        this.tablero = document.createElement("div");
        this.tablero.className = "tablero";
        this.tab_global = document.createElement("div");
        this.tab_global.className = "tablerog";
        this.tab_global.appendChild(this.tablero);
    }
    tablero_tarjetas.prototype.agregar = function (url, orden, url2, orden2) {
        var a = document.createElement("div");
        a.innerHTML = "<div style=\"background-image:url('" + url + "'); width:100%; height:100%;background-size: contain;background-repeat: no-repeat;\"></div>";
        this.posiciones.push(orden);
        var b = document.createElement("div");
        b.innerHTML = "<div style=\"background-image:url('" + url2 + "'); width:100%; height:100%;background-size: contain;background-repeat: no-repeat;\"></div>";
        this.posiciones.push(orden2);
        var par = new Pareja(a, b);
        this.fichas.push(par);
    };
    tablero_tarjetas.prototype.iniciar = function () {
        for (var i = 0; i < this.fichas.length; i++) {
            var par = this.fichas[i];
            par.tablero = this;
            this.tarjetas.push(par.getElementoA());
            this.tarjetas.push(par.getElementoB());
        }
        //shuffle(this.tarjetas);
        for (var i = 0; i < this.tarjetas.length; i++) {
            this.tarjetas[this.posiciones[i]].draggable = false;
            this.tablero.appendChild(this.tarjetas[this.posiciones[i]]);
        }
    };
    tablero_tarjetas.prototype.incluirEn = function (ubicacion) {
        var u = document.querySelector(ubicacion);
        u.append(this.tab_global);
    };
    tablero_tarjetas.prototype.verificar = function () {
        var cont = 0;
        for (var i = 0; i < this.fichas.length; i++) {
            var f = this.fichas[i];
            if (f.validado) {
                cont++;
            }
        }
        if (cont == this.fichas.length) {
            return true;
        }
        else {
            return false;
        }
    };
    tablero_tarjetas.prototype.setValidacion = function (validacion) {
        this.validacion = validacion;
    };
    tablero_tarjetas.prototype.setIntentoAcierto = function (intentoAcierto) {
        this.intentoAcierto = intentoAcierto;
    };
    tablero_tarjetas.prototype.setIntentoFallo = function (intentoFallo) {
        this.intentoFallo = intentoFallo;
    };
    tablero_tarjetas.prototype.agregarResultados = function () {
    };
    return tablero_tarjetas;
}());
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
