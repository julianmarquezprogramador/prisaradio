//AMP code//
var arrayAmp= new Array();
getValuesAmp();
var hostn=location.hostname;
if(typeof arrayAmp !== 'undefined') {
    if (arrayAmp['amp'] == "true") {
        hostn= arrayAmp["source_host"];
    }
}
//end AMP code//

var isPlayer= false;
var cadena_titulo_limpio= "";

var country="españa";
var zone="españa";
var product= "los40";

s.prop14=country;											    													// Country
s.prop15=zone;  																							 			// Zone (Region) : RADIO
s.prop19=product;																									// Product
// if(/.pa/.test(hostn)){														//Panamá
//     country="panama";
//     zone="america";
//     product= "los40pa";
// }

if(omn_isPlayer()){
    section="player";
    s.channel= section;
}

//tucu
if(typeof arrayAmp !== 'undefined') {
    if (arrayAmp['amp'] == "true") {
        omn_cleanTitleAMP();
        //re-write some props for AMP
        s.prop3= "articulo";
        s.prop17="amp";
        s.prop20= omn_deleteWWW(arrayAmp["server"]);
        s.prop39= omn_cleanTitle_withoutSeoAMP(arrayAmp['title']);
        s.prop45= cadena_titulo_limpio;
        s.pageURL= omn_cleanUrl(arrayAmp["source_url"]);
        s.pageName= omn_deleteWWW(arrayAmp["server"]) + omn_cleanUrl(arrayAmp["pageURL"]).replace(/http.?:\/\/[^\/]*/, "");
        s.server= omn_deleteWWW(arrayAmp["server"]);
        s.referrer= omn_cleanUrl(arrayAmp["ref"]);
        s.prop57= "";
    }
}

if(s.ab_enabled){
    s.prop57 = 'D="con_ADBLOCK-"+User-Agent';
    s.eVar57 = 'D="con_ADBLOCK-"+User-Agent';
}else{
    s.prop57 = 'D="sin_ADBLOCK-"+User-Agent';
    s.eVar57 = 'D="sin_ADBLOCK-"+User-Agent';
}

if(typeof arrayAmp !== 'undefined') {
    if (arrayAmp['amp'] == "true") {
        s.prop57 = 'D="sin_ADBLOCK-"+User-Agent';
        s.eVar57 = 'D="sin_ADBLOCK-"+User-Agent';
    }
}
else{
    if(s.ab_enabled){
        s.prop57 = 'D="con_ADBLOCK-"+User-Agent';
        s.eVar57 = 'D="con_ADBLOCK-"+User-Agent';
    }else{
        s.prop57 = 'D="sin_ADBLOCK-"+User-Agent';
        s.eVar57 = 'D="sin_ADBLOCK-"+User-Agent';
    }
}

function omn_isPlayer(){
    isPlayer= false;
    if((s.siteID.indexOf("play")>-1)||(s.siteID.indexOf("player")>-1)||(s.siteID.indexOf("escucha")>-1)||(s.siteID.indexOf("escuche")>-1)||(s.siteID.indexOf("envivo")>-1)||(s.siteID.indexOf("los40.com.gt")>-1)){
        isPlayer= true;
    }
    return isPlayer;
}

////////////////////////////////////FUNCTIONS FOR AMP///////////////////////////////////////////////////////////
function getParamsUrl(){
    // capturamos la url
    var loc = location.href;
    // si existe el interrogante
    if(loc.indexOf('?')>0){
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        var GET = getString.split('&');
        var get = {};
        // recorremos todo el array de valores
        for(var i = 0, l = GET.length; i < l; i++){
            var tmp = GET[i].split('=');
            get[tmp[0]] = decodeURI(tmp[1]);
        }
        return get;
    }
}

function getValuesAmp(){
    arrayAmp=getParamsUrl();
    if(arrayAmp){
        //recogemos los valores que nos envia la URL en variables para trabajar con ellas
        var amp = arrayAmp['amp'];
        //var edad = valores['edad'];
        // hacemos un bucle para pasar por cada indice del array de valores
        for(var index in arrayAmp){
            console.log("clave: "+index+" : "+arrayAmp[index]);
        }
        console.log("amp: "+ amp);
    }
}

function omn_cleanTitleAMP(){
    cadena_titulo_limpio= "";
    //var titleWithSeo= decodeURIComponent(arrayAmp['title']);
    cadena_titulo_limpio= decodeURIComponent(arrayAmp['title']);
    //cadena_titulo_limpio= titleWithSeo.toLocaleLowerCase();
}

//function for cleaning title of the V39 for AMP
function omn_cleanTitle_withoutSeoAMP(stringWithPipes){
    var array_stringWithPipes= stringWithPipes.split("|");
    var stringWithoutPipes= decodeURIComponent(array_stringWithPipes[0]);
    return stringWithoutPipes;
    // cadena_titulo_limpio= "";
    // var titleWithSeo= decodeURIComponent(arrayAmp['title']);
    // cadena_titulo_limpio= titleWithSeo.toLocaleLowerCase();
}

//Catching the first element of the title
function omn_catchFirsElement(stringWithScript){
    var array_stringWithScript= stringWithScript.split("-");
    var stringWithoutScript= decodeURIComponent(array_stringWithScript[0]);
    return stringWithoutScript;
}

//CleaningUrl
function omn_cleanUrl(url){
    var decodeUrl= decodeURIComponent(url);
    return decodeUrl;
}

//if have a string like www, then delete this section of the string
function omn_deleteWWW(url){
    var subString="";
    var posicion= url.indexOf("www", 0);//search sub-string www in start of the string
    if(posicion==0){//if found, then delete the sub-string www
        subString= url.substring(4);
        url= subString;
    }
    return url;
}
//if have a string like http:// or https://, then delete this section of the string
function omn_deleteHttp(url){
    var subString="";
    var posicion= url.indexOf("http://", 0);//search sub-string http:// in start of the string
    var posicionSSL= url.indexOf("https://", 0);//search sub-string https:// in start of the string
    if(posicion==0){//if found, then delete the sub-string http
        subString= url.substring(7);
        url= subString;
    }
    if(posicionSSL==0){//if found, then delete the sub-string https
        subString= url.substring(8);
        url= subString;
    }
    return url;
}

//Rename domain => "los40.com.co"= "los40.co"; "los40.com"= "los40com"; "los40.com.ar"="los40ar";
function omn_renameDomain(domain){
    var array_domain= domain.split(".");
    if(array_domain.length == 3){//have un domain like los40.com.co or los40.com.ar
        domain= array_domain[0] + array_domain[2];
    }
    else{
        domain= array_domain[0] + array_domain[1];
    }
    return domain;
}
////////////////////////////////////////END FUNCTIONS AMPS//////////////////////////////////////////////////////

var dtm_version= "dtm version 1.0.3";
if(typeof tucu !== 'undefined'){
    if(typeof tucu.dev !== 'undefined'){
        if(tucu.dev == true){
            console.log("/////////////////////DTM////////////////////////////");
            console.log(dtm_version);
            console.log("feature: Added code for AMP");
            console.log("////////////////////////////////////////////////////");
        }
        else{
            console.log(dtm_version);
        }
    }
}

else{
    console.log(dtm_version);
}