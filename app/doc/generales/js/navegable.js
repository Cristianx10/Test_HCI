window.addEventListener("load", function() {
  var contenedor = new Contenedor();
  var navegable = new Navegable(contenedor);

  ocultar(".zona__navegacion");

  function seguir() {
    navegable.setPermitir(true);
    navegable.siguiente();
  }

  var siguientes = document.querySelectorAll(".continuar");

  function recorrerBotonesContinuar(boton) {
    boton.addEventListener("click", seguir);
  }

  siguientes.forEach(recorrerBotonesContinuar);

  //Aqui puedes agregar elementos HTML
  contenedor.agregarHTML(document.querySelector(".pinicio"));
  contenedor.agregarHTML(document.querySelector(".ppartida"));

  navegable.iniciar();


});
