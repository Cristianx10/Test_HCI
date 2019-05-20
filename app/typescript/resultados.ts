interface RRegistro {
    id: string;
    pruebas: Array<RPruebaS>;
}

interface RPrueba {
    id: string;
    valor: number;
}

interface RPruebaS {
    id: string;
    valor: string;
}

interface Respuesta {
    id: string;
    valores: Array<ResultadoA>;
}
/*
interface RespuestaV {
    id: string;
    valor: number;
}
*/
class Resultados {

    categorias?: Array<ResultadoA>;
    pruebas?: Array<RRegistro>;
    maximos?: Array<ResultadoA>;
    id: string;


    constructor(id: string) {
        this.id = id;
        let reconozido = false;
        let val: any = localStorage.getItem(id);

        if (val) {
            let variables: Resultados = JSON.parse(val)
            this.categorias = variables.categorias;
            this.pruebas = variables.pruebas;
            this.maximos = variables.maximos;
            reconozido = true;
        }

        if (reconozido == false) {
            this.categorias = new Array();
            this.pruebas = new Array();
            this.maximos = new Array();
        }
    }

    save() {
        localStorage.setItem(this.id, JSON.stringify(this))
    }

    agregar(id: string, prueba: Array<RPruebaS>) {
        if (this.pruebas != null) {
            this.pruebas.push({ id: id, pruebas: prueba });
        }
        this.save();
        //console.log({ id: id, pruebas: prueba });
    }

    getAreas(areas: Array<string>) {
        let areasArray = [];
        for (let i = 0; i < areas.length; i++) {
            let a = areas[i];

            if (this.categorias != null) {
                for (let j = 0; j < this.categorias.length; j++) {
                    let c = this.categorias[j];
                    if (a == c.area) {
                        areasArray.push(c);
                        j = this.categorias.length;
                    }
                }
            }
        }
        return areasArray;
    }

    getAreasMaximo(areas: Array<string>) {
        let areasArray = [];
        for (let i = 0; i < areas.length; i++) {
            let a = areas[i];

            if (this.maximos != null) {
                for (let j = 0; j < this.maximos.length; j++) {
                    let c = this.maximos[j];
                    if (a == c.area) {
                        areasArray.push(c);
                        j = this.maximos.length;
                    }
                }
            }
        }
        return areasArray;
    }

    getMaximo(area: string) {
        let max;
        if (this.maximos != null) {
            this.maximos.forEach(e => {
                if (area == e.area) {
                    max = e;
                }
            });
        }
        return max;
    }

    agregarResultados(resultados: Array<ResultadoA>){

        resultados.forEach((m) => {

            let nombre = m.area.toLowerCase();
            let valor = m.valor;

            let categoria: number = 0;
            let encontrado = false;

            if (this.categorias != null) {
                this.categorias.forEach((c, index) => {
                    if (c.area == nombre) {
                        categoria = index;
                        encontrado = true
                    }
                });

                if (encontrado) {
                    this.categorias[categoria].valor += valor;
                } else {
                    this.categorias.push({ area: nombre, valor: valor });
                }
            }

        });


        this.save();

    }

    sumar(nombre: string, valor: number) {
        nombre = nombre.toLowerCase();
        let categoria: number = 0;
        let encontrado = false;
        if (this.categorias != null) {
            this.categorias.forEach((c, index) => {
                if (c.area == nombre) {
                    categoria = index;
                    encontrado = true
                }
            });

            if (encontrado) {
                this.categorias[categoria].valor += valor;
            } else {
                this.categorias.push({ area: nombre, valor: valor });
            }
        }

        if(nombre == "ciencia"){
            console.log("ciencia: " + valor, "Con un maximo de: " + this.getMaximo(nombre));

        }

        this.save();
     
    }

    agregarMaximo(maximos: Array<ResultadoA>) {

        maximos.forEach((m) => {

            let nombre = m.area.toLowerCase();
            let valor = m.valor;

            let categoria: number = 0;
            let encontrado = false;

            if (this.maximos != null) {
                this.maximos.forEach((c, index) => {
                    if (c.area == nombre) {
                        categoria = index;
                        encontrado = true
                    }
                });

                if (encontrado) {
                    this.maximos[categoria].valor += valor;
                } else {
                    this.maximos.push({ area: nombre, valor: valor });
                }
            }

        });


        this.save();
    }

