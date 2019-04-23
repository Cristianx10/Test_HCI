interface RCategoria {
    nombre: string;
    valor: number;
}

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

class Resultados {

    categorias?: Array<RCategoria>;
    pruebas?: Array<RRegistro>;
    id: string;


    constructor(id: string) {
        this.id = id;
        let reconozido = false;
        let val: any = localStorage.getItem(id);

        if (val) {
            let variables: Resultados = JSON.parse(val)
            this.categorias = variables.categorias;
            this.pruebas = variables.pruebas;
            reconozido = true;
        }

        if (reconozido == false) {
            this.categorias = new Array();
            this.pruebas = new Array();
        }
    }

    private save() {
        localStorage.setItem(this.id, JSON.stringify(this))
    }

    agregar(id: string, prueba: Array<RPruebaS>) {

        if (this.pruebas != null) {
            this.pruebas.push({ id: id, pruebas: prueba });
        }
        this.save();
    }

    sumar(nombre: string, valor: number) {
        let categoria: number = 0;
        let encontrado = false;
        if (this.categorias != null) {
            this.categorias.forEach((c, index) => {
                if (c.nombre == nombre) {
                    categoria = index;
                    encontrado = true
                }
            });

            if (encontrado) {
                this.categorias[categoria].valor += valor;
            } else {
                this.categorias.push({ nombre: nombre, valor: valor });
            }

        }

        this.save();
    }

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
    src?:string;
    private init:number;

    constructor() {
        this.elemento = document.createElement("div");
        this.elemento.className = "resultado__cuadro";
        this.init = random(0, 360);
    }

    generar(categoria: string, valor: number, src:string) {
        this.categoria = categoria;
        this.valor = valor;
        this.src = src;
        this.elemento.innerHTML = `
        <div class="resultado__porcentaje">
        <div class="circulo">
            <input class="porcentaje" type="text" value="${this.valor}" data-linecap=round data-angleOffset = "${this.init}">
        </div>
        <img class="icono" src="${this.src}" alt="">
        </div>
        <div class="resultado__informacion">
            <h2 class="titulo">${this.categoria}</h2>
            <h3 class="valor">${this.valor}%</h3>
        </div>
    `;
    }

    getElemento(){
        return this.elemento;
    }

    felicidades(){
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