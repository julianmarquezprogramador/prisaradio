/* AppMeasurement for JavaScript version: 1.4.3
Copyright 1996-2014 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

var useSSL = document.location.protocol == 'https:';

//Videometrix

var id_comscore = '8671776'; //Client ID

var pbn_comscore = "PRISA"; //Publisher Brand Name
var c3_comscore = escape("Prisa Musica");
var c4_comscore = escape("40 Principales Sites");
var c6_comscore = escape("los40.co.cr");

var product= "los40cr";
var numVersion= "1.0.0";
var dtmVersion= "s_code "+ numVersion;


var myStreamingTag = null;
loadScript('//ep00.epimg.net/js/comun/streamsense.js', function(){
    //veremos si hacemos algo
});


var MPEP_adblock_enabled;

(function(window) {
    //Se supone la existencia de body, si no es asi salimos
    if (!window.document.body)
        return;

    var baitClass = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links',
        baitStyle = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -1000px !important; top: -1000px !important;',
        bait = document.createElement('div');

    bait.setAttribute('class', baitClass);
    bait.setAttribute('style', baitStyle);

    window.document.body.insertBefore(bait, window.document.body.childNodes[0]);

    window.setTimeout(function() {
        MPEP_adblock_enabled = (window.document.body.getAttribute('abp') !== null
            || bait.offsetParent === null
            || bait.offsetHeight == 0
            || bait.offsetLeft == 0
            || bait.offsetTop == 0
            || bait.offsetWidth == 0
            || bait.clientHeight == 0
            || bait.clientWidth == 0);

        window.document.body.removeChild(bait);

    }, 500);
})(window);

//Detecta todos los ie
function getInternetExplorerVersion()
{
    var rv = 0;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}


//Permitimos modificar la suit definiendo antes la variable s_account
/*if (typeof(s_account) == "undefined" )
	var s_account = "prisacomurcrlos40,prisacomglobal";
	var s_accountF = "prisacomurcrlos40";
*/

//Permitimos modificar la suit definiendo antes la variable s_account
if (typeof(s_account) == "undefined" ) {
    if(/los40.co.cr/.test(location.hostname)){                       // Producción
        var s_account = 'prisacomglobal';
        var s_accountF = 'prisacomglobal';
    } else {
        var s_account = 'prisacomurpreprod';
        var s_accountF = 'prisacomurpreprod';
    }
}

//para anular el marcado automatico
if (typeof(marcado_automatico) == "undefined")
    var marcado_automatico = true;

if (typeof(marcado_logtrust) == "undefined")
    var marcado_logtrust = false;

var s = new AppMeasurement();
s.account = s_account;
var tagsNoticia = "";
var tagsAutores = "";
var OMN_es_noticia = false;
var id_noticia = "";

var cadena_titulo =  (document.getElementsByTagName('title')[0] ) ? document.getElementsByTagName('title')[0].innerHTML : "";
cadena_titulo = cadena_titulo.toLowerCase();

var cadena_titulo_no_seo = document.head.querySelector("[property='og:title']").content
cadena_titulo_no_seo =  cadena_titulo_no_seo.toLowerCase();

var marcar_otros_elementos = false;

if (typeof(ids_tracking) == "undefined" )
    var ids_tracking = [];

function OMNaddEvent (element, evento, func) {
    if (document.addEventListener){
        element.addEventListener(evento, func, false);
    } else {
        element.attachEvent('on'+evento, func);
    }
}

var comscoreImg = document.createElement("img");
comscoreImg.width = '1';
comscoreImg.height = '1';
comscoreImg.style.display = 'none';


var logtrustImg = document.createElement("img");
logtrustImg.width = '1';
logtrustImg.height = '1';
logtrustImg.style.display = 'none';

//Nuevo marcado comscore
function iniciaMarcadoComscore(obj)
{
    //Por proteccion, no deberia ocurrir
    if (obj.datos.myStreamingTag == null)
        return;

    //Evitamos marcar el resume en publicidad
    if (typeof(obj.evento) != "undefined" && obj.evento == "adResumed" )
        return;

    if (typeof(obj.datos.duracion) != "undefined")
        obj.datos.duracion = parseInt(obj.datos.duracion);

    //Si es publicidad, solo tenemos dos tipos de publicidad pre-roll y post-roll
    if (obj.evento == "adStart" || obj.evento == "adResumed")
        obj.datos.myStreamingTag.playVideoAdvertisement({ ns_st_cl: obj.datos.duracion * 1000 }, obj.datos.adCue.indexOf("post-roll") > -1 ? ns_.StreamingTag.AdType.LinearOnDemandPostRoll : ns_.StreamingTag.AdType.LinearOnDemandPreRoll);
    else
    {
        var metadata = {
            ns_st_ci: obj.datos.uid, // Content Asset ID
            ns_st_cl: obj.datos.duracion * 1000, // Clip Length
            ns_st_st: "*null", // Station Title
            ns_st_pu: pbn_comscore, // Publisher Brand Name
            ns_st_pr: "*null", // Program Title
            ns_st_ep: "*null", // Episode Title
            ns_st_sn: "*null", // Episode Season Number
            ns_st_en: "*null", // Episode Number
            ns_st_ge: "*null", // Content Genre
            ns_st_ti: "*null", // TMS ID (unavailable)
            ns_st_ia: "*null", // Identical Ad Assignment Flag
            ns_st_ce: "*null", // Complete Episode Flag
            ns_st_ddt: "*null", // Digital Air Date
            ns_st_tdt: "*null", // TV Air Date
            c3: c3_comscore,
            c4: c4_comscore,
            c6: c6_comscore
        };
        obj.datos.myStreamingTag.playVideoContentPart(metadata, obj.datos.tipoReproduccion == "streaming" ? ns_.StreamingTag.ContentType.Live : ns_.StreamingTag.ContentType.ShortFormOnDemand);
    }

}

function paraMarcadoComscore(obj)
{
    if (obj.datos.myStreamingTag != null)
        obj.datos.myStreamingTag.stop();
}

// function launch - se crea para controlar los click en patrocinio
function launch(eVars,eVars_value,evento){
    s.usePlugins=false;
    s.account = s_accountF;
    s=s_gi(s.account);
    var AeVars = eVars.split("|");
    var AeVars_value = eVars_value.split("|");
    s.linkTrackVars='events,eVar3,eVar4,eVar10,eVar18,eVar19,eVar20,eVar21,eVar22,eVar32,eVar35,eVar39,eVar43,eVar44,eVar45,eVar48,eVar60,eVar66';
    for(var i=0; i < AeVars.length; i++){
        s.linkTrackVars+=',eVar'+AeVars[i];
        try {
            eval('s.eVar'+AeVars[i]+'="'+AeVars_value[i].toLowerCase().replace(/"/gi, "\\\"")+'";');
        }
        catch(err) {
            console.log( "Error: " + err + ".");
        }
    }
    if(evento!=''){
        s.linkTrackEvents=evento;
        s.events=evento;
    }
    s.eVar3=s.siteID + location.pathname; // pageName
    s.eVar4= s.channel; // channel
    s.eVar18="prisa"; // Organization
    s.eVar19=product; // Product
    s.eVar20=document.domain.replace(/www./gi,""); // Domain|Subdomain
    s.eVar21=s.getNewRepeat(); // User New / Repeat
    if (typeof(PEPuname) != "undefined") {
        s.eVar22 = "logueado";
    } else {
        s.eVar22= "anonimo"; // Logueado / Anonymous
    }
    s.eVar32=s.getVisitNum(); // Visit Number By Month
    s.eVar35=hours; // Set hour (12)
    s.eVar39=document.title; // Title

    s.eVar43=PEPuid; // User Id
    s.eVar44=s.getTimeParting('h', gmt); // Set hour (12:00PM)
    s.eVar45=document.title; // Title
    s.eVar48=s.getTimeParting('d',gmt); // Set day (Jueves)
    s.eVar60=s.getDaysSinceLastVisit('s_lv'); // Days Since Last Visit
    s.eVar66=s.getTimeParting('w', gmt); // Set weekday (laborable/festivo)
    s.tl(this,'o',evento);
    s.clearVars();
}

