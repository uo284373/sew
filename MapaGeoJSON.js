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


    cargarGeoJSON(){
        var geoJSON = document.querySelector("input").files[0];
        var extension = geoJSON.name.substring(geoJSON.name.lastIndexOf(".")+1,geoJSON.name.length);
        var mapa = this.mapa;

        if(extension != "GeoJSON"){
            alert("Solo se puede introducir un archivo geoJSON");
        }else{
            var lector = new FileReader();
            lector.onload = function (event) {
                var text = lector.result;
                var contenido = JSON.parse(text);
                for(var i = 0;i < contenido.features.length;i++){
                    var coordenadas = contenido.features[i].geometry.coordinates;
                    var nombre = contenido.features[i].properties.name;
                    var longitud = parseFloat(coordenadas[0]);
                    var latitud = parseFloat(coordenadas[1]);
                    var marcador = new mapboxgl.Marker().setLngLat([longitud,latitud]).setPopup(new mapboxgl.Popup().setHTML("<h1>"+nombre+"</h1>")).addTo(mapa);
                }
            }
            lector.readAsText(geoJSON);
        }
    }
}

var mapaDinamico = new Mapa();