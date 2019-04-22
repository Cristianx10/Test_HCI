interface Arrastrable_b{

}

class Basura implements Arrastrable_b{

  basura: HTMLElement;
  validado: boolean;
  clasificado = false;
  padre?: Reciclaje;
  categoria: string;
  

  constructor(url: string, categoria: string, padre: string) {
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

class Basura_elemento implements Arrastrable_b{

  basura: HTMLElement;
  validado: boolean;
  clasificado = false;
  padre?: Reciclaje;
  categoria: string;
  

  constructor(elemento:HTMLElement, categoria: string, padre: string) {
    this.basura = document.createElement('div');
    let img = document.createElement('img');
    this.categoria = categoria;
  

    this.validado = true;
    this.basura = elemento;
    img.className = "recurso";

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
  contenedor: HTMLElement;

  constructor() {
    this.elementos = new Array();
    this.contenedor = document.createElement('div');

  }

  agregar(basura: Basura) {
    basura.padre = this;
    this.elementos.push(basura);
    this.contenedor.append(basura.basura);
  }

  reset(){
    if (this.seleccion != null) {
      this.seleccion.basura.style.left = "0";
      this.seleccion.basura.style.top = "0";
      this.seleccion.basura.style.margin = "15px";
     
    }
    console.log("reset")
  }

  validarBasura(comparacion: string) {
    if (this.seleccion != null) {
      this.seleccion.clasificado = true;
      this.validar();
      if (this.seleccion.categoria == comparacion) {
        this.aciertos++;
        return true;
      } else {
        this.fallas;
        return false;
      }
    }

  }

  getElemento(){
    return this.contenedor;
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