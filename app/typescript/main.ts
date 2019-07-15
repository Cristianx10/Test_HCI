/*--------------------------------------------------------------
## Funciones Matematicas
--------------------------------------------------------------*/

// Convierte de grados a radianes
function radians(degrees: number) {
    return degrees * Math.PI / 180;
};

// Convierte de radianes a grados
function degrees(radians: number) {
    return radians * 180 / Math.PI;
};

// Desordena una lista de elementos o que este en un objeto de tipo Array
function shuffle(array: any) {
    array.sort(function () { return Math.random() - 0.5; });
}

// Crea un numero ramdon entre un minimo y un maximo 
function random(minimo: number, maximo: number) {
    return Math.round(Math.random() * (maximo - minimo) + minimo);
}

//Convierte un color en HSV to RGB
function hsvToRgb(h: any, s: any, v: any) {
    var r, g, b;
    var i;
    var f, p, q, t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if (s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}

/*--------------------------------------------------------------
## Interfaz validable

# Asegura que cada clase debe pasar resultados o tener un registro
--------------------------------------------------------------*/

interface Validable {
    agregarResultados(): void;
    registro(): void;
}

/*--------------------------------------------------------------
## Clase Contenido

# Se encarga de la administración del contenido de forma individual
--------------------------------------------------------------*/

class Contenido {

   
    elementoHTML: HTMLElement; //Elemento html que contiene o esta ubicada la interaccion
    objeto: Validable; //Objeto que tiene la funcion de evaluar y ejecutar la actividad
    timer: Timer; //Tiempo definido para la actividad
    segundos?: number; //Tiempo inicial que se da para dar comienzo a la actividad
    tiempoDefinido: boolean; //Valida si la pantalla tiene un tiempo definido
    accion?: Function; //Es la primera acción que ocurre al comenzar la actividad

    constructor(elementoHTML: HTMLElement, objeto: Validable, segundos?: number) {
        this.elementoHTML = elementoHTML;
        this.objeto = objeto;
        this.timer = new Timer();
        this.tiempoDefinido = false;

        if (segundos != null) {
            this.segundos = segundos;
        }

        this.setAccionFinal(() => {
            objeto.agregarResultados();
            objeto.registro();
        });
    }

    //Inicia la actividad y si posee tiempo lo comenzara a contabilizar
    start() {
        if (this.accion != null) {
            this.accion(this.objeto);
        }

        if (this.segundos != null) {
            this.timer.startTempo(this.segundos);
        }

    }

    //Muestra el contenido en el caso de que este oculto
    mostrar() {
        this.elementoHTML.style.display = "flex";
    }

    //Oculta el contenido que contiene la actividad
    ocultar() {
        this.elementoHTML.style.display = "none";
    }

    //Define un tiempo en caso de que no halla sido inicializado
    tiempo(segundos?: number) {
        this.segundos = segundos;
    }

    setProgreso(progreso: Function) {
        this.timer.setProgreso(progreso);
    }

    setAccion(accion: Function) {
        this.accion = accion;
        return this;
    }

    setTermino(termino: Function) {
        this.timer.termino = termino;
        return this;
    }

    setAccionFinal(accionFinal: Function) {
        this.timer.accionFinal = accionFinal;
    }

    getElementoHTML() {
        return this.elementoHTML;
    }

    agregarResultados() {
        this.objeto.agregarResultados();
    }

    getObjeto() {
        return this.objeto;
    }

    //Obtiene los segundos usados en la actividad
    getSegundos() {
        return this.timer.getTiempo();
    }

}

/*--------------------------------------------------------------
## Contenedor de cada pantalla que visualiza actividades
--------------------------------------------------------------*/

class Contenedor {

    elementos: Array<Contenido>;

    constructor() {
        this.elementos = new Array();
    }

    agregarAll(elemetos: Array<Contenido>, tiempo?: number) {

        elemetos.forEach((elemento) => {
            if (tiempo != null) {
                elemento.tiempo(tiempo);
                elemento.ocultar();
            }
            this.elementos.push(elemento)
        });
    }

    agregar(elemeto: Contenido, tiempo?: number) {
        if (tiempo != null) {
            elemeto.tiempo(tiempo);
        }
        elemeto.ocultar();
        this.elementos.push(elemeto)

        return elemeto;
    }

    agregarHTML(elemeto: HTMLElement, tiempo?: number) {
        let e = new PantallaHTML(elemeto);
        if (tiempo != null) {
            let contenido = new Contenido(elemeto, e, tiempo);
            contenido.ocultar();
            this.elementos.push(contenido);
            return contenido;
        } else {
            let contenido = new Contenido(elemeto, e);
            contenido.ocultar();
            this.elementos.push(contenido);
            return contenido;
        }
    }

    agregarHTMLAll(elemetos: Array<HTMLElement>, tiempo?: number) {

        if (tiempo != null) {
            elemetos.forEach((elemento) => {
                let pantalla = new PantallaHTML(elemento);
                let contenido = new Contenido(elemento, pantalla, tiempo);
                contenido.ocultar();
                this.elementos.push(contenido);
            });
        } else {
            elemetos.forEach((elemento) => {
                let pantalla = new PantallaHTML(elemento);
                let contenido = new Contenido(elemento, pantalla);
                contenido.ocultar();
                this.elementos.push(contenido);
            });
        }
    }

    incluirEn(elemento: HTMLElement) {
        this.elementos.forEach(e => {
            elemento.append(e.elementoHTML);
        });
    }

    getHTMLIndex(index: number) {
        let ElementoHTML: Object = this.elementos[index].getElementoHTML();
        return ElementoHTML;
    }

    getObjectIndex(index: number) {
        let ElementoHTML: Object = this.elementos[index].getObjeto();
        return ElementoHTML;
    }

    getElementosHTML(): Array<HTMLElement> {
        let elementosHTML: Array<HTMLElement> = new Array();
        this.elementos.forEach((e) => {
            elementosHTML.push(e.getElementoHTML());
        });
        return elementosHTML;
    }

}

/*--------------------------------------------------------------
## Navegacion de la pagina
--------------------------------------------------------------*/

class Navegable {

    contenedor: Contenedor;
    actual: number;
    progreso: Progress;
    tiempo: HTMLElement;
    avance: HTMLElement;
    progress: HTMLElement;
    inicio?: Function;
    final?: Function;
    ti: HTMLElement;
    av: HTMLElement;
    permitir = false;
    permitirAll = false;
    fcambioTiempo?: Function;
    iniciado = false;

    constructor(elementos: Contenedor) {
        this.contenedor = elementos;
        this.progreso = new Progress(elementos.elementos.length, 0);
        this.actual = 0;

        createjs.Sound.registerSound("/audios/siguiente.mp3", "seguir");

        this.tiempo = document.createElement('div');
        this.tiempo.className = "nav_tiempo"
        let c = document.createElement('div');
        c.className = "conteo";

        let c_ima = document.createElement('img');
        c_ima.className = "conteo__reloj";
        c_ima.src = "/img/relog.png";

        this.tiempo.append(c);

        this.ti = document.createElement('p');
        this.ti.className = "conteo__p";
        this.ti.innerText = "00:00";

        c.append(c_ima, this.ti);

        this.avance = document.createElement('div');
        this.avance.className = "nav_avance";

        let a = document.createElement('div');
        a.className = "avance";

        this.av = document.createElement('p');
        this.av.className = "avance__p";

        this.avance.append(a);
        a.append(this.av);

        this.progress = document.createElement('div');
        this.progress.append(this.progreso.getElemento());

    }

    iniciar() {
        if (this.iniciado == false) {

            this.contenedor.elementos.forEach(e => {
                e.setTermino(() => {
                    if (e == this.actualPantalla() && this.actualPantalla().tiempoDefinido == false) {
                        this.permitir = true;

                        this.siguiente();
                        this.permitir = false;

                    }
                });

                e.setProgreso((m: number, s: number) => {
                    if (e == this.actualPantalla()) {
                        if (this.fcambioTiempo != null) {
                            this.fcambioTiempo(m, s);
                        }
                        if (s < 10 && s < 60 && s > -1 && m < 59) {
                            this.ti.innerText = "0" + m + ":0" + s;
                        } else {
                            this.ti.innerText = "0" + m + ":" + s;
                        }
                    }
                });
            });

            this.av.innerText = this.actual + 1 + "/" + this.contenedor.elementos.length;

            this.progreso.setTotal(this.contenedor.elementos.length);
            this.contenedor.getElementosHTML().forEach((s, i) => {
                if (i == 0) {
                    s.style.display = "flex";
                } else {
                    s.style.display = "none";
                }
            });


            this.actualPantalla().start();
            this.iniciado = true;
        }

    }

    cambioTiempo(cambio: Function) {
        this.fcambioTiempo = cambio;
    }

    getTiempoHTML() {
        return this.tiempo;
    }

    getAvanceHTML() {
        return this.avance;
    }

    ocultarProgreso() {
        this.progress.style.display = "none";
    }

    ocultarTiempo() {
        this.tiempo.style.display = "none";
    }

    ocultarAvance() {
        this.avance.style.display = "none";
    }

    colocarProgreso() {
        let bloque = <HTMLElement>document.querySelector(".principal");
        bloque.append(this.progress);
        this.progress.style.position = "absolute";
        this.progress.style.display = "block";
        this.progress.style.left = "-50px";
        this.progress.style.bottom = "10px";
    }

    colocarTiempo() {
        let bloque = <HTMLElement>document.querySelector(".principal");
        bloque.append(this.tiempo);
        this.tiempo.style.position = "absolute";
        this.tiempo.style.top = "20px";
        this.tiempo.style.right = "40px";
    }

    colocarAvance() {
        let bloque = <HTMLElement>document.querySelector(".principal");
        bloque.append(this.avance);
        this.avance.style.position = "absolute";
        this.avance.style.top = "20px";
        this.avance.style.left = "10px";
    }

    comenzar() {
        this.actualPantalla().start();
    }

    actualObjeto(): any {
        return this.contenedor.elementos[this.actual].getObjeto();
    }

    actualPantalla(): Contenido {
        return this.contenedor.elementos[this.actual];
    }

    actualPantallaHtml(): HTMLElement {
        return this.contenedor.elementos[this.actual].getElementoHTML();
    }

    asignarCondiciones(recorrer: Function) {
        this.contenedor.elementos.forEach(e => {
            recorrer(e.objeto);
        });
    }

    mostrar(seccion: HTMLElement) {
        seccion.style.display = "flex";
    }

    ocultar(seccion: HTMLElement) {
        seccion.style.display = "none";
    }

    setSiguiente(accion?: Function) {
        this.inicio = accion;
    }

    getActual() {
        return this.actual;
    }

    ocultarActual() {
        this.ocultar(this.actualPantallaHtml())
    }

    setFinal(final?: Function) {
        this.final = final;
    }

    setPermitir(permiso: boolean) {
        this.permitir = permiso;
    }
    setPermitirAll(permiso: boolean) {
        this.permitirAll = permiso;
    }

    siguiente() {

        if (this.permitir || this.permitirAll) {

            createjs.Sound.play("seguir");

            this.ocultar(this.actualPantallaHtml());

            if (this.actual < this.contenedor.elementos.length) {
                if (this.inicio != null) {
                    this.inicio(this.actualPantalla(), this.actual);
                }
                this.actualPantalla().tiempoDefinido = true;

                this.actualPantalla().timer.stop();

                if (this.actual + 1 < this.contenedor.elementos.length) {
                    this.actual++;
                    this.av.innerText = this.actual + 1 + "/" + this.contenedor.elementos.length;
                    this.progreso.actualizarPosicion(this.actual);
                    this.mostrar(this.actualPantallaHtml());
                    this.actualPantalla().start();

                } else {
                    this.progreso.actualizarPosicion(this.actual + 1);
                    if (this.final != null) {
                        this.final();
                    }
                }

            } else {
                this.progreso.actualizarPosicion(this.actual + 1);
                if (this.final != null) {
                    this.final();
                }
            }
        }
        this.permitir = false;
    }
}


/*--------------------------------------------------------------
## Pantalla HTML
*Convierte cualquier contenedor HTML en un contenido compatible con la clase Contenido para establecer tiempo y otras funcionalidades
--------------------------------------------------------------*/

class PantallaHTML implements Validable {

    elemento: HTMLElement;

    constructor(elemento: HTMLElement) {
        this.elemento = elemento;
    }

    agregarResultados(): void {

    }

    registro() {

    }

    getElemento() {
        return this.elemento;
    }
}

/*--------------------------------------------------------------
## Interaccion
*Se ocupa de las interacciones hechas en HTML que NO usan canvas
--------------------------------------------------------------*/

class Interaccion implements Validable {

    elemento: HTMLElement;

    puntos: number;
    aciertos: number;
    fallos: number;
    intentos: number;
    valido: boolean;

    validacion?: Function;
    intentoFallo?: Function;
    intentoAcierto?: Function;
    validar?: Function;

    tipoId: string;
    contenido: Contenido;

    constructor() {
        this.aciertos = 0;
        this.fallos = 0;
        this.intentos = 0;
        this.valido = true;
        this.puntos = 0;
        this.elemento = document.createElement('div');
        this.tipoId = "pregunta";
        this.contenido = new Contenido(this.elemento, this);
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }
    setIntentoFallo(intentoFallo: Function) {
        this.intentoFallo = intentoFallo;
    }

    setIntentoAcierto(intentoAcierto: Function) {
        this.intentoAcierto = intentoAcierto;
    }

    setValidar(validar: Function) {
        this.validar = validar;
    }

    incluirEn(ubicacion: string) {
        let u: HTMLElement = <HTMLElement>document.querySelector(ubicacion);
        u.append(this.elemento);
    }

    getElemento() {
        return this.elemento;
    }

    getActividad() {
        return this.contenido;
    }

    agregarResultados() {

        if (this.validar != null) {
            this.validar();
        }
    }

    registro() {

        resultados.agregar(this.tipoId, [
            { id: "aciertos", valor: this.aciertos + "" },
            { id: "fallos", valor: this.fallos + "" },
            { id: "intentos", valor: this.intentos + "" },
            { id: "puntuacion", valor: this.puntos + "" },
            { id: "validacion", valor: this.valido + "" },
            { id: "Tiempo usado (segundos)", valor: this.contenido.getSegundos() + "" }
        ]);
    }
}

/*--------------------------------------------------------------
## Interaccion
*Se ocupa de las interacciones hechas en HTML que usan canvas
--------------------------------------------------------------*/

class Actividad implements Validable {

    stage: createjs.Stage;
    contenedor: createjs.Container;
    canvas: HTMLCanvasElement;
    elemento: HTMLElement;

    aciertos: number;
    fallos: number;
    intentos: number;
    valido: boolean;

    validacion?: Function;
    intentoFallo?: Function;
    intentoAcierto?: Function;
    validar?: Function;

    tipoId: string;
    contenido: Contenido;


    constructor() {
        this.canvas = document.createElement("canvas");
        this.stage = new createjs.Stage(this.canvas);
        this.contenedor = new createjs.Container();
        this.stage.addChild(this.contenedor);
        this.elemento = document.createElement('div');
        this.elemento.append(this.canvas);
        this.aciertos = 0;
        this.fallos = 0;
        this.intentos = 0;
        this.valido = true;
        this.tipoId = "Interaccion";
        this.contenido = new Contenido(this.elemento, this);
    }

    update() {
        this.stage.update();
    }

    size(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    incluirEn(lugar: string) {
        let e: HTMLElement = <HTMLElement>document.querySelector(lugar);
        e.append(this.elemento);
        this.update();
    }

    setValidacion(validacion: Function) {
        this.validacion = validacion;
    }

    setIntentoFallo(intentoFallo: Function) {
        this.intentoFallo = intentoFallo;
    }

    setIntentoAcierto(intentoAcierto: Function) {
        this.intentoAcierto = intentoAcierto;
    }

    setValidar(validar: Function) {
        this.validar = validar;
    }

    getElemento(id?: string) {
        if (id != null) {
            this.elemento.id = id;
        }
        return this.elemento;
    }

    agregarResultados() {
        if (this.validar != null) {
            this.validar();
        }
    }

    registro() {

        resultados.agregar(this.tipoId, [
            { id: "aciertos", valor: this.aciertos + "" },
            { id: "fallos", valor: this.fallos + "" },
            { id: "intentos", valor: this.intentos + "" },
            { id: "validacion", valor: this.valido + "" },
        ]);
    }
}

/*--------------------------------------------------------------
## Interfaz Posicion

# Caracteriticas de un vector con coordenadas y un tamaño definido
--------------------------------------------------------------*/

interface Posicion {
    x: number;
    y: number;
    width: number;
    height: number;
}

/*--------------------------------------------------------------
## metodo crearMatrix

#crea un arreglo con posiciones (x, y) con un tamaño definido
--------------------------------------------------------------*/

function crearMatrix(columas_inicial: number, filas_inicial: number, width_inicial: number, height_inicial: number) {

    //Inicializacion de las variables
    let columnas_total = columas_inicial;
    let filas_total = filas_inicial;
    let width = width_inicial;
    let height = height_inicial;
    let columna = 0;
    let fila = 0;

    //Tamaño total del numero de bloques
    let length = columnas_total * filas_total;
    let arreglo: Array<Posicion> = new Array();

    //Distribucion de las posiciones
    for (let i = 0; i < length; i++) {

        //Asignacion de la coordenada en X
        let posx = columna * width;
        //Asignacion de la coordenada en Y
        let posy = fila;

        //Creación de un vector de posicion (x, y) con el Tamaño
        let pos = { x: posx, y: posy, width: width, height: height };

        //Se alamacena el vector creado
        arreglo.push(pos);

        //Asignacion de la secuecia
        columna++;
        //Reseteo de la secuencia cuando llega a los bordes
        if (columna == columnas_total) {
            columna = 0;
            fila += height;
        }
       
    }
    return arreglo;
}

/*--------------------------------------------------------------
## metodo matrixImagen

#A partir de una imagen puede dividirla en fragmentos de la misma en cuadrados de un tamaño definido
#Devuelve una arreglo de imagenes fragmentos de la original SIN coordenadas (x,y)
--------------------------------------------------------------*/

function matrixImagen(url: string, width: number, height: number, columnas: number, filas: number) {

    //Inicializacion de las variables
    let imagenes = new Array<HTMLElement>();
    let columna = 0;
    let fila = 0;
    let image = document.createElement("div");

    // Cargar la imagen base de la division
    image.style.backgroundImage = `url(${url})`;
    // Asignacion del tamaño de los fragmentos
    image.style.width = width + "px";
    image.style.height = height + "px";
    image.style.position = "absolute";

    //Tamaño total del numero de bloques
    let length = filas * columnas;

    //Creacion de los fragmentos
    for (let i = 0; i < length; i++) {

        //Creacion del contenedor base que contiene el fragmento
        let contenedor = document.createElement('div');
        contenedor.style.position = "relative";
        contenedor.style.width = (width + 1) + "px";
        contenedor.style.height = (height + 1) + "px";
        contenedor.style.overflow = "hidden";

        //Se clona el original para señalar uno mas especifico
        let fragmentoImg: HTMLElement = <HTMLElement>image.cloneNode();

        //Posicion del nuevo fragmento
        fragmentoImg.style.backgroundPositionX = -(columna * width) + "px";
        fragmentoImg.style.backgroundPositionY = fila + "px";

        contenedor.append(fragmentoImg);
        imagenes.push(contenedor);

        //Asignacion de la secuecia
        columna++;
        //Reseteo de la secuencia cuando llega a los bordes
        if (columna == columnas) {
            columna = 0;
            fila -= height;
        }
    }

    return imagenes;
}

/*--------------------------------------------------------------
## metodo matrixFija

#A partir de una imagen puede dividirla en fragmentos de la misma en cuadrados de un tamaño definido con posiciones definidas
#Devuelve una arreglo de imagenes fragmentos de la original CON coordenadas (x,y)
--------------------------------------------------------------*/

function matrixFija(url: string, width: number, height: number, columnas: number, filas: number) {
    let matrix = crearMatrix(columnas, filas, width, height);

    let imagenes = new Array<HTMLElement>();
    let columna = 0;
    let fila = 0;

    let image = document.createElement("div");
    // Cargar la imagen base de la division
    image.style.backgroundImage = `url(${url})`;

    image.style.width = width + "px";
    image.style.height = height + "px";
    image.style.position = "absolute";

    //Tamaño total del numero de bloques
    let length = filas * columnas;

    //Creacion de los fragmentos
    for (let i = 0; i < length; i++) {

        let contenedor = document.createElement('div');
        contenedor.style.position = "absolute";
        contenedor.style.overflow = "hidden";

        //Se clona el original para señalar uno mas especifico
        let fragmentoImg: HTMLElement = <HTMLElement>image.cloneNode();

        //Posicion del nuevo fragmento
        fragmentoImg.style.backgroundPositionX = -(columna * width) + "px";
        fragmentoImg.style.backgroundPositionY = fila + "px";

        //Posicion estatica del contenedor
        contenedor.style.left = matrix[i].x + "px";
        contenedor.style.top = matrix[i].y + "px";
        contenedor.style.width = matrix[i].width + "px";
        contenedor.style.height = matrix[i].height + "px";

        contenedor.append(fragmentoImg);
        imagenes.push(contenedor);

        //Asignacion de la secuecia
        columna++;
        //Reseteo de la secuencia cuando llega a los bordes
        if (columna == columnas) {
            columna = 0;
            fila -= height;
        }
    }

    return imagenes;
}






function loadJson(ruta: string, result: Function) {
    let valor;
    let carga = new createjs.LoadQueue();
    carga.loadFile(ruta);
    carga.on("fileload", (e: any) => {

        valor = e.result;
        result(valor);

    });

}

function toPantallas(pantallas: Array<HTMLElement>) {

    let contenido = [];
    for (let i = 0; i < pantallas.length; i++) {
        let p = pantallas[i];
        let o = new PantallaHTML(p);
        contenido.push(new Contenido(p, o));
    }

    return contenido;
}

/*--------------------------------------------------------------
## mostrar

*Revela objetos HTML que pueden estar ocultos, basta con tener un identificador o una clase del elemento
--------------------------------------------------------------*/
function mostrar(ubicacion: string) {
    let e: HTMLElement = <HTMLElement>document.querySelector(ubicacion);
    e.style.display = "flex";
}

/*--------------------------------------------------------------
## ocultar

*Oculta objetos HTML que pueden estar visibles, basta con tener un identificador o una clase del elemento
--------------------------------------------------------------*/

function ocultar(ubicacion: string) {
    let e: HTMLElement = <HTMLElement>document.querySelector(ubicacion);
    e.style.display = "none";
}

/*--------------------------------------------------------------
## Progress

*Crea una barra de progreso que tener un control del avance de las actividades
--------------------------------------------------------------*/

class Progress {
    contenedor: HTMLElement;
    progress: HTMLProgressElement;
    indice: HTMLElement;
    total: number;
    actual: number;

    constructor(total: number, inicial: number) {
        this.total = total;
        this.actual = inicial;
        this.contenedor = document.createElement('div');
        this.contenedor.className = "progreso";
        let con_contendor = document.createElement('div');
        con_contendor.className = "cont_progreso";
        this.progress = document.createElement('progress');
        this.progress.className = "progreso_barra";
        this.indice = document.createElement('div');
        this.indice.className = "progreso_numero";

        this.progress.value = inicial;
        this.progress.max = total;
        this.indice.innerText = inicial + "";

        this.contenedor.append(con_contendor);
        con_contendor.append(this.progress, this.indice);
        this.actualizarPosicion(this.actual);
    }

    setTotal(total: number) {
        this.total = total;
        this.progress.max = total;
    }

    actualizarPosicion(ini: number) {
        let maximo = 550;
        let actual = maximo * ini / this.total;
        this.indice.style.left = actual + "px";
        this.progress.value = ini;
        this.indice.innerText = ini + 1 + "";
        this.actual = ini;
    }

    getElemento() {
        return this.contenedor;
    }
}

function fondo(fondo: string) {
    let contenedor_fondo = <HTMLElement>document.querySelector(".cont-principal");
    contenedor_fondo.style.backgroundImage = "url('" + fondo + "')";
}

/*--------------------------------------------------------------
## irA

*Permite cargar un bloque html de otra actividad que este ubicada en un html distinto
*NOTA: Requiere de la libreria de Jquery.JS
--------------------------------------------------------------*/

function irA(url: string) {
    $(".principal").load(url);
}

/*--------------------------------------------------------------
## goTo

*Permite cargar un bloque html de otra actividad que este ubicada en un html distinto
*NOTA: Requiere de la libreria de Jquery.JS
--------------------------------------------------------------*/
function goTo(url: string) {
    if(url.indexOf(".html") == -1){
        window.location.href = url + ".html";
    }else{
        window.location.href = url;
    }
    
}

function askConfirmation(evt: any) {
    var msg = 'Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?';
    evt.returnValue = msg;
    return msg;
}




//window.addEventListener('beforeunload', askConfirmation);


/*

    validacion?:Function;
    intentoFallo?:Function;
    intentoAcierto?:Function;


setValidacion(validacion:Function){
      this.validacion = validacion;
    }
    setIntentoFallo(intentoFallo:Function){
      this.intentoFallo = intentoFallo;
    }

    setIntentoAcierto(intentoAcierto:Function){
      this.intentoAcierto = intentoAcierto;
    }



    //Implementacion
    con_tablero.getObjectIndex(nav.actual).setValidacion(()=>{

    });

    con_tablero.getObjectIndex(nav.actual).setIntentoAcierto(()=>{

    });

    con_tablero.getObjectIndex(nav.actual).setIntentoFallo(()=>{

    });



*/

interface ResultadoA {
    area: string;
    valor: number;
}

var resultados = new Resultados("resultados");


function cargar(name?: string) {
    
    if (name != null) {
        loadJson("/" + name, (result: any) => {
            let r = JSON.stringify(result);
            localStorage.setItem(resultados.id, r);
            location.reload();
        });
    } else {
        loadJson("/carga.json", (result: any) => {
            let r = JSON.stringify(result);
            localStorage.setItem(resultados.id, r);
            location.reload();
        });
    }
}






/*
this.pareja.tablero.intentos,this.pareja.tablero.aciertos,this.pareja.tablero.fallos, this.pareja.tablero.valido

*/
/*
resultados.agregarMaximo([{area:"matematicas", valor:50}, {area:"fuerza publica", valor:50}]);
resultados.agregarResultados([{area:"matematicas", valor:50}, {area:"fuerza publica", valor:50}]);

*/


/*
resultados.calcularMaximo([

    {id:"pregunta",valores:[{id:"Diseño",valor:10},{id:"Deportes",valor:5},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:50},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]},

    {id:"pregunta2",valores:[{id:"Diseño",valor:30},{id:"Deportes",valor:5},{id:"Ingenieria",valor:0},{id:"Salud",valor:10},{id:"Educacion",valor:10},{id:"Fuerza publica",valor:0},{id:"Arte",valor:10},{id:"Ciencia",valor:5}]}

]);*/


