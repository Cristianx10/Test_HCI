interface ResultadoA {
    area: string;
    valor: number;
}

class Pregunta {

    elemento: HTMLElement;
    informacion: string;
    seleccion?: Opcion;
    tipoId: string;
    contenido:Contenido;

    constructor(informacion?: string) {

        if (informacion == null) {
            this.informacion = "";
        } else {
            this.informacion = informacion;
        }
        this.tipoId = "pregunta";

        this.elemento = document.createElement('div');

        this.contenido = new Contenido(this.getElemento(), this);
    }

    incluirEn(lugar: string) {
        let e: HTMLElement = <HTMLElement>document.querySelector(lugar);
        e.append(this.elemento);
    }

    getElemento() {
        return this.elemento;
    }

    agregarClase(clase: string) {
        this.elemento.classList.add(clase);
    }

    removerClase(clase: string) {
        this.elemento.classList.remove(clase);
    }

    registro() {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar(this.tipoId,
                [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleccion.informacion }]);
        }
    }

    getPregunta() {
        return this.contenido;
    }

}

class Opcion {

    elemento: HTMLElement;
    pregunta: Pregunta;
    informacion: string;
    valor: Array<ResultadoA>;

    constructor(pregunta: Pregunta, valor: Array<ResultadoA>) {
        this.pregunta = pregunta;
        this.elemento = document.createElement('label');
        this.informacion = "";
        this.valor = valor;

        this.elemento.addEventListener("click", () => {
            if (this.pregunta.seleccion != null) {
                this.pregunta.seleccion.elemento.classList.remove("seleccion");
            }
            this.pregunta.seleccion = this;
            this.elemento.classList.add("seleccion");
        });
    }

    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }

    getElemento() {
        return this.elemento;
    }

    

}

class PreguntaA extends Pregunta {

    opciones: Array<OpcionA>;
    formulario: HTMLElement;
    seleccion?: OpcionA;

    constructor(informacion: string) {
        super(informacion);
        this.opciones = new Array();
        this.elemento.className = "pregunta";

        let div_seccionA = document.createElement('section');
        let div_seccionA_h1 = document.createElement('h2');
        let div_seccionB = document.createElement('section');
        this.formulario = document.createElement('form');
        this.formulario.className = "formulario_opciones";
        this.formulario.onsubmit = function () { return false };

        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";

        div_seccionA_h1.innerHTML = this.informacion;

        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);

        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));


        div_seccionB.appendChild(this.formulario);
    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionA(this, info, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
    }

    

}

class OpcionA extends Opcion {

    constructor(pregunta: Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);
        this.elemento.className = "opcion";
        this.elemento.innerHTML = `
        <div class="opcion__check">
            <input class="marcador__input" type="radio" name="opcion"></input><span class="marcador"></span>
        </div>
        <div class="informacion">${info}</div>`;
        this.valor = valor;
        this.informacion = info;
    }

}



class PreguntaB extends Pregunta {

    opciones: Array<OpcionB>;
    validacion?: Function;
    formulario: HTMLElement;

    constructor(informacion: string) {
        super(informacion);
        this.opciones = new Array();
        this.elemento.className = "pregunta";

        let div_seccionA = document.createElement('section');
        let div_seccionA_h1 = document.createElement('h2');
        let div_seccionB = document.createElement('section');
        this.formulario = document.createElement('form');
        this.formulario.onsubmit = function () { return false };

        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";

        div_seccionA_h1.innerHTML = this.informacion;

        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);

        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));
        div_seccionB.appendChild(this.formulario);
    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionB(this, info, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionB extends Opcion {

    validado: boolean;

    constructor(pregunta: Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);
        this.elemento.className = "opcionB";
        this.validado = false;
        this.valor = valor;
        this.elemento.innerHTML = info;
        this.informacion = info;
    }

}

/*
    Inicio de la pregunta C

*/

class PreguntaC extends Pregunta {

    opciones: Array<OpcionC>;
    validacion?: Function;
    private div_seccionB: HTMLElement;

    constructor(informacion: string) {
        super(informacion);

        this.elemento.className = "pantalla pregunta";
        this.opciones = new Array();

        let div_seccionA = document.createElement('section');
        let div_seccionA_h1 = document.createElement('h2');
        this.div_seccionB = document.createElement('section');
        let formulario = document.createElement('div');

        div_seccionA.className = "pregunta__titulo";
        this.div_seccionB.className = "pregunta__opciones";

        div_seccionA_h1.innerHTML = this.informacion;

        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(this.div_seccionB);

        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));

    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let p = new OpcionC(this, info, valor);
        this.div_seccionB.appendChild(p.areaTexto);
        this.opciones.push(p);
    }

    getPregunta() {
        return this.contenido;
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionC extends Opcion {

    areaTexto: HTMLTextAreaElement;

    constructor(pregunta: Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);
        this.elemento.className = "opcionC";
        this.areaTexto = document.createElement("textarea");
        this.areaTexto.className = "pregunta__parrafo";
        this.areaTexto.spellcheck = false;
        this.informacion = info;
        this.areaTexto.placeholder = "Escribe tu respuesta";

        this.areaTexto.innerText = info;
        this.elemento.append(this.areaTexto);
    }

}