/*Nueva funcion de marcado ajax */
function launchAjaxOMN(eVars,eVars_value,evento,listado_tags, autores){
    s.usePlugins = false;
    //Casi todos los eventos en nuestra cuenta
    //s.account = 'prisacomurcrlos40';
    s=s_gi(s.account);
    //add eVar19
    eVars= eVars + "|19";
    eVars_value= eVars_value + "|los40cr";

    var AeVars = eVars.split("|");
    var AeVars_value = eVars_value.toLowerCase().split("|");
    s.linkTrackVars='events';

    if (typeof(listado_tags) != "undefined" && listado_tags != "")
    {
        //por si llega en formato antiguo s.products
        listado_tags = listado_tags.replace(/,;|,/g,";");
        listado_tags = listado_tags.replace(/^;/,""); //mientras comun.js ponga un ; al principio
        s.linkTrackVars += ",list1";
        //tiene el formato id1;id2;id3
        s.list1 = listado_tags;
    }


    //listado_autores_id los de la noticia, autores los del servicio
    if (typeof(autores) != "undefined" || (typeof (tagsAutores) != "undefined" && tagsAutores != ""))
    {
        s.linkTrackVars += ",list2";
        //tiene el formato id1;id2;id3
        s.list2 = (typeof(autores) != "undefined") ? autores.replace(/,/g, ";") : tagsAutores.replace(/,/g, ";");
    }


    switch(evento) {
        case "event11": case "event12": case "event13": case "event14":
            //Eventos que se registran en la global
            //s.account = 'prisacomurcrlos40,prisacomglobal';

            AeVars.push('30');
            AeVars_value.push(s.prop30);

            if (AeVars_value[0] == "audio"){
                if (evento == "event16"){
                    evento = "event16";//,event16";
                }
                else
                if (evento == "event12"){//fin de audio
                    evento = "event17";
                }
            }
            if (AeVars_value[0] == "video"){
                if (evento == "event11" || evento=="event16"){
                    evento = "event11";
                }
                else
                if (evento == "event12" || evento=="event17"){//fin de video
                    evento = "event12";
                }
            }
            break;

        default :
            break;
    }

    //La 3 puede llegar, la aniado si no llega
    if ( ("|" + eVars + "|").indexOf("|3|") == -1 )
    {
        AeVars.push('3');
        AeVars_value.push(s.pageName);
    }

    //Si no llega la 45 la aniado siempre, el titulo de la pagina
    if (("|" + eVars + "|").indexOf("|45|") == -1)
    {
        AeVars.push('45');
        AeVars_value.push(cadena_titulo);
    }

    //Si no llega la 39 la aniado siempre, el titulo de la pagina
    if (("|" + eVars + "|").indexOf("|39|") == -1)
    {
        AeVars.push('39');
        AeVars_value.push(cadena_titulo_no_seo);
    }

    AeVars.push('4');
    AeVars_value.push(s.channel);
    AeVars.push('7');
    AeVars_value.push(s.prop3);
    AeVars.push('17');
    AeVars_value.push(s.prop17);
    AeVars.push('20');
    AeVars_value.push(s.prop20);
    AeVars.push('35');
    AeVars_value.push(s.getTimeParting('h', gmt));
    AeVars.push('48');
    AeVars_value.push( s.prop8);
    AeVars.push('57');
    AeVars_value.push( s.prop57);


    if (typeof(PEPuid) != "undefined")
    {
        AeVars.push('43');
        AeVars_value.push(PEPuid);
    }

    //navegacion anonima o logueada
    AeVars.push('22');
    if (typeof(PEPuname) != "undefined")
        AeVars_value.push('logueado');
    else
        AeVars_value.push('anonimo');

    var logtrust_params = [];
    var t;
    var res8;
    var res9;
    for(var i=0; i < AeVars.length; i++){
        s.linkTrackVars +=',eVar' + AeVars[i];
        if (AeVars[i] == "8")
            AeVars_value[i] = AeVars_value[i].replace(/\-\d+$/, "");
        t = AeVars_value[i].replace(/"/g, "\\\"");
        eval('s.eVar'+ AeVars[i] +'="' + t + '";');

        if (marcado_logtrust && ((/event13$|event14$|event15$|event11$|event12$|event79$/).test(evento)))
        {
            switch(AeVars[i]){
                case "4": case "42":
                logtrust_params.push("v" + AeVars[i] + "=" + encodeURIComponent(t));
                break;

                case "8":
                    res8 = /^(.*) - ([\w-]+?)$/.exec(t);
                    if (res8)
                    {
                        logtrust_params.push("v8=" + encodeURIComponent(res8[1]));
                    }
                    break;

                case "20":
                    logtrust_params.push("v30=" + encodeURIComponent(t));
                    break;

                case "25":
                    logtrust_params.push("i1=" + encodeURIComponent(t));
                    break;

                case "38":
                    logtrust_params.push("i5=" + t);
                    break;

                case "74":
                    logtrust_params.push("i2=" + t);
                    break;

                default:
            }

        }
    }

    if(evento!=''){
        s.linkTrackEvents=evento;
        s.events=evento;
    }

    //El evento18 solo para logtrust
    if (evento != "event18")
        s.tl(this,'o','AjaxOMN');

    if (marcado_logtrust && ((/event13$|event14$|event15$|event11$|event12$|event79$/).test(evento)))
    {
        logtrust_params.push("i3="+UN);

        if (MPEP_adblock_enabled)
            logtrust_params.push("v57=con_ADBLOCK");
        else
            logtrust_params.push("v57=sin_ADBLOCK");

        logtrustImg.src = "//tracking.logtrust.io/pixel/ffduH8fQryYdIkaE0A0YSQ.gif?event=" + escape(evento) + "&" +
            logtrust_params.join("&") +
            (document.referrer ? "&i8=" + encodeURIComponent(document.referrer) : "" ) + "&rnd=" + String(Math.random()).substr(2, 9);
    }

    s.linkTrackEvents= "None";
    s.linkTrackVars = "None";

    for(var i=0; i < AeVars.length; i++)
    {
        eval('s.eVar' + AeVars[i] + '="";');
    }

    s.events = "";

}


function marcadoLinks(nodo)
{
    //Decidimos la forma de marcar el nodo
    //Nodo es una referencia al objeto que desencadena el onclick, normalmente un hiperlink
    //Si se define una url en el array json, gana a la que tenga el nodo
    var urlref = "";
    if (ids_tracking[nodo.idx].url != undefined && ids_tracking[nodo.idx].url != "")
        urlref = ids_tracking[nodo.idx].url;

    if (ids_tracking[nodo.idx].tipo == "compartir")
    {
        //launchAjaxOMN("3|39|69",s.pageName + "|" + cadena_titulo + "|" + ids_tracking[nodo.idx].marca ,"event69", tagsNoticia);
        launchAjaxOMN("3|69",s.pageName + "|" + ids_tracking[nodo.idx].marca ,"event69", tagsNoticia);
    }
    else
    {
        if (ids_tracking[nodo.idx].tipo == "reacciones")
        {
            //launchAjaxOMN("3|39|69",s.pageName + "|" + cadena_titulo + "|" + ids_tracking[nodo.idx].marca + (typeof(c_prefijo_titulo) != "undefined" ? " - " + c_prefijo_titulo : "") ,"event69", tagsNoticia);
            launchAjaxOMN("3|69",s.pageName + "|" + ids_tracking[nodo.idx].marca + (typeof(c_prefijo_titulo) != "undefined" ? " - " + c_prefijo_titulo : "") ,"event69", tagsNoticia);
        }
    }
}


function trackPublicarComentario()
{
    //launchAjaxOMN("3|39", s.pageName + "|" + cadena_titulo  ,"event34", tagsNoticia);
    launchAjaxOMN("3", s.pageName   ,"event34", tagsNoticia);
}

function trackFotogalerias()
{
    //launchAjaxOMN("3|39|5|30|46|7", s.pageName + "|" + cadena_titulo + "|" + s.prop1 + "|" + s.prop30 + "|" + document.location.href + "|" + "fotogaleria","event78", tagsNoticia);
    launchAjaxOMN("3|5|7|46", s.pageName + "|" + s.prop1 + "|"  + "fotogaleria"  + "|" + document.location.href  ,"event78", tagsNoticia);
    comscoreImg.src = (useSSL ? "https://sb.scorecardresearch.com" : "http://b.scorecardresearch.com") + "/p?c1=2&c2=8671776&cv=2.0&cj=1&c7=" + encodeURIComponent(document.location.href) + "&c8=" + encodeURIComponent(cadena_titulo) +  "&c9=" + encodeURIComponent(document.referrer) + "&rn=" + String(Math.random()).substr(2,9);
}

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.debugTracking = false;

/* You may add or alter any code config here. */
s.charSet = "UTF-8";
s.server = location.host;

/* Conversion Config */
s.currencyCode = "EUR";

/* Config cookie domain to  www.name.com.xx*/
document.URL.indexOf(".com.") > 0 ? s.cookieDomainPeriods = "3" : s.cookieDomainPeriods = "2";

