class APIoro{
    constructor(){
        this.apikey = "p2mi69dk868j2889a6usskhipq6p40op5nb7bojtg0110o434wv8ebk783vr";
        this.symbol = "XAU";
        this.base = "EUR";
        this.url = "https://metals-api.com/api/timeseries?access_key="+this.apikey+"&symbols="+this.symbol+"&base="+this.base;
    }

    cargarDatos(){
        $.ajax({
            dataType: 'json',
            url: this.url,
            method: 'GET',
            success: function(json){
                var stringDatos = "<ul><li>Fecha actual: "+json.end_date+"</li>";
                stringDatos += "<li>Fecha anterior mes: "+json.start_date+"</li>";
                stringDatos += "<li>Precio del oro desde el mes anterior:</li><ul>";
                $.each(json.rates,function(fecha, oro){
                    stringDatos += "<li>Fecha: "+fecha+" Precio del oro: "+oro.XAU+" EUR por onza de 24 quilates</li>";
                });
                
                stringDatos += "</ul></ul>";
                $("header").after(stringDatos);
            },
            error:function(){
                this.crearElemento("h3","¡Tenemos problemas! No puedo obtener JSON","h1");
            }
        });
    }

    crearElemento(tipoElemento, texto, insertarAntesDe){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }

    mostrar(){
        this.obtenerFechas();
        this.cargarDatos();
    }

    obtenerFechas(){
        var fechaHoy = new Date();

        var year = (fechaHoy.getUTCMonth() - 1 == -1) ? fechaHoy.getUTCFullYear() - 1 : fechaHoy.getUTCFullYear();

        var month = (fechaHoy.getUTCMonth() - 1 == -1) ? 12 : fechaHoy.getUTCMonth();
        if (month < 10) {
            month = '0' + month;
        }

        var day = (fechaHoy.getDate() == 31) ? 30 : fechaHoy.getDate();
        if (day < 10) {
            day = '0' + day;
        }

        this.fechaMesAntes = year + '-' + month + '-' + day;
        var mesActual = fechaHoy.getUTCMonth()+1;
        var dayActual = fechaHoy.getDate()-1;
        if (dayActual < 10) {
            dayActual = '0' + dayActual;
        }
        this.fechaActual = fechaHoy.getUTCFullYear() + "-" + mesActual + "-" + dayActual;
        this.url += "&start_date="+this.fechaMesAntes+"&end_date="+this.fechaActual;
    }

}

var apiOro = new APIoro();