    calcularMaximo(valores: Array<Respuesta>) {

        let valorTotal: Array<ResultadoA> = [];

        valores.forEach((v) => {

            if (valorTotal != null) {
                for (let i = 0; i < v.valores.length; i++) {
                    let val = v.valores[i];
                    let encontro: boolean = false;

                    for (let j = 0; j < valorTotal.length; j++) {
                        let t = valorTotal[j];
                        let nombre = t.area.toLowerCase();
                        if (val.area == nombre) {
                            encontro = true;
                            if (val.valor > t.valor) {
                                t.valor = val.valor;
                            }
                        }
                    }
                    if (encontro == false) {
                        valorTotal.push({ area: val.area.toLowerCase(), valor: val.valor });
                    }
                }
            }
        });


        let categoria: number = 0;
        let encontrado = false;
        for (let h = 0; h < valorTotal.length; h++) {
            let v = valorTotal[h];

            if (this.maximos != null) {
                this.maximos.forEach((c, index) => {
                    if (c.area == v.area) {
                        categoria = index;
                        encontrado = true
                    }
                });

                if (encontrado) {
                    this.maximos[categoria].valor += v.valor;
                } else {
                    this.maximos.push({ area: v.area, valor: v.valor });
                    // console.log({ area: v.area, valor: v.valor });
                }
            }
        }

        this.save();

    }
    /*
    [
        {id:"materia", valor:5},
        {id:"materia2", valor:10},
        {id:"materia3", valor:15},
    ],
    [
        {id:"materia2", valor:5},
        {id:"materia1", valor:10},
        {id:"materia3", valor:15},
    ],



    */


    limpiarTodo() {
        localStorage.clear();
    }

    removerThis() {
        localStorage.removeItem(this.id);
    }

    removerOtro(otro: string) {
        localStorage.removeItem(otro);
    }

    getDatasize() {
        let _lsTotal = 0, _xLen, _x; for (_x in localStorage) { _xLen = ((localStorage[_x].length + _x.length) * 2); _lsTotal += _xLen; console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB") }; console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    }

    descargar() {
        var text = JSON.stringify(this),
            blob = new Blob([text], { type: 'text/plain' }),
            anchor = document.createElement('a');

        anchor.download = "resultadoDictado.json";
        anchor.href = (/*window.webkitURL ||*/ window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    }

}


class VerResultado {
    elemento: HTMLElement;
    categoria?: string;
    valor?: number;
    src?: string;
    private init: number;
    color: string;
    name = "";

    constructor() {
        this.elemento = document.createElement("div");
        this.elemento.className = "resultado__cuadro";
        this.init = random(0, 360);
        this.color = "#007ACC";
    }

    cambiarColor(color: string) {
        this.color = color;
    }

    generar(categoria: string, valor: number, src: string) {
        this.categoria = categoria;
        this.valor = valor;
        this.src = src;
        let simpli = categoria.split(" ");
        let nombre = MayusPrimera(this.categoria);
        this.name = simpli[0];
        this.elemento.innerHTML = `
        <div class="resultado__porcentaje">
        <div class="resultado__porcentaje__circulo">
            <input id="${simpli[0]}" class="porcentaje" type="text" value="${this.valor}" data-linecap=round data-angleOffset = "${this.init}">
        </div>
        <img class="icono" src="${this.src}" alt="">
        </div>
        <div class="resultado__informacion">
            <h2 class="rtitulo">${nombre}</h2>
            <h3 class="rvalor" style="color:${this.color};">${this.valor}%</h3>
        </div>
    `;
    }

    activar(){
        this.elemento.classList.add("clickeable");
        this.elemento.addEventListener("click", ()=>{
            window.location.href = "e" + this.name + ".html";
        });
    }

    getElemento() {
        return this.elemento;
    }

    felicidades() {
        let e = document.createElement("div");
        e.className = "cuadro_felicitaciones";
        e.innerHTML = `
        <div class="cuadro_bordes_lados">
        <p><b>¡Felicitaciones!</b> tienes un <b>${this.valor}%</b> de aptitud de ser un gran <b>${this.categoria}</b></p>

        <div class="medalla_icon">
                <img src="../../includes/iconos/medalla.svg" alt="">
                <img class="icono" src="${this.src}" alt="">
            </div>
        </div>
        `;
        return e;
    }
}

function MayusPrimera(palabra: string) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}


