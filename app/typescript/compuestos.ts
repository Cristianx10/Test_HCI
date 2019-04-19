class Tablero_Crelacion{
    stage:createjs.Stage;
    canvas:HTMLCanvasElement;

    constructor(){
        this.canvas = document.createElement('canvas');
        this.canvas.width =1280;
        this.canvas.height =720;
        this.stage = new createjs.Stage(this.canvas);

        this.stage.update();

        let l = new LineaCurva(this.stage);

        let p = {x:0, y:0}
        this.stage.on("stagemousedown", ()=>{
            l.iniciar(this.stage.mouseX, this.stage.mouseY);
        });
        this.stage.on("stagemousemove", ()=>{
            l.dibujarInicial(this.stage.mouseX, this.stage.mouseY);
        });
        this.stage.on("stagemouseup", ()=>{
            l.terminar(this.stage.mouseX, this.stage.mouseY);
        });
    }
}

class Tablero_Cbase{

    tablero:Tablero_Crelacion;
    stage:createjs.Stage;
    contenedor:createjs.Container;
    categorias:Array<Tablero_Categoria>;
    
    constructor(tablero:Tablero_Crelacion){
        this.tablero = tablero;
        this.stage = tablero.stage;
        this.contenedor = new createjs.Container();
        this.categorias = new Array();
    }

    agregar(tarjeta:Tablero_Categoria){
        this.categorias.push(tarjeta);
        this.contenedor.addChild(tarjeta.contenedor);
    }
}

class Tablero_Categoria{

    stage:createjs.Stage;
    contenedor:createjs.Container;
    texto:createjs.Text;

    constructor(stage:createjs.Stage){
        this.stage = stage;
        this.contenedor = new createjs.Container();
        this.texto = new createjs.Text("Nuevo texto");
        this.contenedor.addChild(this.texto);
        
    }
}

interface Coordenada{
    x:number;
    y:number;
}

class LineaCurva{

    linea:createjs.Shape;
    stage:createjs.Stage;
    inicial:Coordenada;
    final:Coordenada;
    dibujando:boolean;

    constructor(stage:createjs.Stage){
        this.stage = stage;
        this.linea = new createjs.Shape();
        this.stage.addChild(this.linea); 
        this.inicial = {x:0, y:0};    
        this.final = {x:0, y:0};
        this.dibujando = false;
    }

    iniciar(x:number, y:number){
        this.inicial = {x:x, y:y};
        this.dibujando = true;
    }

    dibujarInicial(x:number, y:number){
        let final = {x:x, y:y};

        if(this.dibujando){
            this.linea.graphics.clear();
            let centro = {
                x:(this.inicial.x+final.x)/2, y:(this.inicial.y+final.y)/2
            };
           
            this.linea.graphics
            .beginStroke("blue")
            .setStrokeStyle(5)
            .drawCircle(this.inicial.x, this.inicial.y, 2.5)
            .bezierCurveTo(this.inicial.x, this.inicial.y, centro.x, this.inicial.y, centro.x, centro.y)
            .bezierCurveTo(centro.x, centro.y, centro.x, final.y, final.x, final.y)
            .drawCircle(final.x, final.y, 2.5);
            this.stage.update();

        }
    }

    terminar(x:number, y:number){
        this.final = {x:x, y:y};
        this.dibujando = false;
    }

    dibujar(inicial:Coordenada, final:Coordenada){
        this.linea.graphics.clear();
        let centro = {
            x:(inicial.x+final.x)/2, y:(inicial.y+final.y)/2
        };
       
        this.linea.graphics
        .beginStroke("blue")
        .bezierCurveTo(inicial.x, inicial.y, centro.x, inicial.y, centro.x, centro.y)
        .bezierCurveTo(centro.x, centro.y, centro.x, final.y, final.x, final.y);
        this.stage.update();
    }
}



let tablero = new Tablero_Crelacion();



$('.principal').append(tablero.canvas);