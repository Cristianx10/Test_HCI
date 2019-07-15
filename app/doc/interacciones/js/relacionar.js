window.addEventListener("load", function() {

//Creación de la navegación extandar
  let contenedor = new Contenedor();
  let navegable = new Navegable(contenedor);

  let tablero = new Relacionar();
  tablero.size(650, 450);
  tablero.setStyleA(250, 440, "20px Heebo", 230, 25);
  tablero.setStyleB(450, 440, "20px Heebo", 230, 25);

  tablero.distancia(300);

  tablero.setIntentoAcierto(() => {
    console.log("bien");
    tablero.ocultar();
  });

  tablero.setIntentoFallo(() => {
    tablero.reset();

    console.log("mal");
  });

  tablero.setValidacion(() => {
    console.log("Gano");
    siguiente.disabled = false;
  });

  let tipos = [
    { tipo: "Facilidad", categoria: "Dificultad" },
    { tipo: "Evaporar", categoria: "Solidificar" },
    { tipo: "Implícito", categoria: "Explícito" },
    { tipo: "Derrumbar", categoria: "Construir" },
    { tipo: "Idéntico", categoria: "Distinto" },
    { tipo: "Fallido", categoria: "Acertado" },
    { tipo: "Orden", categoria: "Caos" },
    { tipo: "Denegar", categoria: "Acceder" },
    { tipo: "Sabio", categoria: "Ignorante" },
    { tipo: "Flexible", categoria: "Rígido" }
  ];

  let categorias = [];

  shuffle(tipos);

  for (let i = 0; i < tipos.length; i++) {
    let e = tipos[i];
    tablero.baseA.agregar(e.tipo, e.categoria);
    categorias.push(e.categoria);
  }

  shuffle(categorias);

  for (let i = 0; i < categorias.length; i++) {
    let e = categorias[i];
    tablero.baseB.agregar(e, e);
  }

  tablero.incluirEn("#relacionAzar");

  let siguiente = document.querySelector(".btn_siguiente");

  ocultar(".zona__navegacion")


  contenedor.agregarHTML(document.querySelector(".pinicio"));

  contenedor
    .agregarHTML(document.querySelector(".prelacionar"))
    .setAccion(() => {
      siguiente.disabled = true;
      navegable.colocarTiempo();
      navegable.colocarProgreso();
    });

  contenedor.incluirEn(document.querySelector(".actividades"));
  navegable.iniciar();

  function seguir() {
    navegable.setPermitir(true);
    navegable.siguiente();
    if (navegable.getActual() == 1) {
      mostrar(".zona__navegacion");
    }
  }

  siguiente.addEventListener("click", seguir);

  navegable.setFinal(() => {
    goTo("/doc/inicio");
  });

  //Configuracion de el avance entre actividades
  var siguientes = document.querySelectorAll(".continuar");

  function recorrerBotonesContinuar(boton) {
    boton.addEventListener("click", seguir);
  }

  siguientes.forEach(recorrerBotonesContinuar);

});