/* Page Name Config */
s.siteID="los40cr";
s.defaultPage="";
s.queryVarsList="";
s.pathExcludeDelim=";";
s.pathConcatDelim="/";

/* Link Tracking Config */
s.trackDownloadLinks = true;
s.trackExternalLinks = true;
s.trackInlineStats = true;
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters = "javascript:,los40.co.cr";
s.linkLeaveQueryString = false;
s.linkTrackVars = "None";
s.linkTrackEvents = "None";

/* TimeParting Config */
var fecha = new Date();
var anoActual = fecha.getFullYear();
var gmt = -(fecha.getTimezoneOffset() / 60) - 1;
if (gmt >= 0) {
    gmt = "+" + gmt.toString();
}
// update to the correct Daylight Savings Time start
s.dstStart = "1/1/" + anoActual;
// update to the correct Daylight Savings Time end date
s.dstEnd = "12/31/" + anoActual;
// update to the current year
s.currentYear = anoActual;

/* Props used for TimeParting */
var month = fecha.getMonth() + 1;
if (month < 10)
    month = '0' + month;
var seconds = fecha.getSeconds();
if (seconds < 10)
    seconds = '0' + seconds;
var minutes = fecha.getMinutes();
if (minutes < 10)
    minutes = '0' + minutes;
var hours = fecha.getHours();
if (hours < 10)
    hours = '0' + hours;
var day = fecha.getDate();
if (day < 10)
    day = '0' + day;


if (typeof(scroll_i) == "undefined"){
    scroll_i = false;
}
/************** doPlugins Script **************/

s.usePlugins = true;
s.doPlugins=function(s) {
// External Campaign Tracking
    if(!s.campaign){
        var params = {'idexterno':'', 'sdi':'', 'sse':'', 'sma':'', 'prm':'', 'sap':'', 'ssm':'', 'afl':'', 'agr':'', 'int':'', 'noti':'', 'ads':''};

        for (var p in params)
        {
            params[p] = s.Util.getQueryParam(p);
            if (params[p] == '')
                delete params[p];
        }

        //Debería ser unico, pero en  Facebook Ads llegan dos

        if (params['ssm'] && params['ads'])
            s.campaign = params['ssm'] + '-' + params['ads'];        // social media + ads
        else
            for(var p in params)   //solo deberia ser uno, si hay mas gana el primero
            {
                s.campaign = params[p];
                break;
            }
        //if(s.Util.getQueryParam('idexterno')!='') s.campaign=s.Util.getQueryParam('idexterno');
        //if(s.Util.getQueryParam('sdi')!='') s.campaign=s.Util.getQueryParam('sdi'); //display
        //if(s.Util.getQueryParam('sse')!='') s.campaign=s.Util.getQueryParam('sse'); //sem
        //if(s.Util.getQueryParam('sma')!='') s.campaign=s.Util.getQueryParam('sma'); //emailing
        //if(s.Util.getQueryParam('prm')!='') s.campaign=s.Util.getQueryParam('prm'); //promociones
        //if(s.Util.getQueryParam('sap')!='') s.campaign=s.Util.getQueryParam('sap'); //aplicativos widget
        //if(s.Util.getQueryParam('ssm')!='') s.campaign=s.Util.getQueryParam('ssm'); //social media
        //if(s.Util.getQueryParam('afl')!='') s.campaign=s.Util.getQueryParam('afl'); //afiliación
        //if(s.Util.getQueryParam('agr')!='') s.campaign=s.Util.getQueryParam('agr'); //agregadores
        //if(s.Util.getQueryParam('int')!='') s.campaign=s.Util.getQueryParam('int'); //ID interno
        //if(s.Util.getQueryParam('noti')!='') s.campaign=s.Util.getQueryParam('noti');
        s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
    }


    s.eVar3="D=pageName";			// PageName
    s.eVar4="D=ch";					// Channel
    s.prop8 = s.getTimeParting('d', gmt);
    s.prop9 = s.getTimeParting('w', gmt);
    s.prop21 = s.getNewRepeat();
    s.prop24 = hours + ":" + minutes + ":" + seconds;
    s.prop35 = s.getTimeParting('h', gmt);
    s.prop33 = s.getVisitNum();
    s.prop36 = s.getTimeParting('d', gmt) + "-" + day + "/" + month + "/" + fecha.getFullYear() + "-" + s.prop24;
    s.prop60 = s.getDaysSinceLastVisit('s_lv');

    s.prop65 = "sin scroll";
    if(scroll_i == true){
        s.prop65 = "scroll";
        omn_launchPixelComScore();
    }

    if(s.prop1)s.eVar5="D=c1";
    if(s.prop2)s.eVar6="D=c2";
    if(s.prop3)s.eVar7="D=c3";
    if(s.prop5)s.eVar10=s.prop5;	    //url
    if(s.prop6)s.eVar63=s.prop6;		// referrer
    if(s.prop8)s.eVar48="D=c8";		// Set day  (Jueves)
    if(s.prop9)s.eVar66="D=c9";		// Set weekday (laborable/festivo)
    if(s.prop11)s.eVar11="D=c11";
    if(s.prop12)s.eVar12="D=c12";
    if(s.prop13)s.eVar13="D=c13";
    if(s.prop14)s.eVar14="D=c14";	// Pais del Medio
    if(s.prop15)s.eVar15="D=c15";
    if(s.prop16)s.eVar16="D=c16";
    if(s.prop17)s.eVar17="D=c17"; 	// Canal
    if(s.prop18)s.eVar18="D=c18";	// Organizacion
    if(s.prop19)s.eVar19="D=c19";	// Producto
    if(s.prop20)s.eVar20="D=c20";	// Dominio
    if(s.prop21)s.eVar21="D=c21";	// Usuario Nuevo o recurrente
    if(s.prop22)s.eVar24="D=c22";
    if(s.prop24)s.eVar59="D=c24";	// Set hour:minutes:seconds (12:32:48)
    if(s.prop30)s.eVar30="D=c30";	// Unidad de Negocio
    if(s.prop31)s.eVar62="D=c31";	// Tematica
    if(s.prop33)s.eVar32="D=c33";   // Visit Number By Month
    if(s.prop34)s.eVar43="D=c34";
    if(s.prop35)s.eVar35="D=c35";	// Set hour (12:00PM)
    if(s.prop36)s.eVar33="D=c36";	// Join Date (Jueves-15/9/2012-12:32:48)
    if(s.prop39)s.eVar39="D=c39";  	// Titulo página sin seo
    if(s.prop44)s.eVar44="D=c44";
    if(s.prop45)s.eVar45="D=c45";	// Titulo página con seo
    if(s.prop47)s.eVar47="D=c47";
    if(s.prop49)s.eVar49="D=c49";
    if(s.prop50)s.eVar50="D=c50";

    if(s.prop60)s.eVar60="D=c60";	// Días desde última visita
    if(s.prop62)s.eVar22="D=c62";
    if(s.prop65)s.eVar65="D=c65";   // Scroll / Sin scroll
}


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="prisacom";
//s.trackingServer = "prisacom.112.2o7.net";
//Se ha solicitado vía PRPEPTHOT-448 cambiar la url por la siguiente
s.trackingServer = "prisacom.d3.sc.omtrdc.net";

/************************** PLUGINS SECTION *************************/

/*
* Plugin: getQueryParam 2.4
*/
s.getQueryParam=new Function("p","d","u","h",""
    +"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
    +"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
    +"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
    +"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
    +"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
    +"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
    +"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
    +"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
    +"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
    +"epa(v)}return''");

/*
 * Plugin: getValOnce_v1.11 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e","t",""
    +"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
    +"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
    +"==0?0:a);}return v==k?'':v");

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
    +"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
    +"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
    +"e()));}}if(!m)L=L?L+d+v:v;return L");


/*
* Utility manageVars v1.4 - clear variable values (requires split 1.5)
*/
s.manageVars=new Function("c","l","f",""
    +"var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
    +"geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
    +",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar"
    +"'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
    +"it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
    +"a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
    +"}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
    +");return true;}else{return false;}");
s.clearVars=new Function("t","var s=this;s[t]='';");
s.lowercaseVars=new Function("t",""
    +"var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index"
    +"Of('D=')!=0){s[t]=s[t].toLowerCase();}}");


/*
 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
 */
