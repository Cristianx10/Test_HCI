// Converts from degrees to radians.
function radians(degrees: number) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function degrees(radians: number) {
    return radians * 180 / Math.PI;
};

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



class CorteLinea {

    inicio: Coordenada;
    final: Coordenada;
    distanacia: number;
    linea: createjs.Shape;
    puntos: Array<Coordenada>;
    historial: any;
    // puntos:Array<>;

    constructor(inicio: Coordenada, final: Coordenada, distancia: number) {
        this.inicio = inicio;
        this.final = final;
        this.distanacia = distancia;
        this.puntos = new Array();
        this.historial = {};

        let nPuntos = final.y - inicio.y;

        this.linea = new createjs.Shape();

        for (let i = 0; i < nPuntos; i++) {

            let x = Math.round(this.inicio.x + Math.sin(radians(i)) * distancia);
               let y = Math.round(this.inicio.y + i);

            this.linea.graphics.beginFill("red").drawCircle(x, y, 3);
            this.puntos.push({ x: x, y: y });

        }

        this.linea.graphics.beginFill("blue").drawCircle(this.inicio.x, this.inicio.y, 3);
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

let canvas = document.createElement('canvas');
canvas.width = 1280;
canvas.height = 720
let lienzo = new createjs.Stage(canvas);

let corte = new CorteLinea({ x: 600, y: 100 }, { x: 600, y: 600 }, 80);

let val = false;
lienzo.on("stagemousedown", () => {
    val = true;
    console.log("true");
});

lienzo.on("stagemouseup", () => {
    val = false;
});

lienzo.on("stagemousemove", () => {

    if (val) {
        corte.historial[Math.round(lienzo.mouseY)] = Math.round(lienzo.mouseX);
        console.log(corte.historial[Math.round(lienzo.mouseY)]);
    }

});

createjs.Ticker.addEventListener("tick", function () {

    if (val) {
        corte.historial[Math.round(lienzo.mouseY)] = Math.round(lienzo.mouseX);
        console.log(corte.historial[Math.round(lienzo.mouseY)]);
    }

});

lienzo.addChild(corte.linea);
lienzo.update();


$(".principal").append(canvas);


/*   
               let x = Math.round(this.inicio.x + Math.sin(radians(i)) * distancia);
               let y = Math.round(this.inicio.y + i);
               

            index++;

            if(Math.cos(radians(index)) < 1){
                //dis = Math.round(this.inicio.y + Math.cos(radians(index)) * distancia) + distancia + dis;
                //index = 0;
            }*/