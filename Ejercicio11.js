"use strict";
class GeoLocalizacion{
    initMap(){
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yODQzNzMiLCJhIjoiY2xiN3lxd3JmMGZ1dDN3cWh2MGl5anZzcCJ9.qNemSkxV_5WC42ORzf9fmw';  
        var mapa = new mapboxgl.Map({ 
            container: document.querySelector("aside"), 
            style: 'mapbox://styles/mapbox/streets-v9',  
            center: [-4.834155, 43.176111],  
            zoom: 10
        });

        new mapboxgl.Marker().setLngLat([-4.834155,43.176111]).addTo(mapa);
    }
}

var mapaDinamico = new GeoLocalizacion();