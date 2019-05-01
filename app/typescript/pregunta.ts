interface ResultadoA {
    area: string;
    valor: number;
}

class Pregunta {

    elemento: HTMLElement;
    informacion: string;
    seleccion?: Opcion;

    constructor(informacion?: string) {

        if(informacion == null){
            this.informacion = "";
        }else{
            this.informacion = informacion;
        }
        this.elemento = document.createElement('div');
    }

    incluirEn(lugar: string) {
        let e: HTMLElement = <HTMLElement>document.querySelector(lugar);
        e.append(this.elemento);
    }

    getElemento() {
        return this.elemento;
    }

    agregarClases(clase: string) {
        this.elemento.classList.add(clase);
    }

    removerClases(clase: string) {
        this.elemento.classList.remove(clase);
    }

    registro() {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar("pregunta",
                [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleccion.informacion }]);
        }
    }

}

class Opcion {

    elemento: HTMLElement;
    pregunta: Pregunta;
    informacion:string;

    constructor(pregunta: Pregunta) {
        this.pregunta = pregunta;
        this.elemento = document.createElement('label');
        this.informacion = "";
        
        console.log("clicks");
        this.elemento.addEventListener("click", () => {
            console.log("clicks");
            if (this.pregunta.seleccion != null) {
                this.pregunta.seleccion.elemento.classList.remove("seleccion");
            }
            this.pregunta.seleccion = this;
            this.elemento.classList.add("seleccion");
        });
    }

    validacion(){

    }

    getElemento() {
        return this.elemento;
    }

}

class PreguntaA extends Pregunta {

    opciones: Array<OpcionA>;
    formulario: HTMLElement;
    contenido: Contenido;
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
        this.contenido = new Contenido(this.getElemento(), this);
    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionA(this, info, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
    }

    validar() {
        if (this.seleccion != null) {
            this.seleccion.validacion();
            resultados.agregar("pregunta",
                [{ id: "pregunta", valor: this.elemento.innerText },
                { id: "respuesta", valor: this.seleccion.elemento.innerText }]);
        }
    }

    getPregunta() {
        return this.contenido;
    }



}

class OpcionA extends Opcion {

    valor: Array<ResultadoA>;

    constructor(pregunta: Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta);
        this.elemento.className = "opcion vertical";
        this.elemento.innerHTML = `
        <div class="opcion__check">
            <input class="marcador__input" type="radio" name="opcion"></input><span class="marcador"></span>
        </div>
        <div class="informacion">${info}</div>`;
        this.valor = valor;


    }

    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }

}



class PreguntaB extends Pregunta {

    opciones: Array<OpcionB>;
    validacion?: Function;

    constructor(informacion: string, opciones: Array<OpcionB>) {
        super(informacion);
        this.opciones = opciones;
        this.elemento.className = "pregunta";

        let div_seccionA = document.createElement('section');
        let div_seccionA_h1 = document.createElement('h2');
        let div_seccionB = document.createElement('section');
        let formulario = document.createElement('div');

        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";

        div_seccionA_h1.innerHTML = this.informacion;

        this.elemento.appendChild(div_seccionA);
        this.elemento.appendChild(div_seccionB);

        div_seccionA.appendChild(div_seccionA_h1);
        div_seccionA.appendChild(document.createElement('hr'));


        opciones.forEach(o => {
            o.pregunta = this;
            formulario.appendChild(o.getElemento());
        });

        div_seccionB.appendChild(formulario);


    }

    validar() {
        this.opciones.forEach((o) => {
            if (o.validado) {
                o.validacion();
                resultados.agregar("pregunta",
                    [{ id: "pregunta", valor: this.elemento.innerText },
                    { id: "respuesta", valor: o.elemento.innerText }]);
            }
        });
    }


    reset() {
        this.opciones.forEach(o => {
            o.validado = false;
            o.elemento.classList.remove("opcion__select");
        });
    }


    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionB extends Opcion {

    valor: Array<ResultadoA>;
    validado: boolean;

    constructor(pregunta:Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta);
        this.elemento.className = "opcionB";
        this.validado = false;
        this.valor = valor;
        this.elemento.innerHTML = info;
    }

    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }
}

/*
    Inicio de la pregunta C

*/

class PreguntaC extends Pregunta {

    opciones: OpcionC;
    validacion?: Function;
    contenido: Contenido;

    constructor(informacion: string, opciones: OpcionC) {
        super(informacion);
        this.opciones = opciones;
        this.elemento.className = "pantalla pregunta";

        let div_seccionA = document.createElement('section');
        let div_seccionA_h1 = document.createElement('h2');
        let div_seccionB = document.createElement('section');
        let formulario = document.createElement('div');

        div_seccionA.className = "pregunta__titulo";
        div_seccionB.className = "pregunta__opciones";

        div_seccionA_h1.innerHTML = this.informacion;

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

        this.contenido = new Contenido(this.getElemento(), this);
    }

