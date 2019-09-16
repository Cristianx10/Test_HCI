window.addEventListener("load", function() {

  let contenedor = new Contenedor();
  let navegacion = new Navegable(contenedor);

  let reciclaje = new Clasificar();

  loadJson("/data/ciencias/reciclaje.json", r => {
    let recursos = r.recursos;
    reciclaje.incluirEn(".basura__elementos");

    for (let i = 0; i < recursos.length; i++) {
      let rec = recursos[i];
      let e = document.createElement("div");
      e.className = "elemento_basura";
      e.innerHTML = `<img src="${rec.url}" alt="" class="recurso">`;

      reciclaje.agregar(e, rec.categoria);
    }

    reciclaje.almacenaje(
      ["#vidrio", "#plastico", "#organico", "#papel"],
      ".basura__elementos div"
    );
    reciclaje.arrastrables("div", ".basura__elementos");
    reciclaje.setResetear(s => {
      s.style.display = "none";
    });
  });

  reciclaje.setIntentoAcierto(() => {
    console.log("bien");
    resultados.agregarResultados([{ area: "Ciencia", valor: 10 }]);
  });

  reciclaje.setIntentoFallo(() => {
    console.log("mal");
  });

  reciclaje.setValidacion(() => {
    console.log("Validado");
  });

  reciclaje.setValidar(() => {
    resultados.agregarMaximo([{ area: "Ciencia", valor: 200 }]);
  });

  /*-------------------------------------------*/

  let c = matrixFija("../img/ciencias/ojo/ojo1.png", 100, 50, 4, 4);
  let descartes = [];
  descartes.push(new Descartes());

  let matrix = [
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true
  ];

  for (let i = 0; i < c.length; i++) {
    let e = c[i];
    let m = matrix[i];
    descartes[0].agregar(e, m);
  }

  // descartes[0].incluirEn(".principal");

  descartes[0].setIntentoAcierto(() => {
    console.log("Acierto");
  });

  descartes[0].setIntentoFallo(() => {
    console.log("Fallo");
  });

  descartes[0].setValidacion(() => {
    console.log("Valido");
  });

  /*-------------------------------------------*/

  contenedor.agregarHTML(document.querySelector(".pinicio"));
  contenedor.agregar(
    new Contenido(document.querySelector(".preciclaje"), reciclaje)
  );

  contenedor.incluirEn(document.querySelector(".ppreguntas"));
  navegacion.iniciar();

  var siguiente = document.querySelector(".btn_siguiente");

  ocultar(".zona__navegacion");

  function seguir() {
    navegacion.setPermitir(true);
    navegacion.siguiente();
    mostrar(".zona__navegacion");
    siguiente.disabled = false;
  }

  navegacion.setFinal(() => {
    goTo("resultados");
  });

  //Verifica que las actividades hayan sido clikeada
  let opciones = document.querySelectorAll(".opcion_check");

  opciones.forEach(function(opcion) {
    opcion.addEventListener("click", function() {
      siguiente.disabled = false;
    });
  });

  //Configuracion de el avance entre actividades
  var siguientes = document.querySelectorAll(".continuar");

  function recorrerBotonesContinuar(boton) {
    boton.addEventListener("click", seguir);
  }

  siguientes.forEach(recorrerBotonesContinuar);
  
});
