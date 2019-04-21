interface RCategoria {
    nombre: string;
    valor: number;
}

interface RRegistro {
    id:string;
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

    agregar(id:string, prueba:Array<RPruebaS>) {
      
        if(this.pruebas != null){
            this.pruebas.push({id:id, pruebas:prueba});
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

}