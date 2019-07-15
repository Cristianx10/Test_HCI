class Relacionar extends Actividad {
    baseA: Relacionar_base;
    baseB: Relacionar_base;
    seleccion?: Tablero_Categoria;
    encontrado: boolean;

    constructor() {
        super();
        this.encontrado = false;
        this.baseA = new Relacionar_base(this);
        this.baseA.contenedor.x = 5;
        this.baseA.contenedor.y = 5;
        this.baseB = new Relacionar_base(this);
        this.baseB.contenedor.x = 5;
        this.baseB.contenedor.y = 5;

        this.baseA.setOrientacion(true);
        this.baseB.setOrientacion(false);

        this.update();

        this.stage.on("stagemousemove", () => {
            if (this.seleccion != null) {
                this.seleccion.linea.dibujarInicial(this.stage.mouseX, this.stage.mouseY);
            }
        });
    }

    ocultar() {
     
        if (this.seleccion != null) {
            this.seleccion.ocultar();
        }
        this.seleccion = undefined;
    }

    reset() {
    
        if (this.seleccion != null) {
            this.seleccion.reset();
        }

        this.seleccion = undefined;
    }

    style() {
        this.baseA.styleDraw();
        this.baseB.styleDraw();
    }

    size(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    distancia(x: number) {
        this.baseB.contenedor.x = x;
    }

    setStyle(width: number, height: number, style: string, h: number, w: number) {
        this.baseA.drawTablero(width, height, style, h, w);
        this.baseB.drawTablero(width, height, style, h, w);
    }
    setStyleA(width: number, height: number, style: string, h: number, w: number) {
        this.baseA.drawTablero(width, height, style, h, w);

    }
    setStyleB(width: number, height: number, style: string, h: number, w: number) {
        this.baseB.drawTablero(width, height, style, h, w);
    }
}

class Relacionar_base {

    tablero: Relacionar;
    stage: createjs.Stage;
    contenedor: createjs.Container;
    categorias: Array<Tablero_Categoria>;
    style?: string;
    w?: number;
    h?: number;
    private altura: number;
    private orientation: boolean;
    private background = new createjs.Shape();
    width?: number;
    height?: number;


    constructor(tablero: Relacionar) {
        this.tablero = tablero;
        this.stage = tablero.stage;
        this.contenedor = new createjs.Container();
        this.categorias = new Array();
        this.contenedor.addChild(this.background);
        this.stage.addChild(this.contenedor);
        this.altura = 0;
        this.orientation = true;
    }

    drawTablero(width: number, height: number, style?: string, w?: number, h?: number) {
        this.width = width;
        this.height = height;
        let tam = this.contenedor.getBounds();
        if (style != null) {
            this.style = style;
        }
        if (h != null) {
            this.w = w;
            this.h = h;
        }

        if (tam != null) {
            this.contenedor.setBounds(tam.x, tam.y, width, height);
        } else {
            this.contenedor.setBounds(0, 0, width, height);
        }



        this.stage.update();
    }

    styleDraw() {
        if (this.width != null && this.height != null) {
            this.background.graphics.beginStroke("#D9D9D9").beginFill("#FFFFFF").setStrokeStyle(5).drawRoundRect(0, 0, this.width, this.height, 50);
        }
        this.stage.update();
    }

    setOrientacion(orientation: boolean) {
        this.orientation = orientation;
    }

    agregar(infomacion: string, categoria: string) {
        let tarjeta;
        if (this.style != null) {
            tarjeta = new Tablero_Categoria(this, infomacion, categoria, this.style);
        } else {
            tarjeta = new Tablero_Categoria(this, infomacion, categoria, "20px Arial");
        }
        if (this.h != null && this.w != null) {
            tarjeta.setTamano(this.w, this.h);
        }

        this.categorias.push(tarjeta);
        let tam = tarjeta.contenedor.getBounds();
        if (this.altura == 0) {
            this.altura += tam.height + (tam.height / 2);
        }

        tarjeta.contenedor.y = this.altura;
        this.contenedor.addChild(tarjeta.contenedor);
        this.altura += tam.height + (tam.height / 2);
        let cor = this.contenedor.getBounds();

        tarjeta.contenedor.x += Math.abs(tam.width - cor.width) / 2;
        tarjeta.setConexion(this.orientation);

        this.stage.update();
    }

    actualizarTamano(width: number, height: number) {
        this.categorias.forEach((c) => {
            c.setTamano(width, height);
        });
    }

    actualizarPuntuacion() {
        this.tablero.aciertos = 0;
        this.categorias.forEach((c) => {
            this.tablero.aciertos += c.puntos;
        });
        this.tablero.fallos = this.categorias.length - this.tablero.aciertos;
    }

    validar() {
        let con = 0;
        this.categorias.forEach((c) => {

            if (c.clasificado) {
                con++;
            }
        });
   
        if (con >= this.categorias.length) {
            return true;
        }
        return false;
    }
}

class Tablero_Categoria {

    stage: createjs.Stage;
    base: Relacionar_base;
    contenedor: createjs.Container;
    texto: createjs.Text;
    categoria: string;
    clasificado: boolean;
    linea: LineaCurva;
    orientacionLeft = true;
    conexion: Coordenada;
    private place: createjs.Shape;
    private pareja?: Tablero_Categoria;
    puntos: number;
    visible: boolean;

    constructor(base: Relacionar_base, texto: string, categoria: string, style?: string) {
        this.base = base;
        this.stage = base.stage;
        this.puntos = 0;
        this.visible = true;
        this.contenedor = new createjs.Container();
        if (style != null) {
            this.texto = new createjs.Text(texto, style);
        } else {
            this.texto = new createjs.Text(texto, "50px Heebo");
        }

        this.categoria = categoria;
        this.contenedor.addChild(this.texto);

        this.clasificado = false;
        this.linea = new LineaCurva(this.stage);
        this.place = new createjs.Shape();
        this.contenedor.addChildAt(this.place, 0);

        this.conexion = { x: 0, y: 0 }



        this.contenedor.on("mousedown", () => {
            if (this.visible) {
                this.base.tablero.encontrado = false;
                this.base.tablero.seleccion = undefined;
                this.base.tablero.seleccion = this;

                if (this.pareja != null) {
                    this.pareja.linea.limpiar();
                    this.pareja.clasificado = false;
                    this.pareja.pareja = undefined;
                    this.pareja = undefined;
                }
                this.clasificado = false;
                this.linea.iniciar(this.conexion.x, this.conexion.y);
            }
        });


        this.stage.on("stagemouseup", () => {
            if (this.visible) {

                if (this.base.tablero.encontrado == false && this.base.tablero.seleccion != null) {

                    let sobre = this.contenedor.hitTest(
                        this.stage.mouseX - this.contenedor.x - base.contenedor.x,
                        this.stage.mouseY - this.contenedor.y - base.contenedor.y);

                    if (this.clasificado == false && sobre &&
                        this.base.tablero.seleccion.base.categorias.indexOf(this) == -1
                    ) {
                        this.base.tablero.encontrado = true;
                        this.base.tablero.intentos++;

                        this.pareja = this.base.tablero.seleccion;
                        this.pareja.pareja = this;

                        this.clasificado = true;
                        this.pareja.clasificado = true;


                        this.pareja.linea.terminar(this.conexion.x, this.conexion.y);
                        this.pareja.linea.draw();

                        if (this.categoria == this.pareja.categoria) {

                            //console.log(this.pareja, this)
                            if (this.base.tablero.intentoAcierto != null) {
                                this.base.tablero.intentoAcierto();
                            }

                            this.puntos = 1;
                            this.pareja.puntos = 1;

                        } else {
                            this.puntos = -1;
                            this.pareja.puntos = -1;

                            if (this.base.tablero.intentoFallo != null) {
                                this.base.tablero.intentoFallo();
                            }
                        }

                        if (this.base.validar() || this.pareja.base.validar()) {
                            if (this.base.tablero.validacion != null) {
                                this.base.tablero.validacion();
                            }
                        }

                        this.base.actualizarPuntuacion();

                    } else {
                        this.base.tablero.seleccion.linea.limpiar();

                    }
                }
            }

        });
    }

    reset() {

        if (this.pareja != null) {

            this.pareja.linea.limpiar();
            this.pareja.clasificado = false;

        }
        this.linea.limpiar();
        this.clasificado = false;
    }

    ocultar() {

        if (this.pareja != null) {
            this.pareja.base.contenedor.removeChild(this.pareja.contenedor);
            this.pareja.base.contenedor.removeChild(this.pareja.linea.linea);
            this.pareja.linea.limpiar()
            this.pareja.clasificado = true;
            this.pareja.visible = false;
        }
        this.visible = false;
        this.clasificado = true;
        this.base.contenedor.removeChild(this.contenedor);
        this.base.contenedor.removeChild(this.linea.linea);
        this.linea.limpiar()

        this.stage.update();
    }

    setTamano(width: number, height: number) {
        let tam = this.texto.getBounds();
        let cor = this.contenedor.getBounds();
        this.contenedor.setBounds(cor.x, cor.y, width, height);
        this.texto.x = Math.abs(tam.width - width) / 2;
        this.texto.y = Math.abs(tam.height - height) / 2;
        this.place.graphics.beginFill("rgb(255,255,255,.01)").drawRect(0, 0, width, height);
        this.stage.update();
    }

    actualizarTamano() {
        let tam = this.texto.getBounds();
        let cor = this.contenedor.getBounds();
        this.contenedor.setBounds(cor.x, cor.y, cor.width, cor.height);
        this.texto.x = Math.abs(tam.width - cor.width) / 2;
        this.place.graphics.beginFill("rgb(255,255,255, 0.001)").drawRect(0, 0, cor.width, cor.height);
        this.stage.update();
    }

    setConexion(value: boolean) {
        let tam = this.contenedor.getBounds();
        if (value) {
            this.conexion = {
                x: this.base.contenedor.x + this.contenedor.x + tam.width,
                y: this.base.contenedor.y + this.contenedor.y + (tam.height / 2)
            };
        } else {
            this.conexion = {
                x: this.base.contenedor.x + this.contenedor.x,
                y: this.base.contenedor.y + this.contenedor.y + (tam.height / 2)
            };
        }

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
    color: any;

    constructor(stage: createjs.Stage) {
        this.stage = stage;
        this.linea = new createjs.Shape();
        this.stage.addChild(this.linea);
        this.inicial = { x: 100, y: 100 };
        this.final = { x: 0, y: 0 };
        this.dibujando = false;
        this.color = { r: random(50, 200), g: random(50, 200), b: random(50, 200) };
    }

    iniciar(x: number, y: number) {
        this.inicial = { x: x, y: y };
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
                .beginStroke(`rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`)
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

    draw() {
        this.linea.graphics.clear();

        let centro = {
            x: (this.inicial.x + this.final.x) / 2,
            y: (this.inicial.y + this.final.y) / 2
        };

        this.linea.graphics
            .beginStroke(`rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`)
            .setStrokeStyle(5)
            .drawCircle(this.inicial.x, this.inicial.y, 3)
            .bezierCurveTo(this.inicial.x, this.inicial.y, centro.x, this.inicial.y, centro.x, centro.y)
            .bezierCurveTo(centro.x, centro.y, centro.x, this.final.y, this.final.x, this.final.y)
            .drawCircle(this.final.x, this.final.y, 3);
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
            .beginStroke(`rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`)
            .bezierCurveTo(inicial.x, inicial.y, centro.x, inicial.y, centro.x, centro.y)
            .bezierCurveTo(centro.x, centro.y, centro.x, final.y, final.x, final.y);
        this.stage.update();
    }
}



