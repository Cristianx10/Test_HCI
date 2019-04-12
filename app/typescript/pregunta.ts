

class Opcion {
  opcion: HTMLElement;
  //categorias:Array<>;
  valor: Array<any>;
  check: any;


  constructor(info: string, valor: Array<any>) {
    this.opcion = document.createElement("label");
    this.check = document.createElement("input");
    this.check.type = "radio";
    this.check.name = "opcion";
    this.opcion.append(this.check);
    this.opcion.append(info);
    this.valor = valor;
  }

  validacion(){
      this.valor.forEach(v => {
          RESULTADO.sumar(v.area, v.valor);
      });
  }

  getElement(){
      return this.opcion;
  }
}

class Pregunta {
    elemento: HTMLElement;
    pregunta: string;
    opciones: Array<Opcion>;

    constructor(pregunta: string, opciones: Array<Opcion>) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";

        let div_seccionA = document.createElement('section');
        let div_seccionA_h1 = document.createElement('h2');
        let div_seccionB = document.createElement('section');
        let formulario = document.createElement('form');

        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";

        div_seccionA_h1.innerHTML = this.pregunta;

        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);
        
        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        

        opciones.forEach(element => {
            formulario.appendChild(element.getElement());
        });

        div_seccionB.appendChild(formulario);
    }

    validar() {
        this.opciones.forEach((opcion: any) => {
        if (opcion.check.checked) {
            return this;
        }
        });
    }

    getElement(){
        return this.elemento;
    }
    
}

$(document).ready(function() {


});