s.getTimeParting=new Function("t","z",""
    +"var s=this,cy;dc=new Date('1/1/2000');"
    +"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
    +"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
    +"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
    +"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
    +"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
    +"var days=['domingo','lunes','martes','miercoles','jueves','viernes',"
    +"'sabado'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
    +"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
    +"var dow=days[thisd];var ap='AM';var dt='laborable';var mint='00';"
    +"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
    +"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='festivo'};"
    +"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
    +"if(t=='d'){return dow};if(t=='w'){return dt}}};");

/*
* Plugin: getVisitNum - version 3.0
*/
s.getVisitNum=new Function("tp","c","c2",""
    +"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
    +"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
    +"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
    +"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
    +"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
    +"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
    +"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
    +"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
    +"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
    +";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
    +"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
    +"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
    +"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
    +"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
    +"t;");

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
    +"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
    +"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
    +"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
    +"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
    +"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
* Utility Function: split v1.5 (JS 1.0 compatible)
*/
s.split=new Function("l","d",""
    +"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
    +"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: Days since last Visit 1.1 - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
    +"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
    +"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
    +"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
    +"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
    +"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
    +"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
    +"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
    +"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
    +"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
    +"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
    +"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
    +"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
    +"!=f5) return '';else return cval_s;");

/*
* s_getLoadTime v1.36 - Get page load time in units of 1/10 seconds - modified
*/
function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):'';s_loadT=s_loadT/10}return s_loadT}




/* ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! =============== */
function AppMeasurement(){var a=this;a.version="1.4.3";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.yb;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.nb=function(a){try{console.log(a)}catch(b){}};a.za=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||0>a.indexOf(b)?
    a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.eb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&!/^[0-9.]+$/.test(c)&&
    (b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.eb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=
b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.F=[];a.ba=function(c,b,d){if(a.ta)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
    if(g&&"prerender"==g){if(!a.ca)for(a.ca=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&(a.ca=0,a.delayReady())});f=1;e=0}else d||a.l("_d")&&(f=1);f&&(a.F.push({m:c,a:b,t:e}),a.ca||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.l("_d")?b=1:a.na();0<a.F.length;){d=a.F.shift();if(b&&!d.t&&d.t>c){a.F.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
    break}a.ta=1;a[d.m].apply(a,d.a);a.ta=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ba("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.J,(m=a.lightTrackVars)&&(m=","+m+","+a.ga.join(",")+",");else{d=a.c;if(a.pe||a.linkType)m=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].xb,f=a[e].wb));m&&(m=","+m+","+a.A.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.L=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=0;p<n.length;p++)m.substring(0,
    n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.L(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.za(w)&&("prop"==k?m="c"+w:"eVar"==k?m="v"+
    w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.gb=function(){var c="",b,d,f,e,g,m,p,k,n="",q="",r=d="";if(a.lightProfileID)b=a.J,(n=a.lightTrackVars)&&(n=","+n+","+a.ga.join(",")+",");else{b=a.c;if(a.pe||a.linkType)n=a.linkTrackVars,q=a.linkTrackEvents,a.pe&&(d=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[d]&&(n=a[d].xb,q=a[d].wb));n&&(n=","+n+","+a.A.join(",")+",");q&&(q=","+q+",",n&&(n+=",events,"));a.events2&&
(r+=(""!=r?",":"")+a.events2)}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.L("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);!g&&"events"==e&&r&&(g=r,r="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e=
    "aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&
(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";
    break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":r&&(g+=(""!=g?",":"")+r);if(q)for(m=g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=q.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.L("c",a[e],n,e);g="";break;case "lightProfileID":e=
    "mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.L("mts",a[e],n,e));g="";break;default:a.za(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&
(c+=a.e)}return c};a.u=function(a){var b=a.tagName;if("undefined"!=""+a.Bb||"undefined"!=""+a.rb&&"HTML"!=(""+a.rb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.va=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:
    "",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.G=function(c){var b=a.u(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),
    g=3):c.src&&"IMAGE"==b&&(e=c.src):e=a.va(c),e)?{id:e.substring(0,100),type:g}:0};a.zb=function(c){for(var b=a.u(c),d=a.G(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.u(c),d=a.G(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.qb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.ha=1;d||(a.ha=0,d=a.clickObject);if(d){c=a.u(d);for(b=a.G(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:
        d.parentNode)c=a.u(d),b=a.G(d);b&&"BODY"!=c||(d=0);if(d){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.ha=1;!e&&d&&(e=a.va(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,q=0,r;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(r=
    g[m])&&p.substring(p.length-(r.length+1))=="."+r&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.ya(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)r=g[m],0<=p.indexOf(r)&&(q=1);q?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e=
    "",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.hb=function(){var c=a.ha,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats){var b=
    {},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),b[p]=f;f=a.account.split(",");if(c||a.e){c&&!a.e&&(e=1);for(p in b)if(!Object.prototype[p])for(m=0;m<f.length;m++)for(e&&(k=b[p].join(","),k==a.account&&(a.e+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),g=0;g<b[p].length;g++)k=b[p][g],k==f[m]&&(e&&(a.e+="&u="+a.escape(k)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(g,1),d=1);c||(d=1);if(d){e="";
    m=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};a.ib=function(){if(!a.vb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&(k=
    "1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Ab(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=f;
    a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.vb=1}};a.K={};a.loadModule=function(c,b){var d=a.K[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.K[c]=a[c]=d;d.Na=function(){return d.Ra};d.Sa=function(b){if(d.Ra=b)a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Na,set:d.Sa}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=
    b,a.ba(c+"_onLoad",[a,d],1)||b(a,d))};a.l=function(c){var b,d;for(b in a.K)if(!Object.prototype[b]&&(d=a.K[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.lb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.M=function(c,b){var d,
    f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.Ga=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.cb=function(a){var b,d,f,e,g,m=0,k,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(k=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,
        7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?m=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(m=",p,ei,"),m&&k)))){if((a=k.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=m.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?k=n+"&"+q:q=""}d=253-(k.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+k}return a};a.Ma=function(c){var b=
    a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.Y=!1;a.C=!1;a.Ta=function(){a.C=!0;a.i()};a.W=!1;a.Q=!1;a.Qa=function(c){a.marketingCloudVisitorID=c;a.Q=!0;a.i()};a.T=!1;a.N=!1;a.Ia=function(c){a.analyticsVisitorID=c;a.N=!0;a.i()};a.V=!1;a.P=!1;a.Ka=function(c){a.audienceManagerLocationHint=
    c;a.P=!0;a.i()};a.U=!1;a.O=!1;a.Ja=function(c){a.audienceManagerBlob=c;a.O=!0;a.i()};a.La=function(c){a.maxDelay||(a.maxDelay=250);return a.l("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.X=!1;a.B=!1;a.na=function(){a.B=!0;a.i()};a.isReadyToTrack=function(){var c=!0,b=a.visitor;a.Y||a.C||(a.Ma(a.Ta)?a.C=!0:a.Y=!0);if(a.Y&&!a.C)return!1;b&&b.isAllowed()&&(a.W||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.W=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.Qa]),
a.marketingCloudVisitorID&&(a.Q=!0)),a.T||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.T=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Ia]),a.analyticsVisitorID&&(a.N=!0)),a.V||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.V=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Ka]),a.audienceManagerLocationHint&&(a.P=!0)),a.U||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.U=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ja]),a.audienceManagerBlob&&
(a.O=!0)),a.W&&!a.Q&&!a.marketingCloudVisitorID||a.T&&!a.N&&!a.analyticsVisitorID||a.V&&!a.P&&!a.audienceManagerLocationHint||a.U&&!a.O&&!a.audienceManagerBlob)&&(c=!1);a.X||a.B||(a.La(a.na)?a.B=!0:a.X=!0);a.X&&!a.B&&(c=!1);return c};a.k=q;a.o=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.Xa=c;f.Wa=b;f.Ua=d;a.k==q&&(a.k=[]);a.k.push(f);0==a.o&&(a.o=setInterval(a.i,100))};a.i=function(){var c;if(a.isReadyToTrack()&&(a.o&&(clearInterval(a.o),a.o=0),a.k!=q))for(;0<a.k.length;)c=a.k.shift(),
    c.Wa.apply(c.Xa,c.Ua)};a.Oa=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Ga(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.fb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",
    c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+
    a._in,a.expectSupplementalData?!1:!0)));a.l("_s");a.Oa(c)||(b&&a.M(b),c&&(d={},a.Ga(d,0),a.M(c)),a.lb()&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.fb()),a.qb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Ha||(a.referrer=r.document.referrer),a.Ha=1,a.referrer=a.cb(a.referrer),a.l("_g")),a.hb()&&!a.abort&&(a.ib(),g+=a.gb(),a.pb(e,
    g),a.l("_t"),a.referrer=""))),c&&a.M(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=0};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.j=c,a.q=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.c.length;c++)if(b=a.c[c],"prop"==
    b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.pb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,f)),k=k.replace(/[^A-Za-z0-9]/g,
    "")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady();d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.ub?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].AudienceManagement.passData&":"")+b+"&AQE=1";a.ab(d);a.da()};a.ab=function(c){a.g||a.jb();
    a.g.push(c);a.fa=a.r();a.Fa()};a.jb=function(){a.g=a.mb();a.g||(a.g=[])};a.mb=function(){var c,b;if(a.ka()){try{(b=k.localStorage.getItem(a.ia()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ka=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.wa=function(){var c=0;a.g&&(c=a.g.length);a.v&&c++;return c};a.da=function(){if(!a.v)if(a.xa=q,a.ja)a.fa>a.I&&a.Da(a.g),a.ma(500);else{var c=a.Va();if(0<c)a.ma(c);else if(c=a.ua())a.v=1,a.ob(c),a.sb(c)}};a.ma=
    function(c){a.xa||(c||(c=0),a.xa=setTimeout(a.da,c))};a.Va=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.r()-a.Ca;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.ua=function(){if(0<a.g.length)return a.g.shift()};a.ob=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.nb(b)}};a.Pa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.S=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=
    null}s&&"y"==s.x?(a.S=!0,a.R=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.R=function(a){return k.$.parseJSON(a)},a.S=!0):a.R=function(){return null};a.sb=function(c){var b,d,f;a.Pa()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(a.S?b.pa=!0:b=0));!b&&a.kb&&(c=c.substring(0,2047));!b&&a.d.createElement&&a.AudienceManagement&&
a.AudienceManagement.isReady()&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="");b.ra=function(){try{a.la&&(clearTimeout(a.la),a.la=0),b.timeout&&(clearTimeout(b.timeout),b.timeout=0)}catch(c){}};b.onload=b.tb=function(){b.ra();a.$a();a.Z();a.v=0;a.da();if(b.pa){b.pa=!1;try{var c=a.R(b.responseText);AudienceManagement.passData(c)}catch(d){}}};b.onabort=
    b.onerror=b.bb=function(){b.ra();(a.trackOffline||a.ja)&&a.v&&a.g.unshift(a.Za);a.v=0;a.fa>a.I&&a.Da(a.g);a.Z();a.ma(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.tb():b.bb())};a.Ca=a.r();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Aa)try{f.removeChild(a.Aa)}catch(g){}f.firstChild?f.insertBefore(b,
    f.firstChild):f.appendChild(b);a.Aa=a.Ya}b.abort&&(a.la=setTimeout(b.abort,5E3));a.Za=c;a.Ya=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.D||a.q)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.aa=setTimeout(a.Z,a.forcedLinkTrackingTimeout)};a.$a=function(){if(a.ka()&&!(a.Ba>a.I))try{k.localStorage.removeItem(a.ia()),a.Ba=a.r()}catch(c){}};a.Da=function(c){if(a.ka()){a.Fa();try{k.localStorage.setItem(a.ia(),k.JSON.stringify(c)),a.I=a.r()}catch(b){}}};a.Fa=
    function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.g.length>a.offlineLimit;)a.ua()}};a.forceOffline=function(){a.ja=!0};a.forceOnline=function(){a.ja=!1};a.ia=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.r=function(){return(new Date).getTime()};a.ya=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.ub=
    c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.M(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=
    a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:k.location);d||(d="&");return c&&b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.A="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData pe pev1 pev2 pev3 pageURLRest".split(" ");
    a.c=a.A.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ga="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.J=a.ga.slice(0);a.oa="account allAccounts debugTracking visitor trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData AudienceManagement".split(" ");
    for(n=0;250>=n;n++)76>n&&(a.c.push("prop"+n),a.J.push("prop"+n)),a.c.push("eVar"+n),a.J.push("eVar"+n),6>n&&a.c.push("hier"+n),4>n&&a.c.push("list"+n);n="latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage".split(" ");a.c=a.c.concat(n);a.A=a.A.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";
    a.Ca=0;a.fa=0;a.I=0;a.Ba=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{a.kb="Microsoft Internet Explorer"==navigator.appName}catch(y){}a.Z=function(){a.aa&&(k.clearTimeout(a.aa),a.aa=q);a.j&&a.D&&a.j.dispatchEvent(a.D);a.q&&("function"==typeof a.q?a.q():a.j&&a.j.href&&(a.d.location=a.j.href));a.j=a.D=a.q=0};a.Ea=function(){a.b=a.d.body;a.b?(a.p=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.qa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",
        a.p,!1);else{a.b.removeEventListener("click",a.p,!0);a.qa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.H&&a.H==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var m=a.H=a.clickObject;a.ea&&(clearTimeout(a.ea),a.ea=0);a.ea=setTimeout(function(){a.H==m&&(a.H=0)},1E4);f=a.wa();a.track();if(f<a.wa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&
    e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.ya(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=
        1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.j=c.target,a.D=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.p):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.qa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.p,!0)),a.b.addEventListener("click",a.p,!1))):setTimeout(a.Ea,30)};a.Ea()}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();



