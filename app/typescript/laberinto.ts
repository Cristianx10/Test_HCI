
function inicializar() {

  class Meta {
    x: number;
    y: number;
    meta: createjs.Shape;
    activado: boolean;
    stage: createjs.Stage;

    constructor(stage: createjs.Stage, x: number, y: number) {
      this.stage = stage;
      this.x = x;
      this.y = y;

      this.meta = new createjs.Shape();
      this.meta.x = x;
      this.meta.y = y;
      this.activado = false;

      this.meta.graphics.beginFill("red").drawRect(0, 0, 30, 49);
      this.meta.graphics.beginFill("blue").drawCircle(0, 0, 25);
      this.meta.setBounds(x, y, 30, 49);

      this.stage.addChild(this.meta);
    }

    sobre(forma: createjs.Shape) {
      let sobre = false;
      if (this.meta != null) {
        let tamForm = forma.getBounds();
        let tam = this.meta.getBounds();
        if(forma.x + (tamForm.width/2) > this.meta.x && forma.x - (tamForm.width/2) < this.meta.x + tam.width && 
        forma.y + (tamForm.height/2) > this.meta.y && forma.y - (tamForm.height/2) < this.meta.y + tam.height){
          sobre = true;
        }
      }
      return sobre;
    }

  }

  class Cursor {
    x: number;
    y: number;
    ellipse: createjs.Shape;
    activado: boolean;
    stage: createjs.Stage;

    constructor(stage: createjs.Stage, x: number, y: number) {
      this.stage = stage;
      this.x = x;
      this.y = y;

      this.ellipse = new createjs.Shape();
      this.ellipse.x = x;
      this.ellipse.y = y;

      this.activado = false;
      this.ellipse.graphics.beginFill("#1E1E1E").drawCircle(0, 0, 5);
      this.ellipse.setBounds(this.x, this.y, 10, 10);


      this.ellipse.on("click", (e: any) => {
        this.activado = true;

        e.remove();
      });
      /*
            this.ellipse.on("mousedown", ()=>{
              inicio = true;
            });
            */

      this.stage.addChild(this.ellipse);
    }

    mover(x: number, y: number) {
      this.ellipse.x = x;
      this.ellipse.y = y;
    }
    getX() {
      return this.ellipse.x;
    }

    getY() {
      return this.ellipse.y;
    }

  }

  class Laberinto {
    stage: createjs.Stage;
    //laberinto?:createjs.Bitmap;
    laberinto?: createjs.Sprite;

    constructor(stage: createjs.Stage, url: string) {
      this.stage = stage;
      let cor: any = this.stage.canvas;

      let img = document.createElement('img');
      img.src = url;

      img.addEventListener("load", () => {

        let piezas = new createjs.SpriteSheet({
          images: [url],
          frames: { width: 802, height: 455 },
          animations: {
            normal: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
          }
        });

        this.laberinto = new createjs.Sprite(piezas, "normal");
        this.laberinto.gotoAndPlay("normal");

        let cordenadas = this.laberinto.getBounds();
        this.laberinto.x = (cor.width - cordenadas.width)/2;
        this.laberinto.y = (cor.height - cordenadas.height)/2;

        /*
        this.laberinto = new createjs.Bitmap(img);
        let cordenadas = this.laberinto.getBounds();
        this.laberinto.x = (cor.width - cordenadas.width)/2;
        this.laberinto.y = (cor.height - cordenadas.height)/2;
        */


        stage.addChildAt(this.laberinto, 0);

      });
    }

    sobre(forma: createjs.Shape) {
      let sobre = false;
      if (this.laberinto != null) {
        let tamForm = forma.getBounds();
        if (this.laberinto.hitTest(forma.x - this.laberinto.x + (tamForm.width / 2), forma.y - this.laberinto.y)) {
          sobre = true;
        } else {
          return false;
        }
        if (this.laberinto.hitTest(forma.x - this.laberinto.x - (tamForm.width / 2), forma.y - this.laberinto.y)) {
          sobre = true;
        } else {
          return false;
        }
        if (this.laberinto.hitTest(forma.x - this.laberinto.x, forma.y + (tamForm.height / 2) - this.laberinto.y)) {
          sobre = true;
        } else {
          return false;
        }
        if (this.laberinto.hitTest(forma.x - this.laberinto.x, forma.y - (tamForm.height / 2) - this.laberinto.y)) {
          sobre = true;
        } else {
          return false;
        }
      }
      return sobre;
    }

  }

  let canvas: HTMLElement = <HTMLElement>document.getElementById("juego-laberinto");
  let stage = new createjs.Stage(canvas);


  stage.enableMouseOver();


  let laberinto = new Laberinto(stage, "./img/laberinto/laberinto-2.png");
  let cursor = new Cursor(stage, 1027, 364);
  let meta = new Meta(stage, 240, 317);


  createjs.Ticker.addEventListener("tick", function () {

    if (cursor.activado) {
      cursor.mover(stage.mouseX, stage.mouseY);
      if (laberinto.sobre(cursor.ellipse)) {
        console.log("va bien");
      } else {
        console.log("Pedio");
      }

      if(meta.sobre(cursor.ellipse)){
        console.log("ganaste");
      }

    }
    stage.update();

  });


}

$(document).ready(function () {
  inicializar();
});




  /*
  var carga = new createjs.LoadQueue();
  carga.loadFile({ id: "lab-1", src: "./img/laberinto/laberinto.png" });
  carga.addEventListener("fileload", (evento: any) => {
  
    let img = evento.result;

    let imagen = new createjs.Bitmap(img);
    
    let corStage:any = stage.canvas;
    let coor = imagen.getBounds();
    imagen.x = (corStage.width - coor.width)/2;
    imagen.y = (corStage.height - coor.height)/2;

    

    stage.addChildAt(imagen, 0);
    stage.update();
    
    let inicio = false;

    imagen.on("mouseout",()=>{
      if(inicio){
        console.log("Perdiste");
      }
    });    
  

    stage.on("stagemousemove", (e)=>{

      console.log(this.laberinto.hitTest(stage.mouseX, stage.mouseY));
        if(inicio){
         // cursor.x = stage.mouseX;
         // cursor.y = stage.mouseY;
        }
      });

  
    
   /* stage.on("stagemousemove", (e)=>{

      console.log(imagen.hitTest(stage.mouseX, stage.mouseY));
      if(inicio){
       // cursor.x = stage.mouseX;
       // cursor.y = stage.mouseY;
      }
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

  
  

  */

  //iniciarCursor();





