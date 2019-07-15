window.addEventListener("load", function() {
  let contenedor = new Contenedor();
  let navegacion = new Navegable(contenedor);

  var matematica = new PreguntaA(
    "La Empresa Eléctrica va instalar postes equidistantes cada 5m a lo largo de un pasaje de 95m de tal forma que haya uno al inicio y otro al final. Además emplean 15 minutos para colocar cada poste. ¿Cuánto tiempo demorarán en colocar todos los postes?"
  );
  matematica.agregar("4 horas y 45 minutos", []);
  matematica.agregar("5 horas", [
    { area: "Diseño", valor: 30 },
    { area: "Deportes", valor: 10 },
    { area: "Ingenieria", valor: 90 },
    { area: "Salud", valor: 50 },
    { area: "Educacion", valor: 50 },
    { area: "Fuerza publica", valor: 10 },
    { area: "Arte", valor: 20 },
    { area: "Ciencia", valor: 80 }
  ]);
  matematica.agregar("3 horas", []);
  matematica.agregar("2 horas y 30 minutos", []);
  var matematica2 = new PreguntaA(
    "Determina el valor entero más grande posible de n para que 2^n divida a 50^8"
  );
  matematica2.agregar("2", []);
  matematica2.agregar("6", []);
  matematica2.agregar("8", [
    { area: "Diseño", valor: 30 },
    { area: "Deportes", valor: 10 },
    { area: "Ingenieria", valor: 90 },
    { area: "Salud", valor: 50 },
    { area: "Educacion", valor: 50 },
    { area: "Fuerza publica", valor: 10 },
    { area: "Arte", valor: 20 },
    { area: "Ciencia", valor: 80 }
  ]);
  matematica2.agregar("10", []);
  var matematica3 = new PreguntaA("Si x^2 =3 a que es igual x^6?");
  matematica3.agregar("9", []);
  matematica3.agregar("6", []);
  matematica3.agregar("27", [
    { area: "Diseño", valor: 30 },
    { area: "Deportes", valor: 10 },
    { area: "Ingenieria", valor: 90 },
    { area: "Salud", valor: 50 },
    { area: "Educacion", valor: 50 },
    { area: "Fuerza publica", valor: 10 },
    { area: "Arte", valor: 20 },
    { area: "Ciencia", valor: 80 }
  ]);
  matematica3.agregar("10", []);
  var matematica4 = new PreguntaD(
    "¿Del 1 al 3, qué que tan bien crees que te fue en esta prueba?"
  );
  matematica4.agregar("1", []);
  matematica4.agregar("2", []);
  matematica4.agregar("3", []);
  contenedor.agregarHTML(document.querySelector(".pinicio"));
  contenedor.agregar(matematica.getPregunta(), 40).setAccion(function() {
    navegacion.colocarTiempo();
    navegacion.colocarProgreso();
    mostrar(".zona__navegacion");
  });
  contenedor.agregar(matematica2.getPregunta(), 40).setAccion(function() {});
  contenedor.agregar(matematica3.getPregunta(), 40).setAccion(function() {});
  contenedor.agregar(matematica4.getPregunta(), 40).setAccion(function() {
    siguiente.disabled = false;
    console.log("aaa");
  });
  contenedor
    .agregarHTML(document.querySelector(".secuencias"))
    .setAccion(() => {
      loadJson("/data/ciencias/secuencias.json", r => {
        let secuencias = [];
        let actual = 0;
        let nactual = 0;
        let s = r.secuencias;

        for (let i = 0; i < s.length; i++) {
          let e = s[i];
          let se = new Secuencias();
          for (let j = 0; j < e.recursos.length; j++) {
            let re = e.recursos[j];
            let ima = document.createElement("img");
            ima.src = re.src;
            se.agregar(ima, re.tiempo);
          }
          secuencias.push(se);
        }
        secuencias.forEach((secuencia, index) => {
          secuencia.crearTablero();
          secuencia.setIntentoAcierto(() => {
            console.log("acierto");
          });
          secuencia.setIntentoFallo(() => {
            console.log("fallo");
            secuencias[actual].terminar();

            actual++;

            if (actual < secuencias.length) {
              secuencias[actual].start();
              $(".secuencias").append(secuencias[actual].getElemento());
            } else {
              // seguir();
            }
          });

          secuencia.setValidacion(vali => {
            console.log("validado");

            if (vali) {
              console.log("gano");
              //  seguir();
            }
            nactual++;
            console.log(nactual);

            if (nactual >= 3) {
              seguir();
            }

            secuencias[actual].terminar();
            actual++;
            if (actual < secuencias.length) {
              secuencias[actual].start();
              $(".secuencias").append(secuencias[actual].getElemento());
            } else {
            }
          });
          if (index == 0) {
            secuencia.start();
            $(".secuencias").append(secuencia.getElemento());
          }
        });
      });
    });
  contenedor.incluirEn(document.querySelector(".ppreguntas"));
  navegacion.iniciar();
  var siguiente = document.querySelector(".btn_siguiente");

  function seguir() {
    navegacion.setPermitir(true);
    navegacion.siguiente();
    if (navegacion.getActual() != 4) {
      siguiente.disabled = true;
    }
  }

  $(".opcion").click(() => {
    siguiente.disabled = false;
  });

  navegacion.setFinal(() => {
    goTo("bintraper");
  });

  //Configuracion de el avance entre actividades
  var siguientes = document.querySelectorAll(".continuar");

  function recorrerBotonesContinuar(boton) {
    boton.addEventListener("click", seguir);
  }

  siguientes.forEach(recorrerBotonesContinuar);
});
