window.addEventListener("load", function() {
  let contenedor = new Contenedor();
  let navegacion = new Navegable(contenedor);
  var siguiente = document.querySelector(".btn_siguiente");

  var preguntas = [];

  let temp__pregunta = new PreguntaD(
    "La constancia y la planificación son importantes en mi vida",
    "Constancia",
    "Sín planificación"
  );
  temp__pregunta.agregar("1", [
    { area: "Deportes", valor: 10 },
    { area: "Salud", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Ingenieria", valor: 10 }]);
  temp__pregunta.agregar("3", [{ area: "Arte", valor: 20 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me gusta pensar en los demás incluso antes que en mi",
    "Los demás",
    "Yo primero"
  );
  temp__pregunta.agregar("1", [
    { area: "Salud", valor: 20 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [
    { area: "Diseño", valor: 10 },
    { area: "Educacion", valor: 10 },
    { area: "Arte", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [{ area: "Deportes", valor: 10 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me encanta aprender sobre el cuerpo humano, lo considero fascinante",
    "Si",
    "No"
  );
  temp__pregunta.agregar("1", [
    { area: "Salud", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Diseño", valor: 10 }]);
  temp__pregunta.agregar("3", [
    { area: "Fuerza publica", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me gusta ser una persona limpia y aseada",
    "Pulcritud",
    "No Pulcritud"
  );
  temp__pregunta.agregar("1", [{ area: "Salud", valor: 20 }]);
  temp__pregunta.agregar("2", [
    { area: "Arte", valor: 10 },
    { area: "Ciencia", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [{ area: "Deportes", valor: 10 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Prefiero ser el intelectual que el de la fuerza",
    "Intelectual",
    "Fuerza"
  );
  temp__pregunta.agregar("1", [
    { area: "Ingenieria", valor: 20 },
    { area: "Educacion", valor: 20 },
    { area: "Arte", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", []);
  temp__pregunta.agregar("3", [
    { area: "Deportes", valor: 10 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me gusta pertenecer a asociaciones de ayuda social",
    "No pertenecer",
    "Pertenecer"
  );
  temp__pregunta.agregar("1", [
    { area: "Diseño", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Educacion", valor: 10 }]);
  temp__pregunta.agregar("3", [
    { area: "Salud", valor: 20 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Mis videojuegos preferidos son los Shooter",
    "No",
    "Si"
  );
  temp__pregunta.agregar("1", [
    { area: "Diseño", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  temp__pregunta.agregar("2", []);
  temp__pregunta.agregar("3", [{ area: "Fuerza publica", valor: 20 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me gusta la adrenalina porque me hace sentir vivo",
    "No",
    "Si"
  );
  temp__pregunta.agregar("1", [
    { area: "Educacion", valor: 20 },
    { area: "Arte", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Deportes", valor: 5 }]);
  temp__pregunta.agregar("3", [{ area: "Fuerza publica", valor: 20 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "En clase de educación física, al hacer equipos me escogen en",
    "Primer lugar",
    "Ultimo lugar"
  );
  temp__pregunta.agregar("1", [
    { area: "Deportes", valor: 10 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Salud", valor: 10 }]);
  temp__pregunta.agregar("3", [{ area: "Educacion", valor: 20 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me considero competitivo",
    "No soy competitivo",
    "Soy competitivo"
  );
  temp__pregunta.agregar("1", [
    { area: "Salud", valor: 20 },
    { area: "Educacion", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [
    { area: "Diseño", valor: 10 },
    { area: "Arte", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [{ area: "Deportes", valor: 10 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Es importante para mi sacar tiempo de mi semana para ejercitarme",
    "No",
    "Si"
  );
  temp__pregunta.agregar("1", [
    { area: "Diseño", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Salud", valor: 10 }]);
  temp__pregunta.agregar("3", [
    { area: "Deportes", valor: 10 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Medir mi tiempo en ciertas actividades me motiva a mejorar cada vez mas",
    "No",
    "Me motiva mucho"
  );
  temp__pregunta.agregar("1", [
    { area: "Educacion", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Diseño", valor: 10 }]);
  temp__pregunta.agregar("3", [{ area: "Deportes", valor: 10 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me agrada trabajar en equipo, juntos se puede lograr más",
    "De acuerdo",
    "En desacuerdo"
  );
  temp__pregunta.agregar("1", [
    { area: "Diseño", valor: 20 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [
    { area: "Ingenieria", valor: 10 },
    { area: "Arte", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [{ area: "Educacion", valor: 20 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "En una gráfica trato de que todo quede lo mas entendible posible",
    "No",
    "Si"
  );
  temp__pregunta.agregar("1", [{ area: "Salud", valor: 20 }]);
  temp__pregunta.agregar("2", [
    { area: "Educacion", valor: 10 },
    { area: "Arte", valor: 10 },
    { area: "Ciencia", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [
    { area: "Diseño", valor: 20 },
    { area: "Ingenieria", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me encanta usar colores diferentes para resaltar y organizar información",
    "Si",
    "No"
  );
  temp__pregunta.agregar("1", [
    { area: "Diseño", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Ingenieria", valor: 10 }]);
  temp__pregunta.agregar("3", [
    { area: "Deportes", valor: 10 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me gusta  buscar  referencias de trabajos parecidos al que estoy efectuando, esto aviva mis ideas",
    "Muy de acuerdo",
    "En desacuerdo"
  );
  temp__pregunta.agregar("1", [
    { area: "Diseño", valor: 20 },
    { area: "Educacion", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [
    { area: "Ingenieria", valor: 10 },
    { area: "Ciencia", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [{ area: "Deportes", valor: 10 }]);
  preguntas.push(temp__pregunta);

  /*Cargar actividad de tuberias----------------------------------------------**/

  function sumarTuberia(pall) {
    if (pall.intentos <= 1) {
      resultados.agregarMaximo([{ area: "ingenieria", valor: 100 }]);
    }

    if (pall.intentos == 3) {
      resultados.agregarResultados([{ area: "ingenieria", valor: 100 }]);
    } else if (pall.intentos >= 4 && pall.intentos <= 6) {
      resultados.agregarResultados([{ area: "ingenieria", valor: 70 }]);
    } else if (pall.intentos >= 7 && pall.intentos < 10) {
      resultados.agregarResultados([{ area: "ingenieria", valor: 40 }]);
    } else if (pall.intento == 10) {
      resultados.agregarResultados([{ area: "ingenieria", valor: 10 }]);
    } else if (pall.intento > 10) {
      resultados.agregarResultados([{ area: "ingenieria", valor: 0 }]);
    }
    siguiente.disabled = false;
  }

  let img = matrixImagen("/img/pizarra/tabla_tutorial.png", 110, 110, 3, 5);
  let tab = new Pizarra(1, 13, 8);

  tab.agregar(img[0], false, false, false, false, 0, 1);
  tab.agregar(img[1], false, true, false, false, 1, 1);
  tab.agregar(img[2], false, false, false, false, 2, 1);
  tab.agregar(img[3], true, false, true, false, 3, 0);
  tab.agregar(img[4], true, true, false, false, 4, 0);
  tab.agregar(img[5], false, false, true, true, 5, 0);
  tab.agregar(img[6], true, true, false, false, 6, 0);
  tab.agregar(img[7], false, true, true, false, 7, 0);
  tab.agregar(img[8], false, false, false, false, 8, 0);
  tab.agregar(img[9], false, true, true, false, 9, 0);
  tab.agregar(img[10], true, true, false, false, 10, 0);
  tab.agregar(img[11], false, true, false, true, 11, 0);
  tab.agregar(img[12], false, false, false, false, 12, 1);
  tab.agregar(img[13], true, false, false, false, 13, 1);
  tab.agregar(img[14], false, false, false, false, 14, 1);

  tab.cargarTablero(3, 5, 110, 110);

  tab.setValidacion(() => {
    console.log("Validado");
    let e = document.querySelector("#tuberia_info");
    e.innerText =
      "¡Perfecto! Has completado la tuberia. Dale click a siguiente y probemos tu habilidad";
    siguiente.disabled = false;
  });

  tab.setIntentoFallo(() => {
    console.log("Intento");
  });

  tab.incluirEn("#tuberias__a");

  img = matrixImagen("/img/pizarra/tabla.png", 110, 110, 5, 4);
  let tab2 = new Pizarra(3, 15, 19);

  tab2.agregar(img[0], false, false, false, false, 0, 1);
  tab2.agregar(img[1], false, false, false, false, 1, 1);
  tab2.agregar(img[2], false, false, false, false, 2, 1);
  tab2.agregar(img[3], false, true, false, false, 3, 1);
  tab2.agregar(img[4], false, false, false, false, 4, 1);
  tab2.agregar(img[5], false, false, false, false, 5, 1);
  tab2.agregar(img[6], false, true, false, true, 6, 0);
  tab2.agregar(img[7], false, false, true, true, 7, 0);
  tab2.agregar(img[8], true, true, false, false, 8, 0);
  tab2.agregar(img[9], false, true, true, false, 9, 0);
  tab2.agregar(img[10], false, false, false, false, 10, 1);
  tab2.agregar(img[11], false, true, false, true, 11, 0);
  tab2.agregar(img[12], false, false, true, true, 12, 0);
  tab2.agregar(img[13], true, true, false, false, 13, 0);
  tab2.agregar(img[14], true, false, true, false, 14, 0);
  tab2.agregar(img[15], false, false, false, true, 15, 1);
  tab2.agregar(img[16], true, false, true, false, 16, 0);
  tab2.agregar(img[17], false, false, true, true, 17, 0);
  tab2.agregar(img[18], true, false, true, false, 18, 0);
  tab2.agregar(img[19], false, false, false, false, 19, 0);

  tab2.cargarTablero(5, 4, 110, 110);

  tab2.setValidacion(() => {
    console.log("Validado");
    siguiente.disabled = false;
    sumarTuberia(tab2);
  });

  tab2.setValidar(() => {
    resultados.agregarMaximo([{ area: "ingenieria", valor: 100 }]);
  });

  tab2.setIntentoFallo(() => {
    console.log("Intento");
  });

  tab2.incluirEn("#tuberias__b");

  img = matrixImagen("/img/pizarra/tabla2.png", 110, 110, 6, 3);
  let tab3 = new Pizarra(11, 6, 14);

  tab3.agregar(img[0], false, false, false, false, 0, 1);
  tab3.agregar(img[1], true, false, true, false, 1, 0);
  tab3.agregar(img[2], true, false, false, true, 2, 0);
  tab3.agregar(img[3], true, false, true, false, 3, 0);
  tab3.agregar(img[4], true, false, false, true, 4, 0);
  tab3.agregar(img[5], false, false, false, false, 5, 1);
  tab3.agregar(img[6], false, false, false, true, 6, 1);
  tab3.agregar(img[7], false, false, true, true, 7, 0);
  tab3.agregar(img[8], false, true, false, true, 8, 0);
  tab3.agregar(img[9], false, false, true, true, 9, 0);
  tab3.agregar(img[10], false, false, true, true, 10, 0);
  tab3.agregar(img[11], false, false, true, false, 11, 1);
  tab3.agregar(img[12], false, false, false, false, 12, 1);
  tab3.agregar(img[13], true, false, true, false, 13, 0);
  tab3.agregar(img[14], false, false, false, false, 14, 0);
  tab3.agregar(img[15], false, false, true, true, 15, 0);
  tab3.agregar(img[16], false, true, false, true, 16, 0);
  tab3.agregar(img[17], false, false, false, false, 17, 1);

  tab3.cargarTablero(6, 3, 110, 110);

  tab3.setValidacion(() => {
    console.log("Validado");
    siguiente.disabled = false;
    sumarTuberia(tab3);
  });

  tab3.setIntentoFallo(() => {
    console.log("Intento");
  });

  tab3.setValidar(() => {
    resultados.agregarMaximo([{ area: "ingenieria", valor: 100 }]);
  });

  tab3.incluirEn("#tuberias__c");

  /*Fin de la programacion de tuberias----------------------------------------------*/

  contenedor
    .agregarHTML(document.querySelector(".pinicio"))
    .setAccionFinal(() => {
      mostrar(".zona__navegacion");
      navegacion.colocarTiempo();
      navegacion.colocarProgreso();
    });

  shuffle(preguntas);

  preguntas.forEach(p => {
    contenedor.agregar(p.getPregunta(), 40);
  });

  /*Aqui va la pizzarra**/
  contenedor.agregarHTML(document.querySelector(".ptuberiat")).setAccion(() => {
    ocultar(".zona__navegacion");
    navegacion.ocultarTiempo();
    navegacion.ocultarProgreso();
  });
  contenedor
    .agregar(new Contenido(document.querySelector(".tuberia_tutorial"), tab))
    .setAccion(() => {
      siguiente.disabled = true;
      navegacion.colocarTiempo();
      navegacion.colocarProgreso();
      mostrar(".zona__navegacion");
    });
  contenedor
    .agregar(new Contenido(document.querySelector(".ptuberia1"), tab2))
    .setAccion(() => {
      siguiente.disabled = true;
    });
  contenedor
    .agregar(new Contenido(document.querySelector(".ptuberia2"), tab3))
    .setAccion(() => {
      siguiente.disabled = true;
    });

  preguntas.forEach(p => {
    contenedor.agregar(p.getPregunta(), 40);
    navegacion.colocarTiempo();
    navegacion.colocarProgreso();
  });

  contenedor.incluirEn(document.querySelector(".ppreguntas"));
  navegacion.iniciar();

  ocultar(".zona__navegacion");

  function seguir() {
    siguiente.disabled = false;
    navegacion.setPermitir(true);
    navegacion.siguiente();
  }

  navegacion.setFinal(() => {
    goTo("intraper3");
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
