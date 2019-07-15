window.addEventListener("load", function() {
  let contenedor = new Contenedor();
  let navegacion = new Navegable(contenedor);
  let siguiente = document.querySelector(".btn_siguiente");
  ocultar(".zona__navegacion");

  let p1 = new PreguntaP(
    `<img style="width:100%; height="100%; src="/img/preguntasGenerales/VisualEspacial/secuenciaOctagono.png" alt="">`,
    `<h3>1. Elige la imagen que continúa la secuencia</h3>`
  );
  p1.agregarB(
    `<h2>a)</h2><img src="/img/preguntasGenerales/VisualEspacial/octagonoA.png" alt="">`,
    []
  );
  p1.agregarB(
    `<h2>b)</h2><img src="/img/preguntasGenerales/VisualEspacial/octagonoB.png" alt="">`,
    []
  );
  p1.agregarB(
    `<h2>c)</h2><img src="/img/preguntasGenerales/VisualEspacial/octagonoC.png" alt="">`,
    []
  );
  p1.agregarB(
    `<h2>d)</h2><img src="/img/preguntasGenerales/VisualEspacial/octagonoD.png" alt="">`,
    [
      { area: "Diseño", valor: 70 },
      { area: "Deportes", valor: 60 },
      { area: "Ingenieria", valor: 50 },
      { area: "Salud", valor: 50 },
      { area: "Educacion", valor: 30 },
      { area: "Fuerza publica", valor: 50 },
      { area: "Arte", valor: 70 },
      { area: "Ciencia", valor: 10 }
    ]
  );
  p1.agregarClase("pestilo2");

  let p2 = new PreguntaI(
    `<h1>2. Elige la imagen donde el cuadro azul más claro esté en el centro</h1>`,
    `<h3>1. Elige la imagen que continúa la secuencia</h3>`
  );
  p2.agregar(
    `<h2>a)</h2><img style="width:260px; margin: 15px;" src="/img/preguntasGenerales/VisualEspacial/centroazulA.png" alt="">`,
    [
      { area: "Diseño", valor: 70 },
      { area: "Deportes", valor: 60 },
      { area: "Ingenieria", valor: 50 },
      { area: "Salud", valor: 50 },
      { area: "Educacion", valor: 30 },
      { area: "Fuerza publica", valor: 50 },
      { area: "Arte", valor: 70 },
      { area: "Ciencia", valor: 10 }
    ]
  );
  p2.agregar(
    `<h2>b)</h2><img style="width:260px; margin: 15px;" src="/img/preguntasGenerales/VisualEspacial/centroazulB.png" alt="">`,
    []
  );
  p2.agregar(
    `<h2>c)</h2><img style="width:260px; margin: 15px;" src="/img/preguntasGenerales/VisualEspacial/centroazulC.png" alt="">`,
    []
  );
  p2.agregar(
    `<h2>d)</h2><img style="width:260px; margin: 15px;" src="/img/preguntasGenerales/VisualEspacial/centroazulD.png" alt="">`,
    []
  );

  let p3 = new PreguntaP(
    `<h1>3. Elige la imagen que continúa la secuencia (IMG3)</h1>`,
    `<img src="/img/preguntasGenerales/VisualEspacial/secuenciaRelog.png">`
  );
  p3.agregarB(
    `<h2>a)</h2><img src="/img/preguntasGenerales/VisualEspacial/relogA.png" alt="">`,
    []
  );
  p3.agregarB(
    `<h2>b)</h2><img src="/img/preguntasGenerales/VisualEspacial/relogB.png" alt="">`,
    [
      { area: "Diseño", valor: 70 },
      { area: "Deportes", valor: 60 },
      { area: "Ingenieria", valor: 50 },
      { area: "Salud", valor: 50 },
      { area: "Educacion", valor: 30 },
      { area: "Fuerza publica", valor: 50 },
      { area: "Arte", valor: 70 },
      { area: "Ciencia", valor: 10 }
    ]
  );
  p3.agregarB(
    `<h2>c)</h2><img src="/img/preguntasGenerales/VisualEspacial/relogC.png" alt="">`,
    []
  );
  p3.agregarB(
    `<h2>d)</h2><img src="/img/preguntasGenerales/VisualEspacial/relogD.png" alt="">`,
    []
  );
  p3.agregarClase("pestilo3");

  let p4 = new PreguntaP(
    `<h1>4. Indica cual/es de los siguientes cubos podrían formarse a partir de la figura desplegada. Puede existir más de una respuesta correcta.</h1>`,
    `<img src="/img/preguntasGenerales/VisualEspacial/secuenciaFiguras.png">`
  );
  p4.agregarB(
    `<h2>a)</h2><img src="/img/preguntasGenerales/VisualEspacial/figurasA.png" alt="">`,
    []
  );
  p4.agregarB(
    `<h2>b)</h2><img src="/img/preguntasGenerales/VisualEspacial/figurasB.png" alt="">`,
    []
  );
  p4.agregarB(
    `<h2>c)</h2><img src="/img/preguntasGenerales/VisualEspacial/figurasC.png" alt="">`,
    [
      { area: "Diseño", valor: 70 },
      { area: "Deportes", valor: 60 },
      { area: "Ingenieria", valor: 50 },
      { area: "Salud", valor: 50 },
      { area: "Educacion", valor: 30 },
      { area: "Fuerza publica", valor: 50 },
      { area: "Arte", valor: 70 },
      { area: "Ciencia", valor: 10 }
    ]
  );
  p4.agregarB(
    `<h2>d)</h2><img src="/img/preguntasGenerales/VisualEspacial/figurasD.png" alt="">`,
    [
      { area: "Diseño", valor: 70 },
      { area: "Deportes", valor: 60 },
      { area: "Ingenieria", valor: 50 },
      { area: "Salud", valor: 50 },
      { area: "Educacion", valor: 30 },
      { area: "Fuerza publica", valor: 50 },
      { area: "Arte", valor: 70 },
      { area: "Ciencia", valor: 10 }
    ]
  );
  p4.agregarClase("pestilo4");

  let p5 = new PreguntaP(
    `<h1>5. Encuentra la opción correcta.</h1>`,
    `<img src="/img/preguntasGenerales/VisualEspacial/referenciaCuadrilatero.png">`
  );
  p5.agregarB(
    `<h2>a)</h2><img src="/img/preguntasGenerales/VisualEspacial/cuadrilateroA.png" alt="">`,
    []
  );
  p5.agregarB(
    `<h2>b)</h2><img src="/img/preguntasGenerales/VisualEspacial/cuadrilateroB.png" alt="">`,
    []
  );
  p5.agregarB(
    `<h2>c)</h2><img src="/img/preguntasGenerales/VisualEspacial/cuadrilateroC.png" alt="">`,
    [
      { area: "Diseño", valor: 70 },
      { area: "Deportes", valor: 60 },
      { area: "Ingenieria", valor: 50 },
      { area: "Salud", valor: 50 },
      { area: "Educacion", valor: 30 },
      { area: "Fuerza publica", valor: 50 },
      { area: "Arte", valor: 70 },
      { area: "Ciencia", valor: 10 }
    ]
  );
  p5.agregarB(
    `<h2>d)</h2><img src="/img/preguntasGenerales/VisualEspacial/cuadrilateroD.png" alt="">`,
    []
  );
  p5.agregarClase("pestilo4");

  let palo = new Palillos();
  palo.size(300, 350);

  //------------------------------------------------------------------------------------
  palo.almacenarEn("#palillosn1__almacen");

  palo.crear(0, 0, "vertical");
  palo.crear(0, 0, "diagonalRightDown");
  palo.crear(0, 120, "diagonalRightTop");

  palo.crear(260, -10, "diagonalLeftDown");
  palo.crear(260, 110, "diagonalLeftTop");
  palo.crear(260, -10, "vertical");

  palo.crear(125, 60, "vertical");
  palo.crear(0, 130, "diagonalRightDown");
  palo.crear(260, 120, "diagonalLeftDown");

  palo.crear(120, 190, "vertical");
  palo.crear(260, 240, "diagonalLeftTop");
  palo.crear(260, 120, "vertical");
  palo.crear(130, 320, "diagonalRightTop");

  palo.incluirEn("#palillosn1");

  function sumarPalillos(pall) {
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

  palo.setValidar(() => {
    resultados.agregarMaximo([{ area: "ingenieria", valor: 100 }]);
  });
  palo.setResultado(r => {
    console.log(r);
    if (palo.equals(r, "0,1,2,3,5,7,9,10,11,12")) {
      console.log("gano");
      sumarPalillos(palo);
    }
  });

  let palo2 = new Palillos();
  palo2.size(400, 400);
  palo2.cuadrado();

  palo2.agregar(4);
  palo2.agregar(5);
  palo2.agregar(7);
  palo2.agregar(8);
  palo2.agregar(9);
  palo2.agregar(11);
  palo2.agregar(12);
  palo2.agregar(14);
  palo2.agregar(16);
  palo2.agregar(15);
  palo2.agregar(18);
  palo2.agregar(19);

  palo2.incluirEn("#palillosn2");

  palo2.setValidar(() => {
    resultados.agregarMaximo([{ area: "ingenieria", valor: 100 }]);
  });

  palo2.setResultado(r => {
    console.log(r);
    if (palo.equals(r, "1,4,5,7,8,9,10,11,12,13,14,16")) {
      console.log("gano");
      sumarPalillos(palo2);
    } else if (palo.equals(r, "5,19,1,8,15,22,4,11,18,7,14,10")) {
      console.log("gano");
      sumarPalillos(palo2);
    } else if (palo.equals(r, "5,12,19,1,8,15,22,4,18,9,16,13")) {
      console.log("gano");
      sumarPalillos(palo2);
    } else if (palo.equals(r, "22,18,19,7,15,9,10,11,12,13,14,16")) {
      console.log("gano");
      sumarPalillos(palo2);
    }
  });

  // rompecabezaCabeza 1

  let width = 113;
  let columnas = 4;
  let filas = 4;
  var tab = new Tablero(columnas, filas, width);

  let imagenes = matrixImagen(
    "/img/diseno/rompecabeza2.png",
    width,
    width,
    columnas,
    filas
  );

  let orden = [1, 3, 9, 5, 11, 8, 0, 7, 15, 6, 13, 2, 4, 14, 10, 12];

  for (let i = 0; i < imagenes.length; i++) {
    let e = imagenes[i];
    tab.agregar(e, orden[i], i, 0);
  }

  resultados.agregarMaximo([{ area: "diseño", valor: 200 }]);

  tab.iniciar();
  tab.incluirEn(".table__rompecabezas");
  tab.activarArrastre();
  //tab.activarRotacion();
  //tab.setPlaceholder();

  tab.setValidar(() => {
    if (tab.intentos <= 15) {
      resultados.agregarResultados([{ area: "diseño", valor: 100 }]);
    } else if (tab.intentos > 15 && tab.intentos <= 20) {
      resultados.agregarResultados([{ area: "diseño", valor: 75 }]);
    } else if (tab.intentos > 20 && tab.intentos <= 30) {
      resultados.agregarResultados([{ area: "diseño", valor: 50 }]);
    }
  });

  tab.setValidacion(() => {
    alert("Felicitaciones Ganaste");
    siguiente.disabled = false;
  });

  tab.setIntentoFallo(i => {
    console.log("Sigue intentando: " + i);
    if (i > 5) {
    }
  });

  width = 180;
  columnas = 2;
  filas = 3;
  var tab2 = new Tablero(columnas, filas, width);

  imagenes = matrixImagen(
    "/img/diseno/rompecabeza1.png",
    width,
    width,
    columnas,
    filas
  );

  orden = [1, 2, 5, 0, 3, 4];
  let rotacion = [1, 3, 1, 0, 2, 1];

  for (let i = 0; i < imagenes.length; i++) {
    let e = imagenes[i];
    tab2.agregar(e, orden[i], i, rotacion[i] * 90);
  }

  tab2.iniciar();
  tab2.incluirEn(".table__rompecabezas2");
  tab2.activarArrastre();
  tab2.activarRotacion();
  //tab.setPlaceholder();

  tab2.setValidacion(() => {
    alert("Felicitaciones Ganaste");
    siguiente.disabled = false;
  });

  tab2.setIntentoFallo(intentos => {
    console.log("Sigue intentando: " + intentos);
  });

  tab2.setValidar(() => {
    if (tab2.intentos <= 15) {
      resultados.agregarResultados([{ area: "diseño", valor: 100 }]);
    } else if (tab2.intentos > 15 && tab2.intentos <= 20) {
      resultados.agregarResultados([{ area: "diseño", valor: 75 }]);
    } else if (tab2.intentos > 20 && tab2.intentos <= 30) {
      resultados.agregarResultados([{ area: "diseño", valor: 50 }]);
    }
  });

  contenedor
    .agregar(new Contenido(document.querySelector(".table__rompecabezas"), tab))
    .setAccion(() => {
      mostrar(".zona__navegacion");
      siguiente.disabled = false;
    });
  contenedor
    .agregar(
      new Contenido(document.querySelector(".table__rompecabezas2"), tab2)
    )
    .setAccion(() => {
      mostrar(".zona__navegacion");
      siguiente.disabled = false;
    });

  contenedor.agregarHTML(document.querySelector(".pinicio"));
  contenedor.agregar(p1.getPregunta()).setAccion(() => {
    siguiente.disabled = true;
    mostrar(".zona__navegacion");
    navegacion.colocarTiempo();
    navegacion.colocarProgreso();
  });

  contenedor.agregar(p2.getPregunta()).setAccion(() => {
    siguiente.disabled = true;
  });
  contenedor.agregar(p3.getPregunta()).setAccion(() => {
    siguiente.disabled = true;
  });
  contenedor.agregar(p4.getPregunta()).setAccion(() => {
    siguiente.disabled = true;
  });
  contenedor.agregar(p5.getPregunta()).setAccion(() => {
    siguiente.disabled = true;
  });

  contenedor.agregarHTML(document.querySelector(".ppalillos")).setAccion(() => {
    navegacion.ocultarTiempo();
    navegacion.ocultarProgreso();
    ocultar(".zona__navegacion");
    siguiente.disabled = false;
  });
  contenedor
    .agregar(new Contenido(document.querySelector(".ppalillosn1"), palo))
    .setAccion(() => {
      navegacion.colocarTiempo();
      navegacion.colocarProgreso();
      mostrar(".zona__navegacion");
      siguiente.disabled = false;
    });

  contenedor
    .agregar(new Contenido(document.querySelector(".ppalillosn2"), palo2))
    .setAccion(() => {
      navegacion.colocarTiempo();
      navegacion.colocarProgreso();
      mostrar(".zona__navegacion");
      siguiente.disabled = false;
    });

  contenedor.incluirEn(document.querySelector(".ppreguntas"));

  navegacion.iniciar();

  function seguir() {
    siguiente.disabled = true;
    navegacion.setPermitir(true);
    navegacion.siguiente();
  }

  $(".opcion").click(() => {
    siguiente.disabled = false;
  });

  $(".opcion_check").click(() => {
    siguiente.disabled = false;
  });

  navegacion.setFinal(() => {
    goTo("matematicas");
  });

  //Configuracion de el avance entre actividades
  var siguientes = document.querySelectorAll(".continuar");

  function recorrerBotonesContinuar(boton) {
    boton.addEventListener("click", seguir);
  }

  siguientes.forEach(recorrerBotonesContinuar);
});
