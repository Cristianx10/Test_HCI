class Palillos {
    stage: createjs.Stage;
    canvas: HTMLCanvasElement;
    base: createjs.Container;
    basePalillos: Array<EPalillos>;
    palillos: Array<EPalillos>;
    seleccion?: EPalillos;
    fresultado?: Function;
    intento?:Function;
    contenedor:createjs.Container;
    largo = 120;
    inicial = 0;
    fila = 0;
    conte = 0;

    constructor(width:number, height:number) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.stage = new createjs.Stage(this.canvas);
        this.base = new createjs.Container();
        this.base.x = 450;
        this.base.y = 200;
        this.stage.addChild(this.base);
        this.basePalillos = new Array();
        this.palillos = new Array();
        this.contenedor = new createjs.Container()
        this.stage.addChild(this.contenedor);
        let marco = new createjs.Shape();
        this.contenedor.addChild(marco);
        this.contenedor.x = 900;
        this.contenedor.y = 360;
        marco.graphics.beginStroke("#FF9900").setStrokeStyle(5).drawRoundRect(-50,-10, 400, 350, 20);
    }

    cuadrado() {
        this.baseAgregar(3, "horizontal");
        this.baseAgregar(4, "vertical");
        this.baseAgregar(3, "horizontal");
        this.baseAgregar(4, "vertical");
        this.baseAgregar(3, "horizontal");
        this.baseAgregar(4, "vertical");
        this.baseAgregar(3, "horizontal");
        this.stage.update();
    }

    baseAgregar(num: number, oriente: string) {
        if (oriente == "horizontal") {
            for (let i = 0; i < num; i++) {
                let p1 = new EPalillos(this, this.largo * i, this.fila, this.inicial);
                p1.cuadrado();
                this.basePalillos.push(p1);
                p1.horizontal();
                this.inicial++;
            }
        } else if (oriente == "vertical") {
            for (let i = 0; i < num; i++) {
                let p1 = new EPalillos(this, this.largo * i, this.fila, this.inicial);
                p1.cuadrado();
                this.basePalillos.push(p1);
                p1.vertical();
                this.inicial++;
            }
            this.fila += this.largo;
        }
        this.stage.update();
    }

    crear(x: number, y: number, oriente: string) {
       
        if (oriente == "diagonalLeftDown") {
            let p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.diagonalLeftDown();
            this.palillos.push(p1);
            this.inicial++;
        }else if (oriente == "diagonalRightDown") {
            let p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.largo = 200;
            p1.diagonalRightDown();
            this.palillos.push(p1);
            this.inicial++;
        }else if (oriente == "diagonalLeftTop") {
            let p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.largo = 200;
            p1.diagonalLeftTop();
            this.palillos.push(p1);
            this.inicial++;
        }else if (oriente == "diagonalRightTop") {
            let p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.largo = 200;
            p1.diagonalRightTop();
            this.palillos.push(p1);
            this.inicial++;
        }else if (oriente == "vertical") {
            let p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.verticalDown();
            this.palillos.push(p1);
            this.inicial++;
        }else if (oriente == "horizontal") {
            let p1 = new EPalillos(this, x, y, this.inicial, "#E64B75");
            p1.horizontalLeft();
            this.palillos.push(p1);
            this.inicial++;
        }else{
            console.log("no se reconoce")
        }
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
        } else {
            this.color = "rgb(255,255,255, 0.1)";
            //this.color = "blue";
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

    diagonalLeftDown() {
        this.largo = 140;
        this.palo.rotation = 65;
        this.vertical();
        this.palo.on("click", ()=>{
            if(this.palillo.palillos.indexOf(this) != -1){
                this.palillo.palillos.splice(this.palillo.palillos.indexOf(this),1);
            }
            this.palillo.base.removeChild(this.palo);
            this.palillo.contenedor.addChild(this.palo);
            this.palillo.stage.update();
            this.palillo.resultado();
        });
    }

    diagonalRightDown() {
        this.largo = 140;
        this.palo.rotation = -65;
        this.vertical();
        this.palo.on("click", ()=>{
            if(this.palillo.palillos.indexOf(this) != -1){
                this.palillo.palillos.splice(this.palillo.palillos.indexOf(this),1);
            }
            this.palillo.base.removeChild(this.palo);
            this.palillo.contenedor.addChild(this.palo);
            this.palillo.stage.update();
            this.palillo.resultado();
        });
    }

    diagonalLeftTop() {
        this.largo = 140;
        this.palo.rotation = 115;
        this.vertical();
     
        this.palo.on("click", ()=>{
            if(this.palillo.palillos.indexOf(this) != -1){
                this.palillo.palillos.splice(this.palillo.palillos.indexOf(this),1);
            }
            this.palillo.base.removeChild(this.palo);
            this.palillo.contenedor.addChild(this.palo);
            this.palillo.stage.update();
            this.palillo.resultado();
        });
    }

    diagonalRightTop() {
        this.largo = 140;
        this.palo.rotation = -115;
        this.vertical();
        this.palo.on("click", ()=>{
            if(this.palillo.palillos.indexOf(this) != -1){
                this.palillo.palillos.splice(this.palillo.palillos.indexOf(this),1);
            }
            this.palillo.base.removeChild(this.palo);
            this.palillo.contenedor.addChild(this.palo);
            this.palillo.stage.update();
            this.palillo.resultado();
        });
    }

    verticalDown() {
        this.vertical();
        this.palo.on("click", ()=>{
            if(this.palillo.palillos.indexOf(this) != -1){
                this.palillo.palillos.splice(this.palillo.palillos.indexOf(this),1);
            }
            this.palillo.base.removeChild(this.palo);
            this.palillo.contenedor.addChild(this.palo);
            this.palillo.stage.update();
            this.palillo.resultado();
        });
    }

    horizontalLeft() {
        this.horizontal();
        this.palo.on("click", ()=>{
            if(this.palillo.palillos.indexOf(this) != -1){
                this.palillo.palillos.splice(this.palillo.palillos.indexOf(this),1);
            }
            this.palillo.base.removeChild(this.palo);
            this.palillo.contenedor.addChild(this.palo);
            this.palillo.stage.update();
            this.palillo.resultado();
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

