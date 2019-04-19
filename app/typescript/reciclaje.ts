class Basura {

  basura: HTMLElement;
  validado: boolean;
  clasificado = false;
  padre?: Reciclaje;
  categoria: string;


  constructor(url: string, categoria: string) {
    this.basura = document.createElement('div');
    let img = document.createElement('img');
    this.categoria = categoria;

    this.validado = true;
    this.basura.append(img);
    img.className = "recurso";

    img.src = url;
    this.basura.style.marginTop = Math.floor((Math.random() * 40) + 1) + "px";
    this.basura.style.marginBottom = Math.floor((Math.random() * 40) + 1) + "px";
    this.basura.style.marginRight = Math.floor((Math.random() * 62) + 1) + "px";
    this.basura.style.marginLeft = Math.floor((Math.random() * 62) + 1) + "px";
    $(".basura__elementos").append(this.basura);

    this.basura.addEventListener("mousedown", () => {
      if (this.padre != null) {
        this.padre.seleccion = this;
      }
    });
  }

  validar() {
    this.clasificado = true;
  }
}

class Reciclaje {
  elementos: Array<Basura>;
  seleccion?: Basura;
    aciertos = 0;
  fallas = 0;

  constructor() {
    this.elementos = new Array();
    
  }

  agregar(basura: Basura) {
    basura.padre = this;
    this.elementos.push(basura);
  }

  validarBasura(comparacion:string){
    if(this.seleccion != null){
      this.seleccion.clasificado = true;
      this.validar();
      if(this.seleccion.categoria == comparacion){
        this.aciertos++;     
        return true;
      }else{
        this.fallas;
        return false;
      }
    }
   
  }


  validar() {
    let num = 0;
    this.elementos.forEach((b) => {
      if (b.clasificado) {
        num++;
      }
    }); 
    if (num >= this.elementos.length) {
      return true;
    } else {
      return false;
    }

  }
}