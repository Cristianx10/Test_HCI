window.addEventListener("load", function() {
  let pins = [];
  pins.push(
    new PreguntaR(
      "<p>1. Lee todas las instrucciones antes de realizar algún movimiento.</p>"
    )
  );
  pins[0].incluirEn(".instrucciones");

  pins.push(
    new PreguntaR("<p>2. 2 y 2 son 4. 4 y 2 son 6. 6 y 2 son 8 y 8...?</p>")
  );
  pins[1].agregar(
    `<div class="circulo" style="background: #8CDF8B;"><p>8</p></div>`,
    []
  );
  pins[1].agregar(
    `<div class="circulo" style="background: #8CDF8B;"><p>2</p></div>`,
    []
  );
  pins[1].agregar(
    `<div class="circulo" style="background: #8CDF8B;"><p>16</p></div>`,
    []
  );
  pins[1].agregar(
    `<div class="circulo" style="background: #8CDF8B;"><p>4</p></div>`,
    []
  );
  pins[1].incluirEn(".instrucciones");

  pins.push(new PreguntaR("<p>3. ¿Cual de estos es un colo frio?</p>"));
  pins[2].agregar(
    `<div class="circulo" style="background-color: #8CDF8B;"></div>`,
    []
  );
  pins[2].agregar(
    `<div class="circulo" style="background-color: black;"></div>`,
    []
  );
  pins[2].agregar(
    `<div class="circulo" style="background-color: #F9CC9D;"></div>`,
    []
  );
  pins[2].agregar(
    `<div class="circulo" style="background-color: #588DDC;"></div>`,
    []
  );
  pins[2].incluirEn(".instrucciones");

  pins.push(
    new PreguntaR("<p>4. ¿Cuál de los siguientes números no es par?</p>")
  );
  pins[3].agregar(
    `<div class="circulo" style="background-color: #A80000;"></div>`,
    []
  );
  pins[3].agregar(
    ` <div class="circulo" style="background-color: #FF1313;"></div>`,
    []
  );
  pins[3].agregar(
    ` <div class="circulo" style="background-color: #30E3D9;"><p>6</p></div>`,
    []
  );
  pins[3].agregar(
    `<div class="circulo" style="background-color: #30E3D9;"><p>11</p></div>`,
    []
  );

  pins[3].incluirEn(".instrucciones");

  pins.push(
    new PreguntaR("<p>5. ¿Cuál de los siguientes numeros es múltiplo de 5?</p>")
  );
  pins[4].agregar(
    `<div class="circulo" style="background-color: #30E3D9;"><p>54</p></div>`,
    [
      { area: "Salud", valor: -100 },
      { area: "Educacion", valor: -100 },
      { area: "Fuerza publica", valor: -100 }
    ]
  );
  pins[4].agregar(
    `<div class="circulo" style="background-color: #30E3D9;"><p>62</p></div>`,
    []
  );
  pins[4].agregar(
    `<div class="circulo" style="background-color: #30E3D9;"><p>4</p></div>`,
    []
  );
  pins[4].agregar(
    `<div class="circulo" style="background-color: #E64973;"><p>42</p></div>`,
    []
  );
  pins[4].incluirEn(".instrucciones");

  pins.push(new PreguntaR("<p>6. Selecciona el símbolo químico del AGUA</p>"));
  pins[5].agregar(
    `<div class="circulo" style="background-color: #FFF97C;"><p>H</p></div>`,
    []
  );
  pins[5].agregar(
    `<div class="circulo" style="background-color: #FFF97C;"><p>O</p></div>`,
    []
  );
  pins[5].agregar(
    `<div class="circulo" style="background-color: #FFF97C;"><p>N</p></div>`,
    []
  );
  pins[5].agregar(
    `<div class="circulo" style="background-color: #FFF97C;"><p>H20</p></div>`,
    []
  );
  pins[5].incluirEn(".instrucciones");

  pins.push(
    new PreguntaR(
      `<p>7. Y ahora que terminaste de leer, debes ignorar las instrucciones anteriores y presionar enviar.</p>`
    )
  );
  pins[6].incluirEn(".instrucciones");

  /**
   *  Preguntas pictoricas
   * */

  let p7 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura1.png')"></div>`,
    `¿Qué técnica es utilizada en esta obra? `
  );
  p7.agregar(`<div class="boton">Pastel</div>`, []);
  p7.agregar(`<div class="boton">Acuarela</div>`, [
    { area: "Arte", valor: 20 }
  ]);
  p7.agregar(`<div class="boton">Temperatura</div>`, []);
  p7.agregar(`<div class="boton">Mixto</div>`, []);
  p7.incluirEn(".pictoricos");

  let p8 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura1.png')"></div>`,
    `¿Qué sentimiento te genera el observar esta obra?`
  );
  p8.agregar(`<div class="boton">Tristeza</div>`, []);
  p8.agregar(`<div class="boton">Felicidad</div>`, []);
  p8.agregar(`<div class="boton">Desesperacion</div>`, []);
  p8.agregar(`<div class="boton">Tranquilidad</div>`, []);
  p8.incluirEn(".pictoricos");

  let p9 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura2.png')"></div>`,
    `¿Qué técnica es utilizada en esta obra?`
  );
  p9.agregar(`<div class="boton">Vinilo</div>`, []);
  p9.agregar(`<div class="boton">Pastel</div>`, []);
  p9.agregar(`<div class="boton">Oleo</div>`, [{ area: "Arte", valor: 20 }]);
  p9.agregar(`<div class="boton">Acuarela</div>`, []);
  p9.incluirEn(".pictoricos");

  let p10 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura2.png')"></div>`,
    `¿Qué sentimiento te genera el observar esta obra?  `
  );
  p10.agregar(`<div class="boton">Tranquilidad</div>`, []);
  p10.agregar(`<div class="boton">Felicidad</div>`, []);
  p10.agregar(`<div class="boton">Desesperacion</div>`, []);
  p10.agregar(`<div class="boton">Nostalgia</div>`, []);
  p10.incluirEn(".pictoricos");

  let p11 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura3.png')"></div>`,
    `¿Qué técnica es utilizada en esta obra?`
  );
  p11.agregar(`<div class="boton">Carboncillo</div>`, []);
  p11.agregar(`<div class="boton">Mixta</div>`, []);
  p11.agregar(`<div class="boton">Pastel</div>`, [{ area: "Arte", valor: 20 }]);
  p11.agregar(`<div class="boton">Óleo</div>`, []);
  p11.incluirEn(".pictoricos");

  let p12 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura3.png')"></div>`,
    `¿Qué sentimiento te genera el observar esta obra?  `
  );
  p12.agregar(`<div class="boton">Desolación</div>`, []);
  p12.agregar(`<div class="boton">Esperanza</div>`, []);
  p12.agregar(`<div class="boton">Tristeza</div>`, []);
  p12.agregar(`<div class="boton">Felicidad</div>`, []);
  p12.incluirEn(".pictoricos");

  let p13 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura4.png')"></div>`,
    ` ¿Qué técnica es utilizada en esta obra?`
  );
  p13.agregar(`<div class="boton">Carboncillo</div>`, []);
  p13.agregar(`<div class="boton">Óleo</div>`, []);
  p13.agregar(`<div class="boton">Acrilico</div>`, []);
  p13.agregar(`<div class="boton">Tempera</div>`, [
    { area: "Arte", valor: 20 }
  ]);
  p13.incluirEn(".pictoricos");

  let p14 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura4.png')"></div>`,
    `¿Qué sentimiento te genera el observar esta obra?`
  );
  p14.agregar(`<div class="boton">Felicidad</div>`, []);
  p14.agregar(`<div class="boton">Esperanza</div>`, []);
  p14.agregar(`<div class="boton">Tristeza</div>`, []);
  p14.agregar(`<div class="boton">Desesperacion</div>`, []);
  p14.incluirEn(".pictoricos");

  let p15 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura5.png')"></div>`,
    `¿Qué técnica es utilizada en esta obra?`
  );
  p15.agregar(`<div class="boton">Mixta</div>`, [{ area: "Arte", valor: 20 }]);
  p15.agregar(`<div class="boton">Tempera</div>`, []);
  p15.agregar(`<div class="boton">Vinilo</div>`, []);
  p15.agregar(`<div class="boton">Pastel</div>`, []);
  p15.incluirEn(".pictoricos");

  let p16 = new PreguntaP(
    `<div style="background-image: url('/img/arte/pintura5.png')"></div>`,
    `¿Qué sentimiento te genera el observar esta obra?`
  );
  p16.agregar(`<div class="boton">Felicidad</div>`, []);
  p16.agregar(`<div class="boton">Esperanza</div>`, []);
  p16.agregar(`<div class="boton">Tristeza</div>`, []);
  p16.agregar(`<div class="boton">Desesperacion</div>`, []);
  p16.incluirEn(".pictoricos");

  let contenedor = new Contenedor();
  let navegacion = new Navegable(contenedor);

  contenedor.agregarHTML(document.querySelector(".pinicio"));
  contenedor
    .agregarHTML(document.querySelector(".pinstrucciones"))
    .setAccionFinal(() => {
      resultados.agregarMaximo([
        { area: "Salud", valor: 100 },
        { area: "Educacion", valor: 100 },
        { area: "Fuerza publica", valor: 100 }
      ]);

      let selecciona = false;
      for (let i = 0; i < pins.length; i++) {
        let p = pins[i];
        p.registro();
        if (p.seleccion != null) {
          selecciona = true;
        }
      }
      if (selecciona) {
      } else {
        resultados.agregarResultados([
          { area: "Salud", valor: 100 },
          { area: "Educacion", valor: 100 },
          { area: "Fuerza publica", valor: 100 }
        ]);
      }
    });

  contenedor.agregarHTML(document.querySelector(".pintropicinicio"));

  //contenedor.agregarHTMLAll(document.querySelectorAll(".pictoricos > div"));
  contenedor.agregar(p7.getPregunta());
  contenedor.agregar(p8.getPregunta());
  contenedor.agregar(p9.getPregunta());
  contenedor.agregar(p10.getPregunta());
  contenedor.agregar(p11.getPregunta());
  contenedor.agregar(p12.getPregunta());
  contenedor.agregar(p13.getPregunta());
  contenedor.agregar(p14.getPregunta());
  contenedor.agregar(p15.getPregunta());
  contenedor.agregar(p16.getPregunta());

  navegacion.iniciar();

  let nav_pictorico_siguiente = document.querySelector("#nav__pictorico");
  nav_pictorico_siguiente.addEventListener("click", seguir);

  ocultar(".ppictoricos");

  function seguir() {
    navegacion.setPermitir(true);
    navegacion.siguiente();
    if (navegacion.getActual() > 2) {
      mostrar(".ppictoricos");
    }
  }


  var opciones = document.querySelectorAll(".opcion__boton");

  function recorrerBotonesOpciones(boton){
    boton.disabled = true;
    boton.addEventListener("click", function(){
        
        navegacion.setPermitir(true);
        nav_pictorico_siguiente.disabled = false;

    });
  }

  opciones.forEach(recorrerBotonesOpciones);


  nav_pictorico_siguiente.disabled = true;
  nav_pictorico_siguiente.addEventListener("click", () => {
    nav_pictorico_siguiente.disabled = true;
  });

  navegacion.setFinal(() => {
    goTo("linguistica");
  });

  var siguientes = document.querySelectorAll(".continuar");

  function recorrerBotonesContinuar(boton) {
    boton.addEventListener("click", seguir);
  }

  siguientes.forEach(recorrerBotonesContinuar);
});
