window.addEventListener("load", function() {
  let contenedor = new Contenedor();
  let navegacion = new Navegable(contenedor);

  var preguntas = [];
  let temp__pregunta = new PreguntaD(
    "Prefiro guiarme más por mi experiencia que por mi imaginación",
    "Imaginación",
    "Experiencia"
  );
  temp__pregunta.agregar("1", [{ area: "Diseño", valor: 20 }]);
  temp__pregunta.agregar("2", [
    { area: "Educacion", valor: 10 },
    { area: "Fuerza publica", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [
    { area: "Ingenieria", valor: 20 },
    { area: "Salud", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Suelo ser más apasionado que objetivo",
    "Apasionado",
    "Objetivo"
  );
  temp__pregunta.agregar("1", [{ area: "Arte", valor: 20 }]);
  temp__pregunta.agregar("2", [
    { area: "Diseño", valor: 10 },
    { area: "Deportes", valor: 5 },
    { area: "Salud", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [
    { area: "Ingenieria", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me siento mas comodo trabajando  con maquinas que con personas",
    "Maquinas",
    "Personas"
  );
  temp__pregunta.agregar("1", [
    { area: "Ingenieria", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Fuerza publica", valor: 10 }]);
  temp__pregunta.agregar("3", [
    { area: "Salud", valor: 20 },
    { area: "Educacion", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "A la hora de estudiar, me da tranquilidad organizar los temas antes de empezar",
    "Improvizar",
    "Organizado"
  );
  temp__pregunta.agregar("1", [{ area: "Arte", valor: 20 }]);
  temp__pregunta.agregar("2", [{ area: "Deportes", valor: 5 }]);
  temp__pregunta.agregar("3", [
    { area: "Ingenieria", valor: 20 },
    { area: "Educacion", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "A la hora de trabajar, ¿Prefiero improvisar o planear?",
    "Improvizar",
    "Organizado"
  );
  temp__pregunta.agregar("1", [
    { area: "Salud", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Diseño", valor: 10 }]);
  temp__pregunta.agregar("3", [{ area: "Ingenieria", valor: 20 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Prefiero dedicarle tiempo a los detalles que valerme del contenido general",
    "Detalles",
    "Contenido General"
  );
  temp__pregunta.agregar("1", [
    { area: "Ingenieria", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [
    { area: "Diseño", valor: 10 },
    { area: "Salud", valor: 10 },
    { area: "Ciencia", valor: 10 }
  ]);
  temp__pregunta.agregar("3", []);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me dan explosiones de inspiración mientas hago otra actividad",
    "Inspiración",
    "Actividad actual"
  );
  temp__pregunta.agregar("1", [{ area: "Arte", valor: 20 }]);
  temp__pregunta.agregar("2", [
    { area: "Diseño", valor: 10 },
    { area: "Ciencia", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [
    { area: "Deportes", valor: 10 },
    { area: "Ingenieria", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me agrada realizar las actividades a mi modo y no necesariamente como lo hacen los demas",
    "Mi modo",
    "El modo establecido"
  );
  temp__pregunta.agregar("1", [{ area: "Arte", valor: 20 }]);
  temp__pregunta.agregar("2", [
    { area: "Diseño", valor: 10 },
    { area: "Ingenieria", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [
    { area: "Deportes", valor: 10 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me gusta buscar patrones en el ambiente que me rodea",
    "Patrones",
    "Sin Patrones"
  );
  temp__pregunta.agregar("1", [
    { area: "Arte", valor: 10 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [
    { area: "Diseño", valor: 10 },
    { area: "Ingenieria", valor: 10 },
    { area: "Fuerza publica", valor: 10 }
  ]);
  temp__pregunta.agregar("3", []);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me llena investigar  acerca de inventos o descubrimientos que me ayuden a entender el mundo",
    "Curioso",
    "Zona de confort"
  );
  temp__pregunta.agregar("1", [
    { area: "Diseño", valor: 20 },
    { area: "Arte", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", []);
  temp__pregunta.agregar("3", [{ area: "Fuerza publica", valor: 20 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Prefiero comprobar la veracidad de las cosas yo mismo",
    "Comprobar",
    "No comprobar"
  );
  temp__pregunta.agregar("1", [
    { area: "Salud", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [
    { area: "Diseño", valor: 10 },
    { area: "Ingenieria", valor: 10 },
    { area: "Arte", valor: 10 }
  ]);
  temp__pregunta.agregar("3", []);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Prefiero planificar detalladamente mis pasos antes de actuar",
    "Detalles",
    "Actuar"
  );
  temp__pregunta.agregar("1", [
    { area: "Ingenieria", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Salud", valor: 10 }]);
  temp__pregunta.agregar("3", [{ area: "Arte", valor: 20 }]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Me hace feliz que los demas se puedan enriquecer con lo que les cuento",
    "Compartir",
    "Reservarmelos"
  );
  temp__pregunta.agregar("1", [
    { area: "Educacion", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Salud", valor: 10 }]);
  temp__pregunta.agregar("3", [
    { area: "Ingenieria", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Es agradable para mi tratar con gente mas joven ya que se me facilita ser paciente",
    "Paciente",
    "Impaciente"
  );
  temp__pregunta.agregar("1", [{ area: "Educacion", valor: 20 }]);
  temp__pregunta.agregar("2", [
    { area: "Ingenieria", valor: 10 },
    { area: "Arte", valor: 10 }
  ]);
  temp__pregunta.agregar("3", []);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    " Me encanta aprender, suelo leer incluso mas de lo que me piden",
    "Leer",
    "No leer"
  );
  temp__pregunta.agregar("1", [
    { area: "Educacion", valor: 20 },
    { area: "Ciencia", valor: 20 }
  ]);
  temp__pregunta.agregar("2", [{ area: "Salud", valor: 10 }]);
  temp__pregunta.agregar("3", [
    { area: "Fuerza publica", valor: 20 },
    { area: "Arte", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  temp__pregunta = new PreguntaD(
    "Disfruto de hablar en publico, soy bueno exponiendo",
    "Comunicación",
    "No comunicación"
  );
  temp__pregunta.agregar("1", [{ area: "Educacion", valor: 20 }]);
  temp__pregunta.agregar("2", [
    { area: "Diseño", valor: 10 },
    { area: "Arte", valor: 10 }
  ]);
  temp__pregunta.agregar("3", [
    { area: "Deportes", valor: 10 },
    { area: "Fuerza publica", valor: 20 }
  ]);
  preguntas.push(temp__pregunta);

  let laberinto = new Laberinto();
  laberinto.size(801.63, 455, 16, 0.5);
  laberinto.crearLaberinto(
    "/img/laberinto/laberinto-2.png",
    801.63,
    455,
    16,
    0.5
  );
  laberinto.crearMeta(0, 405, 50, 30);
  laberinto.crearCursor(790, 232);

  laberinto.setIntentoAcierto(() => {
    console.log("Va bien");
  });
  laberinto.setIntentoFallo(() => {
    console.log("Perdio");
    seguir();
  });

  laberinto.setValidacion(() => {
    console.log("Gano");
    seguir();
  });

  laberinto.incluirEn("#laberinto");

  contenedor.agregar(laberinto.getContenido()).setAccion(() => {
    ocultar(".zona__navegacion");
  });

  contenedor.agregarHTML(document.querySelector(".pinicio")).setAccion(() => {
    navegacion.ocultarProgreso();
    navegacion.ocultarTiempo();
  });
  shuffle(preguntas);

  preguntas.forEach(p => {
    contenedor.agregar(p.getPregunta(), 40);
    navegacion.colocarTiempo();
    navegacion.colocarProgreso();
  });

  var siguiente = document.querySelector(".btn_siguiente");

  contenedor.incluirEn(document.querySelector(".ppreguntas"));
  navegacion.iniciar();

  ocultar(".zona__navegacion");

  function seguir() {
    mostrar(".zona__navegacion");
    navegacion.setPermitir(true);
    navegacion.siguiente();
    siguiente.disabled = false;
  }

  opciones = document.querySelectorAll(".opcion_check");

  opciones.forEach(function(opcion) {
    opcion.addEventListener("click", function() {
      siguiente.disabled = false;
    });
  });

  navegacion.setFinal(() => {
    goTo("intraper2");
  });

  //Configuracion de el avance entre actividades
  var siguientes = document.querySelectorAll(".continuar");

  function recorrerBotonesContinuar(boton) {
    boton.addEventListener("click", seguir);
  }

  siguientes.forEach(recorrerBotonesContinuar);
});
