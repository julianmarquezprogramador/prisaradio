/***** Functions for reload page************/
function omn_launchScroll(){

    s.eVar3="D=pageName";        // PageName
    s.eVar4="D=ch";                // Channel
    s.prop8 = s.getTimeParting('d', gmt);
    s.prop9 = s.getTimeParting('w', gmt);
    s.prop21 = s.getNewRepeat();
    s.prop24 = hours + ":" + minutes + ":" + seconds;
    s.prop35 = s.getTimeParting('h', gmt);
    s.prop33 = s.getVisitNum();
    s.prop36 = s.getTimeParting('d', gmt) + "-" + day + "/" + month + "/" + fecha.getFullYear() + "-" + s.prop24;
    s.prop60 = s.getDaysSinceLastVisit('s_lv');

    s.prop65 = "sin scroll";
    if(scroll_i==true){
        s.prop65 = "scroll";
    }

    s.events = "event2"; //por defecto el evento de pagina vista
    //s.prop45 = cadena_titulo;
    s.prop45 = document.title;

    var regexpNoticia = /http.?:\/\/([^\/]*)\/([^\/]*)\/(\d+)\/(\d+)\/(\d+)\/([^\/]*)\/(.*)\.html/i;
    var regexpSeccionVirtual = /http.?:\/\/([^\/]*)\/(seccion|programa|emisora)\/([^\/]*)/i;
    var regexpSubSeccionVirtual = /http.?:\/\/([^\/]*)\/(seccion|programa|emisora)\/([^\/]*)\/([^\/]*)/i;
    var regexpficha_parrilla = /http.?:\/\/([^\/]*)\/([^\/]*)\/[fp]\/([^\/]*)/i;
    var regexpPortadilla = /http.?:\/\/([^\/]*)\/([^\/]*)\/(.*)/i;
    var regexpPortada = /http.?:\/\/([^\/]*)\/?(.*)/i;
    var regexpMovil = /(http.?:\/\/[^\/]*)\/m\/(.*)/i;
    var regexpEspeciales = /http.?:\/\/[^\/]*\/especiales\/([^\/]*)\/([^\/]*)\/(\d{4})\/([^\/]*)\//i;
    var regexpEspecialesGenericos = /http.?:\/\/[^\/]*\/especiales\/ser\/(\d{4})\/([^\/]*)\//i;


    var result_re;
    var result_re2;
    var result_re3;
    var result_re4;
    var result_re5;
    var result_re6;
    var result_re7;

    var canal_omniture = "web";
    var direccion = document.location.href;

    result_re = regexpMovil.exec(direccion);
    if (result_re)   //version movil lo registramos y la ajustamos a una url no movil
    {
        canal_omniture = "web_movil";
        direccion = result_re[1] + "/" + result_re[2];
    }

    var dominio_omniture = "cadenaser.com";
    var subseccion_omniture = "subseccion";
    var subseccion_virtual = "";
    var channel_omniture = "channel";
    var prop1_omniture = "";
    var prop3_omniture = "";
    var prop2_tipo_contenido = "portal";
    var prop4_tipo_pagina = "";
    var prop11_especial = "";
    var prop13_omniture = "cadenaser";
    var prop75_omniture = "no brand";

    //por defecto
    s.pageName = s.siteID + location.pathname;


    //tipo contenio
    if (direccion.indexOf(/emisora/) > -1 || direccion.indexOf(/emisoras/) > -1)
        prop2_tipo_contenido = "emisora";
    else
    if (direccion.indexOf(/programa/) > -1 || direccion.indexOf(/programas/) > -1)
        prop2_tipo_contenido = "programa";
    // si no portal

    //miramos si es noticia
    result_re = regexpNoticia.exec(direccion);
    if (result_re )
    {
        OMN_es_noticia = true;
        channel_omniture = result_re[2];
        subseccion_omniture = result_re[6];

        //id_noticia
        id_noticia = result_re[2] + "_" + result_re[3] + result_re[4] + result_re[5] + "_" + result_re[6] + "_" + result_re[7];


        if (typeof(listado_id_tags) != "undefined" )
        {
            tagsNoticia = listado_id_tags.replace(/,/g, ";");
            s.list1 = tagsNoticia;
        }

        if (typeof(listado_id_autores) != "undefined")
        {
            tagsAutores = listado_id_autores.replace(/,/g, ";");
            s.list2 = tagsAutores;
        }

        prop4_tipo_pagina = "detalle";
        prop3_omniture = "articulo";

        if ((subseccion_omniture == 'audios' || subseccion_omniture == 'videos' || subseccion_omniture.indexOf("album") > -1 || subseccion_omniture == "fotorrelato") && typeof(subseccion_publi) != "undefined")
        {
            if (subseccion_omniture.indexOf("album") > -1 || subseccion_omniture == "fotorrelato")
            {
                prop3_omniture = "fotogaleria";
            }
            if (subseccion_publi)
                subseccion_omniture = subseccion_publi;
            else
                subseccion_omniture = "albumes";
        }

        s.prop44 = result_re[3] + "/" + result_re[4] + "/" + result_re[5];

        s.events += ',event77';
        omn_cleanTitle();
        s.prop39 = cadena_titulo_limpio;


        //desencadena el evento onload
        marcar_otros_elementos = true;

        //Indicamos los ids de los botones de compartir
        ids_tracking.push({"id":"fb","tipo":"compartir","marca":"facebook"});
        ids_tracking.push({"id":"fbnum","tipo":"compartir","marca":"facebook"});
        ids_tracking.push({"id":"twit","tipo":"compartir","marca":"twitter"});
        //ids_tracking.push({"id":"tnum","tipo":"compartir","marca":"twitter"});
        ids_tracking.push({"id":"bomn_gp","tipo":"compartir","marca":"google"});
        ids_tracking.push({"id":"bomn_imprimir","tipo":"compartir","marca":"imprimir"});
        ids_tracking.push({"id":"enviar","tipo":"compartir","marca":"enviar"});
        ids_tracking.push({"id":"bomn_linkedin","tipo":"compartir","marca":"linkedin"});
        ids_tracking.push({"id":"bomn_whatsapp","tipo":"compartir","marca":"whatasapp"});
        ids_tracking.push({"id":"bomn_pinterest","tipo":"compartir","marca":"pinterest"});
        ids_tracking.push({"id":"msg_fb","tipo":"compartir","marca":"facebook-messenger"});

        ids_tracking.push({"id":"valoracion_0","tipo":"valoraciones","marca":"interesante"});
        ids_tracking.push({"id":"valoracion_1","tipo":"valoraciones","marca":"indignante"});
        ids_tracking.push({"id":"valoracion_2","tipo":"valoraciones","marca":"divertida"});
        ids_tracking.push({"id":"valoracion_3","tipo":"valoraciones","marca":"pol�mica"});
        ids_tracking.push({"id":"valoracion_4","tipo":"valoraciones","marca":"sorprendente"});
        ids_tracking.push({"id":"valoracion_5","tipo":"valoraciones","marca":"aburrida"});

    }

    switch (channel_omniture)
    {
        case "emisora":
            if (circuitos_regionales[subseccion_omniture])
            {
                prop13_omniture = subseccion_omniture;
                prop1_omniture = subseccion_omniture  + ":" +  circuitos_regionales[subseccion_omniture];
            }
            else
            {
                prop13_omniture = subseccion_omniture; //nombre de la emisora
            }

            break;

        case "programa":
            if (subseccion_virtual)
            {
                prop13_omniture = subseccion_omniture;
                prop1_omniture = prop13_omniture + ":" + subseccion_virtual;
            }
            else
                prop13_omniture = subseccion_omniture;

            if (typeof(niveles_publi) != "undefined" && typeof(niveles_publi[0]) != "undefined")
            {
                if (niveles_publi[0] &&  niveles_publi[0] == channel_omniture)
                    if (niveles_publi[1] && niveles_publi[1] == subseccion_omniture)
                        if (niveles_publi[2])
                            prop1_omniture = subseccion_omniture + ":" +niveles_publi[2];
            }
            break;

        case "estaticos":
            if (typeof(prop1_forzado) != 'undefined') {
                prop1_omniture = prop1_forzado;
            }
            if (typeof(prop13_forzado) != 'undefined') {
                prop13_omniture = prop13_forzado;
            }
            break;

        default:
            prop13_omniture = "cadenaser";
            if (channel_omniture == "ser" && subseccion_omniture != "")
                channel_omniture = subseccion_omniture;
            break;
    }


    if (prop13_omniture == "cadena_ser")
        prop13_omniture = "cadenaser";

    s.channel = channel_omniture;

    if (prop1_omniture != "")
        s.prop1 = prop1_omniture;
    s.prop2 = prop2_tipo_contenido;
    s.prop3 = prop3_omniture;
    s.prop4 = prop4_tipo_pagina;
    s.prop5 = "D=g";
    s.prop6 = "D=r";
    s.prop7 = "";
    s.prop8 = s.getTimeParting('d',gmt);         // Set day  (Jueves)
    s.prop9 = s.getTimeParting('w', gmt);        // Set weekday (laborable/festivo)
    s.prop11 = prop11_especial;
    s.prop12 = "";
    s.prop13 = prop13_omniture;
    s.prop14 = "espa�a";                     // Pais del medio
    s.prop15 = "espa�a";
    s.prop17 = canal_omniture;                // Canal
    s.prop18 = "prisa";                         // Organizacion
    s.prop19 = "cadenaser";                      // Producto
    s.prop20 = dominio_omniture;               // Dominio
    s.prop21 = s.getNewRepeat();                   // Usuario Nuevo o recurrente
    s.prop22 = "convencional";
    s.prop24 = hours+":"+minutes+":"+seconds;     // Set hour:minutes:seconds (12:32:48)
    s.prop30 = "radio";                      // Unidad de Negocio
    s.prop35 = s.getTimeParting('h', gmt);       // Set hour (12:00PM)

    if (typeof(PEPuid) != "undefined")
        s.prop34 = PEPuid;
    s.prop36 = s.getTimeParting('d', gmt)+"-"+day+"/"+month+"/"+fecha.getFullYear()+"-"+s.prop24;  // Join Date (Jueves-15/9/2012-12:32:48)
    s.prop57 = "";

    s.prop60 = s.getDaysSinceLastVisit('s_lv');    // Dias �ltima visita
    if (typeof(PEPuname) != "undefined")
        s.prop62 = "logueado";
    else
        s.prop62 = "anonimo";

    s.prop75 = prop75_omniture;
    //s.prop75= "pixel prueba el tucu";
    /*
    Jerarquias
    */
    s.hier1 = 'D=c18+">"+c19+">"+c20+">"+ch+">"pageName';


    var url = window.location.pathname;
    var tipo_tags = "";
    if (url.indexOf("programa") !== -1){
        tipo_tags = "programa";
    }else if(url.indexOf("emisora") !== -1){
        tipo_tags = "emisora";
    }else if (url.indexOf("seccion") !== -1){
        tipo_tags = "seccion";
    }
    console.log(url);
    var urlsplit = url.split("/").slice(-2)[0];
    console.log(urlsplit);

    var tags_json = "";

    var tags_asociados = '{"tags_krux": {"hoy_por_hoy": "actualidad, informativos","oh_my_lol": "humor","carrusel_deportivo": "deportes","la_ventana": "actualidad","hora_25": "actualidad","hablar_por_hablar": "actualidad","el_larguero": "deportes","a_vivir_que_son_dos_dias": "actualidad","contigo_dentro": "sexualidad","nadie_sabe_nada": "humor","espana": "nacional, espa�a, noticias, actualidad","economia": "economia","gente": "gente, sociedad","politica": "politica", "deportes": "deportes","television": "television", "tribunales": "tribunales","ciencia": "ciencia, tecnolog�a", "ser_y_estar_bien": "bienestar, salud", "internacional": "internacional, noticias, actualidad","cultura": "cultura", "bazar": "compras, consumo","sociedad": "sociedad","gastro": "gastronom�a, alimentaci�n"}    }';

    var tags_json = JSON.parse(tags_asociados);
    var tags_aplicadas = tags_json.tags_krux[urlsplit];

    /* KRX */

    if (OMN_es_noticia) {
        DataLayerKrx = {
            pageID: id_noticia,
            pageName: s.pageName,
            pageTitle: s.prop45,
            destinationURL: document.location.href,
            referringURL: document.referrer,
            tags: arrayTags(),
            authors: arrayAuthors(),
            language: document.documentElement.lang ? document.documentElement.lang : "es",
            publisher: s.prop19,
            geoRegion: s.prop14,
            domain: s.prop20,
            businessUnit: s.prop30,
            thematic: "",
            org: s.prop18,
            primaryCategory: s.channel,
            subCategory1: typeof(subseccion_omniture) != "undefined" ? subseccion_omniture : "",
            pageType: s.prop3,
            edition: "es",
            profileID: (typeof(s.prop34) != "undefined" ? s.prop34 : ""),
            registeredUser: (s.prop62 == "logueado" ? "1" : "0"),
            creationDate: (typeof(s.prop44) != "undefined" ? s.prop44.replace(/\//g, "") : "")
        }
    }

    if (s_getLoadTime()){
        s.events += ",event90=" + s_getLoadTime();
    }

    if(scroll_i==true){//if is new page then scroll_i = true
        s.t();
    }
}

function omn_cleanTitle(){
    cadena_titulo_limpio= "";
    var meta_og_title = document.querySelector('meta[property="og:title"]');
    cadena_titulo_limpio = (meta_og_title) ? meta_og_title.getAttribute('content').replace(/'|"|\|/g, "") : "";
    cadena_titulo_limpio = cadena_titulo_limpio.toLowerCase();
}