    validar() {
        resultados.agregar("pregunta",
            [{ id: "pregunta", valor: this.informacion },
            { id: "respuesta", valor: this.opciones.areaTexto.value }]);
    }


    reset() {
        /* this.opciones.forEach(o => {
             o.validado = false;
             o.opcion.classList.remove("opcion__select");
         });*/
    }

    getPregunta() {
        return this.contenido;
    }



    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionC extends Opcion {

    valor: Array<ResultadoA>;
    validado: boolean;
    areaTexto: HTMLTextAreaElement;

    constructor(pregunta:Pregunta, info?: string, valor?: Array<ResultadoA>) {
        super(pregunta);
        if (valor != null) {
            this.valor = valor;
        } else {
            this.valor = new Array();
        }
        this.elemento.className = "opcionC";
        this.areaTexto = document.createElement("textarea");
        this.areaTexto.className = "pregunta__parrafo";
        this.areaTexto.spellcheck = false;
        // this.areaTexto.type = "text";
        this.areaTexto.placeholder = "Escribe tu respuesta";
        if (info != null) {
            this.areaTexto.innerText = info;
        }

        this.elemento.append(this.areaTexto);
        this.validado = false;
    }

    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }

}

/* Escala de linker
*/

class PreguntaD extends Pregunta {

    opciones: OpcionD;
    validacion?: Function;
    contenido: Contenido;

    constructor(informacion: string, valor: Array<ResultadoA>, p?: string, m?: string) {
        super(informacion);

        this.opciones = new OpcionD(this, valor, p, m);
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

        div_seccionB.appendChild(this.opciones.elemento);
        this.contenido = new Contenido(this.getElemento(), this);
    }

    validar() {
        this.opciones.validacion();
        resultados.agregar("pregunta",
            [{ id: "pregunta", valor: this.informacion },
            { id: "respuesta", valor: this.opciones.input.value }]);
    }

    getPregunta() {
        return this.contenido;
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionD extends Opcion {

    valor: Array<ResultadoA>;
    validado: boolean;
    progreso: HTMLProgressElement;
    input: HTMLInputElement;

    constructor(pregunta:Pregunta, valor: Array<ResultadoA>, p?: string, m?: string) {
        super(pregunta);
        this.elemento.className = "likert_escala";

        let poco = document.createElement("label");
        poco.className = "likert_label";

        if (p != null) {
            poco.innerText = p;
        } else {
            poco.innerText = "Poco";
        }



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

        if (m != null) {
            mucho.innerText = m;
        } else {
            mucho.innerText = "Mucho";
        }

        linker.append(this.progreso, this.input, label1, label2, label3);

        this.elemento.append(poco, linker, mucho);

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

}



class PreguntaI extends Pregunta {

    opciones: Array<OpcionI>;
    formulario: HTMLFormElement;
    contenido: Contenido;
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
        console.log(this.getElemento())
        this.contenido = new Contenido(this.getElemento(), this);
    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let elemento = new OpcionI(this, info, valor);
        this.formulario.append(elemento.getElemento());
        this.opciones.push(elemento);
    }

    validar() {
        if (this.seleecion != null) {
            this.seleecion.validacion();
            resultados.agregar("pregunta",
                [{ id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleecion.elemento.innerText }]);
        }
    }

    getPregunta() {
        return this.contenido;
    }

}


class OpcionI extends Opcion {

    valor: Array<ResultadoA>;
 
    informacion: string;

    constructor(pregunta:Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta);
      
        this.informacion = info;
        this.elemento.className = "opcion";
        this.elemento.innerHTML = `
        <div class="opcion__check">
            <input class="marcador__input" type="radio" name="opcion"></input><span class="marcador"></span>
        </div>
        <div class="informacion">${info}</div>`;

        this.valor = valor;
    }

    validacion() {

        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }

}

interface FOpcionS {
    id: string;
    valor: number;
}

class PreguntaS extends Pregunta{

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

    agregar(info: string, valor: number) {
        let o = new OpcionS(this, info, valor);
        this.opciones.push(o);
        this.lista.append(o.elemento);
    }

}

class OpcionS extends Opcion {

    valor: number;

    constructor(pregunta:PreguntaS, info: string, valor: number) {
        super(pregunta);
        let con_temp = document.createElement('span');
        this.elemento.append(con_temp);
        this.elemento.className = "elegir__opcion";
        this.elemento.innerText = info;
        this.valor = valor;

        this.elemento.addEventListener("click", () => {
            this.pregunta.seleccion = this;
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

class OpcionR extends Opcion{
  
    valor: Array<ResultadoA>;
    informacion: string;

    constructor(pregunta:Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta);
        this.informacion = info;
        this.valor = valor;
        this.elemento.innerHTML = info;

    }



    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
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

    

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionP extends Opcion{

    valor: Array<ResultadoA>;

    constructor(pregunta:Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta);
        this.informacion = info;
        this.elemento.className = "opcion__boton";
        this.valor = valor;
        this.elemento.innerHTML = info;
    }



    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }
}