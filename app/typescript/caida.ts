class Tablero__caida{
    stage:createjs.Stage;
    canvas:HTMLCanvasElement;
    bolita:createjs.Shape;
    movimmiento:any;
    
    constructor(){
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.stage = new createjs.Stage(this.canvas);

        this.bolita = new createjs.Shape();
        this.bolita.graphics.beginFill("red").drawCircle(100, 100, 50)
        .drawRect(100, 100, 100, 100);

        this.stage.addChild(this.bolita);
        this.stage.update();

        let lineTime:any = createjs.Tween;
        this.movimmiento = lineTime.get(this.bolita, {loop:true}).to({x:1200}, 5000, createjs.Ease.quadOut).call(()=>{console.log("izquierda")}).to({x:0}, 5000, createjs.Ease.quartIn);

        this.stage.on("stagemouseup", ()=>{
            this.movimmiento.paused = true;
            this.movimmiento = lineTime.get(this.bolita, {loop:true}).to({y:700}, 5000, createjs.Ease.quadOut).call(()=>{console.log("izquierda")}).to({y:0}, 5000, createjs.Ease.quartIn);
        });

        createjs.Ticker.addEventListener("tick", this.stage);
    }

}



let tab = new Tablero__caida();
$('.canvas_bolita').append(tab.canvas);