class Pregunta implements Validable {

    elemento: HTMLElement;
    informacion: string;
    seleccion?: Opcion;
    tipoId: string;
    contenido: Contenido;
    valores: Array<Respuesta>;
    validacion?:Function;

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
        if (e == null) {
            alert("tu refenencia de " + lugar + " es nula");
        }
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

    agregarResultados() {
        if(this.validacion != null){
            this.validacion();
        }else{
            if (this.seleccion != null) {
                this.seleccion.validacion();
    
                resultados.calcularMaximo(this.valores);
            }
        }

        console.log("Validadndo")
    }

    setValidacion(validar:Function){
        this.validacion = validar;
    }

    registro() {
        if (this.seleccion != null) {
            resultados.agregar(this.tipoId, [
                { id: "pregunta", valor: this.informacion },
                { id: "respuesta", valor: this.seleccion.informacion },
                { id: "Tiempo usado (segundos)", valor: this.contenido.getSegundos() + "" }
            ]);
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
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
    private div_seccionB: HTMLElement;

    constructor(informacion: string) {
        super(informacion);
        this.tipoId = "P AreaTexto";
        this.elemento.className = "pregunta";
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
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
    }

    validarCon(original: string, acciones:Function) {
        let usuario = this.getTexto();
        let texto = new Texto_validar(original, usuario);

        let error_general = (texto.getErrores());

        //Da los errores de coincidencia exacta
        let error_coincidencia = (texto.getErroresStrict());

        //Da los errores de Mayusculas
        let error_mayuscula = (texto.getErroresMayusculas());

        //Da los errores de Puntuacion, solo "," y "."
        let error_puntuacion = (texto.getErroresPuntuacion());

        //Da los errores de palabras que faltaron
        let error_falto = (texto.getErroresFalto());

        acciones(error_general, error_coincidencia, error_mayuscula, error_puntuacion, error_falto);
    }

  

    placeholder(info: string) {
        this.opciones.forEach((o) => {
            o.areaTexto.placeholder = info;
        });
    }

    focus() {
        this.opciones.forEach((o) => {
            o.areaTexto.focus();
        });
    }

    getTexto() {
        let texto: string = "";
        this.opciones.forEach((o) => {
            texto = o.areaTexto.value;

        });

        return texto;
    }

    isEscritura(escritura: Function) {
        this.opciones.forEach((o) => {
            o.escribiendo(escritura);
        });
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

        this.areaTexto.addEventListener("click", () => {
            this.areaTexto.focus();
        });

    }

    placeholder(info: string) {
        this.areaTexto.placeholder = info;
    }

    escribiendo(escritura: Function) {
        this.areaTexto.addEventListener("keydown", () => {
            if (escritura != null) {
                escritura();
            }
        });
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
        this.tipoId = "Likert";
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
            this.seleccion = this.opciones[v - 1];
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
        this.seleccion = this.opciones[v - 1];
        this.seleccion.elemento.classList.add("seleccion");
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
        this.tipoId = "P Imagen"
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

        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
        this.tipoId = "P Seleccion";
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
        let opcion = new OpcionS(this, info, valor);
        this.opciones.push(opcion);
        this.lista.append(opcion.elemento);
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
    preguntaHTML: HTMLElement;
    opcionesHTML: HTMLElement;

    constructor(informacion: string) {
        super(informacion);
        this.tipoId = "P Instruccion";
        this.opciones = new Array();
        this.elemento.className = "instruccion";
        this.elemento.style.display = "flex";

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
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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
        this.tipoId = "P Imagen";

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
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
    }

    agregarB(info: string, valor: Array<ResultadoA>) {
        let opcion = new OpcionPB(this, info, valor)
        opcion.pregunta = this;
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
        this.valores.push({ id: this.tipoId, valores: opcion.valor });
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




/*-------------------------------------------------------------------------------------------*/

/*
    Comentarios abajo del archivo
*/

class Texto_palabra {

    palabra: string;
    validado: boolean;
    coincidencia: boolean;
    coincidencia_strict: boolean;
    coincidencia_mayus: boolean;
    puntuacion: boolean;
    tildes: boolean;

    constructor(palabra: string) {
        this.palabra = palabra;
        this.validado = false;
        this.coincidencia = false;
        this.coincidencia_strict = false;
        this.coincidencia_mayus = true;
        this.puntuacion = true;
        this.tildes = true;
    }
}

class Texto_validar {

    original: string;
    texto: string;
    palabras_texto: Array<Texto_palabra>;
    palabras_original: Array<Texto_palabra>;
    coincidencias: number;
    coincidencias_strict: number;
    coincidencias_mayusculas: number;
    erroresPuntuacion: number;
    erroresTildes: number;

    constructor(original: string, texto: string) {
        this.original = original.replace("  ", " ").replace("  ", " ");
        this.texto = texto.replace("  ", " ").replace("  ", " ");
        this.coincidencias = 0;
        this.coincidencias_strict = 0;
        this.coincidencias_mayusculas = 0;
        this.erroresPuntuacion = 0;
        this.erroresTildes = 0;

        this.palabras_original = new Array();
        this.palabras_texto = new Array();

        let palabras_o = this.original.split(" ");
        let palabras_t = this.texto.split(" ");

        palabras_o.forEach((p) => {
            this.palabras_original.push(new Texto_palabra(p));
        });

        palabras_t.forEach((p) => {
            this.palabras_texto.push(new Texto_palabra(p));
        });

        this.getCoincidencias();
        this.getCoincidenciasStrict();
        this.getErroresMayus();
    }

    private getCoincidencias() {

        for (let i = 0; i < this.palabras_texto.length; i++) {
            let p = this.palabras_texto[i];

            for (let j = 0; j < this.palabras_original.length; j++) {
                let o = this.palabras_original[j];

                if (o.coincidencia == false) {
                    let temp_p = p.palabra.replace(",", "").replace("Á", "A")
                        .replace("É", "E")
                        .replace("Í", "I")
                        .replace("Ó", "O")
                        .replace("Ú", "U")
                        .replace("á", "a")
                        .replace("é", "e")
                        .replace("í", "i")
                        .replace("ó", "o")
                        .replace("ú", "u");
                    let temp_o = o.palabra.replace(",", "").replace("Á", "A")
                        .replace("É", "E")
                        .replace("Í", "I")
                        .replace("Ó", "O")
                        .replace("Ú", "U")
                        .replace("á", "a")
                        .replace("é", "e")
                        .replace("í", "i")
                        .replace("ó", "o")
                        .replace("ú", "u");

                    temp_p = temp_p.replace(".", "");
                    temp_o = temp_o.replace(".", "");

                    if (temp_p.toLowerCase() == temp_o.toLowerCase()) {

                        o.coincidencia = true;
                        p.coincidencia = true;

                        if ((o.puntuacion && o.palabra.indexOf(",") != -1 && p.palabra.indexOf(",") == -1) ||
                            (o.puntuacion && o.palabra.indexOf(".") != -1 && p.palabra.indexOf(".") == -1)) {
                            p.puntuacion = false;
                            o.puntuacion = false;
                        }

                        j = this.palabras_original.length;
                    }
                }
            }
        }

        let puntos = 0;
        let coincidencia = 0;
        this.palabras_texto.forEach(p => {

            if (p.coincidencia) {
                coincidencia++;
            }

            if (p.puntuacion == false) {
                puntos++;
            }
        });

        this.erroresPuntuacion = puntos;
        this.coincidencias = coincidencia;

    }


    private getCoincidenciasStrict() {

        for (let i = 0; i < this.palabras_texto.length; i++) {
            let p = this.palabras_texto[i];

            for (let j = 0; j < this.palabras_original.length; j++) {
                let o = this.palabras_original[j];

                if (o.coincidencia_strict == false && p.palabra == o.palabra) {
                    o.coincidencia_strict = true;
                    p.coincidencia_strict = true;
                    j = this.palabras_original.length;

                }
            }
        }

        let coincidencia = 0;
        this.palabras_texto.forEach(p => {

            if (p.coincidencia_strict) {
                coincidencia++;
            }
        });

        this.coincidencias_strict = coincidencia;

    }

    private getErroresMayus() {
        for (let i = 0; i < this.palabras_texto.length; i++) {
            let p = this.palabras_texto[i];

            for (let j = 0; j < this.palabras_original.length; j++) {
                let o = this.palabras_original[j];

                let pa = p.palabra.replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u");

                let oa = o.palabra.replace("Á", "A")
                    .replace("É", "E")
                    .replace("Í", "I")
                    .replace("Ó", "O")
                    .replace("Ú", "U")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u");

                if (o.coincidencia_mayus && pa.toLowerCase() == oa.toLowerCase()) {

                    if (pa == oa) {
                        o.coincidencia_mayus = false;
                        p.coincidencia_mayus = false;
                        j = this.palabras_original.length;
                    }
                }
                if (o.tildes && pa.toLowerCase() == oa.toLowerCase()) {
                    if ((o.palabra.indexOf("Á") != -1 && p.palabra.indexOf("Á") == -1)
                        || (o.palabra.indexOf("É") != -1 && p.palabra.indexOf("É") == -1)
                        || (o.palabra.indexOf("Í") != -1 && p.palabra.indexOf("Í") == -1)
                        || (o.palabra.indexOf("Ó") != -1 && p.palabra.indexOf("Ó") == -1)
                        || (o.palabra.indexOf("Ú") != -1 && p.palabra.indexOf("Ú") == -1)
                        || (o.palabra.indexOf("á") != -1 && p.palabra.indexOf("á") == -1)
                        || (o.palabra.indexOf("é") != -1 && p.palabra.indexOf("é") == -1)
                        || (o.palabra.indexOf("í") != -1 && p.palabra.indexOf("í") == -1)
                        || (o.palabra.indexOf("ó") != -1 && p.palabra.indexOf("ó") == -1)
                        || (o.palabra.indexOf("ú") != -1 && p.palabra.indexOf("ú") == -1)
                    ) {
                        o.tildes = false;
                        p.tildes = false;
                    }
                }
            }
        }


        let erroresMayus = 0;
        let erroresTilde = 0;

        this.palabras_texto.forEach(p => {

            if (p.coincidencia_mayus) {
               
                erroresMayus++;
            }

            if (p.tildes == false) {
                erroresTilde++;
            }
        });
        this.erroresTildes = erroresTilde;
        this.coincidencias_mayusculas = erroresMayus;

    }

    getErrores() {
        return this.palabras_original.length - this.coincidencias;
    }

    getErroresStrict() {
        return this.palabras_original.length - this.coincidencias_strict;
    }

    getErroresTilde() {
        return this.erroresTildes;
    }

    getErroresMayusculas() {
        return this.coincidencias_mayusculas;
    }
    getErroresPuntuacion() {
        return this.erroresPuntuacion;
    }
    getErroresFalto() {
        return this.palabras_original.length - this.palabras_texto.length;
    }
}


//Aqui hay un ejemplo------------------------------------------------------------------------------------------------


/*
let original = "Mi cara es cuadrada.";
let usuario = "Mi Cara Es";



let texto = new Texto_validar(original, usuario);

//Da los errores sin tener encuenta mayusculas o puntuacion y las que faltaron
console.log(texto.getErrores());

//Da los errores de coincidencia exacta
console.log(texto.getErroresStrict());

//Da los errores de Mayusculas
console.log(texto.getErroresMayusculas());

//Da los errores de Puntuacion, solo "," y "."
console.log(texto.getErroresPuntuacion());

//Da los errores de palabras que faltaron
console.log(texto.getErroresFalto());

*/