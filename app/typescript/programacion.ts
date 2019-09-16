class Tablero_hielo extends Actividad {
    carga: createjs.LoadQueue;
    lienzo?: createjs.Bitmap;
    negativo?: createjs.Bitmap;
    gafas?: createjs.Sprite;

    constructor() {
        super();
        this.canvas.width = 1280;
        this.canvas.height = 720;
    
        this.carga = new createjs.LoadQueue();
        this.carga.loadFile({ id: "lienzo", src: "/img/programacion/juego.png" });
        this.carga.loadFile({ id: "negativo", src: "/img/programacion/juego_bw.png" });
        this.carga.loadFile({ id: "gafas", src: "/img/programacion/gafas.png" });
        this.carga.on("fileload", (r: any) => {

            if (r.item.id == "gafas") {
                let data = {
                    images: [r.result],
                    frames: { width: 102, height: 44, regX: 51, regY: 2 },
                    animations: {
                        frente: [0, 3]
                    },
                    framerate: 10

                };
                let SpriteSheet = new createjs.SpriteSheet(data);
                this.gafas = new createjs.Sprite(SpriteSheet);
                this.stage.addChild(this.gafas);
                this.gafas.gotoAndPlay("frente");
                this.gafas.x = 1200;
                this.gafas.y = 600;
                this.stage.update();
            }

            if (r.item.id == "lienzo") {
                this.lienzo = new createjs.Bitmap(r.result);
                this.stage.addChildAt(this.lienzo, 0);
                this.stage.update();
            }

            if (r.item.id == "negativo") {
                this.negativo = new createjs.Bitmap(r.result);
                this.negativo.x = 0;
                this.negativo.y = 0;
                this.stage.addChildAt(this.negativo, 0);
                this.stage.update();
            }

            if (r.item.id == "pinguino") {
                r.item.personaje.cargaArchivos(r.result);
            }
        });

        createjs.Ticker.addEventListener("tick", this.stage);
    }
}

class Piguino {

    personaje?: createjs.Sprite;
    tablero: Tablero_hielo
    velocidad = 90;
    vel_time = 1000;
    impacto = new createjs.Shape();
    m_up = false;
    m_down = false;
    m_right = false;
    m_left = false;
    movimiento?: any;

    constructor(tablero: Tablero_hielo) {
        this.tablero = tablero;

        this.tablero.carga.loadFile({ id: "pinguino", src: "/img/programacion/pinguino.png", personaje: this })

    }

