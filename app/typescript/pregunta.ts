interface ResultadoA {
    area: string;
    valor: number;
}

class Opcion {
    opcion: HTMLElement;
    //categorias:Array<>;
    valor: Array<ResultadoA>;
    check: any;
    contenido: HTMLElement;

    constructor(info: string, valor: Array<ResultadoA>) {
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
        this.opcion.append(info);
        this.valor = valor;
    }

    validacion() {

        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
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

        this.opciones.forEach((opcion) => {
            if (opcion.check.checked) {
                opcion.validacion();
                resultados.agregar("pregunta",
                    [{ id: "pregunta", valor: this.elemento.innerText },
                    { id: "respuesta", valor: opcion.opcion.innerText }]);
            }
        });
    }


    getElement() {
        return this.elemento;
    }
}



class PreguntaB {

    elemento: HTMLElement;
    pregunta: string;
    opciones: Array<OpcionB>;
    validacion?: Function;

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
        this.opciones.forEach((o) => {
            if (o.validado) {
                o.validacion();
                resultados.agregar("pregunta",
                    [{ id: "pregunta", valor: this.elemento.innerText },
                    { id: "respuesta", valor: o.opcion.innerText }]);
            }
        });
    }


    reset() {
        this.opciones.forEach(o => {
            o.validado = false;
            o.opcion.classList.remove("opcion__select");
        });
    }

    getElement() {
        return this.elemento;
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionB {
    opcion: HTMLElement;
    valor: Array<ResultadoA>;
    validado: boolean;
    pregunta?: PreguntaB;

    constructor(info: string, valor: Array<ResultadoA>) {
        this.opcion = document.createElement("div");
        this.opcion.className = "opcionB";
        this.validado = false;
        this.valor = valor;
        this.opcion.innerHTML = info;

        this.opcion.addEventListener('click', () => {
            if (this.pregunta != null) {
                this.pregunta.reset();
                this.validado = true;
                this.opcion.classList.add("opcion__select");
                if (this.pregunta.validacion != null) {
                    this.pregunta.validacion();
                }
            }
        });
    }

    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }

    getElement() {
        return this.opcion;
    }

}

/*
    Inicio de la pregunta C

*/

class PreguntaC {

    elemento: HTMLElement;
    pregunta: string;
    opciones: OpcionC;
    validacion?: Function;

    constructor(pregunta: string, opciones: OpcionC) {
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

        /*
                opciones.forEach(o => {
                    o.pregunta = this;
                    formulario.appendChild(o.getElement());
                });
        */
        div_seccionB.appendChild(this.opciones.areaTexto);


    }

    validar() {
        resultados.agregar("pregunta",
            [{ id: "pregunta", valor: this.pregunta },
            { id: "respuesta", valor: this.opciones.areaTexto.value }]);

        /* this.opciones.forEach((o: any) => {
             if (o.validado) {
                 o.validacion();
                 
             }
         });*/
    }


    reset() {
        /* this.opciones.forEach(o => {
             o.validado = false;
             o.opcion.classList.remove("opcion__select");
         });*/
    }

    getElement() {
        return this.elemento;
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionC {
    opcion: HTMLElement;
    valor: Array<ResultadoA>;
    validado: boolean;
    pregunta?: PreguntaB;
    areaTexto: HTMLTextAreaElement;

    constructor(info?: string, valor?: Array<ResultadoA>) {
        if (valor != null) {
            this.valor = valor;
        } else {
            this.valor = new Array();
        }
        this.opcion = document.createElement("div");
        this.opcion.className = "opcionC";
        this.areaTexto = document.createElement("textarea");
        this.areaTexto.className = "pregunta__parrafo";
        // this.areaTexto.type = "text";
        this.areaTexto.placeholder = "Escribe tu respuesta";
        if (info != null) {
            this.areaTexto.innerText = info;
        }

        this.opcion.append(this.areaTexto);
        this.validado = false;

        this.opcion.addEventListener('click', () => {
            if (this.pregunta != null) {
                this.pregunta.reset();
                this.validado = true;
                this.opcion.classList.add("opcion__select");
                if (this.pregunta.validacion != null) {
                    this.pregunta.validacion();
                }
            }
        });
    }

    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }

    getElement() {
        return this.opcion;
    }

}

/* Escala de linker
*/

class PreguntaD {

