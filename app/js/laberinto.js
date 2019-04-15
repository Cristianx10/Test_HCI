"use strict";
function inicializar() {
    var Meta = /** @class */ (function () {
        function Meta(stage, x, y) {
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
        Meta.prototype.sobre = function (forma) {
            var sobre = false;
            if (this.meta != null) {
                var tamForm = forma.getBounds();
                var tam = this.meta.getBounds();
                if (forma.x + (tamForm.width / 2) > this.meta.x && forma.x - (tamForm.width / 2) < this.meta.x + tam.width &&
                    forma.y + (tamForm.height / 2) > this.meta.y && forma.y - (tamForm.height / 2) < this.meta.y + tam.height) {
                    sobre = true;
                }
            }
            return sobre;
        };
        return Meta;
    }());
    var Cursor = /** @class */ (function () {
        function Cursor(stage, x, y) {
            var _this = this;
            this.stage = stage;
            this.x = x;
            this.y = y;
            this.ellipse = new createjs.Shape();
            this.ellipse.x = x;
            this.ellipse.y = y;
            this.activado = false;
            this.ellipse.graphics.beginFill("#1E1E1E").drawCircle(0, 0, 5);
            this.ellipse.setBounds(this.x, this.y, 10, 10);
            this.ellipse.on("click", function (e) {
                _this.activado = true;
                e.remove();
            });
            /*
                  this.ellipse.on("mousedown", ()=>{
                    inicio = true;
                  });
                  */
            this.stage.addChild(this.ellipse);
        }
        Cursor.prototype.mover = function (x, y) {
            this.ellipse.x = x;
            this.ellipse.y = y;
        };
        Cursor.prototype.getX = function () {
            return this.ellipse.x;
        };
        Cursor.prototype.getY = function () {
            return this.ellipse.y;
        };
        return Cursor;
    }());
    var Laberinto = /** @class */ (function () {
        function Laberinto(stage, url) {
            var _this = this;
            this.stage = stage;
            var cor = this.stage.canvas;
            var img = document.createElement('img');
            img.src = url;
            img.addEventListener("load", function () {
                var piezas = new createjs.SpriteSheet({
                    images: [url],
                    frames: { width: 802, height: 455 },
                    animations: {
                        normal: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
                    }
                });
                _this.laberinto = new createjs.Sprite(piezas, "normal");
                _this.laberinto.gotoAndPlay("normal");
                var cordenadas = _this.laberinto.getBounds();
                _this.laberinto.x = (cor.width - cordenadas.width) / 2;
                _this.laberinto.y = (cor.height - cordenadas.height) / 2;
                /*
                this.laberinto = new createjs.Bitmap(img);
                let cordenadas = this.laberinto.getBounds();
                this.laberinto.x = (cor.width - cordenadas.width)/2;
                this.laberinto.y = (cor.height - cordenadas.height)/2;
                */
                stage.addChildAt(_this.laberinto, 0);
            });
        }
        Laberinto.prototype.sobre = function (forma) {
            var sobre = false;
            if (this.laberinto != null) {
                var tamForm = forma.getBounds();
                if (this.laberinto.hitTest(forma.x - this.laberinto.x + (tamForm.width / 2), forma.y - this.laberinto.y)) {
                    sobre = true;
                }
                else {
                    return false;
                }
                if (this.laberinto.hitTest(forma.x - this.laberinto.x - (tamForm.width / 2), forma.y - this.laberinto.y)) {
                    sobre = true;
                }
                else {
                    return false;
                }
                if (this.laberinto.hitTest(forma.x - this.laberinto.x, forma.y + (tamForm.height / 2) - this.laberinto.y)) {
                    sobre = true;
                }
                else {
                    return false;
                }
                if (this.laberinto.hitTest(forma.x - this.laberinto.x, forma.y - (tamForm.height / 2) - this.laberinto.y)) {
                    sobre = true;
                }
                else {
                    return false;
                }
            }
            return sobre;
        };
        return Laberinto;
    }());
    var canvas = document.getElementById("juego-laberinto");
    var stage = new createjs.Stage(canvas);
    stage.enableMouseOver();
    var laberinto = new Laberinto(stage, "./img/laberinto/laberinto-2.png");
    var cursor = new Cursor(stage, 1027, 364);
    var meta = new Meta(stage, 240, 317);
    createjs.Ticker.addEventListener("tick", function () {
        if (cursor.activado) {
            cursor.mover(stage.mouseX, stage.mouseY);
            if (laberinto.sobre(cursor.ellipse)) {
                console.log("va bien");
            }
            else {
                console.log("Pedio");
            }
            if (meta.sobre(cursor.ellipse)) {
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
