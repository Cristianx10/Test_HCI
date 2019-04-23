class Palillos {
    stage: createjs.Stage;
    canvas: HTMLCanvasElement;
    base: createjs.Container;
    basePalillos: Array<EPalillos>;
    palillos: Array<EPalillos>;
    seleccion?: EPalillos;
    fresultado?: Function;
    largo = 120;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);
        this.base = new createjs.Container();
        this.base.x = 300;
        this.base.y = 200;
        this.stage.addChild(this.base);
        this.basePalillos = new Array();
        this.palillos = new Array();
    }

    cuadrado() {
        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, this.largo * i, 0, i);
            p1.cuadrado();
            this.basePalillos.push(p1);
            p1.horizontal();
        }
        for (let i = 0; i < 4; i++) {
            let p1 = new EPalillos(this, this.largo * i, 0, i + 3);
            p1.cuadrado();
            this.basePalillos.push(p1);
            p1.vertical();
        }
        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, this.largo * i, this.largo, + 7 + i);
            p1.cuadrado();
            this.basePalillos.push(p1);
            p1.horizontal();
        }

        for (let i = 0; i < 4; i++) {
            let p1 = new EPalillos(this, this.largo * i, this.largo, 10 + i);
            p1.cuadrado();
            this.basePalillos.push(p1);
            p1.vertical();
        }
        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, this.largo * i, this.largo * 2, 14 + i);
            p1.cuadrado();
            this.basePalillos.push(p1);
            p1.horizontal();
        }

        for (let i = 0; i < 4; i++) {
            let p1 = new EPalillos(this, this.largo * i, this.largo * 2, 17 + i);
            p1.cuadrado();
            this.basePalillos.push(p1);
            p1.vertical();
        }
        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, this.largo * i, this.largo * 3, 21 + i);
            p1.cuadrado();
            this.basePalillos.push(p1);
            p1.horizontal();
        }

        this.stage.on("stagemouseup", () => {
            this.seleccion = undefined;
            this.resultado();
            this.stage.update();
        });

        this.stage.update();
    }

    agregar(pos: number) {
        if (pos < this.basePalillos.length) {
            let ref = this.basePalillos[pos];
            ref.contiene = true;
            let p1 = new EPalillos(this, ref.posx, ref.posy, ref.id, "#E64973");
            p1.cuadrado();
            p1.contiene = true;
            if (ref.Ohorizontal) {

                p1.horizontal();
            } else {
                p1.vertical();

            }
            this.palillos.push(p1);
            this.stage.update();
        } else {
            console.log("No se encuantra la referencia");
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

    setResultado(fresultado: Function) {
        this.fresultado = fresultado;
    }

    resultado() {
        let result = "";
        this.palillos.forEach((p, i) => {
            let temp_r = result;
            if (i == 0) {
                result = p.id + "";
            } else {
                result = temp_r + "," + p.id;
            }

        });
        if (this.fresultado != null) {
            this.fresultado(result);
        }
    }
}

class EPalillos {
    palillo: Palillos;
    palo: createjs.Shape;
    largo = 120;
    ancho = 10;
    color: string
    posx: number;
    posy: number;
    movido: boolean;
    Ohorizontal: boolean;
    id: number;
    contiene = false;

    constructor(palillo: Palillos, x: number, y: number, orden: number, color?: string) {
        this.palillo = palillo;
        this.id = orden;
        this.palo = new createjs.Shape();
        this.palo.x = x;
        this.palo.y = y
        this.posx = x;
        this.posy = y;
        this.movido = false;
        this.Ohorizontal = true;
        this.palillo.base.addChild(this.palo);

        if (color != null) {
            this.color = color;
        }else{
             //this.color = "rgb(255,255,255, 0.1)";
            this.color = "blue";
        }

    }

    cuadrado() {
        if (this.color == null) {           
            this.palillo.stage.on("stagemousemove", () => {
                if (this.palillo.seleccion != null && this.Ohorizontal == this.palillo.seleccion.Ohorizontal) {
                    if (this.palo.hitTest(
                        this.palillo.stage.mouseX - this.palillo.base.x - this.palo.x,
                        this.palillo.stage.mouseY - this.palillo.base.y - this.palo.y)) {
                        if (this.Ohorizontal) {
                            this.palo.graphics.clear()
                                .beginFill("#D9D6D6")
                                .drawRoundRect(0, 0, this.largo, this.ancho, 10)
                                .beginFill("rgb(255, 255, 255, .01)")
                                .drawRoundRect(0, -this.ancho * 2, this.largo, this.ancho * 5, 10);
                        } else {
                            this.palo.graphics
                                .clear()
                                .beginFill("#D9D6D6")
                                .drawRoundRect(0, 0, this.ancho, this.largo, 10)
                                .beginFill("rgb(255, 255, 255, .01)")
                                .drawRoundRect(-this.ancho * 2, 0, this.ancho * 5, this.largo, 10);
                        }
                        this.palillo.stage.update();
                    } else {
                        if (this.Ohorizontal) {
                            this.horizontal();
                        } else {
                            this.vertical();
                        }
                    }
                }
            });


        } else {
          

            //  this.palillo.stage.update();
            this.palo.on("mousedown", () => {
                this.palillo.seleccion = this;
            });

            this.palo.on("pressmove", (e: any) => {
                let tam = this.palo.getBounds();
                this.palo.x = this.palillo.stage.mouseX - this.palillo.base.x - tam.width / 2;
                this.palo.y = this.palillo.stage.mouseY - this.palillo.base.y - tam.height / 2;

                this.palillo.stage.update();
            });

            this.palo.on("pressup", (e) => {

                if (this.movido == false) {
                    this.palo.x = this.posx;
                    this.palo.y = this.posy;
                }
                this.movido = false;
                this.palillo.stage.update();
            });
        }

        this.palillo.stage.on("stagemouseup", () => {
            if (this.palillo.seleccion != null && this.palillo.seleccion != this && this.palo.hitTest(
                this.palillo.stage.mouseX - this.palillo.base.x - this.palo.x,
                this.palillo.stage.mouseY - this.palillo.base.y - this.palo.y)) {
                if (this.contiene == false && this.Ohorizontal == this.palillo.seleccion.Ohorizontal) {
                    this.palillo.basePalillos[this.palillo.seleccion.id].contiene = false;
                    this.palillo.seleccion.id = this.id;
                    this.palillo.seleccion.palo.x = this.posx;
                    this.palillo.seleccion.palo.y = this.posy;
                    this.palillo.seleccion.posx = this.posx;
                    this.palillo.seleccion.posy = this.posy;
                    this.palillo.seleccion.movido = true;
                    this.contiene = true;

                }
            }
            this.palillo.stage.update();
        });


    }

    horizontal() {
        this.Ohorizontal = true;
        this.palo.graphics
            .clear()
            .beginFill(this.color)
            .drawRoundRect(0, 0, this.largo, this.ancho, 10)
            .beginFill("rgb(255, 255, 255, .01)")
            .drawRoundRect(0, -this.ancho * 2, this.largo, this.ancho * 5, 10);
        this.palo.setBounds(0, 0, this.largo, this.ancho);
    }

    vertical() {
        this.Ohorizontal = false;
        this.palo.graphics
            .clear()
            .beginFill(this.color)
            .drawRoundRect(0, 0, this.ancho, this.largo, 10)
            .beginFill("rgb(255, 255, 255, .01)")
            .drawRoundRect(-this.ancho * 2, 0, this.ancho * 5, this.largo, 10);
        this.palo.setBounds(0, 0, this.ancho, this.largo);
    }

}

