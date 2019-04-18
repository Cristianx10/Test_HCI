class Opcion {
    opcion: HTMLElement;
    //categorias:Array<>;
    valor: Array<any>;
    check: any;
    contenido:HTMLElement;

    constructor(info: string, valor: Array<any> ) {
        this.opcion = document.createElement("label");
        this.check = document.createElement("input");
        this.contenido = document.createElement("span");
        
        this.opcion.className = "opcion_check";
        this.contenido.className = "opcion";
        this.check.className = "marcador";
        this.check.type = "radio";
        this.check.name = "opcion";
        this.check.checked = false;

        this.opcion.append(this.check);
        this.opcion.append(this.contenido);
        this.contenido.append(info);
        this.valor = valor;
    }

    validacion() {

        this.valor.forEach(v => {
            RESULTADO.sumar(v.area, v.valor);
        });
    }

    getElement() {
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
        formulario.className = "formulario_opciones";

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
                opcion.validacion();
                RESULTADO.pruebas.push({pregunta:this.elemento.innerText,respuesta:opcion.opcion.innerText});
            }
        });
    }
    
   
    getElement() {
        return this.elemento;
    }
}

class OpcionB{
    opcion: HTMLElement;
    valor: Array<any>;
    validado: boolean;
    pregunta?:PreguntaB;

    constructor(info: string, valor: Array<any> ) {
        this.opcion = document.createElement("div");
        this.opcion.className = "opcion";
        this.validado = false;
        this.valor = valor;
        this.opcion.innerHTML = info;

        this.opcion.addEventListener('click', ()=>{
            if(this.pregunta != null){
                this.pregunta.reset();
                this.validado = true;
                this.opcion.classList.add("opcion__select");
                if(this.pregunta.validacion != null){
                    this.pregunta.validacion();
                }
            }
        });
    }

    validacion() {
        this.valor.forEach(v => {
            RESULTADO.sumar(v.area, v.valor);
        });
    }

    getElement() {
        return this.opcion;
    }

}


class PreguntaB{

    elemento: HTMLElement;
    pregunta: string;
    opciones: Array<OpcionB>;
    validacion?:Function;

    constructor(pregunta: string, opciones: Array<OpcionB>) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";

        let div_seccionA = document.createElement('section');
        let div_seccionA_h1 = document.createElement('h2');
        let div_seccionB = document.createElement('section');
        let formulario = document.createElement('div');

        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";

        div_seccionA_h1.innerHTML = this.pregunta;

        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);

        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));


        opciones.forEach(o => {
            o.pregunta = this;
            formulario.appendChild(o.getElement());
        });

        div_seccionB.appendChild(formulario);


    }

    validar() {
        this.opciones.forEach((o: any) => {
            if (o.validado) {
                o.validacion();
                RESULTADO.pruebas.push({pregunta:this.elemento.innerText,respuesta:o.opcion.innerText});
            }
        });
    }
    

    reset(){
        this.opciones.forEach(o => {
            o.validado = false;
            o.opcion.classList.remove("opcion__select");
        });
    }
   
    getElement() {
        return this.elemento;
    }

    setValidacion(validacion:Function){
        this.validacion = validacion;
      }

}