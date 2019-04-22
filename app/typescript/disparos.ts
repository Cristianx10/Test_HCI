class Ciudad {
    canvas: HTMLCanvasElement;
    stage: createjs.Stage;
    carga: createjs.LoadQueue;
    mira?: createjs.Bitmap;
    ciudadanos: Array<Civil>;
    disparos: number;
    sombra: createjs.Shape;
    personas:createjs.Container;


    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.disparos = 0;
        this.stage = new createjs.Stage(this.canvas);
        this.personas = new createjs.Container();
        this.carga = new createjs.LoadQueue();
        this.ciudadanos = new Array();
        this.carga.installPlugin(createjs.Sound);
        this.sombra = new createjs.Shape();
        this.sombra.graphics.beginFill("black").drawRect(0, 0, this.canvas.width, this.canvas.height);
        this.stage.addChild(this.personas);
        this.stage.addChild(this.sombra);


        let linea: any = createjs.Tween;



        linea.get(this.sombra, { loop: true }).
            to({ alpha: 0 }, 2000, createjs.Ease.quartIn).call(() => { }).
            to({ alpha: 1 }, 2000, createjs.Ease.quadIn);


        this.carga.loadFile({ id: "disparo", src: "../img/disparos/disparo.mp3", type: "sound" });
        this.carga.loadFile({ id: "mira", src: "../img/disparos/mira.png" });

        this.carga.on("fileload", (carga: any) => {

            if (carga.item.id == "mira") {
                this.mira = new createjs.Bitmap(carga.result);
                this.stage.addChild(this.mira);

            }

            if (carga.item.tipo != null && carga.item.tipo == 0) {
                let img = carga.result;
                let item = carga.item;
                let imagen = new createjs.Bitmap(img);
                imagen.x = item.x;
                imagen.y = item.y;

                this.personas.addChildAt(imagen, item.orden);
                this.stage.update();
            }


            if (carga.item.tipo != null && carga.item.tipo == 1) {
                let img = carga.result;
                let item = carga.item;
                item.persona.personajeCargado(img, item);
            }
        });


        this.stage.on("stagemousemove", () => {
            if (this.mira != null) {
                let cor = this.mira.getBounds();
                this.mira.x = this.stage.mouseX - (cor.width / 2);
                this.mira.y = this.stage.mouseY - (cor.height / 2);

            }
        });

        this.stage.on("stagemouseup", () => {
            createjs.Sound.play("disparo");
            this.disparos++;
            console.log(this.stage.mouseX, this.stage.mouseY);
        });
    }

    cargarImagen(url: string, orden: number, x: number, y: number) {
        let tipo = 0;
        this.carga.loadFile({ id: url, src: url, orden: orden, x: x, y: y, tipo: tipo });
    }
}

interface Data {
    x: number;
    y: number;
}

class Civil {

    ciudad: Ciudad;
    persona?: createjs.Bitmap;
    impacto: createjs.Shape;
    movimiento: any;
    herido: boolean;
    nImpactos: number;
    movi?: Function;

    constructor(ciudad: Ciudad) {
        this.ciudad = ciudad;
        this.herido = false;
        this.nImpactos = 0;
        this.impacto = new createjs.Shape();

        this.ciudad.ciudadanos.push(this);
    }

    personajeCargado(img: any, item: any) {

        this.persona = new createjs.Bitmap(img);
        this.persona.x = item.x;
        this.persona.y = item.y;

        if (this.movi != null) {
            let linea: any = createjs.Tween;
            this.movimiento = this.movi(linea, this.persona);
        }

        this.persona.on("click", () => {
            this.impacto.graphics
                .beginFill("orange").drawCircle(this.ciudad.stage.mouseX, this.ciudad.stage.mouseY, 10).beginFill("red").
                drawCircle(this.ciudad.stage.mouseX, this.ciudad.stage.mouseY, 5);
            this.nImpactos++;
            if (this.movimiento != null && !this.movimiento.paused) {
                this.movimiento.paused = true;
            }

            if (this.herido == false) {
                this.herido = true;
            }

        });
/*
        this.ciudad.stage.on("stagemouseup", (e: any) => {
            if (this.persona != null && this.persona.hitTest(this.ciudad.stage.mouseX - this.persona.x, this.ciudad.stage.mouseY - this.persona.y)) {
                this.impacto.graphics
                    .beginFill("orange").drawCircle(this.ciudad.stage.mouseX, this.ciudad.stage.mouseY, 10).beginFill("red").
                    drawCircle(this.ciudad.stage.mouseX, this.ciudad.stage.mouseY, 5);
                this.nImpactos++;
                if (this.movimiento != null && !this.movimiento.paused) {
                    this.movimiento.paused = true;
                }

                if (this.herido == false) {
                    this.herido = true;
                }
            }
        });*/
        this.ciudad.personas.addChildAt(this.persona, item.orden);
        this.ciudad.personas.addChildAt(this.impacto, item.orden + 1);
        this.ciudad.stage.update();

    }

    cargarPersonaje(url: string, orden: number, x: number, y: number) {
        let tipo = 1;
        this.ciudad.carga.loadFile({ id: url, src: url, orden: orden, x: x, y: y, tipo: tipo, persona: this });
    }
}


