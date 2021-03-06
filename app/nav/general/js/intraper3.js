window.addEventListener("load", function() {


  let contenedor = new Contenedor();
  let navegacion = new Navegable(contenedor);

  var preguntas = [];

  let temp__pregunta = new PreguntaD(
    "¿Cuántas veces he peleado físicamente con algún compañero del colegio?",
    "Ninguna",
    "3 veces o más"
  );
  temp__pregunta.agregar("1", [
    { area: "Deportes", valor: 10 },
    { area: "Educacion", valor: 20 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Ingenieria", valor: 10 }]);
  temp__pregunta.agregar("3", [
    { area: "Deportes", valor: -10 },
    { area: "Educacion", valor: -20 },
    { area: "Fuerza publica", valor: -10 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "¿En el último año cuántas veces has evaluado tu progreso en el hobby que más te gusta?",
    "Ninguna vez",
    "Más de 2 veces"
  );
  temp__pregunta.agregar("1", [
    { area: "Deportes", valor: -10 },
    { area: "Educacion", valor: -10 },
    { area: "Arte", valor: -10 }
  ]);
  temp__pregunta.agregar("2", []);
  temp__pregunta.agregar("3", [
    { area: "Deportes", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me considero una persona amigable ",
    "Totalmente de acuerdo",
    "En desacuerdo"
  );
  temp__pregunta.agregar("1", [
    { area: "Diseño", valor: 10 },
    { area: "Educacion", valor: 20 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Ingenieria", valor: 20 }]);
  temp__pregunta.agregar("3", [
    { area: "Deportes", valor: 10 },
    { area: "Arte", valor: 10 },
    { area: "Fuerza publica", valor: -10 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me considero una persona empática",
    "Totalmente de acuerdo",
    "En desacuerdo"
  );
  temp__pregunta.agregar("1", [
    { area: "Diseño", valor: 20 },
    { area: "Salud", valor: 20 },
    { area: "Educacion", valor: 20 },
    { area: "Fuerza publica", valor: 10 }
  ]);
  temp__pregunta.agregar("2", []);
  temp__pregunta.agregar("3", [
    { area: "Ingenieria", valor: 10 },
    { area: "Educacion", valor: -20 },
    { area: "Ciencia", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  /****--------------------------------------------------------*/

  let p1 = new PreguntaP(
    `<h1>3. ¿Qué te genera esta imagen?</h1>`,
    `<img src="https://i.dailymail.co.uk/i/pix/2015/04/02/08/2735C84000000578-0-image-a-12_1427961361702.jpg" style="width: 45%">`
  );
  p1.agregarB(`<h2>a</h2><h3>) Vertigo</h3>`, [
    { area: "Fuerza publica", valor: -30 }
  ]);
  p1.agregarB(`<h2>b</h2><h3>) Indiferencia</h3>`, []);
  p1.agregarB(`<h2>c</h2><h3>) Adrenalina</h3>`, [
    { area: "Fuerza publica", valor: 30 }
  ]);
  p1.agregarClase("pestilo3");

  let p2 = new PreguntaP(
    `<h1>3. ¿Qué te genera esta imagen?</h1>`,
    `<img src="http://www.cirugiapie.com/uploads/1/6/3/5/1635593/4726661_orig.jpeg" style="width: 45%">`
  );
  p2.agregarB(`<h2>a</h2><h3>) Repulsión</h3>`, []);
  p2.agregarB(`<h2>b</h2><h3>) Indiferencia</h3>`, [
    { area: "Diseño", valor: 10 },
    { area: "Deportes", valor: 10 },
    { area: "Educacion", valor: 10 },
    { area: "Arte", valor: 10 }
  ]);
  p2.agregarB(`<h2>c</h2><h3>) Curiosidad</h3>`, [
    { area: "Salud", valor: 20 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  p2.agregarClase("pestilo3");

  let p3 = new PreguntaP(
    `<h1>3. ¿Qué te genera esta imagen?</h1>`,
    `<img src="https://live.staticflickr.com/1218/615140382_5ccf6db863_b.jpg" style="width: 45%">`
  );
  p3.agregarB(`<h2>a</h2><h3>) Ansiedad</h3>`, [
    { area: "Salud", valor: -30 },
    { area: "Ciencia", valor: -30 }
  ]);
  p3.agregarB(`<h2>b</h2><h3>) Indiferencia</h3>`, []);
  p3.agregarB(`<h2>c</h2><h3>) Tranquilidad</h3>`, [
    { area: "Salud", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  p3.agregarClase("pestilo3");

  let p4 = new PreguntaP(
    `<h1>3. ¿Qué te genera esta imagen?</h1>`,
    `<img src="https://i0.wp.com/Laughshop.com/wp-content/uploads/2016/09/Massage-The-Rapist.jpg" style="width: 35%">`
  );
  p4.agregarB(`<h2>a</h2><h3>) Ansiedad</h3>`, [{ area: "Diseño", valor: 20 }]);
  p4.agregarB(`<h2>b</h2><h3>) Indiferencia</h3>`, [
    { area: "Arte", valor: 10 }
  ]);
  p4.agregarB(`<h2>c</h2><h3>) Tranquilidad</h3>`, [
    { area: "Diseño", valor: -30 }
  ]);
  p4.agregarClase("pestilo3");

  /******************/

  contenedor.agregarHTML(document.querySelector(".pinicio"));

  shuffle(preguntas);

  preguntas.forEach(p => {
    contenedor.agregar(p.getPregunta(), 40);
    navegacion.colocarTiempo();
    navegacion.colocarProgreso();
  });

  //-------------------Agregar fobias-------------
  contenedor.agregar(p1.getPregunta());
  contenedor.agregar(p2.getPregunta());
  contenedor.agregar(p3.getPregunta());
  contenedor.agregar(p4.getPregunta());
  //----------------------------------------------

  var siguiente = document.querySelector(".btn_siguiente");

  contenedor.incluirEn(document.querySelector(".ppreguntas"));
  navegacion.iniciar();

  ocultar(".zona__navegacion");

  function seguir() {
    navegacion.setPermitir(true);
    navegacion.siguiente();
    mostrar(".zona__navegacion");
    siguiente.disabled = false;
  }

  navegacion.setFinal(() => {
    goTo("intraper4");
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
