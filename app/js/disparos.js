"use strict";
var Ciudad = /** @class */ (function () {
    function Ciudad() {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.disparos = 0;
        this.stage = new createjs.Stage(this.canvas);
        this.carga = new createjs.LoadQueue();
        this.ciudadanos = new Array();
        this.carga.installPlugin(createjs.Sound);
        this.sombra = new createjs.Shape();
        this.sombra.graphics.beginFill("black").drawRect(0, 0, this.canvas.width, this.canvas.height);
        //this.stage.addChild(this.sombra);
        var linea = createjs.Tween;
        linea.get(this.sombra, { loop: true }).
            to({ alpha: 0 }, 2000, createjs.Ease.quartIn).call(function () { }).
            to({ alpha: 1 }, 2000, createjs.Ease.quadIn);
        this.carga.loadFile({ id: "disparo", src: "../img/disparos/disparo.mp3", type: "sound" });
        this.carga.loadFile({ id: "mira", src: "../img/disparos/mira.png" });
        this.carga.on("fileload", function (carga) {
            if (carga.item.id == "mira") {
                _this.mira = new createjs.Bitmap(carga.result);
                _this.stage.addChild(_this.mira);
            }
            if (carga.item.tipo != null && carga.item.tipo == 0) {
                var img = carga.result;
                var item = carga.item;
                var imagen = new createjs.Bitmap(img);
                imagen.x = item.x;
                imagen.y = item.y;
                _this.stage.addChildAt(imagen, item.orden);
                _this.stage.update();
            }
            if (carga.item.tipo != null && carga.item.tipo == 1) {
                var img = carga.result;
                var item = carga.item;
                item.persona.personajeCargado(img, item);
            }
        });
        this.stage.on("stagemousemove", function () {
            if (_this.mira != null) {
                var cor = _this.mira.getBounds();
                _this.mira.x = _this.stage.mouseX - (cor.width / 2);
                _this.mira.y = _this.stage.mouseY - (cor.height / 2);
            }
        });
        this.stage.on("stagemouseup", function () {
            createjs.Sound.play("disparo");
            _this.disparos++;
            console.log(_this.stage.mouseX, _this.stage.mouseY);
        });
    }
    Ciudad.prototype.cargarImagen = function (url, orden, x, y) {
        var tipo = 0;
        this.carga.loadFile({ id: url, src: url, orden: orden, x: x, y: y, tipo: tipo });
    };
    return Ciudad;
}());
var Civil = /** @class */ (function () {
    function Civil(ciudad) {
        this.ciudad = ciudad;
        this.herido = false;
        this.nImpactos = 0;
        this.impacto = new createjs.Shape();
        this.ciudad.ciudadanos.push(this);
    }
    Civil.prototype.personajeCargado = function (img, item) {
        var _this = this;
        this.persona = new createjs.Bitmap(img);
        this.persona.x = item.x;
        this.persona.y = item.y;
        if (this.movi != null) {
            var linea = createjs.Tween;
            this.movimiento = this.movi(linea, this.persona);
        }
        this.ciudad.stage.on("stagemouseup", function (e) {
            if (_this.persona != null && _this.persona.hitTest(_this.ciudad.stage.mouseX - _this.persona.x, _this.ciudad.stage.mouseY - _this.persona.y)) {
                _this.impacto.graphics
                    .beginFill("orange").drawCircle(_this.ciudad.stage.mouseX, _this.ciudad.stage.mouseY, 10).beginFill("red").
                    drawCircle(_this.ciudad.stage.mouseX, _this.ciudad.stage.mouseY, 5);
                _this.nImpactos++;
                if (_this.movimiento != null && !_this.movimiento.paused) {
                    _this.movimiento.paused = true;
                }
                if (_this.herido == false) {
                    _this.herido = true;
                }
            }
        });
        this.ciudad.stage.addChildAt(this.persona, item.orden);
        this.ciudad.stage.addChildAt(this.impacto, item.orden + 1);
        this.ciudad.stage.update();
    };
    Civil.prototype.cargarPersonaje = function (url, orden, x, y) {
        var tipo = 1;
        this.ciudad.carga.loadFile({ id: url, src: url, orden: orden, x: x, y: y, tipo: tipo, persona: this });
    };
    return Civil;
}());