function loadScript(src, callback) {

    var ss = document.createElement('script');
    ss.type = 'text/javascript';
    ss.async = true;

    var head = document.getElementsByTagName('head')[0];
    if (ss.addEventListener)
    {
        ss.addEventListener('load', callback, false);
    }
    else
    {
        if (ss.onload) {
            ss.onload = callback;
        }
        else
        {
            if (document.all)
            {
                s.onreadystatechange = function() {
                    var state = s.readyState;
                    if (state === 'loaded' || state === 'complete') {
                        callback();
                        s.onreadystatechange = null;
                    }
                }
            }
        }
    }

    ss.src = src;
    head.appendChild(ss);
}

s.events = "event2"; //por defecto el evento de pagina vista
s.prop45 = cadena_titulo;
s.prop39 = cadena_titulo_no_seo;

if (typeof(marcado_omniture_particular) == "undefined")
{

    var regexpNoticia = /http.?:\/\/([^\/]*)\/([^\/]*)\/(\d+)\/(\d+)\/(\d+)\/([^\/]*)\/(.*)\.html/i;
    var regexpSeccionVirtual = /http.?:\/\/([^\/]*)\/(seccion|programa)\/([^\/]*)/i;
    var regexpEspecialesPortadas = /http.?:\/\/([^\/]*)\/([^\/]*)\/([^\/]*)\//i;
    var regexpEspeciales = /http.?:\/\/[^\/]*\/([^\/]*)\/(\d{4})\/([^\/]*)\//i;

    var regexpPortadilla = /http.?:\/\/([^\/]*)\/([^\/]*)\/(.*)/i;
    var regexpPortada = /http.?:\/\/([^\/]*)\/?(.*)/i;
    var regexpMovil = /(http.?:\/\/[^\/]*)\/m\/(.*)/i;
    var lista40Reg = /http.?:\/\/[^\/]*\/lista40\/([^\/]*)\/.*/i;

    var result_re;
    var result_re2;
    var result_re3;
    var result_re4;
    var result_re5;
    var result_re6;

    var canal_omniture = "web";
    var direccion = document.location.href;

    result_re = regexpMovil.exec(direccion);
    if (result_re)   //version movil lo registramos y la ajustamos a una url no movil
    {
        canal_omniture = "web_movil";
        direccion = result_re[1] + "/" + result_re[2];
    }

    var dominio_omniture = "los40.co.cr";
    var seccion_omniture = "seccion";
    var subseccion_omniture = "subseccion";
    var channel_omniture = "channel";
    var prop1_omniture = "seccion";
    var prop3_omniture = "";

    s.pageName = s.siteID + location.pathname;


    //nuestra plataforma, los pagenames estan bien excepto en portadas de portales, lo arreglo en ese caso
    result_re = regexpNoticia.exec(direccion);
    if (result_re )
    {
        OMN_es_noticia = true;
        channel_omniture = result_re[2];
        //Es una noticia
        seccion_omniture = result_re[2];
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



        if (subseccion_omniture.indexOf("album") > -1 || subseccion_omniture == "fotorrelato")
        {
            if (typeof(subseccion_publi) != "undefined" && subseccion_publi != "")
                channel_omniture = subseccion_publi;
            else
                channel_omniture = "album";

            seccion_omniture = channel_omniture + ">album";

            prop3_omniture = "fotogaleria";
            prop1_omniture = seccion_omniture;
        }
        else
        {
            prop3_omniture = "articulo";
            if (seccion_omniture == "los40")
            {
                seccion_omniture = subseccion_omniture; //caso de videos...
                subseccion_omniture = "";
                prop1_omniture = seccion_omniture;
            }
            else
            {
                prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
            }

            s.prop44 = result_re[3] + "/" + result_re[4] + "/" + result_re[5];

            s.events += ',event77';
            //s.prop39 = "D=c45";
        }

        //desencadena el evento onload
        marcar_otros_elementos = true;

        //Indicamos los ids de los botones de compartir
        ids_tracking.push({"id":"fb","tipo":"compartir","marca":"facebook"});
        ids_tracking.push({"id":"twit","tipo":"compartir","marca":"twitter"});
        ids_tracking.push({"id":"gp","tipo":"compartir","marca":"google"});
        ids_tracking.push({"id":"bomn_tumblr","tipo":"compartir","marca":"tumblr"});
        ids_tracking.push({"id":"bomn_whatsapp","tipo":"compartir","marca":"whatasapp"});
        ids_tracking.push({"id":"bomn_pinterest","tipo":"compartir","marca":"pinterest"});
        ids_tracking.push({"id":"bomn_whatsapp","tipo":"compartir","marca":"whatasapp"});
        ids_tracking.push({"id":"superior_fb","tipo":"compartir","marca":"facebook"});
        ids_tracking.push({"id":"superior_mail","tipo":"compartir","marca":"mail"});
        ids_tracking.push({"id":"superior_twit","tipo":"compartir","marca":"twitter"});
        ids_tracking.push({"id":"superior_twit2","tipo":"reacciones","marca":"twitter"});
        ids_tracking.push({"id":"superior_gp","tipo":"compartir","marca":"google"});
        ids_tracking.push({"id":"superior_pinterest","tipo":"compartir","marca":"pinterest"});
        ids_tracking.push({"id":"superior_tumblr","tipo":"compartir","marca":"tumblr"});
        ids_tracking.push({"id":"superior_tuenti","tipo":"compartir","marca":"tuenti"});
        ids_tracking.push({"id":"fb_reacciones","tipo":"reacciones","marca":"facebook"});
        ids_tracking.push({"id":"twit_reacciones","tipo":"reacciones","marca":"twitter"});
        ids_tracking.push({"id":"gplus_reacciones","tipo":"reacciones","marca":"google"});
        ids_tracking.push({"id":"tuenti_reacciones","tipo":"reacciones","marca":"tuenti"});
        ids_tracking.push({"id":"pinterest_reacciones","tipo":"reacciones","marca":"pinterest"});
        ids_tracking.push({"id":"salirHot","tipo":"reacciones","marca":"salirHot"});
        ids_tracking.push({"id":"facebookMovil","tipo":"siguenos","marca":"facebook"});
        ids_tracking.push({"id":"twitterMovil","tipo":"siguenos","marca":"twitter"});
        ids_tracking.push({"id":"googleMovil","tipo":"siguenos","marca":"google"});
        ids_tracking.push({"id":"instagramMovil","tipo":"siguenos","marca":"instagram"});
        ids_tracking.push({"id":"instagramMovil","tipo":"siguenos","marca":"instagram"});
        ids_tracking.push({"id":"youtubeMovil","tipo":"siguenos","marca":"youtube"});
    }
    else
    {
        if (direccion.indexOf("//los40.co.cr/seccion") > -1 || direccion.indexOf("//los40.co.cr/programa") > -1) //portadilla de seccion virtual
        {
            result_re5 = regexpSeccionVirtual.exec(direccion);
            if (result_re5)
            {
                channel_omniture = result_re5[3];
                prop3_omniture = "portada"
                prop1_omniture =  result_re5[3] + ">home";
            }
            else
            {
                channel_omniture = "desconocido";
                prop3_omniture = "portada"
                prop1_omniture =  "desconocido>home";
            }
        }
        else
        {
            if (direccion.indexOf("//los40.co.cr/especiales/") > -1 ) //especiales
            {
                result_re5 = regexpEspeciales.exec(direccion);
                if (result_re5)
                {
                    channel_omniture = "especiales";
                    seccion_omniture = "especiales";
                    prop1_omniture = seccion_omniture + ">" + result_re5[3] + "_" + result_re5[2]; //concatenamos el anio
                    prop3_omniture = "especiales";
                }
                else
                {
                    result_re6 = regexpEspecialesPortadas.exec(direccion);
                    if (result_re6)
                    {
                        channel_omniture = result_re6[2];
                        seccion_omniture = result_re6[2];
                        prop1_omniture = seccion_omniture + ">" + result_re6[3];
                        prop3_omniture = "portada";
                    }
                    else
                    {
                        if (direccion.indexof("//los40.co.cr/especiales/") > -1 || direccion.indexof("//los40.co.cr/especiales/index.html") >-1 )
                        {
                            channel_omniture = "especiales";
                            seccion_omniture = "especiales";
                            prop1_omniture = seccion_omniture + ">home";
                            prop3_omniture = "portada";
                        }
                        else
                        {
                            channel_omniture = "especiales";
                            seccion_omniture = "especiales";
                            prop1_omniture = seccion_omniture + ">desconocido";
                            prop3_omniture = "";
                        }
                    }
                }
            }
            else
            {
                result_re2 = regexpPortadilla.exec(direccion);
                //No tiene forma de noticia ni especial puede ser una portadilla u otra cosa. ej tags
                if (result_re2)
                {
                    channel_omniture = result_re2[2];
                    //Es portada o portadilla
                    seccion_omniture = result_re2[2];
                    if (result_re2[3].indexOf("index.html") == 0 || result_re2[3] == "") //Portada de seccion
                    {
                        if(result_re2[2] == "buscador")
                        {
                            /*if (typeof(texto_busqueda) != "undefined" && texto_busqueda != "")
                                s.prop16 = texto_busqueda;
                            else
                                s.prop16 = "";

                            s.events += ",event1";

                            if (typeof(contador_busqueda) != "undefined" && parseInt(contador_busqueda) > 0)
                                s.events += ",event31";
                            else
                                s.events += ",event32";*/

                            var retrasa_marcado = true;
                        }
                        prop3_omniture = "portada"
                        prop1_omniture = seccion_omniture + ">home";
                    }
                    else
                    {
                        //Buscador Artistas
                        if (result_re2[2] == "buscador" && result_re2[3].indexOf("artistas") == 0)
                        {
                            prop3_omniture = "portada"
                            prop1_omniture = seccion_omniture + ">" + result_re2[3].replace(/\/.*/, "");
                        }
                        else
                        {
                            //Si no tiene / es portadilla y sino  cualquier cosa
                            //Portadilla subseccion

                            if (result_re2[3].indexOf("/") == -1)
                            {
                                subseccion_omniture = result_re2[3].replace(/\.html.*/, "");
                                if (seccion_omniture == "los40")
                                {
                                    seccion_omniture = subseccion_omniture;
                                    subseccion_omniture = "";
                                }

                                prop3_omniture = "portada"
                                prop1_omniture =  subseccion_omniture != "" ? seccion_omniture + ">" + subseccion_omniture : seccion_omniture + ">home";
                            }
                            else
                            {
                                if (result_re2[2] == "tag" || result_re2[2] == "autor" || result_re2[2] == "agr")
                                {
                                    if (result_re2[3].indexOf("listado") == 0 )
                                    {

                                        prop3_omniture = "portada"
                                        prop1_omniture = "tag>listado";
                                    }
                                    else
                                    {
                                        //Varias posibilidades
                                        var tagRegex = /([^\/]+)\/([^\/]+)\/?.*/i;
                                        result_re6 = tagRegex.exec(result_re2[3]);

                                        if (result_re6)
                                            subseccion_omniture = result_re6[1] + "_" + result_re6[2];
                                        else
                                            subseccion_omniture = result_re2[3];

                                        prop1_omniture = result_re2[2] + ">" +  subseccion_omniture;


                                        prop3_omniture = "portada"
                                    }
                                }
                                else
                                {
                                    if ( seccion_omniture == "estaticos")
                                    {
                                        prop3_omniture = "";
                                        prop1_omniture = seccion_omniture + ">" + result_re2[3].replace(/\/.*/,"");
                                    }
                                    else
                                    {
                                        //Portadas especiales /los40/emisoras/,  parrilla y los avisos legales
                                        if (result_re2[3].indexOf("emisoras") == 0 || result_re2[3].indexOf("parrilla") == 0)
                                        {
                                            channel_omniture = 'radio';
                                            prop3_omniture = "portada";
                                            prop1_omniture = channel_omniture + ">" + result_re2[3].replace(/\/.*/,"");

                                        }
                                        else
                                        {
                                            //Lista40 tienen casos especiales
                                            result_re6 = lista40Reg.exec(direccion);

                                            if (result_re6)
                                            {
                                                prop3_omniture = "";
                                                prop1_omniture = seccion_omniture + ">" + result_re6[1];
                                            }
                                            else
                                            {
                                                prop3_omniture = "";
                                                prop1_omniture = seccion_omniture + ">" + "desconocido";

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else
                {

                    //Portales desapareceran
                    //Puede ser portada

                    result_re3 = regexpPortada.exec(direccion);
                    if (result_re3)
                        result_re3[2] = result_re3[2].replace(/\?.*/,""); //quitamos lo parametros

                    if (result_re3 && (result_re3[2].indexOf("index.html") == 0 || result_re3[2] == ""))
                    {
                        prop3_omniture = "portada"
                        seccion_omniture = result_re3[1].replace(/los40\.co\.cr/, "");

                        if (seccion_omniture == "")
                        {
                            prop1_omniture = "home";
                            channel_omniture = "home";
                        }
                        else
                        {
                            channel_omniture = seccion_omniture.substring(0,seccion_omniture.length-1);
                            prop1_omniture = channel_omniture + ">home";
                            s.pageName = "los40cr/" + channel_omniture;
                        }
                    }
                    else //Ni idea de lo que puede ser
                    {
                        channel_omniture = "desconocido";
                        prop3_omniture = "";
                        prop1_omniture = "desconocido" + ">" + "desconocido";
                    }
                }
            }
        }
    }

    if (channel_omniture == "los40")
        channel_omniture = seccion_omniture;


    s.channel = channel_omniture;

    s.prop1 = prop1_omniture;
    s.prop2 = "";
    s.prop3 = prop3_omniture;
    s.prop4 = "";
    s.prop5 = "D=g";
    s.prop6 = "D=r";
    s.prop7 = "";
    s.prop8 = s.getTimeParting('d',gmt); 			// Set day  (Jueves)
    s.prop9 = s.getTimeParting('w', gmt);			// Set weekday (laborable/festivo)
    s.prop11 = "";
    s.prop12 = "";
    s.prop13 = "";
    s.prop14 = "costarica";							// Pais del medio
    s.prop15 = "america";
    s.prop17 = canal_omniture;						// Canal
    s.prop18 = "prisa";								// Organizacion
    s.prop19 = "los40cr";							// Producto
    s.prop20 = dominio_omniture;					// Dominio
    s.prop21 = s.getNewRepeat();   					// Usuario Nuevo o recurrente
    s.prop22 = "musical";
    s.prop24 = hours+":"+minutes+":"+seconds;		// Set hour:minutes:seconds (12:32:48)
    s.prop35 = s.getTimeParting('h', gmt);			// Set hour (12:00PM)
    s.prop30 = "radio";							// Unidad de Negocio
    s.prop31 = "musica";						// tematica
    if (typeof(PEPuid) != "undefined")
        s.prop34 = PEPuid;
    s.prop36 = s.getTimeParting('d', gmt)+"-"+day+"/"+month+"/"+fecha.getFullYear()+"-"+s.prop24;	// Join Date (Jueves-15/9/2012-12:32:48)
    s.prop57 = "";

    s.prop60 = s.getDaysSinceLastVisit('s_lv'); 	// Dias última visita
    if (typeof(PEPuname) != "undefined")
        s.prop62 = "logueado";
    else
        s.prop62 = "anonimo";
    /*
    Jerarquias
    */
    s.hier1 = 'D=c18+">"+c19+">"+c20+">"+c1+">"pageName';

    /* KRX */
    //jira PRPEPTHOT-206, han pedido quitar pageID pageName authors org
    //pageID: id_noticia,pageName: s.pageName,authors: arrayAuthors(),org: s.prop18,

    if (OMN_es_noticia)
    {
        DataLayerKrx = {
            pageTitle: s.prop45,
            destinationURL: document.location.href,
            referringURL: document.referrer,
            tags: arrayTags(),
            language: "es",
            publisher: s.prop19,
            geoRegion: s.prop14,
            domain: s.prop20,
            source: "web",
            businessUnit: s.prop30,
            thematic: s.prop31,
            primaryCategory: s.channel,
            subCategory1: typeof(subseccion_omniture) != "undefined" ? subseccion_omniture : "" ,
            pageType: s.prop3,
            edition: "es",
            profileID: (typeof(s.prop34) != "undefined" ? s.prop34 : ""),
            registeredUser: (s.prop62 == "logueado" ? "1": "0"),
            creationDate: (typeof(s.prop44) != "undefined" ? s.prop44.replace(/\//g,"") : "")
        }
    }

    // Set Load Time (page):
    if (s_getLoadTime())
        s.events += ",event90=" + s_getLoadTime();

    if (marcar_otros_elementos || ids_tracking.length > 0)
    {
        OMNaddEvent(window, 'load', function(){
            //Nos enganchamos al click de todos los ids del array
            var i;
            for (i=0; i< ids_tracking.length; i++)
            {
                if (document.getElementById(ids_tracking[i].id))
                {
                    if (document.getElementById(ids_tracking[i].id).href != undefined && document.getElementById(ids_tracking[i].id).href != "" && document.getElementById(ids_tracking[i].id).href.indexOf('javascript') == -1)
                        document.getElementById(ids_tracking[i].id).target = "_blank";
                    document.getElementById(ids_tracking[i].id).idx = i;
                    EPETaddEvent(document.getElementById(ids_tracking[i].id), "click", function(){marcadoLinks(this)});
                }
            }
        });
    }

    //redefinicion de variables del objeto s. Permite un marcado forzado.

    if (typeof(redefinicion_variables_om) != "undefined")
    {
        for (var key in redefinicion_variables_om)
        {
            s[key] = redefinicion_variables_om[key];
        }
    }

}
else
{
    cambiaDatosOmniture();
}


if (marcado_automatico)
{
    var s_code;

    if (typeof(retrasa_marcado) == "boolean" && retrasa_marcado)
    {
        OMNaddEvent(window, 'load', function(){
            if (channel_omniture == "buscador")
            {
                if (typeof(texto_busqueda) != "undefined" && texto_busqueda != "")
                    s.prop16 = texto_busqueda;
                else
                    s.prop16 = "";

                s.events += ",event1";

                if (typeof(contador_busqueda) != "undefined" && parseInt(contador_busqueda) > 0)
                    s.events += ",event31";
                else
                    s.events += ",event32";
                if (MPEP_adblock_enabled)
                {
                    s.prop57 = 'D="con_ADBLOCK-"+User-Agent';
                    s.eVar57 = 'D="con_ADBLOCK-"+User-Agent';

                }
                else
                {
                    s.prop57 = 'D="sin_ADBLOCK-"+User-Agent';
                    s.eVar57 = 'D="sin_ADBLOCK-"+User-Agent';
                }
            }
            s_code=s.t();if(s_code)document.write(s_code);
        });
    }
    else
    {
        //var s_code=s.t();
        //if(s_code)
        //	document.write(s_code);
        var tmTrack = 600;

        setTimeout(function(){
            if (MPEP_adblock_enabled )
            {
                s.prop57 = 'D="con_ADBLOCK-"+User-Agent';
                s.eVar57 = 'D="con_ADBLOCK-"+User-Agent';
            }
            else
            {
                s.prop57 = 'D="sin_ADBLOCK-"+User-Agent';
                s.eVar57 = 'D="sin_ADBLOCK-"+User-Agent';
            }
            var s_code = s.t();
            omn_launchPixelComScore();
            //if (s_code)
            //	document.write(s_code);
        },tmTrack);

    }
}
//registros y logins
//Recibimos los parametros
var parametros = "&" + document.location.search.substr(1) + "&";
if (parametros.indexOf("event=") > -1 || parametros.indexOf("event_log=") >-1)
{
    //Tipo de registro
    var eregReg = /\&event=([^\&]+)\&/;
    var eregLog = /\&event_log=([^\&]+)\&/;
    var resReg = eregReg.exec(parametros) || eregLog.exec(parametros);
    var evar37_omniture = "";
    var evento = "";
    if (resReg)
    {
        var key_found = resReg[1];
        switch (key_found)
        {
            case "okregistro": case "oklogin": case "okdesc":
            evar37_omniture = "clasico";
            break;
            case "fa":
                evar37_omniture = "facebook";
                break;
            case "tw":
                evar37_omniture = "twitter";
                break;
            case "me":
                evar37_omniture = "msn";
                break;
            case "li":
                evar37_omniture = "linkedin";
                break;
            case "go":
                evar37_omniture = "google";
                break;
            case "okvinculacion":
                evar37_omniture = "vinculacion";
                break;
        }


        if (evar37_omniture != ""){

            var evars = ['18','19'];
            var evars_values = [s.prop18, s.prop19];

            evars.push('37');
            evars_values.push(evar37_omniture);

            if (parametros.indexOf("event=") > -1)
            {
                setTimeout('launchAjaxOMN(evars.join("|"), evars_values.join("|"),"event21")',1000);
            }

            if (parametros.indexOf("event_log=") > -1)
            {
                if (key_found == "okvinculacion")
                    evento = "event110";
                else
                {
                    if (key_found == "okdesc")
                        evento = "event85";
                    else
                        evento = "event23";
                }
                setTimeout('launchAjaxOMN(evars.join("|"), evars_values.join("|"),evento)',1000);
            }
        }
    }
}



//INCLUIR EN EL FICHERO S_CODE.JS DE PRODUCTO

// function external Player

function externalPlayerOMN(player,accion,reproduccion,canalVideo,cancion,artista,duracion){

    s.usePlugins = false;

    s.account = 'prisacomglobal';

    s.linkTrackVars="events,eVar2,eVar3,eVar4,eVar8,eVar9,eVar17,eVar18,eVar19,eVar20,eVar30,eVar35,eVar39,eVar42,eVar45,eVar47,eVar48,eVar68,eVar70,eVar74";

    s.linkTrackEvents='event11,event12,event13,event14';

    switch(accion){

        case "inicio":

            s.events="event11";

            s.eVar8=cancion;

            s.eVar74="0";														// duracion video inicio/fin (180 sg)

            break;

        case "fin":

            s.events="event12";

            s.eVar8=cancion;

            s.eVar74=duracion;

            break;

        case "inicio_publi":

            s.events="event13";

            s.eVar9=cancion;

            s.eVar74="0";

            break;

        case "fin_publi":

            s.eVar9=cancion;

            s.events="event14";

            break;

    }



    s.eVar2=player;																// Nombre Player

    s.eVar3=s.pageName;															// pageName

    s.eVar17="web";																// Canal

    s.eVar18="prisa";															// Organizacion

    s.eVar19="los40principales";												// Producto

    s.eVar20="los40.co.cr";   													// Dominio

    s.eVar30="radio";   														// Unidad de Negocio

    s.eVar35=s.getTimeParting('h', gmt);										// Set hour (12:00PM)

    if (reproduccion = false){s.eVar42="streaming";}else{s.eVar42="vod";};		// Tipo reproduccion (vod,streaming)

    s.eVar47=artista;															// Artista Video :: YES FM

    s.eVar48=s.getTimeParting('d',gmt); 										// Set day  (Jueves)

    s.eVar68=canalVideo;														// Canal de Video :: YES FM

    s.eVar70="video";

    s.manageVars("lowercaseVars")

    s.tl(this,'o',"muzuPlayerOMN");

    s.manageVars("clearVars");

}

function arrayTags(){
    if (typeof(listado_norm_tags) == "undefined" || typeof(listado_id_tags) == "undefined")
        return [];

    var salida = [];
    var itags = listado_id_tags.split(",");
    var ntags = listado_norm_tags.split(",")
    if (itags.length != ntags.length)
        return [];

    for (var j=0; j< itags.length; j++)
    {
        salida.push({"id":itags[j], "name":ntags[j]});
    }

    return salida;
}

function arrayAuthors(){
    if (typeof(listado_norm_autores) == "undefined" || typeof(listado_id_autores) == "undefined")
        return [];

    var salida = [];
    var iauthor = listado_id_autores.split(",");
    var nauthor = listado_norm_autores.split(",")
    if (iauthor.length != nauthor.length)
        return [];

    for (var j=0; j< iauthor.length; j++)
    {
        salida.push({"id":iauthor[j], "name":nauthor[j]});
    }

    return salida;
}
function iradirecto(){
    launch('29','cabecera:ir a directo','event33');
}
function omn_trackEventRadio(eventName, data) {
    var map={
        "events":{
            "mediaBegin": "event11",
            "mediaComplete": "event12",
            "adStart": "event13",
            "adComplete": "event14",
            "adSkip": "event15",
            "button": "event33",
            "rrss": "event69",
            "mediaHalf": "event79"
        }
    };
    if(typeof (data) != "undefined"){
        if(data["data.mediaTypeMode"]=="audio"){
            map.events.mediaBegin= "event16";
            map.events.mediaComplete= "event17";
            map.events.mediaHalf= "event18";
        }
    }

    if (!map.events.hasOwnProperty(eventName)){
        return false;
    }
    s.usePlugins= false;
    s=s_gi(s.account);
    s.events = map.events[eventName];
    s.linkTrackEvents = map.events[eventName];
    s.linkTrackVars = "eVar2,eVar3,eVar4,eVar5,eVar6,eVar8,eVar12,eVar13,eVar17,eVar18,eVar19,eVar20,eVar21,eVar22,eVar29,eVar30,eVar32,eVar33,eVar35,eVar38,eVar39,eVar42,eVar43,eVar44,eVar45,eVar48,eVar57,eVar60,eVar66,eVar67,eVar70,eVar73,eVar74,eVar80,eVar81,eVar84,list3";

    s.list3= data["data.tagsList"];
    s.eVar2= data["data.playerName"];
    s.eVar3=s.siteID + location.pathname; // pageName
    s.eVar4=s.channel; // channel
    s.eVar5= s.pageURL;
    s.eVar6= data["data.tipoContenido"];
    s.eVar8= data["data.name"];
    s.eVar13= data["data.programa"] + data["data.emisora"];
    if(data["data.mediaType"]=="aod"){
        s.eVar13= s.evar13= data["data.tags"];
    }
    s.eVar17="web";
    s.eVar18="prisa"; // Organization
    s.eVar19= product; // Product
    s.eVar20=document.domain.replace(/www./gi,""); // Domain|Subdomain
    s.eVar21=s.getNewRepeat(); // User New / Repeat
    if (typeof(PEPuname) != "undefined") {
        s.eVar22 = "logueado";
    } else {
        s.eVar22= "anonimo"; // Logueado / Anonymous
    }
    s.eVar30="radio";
    s.eVar32=s.getVisitNum(); // Visit Number By Month
    s.eVar33= s.getTimeParting('d', gmt)+"-"+day+"/"+month+"/"+fecha.getFullYear()+"-"+s.prop24;
    s.eVar35=hours; // Set hour (12);
    s.eVar38= data["data.idTop"];
    s.eVar39=document.title; // Title
    if (typeof(PEPuid) != 'undefined') {
        s.eVar43=PEPuid; // User Id
    }
    s.eVar42= data["data.mediaType"];
    s.eVar44=s.getTimeParting('h', gmt); // Set hour (12:00PM)
    s.eVar45=document.title; // Title
    s.eVar48=s.getTimeParting('d',gmt); // Set day (Jueves)
    s.eVar57= s.prop57;
    s.eVar60=s.getDaysSinceLastVisit('s_lv'); // Days Since Last Visit
    s.eVar66=s.getTimeParting('w', gmt); // Set weekday (laborable/festivo)
    s.eVar67= data["data.adEnabled"];
    s.eVar70= data["data.mediaTypeMode"];
    s.eVar73= dtmVersion;
    s.eVar74= data["data.progressTime"];
    s.eVar81= data["data.emisora"];
    s.eVar84= data["data.extraccion"];
    s.tl(this,'o',eventName);
    s.clearVars();
    s.usePlugins=true;
}
function omn_launchPixelComScore(){
    var _comscore = _comscore || [];
    _comscore.push({ c1: "2", c2: "8671776" });
    (function() {
        var s = document.createElement("script");
        var el = document.getElementsByTagName("script")[0]; s.async = true;
        s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
        el.parentNode.insertBefore(s, el);
    })();
    var comscoreImg = document.createElement("img");
    comscoreImg.width = '1';
    comscoreImg.height = '1';
    comscoreImg.style.display = 'none';
    comscoreImg.src = (useSSL ? "https://sb.scorecardresearch.com" : "http://b.scorecardresearch.com") + "/p?c1=2&c2=8671776&cv=2.0&cj=1&c7=" + encodeURIComponent(document.location.href) + "&c8=" + encodeURIComponent(cadena_titulo) +  "&c9=" + encodeURIComponent(document.referrer) + "&rn=" + String(Math.random()).substr(2,9);
}