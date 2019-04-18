

    var contador = 0;
    var btnAudio = document.querySelector('.btn-reproducir');
    var contenedor = document.querySelector('.campo-texto');
    var campoTexto = document.querySelector('.campo-texto__dictado');
    var btnEnviar = document.querySelector('.btn-enviar');
    var btnDictado = document.querySelector('.contenedorBoton__comenzar');
    var miga = document.querySelector('.miga');
    var portada = document.querySelector('.portada');
    var contenido = document.querySelector('.contenido');
    var tiempoVista = document.querySelector('.tiempo__vista');
    var i;
    let dictado=  campoTexto.value;


    tiempoVista.style.opacity="0";


    function eliminarPortada(event){
      portada.style.display="none";
      portada.innerHTML=" ";
      tiempoVista.style.opacity="1";

     
      
    }
    btnDictado.addEventListener("click",eliminarPortada);

    function cont(event){
        contador++;
      

       if(contador>=1){
           btnAudio.style.display="none";
           btnAudio.style.visibility="hidden";
           btnAudio.innerHTML="";
       }
       
    } 

    function cambioBotones(event){
        console.log("funciona");

        if(campoTexto.value!= " "){
            btnEnviar.style.backgroundColor= '#E64973';
            btnEnviar.style.color= 'white';
        }
              
    }


    btnAudio.addEventListener('click',cont);
    campoTexto.addEventListener('keypress',cambioBotones);
 

    function agregaPregunta2(event){
  
      return `<article class= "pregunta2">
              <h1 class="titulo">¿Quisieras corregir algo de lo que escribiste?</h1>
              <p class="dictadoRespuesta" style=" font-size: 15px;">`+campoTexto.value+`</p>
              <div class="btn">
              <button class="btn-si">SI</button>
              <button class="btn-no">NO</button>
              </div>
              <article>`
  }


  function agregaEditor(event){
 
    return `
    <div class="editor"> 
    <div class="" id ="campo__editor"> 
    <textarea class="" id="campoEditar" name=""  placeholder="Escriba aquí" id="" cols="30" rows="10" >`+campoTexto.value+` </textarea>
     </div>

    <div class="btn">
    <button id="botonEnviar" type="submit">Enviar</button>
    </div>
    </div>`
 
    }

  function volverEditor(event){
    var pregunta2 = document.querySelector('.pregunta2');
    pregunta2.style.display="none";    
    contenedor.innerHTML=agregaEditor();
   
    contenido.style.backgroundImage='url('+'../data/images/fondoPreguntaNormal.png'+')';

    var botonEnviar = document.querySelector('#botonEnviar');
   botonEnviar.addEventListener('click',almacena); 
    botonEnviar.addEventListener("click",agregaPregunta3);
}
   
    function cambiaPantallaPregunta2(event){
        btnEnviar.style.display= "none";
        btnEnviar.style.visibility= "hidden";
        btnAudio.style.display= "none";
        btnAudio.style.visibility= "hidden";
        contenedor.innerHTML=agregaPregunta2();
        var botonNo = document.querySelector('.btn-no'); 
        botonNo.addEventListener("click",agregaPregunta3);
  
        var boton = document.querySelector('.btn-si'); 
        boton.addEventListener("click",volverEditor);
    }
  


 
  function agregaPregunta3(event){ 

    contenedor.innerHTML=pregunta3();
    
    var pregunta2 = document.querySelector('.pregunta2');


    if(pregunta2!=null){
    pregunta2.style.display="none"; 
    }
    var editor = document.querySelector('.editor');
       
    if(editor!=null){
    editor.style.display="none";  
          }

        var botonSiguiente = document.querySelector('.pregunta__boton');
          botonSiguiente.addEventListener("click",agregaPregunta4);

        
        
      

    } 


  function pregunta3(){

    return `
    <div class="pregunta">
    <section class="pregunta__titulo">
    <h2> ¿Cuántas palabras graves o llanas habían en el dictado? </h2>
    <hr> 
     </section>
    <section class="pregunta__opciones">
    <form>
    <label>
    <input type="radio" name="opcion">
    <span style="display:inline-block; width: 50px;"> <strong> a) </strong></span>6</label>


    <label>
    
    <input type="radio" name="opcion">
    
    <span style="display:inline-block; width: 50px;"> <strong> b) </strong> </span>  2
    </label>

    <label>
    <input  type="radio" name="opcion">
    <span style="display:inline-block; width: 50px;"><strong> c) </strong> </span> 5</label>

    <label>
    <input type="radio" name="opcion">    
    <span style="display:inline-block; width: 50px;"> <strong> d) </strong> </span> 1
    </label>
    </form>
    </section>
    <button class="pregunta__boton">Siguiente</button>
    </div>`
  }

  function pregunta4(){

    return `
    <div class="pregunta">
    <section class="pregunta__titulo">
    <h2>En el texto la palabra “Chapuzón”, podría ser reemplazada por :</h2>
    <hr> 
     </section>
    <section class="pregunta__opciones">
    <form>
    <label>
    <input type="radio" name="opcion">
    <span style="display:inline-block; width: 50px;"> <strong> a) </strong></span>Locación</label>


    <label>
    
    <input type="radio" name="opcion">
    
    <span style="display:inline-block; width: 50px;"> <strong> b) </strong> </span>Zambullida
    </label>

    <label>
    <input  type="radio" name="opcion">
    <span style="display:inline-block; width: 50px;"><strong> c) </strong> </span>Esperanza</label>

    <label>
    <input type="radio" name="opcion">    
    <span style="display:inline-block; width: 50px;"> <strong> d) </strong> </span>Virtud</label>
    </form>
    </section>
    <button class="pregunta__boton">Siguiente</button>
    </div>`
  }

  function agregaPregunta4(event){ 
    var pregunta = document.querySelector('.pregunta');
    pregunta.style.display="none";           
    contenedor.innerHTML=pregunta4();


    var botonSiguiente = document.querySelector('.pregunta__boton');
    botonSiguiente.addEventListener("click",agregaPregunta5);


  }  


  function pregunta5(){

    return `
    <div class="pregunta">
    <section class="pregunta__titulo">
    <h2>¿Qué es un diptongo?</h2>
    <hr> 
     </section>
    <section class="pregunta__opciones">
    <form>
    <label>
    <input type="radio" name="opcion">
    <span style="display:inline-block; width: 50px;"> <strong> a) </strong></span>La secuencia de dos consonantes.</label>


    <label>
    
    <input type="radio" name="opcion">
    
    <span style="display:inline-block; width: 50px;"> <strong> b) </strong> </span>  La secuencia de dos vocales distintas que se pronuncian dentro de la misma sílaba.
    </label>

    <label>
    <input  type="radio" name="opcion">
    <span style="display:inline-block; width: 50px;"><strong> c) </strong> </span>  La rima característica de los sonetos.</label>

    <label>
    <input type="radio" name="opcion">    
    <span style="display:inline-block; width: 50px;"> <strong> d) </strong> </span> La acentuación en las sílabas
    </label>
    </form>
    </section>
    <button class="pregunta__boton">Siguiente</button>
    </div>`
  }

  function agregaPregunta5(event){ 
    var pregunta = document.querySelector('.pregunta');
    pregunta.style.display="none";           
    contenedor.innerHTML=pregunta5();

    

    var botonSiguiente = document.querySelector('.pregunta__boton');
    botonSiguiente.addEventListener("click",agregaPregunta6);


  }  


  function pregunta6(){

    return `
    <div class="pregunta">
    <section class="pregunta__titulo">
    <h2>¿Qué persona gramatical utiliza el narrador omnisciente?</h2>
    <hr> 
     </section>
    <section class="pregunta__opciones">
    <form>
    <label>
    <input type="radio" name="opcion">
    <span style="display:inline-block; width: 50px;"> <strong> a) </strong></span>Cualquier persona</label>


    <label>
    
    <input type="radio" name="opcion">
    
    <span style="display:inline-block; width: 50px;"> <strong> b) </strong> </span> Primera persona
    </label>

    <label>
    <input  type="radio" name="opcion">
    <span style="display:inline-block; width: 50px;"><strong> c) </strong> </span> Tercera persona</label>

    <label>
    <input type="radio" name="opcion">    
    <span style="display:inline-block; width: 50px;"> <strong> d) </strong> </span> Segunda Persona
    </label>
    </form>
    </section>
    <button class="pregunta__boton">Siguiente</button>
    </div>`
  }

  function agregaPregunta6(event){ 
    var pregunta = document.querySelector('.pregunta');
    pregunta.style.display="none";           
    contenedor.innerHTML=pregunta6();


  

  }  

    

    function almacena(event){
        
      if(campoTexto.value != " "){
      let original = 'Se arrojó al agua, nadando para alejarse de la cercanía del pueblo. Llegó a un lugar donde encontró tranquilidad, aunque se le veía siempre triste por estar sola. A veces, permanecía por largas horas dentro de su caparazón, saliendo sólo para darse un chapuzón en las frescas aguas del río.';
      let usuario = campoTexto.value;

      var texto = new Texto_validar(original, usuario);

      //Da los errores sin tener encuenta mayusculas o puntuacion y las que faltaron
      console.log("Errores: " + texto.getErrores());

      //Da los errores de coincidencia exacta
      console.log("Estricto: " + texto.getErroresStrict());

      //Da los errores de Mayusculas
      console.log("Mayuscula: " + texto.getErroresMayusculas());

      //Da los errores de Puntuacion, solo "," y "."
      console.log("Puntuacion: " + texto.getErroresPuntuacion());

      //Da los errores de palabras que faltaron
      console.log("Faltan: " + texto.getErroresFalto());


      var Resumen= "Errores"+texto.getErrores()+" Estricto:"+texto.getErroresStrict()+" Mayuscula: "+texto.getErroresMayusculas()+"Puntuacion:" +texto.getErroresPuntuacion()+"Faltan: "+texto.getErroresFalto()+" ";

    
    
     }
     
     var text = Resumen,
     blob = new Blob([text], { type: 'text/plain' }),
     anchor = document.createElement('a');
 
      anchor.download = "resultadoDictado.txt";
      anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
      anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
      anchor.click();


    
      
    }

   
    btnEnviar.addEventListener("click",cambiaPantallaPregunta2);

  
   btnEnviar.addEventListener('click',almacena);  