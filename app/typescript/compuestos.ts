class Tablero_Crelacion {
    stage: createjs.Stage;
    canvas: HTMLCanvasElement;
    baseA: Tablero_Cbase;
    baseB: Tablero_Cbase;
    seleccion?: Tablero_Categoria;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.baseA = new Tablero_Cbase(this);
        this.baseB = new Tablero_Cbase(this);

        this.baseB.contenedor.x = 500;
        this.stage.update();


        this.stage.on("stagemousemove", () => {
            if(this.seleccion != null){
                this.seleccion.linea.dibujarInicial(this.stage.mouseX, this.stage.mouseY);
            }
        });

    }
}

class Tablero_Cbase {

    tablero: Tablero_Crelacion;
    stage: createjs.Stage;
    contenedor: createjs.Container;
    categorias: Array<Tablero_Categoria>;
    private altura: number;

    constructor(tablero: Tablero_Crelacion) {
        this.tablero = tablero;
        this.stage = tablero.stage;
        this.contenedor = new createjs.Container();
        this.categorias = new Array();
        this.stage.addChild(this.contenedor);
        this.altura = 0;
    }

    agregar(infomacion: string, categoria: string) {
        let tarjeta = new Tablero_Categoria(this, infomacion, categoria);
        this.categorias.push(tarjeta);
        tarjeta.contenedor.y = this.altura;
        this.contenedor.addChild(tarjeta.contenedor);
        this.altura += tarjeta.contenedor.getBounds().height;
        this.stage.update();
    }
}

class Tablero_Categoria {

    stage: createjs.Stage;
    tablero: Tablero_Cbase;
    contenedor: createjs.Container;
    texto: createjs.Text;
    categoria: string;
    clasificado: boolean;
    linea:LineaCurva;

    constructor(tablero: Tablero_Cbase, texto: string, categoria: string) {
        this.tablero = tablero;
        this.stage = tablero.stage;
        this.contenedor = new createjs.Container();
        this.texto = new createjs.Text(texto, "50px Heebo");

        let tam = this.texto.getBounds()
        this.categoria = categoria;
        let s = new createjs.Shape();
        s.graphics.beginFill("red").drawRect(0, 0, tam.width, tam.height);
        this.contenedor.addChild(s);
        this.contenedor.addChild(this.texto);

        this.clasificado = false;
        this.linea = new LineaCurva(this.stage);

        let p = { x: 0, y: 0 }
        this.contenedor.on("mousedown", () => {
            this.tablero.tablero.seleccion = this;
            let tam = this.contenedor.getBounds();
            this.linea.iniciar(this.tablero.contenedor.x + tam.width, this.tablero.contenedor.y + this.contenedor.y + tam.height / 2);
            console.log(this.linea.inicial);
        });
      

        this.stage.on("stagemouseup", () => {

            if (this.tablero.tablero.seleccion != null) {
                if (this.contenedor.hitTest(
                    this.stage.mouseX - this.contenedor.x - tablero.contenedor.x,
                    this.stage.mouseY - this.contenedor.y - tablero.contenedor.y) &&
                    this.tablero.tablero.seleccion.tablero.categorias.indexOf(this) == -1) {
                        let tam = this.contenedor.getBounds();
                   
                    this.clasificado = true;
                    this.tablero.tablero.seleccion.clasificado = true;

                    this.tablero.tablero.seleccion.linea.terminar(this.tablero.contenedor.x + this.contenedor.x, this.tablero.contenedor.y + this.contenedor.y + (tam.height/2));

                    this.tablero.tablero.seleccion.linea.draw();

                    this.tablero.tablero.seleccion = undefined;
                } else {
                   
                    this.tablero.tablero.seleccion.linea.limpiar();
                }
            }
           
            //this.tablero.tablero.seleccion = undefined;
           
        });

    }
}

interface Coordenada {
    x: number;
    y: number;
}

class LineaCurva {

    linea: createjs.Shape;
    stage: createjs.Stage;
    inicial: Coordenada;
    final: Coordenada;
    dibujando: boolean;

    constructor(stage: createjs.Stage) {
        this.stage = stage;
        this.linea = new createjs.Shape();
        this.stage.addChild(this.linea);
        this.inicial = { x: 100, y: 100 };
        this.final = { x: 0, y: 0 };
        this.dibujando = false;
    }

    iniciar(x: number, y: number) {
        this.inicial.x =x;
        this.inicial.y = y;
        this.dibujando = true;
    }

    dibujarInicial(x: number, y: number) {
        this.final = { x: x, y: y };
        
        if (this.dibujando) {
            this.linea.graphics.clear();
            let centro = {
                x: (this.inicial.x + this.final.x) / 2, y: (this.inicial.y + this.final.y) / 2
            };

            this.linea.graphics
                .beginStroke("blue")
                .setStrokeStyle(5)
                .drawCircle(this.inicial.x, this.inicial.y, 2.5)
                .bezierCurveTo(this.inicial.x, this.inicial.y, centro.x, this.inicial.y, centro.x, centro.y)
                .bezierCurveTo(centro.x, centro.y, centro.x, this.final.y, this.final.x, this.final.y)
                .drawCircle(this.final.x, this.final.y, 2.5);
            this.stage.update();
        }
    }

    terminar(x: number, y: number) {
        this.final = { x: x, y: y };
        this.dibujando = false;
        this.stage.update();
    }

    draw(){
        this.linea.graphics.clear();
        let centro = {
            x: (this.inicial.x + this.final.x) / 2, y: (this.inicial.y + this.final.y) / 2
        };
        this.linea.graphics
            .beginStroke("blue")
            .setStrokeStyle(5)
            .bezierCurveTo(this.inicial.x, this.inicial.y, centro.x, this.inicial.y, centro.x, centro.y)
            .bezierCurveTo(centro.x, centro.y, centro.x, this.final.y, this.final.x, this.final.y);
        this.stage.update();
    }

    limpiar() {
        this.linea.graphics.clear();
        this.stage.update();
        this.dibujando = false;
    }

    dibujar(inicial: Coordenada, final: Coordenada) {
        this.linea.graphics.clear();
        let centro = {
            x: (inicial.x + final.x) / 2, y: (inicial.y + final.y) / 2
        };

        this.linea.graphics
            .beginStroke("blue")
            .bezierCurveTo(inicial.x, inicial.y, centro.x, inicial.y, centro.x, centro.y)
            .bezierCurveTo(centro.x, centro.y, centro.x, final.y, final.x, final.y);
        this.stage.update();
    }
}



let tablero = new Tablero_Crelacion();

tablero.baseA.agregar("Perro", "Mascota");
tablero.baseA.agregar("Gato", "Mascota");
tablero.baseB.agregar("Serpiente", "Mascota");
tablero.baseB.agregar("Caballo", "Mascota");


$('.principal').append(tablero.canvas);