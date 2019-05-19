interface ElementoClacificable {
  clasificado: boolean;
  categoria: string;
  elemento: HTMLElement;
}

class Clasificar_elemento implements ElementoClacificable {

  elemento: HTMLElement;
  validado: boolean;
  clasificado = false;
  padre?: Clasificar;
  categoria: string;


  constructor(url: string, categoria: string) {
    this.elemento = document.createElement('div');
    let img = document.createElement('img');
    this.categoria = categoria;


    this.validado = true;
    this.elemento.append(img);
    img.className = "recurso";

    img.src = url;
    this.elemento.style.marginTop = Math.floor((Math.random() * 40) + 1) + "px";
    this.elemento.style.marginBottom = Math.floor((Math.random() * 40) + 1) + "px";
    this.elemento.style.marginRight = Math.floor((Math.random() * 62) + 1) + "px";
    this.elemento.style.marginLeft = Math.floor((Math.random() * 62) + 1) + "px";


    this.elemento.addEventListener("mousedown", () => {
      if (this.padre != null) {
        this.padre.seleccion = this;
     
      }
    });
  }

  validar() {
    this.clasificado = true;
  }
}

class Clasificar_elemento_item implements ElementoClacificable {

  elemento: HTMLElement;
  validado: boolean;
  clasificado = false;
  padre?: Clasificar;
  categoria: string;


  constructor(elemento: HTMLElement, categoria: string) {
    this.elemento = document.createElement('div');
    let img = document.createElement('img');
    this.categoria = categoria;


    this.validado = true;
    this.elemento = elemento;
    img.className = "recurso";

    this.elemento.addEventListener("mousedown", () => {
      if (this.padre != null) {
        this.padre.seleccion = this;
      }
    });
  }

  validar() {
    this.clasificado = true;
  }
}

class Clasificar extends Interaccion {

  elementos: Array<Clasificar_elemento>;
  seleccion?: ElementoClacificable;
  resetear?: Function;
  zona = "";
  clasificados = 0;

  constructor() {
    super();
    this.elementos = new Array();
    this.tipoId = "Clasificacion";

  }

  agregarImagen(elemento: Clasificar_elemento) {
    
    elemento.padre = this;
    this.elementos.push(elemento);
    this.elemento.append(elemento.elemento);
  }


  agregar(elemento: HTMLElement, categoria: string) {
    let element = new Clasificar_elemento_item(elemento, categoria);
    element.padre = this;
    this.elementos.push(element);
    this.elemento.append(element.elemento);
  }



  reset(style?: Function) {
    if (style == null) {
      if (this.seleccion != null) {
        this.seleccion.elemento.style.left = "0";
        this.seleccion.elemento.style.top = "0";
        this.seleccion.elemento.style.margin = "15px";
      }

    } else {

      if (this.seleccion != null) {
        style(this.seleccion.elemento);
      }

    }
  }

  validarelemento(comparacion: string) {
    if (this.seleccion != null) {
      this.seleccion.clasificado = true;
      this.validar();
      if (this.seleccion.categoria == comparacion) {
        this.aciertos++;
        return true;
      } else {
        this.fallos++;
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

  almacenaje(lugares: Array<String>, div: string, zonas?:string) {
    let contenedores:Array<any> = [];

    lugares.forEach(element => {
      let con = $(element);
      contenedores.push(con);
    });
    
    contenedores.forEach((c: any) => {
      c.droppable({
        accept: div,
        drop: (event: any, ui: any)=> {
          this.deleteImage(ui.draggable, c, zonas);
        }
      });
    });
  }

  deleteImage($item: any, t: any, zonas?:string) {
    $item.fadeIn(() => {
      $item.appendTo(t);
      $item.find(zonas).css("left", "0px");
      this.clasificados++;
      this.intentos++;
      if (this.seleccion != null) {
        if (this.validarelemento(t[0].id)) {
          this.aciertos++;
          if(this.intentoAcierto != null){
            this.intentoAcierto();
          }
  
        } else {
          if(this.intentoFallo != null){
            this.intentoFallo();
          }
          this.fallos++;
     
        }

        if (this.resetear != null) {
          this.resetear(this.seleccion.elemento);
         
        } else {
          this.reset();
        }
      }

      if(this.clasificados >= this.elementos.length){
        if(this.validacion != null){
          this.valido = true;
          this.validacion();
        }
      }
    });
  }

  arrastrables(tipo: string, padre: string) {
    let elementos = $(padre);
    $(tipo, elementos).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      // helper: "clone",
      cursor: "move"
    });
  }

  setResetear(t:Function){
    this.resetear = t;
    
  }


}