<<<<<<< HEAD
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
=======
class Pregunta implements Validable{

    elemento: HTMLElement;
    informacion: string;
    seleccion?: Opcion;
    tipoId: string;
    contenido:Contenido;
    valores:Array<Respuesta>;

    constructor(informacion?: string) {

        if (informacion == null) {
            this.informacion = "";
        } else {
            this.informacion = informacion;
        }
        this.tipoId = "pregunta";
        this.valores = new Array();

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

    agregarResultados(){
        if(this.seleccion != null){
            this.seleccion.validacion();
            resultados.calcularMaximo(this.valores);
        }
    }

    registro() {
        if (this.seleccion != null) {
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
>>>>>>> master
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


<<<<<<< HEAD
        opciones.forEach(element => {

            formulario.appendChild(element.getElement());
        });
=======
        div_seccionB.appendChild(this.formulario);
    }
>>>>>>> master

    agregar(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionA(this, info, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
        this.valores.push({id:this.tipoId, valores:opcion.valor});
    }

    

<<<<<<< HEAD
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
=======
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
        this.valores.push({id:this.tipoId, valores:opcion.valor});
>>>>>>> master
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

<<<<<<< HEAD


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
=======
class OpcionB extends Opcion {

    validado: boolean;

    constructor(pregunta: Pregunta, info: string, valor: Array<ResultadoA>) {
        super(pregunta, valor);
        this.elemento.className = "opcionB";
        this.validado = false;
        this.valor = valor;
        this.elemento.innerHTML = info;
        this.informacion = info;
>>>>>>> master
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
        let opcion = new OpcionC(this, info, valor);
        this.div_seccionB.appendChild(opcion.areaTexto);
        this.opciones.push(opcion);
        this.valores.push({id:this.tipoId, valores:opcion.valor});
    }

    getPregunta() {
        return this.contenido;
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

<<<<<<< HEAD
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
=======
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
>>>>>>> master
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

<<<<<<< HEAD
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
        this.areaTexto.spellcheck = false;
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
=======
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
>>>>>>> master
        });
    }

<<<<<<< HEAD
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
=======

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
        let opcion = new OpcionD(this, informacion, valor);
        this.opciones.push(opcion);
        this.formulario.append(opcion.getElemento());
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
        this.valores.push({id:this.tipoId, valores:opcion.valor});
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
        let opcion = new OpcionI(this, info, valor);
        this.formulario.append(opcion.getElemento());
        this.opciones.push(opcion);
       
        this.valores.push({id:this.tipoId, valores:opcion.valor});
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

>>>>>>> master
            }

        });
    }

<<<<<<< HEAD

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
=======
    agregar(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionS(this, info, valor);
        this.opciones.push(opcion);
        this.lista.append(opcion.elemento);
        this.valores.push({id:this.tipoId, valores:opcion.valor});
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
>>>>>>> master
        });


    }
<<<<<<< HEAD

    getElement() {
        return this.opcion;
    }
}

interface FOpcionS{
    id:string;
    valor:number;
}

class PreguntaS{
    texto:HTMLElement;
    bloque:HTMLElement;
    lista:HTMLElement;
    opciones:Array<OpcionS>;
    seleccionActual?:OpcionS;

    constructor(){
        this.opciones = new Array();

        this.texto = document.createElement("p");
        this.texto.innerText = "___";
        this.texto.style.textAlign = "center";

        this.bloque = document.createElement('div');
        this.bloque.style.display = "inline-block";
        this.bloque.className = "elegir__resultado";
        this.bloque.append(this.texto);

        this.lista = document.createElement('span');
        this.lista.className = "elegir__lista";

        this.bloque.append(this.lista);

        this.bloque.addEventListener("click", ()=>{
            console.log(this.lista.style.display );
            if(this.lista.style.display == ""){
                this.lista.style.display = "flex";
                console.log("puso vacio")
            }
            
            else if(this.lista.style.display == "flex"){
                this.lista.style.display = "none";
                console.log("puso none")
            }else{
                this.lista.style.display = "flex";
                console.log("puso flex")
            }
            
        });
    }

    agregar(info:string, valor:number){
        let o = new OpcionS(info, valor, this)
        this.opciones.push(o);
        this.lista.append(o.elemento);
    }

    incluirEn(lugar:string){
        let e:HTMLElement = <HTMLElement>document.querySelector(lugar);
        e.append(this.bloque);
    }
}

class OpcionS{

    padre:PreguntaS;
    elemento:HTMLElement;
    valor:number;

    constructor(info:string, valor:number, padre:PreguntaS){
        this.padre = padre;
        this.elemento = document.createElement('span');
        this.elemento.className = "elegir__opcion";
        this.elemento.innerText = info;
        this.valor = valor;

        this.elemento.addEventListener("click", ()=>{
            this.padre.seleccionActual = this;
            this.padre.texto.innerHTML = this.elemento.innerText;
        });
    }
}


class PreguntaR {

    elemento: HTMLElement;
    pregunta: string;
    opciones: Array<OpcionR>;
    validacion?: Function;
    seleccion?:OpcionR;
    preguntaHTML:HTMLElement;
    opcionesHTML:HTMLElement;

