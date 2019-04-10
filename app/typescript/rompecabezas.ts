function iniciar() {

    var pizarra:HTMLElement = <any>document.querySelector('.pizarras');
    var margin = 10;
    var width = 110;
    var height = 110;
    var widthMax = 400;

    class Pareja{

        master:HTMLElement;
        rama:HTMLElement;
        orden:number;
        inipos:number;

        constructor(rama:HTMLElement, orden:number, inipos:number){
            this.master = <any>document.createElement('div');
            this.rama = rama;
            this.orden = orden;
            this.inipos = inipos;
            this.master.className = "pizarra__click";
            this.master.style.width = (width-margin) + "px";
            this.master.style.height = (height-margin) + "px";

            this.rama.className = "pizarra__ficha";
            this.rama.style.width = (width-margin) + "px";
            this.rama.style.height = (height-margin) + "px";
        }

        getRama(){
            return this.rama;
        }

        validar(){
            if(this.master.style.left === this.rama.style.left
                && this.master.style.top === this.rama.style.top){
                    return true;
            }else{
                return false;
            }
        }
    }

    class Pizarra{

        lider:HTMLElement;
        parejas:Array<Pareja>;

        constructor(parejas:Array<Pareja>, lider:number){
            this.parejas = parejas;
            this.lider = parejas[lider].getRama();
            this.asignar();
        }

     
        asignar(){
            let lidera = this.lider;
            
            
            this.parejas.forEach((p) => {
                p.rama.addEventListener("click", function(){
                   
                    let pos:any= {x:lidera.style.left, y:lidera.style.top};
                    let obj:any= {x:p.rama.style.left, y:p.rama.style.top};
                    if((Math.abs(parseInt(pos.x) - parseInt(obj.x))<= width 
                    && Math.abs(parseInt(pos.y) - parseInt(obj.y))<= 0)
                    || (Math.abs(parseInt(pos.x) - parseInt(obj.x))<= 0 
                    && Math.abs(parseInt(pos.y) - parseInt(obj.y))<= height)){
                        lidera.style.left = p.rama.style.left;
                        lidera.style.top = p.rama.style.top;
                        p.rama.style.left = pos.x;
                        p.rama.style.top = pos.y;
                    }
                  
                });
            });
        }

      
    }


  

    var pizarra_fichas:Array<Pareja> = new Array();

    for(let i = 0; i < 24; i++){
        let a = new Pareja(document.createElement('div'), i, i);
        pizarra_fichas.push(a);
    }


        

        function crearPizarra(array_fichas:Array<Pareja>, lider:number){
            let table = document.createElement('div');
            table.className = "pizarra";
            let guias = document.createElement('section');
            guias.className = "pizarra__clicks";
            let fichas = document.createElement('section');
            fichas.className = "pizarra__fichas";
          
            table.appendChild(guias);
            table.appendChild(fichas);
            
            let pos = {x:0, y:0};

            let ramas = [];
            for(let i = 0; i < array_fichas.length; i++){
                let f = array_fichas[i];

                f.master.style.left = pos.x + 'px';
                f.master.style.top = pos.y + 'px';
                f.rama.style.left = pos.x + 'px';
                f.rama.style.top = pos.y + 'px';

                if(pos.x > widthMax){
                    pos.x = -width;
                    pos.y += height;     
                } 
                pos.x += width;


                if(i == lider){
                    f.rama.style.background = "rgb(0,0,0,0)";
                }
                
                guias.appendChild(f.master);
                ramas[i] = f.rama;

            }
            pos = {x:0, y:0};
            ramas.forEach((f)=>{
                f.style.left = pos.x + 'px';
                f.style.top = pos.y + 'px';

                if(pos.x > widthMax){
                    pos.x = -width;
                    pos.y += height;     
                } 
                pos.x += width;
                fichas.appendChild(f);
            });
            
            

            pizarra.appendChild(table);

            var piza = new Pizarra(array_fichas, lider);
            
        }

        crearPizarra(pizarra_fichas, 1);



}

$(document).ready(function() {
  iniciar();
});
