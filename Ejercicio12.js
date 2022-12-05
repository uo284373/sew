class File{
    constructor(){

    }

    calcularTamañoArchivo(){
        var nBytes = 0;
        var archivos = document.querySelector("input").files;
        var nArchivos = archivos.length;
        for (var i = 0; i < nArchivos; i++) {
          nBytes += archivos[i].size;
        }
        $("p").remove();
        $("input").after("<p title=\"numero\">Ha seleccionado "+nArchivos+" archivos</p>");
        $("p[title=numero]").after("<p title=\"tamaño\">El tamaño total de los archivos subidos es "+nBytes+" bytes</p>");
        var nombresTiposTamaños="";
        for (var i = 0; i < nArchivos; i++) {
          nombresTiposTamaños += "<p>Nombre del archivo: "+archivos[i].name + "</p>";
          nombresTiposTamaños += "<p>Tamaño del archivo: "+archivos[i].size + " bytes</p>";
          nombresTiposTamaños += "<p>Tipo de archivo: "+archivos[i].type + "</p>";
          nombresTiposTamaños += "<p title=\"archivo"+i+"\">Fecha última modificación: " + archivos[i].lastModifiedDate + "</p>";
        }
        $("p[title=tamaño]").after(nombresTiposTamaños);
        for(var i = 0;i < nArchivos;i++){
            this.leerArchivo(archivos[i],i);
        }
    }

    leerArchivo(archivo,i){
        var tipoTexto = /text.plain/;
        var tipoJSON = /application.json/;
        var tipoXML = /text.xml/;
        if (archivo.type.match(tipoTexto) || archivo.type.match(tipoJSON) || archivo.type.match(tipoXML)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                $("p[title=archivo"+i+"]").after("<pre title=\""+i+"\"></pre>");
                $("pre[title="+i+"]").text(lector.result);
            }      
            lector.readAsText(archivo);
        }
    }

    
    
}

var file = new File();