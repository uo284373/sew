class Cambios{
    constructor(){

    }

    ocultar(){
        $("p").hide();
    }

    mostrar(){
        $("p").show();
    }

    modificar(){
        $("h3").text("Tabla sobre las distintas versiones de Node.js");
        $("h2").text("Descripción general de Node.js y tabla de versiones");
    }

    insertar(){
        $("table").before("<h4>Nuevo parrafo</h4>");
    }

    eliminar(){
        $("h2").remove();
    }

    recorrer(){
        $("aside").remove();
        $("main").after("<aside></aside>");
        $("*", document.body).each(function() {
            var parentTag = $(this).parent().get(0).tagName;
            $("aside").append("<p>");
            $("aside").append(document.createTextNode("Etiqueta padre : <"  + parentTag + "> elemento : <" + $(this).get(0).tagName +">"));
            $("aside").append("</p>");
        });

        
    }

    sumarFilasYColumnas(){
        var filas = $("th[scope=col]").length;
        var columnas = $("th[scope=row]").length+1;
        var suma = filas + columnas;
        $("table").after("<p>Hay "+filas+" filas y "+columnas+" columnas. La suma del número de filas más el número de columnas es igual a "+suma+"</p>");
    }

}

var cambios = new Cambios();