interface Coordenada {
    x: number;
    y: number;
}

function distancia(puntoO: Coordenada, puntoA: Coordenada, puntoB: Coordenada) {
    let OAX = puntoA.x - puntoO.x;
    let OAY = puntoA.y - puntoO.y;
    let OAD = Math.sqrt((OAX * OAX) + (OAY * OAY));

    let OBX = puntoB.x - puntoO.x;
    let OBY = puntoB.y - puntoO.y;
    let OBD = Math.sqrt((OBX * OBX) + (OBY * OBY));

    let esc = (OAX * OBX) + (OAY * OBY);

    let angulo = degrees(Math.acos(esc / (OAD * OBD)));

    let dis = OBD * Math.sin(radians(angulo));

    return dis;
}

function obtenerMenorDistancia(ref: Coordenada, matrix: Array<Coordenada>): Array<Coordenada> {
    let cordenadaA = { x: 0, y: 0 };
    let cordenadaB = { x: 0, y: 0 };
    let menor = 1000;
    let menorB = 1000;
    for (let i = 0; i < matrix.length; i++) {
        let m = matrix[i];
        let entro = true;
        let dis = Math.sqrt(((m.x - ref.x) * (m.x - ref.x)) + ((m.y - ref.y) * (m.y - ref.y)));
        if (dis < menor) {
            cordenadaA = m;
            menor = dis;
            entro = false;
        }
        if (entro) {
            if (dis < menorB) {
                cordenadaB = m;
                menorB = dis;
            }
        }
    }

    return [cordenadaA, cordenadaB];
}

class Tablero_lienzo {

    stage:createjs.Stage;
    canvas:HTMLCanvasElement;
    dibujo:createjs.Shape;
    matrix?:Array<Coordenada>;
    dibujando:boolean;
    history:Array<Coordenada>
    valores:number;

    constructor(){
        this.canvas = document.createElement('canvas');
        this.canvas.width = 392;
        this.canvas.height = 427;
        this.dibujando = false;
        this.history = new Array();
        this.stage = new createjs.Stage(this.canvas);
        this.dibujo = new createjs.Shape();
        this.stage.addChild(this.dibujo);
        this.valores = 0;

        this.stage.on("stagemousedown", ()=>{
            this.dibujando = true;
          
        });

        this.stage.on("stagemouseup", ()=>{
            this.dibujando = false;
            console.log(this.valores/this.history.length);
        });

        this.stage.on("stagemousemove", ()=>{
            if(this.dibujando && this.matrix != null){
                let x= this.stage.mouseX;
                let y = this.stage.mouseY;
                this.dibujo.graphics.beginFill("#AFACA4").drawCircle(x, y, 3);
                this.history.push({x:x, y:y});
                this.stage.update();

                let e = obtenerMenorDistancia({ x: x, y: y }, this.matrix);
                let d = distancia(e[0], e[1], { x: x, y: y });
                this.valores += d;

            }
        });
    }

    dibujar(matrix:Array<Coordenada>){
        this.matrix = matrix;
        this.matrix.forEach((c:Coordenada)=>{
            this.dibujo.graphics.beginFill("#DAD9D9").drawCircle(c.x, c.y, 4);
        });
        this.stage.update();
    }

    

}

