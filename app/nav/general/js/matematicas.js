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


  let secuencias = [];

  secuencias.push(new Secuencia());
  secuencias[0].agregarImg("/img/ciencias/elementos/calcio.png", 5);
  secuencias[0].agregarImg("/img/ciencias/elementos/sodio.png", 5);
  secuencias[0].agregarImg("/img/ciencias/elementos/potasio.png", 5);
  secuencias[0].crearTablero();
  secuencias[0].incluirEn(".secuenciasa");


  secuencias.push(new Secuencia());
  secuencias[1].agregarImg("/img/ciencias/elementos/calcio.png", 3);
  secuencias[1].agregarImg("/img/ciencias/elementos/sodio.png", 3);
  secuencias[1].agregarImg("/img/ciencias/elementos/potasio.png", 3);
  secuencias[1].agregarImg("/img/ciencias/elementos/carbon.png", 4);
  secuencias[1].agregarImg("/img/ciencias/elementos/oro.png", 4); 
  secuencias[1].crearTablero();
  secuencias[1].incluirEn(".secuenciasb");

  secuencias.push(new Secuencia());
  secuencias[2].agregarImg("/img/ciencias/elementos/calcio.png", 2);
  secuencias[2].agregarImg("/img/ciencias/elementos/sodio.png", 2);
  secuencias[2].agregarImg("/img/ciencias/elementos/potasio.png", 2);
  secuencias[2].agregarImg("/img/ciencias/elementos/carbon.png", 3);
  secuencias[2].agregarImg("/img/ciencias/elementos/oro.png", 3); 
  secuencias[2].agregarImg("/img/ciencias/elementos/fosforo.png",3);
  secuencias[2].agregarImg("/img/ciencias/elementos/radio.png", 3);
  secuencias[2].crearTablero();
  secuencias[2].incluirEn(".secuenciasc");

  secuencias.forEach((secuencia)=>{
    secuencia.setValidacion(seguir);
  });
  

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
  });

  contenedor.agregar(secuencias[0].getContenido());
  contenedor.agregar(secuencias[1].getContenido());
  contenedor.agregar(secuencias[2].getContenido());

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
    goTo("intraper");
  });

  //Configuracion de el avance entre actividades
  var siguientes = document.querySelectorAll(".continuar");

  function recorrerBotonesContinuar(boton) {
    boton.addEventListener("click", seguir);
  }

  siguientes.forEach(recorrerBotonesContinuar);
});

