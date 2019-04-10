class Obtaculo{

  stage:createjs.Stage;

  constructor(stage:createjs.Stage){
    this.stage = stage;
  }

}

function inicializar() {

  let canvas:HTMLElement = <HTMLElement>document.getElementById("juego-laberinto");
  var stage = new createjs.Stage(canvas);
  stage.enableMouseOver();
  canvas.style.background = "rgb(255,0,0,.5)";


  var carga = new createjs.LoadQueue();
 
  carga.loadFile({ id: "lab-1", src: "./img/laberinto/laberinto.png" });
  carga.addEventListener("fileload", (evento: any) => {
  
    let img = evento.result;

    let imagen = new createjs.Bitmap(img);
    let corStage:any = stage.canvas;
    let coor = imagen.getBounds();
    imagen.x = (corStage.width - coor.width)/2
    imagen.y = (corStage.height - coor.height)/2

    stage.addChildAt(imagen, 0);
    stage.update();
    


    imagen.on("mouseout",()=>{
      console.log("Perdiste");
    });

  });

  carga.addEventListener("progress", evento => {
    console.log(evento);
  });
  carga.addEventListener("complete", (evento: any) => {
    console.log(evento);
    
  });
  carga.addEventListener("error", evento => {
    console.log(evento);
  });

  let cursor = new createjs.Shape();
  stage.addChild(cursor);

  stage.on("stagemousemove", ()=>{
    cursor.graphics.beginFill("#FF55C1").drawCircle(0,0, 5);
    cursor.x = stage.mouseX;
    cursor.y = stage.mouseY;
  });
  
  createjs.Ticker.addEventListener("tick", function(){
    
    stage.update();
   
  });

}

$(document).ready(function() {
  inicializar();
});
