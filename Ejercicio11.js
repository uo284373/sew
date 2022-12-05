class Geolocalization{

    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this),this.verErrores.bind(this));
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
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

    mostrar(){
        var datos = '<p>'+this.mensaje+'</p>';
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
        datos+='<p>Altitud: '+ this.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
        datos+='<h2>El mapa con su localización es el siguiente: </h2>';
        $("input").remove();
        $("p").remove();
        $("header").after(datos);
        $("h2").after(this.getMapaEstatico());
    }

    getMapaEstatico(){
        var url = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(" + this.longitud + "," + this.latitud + ")/" + this.longitud + "," + this.latitud + ",14/800x600?access_token=pk.eyJ1IjoidW8yODQzNzMiLCJhIjoiY2xiN3lxd3JmMGZ1dDN3cWh2MGl5anZzcCJ9.qNemSkxV_5WC42ORzf9fmw";
        return "<img src='"+url+"' alt='mapa estático' />";
    }
}

var geo = new Geolocalization();