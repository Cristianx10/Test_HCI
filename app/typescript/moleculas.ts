class Tablero_moleculas {
    stage: createjs.Stage;
    canvas: HTMLCanvasElement;
    seleccion?: Molecula;
    moleculas: Array<Molecula>;
    valida?: Function;
    lineas: Array<Enlace>;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.moleculas = new Array();
        createjs.Ticker.addEventListener("tick", this.stage);
        this.lineas = new Array();
    }

    refrescarTodo() {
        this.lineas.forEach((l) => {
            l.pintarSolo();
        });
    }

    setValida(valida: Function) {
        this.valida = valida;
    }
    enlace(resultado: string) {
        if (this.valida != null) {
            this.valida(resultado);
        }
    }

    equals(texto: string, compara: string) {
        let tex = texto.split(",");
        let com = compara.split(",");
        let total = com.length;
        let num = 0;

     
        for (let i = 0; i < tex.length; i++) {
            let t = tex[i];
        
            for (let j = 0; j < com.length; j++) {
                let c = com[j];
                if (t == c) {
                    num++;
                    com[j] = "";
                   j = com.length;
                }
            }
        }


        if (num >= total) {
            return true;
        }
        else {
            return false;
        }

    }


    agregar(tipo: string, enlaces: number, moleculas: Array<string>) {
        let m = new Molecula(this);
        m.crear(tipo, enlaces, moleculas);
        this.moleculas.push(m);
    }

    size(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

}


class Molecula {

    stage: createjs.Stage;
    tablero: Tablero_moleculas;
    contenedor: createjs.Container;
    fondo: createjs.Shape;
    texto?: createjs.Text;
    moleculas: Array<Molecula>;
    enlaces: Array<string>;
    color: string;
    radio: number;
    pos: Coordenada;
    tipo: string;
    nEnlaces: number;
    actualizado: boolean;
    linea?: Enlace;

    constructor(tablero: Tablero_moleculas) {
        this.tablero = tablero;
        this.stage = this.tablero.stage;
        this.contenedor = new createjs.Container();
        this.fondo = new createjs.Shape();
        this.contenedor.addChild(this.fondo);
        this.tipo = "";
        this.nEnlaces = 0;
        this.actualizado = false;
        this.moleculas = new Array();
        this.enlaces = new Array();
        this.stage.addChild(this.contenedor);

        this.radio = random(25, 45);
        let h = random(0, 360);
        let c = hsvToRgb(h, 90, 60);
        this.color = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;

        this.pos = { x: random(50, 1200), y: random(50, 600) };

        this.contenedor.on("mousedown", () => {

            this.tablero.seleccion = this;
            this.contenedor.x = this.stage.mouseX;
            this.contenedor.y = this.stage.mouseY;

            this.stage.update();
        });

        this.contenedor.on("pressmove", () => {
            this.contenedor.x = this.stage.mouseX;
            this.contenedor.y = this.stage.mouseY;

            this.stage.update();
        });

        this.stage.on("stagemouseup", () => {
            if (this.tablero.seleccion != null && this.tablero.seleccion != this) {

                if (this.moleculas.length < this.nEnlaces && this.tablero.seleccion.moleculas.length < this.tablero.seleccion.nEnlaces && this.contenedor.hitTest(this.stage.mouseX - this.contenedor.x, this.stage.mouseY - this.contenedor.y)) {

                    let enlazar = false;

                    for (let i = 0; i < this.enlaces.length; i++) {
                        let e = this.enlaces[i];
                        if (this.tablero.seleccion.tipo == e) {
                            enlazar = true;
                        }
                    }

                    if (enlazar) {
                        let desX = 0;
                        let desY = 0;

                        desX = random(-(this.radio * 3 + this.tablero.seleccion.radio * 3), (this.radio * 3 + this.tablero.seleccion.radio * 3 ));
                        if (this.contenedor.x +desX  > this.tablero.canvas.width || this.contenedor.x +desX < this.tablero.seleccion.radio * 3) {
                            desX *= -1;
                        }

                        desY = random(-(this.radio * 3 + this.tablero.seleccion.radio * 3), (this.radio * 3 + this.tablero.seleccion.radio * 3));
                        if (this.contenedor.y +desY  > this.tablero.canvas.width || this.contenedor.y +desY < this.tablero.seleccion.radio) {
                            desY *= -1;
                        }

                        let linea = new Enlace(this.stage);
                        this.tablero.lineas.push(linea);
                        createjs.Tween.get(this.tablero.seleccion.contenedor)
                            .to({ x: this.tablero.seleccion.contenedor.x + desX, y: this.tablero.seleccion.contenedor.y + desY }, 300).call(() => {

                                if (linea != null && this.tablero.seleccion != null) {
                                    linea.pintar(this.tablero.seleccion.contenedor.x, this.tablero.seleccion.contenedor.y);
                                    this.stage.update();
                                }
                                this.tablero.refrescarTodo();
                                this.tablero.seleccion = undefined;
                            });
                        // this.tablero.seleccion.contenedor.x = des;
                        this.contenedor.x + this.radio * 4 + this.tablero.seleccion.radio * 4;

                        this.moleculas.push(this.tablero.seleccion);
                        this.tablero.seleccion.moleculas.push(this);

                        this.tablero.seleccion.dibujarEnlace();
                        this.dibujarEnlace();

                        linea.seguir(this.tablero.seleccion.contenedor, this.contenedor);

                        let resultado = this.tipo;

                        for (let i = 0; i < this.moleculas.length; i++) {
                            let e = this.moleculas[i];
                            let tem = resultado;
                            resultado = tem + "," + e.tipo;
                        }

                        this.tablero.enlace(resultado);


                    }


                }
            }

            this.stage.update();

        });

    }