    cargaArchivos(img: any) {
        let data = {
            images: [img],
            frames: { width: 115, height: 117, regX: 57.5, regY: 58.5 },
            animations: {
                frente: 8,
                right: [0, 3],
                left: [4, 7],
                down: [8, 11],
                up: [12, 15]
            },
            framerate: 10
        };

        let vista = new createjs.SpriteSheet(data);
        this.personaje = new createjs.Sprite(vista);
        this.personaje.x = 100;
        this.personaje.y = 230;
        this.personaje.gotoAndStop("frente");

        this.tablero.stage.addChild(this.personaje);
        this.tablero.stage.addChild(this.impacto);
        this.tablero.stage.update();


        createjs.Ticker.addEventListener("tick", () => {
            if (this.personaje != null && this.tablero.negativo != null && this.tablero.gafas != null) {
                let cor = this.personaje.getBounds();
                
                if(this.m_up || this.m_down || this.m_left || this.m_right){
                    if(Math.abs(this.personaje.x - this.tablero.gafas.x) < 80 && Math.abs(this.personaje.y - this.tablero.gafas.y) < 80){
                        console.log("Ganaste");
                    }
                }
 
                if (this.m_up) {
                    if (this.personaje.y - (cor.height / 2) < 0) {
                        this.personaje.y++;
                        if (this.movimiento != null && !this.movimiento.paused) {
                            this.movimiento.paused = true;
                            this.personaje.gotoAndStop("frente");
                            this.m_up = false;
                        }
                    }

                    if (this.tablero.negativo.hitTest(this.personaje.x, this.personaje.y- (cor.height / 2))) {
                        console.log("Perdio Arriba");
                        this.m_up = false;
                        this.impacto.graphics.beginFill("red").drawCircle(this.personaje.x, this.personaje.y- (cor.height / 2), 5);
                    }
                    
                }

                if (this.m_down) {
                    if (this.personaje.y + (cor.height / 2) > 720) {
                        this.personaje.y--;
                        if (this.movimiento != null && !this.movimiento.paused) {
                            this.movimiento.paused = true;
                            this.personaje.gotoAndStop("frente");
                            this.m_down = false;
                        }
                    }

                    if (this.tablero.negativo.hitTest(this.personaje.x, this.personaje.y+ (cor.height / 2))) {
                        console.log("Perdio abajo");
                        if(this.tablero.intentoFallo != null){
                            this.tablero.intentoFallo();
                        }
                        this.m_down = false;

                        this.impacto.graphics.beginFill("red").drawCircle(this.personaje.x, this.personaje.y+ (cor.height / 2), 5);
                    }
                }

                if (this.m_left) {
                    if (this.personaje.x - (cor.width / 2) < 0) {
                        this.personaje.x++;
                        if (this.movimiento != null && !this.movimiento.paused) {
                            this.movimiento.paused = true;
                            this.personaje.gotoAndStop("frente");
                            this.m_left = false;
                        }
                    }

                    if (this.tablero.negativo.hitTest(this.personaje.x - (cor.width / 2), this.personaje.y)) {
                        console.log("Perdio Izquieda");
                        this.m_left = false;
                        this.impacto.graphics.beginFill("red").drawCircle(this.personaje.x - (cor.width / 2), this.personaje.y, 5);
                    }
                }

                if (this.m_right) {
                    if (this.personaje.x + (cor.width / 2) > 1280) {
                        this.personaje.x--;
                        if (this.movimiento != null && !this.movimiento.paused) {
                            this.movimiento.paused = true;
                            this.personaje.gotoAndStop("frente");
                            this.m_right = false;
                        }
                    }
                    if (this.tablero.negativo.hitTest(this.personaje.x + (cor.width / 2), this.personaje.y)) {
                        console.log("Perdio drerecha");
                        this.m_right = false;
                        this.impacto.graphics.beginFill("red").drawCircle(this.personaje.x + (cor.width / 2), this.personaje.y, 5);
                    }
                }

            }
        });
    }

    left(pasos: number) {
        if (this.personaje != null) {
            let cor = this.personaje.getBounds();

            this.movimiento = createjs.Tween.get(this.personaje)
                .to({ x: this.personaje.x - (this.velocidad * pasos) }, this.vel_time * pasos, createjs.Ease.quadInOut)
                .call(() => {
                    if (this.personaje != null) {
                        this.personaje.gotoAndStop("frente");
                        this.m_left = false;
                    }
                });
            this.m_left = true;
            this.personaje.gotoAndPlay("left");


        }
    }

    right(pasos: number) {
        if (this.personaje != null) {
            let cor = this.personaje.getBounds();

            this.movimiento = createjs.Tween.get(this.personaje)
                .to({ x: this.personaje.x + (this.velocidad * pasos) }, this.vel_time * pasos, createjs.Ease.quadInOut)
                .call(() => {
                    if (this.personaje != null) {
                        this.personaje.gotoAndStop("frente");
                        this.m_right = false;
                    }
                });
            this.personaje.gotoAndPlay("right");
            this.m_right = true;

        }
    }

    up(pasos: number) {
        if (this.personaje != null) {
            let cor = this.personaje.getBounds();
            this.movimiento = createjs.Tween.get(this.personaje)
                .to({ y: this.personaje.y - (this.velocidad * pasos) }, this.vel_time * pasos, createjs.Ease.quadInOut)
                .call(() => {
                    if (this.personaje != null) {
                        this.personaje.gotoAndStop("frente");
                        this.m_up = false;
                    }
                });
            this.personaje.gotoAndPlay("up");
            this.m_up = true;

        }
    }

    down(pasos: number) {
        if (this.personaje != null) {
            let cor = this.personaje.getBounds();

            this.movimiento = createjs.Tween.get(this.personaje)
                .to({ y: this.personaje.y + (this.velocidad * pasos) }, this.vel_time * pasos, createjs.Ease.quadInOut)
                .call(() => {
                    if (this.personaje != null) {
                        this.personaje.gotoAndStop("frente");
                        this.m_down = false;
                    }
                });
            this.personaje.gotoAndPlay("down");
            this.m_down = true;

        }
    }

}