/* Escala de linker
*/

class PreguntaD extends Pregunta {

    validacion?: Function;
    formulario: HTMLElement;
    progreso: HTMLProgressElement;
    input: HTMLInputElement;
    opciones: Array<OpcionD>;

    constructor(informacion: string, p?: string, m?: string) {
        super(informacion);
        this.opciones = new Array();
        this.elemento.className = "pregunta";

        let div_seccionA = document.createElement('section');
        let div_seccionA_h1 = document.createElement('h2');
        let div_seccionB = document.createElement('section');

        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";

        div_seccionA_h1.innerHTML = this.informacion;

        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);

        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));

        //Configuracion de la barra de linker
        let linker = document.createElement('div');
        linker.className = "likert_escala";

        let poco = document.createElement("label");
        poco.className = "likert_label";

        if (p != null) {
            poco.innerText = p;
        } else {
            poco.innerText = "Poco";
        }

        this.formulario = document.createElement("div");
        this.formulario.className = "likert__opciones";
        this.formulario.style.position = " relative";

        this.progreso = document.createElement("progress");
        this.progreso.max = this.opciones.length - 1;


        this.input = document.createElement("input");
        this.input.className = "likert";
        this.input.type = "range";
        this.input.min = "1";


        this.progreso.value = parseInt(this.input.value) - 1;

        this.input.addEventListener("input", (e) => {
            let v = parseInt(this.input.value)
            this.progreso.value = v - 1;

            if (this.seleccion != null) {
                this.seleccion.elemento.classList.remove("seleccion");
            }
            this.seleccion = this.opciones[v-1];
            this.seleccion.elemento.classList.add("seleccion");
        });


        let mucho = document.createElement("label");
        mucho.className = "likert_label";
        mucho.innerText = "Mucho";

        if (m != null) {
            mucho.innerText = m;
        } else {
            mucho.innerText = "Mucho";
        }
        
        
        
        let linker__barra = document.createElement('div');
        linker__barra.className = "likert__barra";
        linker__barra.append(this.progreso, this.input);
        
        let linker__lateral = document.createElement('div');
        linker__lateral.className = "likert__lateral";
        linker__lateral.append(poco, linker__barra, mucho);
        
        
        
        linker.append(linker__lateral, this.formulario);
        


        div_seccionB.appendChild(linker);

    }

    agregar(informacion: string, valor: Array<ResultadoA>) {
        let p = new OpcionD(this, informacion, valor);
        this.opciones.push(p);
        this.formulario.append(p.getElemento());
        this.progreso.max = this.opciones.length - 1;
        this.input.max = this.opciones.length + "";

        let resul = this.opciones.length / 2;
        if (resul % 2 == 0) {
            this.input.value = ((this.opciones.length) / 2) + "";
            this.progreso.value = (((this.opciones.length) / 2) - 1);
        } else {
            this.input.value = ((this.opciones.length + 1) / 2) + "";
            this.progreso.value = (((this.opciones.length + 1) / 2) - 1);
        }

        let v = parseInt(this.input.value)
        this.progreso.value = v - 1;
      
        
        if (this.seleccion != null) {
            this.seleccion.elemento.classList.remove("seleccion");
        }
        this.seleccion = this.opciones[v-1];
        this.seleccion.elemento.classList.add("seleccion");
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionD extends Opcion {

    valor: Array<ResultadoA>;

    constructor(pregunta: Pregunta, informacion: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);

        this.informacion = informacion;
        this.elemento = document.createElement("label");
        this.elemento.className = "likert_valores";
        this.elemento.innerText = this.informacion;
        this.valor = valor;

    }

}



class PreguntaI extends Pregunta {

    opciones: Array<OpcionI>;
    formulario: HTMLFormElement;
    seleecion?: OpcionI;

    constructor(informacion: string) {
        super(informacion);
        this.opciones = new Array();
        this.elemento.className = "pregunta pimagen";

        let contenedor = document.createElement("div");
        contenedor.className = "pregunta__contenedor";

        this.elemento.appendChild(contenedor);

        let div_seccionA = document.createElement('div');
        div_seccionA.className = "pregunta__titulo";
        div_seccionA.innerHTML = informacion;

        let div_seccionC = document.createElement('section');
        div_seccionC.className = "pregunta__opciones";
        div_seccionC.style.width = "100%";


        this.formulario = document.createElement('form');
        this.formulario.className = "formulario__opciones__imagen";
        this.formulario.name = "f";
        this.formulario.method = "GET";
        this.formulario.onsubmit = function () { return false };

        contenedor.appendChild(div_seccionA);
        contenedor.append(div_seccionC);
        div_seccionC.append(this.formulario);

    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let elemento = new OpcionI(this, info, valor);
        this.formulario.append(elemento.getElemento());
        this.opciones.push(elemento);
    }

}


