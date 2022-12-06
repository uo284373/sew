class File{
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this),this.verErrores.bind(this));
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;         
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    leerArchivo(){
        var archivo = document.querySelector("input").files[0];
        var extension = archivo.name.substring(archivo.name.lastIndexOf(".")+1,archivo.name.length);

        if(extension != "kml"){
            alert("Solo se puede introducir un archivo kml");
        }else if(this.mensaje != "Se ha realizado correctamente la petición de geolocalización"){
            $("input").after("<p>Error: "+this.mensaje+"</p>");
        }else{
            var nombresTiposTamaños = "<p>Nombre del archivo: "+archivo.name + "</p>";
            nombresTiposTamaños += "<p>Tamaño del archivo: "+archivo.size + " bytes</p>";
            nombresTiposTamaños += "<h2>Las coordenadas de su posición son:</h2>";
            nombresTiposTamaños += '<p>'+this.mensaje+'</p>';
            nombresTiposTamaños+='<p>Longitud: '+this.longitud +' grados</p>'; 
            nombresTiposTamaños+='<p>Latitud: '+this.latitud +' grados</p>';
            nombresTiposTamaños += "<section><h2>Las coordenadas del archivo kml son: </h2>";
            $("p").remove();
            $("section").remove();
            $("h2").remove();
            $("canvas").remove();
            $("input").after(nombresTiposTamaños);
        
        
            var lector = new FileReader();
            var distancias = new Array();
            var nombres = new Array();
            var info = "";
            var miLongitud = this.longitud * Math.PI / 180;
            var miLatitud = this.latitud * Math.PI / 180;
            lector.onload =  function(event) {
                var parser = new DOMParser();
                var kml = parser.parseFromString(event.target.result,'text/xml');
                for(var placemark of kml.getElementsByTagName("Placemark")){
                    var coord = placemark.getElementsByTagName("coordinates")[0].innerHTML.split(",");
                    var name = placemark.getElementsByTagName("name")[0].innerHTML;
                    var longitud = coord[0];
                    var latitud = coord[1];
                    nombres.push(name);
                    info += "<p>Nombre: "+name+" Longitud: "+longitud+" Latitud: "+latitud+"</p>";
                    longitud = longitud* Math.PI / 180;
                    latitud = latitud* Math.PI / 180;
                    var diferenciaEntreLongitudes = (longitud - miLongitud);
                    var diferenciaEntreLatitudes = (latitud - miLatitud);
                    var a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(miLatitud) * Math.cos(latitud) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var result = 6371 * c;

                    distancias.push(Math.round(result*1000)/1000);

                    
                }
                info += "</section>";
                $("h2:eq(1)").after(info);
                var heigth = 100*distancias.length;
                $("section").after("<h2>Esta es la distancia entre su ubicación actual y los lugares especificados en el archivo kml</h2>\n<canvas width=\"1100\" height=\""+heigth+"\"></canvas>");
                var canvas = document.querySelector("canvas");
                var canvas1 = canvas.getContext('2d');
                var y = 50;
                for(var i = 0;i < distancias.length;i++){
                    canvas1.lineWidth = 3;
                    canvas1.strokeStyle = "#f00";
                    canvas1.beginPath();
                    canvas1.moveTo(180, y);
                    canvas1.lineTo(600, y);
                    canvas1.stroke();
                    canvas1.font = '20px Verdana';
                    canvas1.fillText("Su posición", 50, y);
                    canvas1.fillText(nombres[i], 620, y);
                    canvas1.fillText(distancias[i]+" km", 320, y-20);
                    y+=100;
                }
                
            }
            lector.readAsText(archivo);
            
        }
        
    }

    
    
}

var file = new File();