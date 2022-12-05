class Mapa{
    constructor(){

    }

    initMap(){
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yODQzNzMiLCJhIjoiY2xiN3lxd3JmMGZ1dDN3cWh2MGl5anZzcCJ9.qNemSkxV_5WC42ORzf9fmw';  
        this.mapa = new mapboxgl.Map({ 
            container: document.querySelector("main"), 
            style: 'mapbox://styles/mapbox/streets-v9',  
            center: [-5.8502461, 43.3672702],  
            zoom: 8
        });
    }


    cargarKML(){
        var kml = document.querySelector("input").files[0];
        var extension = kml.name.substring(kml.name.lastIndexOf(".")+1,kml.name.length);
        var mapa = this.mapa;

        if(extension != "kml"){
            alert("Solo se puede introducir un archivo kml");
        }else{
            var lector = new FileReader();
            lector.onload = function (event) {
                var contenido = $.parseXML(lector.result);
                $("Document",contenido).find("Placemark").each(function(){
                    var nombre = $("name", this).text();
                    var coordenadas = $("coordinates", this).text();
                    coordenadas = coordenadas.split("\t");
                    coordenadas = coordenadas[0].split(",");
                    var longitud = parseFloat(coordenadas[0]);
                    var latitud = parseFloat(coordenadas[1]);
                    var pos = {lat:latitud, lng:longitud};
                    var marcador = new mapboxgl.Marker().setLngLat([longitud,latitud]).addTo(mapa);
                });
            }
            lector.readAsText(kml);
        
        }
    }
}

var mapaDinamico = new Mapa();