class Palillos {
    stage: createjs.Stage;
    canvas: HTMLCanvasElement;
    base: createjs.Container;
    basePalillos: Array<EPalillos>;
    palillos: Array<EPalillos>;
    seleccion?: EPalillos;

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

        let largo = 120;

        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, largo * i, 0);
            this.basePalillos.push(p1);
            p1.horizontal();
        }
        for (let i = 0; i < 4; i++) {
            let p1 = new EPalillos(this, largo * i, 0);
            this.basePalillos.push(p1);
            p1.vertical();
        }
        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, largo * i, largo);
            this.basePalillos.push(p1);
            p1.horizontal();
        }
        for (let i = 0; i < 4; i++) {
            let p1 = new EPalillos(this, largo * i, largo);
            this.basePalillos.push(p1);
            p1.vertical();
        }
        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, largo * i, largo * 2);
            this.basePalillos.push(p1);
            p1.horizontal();
        }
        for (let i = 0; i < 4; i++) {
            let p1 = new EPalillos(this, largo * i, largo * 2);
            this.basePalillos.push(p1);
            p1.vertical();
        }
        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, largo * i, largo * 3);
            this.basePalillos.push(p1);
            p1.horizontal();
        }

        for (let i = 1; i < 3; i++) {
            let p1 = new EPalillos(this, largo * i, 0, "blue");
            this.palillos.push(p1);
            p1.vertical();
        }
        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, largo * i, largo, "blue");
            this.palillos.push(p1);
            p1.horizontal();
        }
        for (let i = 1; i < 3; i++) {
            let p1 = new EPalillos(this, largo * i, largo, "blue");
            this.palillos.push(p1);
            p1.vertical();
        }
        for (let i = 0; i < 3; i++) {
            let p1 = new EPalillos(this, largo * i, largo * 2, "blue");
            this.palillos.push(p1);
            p1.horizontal();
        }
        for (let i = 1; i < 3; i++) {
            let p1 = new EPalillos(this, largo * i, largo * 2, "blue");
            this.palillos.push(p1);
            p1.vertical();
        }




        /*
let p2 = new EPalillos(this, largo*i, 0);
            this.basePalillos.push(p2);
            p2.vertical();
*/
        this.stage.update();
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

    constructor(palillo: Palillos, x: number, y: number, color?: string) {
        this.palillo = palillo;
        this.palo = new createjs.Shape();
        this.palo.x = x;
        this.palo.y = y
        this.posx = x;
        this.posy = y;
        this.movido = false;
        this.Ohorizontal = true;
        this.palillo.base.addChild(this.palo);
        if (color == null) {
            this.color = "red";

            this.palillo.stage.on("stagemousemove", () => {
                if (this.palillo.seleccion != null && this.Ohorizontal == this.palillo.seleccion.Ohorizontal) {
                    if (this.palo.hitTest(
                        this.palillo.stage.mouseX - this.palillo.base.x - this.palo.x,
                        this.palillo.stage.mouseY - this.palillo.base.y - this.palo.y)) {
                        if (this.Ohorizontal) {
                            this.palo.graphics.clear()
                                .beginFill("green")
                                .drawRoundRect(0, 0, this.largo, this.ancho, 10)
                                .beginFill("rgb(255, 255, 255, .01)")
                                .drawRoundRect(0, -this.ancho * 2, this.largo, this.ancho * 5, 10);
                        } else {
                            this.palo.graphics
                                .clear()
                                .beginFill("green")
                                .drawRoundRect(0, 0, this.ancho, this.largo, 10)
                                .beginFill("rgb(255, 255, 255, .01)")
                                .drawRoundRect(-this.ancho * 2, 0, this.ancho * 5, this.largo, 10);
                        }
                        this.palillo.stage.update();
                    }else{
                        if (this.Ohorizontal) {
                            this.horizontal();
                        }else{
                            this.vertical();
                        }
                    }
                }

            });


        } else {
            this.color = color;

            //  this.palillo.stage.update();
            this.palo.on("mousedown", () => {
                this.palillo.seleccion = this;
            });

            this.palo.on("pressmove", () => {
                let tam = this.palo.getBounds();
                this.palo.x = this.palillo.stage.mouseX - this.palillo.base.x - tam.width / 2;
                this.palo.y = this.palillo.stage.mouseY - this.palillo.base.y - tam.height / 2;
                this.palillo.stage.update();
            });

            this.palo.on("pressup", () => {
                console.log("solto")
                if (this.movido == false) {
                    this.palo.x = this.posx;
                    this.palo.y = this.posy;
                    this.palillo.stage.update();
                }
                this.movido = false;

            });
        }

        this.palillo.stage.on("stagemouseup", () => {
            if (this.palo.hitTest(
                this.palillo.stage.mouseX - this.palillo.base.x - this.palo.x,
                this.palillo.stage.mouseY - this.palillo.base.y - this.palo.y)) {
                if (this.palillo.seleccion != null && this.Ohorizontal == this.palillo.seleccion.Ohorizontal) {
                    this.palillo.seleccion.palo.x = this.posx;
                    this.palillo.seleccion.palo.y = this.posy;
                    this.palillo.seleccion.movido = true;
                    this.palillo.seleccion = undefined;
                }
            }
            this.palillo.stage.update();
        });

       
    }

    horizontal() {
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


let palo = new Palillos();

$(".principal").append(palo.canvas);