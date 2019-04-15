/*
    Comentarios abajo del archivo
*/

class Texto_palabra {

    palabra: string;
    validado: boolean;
    coincidencia: boolean;
    coincidencia_strict:boolean;
    coincidencia_mayus:boolean;
    puntuacion:boolean;

    constructor(palabra: string) {
        this.palabra = palabra;
        this.validado = false;
        this.coincidencia = false;
        this.coincidencia_strict = false;
        this.coincidencia_mayus = true;
        this.puntuacion = true;
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

    constructor(original: string, texto: string) {
        this.original = original.replace("  ", " ").replace("  ", " ");
        this.texto = texto.replace("  ", " ").replace("  ", " ");
        this.coincidencias = 0;
        this.coincidencias_strict = 0;
        this.coincidencias_mayusculas = 0;
        this.erroresPuntuacion = 0;

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
                    let temp_p = p.palabra.replace(",", "");
                    let temp_o = o.palabra.replace(",", "");

                    temp_p = temp_p.replace(".", "");
                    temp_o = temp_o.replace(".", "");

                    
                    if (temp_p.toLowerCase() == temp_o.toLowerCase()) {
                     
                        o.coincidencia = true;
                        p.coincidencia = true;

                        if ((o.puntuacion && o.palabra.indexOf(",") != -1 && p.palabra.indexOf(",") == -1)||
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

                
                if (o.coincidencia_mayus && p.palabra.toLowerCase() == o.palabra.toLowerCase()) {
                    //console.log("n: "  + this.palabras_texto.length);
                    if (p.palabra == o.palabra) {


                    } else {
                        o.coincidencia_mayus = false;
                        p.coincidencia_mayus = false;
               
                        j = this.palabras_original.length;
                    }
                }
            }
        }

        let erroresMayus = 0;
        
        this.palabras_texto.forEach(p => {
            
            if (p.coincidencia_mayus) {
                
            }else{
                erroresMayus++;
            }
        });
        
        this.coincidencias_mayusculas = erroresMayus;

    }

    getErrores() {
        return this.palabras_original.length - this.coincidencias;
    }

    getErroresStrict() {
        return this.palabras_original.length - this.coincidencias_strict;
    }

    getErroresMayusculas() {
        return this.coincidencias_mayusculas;
    }
    getErroresPuntuacion(){
        return this.erroresPuntuacion;
    }
    getErroresFalto(){
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