    elemento: HTMLElement;
    pregunta: string;
    opciones: OpcionD;
    validacion?: Function;

    constructor(pregunta: string, opciones: OpcionD) {
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

        div_seccionB.appendChild(this.opciones.opcion);
    }

    validar() {
        this.opciones.validacion();
        resultados.agregar("pregunta",
            [{ id: "pregunta", valor: this.pregunta },
            { id: "respuesta", valor: this.opciones.input.value }]);
    }

    getElement() {
        return this.elemento;
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionD {
    opcion: HTMLElement;
    valor: Array<ResultadoA>;
    validado: boolean;
    progreso: HTMLProgressElement;
    input: HTMLInputElement;

    constructor(valor: Array<ResultadoA>) {
        this.opcion = document.createElement("div");
        this.opcion.className = "likert_escala";

        let poco = document.createElement("label");
        poco.className = "likert_label";
        poco.innerText = "Poco";

        let linker = document.createElement("div");
        linker.className = "likert_cont";
        linker.style.position = " relative";

        this.progreso = document.createElement("progress");
        this.progreso.max = 2;
        this.progreso.value = 1;

        this.input = document.createElement("input");
        this.input.className = "likert";
        this.input.type = "range";
        this.input.value = "2";
        this.input.min = "1";
        this.input.max = "3";

        this.input.addEventListener("input", (e) => {
            this.progreso.value = parseInt(this.input.value) - 1;
        });

        let label1 = document.createElement("label");
        label1.className = "likert_valores";
        label1.innerText = "1";

        let label2 = document.createElement("label");
        label2.className = "likert_valores";
        label2.innerText = "2";

        let label3 = document.createElement("label");
        label3.className = "likert_valores";
        label3.innerText = "3";

        let mucho = document.createElement("label");
        mucho.className = "likert_label";
        mucho.innerText = "Mucho";

        linker.append(this.progreso, this.input, label1, label2, label3);

        this.opcion.append(poco, linker, mucho);

        this.validado = false;
        this.valor = valor;

    }

    validacion() {
        let index = parseInt(this.input.value);
        if (index < parseInt(this.input.max)) {
            let inp = this.valor[index - 1];
            resultados.sumar(inp.area, inp.valor);
        }
    }

    getElement() {
        return this.opcion;
    }

}



class PreguntaI {

    elemento: HTMLElement;
    pregunta: string;
    opciones: Array<OpcionI>;

    constructor(pregunta: string, opciones: Array<OpcionI>) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.elemento = document.createElement('div');
        this.elemento.className = "pregunta";

        let contenedor = document.createElement("div");
        contenedor.className = "cont_imgYabc";

        this.elemento.appendChild(contenedor);

        let div_seccionA = document.createElement('div');
        div_seccionA.className = "cont_imgYabc_img";
        div_seccionA.style.backgroundImage = "url(" + pregunta + ")";

        let div_seccionB = document.createElement('div');
        div_seccionB.className = "cont_imgYabc_abc";

        let div_seccionC = document.createElement('section');
        div_seccionC.className = "pregunta__opciones";
        div_seccionC.style.width = "100%";


        let formulario = document.createElement('form');
        formulario.className = "formulario_opciones";

        contenedor.appendChild(div_seccionA);
        contenedor.appendChild(div_seccionB);
        div_seccionB.appendChild(div_seccionC);
        div_seccionC.append(formulario);

        opciones.forEach(element => {
            formulario.appendChild(element.getElement());
        });

    }

    validar() {

        this.opciones.forEach((opcion) => {
            if (opcion.check.checked) {
                opcion.validacion();
                resultados.agregar("pregunta",
                    [{ id: "pregunta", valor: this.pregunta },
                    { id: "respuesta", valor: opcion.opcion.innerText }]);
            }
        });
    }


    getElement() {
        return this.elemento;
    }
}


class OpcionI {
    opcion: HTMLElement;
    //categorias:Array<>;
    valor: Array<ResultadoA>;
    check: any;
    contenido: HTMLElement;

    constructor(info: string, valor: Array<ResultadoA>) {
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
        this.opcion.append(info);
        this.valor = valor;
    }

    validacion() {

        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }

    getElement() {
        return this.opcion;
    }
}
