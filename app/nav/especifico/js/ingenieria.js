window.addEventListener("load", function() {
  let contenedor = new Contenedor();
  let navegacion = new Navegable(contenedor);

  let comando = document.querySelector("#comando");
  let btn_comando = document.querySelector("#btn_comando");

  let tablero = new Tablero_hielo();

  let pinguino = new Piguino(tablero);

  function validacion(texto) {
    let t = texto.value.split(".");
    texto.setCustomValidity("");
    if (t.length == 2) {
      let coman = t[0];
      let numero = t[1];
      if (numero > 0 && numero < 6) {
        if (coman == "PinUp") {
          pinguino.up(numero);
          return;
        } else if (coman == "PinDown") {
          pinguino.down(numero);
          return;
        } else if (coman == "PinLeft") {
          pinguino.left(numero);
          return;
        } else if (coman == "PinRight") {
          pinguino.right(numero);
          return;
        }
        texto.setCustomValidity(
          "El numero de pasos excede lo permitido. Intente de nuevo"
        );
      }
    }

    texto.setCustomValidity("No se reconoce el comando. Intente de nuevo");
  }

  comando.addEventListener("keyup", e => {
    comando.setCustomValidity("");
    console.log(e);
    if (e.key == "Enter") {
      validacion(comando);
      comando.value = "";
    }
  });

  btn_comando.addEventListener("click", e => {
    validacion(comando);
    comando.value = "";
  });

  tablero.incluirEn("#juegopinguino");


  /*-------------------------------------------*/

  contenedor.agregarHTML(document.querySelector(".pinicio"));
  contenedor.agregarHTML(document.querySelector(".pinstruccion1"));
  contenedor.agregarHTML(document.querySelector(".pinstruccion2"));
  contenedor.agregarHTML(document.querySelector(".pjuego"));

  contenedor.incluirEn(document.querySelector(".ppreguntas"));
  navegacion.iniciar();

  function seguir() {
    navegacion.setPermitir(true);
    navegacion.siguiente();
  }

  navegacion.setFinal(() => {});

   //Configuracion de el avance entre actividades
   var siguientes = document.querySelectorAll(".continuar");

   function recorrerBotonesContinuar(boton) {
     boton.addEventListener("click", seguir);
   }
 
   siguientes.forEach(recorrerBotonesContinuar);
});
