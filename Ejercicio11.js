"use strict";
class GeoLocalizacion{
    constructor(){
        this.mensaje="Hemos encontrado su ubicación sin problemas";
    }
    initMap(){
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yODQzNzMiLCJhIjoiY2xiN3lxd3JmMGZ1dDN3cWh2MGl5anZzcCJ9.qNemSkxV_5WC42ORzf9fmw';  
        var mapa = new mapboxgl.Map({ 
            container: document.querySelector("aside"), 
            style: 'mapbox://styles/mapbox/streets-v9',  
            center: [-5.8502461, 43.3672702],  
            zoom: 8
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };

                new mapboxgl.Marker().setLngLat([pos.lng,pos.lat]).addTo(mapa);
    
                mapa.addControl(
                    new mapboxgl.GeolocateControl({
                        positionOptions:{
                            enableHighAccuracy: true
                        },
                        trackUserLocation: true,
                        showUserHeading: true
                    })
                );

                mapa.setCenter(pos);
                
            },this.verErrores.bind(this));
            
        } 
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
        $("aside").before(this.mensaje);
    }

}   

var mapaDinamico = new GeoLocalizacion();