window.addEventListener("load", function() {
  let contenedor = new Contenedor();
  let navegable = new Navegable(contenedor);

  let tablero = new Relacionar();
  tablero.size(650, 450);
  tablero.setStyleA(250, 440, "20px Heebo", 230, 25);
  tablero.setStyleB(450, 440, "20px Heebo", 230, 25);

  tablero.distancia(300);

  tablero.setIntentoAcierto(() => {
    console.log("bien");
    //tablero.ocultar();
  });

  tablero.setIntentoFallo(() => {
    //tablero.reset();
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
  tablero.setContenedor(".prelacionar");

  tablero.setAccionInicial(function() {
    siguiente.disabled = true;
    navegable.colocarTiempo();
    navegable.colocarProgreso();
    console.log("Ejecuto desde el inicio");
  });

  tablero.setAccionFinal(function() {
    console.log("la actividiad fue finalizada exitosamente");
  });

  let p2 = new Escribir(
    "En el fragmento hay unos cuantos errores de ortografía, encuentralos y corrigelos. Cuando sientas que no hay más errores, haz click sobre el botón siguiente."
  );

  p2.agregar(
    `El hombre no se convierte en hombre más que en una sociedad y solamente por la acción colectiva de la sociedad entera; no se emansipa del llugo de la naturalesa exterior más que por el trabajo colectivo o social y sin esa emancipación material no puede haber emancipación intelectual y moral para nadie. El hombre aislado no puede tener conciencia de su libertad. Ser libre para el hombre sólo es posible por otro hombre, por todos los hombres que le rodean. La libertad no es, pues, un echo de aislamiento, sino de reflección mutua; no de exclución, sino, al contrario, de aliansa, pues la libertad de todo individuo no es otra cosa que el reflejo de su humanidad o de su derecho humano en la consciencia de todos los hombres libres: sus hermanos, sus iguales. No soy verdaderamente libre más que cuando todos los seres humanos que me rodean, hombres y mujeres, son igualmente libres. La libertad de otro, lejos de ser un límite o la negasión de mi libertad, es, al contrario, su condición necesaria y su confirmación. No me ago verdaderamente libre más que por la libertad de los otros... BAKUNIN, M. La Libertad.`
  );

  p2.validarCon(
    "El hombre no se convierte en hombre más que en una sociedad y solamente por la acción colectiva de la sociedad entera; no se emancipa del llego de la naturaleza exterior más que por el trabajo colectivo o social y sin esa emancipación material no puede haber emancipación intelectual y moral para nadie. El hombre aislado no puede tener conciencia de su libertad. Ser libre para el hombre sólo es posible por otro hombre, por todos los hombres que le rodean. La libertad no es, pues, un hecho de aislamiento, sino de reflexión mutua; no de exclusión, sino, al contrario, de alianza, pues la libertad de todo individuo no es otra cosa que el reflejo de su humanidad o de su derecho humano en la consciencia de todos los hombres libres: sus hermanos, sus iguales. No soy verdaderamente libre más que cuando todos los seres humanos que me rodean, hombres y mujeres, son igualmente libres. La libertad de otro, lejos de ser un límite o la negación de mi libertad, es, al contrario, su condición necesaria y su confirmación. No me hago verdaderamente libre más que por la libertad de los otros... BAKUNIN, M. La Libertad.",
    function(
      error_general,
      error_coincidencia,
      error_mayuscula,
      error_puntuacion,
      error_falto
    ) {
      console.log(error_general);

      console.log("Se valido la actividad de texto");
    }
  );

  let p3 = new PreguntaA("3. El fragmento trata principalmente de:");
  p3.agregar("A) El riesgo de la dependencia", []);
  p3.agregar("B) La libertad a través de la conciencia social", [
    { area: "Diseño", valor: 60 },
    { area: "Deportes", valor: 10 },
    { area: "Ingenieria", valor: 40 },
    { area: "Salud", valor: 20 },
    { area: "Educacion", valor: 90 },
    { area: "Fuerza publica", valor: 30 },
    { area: "Arte", valor: 80 },
    { area: "Ciencia", valor: 80 }
  ]);
  p3.agregar("C) El trabajo social", []);
  p3.agregar("D) La democracia", []);

  let p4 = [];
  p4.push(new PreguntaS("frase"));
  p4[0].agregar(".", [{ area: "Educacion", valor: 11 }]);
  p4[0].agregar(",", [{ area: "Educacion", valor: 10 }]);
  p4[0].agregar(":", [{ area: "Educacion", valor: 10 }]);
  p4[0].agregar(";", [{ area: "Educacion", valor: 10 }]);
  p4[0].agregar("!", [{ area: "Educacion", valor: 10 }]);

  p4.push(new PreguntaS());
  p4[1].agregar(".", [{ area: "Educacion", valor: 10 }]);
  p4[1].agregar(",", [{ area: "Educacion", valor: 10 }]);
  p4[1].agregar(":", [{ area: "Educacion", valor: 10 }]);
  p4[1].agregar(";", [{ area: "Educacion", valor: 10 }]);
  p4[1].agregar("!", [{ area: "Educacion", valor: 10 }]);

  p4.push(new PreguntaS());
  p4[2].agregar(".", [{ area: "Educacion", valor: 10 }]);
  p4[2].agregar(",", [{ area: "Educacion", valor: 10 }]);
  p4[2].agregar(":", [{ area: "Educacion", valor: 10 }]);
  p4[2].agregar(";", [{ area: "Educacion", valor: 10 }]);
  p4[2].agregar("!", [{ area: "Educacion", valor: 10 }]);

  p4.push(new PreguntaS());
  p4[3].agregar(".", [{ area: "Educacion", valor: 10 }]);
  p4[3].agregar(",", [{ area: "Educacion", valor: 10 }]);
  p4[3].agregar(":", [{ area: "Educacion", valor: 10 }]);
  p4[3].agregar(";", [{ area: "Educacion", valor: 10 }]);
  p4[3].agregar("!", [{ area: "Educacion", valor: 10 }]);

  p4.push(new PreguntaS());
  p4[4].agregar(".", [{ area: "Educacion", valor: 10 }]);
  p4[4].agregar(",", [{ area: "Educacion", valor: 10 }]);
  p4[4].agregar(":", [{ area: "Educacion", valor: 10 }]);
  p4[4].agregar(";", [{ area: "Educacion", valor: 10 }]);
  p4[4].agregar("!", [{ area: "Educacion", valor: 10 }]);

  p4.push(new PreguntaS());
  p4[5].agregar(".", [{ area: "Educacion", valor: 10 }]);
  p4[5].agregar(",", [{ area: "Educacion", valor: 10 }]);
  p4[5].agregar(":", [{ area: "Educacion", valor: 10 }]);
  p4[5].agregar(";", [{ area: "Educacion", valor: 10 }]);
  p4[5].agregar("!", [{ area: "Educacion", valor: 10 }]);

  p4.push(new PreguntaS());
  p4[6].agregar(".", [{ area: "Educacion", valor: 10 }]);
  p4[6].agregar(",", [{ area: "Educacion", valor: 10 }]);
  p4[6].agregar(":", [{ area: "Educacion", valor: 10 }]);
  p4[6].agregar(";", [{ area: "Educacion", valor: 10 }]);
  p4[6].agregar("!", [{ area: "Educacion", valor: 10 }]);

  p4.push(new PreguntaS());
  p4[7].agregar(".", [{ area: "Educacion", valor: 10 }]);
  p4[7].agregar(",", [{ area: "Educacion", valor: 10 }]);
  p4[7].agregar(":", [{ area: "Educacion", valor: 10 }]);
  p4[7].agregar(";", [{ area: "Educacion", valor: 10 }]);
  p4[7].agregar("!", [{ area: "Educacion", valor: 10 }]);

  p4[0].incluirEn("#s1");
  p4[1].incluirEn("#s2");
  p4[2].incluirEn("#s3");
  p4[3].incluirEn("#s4");
  p4[4].incluirEn("#s5");
  p4[5].incluirEn("#s6");
  p4[6].incluirEn("#s7");
  p4[7].incluirEn("#s8");

  p4result = new PreguntaSall(p4);
  p4result.setContenedor(".pselecciona");

  let p5 = new PreguntaD(
    "4. ¿Del 1 al 3, qué que tan bien crees que te fue en esta prueba?"
  );
  p5.agregar("1", []);
  p5.agregar("2", []);
  p5.agregar("3", []);

  let tableros = [];
  tableros.push(new Tablero_tarjetas());

  tableros[0].agregar(
    "/img/emparejados/card-1.png",
    0,
    "/img/emparejados/card-1.png",
    2
  );
  tableros[0].agregar(
    "/img/emparejados/card-2.png",
    4,
    "/img/emparejados/card-2.png",
    5
  );
  tableros[0].agregar(
    "/img/emparejados/card-3.png",
    1,
    "/img/emparejados/card-3.png",
    3
  );

  tableros[0].iniciar();

  tableros.push(new Tablero_tarjetas());

  tableros[1].agregar(
    "/img/emparejados/card-1.png",
    0,
    "/img/emparejados/card-1.png",
    2
  );
  tableros[1].agregar(
    "/img/emparejados/card-2.png",
    6,
    "/img/emparejados/card-2.png",
    4
  );
  tableros[1].agregar(
    "/img/emparejados/card-3.png",
    3,
    "/img/emparejados/card-3.png",
    8
  );
  tableros[1].agregar(
    "/img/emparejados/card-4.png",
    7,
    "/img/emparejados/card-4.png",
    5
  );
  tableros[1].agregar(
    "/img/emparejados/card-5.png",
    9,
    "/img/emparejados/card-5.png",
    1
  );

  tableros[1].iniciar();

  tableros.push(new Tablero_tarjetas());

  tableros[2].agregar(
    "/img/emparejados/card-1.png",
    0,
    "/img/emparejados/card-1.png",
    2
  );
  tableros[2].agregar(
    "/img/emparejados/card-2.png",
    4,
    "/img/emparejados/card-2.png",
    6
  );
  tableros[2].agregar(
    "/img/emparejados/card-3.png",
    10,
    "/img/emparejados/card-3.png",
    12
  );
  tableros[2].agregar(
    "/img/emparejados/card-4.png",
    18,
    "/img/emparejados/card-4.png",
    1
  );
  tableros[2].agregar(
    "/img/emparejados/card-5.png",
    3,
    "/img/emparejados/card-5.png",
    17
  );
  tableros[2].agregar(
    "/img/emparejados/card-6.png",
    11,
    "/img/emparejados/card-6.png",
    14
  );
  tableros[2].agregar(
    "/img/emparejados/card-7.png",
    13,
    "/img/emparejados/card-7.png",
    19
  );
  tableros[2].agregar(
    "/img/emparejados/card-8.png",
    9,
    "/img/emparejados/card-8.png",
    5
  );
  tableros[2].agregar(
    "/img/emparejados/card-9.png",
    7,
    "/img/emparejados/card-9.png",
    8
  );
  tableros[2].agregar(
    "/img/emparejados/card-10.png",
    15,
    "/img/emparejados/card-10.png",
    16
  );

  tableros[2].iniciar();

  tableros[0].setValidacion(() => {
    console.log("gano");
    if (tableros[0].intentos <= 6) {
      resultados.agregarResultados([{ area: "salud", valor: 100 }]);
    } else if (tableros[0].intentos == 7) {
      resultados.agregarResultados([{ area: "salud", valor: 75 }]);
    } else if (tableros[0].intentos == 8) {
      resultados.agregarResultados([{ area: "salud", valor: 50 }]);
    } else if (tableros[0].intentos == 9) {
      resultados.agregarResultados([{ area: "salud", valor: 25 }]);
    } else if (tableros[0].intentos >= 10) {
    }
    setTimeout(() => {
      seguir();
    }, 1000);
  });

  tableros[1].setValidacion(() => {
    console.log("gano");
    if (tableros[1].intentos <= 8) {
      resultados.agregarResultados([{ area: "salud", valor: 100 }]);
    } else if (tableros[1].intentos == 9) {
      resultados.agregarResultados([{ area: "salud", valor: 83 }]);
    } else if (tableros[1].intentos == 10) {
      resultados.agregarResultados([{ area: "salud", valor: 67 }]);
    } else if (tableros[1].intentos == 11) {
      resultados.agregarResultados([{ area: "salud", valor: 50 }]);
    } else if (tableros[1].intentos >= 12) {
    }
    setTimeout(() => {
      seguir();
    }, 1000);
  });

  tableros[2].setValidacion(() => {
    console.log("gano");
    if (tableros[2].intentos <= 10) {
      resultados.agregarResultados([{ area: "salud", valor: 100 }]);
    } else if (tableros[2].intentos == 11) {
      resultados.agregarResultados([{ area: "salud", valor: 90 }]);
    } else if (tableros[2].intentos == 12) {
      resultados.agregarResultados([{ area: "salud", valor: 80 }]);
    } else if (tableros[2].intentos == 13) {
      resultados.agregarResultados([{ area: "salud", valor: 60 }]);
    } else if (tableros[2].intentos >= 14) {
    }
    setTimeout(() => {
      seguir();
    }, 1000);
  });

  resultados.agregarMaximo([{ area: "salud", valor: 300 }]);

  tableros.forEach(t => {
    t.setIntentoAcierto(() => {
      console.log("acierto");
    });

    t.setIntentoFallo(() => {
      console.log("fallo");
    });
  });

  /**
   * Bloque de arrastre de pintura-------------------------------------------------------------------------------
   */

  let pinturac = new Clasificar();
  pinturac.incluirEn(".pregunta__opciones");

  let sonidos = document.querySelectorAll(".ima__opcion");

  let categoria = ["pintura__casilla1", "mal", "mal", "mal"];
  sonidos.forEach((ele, index) => {
    pinturac.agregar(ele, categoria[index]);
  });

  pinturac.almacenaje(["#pintura__casilla1"], ".pregunta__opciones img");
  pinturac.arrastrables(".ima__opcion", ".pregunta__opciones");

  pinturac.setResetear(s => {
    s.style.margin = "0";
    s.style.left = "0";
    s.style.right = "0";
    s.style.top = "0";
  });

  resultados.agregarMaximo([
    {
      area: "Arte",
      valor: 100
    }
  ]);

  pinturac.setContenedor(".ppintura");

  pinturac.setAccionInicial(function(){
    mostrar(".zona__navegacion");
    navegable.colocarTiempo();
    navegable.colocarProgreso();
  });

  pinturac.setIntentoAcierto(() => {
    console.log("bien");
    siguiente.disabled = false;
    seguir();
    //aqui agregar puntaje cuadno seleccione la imagen A
    resultados.agregarResultados([
      {
        area: "Arte",
        valor: 100
      }
    ]);
  });

  pinturac.setIntentoFallo(() => {
    console.log("mal");
    seguir();
  });

  pinturac.setValidacion(() => {});

  //Navegacion--------------------------------------------

  let siguiente = document.querySelector(".btn_siguiente");

  contenedor.agregarHTML(document.querySelector(".pinicio"));
  contenedor.agregar(tablero.getContenido(), 10);

  contenedor.agregar(p2.getPregunta(), 120).setAccion(() => {
    siguiente.disabled = false;
  });
  contenedor.agregar(p3.getPregunta(), 40).setAccion(() => {
    siguiente.disabled = true;
  });
  contenedor.agregar(p5.getPregunta(), 40);
  contenedor.agregar(p4result.getPregunta(), 50);
  contenedor
    .agregarHTML(document.querySelector(".pemperejado"), 60)
    .setAccion(() => {
      ocultar(".zona__navegacion");
      navegable.colocarTiempo();
      navegable.colocarProgreso();
    });

  contenedor.agregar(tableros[0].getActividad(), 80);
  contenedor.agregar(tableros[1].getActividad(), 100);
  contenedor.agregar(tableros[2].getActividad(), 120);

  contenedor.agregar(pinturac.getContenido());

  contenedor.incluirEn(document.querySelector(".ppreguntas"));
  navegable.iniciar();

  ocultar(".zona__navegacion");

  function seguir() {
    navegable.setPermitir(true);
    navegable.siguiente();
    if (navegable.getActual() == 1) {
      mostrar(".zona__navegacion");
    }
  }

  $(".opcion").click(() => {
    siguiente.disabled = false;
  });

  navegable.setFinal(() => {
    goTo("visual");
  });

  var siguientes = document.querySelectorAll(".continuar");

  function recorrerBotonesContinuar(boton) {
    boton.addEventListener("click", seguir);
  }

  siguientes.forEach(recorrerBotonesContinuar);

  document.addEventListener("keyup", function(event) {
    if (event.key == "p" || event.key == "P") {
      console.log("Salto de actividad");
      seguir();
    }
  });
});