    constructor(pregunta: string) {
        this.pregunta = pregunta;
        this.opciones = new Array();
        this.elemento = document.createElement('div');
        this.elemento.className = "instruccion";
     

        this.preguntaHTML = document.createElement('div');
        this.preguntaHTML.innerHTML = pregunta;
        this.opcionesHTML = document.createElement('div');

        this.preguntaHTML.className = "instruccion__pregunta";
        this.opcionesHTML.className = "instruccion__opciones";

        this.elemento.appendChild(this.preguntaHTML);
        this.elemento.appendChild(this.opcionesHTML);
    }

    agregar(info:string, valor: Array<ResultadoA>){
        let opcion = new OpcionR(info, valor)
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.opcion);
    }

    validar() {

        if(this.seleccion != null){
            this.seleccion.validacion();
            resultados.agregar("pregunta",
                    [{ id: "pregunta", valor: this.pregunta },
                    { id: "respuesta", valor: this.seleccion.informacion}]);
        }
    
    }

    incluirEn(lugar:string){
        let e:HTMLElement = <HTMLElement>document.querySelector(lugar);
        e.append(this.elemento);
    }

    getElemento() {
        return this.elemento;
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

class OpcionR {
    opcion: HTMLElement;
    valor: Array<ResultadoA>;
    pregunta?: PreguntaR;
    informacion:string;

    constructor(info: string, valor: Array<ResultadoA>) {
        this.informacion = info;
        this.opcion = document.createElement("div");
        this.valor = valor;
        this.opcion.innerHTML = info;

        this.opcion.addEventListener('click', () => {
            if (this.pregunta != null) {
                if(this.pregunta.seleccion != null){
                    this.pregunta.seleccion.opcion.classList.remove("seleccion");
                }
                this.pregunta.seleccion = this;
                this.opcion.classList.add("seleccion");
            }
        });
    }

    

    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }

    getElemento() {
        return this.opcion;
    }

}


class PreguntaP {

    elemento: HTMLElement;
    pregunta: string;
    opciones: Array<OpcionR>;
    validacion?: Function;
    seleccion?:OpcionR;
    preguntaHTML:HTMLElement;
    opcionesHTML:HTMLElement;

    constructor(pregunta: string) {
        this.pregunta = pregunta;
        this.opciones = new Array();
        this.elemento = document.createElement('div');
        this.elemento.className = "instruccion";
     

        this.preguntaHTML = document.createElement('div');
        this.preguntaHTML.innerHTML = pregunta;
=======
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
        this.elemento.style.display = "flex";
        
        this.preguntaHTML = document.createElement('div');
        this.preguntaHTML.innerHTML = informacion;
>>>>>>> master
        this.opcionesHTML = document.createElement('div');

        this.preguntaHTML.className = "instruccion__pregunta";
        this.opcionesHTML.className = "instruccion__opciones";

<<<<<<< HEAD
        this.elemento.appendChild(this.preguntaHTML);
        this.elemento.appendChild(this.opcionesHTML);
    }

    agregar(info:string, valor: Array<ResultadoA>){
        let opcion = new OpcionR(info, valor)
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.opcion);
    }

    validar() {

        if(this.seleccion != null){
            this.seleccion.validacion();
            resultados.agregar("pregunta",
                    [{ id: "pregunta", valor: this.pregunta },
                    { id: "respuesta", valor: this.seleccion.informacion}]);
        }
    
    }

    incluirEn(lugar:string){
        let e:HTMLElement = <HTMLElement>document.querySelector(lugar);
        e.append(this.elemento);
    }

    getElemento() {
        return this.elemento;
=======
        this.elemento.append(this.preguntaHTML);
        this.elemento.append(this.opcionesHTML);
    }

    agregar(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionR(this, info, valor)
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
        this.valores.push({id:this.tipoId, valores:opcion.valor});
>>>>>>> master
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

}

<<<<<<< HEAD
class OpcionP {
    opcion: HTMLElement;
    valor: Array<ResultadoA>;
    pregunta?: PreguntaR;
    informacion:string;

    constructor(info: string, valor: Array<ResultadoA>) {
        this.informacion = info;
        this.opcion = document.createElement("div");
        this.valor = valor;
        this.opcion.innerHTML = info;

        this.opcion.addEventListener('click', () => {
            if (this.pregunta != null) {
                if(this.pregunta.seleccion != null){
                    this.pregunta.seleccion.opcion.classList.remove("seleccion");
                }
                this.pregunta.seleccion = this;
                this.opcion.classList.add("seleccion");
            }
        });
    }

    

    validacion() {
        this.valor.forEach(v => {
            resultados.sumar(v.area, v.valor);
        });
    }

    getElemento() {
        return this.opcion;
=======
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
        this.valores.push({id:this.tipoId, valores:opcion.valor});
    }

    agregarB(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionPB(this, info, valor)
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
        this.valores.push({id:this.tipoId, valores:opcion.valor});
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
>>>>>>> master
    }

}