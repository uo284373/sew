class Meteo{
    constructor(){
        this.apikey = "915adea5031404d0d1c49bbce08ec53d";
        this.ciudad = "Oviedo";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }

    cargarDatos(id){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
            
                //Presentación de los datos contenidos en JSON
                var icono = "<img src=http://openweathermap.org/img/wn/" + datos.weather[0].icon + "@2x.png alt=\"icono del Tiempo "+datos.name+"\"/>";
                var stringDatos = "<ul><li>Ciudad: " + datos.name + "</li>";
                    stringDatos += "<li>País: " + datos.sys.country + "</li>";
                    stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                    stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                    stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                    stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                    stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                    stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                    stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                    stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                    stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                    stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                    stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                    stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                    stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                    stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                
                    $("h2:eq("+id+")").after(icono);
                    $("img[alt=\"icono del Tiempo "+datos.name+"\"").after(stringDatos);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                
            }
        });
    }

    crearElemento(tipoElemento, texto, insertarAntesDe){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }

    mostrar(){
        this.mostrarOviedo();
        this.mostrarCiudades("Madrid",1);
        this.mostrarCiudades("Málaga",2);
        this.mostrarCiudades("Sevilla",3);
        this.mostrarCiudades("Barcelona",4);
    }

    mostrarOviedo(){
        this.crearElemento("h3","Todo correcto","#oviedo");
        this.cargarDatos(0);
    }

    mostrarCiudades(ciudad,id){
        this.ciudad=ciudad;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.cargarDatos(id);
    }

}

var tiempo = new Meteo();