

function raizN(x: number, n: number) {
    return Math.exp(Math.log(x) / n);
}

interface Coordenada {
    x: number;
    y: number;
}

interface CoordenadaP {
    x: number;
    y: number;
    posx: number;
    posy: number;
}


class salaCirugia {

    sala: createjs.Stage;
    cortando: boolean;
    canvas: HTMLCanvasElement;
    bisturi?:createjs.Bitmap;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.sala = new createjs.Stage(this.canvas);
        this.cortando = false;
        this.canvas.width = 1000;
        this.canvas.height = 480;
        this.canvas.style.background = "#AEE9DB";

        let bisturi_img = document.createElement('img');
        bisturi_img.src = "../img/cortes/bisturi.png";
    
        let corte = new createjs.Shape();

        this.sala.addChild(corte);

        bisturi_img.addEventListener("load", () => {
            this.bisturi = new createjs.Bitmap(bisturi_img);
            this.sala.addChild(this.bisturi);

                this.sala.on("stagemousemove", () => {
                    let x = this.sala.mouseX;
                    let y = this.sala.mouseY;
                    if(this.bisturi != null){
                    this.bisturi.x = x - 5;
                    this.bisturi.y = y;
                    }
                    if (this.cortando){
                        corte.graphics.beginFill("red").drawCircle(x, y, 1);
                    }  
                    this.sala.update();
                });  
        });
    }

    cargarCuerpo(url: string) {
        let cuerpoA = document.createElement('img');
        cuerpoA.src = url;

        cuerpoA.addEventListener("load", () => {
            let ima = new createjs.Bitmap(cuerpoA);
            let cor = ima.getBounds();
            ima.x = (this.canvas.width - cor.width) / 2;
            this.sala.addChildAt(ima, 0);
            this.sala.update();
        });
    }
}


class CorteLinea {

    linea: createjs.Shape;
    puntos: Array<Coordenada>;
    historial: any;
    lienzo: salaCirugia;
    registrando: boolean
    dis: number;
    color = "#EF3838";

    // puntos:Array<>;

    constructor(lienzo: salaCirugia, dis: number) {
        this.dis = dis;
        this.puntos = new Array();
        this.historial = {};
        this.lienzo = lienzo;
        this.registrando = false;


        this.linea = new createjs.Shape();

        this.linea.on("mousedown", () => {
            this.registrando = true;
            this.lienzo.cortando = true;

        });

        lienzo.sala.on("stagemouseup", () => {
            if (this.registrando) {
                console.log("Des" + this.getDesviacion());
            }
            this.registrando = false;
            this.lienzo.cortando = false;
        });

        lienzo.sala.on("stagemousemove", () => {
            if (this.registrando) {
                let y = Math.round(this.lienzo.sala.mouseY);
                let x = Math.round(this.lienzo.sala.mouseX);
                this.historial[y] = x;
            }
        });
    }

    trazoCurva(inicio: Coordenada, final: Coordenada, distancia: number, dist: number) {

        let nPuntos = final.y - inicio.y;
        let dis = dist;

        for (let i = 0; i < nPuntos; i++) {

            let x = Math.round(inicio.x + Math.sin(radians(i * dis)) * distancia);
            let y = Math.round(inicio.y + (i));

            if (i % this.dis == 0) {
                this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            }
            this.puntos.push({ x: x, y: y });

        }

        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);

    }

    trazadoLineal(inicio: Coordenada, final: Coordenada) {

        let nPuntos = final.y - inicio.y;

        let m = 0;
        if ((final.x - inicio.x) == 0) {

        } else {
            m = (final.y - inicio.y) / (final.x - inicio.x);
        }


        for (let i = 0; i < nPuntos; i++) {

            let y = Math.round(i + inicio.y);
            let x = inicio.x;
            if (m != 0) {
                x = (y - inicio.y + (m * inicio.x)) / m;
            }

            if (i % this.dis == 0) {
                this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            }
            this.puntos.push({ x: x, y: y });
        }

        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);
        this.linea.graphics.beginFill("blue").drawCircle(final.x, final.y, 5);

    }

    trazadoCurvaDerecha(inicio: Coordenada, final: Coordenada) {

        let distancia = final.y - inicio.y;

        for (let i = 0; i < distancia; i++) {

            let index = i / distancia * 90;

            let x = Math.round(inicio.x + Math.cos(radians(index)) * distancia);
            let y = Math.round(inicio.y + Math.sin(radians(index)) * distancia);

            this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            this.puntos.push({ x: x, y: y });
        }
        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);
        this.linea.graphics.beginFill("blue").drawCircle(final.x, final.y, 5);
    }

    trazadoCurvaIzquierda(inicio: Coordenada, final: Coordenada) {

        let distancia = final.y - inicio.y;

        for (let i = 0; i < distancia; i++) {

            let index = i / distancia * 90;

            let x = Math.round(inicio.x + -Math.cos(radians(index)) * distancia);
            let y = Math.round(inicio.y + Math.sin(radians(index)) * distancia);

            if (i % this.dis == 0) {
                this.linea.graphics.beginFill(this.color).drawCircle(x, y, 3);
            }
            this.puntos.push({ x: x, y: y });
        }
        this.linea.graphics.beginFill("blue").drawCircle(inicio.x, inicio.y, 5);
        this.linea.graphics.beginFill("blue").drawCircle(final.x, final.y, 5);

    }

    getDesviacion() {
        let matrix = [];
        let total_matrix = 0;
        for (let i = 0; i < this.puntos.length; i++) {
            let x = this.puntos[i].x;
            let y = this.puntos[i].y;

            if (this.historial[y] != null) {
                matrix.push(this.historial[y]);
                let dis = Math.abs(x - this.historial[y]);
                total_matrix += dis;
            }
        }

        return total_matrix / matrix.length;
    }
}



function cargarSalaCirugias() {


    let sala = new salaCirugia();
  
    sala.cargarCuerpo("../img/cortes/CuerpoB.png");

    let corteA = new CorteLinea(sala, 20);
    corteA.trazadoLineal({ x: 500, y: 100 }, { x: 500, y: 430 });

    let corteB = new CorteLinea(sala, 10);
    corteB.trazadoLineal({ x: 400, y: 350 }, { x: 470, y: 430 });

    let corteC = new CorteLinea(sala, 10);
    corteC.trazadoLineal({ x: 600, y: 350 }, { x: 530, y: 430 });

    sala.sala.addChild(corteA.linea, corteB.linea, corteC.linea);
    sala.sala.update();


    $(".principal").append(sala.canvas);
}

cargarSalaCirugias();