    dibujarEnlace() {
        this.fondo.graphics.clear().beginFill(this.color).drawCircle(0, 0, this.radio * 2)
            .endFill().beginStroke("red").setStrokeStyle(5).drawCircle(0, 0, this.radio * 2 + 20);
    }

    crear(tipo: string, enlaces: number, moleculas: Array<string>) {
        this.enlaces = moleculas;
        this.nEnlaces = enlaces;
        this.tipo = tipo;
        this.texto = new createjs.Text(tipo, "40px Heebo");
        let tam = this.texto.getBounds();
        this.texto.x = -(tam.width / 2);
        this.texto.y = -(tam.height / 2) + 5;
        this.fondo.graphics.beginFill(this.color).drawCircle(0, 0, this.radio * 2);
        this.fondo.alpha = .7;

        this.contenedor.addChild(this.texto);
        this.contenedor.x = this.pos.x;
        this.contenedor.y = this.pos.y;
        this.stage.update();
    }

}

class Enlace {
    stage: createjs.Stage;
    linea: createjs.Shape;
    puntoA?: createjs.Container;
    puntoB?: createjs.Container;

    constructor(stage: createjs.Stage) {
        this.stage = stage;
        this.linea = new createjs.Shape();
        this.stage.addChildAt(this.linea, 0);
    }

    seguir(puntoA: createjs.Container, puntoB: createjs.Container) {
        this.puntoA = puntoA;
        this.puntoB = puntoB;
        this.draw(puntoA, puntoB);

        puntoA.on("mousedown", () => {
            this.draw(puntoA, puntoB)
        });

        puntoB.on("mousedown", () => {
            this.draw(puntoA, puntoB)
        });

        puntoA.on("pressmove", () => {
            this.draw(puntoA, puntoB)
        });

        puntoB.on("pressmove", () => {
            this.draw(puntoA, puntoB)

        });

    }

    pintar(x: number, y: number) {
        if (this.puntoA != null && this.puntoB != null) {
            this.linea.graphics.clear().beginStroke("red")
                .setStrokeStyle(5)
                .lineTo(this.puntoA.x, this.puntoA.y).lineTo(x, y).endStroke();
            this.stage.update();
        }
    }

    pintarSolo() {
        if (this.puntoA != null && this.puntoB != null) {
            this.linea.graphics.clear().beginStroke("red")
                .setStrokeStyle(5)
                .lineTo(this.puntoA.x, this.puntoA.y).lineTo(this.puntoB.x, this.puntoB.y).endStroke();
            this.stage.update();
          
        }
    }


    draw(puntoA: createjs.Container, puntoB: createjs.Container) {
        this.linea.graphics.clear().beginStroke("red")
            .setStrokeStyle(5)
            .moveTo(puntoA.x, puntoA.y).lineTo(puntoB.x, puntoB.y).endStroke();
    }
}