class OpcionI extends Opcion {

    valor: Array<ResultadoA>;

    informacion: string;

    constructor(pregunta: Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);

        this.informacion = info;
        this.elemento.className = "opcion";
        this.elemento.innerHTML = `
        <div class="opcion__check">
            <input class="marcador__input" type="radio" name="opcion"></input><span class="marcador"></span>
        </div>
        <div class="informacion">${info}</div>`;

        this.valor = valor;
    }

}

class PreguntaS extends Pregunta {

    texto: HTMLElement;
    lista: HTMLElement;
    opciones: Array<OpcionS>;

    constructor() {
        super();
        this.opciones = new Array();
        this.texto = document.createElement("p");
        this.texto.innerText = "___";
        this.texto.style.textAlign = "center";

        this.elemento.style.display = "inline-block";
        this.elemento.className = "elegir__resultado";
        this.elemento.append(this.texto);

        this.lista = document.createElement('span');
        this.lista.className = "elegir__lista";

        this.elemento.append(this.lista);

        this.elemento.addEventListener("click", () => {

            if (this.lista.style.display == "") {
                this.lista.style.display = "flex";
            }

            else if (this.lista.style.display == "flex") {
                this.lista.style.display = "none";

            } else {
                this.lista.style.display = "flex";

            }

        });
    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let o = new OpcionS(this, info, valor);
        this.opciones.push(o);
        this.lista.append(o.elemento);
    }

}

class OpcionS extends Opcion {

    constructor(pregunta: PreguntaS, info: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);
        let con_temp = document.createElement('span');
        this.elemento.append(con_temp);
        this.elemento.className = "elegir__opcion";
        this.elemento.innerText = info;
        this.valor = valor;

        this.informacion = info;

        this.elemento.addEventListener("click", () => {
            if (this.pregunta.seleccion != null) {
                this.pregunta.seleccion.elemento.classList.remove("seleccion");
            }
            this.pregunta.seleccion = this;
            this.elemento.classList.add("seleccion");

            let ptem = <PreguntaS>(this.pregunta);
            ptem.texto.innerHTML = this.elemento.innerText;
        });


    }
}


class PreguntaR extends Pregunta {

    opciones: Array<OpcionR>;
    validacion?: Function;
    preguntaHTML: HTMLElement;
    opcionesHTML: HTMLElement;

    constructor(informacion: string) {
        super(informacion);
        this.opciones = new Array();
        this.elemento.className = "instruccion";

        this.preguntaHTML = document.createElement('div');
        this.preguntaHTML.innerHTML = informacion;
        this.opcionesHTML = document.createElement('div');

        this.preguntaHTML.className = "instruccion__pregunta";
        this.opcionesHTML.className = "instruccion__opciones";

        this.elemento.append(this.preguntaHTML);
        this.elemento.append(this.opcionesHTML);
    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionR(this, info, valor)
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
    }

    validar() {

        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar("pregunta",
                [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleccion.informacion }]);
        }

    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionR extends Opcion {

    constructor(pregunta: Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);
        this.informacion = info;
        this.elemento.innerHTML = info;
    }

}


class PreguntaP extends Pregunta {

    opciones: Array<OpcionP>;
    validacion?: Function;
    preguntaHTML: HTMLElement;
    preguntaText: HTMLElement;
    opcionesHTML: HTMLElement;


    constructor(imagen: string, informacion: string) {
        super(informacion);
        this.opciones = new Array();

        this.elemento.className = "preguntaImagen";

        this.preguntaHTML = document.createElement('div');
        this.preguntaHTML.className = "preguntaImagen__imagen";
        this.preguntaHTML.innerHTML = imagen;

        this.opcionesHTML = document.createElement('div');

        this.preguntaText = document.createElement('div');
        this.preguntaText.innerHTML = informacion;
        this.preguntaText.className = "preguntaImagen__pregunta";

        let cont_temp = document.createElement('div');
        cont_temp.className = "preguntaImagen__info";

        this.opcionesHTML.className = "preguntaImagen__opciones";

        this.elemento.append(this.preguntaHTML);
        cont_temp.appendChild(this.preguntaText);
        cont_temp.appendChild(this.opcionesHTML);
        this.elemento.appendChild(cont_temp);


    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionP(this, info, valor)
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
    }

    agregarB(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionPB(this, info, valor)
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
    }



    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionP extends Opcion {

    constructor(pregunta: Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);
        this.informacion = info;
        this.elemento.className = "opcion__boton";
        this.elemento.innerHTML = info;
    }
}

class OpcionPB extends Opcion {

    constructor(pregunta: Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);

        this.informacion = info;
        this.elemento.className = "opcion";
        this.elemento.innerHTML = `
        <div class="opcion__check">
            <input class="marcador__input" type="radio" name="opcion"></input><span class="marcador"></span>
        </div>
        <div class="informacion">${info}</div>`;
    }

}