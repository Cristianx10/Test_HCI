window.addEventListener("load", function(){
    
    let areas = resultados.getAreas(["diseño", "deportes", "ingenieria", "salud", "educacion", "fuerza publica", "arte", "ciencia"]);
    let maximos = resultados.getAreasMaximo(["diseño", "deportes", "ingenieria", "salud", "educacion", "fuerza publica", "arte", "ciencia"]);


    let colores = {};
    colores["ciencias"] = "#63D1B7";
    colores["arte"] = "#EF6BAA";
    colores["fuerza"] = "#FF7373";
    colores["educacion"] = "#5BC5D3";
    colores["deportes"] = "#FDF441";
    colores["salud"] = "#FFBF74";
    colores["diseño"] = "#BA76F0";
    colores["ingenieria"] = "#6883E4";

    let profesion = {};
    profesion["ciencias"] = "cientifico";
    profesion["arte"] = "artista";
    profesion["fuerza"] = "militar";
    profesion["educacion"] = "maestro/a";
    profesion["deportes"] = "deportista";
    profesion["salud"] = "especialista en la salud";
    profesion["diseño"] = "diseñador";
    profesion["ingenieria"] = "ingeniero/a";

    let nombres = {};
    nombres["ciencias"] = "ciencias";
    nombres["arte"] = "arte";
    nombres["fuerza"] = "fuerza";
    nombres["educacion"] = "educación";
    nombres["deportes"] = "deportes";
    nombres["salud"] = "salud";
    nombres["diseño"] = "diseño";
    nombres["ingenieria"] = "ingeniería";


    let iconos = {};
    iconos["ciencia"] = "/includes/iconos/ciencias.svg";
    iconos["arte"] = "/includes/iconos/arte.svg";
    iconos["fuerza"] = "/includes/iconos/fuerzaspublicas.svg";
    iconos["educacion"] = "/includes/iconos/educacion.svg";
    iconos["deportes"] = "/includes/iconos/deporte.svg";
    iconos["salud"] = "/includes/iconos/salud.svg";
    iconos["diseño"] = "/includes/iconos/diseno.svg";
    iconos["ingenieria"] = "/includes/iconos/ingenieria.svg";


    areas.forEach((a)=>{
        let max = resultados.getMaximo(a.area);
        let simpli = a.area.split(" ");
        a.porcentaje = Math.round((a.valor * 100) / max.valor);
        a.color = colores[simpli[0]];
        a.icono = iconos[simpli[0]];
        a.profesion = profesion[simpli[0]];
        a.nombres = nombres[simpli[0]];
    });



    areas.sort((a, b) => {
        if (a.porcentaje > b.porcentaje) {
            return -1;
        }
        if (a.porcentaje < b.porcentaje) {
            return 1;
        }
        return 0;
    });



    areas.forEach((e, index) => {

        let resultadoc = new VerResultado();
       
        resultadoc.cambiarColor(e.color);

        let name = e.area;
   
        resultadoc.generar(name, e.porcentaje, e.icono, e.nombres);

        $(".presultados").append(resultadoc.getElemento());

        if (index == 0) {
            document.querySelector(".pmayorresultado").append(resultadoc.felicidades(e.profesion));
            resultadoc.activar();
        }else if(index == 1){
            resultadoc.activar();
        }
    });



    let vals = document.querySelectorAll(".resultado__cuadro");
    vals[0].classList.add("mayores");
    vals[1].classList.add("mayores");

    vals.forEach((v, index) => {
        let width = 80;
        let height = 80

        if (index < 2) {
            
            v.classList.add("mayores");
            width = 100;
            height = 100;
        }

        let simpli = areas[index].area.split(" ");
        console.log(simpli)

        $("#" + simpli[0]).knob({
            min: 0,
            max: 100,
            width: width,
            height: height,
            fgColor: colores[simpli[0]],
            // angleOffset:0,
            thickness: ".25",
            readOnly: true,
            displayInput: false
        });

    });

});