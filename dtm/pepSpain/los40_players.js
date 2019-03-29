/* Function to get RSIDs from UI */
//AMP code//
var arrayAmp= new Array();
getValuesAmp();
var hostn=location.hostname;
var useSSL = document.location.protocol == 'https:';
if(typeof arrayAmp !== 'undefined') {
    if (arrayAmp['amp'] == "true") {
        hostn= arrayAmp["source_host"];
    }
}
//end AMP code//


var DTMR;

DTMR = function (url) {
    this._hostn = url.match(/^[a-z][a-z0-9+.-]*:\/\/([a-z0-9._~%!$&'()*+,;=-]+@)?([a-z0-9._~%-]+|\[[a-z0-9._~%!$&'()*+,;=:-]+\])/ig)[0];
    Object.defineProperties(this, {
        _hostn: {
            writable:false,
            enumerable:false
        },
        _v: {
            value: function() {
                return {
                    _sep: ":::",
                    prefix: "s_code",
                    version: "2.1.1",
                    date: "27-03-2019",
                    author: "jcarneros"
                }
            }(),
            writable:false,
            enumerable:false
        },
        _objProductos: {
            value: [
                {
                    re:/^(https?)?.*?los40\.com\/?$/,  // España
                    c:"españa",  // country
                    z:"españa",  // zone
                    p: "los40"   // product
                },
                {
                    re:/^(https?)?.*?los40\.com\.pa\/?$/,  // Panamá
                    c:"panama",
                    z:"america",
                    p: "los40pa"
                },
                {
                    re:/^(https?)?.*?los40\.com\.ar\/?$/,  // Argentina
                    c:"argentina",
                    z:"america",
                    p: "los40ar"
                },
                {
                    re:/^(https?)?.*?los40\.com\.mx\/?$/,  // Mexico
                    c:"mexico",
                    z:"america",
                    p: "los40mx"
                },
                {
                    re:/^(https?)?.*?los40\.com\.co\/?$/,  // Colombia
                    c:"colombia",
                    z:"america",
                    p: "los40co"
                },
                {
                    re:/^(https?)?.*?los40\.cl\/?$/,  // Chile
                    c:"chile",
                    z:"america",
                    p: "los40cl"
                },
                {
                    re:/^(https?)?.*?los40\.co\.cr\/?$/,  //Costa Rica
                    c:"costa rica",
                    z:"america",
                    p: "los40cr"
                },
                {
                    re:/^(https?)?.*?los40\.do\/?$/,  // Republica Dominicana
                    c:"republica dominicana",
                    z:"america",
                    p: "los40do"
                },
                {
                    re:/^(https?)?.*?los40\.com\.py\/?$/,  // Paraguay
                    c:"paraguay",
                    z:"america",
                    p: "los40py"
                },
                {
                    re:/^(https?)?.*?los40\.com\.ec\/?$/,  // Ecuador
                    c:"ecuador",
                    z:"america",
                    p: "los40ec"
                },
                {
                    re:/^(https?)?.*?los40\.com\.gt\/?$/,  // Guatemala
                    c:"guatemala",
                    z:"america",
                    p: "los40gt"
                }
            ],
            writable:false,
            enumerable:false
        },
        _objProducto: {
            get: function() {
                var self = this;
                var output = this._objProductos.filter(function(x) {
                    var output = x.re.test(self._hostn);
                    return output;
                });
                return output[0];
            },
            enumerable:false
        },
        country: {
            get: function() {return this._objProducto.c},
            enuerable: true
        },
        zone: {
            get: function() {return this._objProducto.z},
            enuerable: true
        },
        product: {
            get: function() {return this._objProducto.p},
            enuerable: true
        },
        version: {
            get: function () {
                return Array("dtmRadio version",this._v.prefix, this._v.version, this._v.date, this._v.author).join(this._v._sep);
            },
            enumerable: true
        },
        log: {
            value: function () {
                var cambios = [
                    "/////////////////////DTM////////////////////////////",
                    this.version,
                    "feature: Added s.channel into Player",
                    "feature: Added code for AMP",
                    "feature: changed value s.prop19 added product switch country",
                    "feature: writes same in the page name in Web like in AMP",
                    "feature: obtein topPlayer data and send pixel to omniture",
                    "feature: send pixel comscore",
                    "feature: cleaning title without pipes '|'",
                    "feature: Delete dot in domain for pageName",
                    "////////////////////////////////////////////////////",
                ];
                cambios.forEach(function (x) {
                    console.log(x);
                });
            }
        }

    });
};

var dtmRadio = new DTMR(location.href);

function getAnalyticsAccount(){
    for (var toolid in _satellite.tools){
        if (_satellite.tools[toolid].settings.engine == "sc"){
            var accountP = _satellite.tools[toolid].settings.account;
            arrAccount = accountP.split(",");
            return arrAccount[0];
        }
    }
}

function getAnalyticsAccountF(){
    for (var toolid in _satellite.tools){
        if (_satellite.tools[toolid].settings.engine == "sc"){
            var accountF = _satellite.tools[toolid].settings.account;
            arrAccount = accountF.split(",");

            return arrAccount[0];
        }
    }
}

s=new AppMeasurement();
s.account = getAnalyticsAccount();
s.accountF = getAnalyticsAccountF();

var isPlayer= false;
var cadena_titulo_limpio= "";


/******** VISITOR ID SERVICE CONFIG - REQUIRES VisitorAPI.js ********/
//s.visitor=Visitor.getInstance("INSERT-MCORG-ID-HERE")

/************************** CONFIG SECTION **************************/
s.debugTracking=false;

/* You may add or alter any code config here. */
s.charSet="UTF-8";

s.server = location.host;
var arraySite = s.server.split(".");
var first_dot = s.server.indexOf(".", 1);
var last_dot = s.server.lastIndexOf(".");

if (arraySite[0]=="www"){
    /* Page Name Config */
    s.siteID = s.server.slice(first_dot + 1);
    /* Config cookie domain to  www.site.com.xx  */
    document.URL.indexOf("."+arraySite[2]+".") > 0 ? s.cookieDomainPeriods = "3" : s.cookieDomainPeriods = "2";
}else{
    /* Page Name Config */
    s.siteID = s.server;
    /* Config cookie domain to  www.site.com.xx  */
    document.URL.indexOf("."+arraySite[1]+".") > 0 ? s.cookieDomainPeriods = "3" : s.cookieDomainPeriods = "2";
}

/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters="javascript:,"+ s.siteID +"";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";

/* Form Analysis Plugin */
//Abandon,Success,Error "event26,event27,event28"

/* TimeParting Config */
var date = new Date();
var anoActual=date.getFullYear(); //Recogemos el año en el que estamos
var gmt = -(date.getTimezoneOffset()/60) - 1;
if(gmt>=0){
    gmt = "+" + gmt.toString();
}
s.dstStart="1/1/"+anoActual; 			// update to the correct Daylight Savings Time start
s.dstEnd="12/31/"+anoActual; 			// update to the correct Daylight Savings Time end date
s.currentYear=anoActual; 				// update to the current year


//DateTime
/* Props used for TimeParting */
var fecha=new Date();
var month=fecha.getMonth()+1;if(month<10)month='0'+month;
var seconds=fecha.getSeconds();if(seconds<10)seconds='0'+seconds;
var minutes=fecha.getMinutes();if(minutes<10)minutes='0'+minutes;
var hours=fecha.getHours();if(hours<10)hours='0'+hours;
var day=fecha.getDate();if(day<10)day='0'+day;


/* variables undefined asign empty value */
if (typeof(pageName) == 'undefined') pageName='';
if (typeof(section) == 'undefined') section='';
if (typeof(subsection) == 'undefined') subsection='';
if (typeof(subsubsection) == 'undefined') subsubsection='';
if (typeof(type) == 'undefined') type='otros';
if (typeof(userId) == 'undefined') userId='';
if (typeof(status) == 'undefined') status='';
if (typeof(error) == 'undefined') error='';
if (typeof(title) == 'undefined') title='';

if (typeof(program) == 'undefined') program='';
if (typeof(radio_station) == 'undefined') radio_station='';


if (typeof(adblock_enabled) == 'undefined') adblock_enabled='D="con_ADBLOCK-"+User-Agent';
omn_launchPixelComScore();
//loadScript("//static.chartbeat.com/js/chartbeat.js", chartbeatSetUp());
/************** doPlugins Script **************/

s.usePlugins = true;
s.doPlugins=function(s) {

// External Campaign Tracking
    if(!s.campaign){
        if(s.Util.getQueryParam('sdi')!='') s.campaign=s.Util.getQueryParam('sdi'); // display
        if(s.Util.getQueryParam('sse')!='') s.campaign=s.Util.getQueryParam('sse'); // sem
        if(s.Util.getQueryParam('sma')!='') s.campaign=s.Util.getQueryParam('sma'); // emailing
        if(s.Util.getQueryParam('prm')!='') s.campaign=s.Util.getQueryParam('prm'); // promociones
        if(s.Util.getQueryParam('sap')!='') s.campaign=s.Util.getQueryParam('sap'); // aplicativos widget
        if(s.Util.getQueryParam('ssm')!='') s.campaign=s.Util.getQueryParam('ssm'); // social media
        if(s.Util.getQueryParam('afl')!='') s.campaign=s.Util.getQueryParam('afl'); // afiliación
        if(s.Util.getQueryParam('agr')!='') s.campaign=s.Util.getQueryParam('agr'); // agregadores
        if(s.Util.getQueryParam('int')!='') s.campaign=s.Util.getQueryParam('int'); // ID interno
        s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
    }


    if(s.Util.getQueryParam('s_track')=='false'){
        s.abort = true;
    }

    /* Traffic Variables */
    s.pageName= s.siteID + location.pathname;														// Get Path Name (On)
    pageName=s.pageName;

    if(omn_isPlayer()){
        section="player";
        s.channel= section;
    }

    // EW
    if(section=="widget"){
        try {
            parentDomain = (window.location != window.parent.location) ? document.referrer: document.location;
        }
        catch(err) {
            console.log( "Error: " + err + ".");
        }
        s.account = "prisacommultidistribucionunionradio";
        s.accountF = "prisacommultidistribucionunionradio";
        s.pageName=parentDomain;
        pageName=parentDomain;

        if(/los40.com/.test(parentDomain)){
            s.abort = true;
        }
    }

    s.prop3=type;																												// Type Content
    s.prop5="D=g";							  																			// URL
    s.prop6="D=r";									   																	// Referrer
    s.prop8=s.getTimeParting('d',gmt); 																	// Set day  (Jueves)
    s.prop9=s.getTimeParting('w', gmt);																	// Set weekday (laborable/festivo)
    s.prop12=program;											    													// Program
    s.prop13=radio_station;											    										// Radio Station
    s.prop14 = dtmRadio.country;                                                                                                   // Country
    s.prop15 = dtmRadio.zone;                                                                                                          // Zone (Region) : RADIO
    s.prop17="web";																											// Canal
    s.prop18="prisa";																										// Organization
    s.prop19 = dtmRadio.product;
    s.prop20=location.hostname.replace(/www./gi,"");										// Domain	| Subdomain
    s.prop21=s.getNewRepeat();   																				// User New / Repeat
    s.prop22="musical";																									// Format : RADIO
    s.prop24=hours+":"+minutes+":"+seconds;															// Set hh:mm:ss (12:32:48)
    s.prop29='D=c15+":"+c14+":"+c19+":"+c22+":"+c17+":"+c20';						// Combine Segmentation : RADIO
    s.prop30="radio";																										// Business Unit
    s.prop31="musica"; 																									// Temathic
    s.prop33=s.getVisitNum();																						// Visit Number By Month
    s.prop35=hours;																											// Set hour (12)
    s.prop36=s.getTimeParting('d', gmt)+"-"+day+"/"+month+"/"+fecha.getFullYear()+"-"+s.prop24;		// Join Date (Jueves-15/9/2012-12:32:48)
    //s.prop39=title; 																										// Title
    s.prop39= omn_catchFirsElement(document.title);
    s.prop44=s.getTimeParting('h', gmt);				 												// Set hour (12:00PM)
    s.prop45=document.title; 																						// Title [SEO]
    s.prop60=s.getDaysSinceLastVisit('s_lv');         									// Days Since Last Visit
    s.prop62=status;																										// Log in / Anonymous

    if(subsection != '' ){
        s.prop1 = section + '>' + subsection;
    }else{
        s.prop1 = '';
    }
    if(subsubsection != ''){
        s.prop2= s.prop1 + '>' +subsubsection;
    }else{
        s.prop2 = '';
    }

    /* Hierarchy GROUP  */
    s.hier1='D=c18+">"+c19+">"+c20+">"';

    if(s.prop2!=''){
        s.hier1 +='c2+">"';
    }else if(s.prop1!=''){
        s.hier1 +='c1+">"';
    }else{
        s.hier1 +='ch+">"';
    }
    s.hier1 +='pageName';

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
            s.pageName= omn_renameDomain (arrayAmp["server"]) +omn_cleanUrl(arrayAmp["pageURL"]).replace(/http.?:\/\/[^\/]*/, "");
            s.server= omn_deleteWWW(arrayAmp["server"]);
            s.referrer= omn_cleanUrl(arrayAmp["ref"]);
            s.prop57= "";
            ////////////////////////channel, c1 code///////////
            var regexpNoticia = /http.?:\/\/([^\/]*)\/([^\/]*)\/(\d+)\/(\d+)\/(\d+)\/([^\/]*)\/(.*)\.html/i;
            var result_re;
            var direccion = omn_cleanUrl(arrayAmp["pageURL"]);

            result_re = regexpNoticia.exec(direccion);

            if (result_re ) {
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
                        s.channel = subseccion_omniture; //caso de videos...
                        subseccion_omniture = "";
                        s.prop1 = s.channel;
                    }
                    else
                    {
                        prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
                    }

                    s.prop44 = result_re[3] + "/" + result_re[4] + "/" + result_re[5];

                    s.events += ',event77';
                    //s.prop39 = "D=c45";
                }
            }
            ///////////////////////////////////////////////////
        }
    }



    /* Conversion variables*/

    s.eVar3 = "D=pageName";                                                     // pageName
    s.eVar4 = "D=ch";                                                           // channel
    if (s.prop1) s.eVar5 = "D=c1";                                              // Subseccion (prop1)
    if (s.prop2) s.eVar6 = "D=c2";                                              // Subsubseccion (prop2)
    if (s.prop3) s.eVar7 = "D=c3";                                              // Type
    if (s.prop5) s.eVar10 = "D=g";                                              // URL
    if (s.prop6) s.eVar63 = "D=r";                                              // Referrer
    if (s.prop8) s.eVar48 = "D=c8";                                             // Set day  (Jueves)
    if (s.prop9) s.eVar66 = "D=c9";                                             // Set weekday (laborable/festivo)
    if (s.prop12) s.eVar12 = "D=c12";                                           // Program
    if (s.prop13) s.eVar13 = "D=c13";                                           // Radio Station
    if (s.prop14) s.eVar14 = "D=c14";                                           // Country
    if (s.prop15) s.eVar15 = "D=c15";                                           // Zone (Region) : RADIO
    if (s.prop16) s.eVar16 = "D=c16";                                           // searched word
    if (s.prop17) s.eVar17 = "D=c17";                                           // Canal
    if (s.prop18) s.eVar18 = "D=c18";                                           // Organization
    if (s.prop19) s.eVar19 = "D=c19";                                           // Product
    if (s.prop20) s.eVar20 = "D=c20";                                           // Domain
    if (s.prop21) s.eVar21 = "D=c21";                                           // User New / Repeat
    if (s.prop22) s.eVar24 = "D=c22";                                           // Format   : RADIO
    if (s.prop24) s.eVar59 = "D=c24";                                           // Set hour:minutes:seconds (12:32:48)
    if (s.prop30) s.eVar30 = "D=c30";                                           // Bussines Unit
    if (s.prop33) s.eVar32 = "D=c33";                                           // Visit Number By Month
    if (s.prop29) s.eVar31 = "D=c29";                                           // Combine segmentation : RADIO
    if (s.prop31) s.eVar62 = "D=c31";                                           // Temathic
    if (s.prop35) s.eVar35 = "D=c35";                                           // Set hour (12)
    if (s.prop36) s.eVar33 = "D=c36";                                           // Join Date (Jueves-15/9/2012-12:32:48)
    if (s.prop39) s.eVar39 = "D=c39";                                           // Title
    if (s.prop40) s.eVar40 = "D=c40";                                           // Type Design Web
    if (s.prop44) s.eVar44 = "D=c44";                                           // Set hour (12:00PM)
    if (s.prop45) s.eVar45 = "D=c45";                                           // Title
    if (s.prop60) s.eVar60 = "D=c60";                                           // Days Since Last Visit
    if (s.prop62) s.eVar22 = "D=c62";                                           // Log In/ Anonymous

// Set Page View Event
    s.events="event2";

// Search
    if(typeof(keyword)!="undefined"){
        if(keyword==""){
            s.eVar16="vacio";
        }else{
            s.eVar16=keyword.toLowerCase();
        }
        s.events+=',event1';
    }

    //Resutl Search Number
    if(typeof(query_count)!="undefined"){
        if(query_count!=''){
            if(query_count==0)
                s.events+=',event32';
            else
                s.events+=',event31';
        }else{
            s.events+=',event32';
        }
    }


// Set Load Time (page):
    if(s_getLoadTime())s.events=s.apl(s.events,'event90='+s_getLoadTime(),',',1);

// s.events=s.apl(s.events,"event1",",",1);

// Check server error page 404 and internal
    if (error == 404) {
        s.pageType = "errorPage";
        s.pageName = '';
    }
    if (error == 500) {
        s.pageType = "errorPage";
        s.pageName = "error interno"
    }

// force all Adobe SiteCatalyst variables to Lower Case
    for(var a=1;a<=100;a++)s["prop"+a]&&(s["prop"+a]=s["prop"+a].toString().toLowerCase().replace(/^d=/,"D="));for(var b=["products","pageName","channel","campaign"],a=0;a<b.length;a++)s[b[a]]&&(s[b[a]]=s[b[a]].toLowerCase().replace(/^d=/,"D="));

    s.prop34=userId;   																	// User Id
    if(s.prop34)s.eVar43="D=c34";												// User Id

    s.prop57=adblock_enabled;														// AdBlock
    s.eVar57=adblock_enabled;														// AdBlock

};

//COMIENZO COLOMBIA Y CHILE
//if(/los40.com.co/.test(hostn) || /.cl/.test(hostn)){
function omn_asyncPV() {
    s.channel = section;
    s.pageName= s.siteID + location.pathname;														// Get Path Name (On)
    pageName=s.pageName;
    s.pageURL= location.href;
    s.referrer = _satellite.previousURL;

    if(omn_isPlayer()){
        section="player";
        s.channel= section;
    }
    // EW
    if(section=="widget"){
        try {
            parentDomain = (window.location != window.parent.location) ? document.referrer: document.location;
        }
        catch(err) {
            console.log( "Error: " + err + ".");
        }
        s.account = "prisacommultidistribucionunionradio";
        s.accountF = "prisacommultidistribucionunionradio";
        s.pageName=parentDomain;
        pageName=parentDomain;

        if(/los40.com/.test(parentDomain)){
            s.abort = true;
        }
    }

    s.prop3=type;																												// Type Content
    s.prop5="D=g";							  																			// URL
    s.prop6="D=r";									   																	// Referrer
    s.prop8=s.getTimeParting('d',gmt); 																	// Set day  (Jueves)
    s.prop9=s.getTimeParting('w', gmt);																	// Set weekday (laborable/festivo)
    s.prop12=program;											    													// Program
    s.prop13=radio_station;											    										// Radio Station
    s.prop14 = dtmRadio.country;                                        // Country
    s.prop15 = dtmRadio.zone;                                           // Zone (Region) : RADIO
    s.prop17="web";																											// Canal
    s.prop18="prisa";																										// Organization
    s.prop19 = dtmRadio.product;
    s.prop20=location.hostname.replace(/www./gi,"");										// Domain	| Subdomain
    s.prop21=s.getNewRepeat();   																				// User New / Repeat
    s.prop22="musical";																									// Format : RADIO
    s.prop24=hours+":"+minutes+":"+seconds;															// Set hh:mm:ss (12:32:48)
    s.prop29='D=c15+":"+c14+":"+c19+":"+c22+":"+c17+":"+c20';						// Combine Segmentation : RADIO
    s.prop30="radio";																										// Business Unit
    s.prop31="musica"; 																									// Temathic
    s.prop33=s.getVisitNum();																						// Visit Number By Month
    s.prop35=hours;																											// Set hour (12)
    s.prop36=s.getTimeParting('d', gmt)+"-"+day+"/"+month+"/"+fecha.getFullYear()+"-"+s.prop24;		// Join Date (Jueves-15/9/2012-12:32:48)
    //s.prop39=title; 																										// Title
    s.prop39= omn_catchFirsElement(document.title);
    s.prop44=s.getTimeParting('h', gmt);				 												// Set hour (12:00PM)
    s.prop45=document.title; 																						// Title [SEO]
    s.prop60=s.getDaysSinceLastVisit('s_lv');         									// Days Since Last Visit
    s.prop62=status;

    if(subsection != '' ){
        s.prop1 = section + '>' + subsection;
    }else{
        s.prop1 = '';
    }
    if(subsubsection != ''){
        s.prop2= s.prop1 + '>' +subsubsection;
    }else{
        s.prop2 = '';
    }

    /* Hierarchy GROUP  */
    s.hier1='D=c18+">"+c19+">"+c20+">"';

    if(s.prop2!=''){
        s.hier1 +='c2+">"';
    }else if(s.prop1!=''){
        s.hier1 +='c1+">"';
    }else{
        s.hier1 +='ch+">"';
    }
    s.hier1 +='pageName';

    if(s.ab_enabled){
        s.prop57 = 'D="con_ADBLOCK-"+User-Agent';
        s.eVar57 = 'D="con_ADBLOCK-"+User-Agent';
    }else{
        s.prop57 = 'D="sin_ADBLOCK-"+User-Agent';
        s.eVar57 = 'D="sin_ADBLOCK-"+User-Agent';
    }

    s.t();
    //comScore only spain
    omn_launchPixelComScore();
    // pSUPERFLY.virtualPage({
    //     sections: "player",
    //     authors: product,
    //     path: window.location.pathname,
    //     title: omn_catchFirsElement(document.title)
    // });
    //GA solo chile
    if(document.domain=="envivo.los40.cl"){
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-36140576-14', 'auto');
        ga('require', 'displayfeatures');
        ga('send', 'pageview');

    }

    _satellite.previousURL = location.href;
}

//}//FIN COLOMBIA Y CHILE
function omn_adblocker(){
    window.s.ab_enabled = false;
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
        s.ab_enabled = (window.document.body.getAttribute('abp') !== null
            || bait.offsetParent === null
            || bait.offsetHeight == 0
            || bait.offsetLeft == 0
            || bait.offsetTop == 0
            || bait.offsetWidth == 0
            || bait.clientHeight == 0
            || bait.clientWidth == 0);

        window.document.body.removeChild(bait);

    }, 500);

}

function launch(eVars,eVars_value,evento){
    s.usePlugins=false;
    //var s_accountF= s.accountF;
    //s.account = s_accountF;
    if(typeof (s.account)=='undefined'){
        s.account = getAnalyticsAccount();
    }
    s=s_gi(s.account);
    var AeVars = eVars.split("|");
    var AeVars_value = eVars_value.split("|");
    s.linkTrackVars='events,eVar3,eVar4,eVar10,eVar18,eVar17,eVar19,eVar20,eVar21,eVar22,eVar32,eVar35,eVar39,eVar39,eVar43,eVar45,eVar48,eVar60,eVar66';
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
    s.eVar4=s.channel; // channel
    s.prop17="web";
    s.prop18="prisa";
    s.prop19 = dtmRadio.product;
    s.prop20=location.hostname.replace(/www./gi,"");
    s.prop21=s.getNewRepeat();
    s.prop22="musical";
    s.prop24=hours+":"+minutes+":"+seconds;															// Set hh:mm:ss (12:32:48)
    s.prop29='D=c15+":"+c14+":"+c19+":"+c22+":"+c17+":"+c20';						// Combine Segmentation : RADIO
    s.prop30="radio";																										// Business Unit
    s.prop31="musica"; 																									// Temathic
    s.prop33=s.getVisitNum();																						// Visit Number By Month
    s.prop35=hours;																											// Set hour (12)
    s.prop36=s.getTimeParting('d', gmt)+"-"+day+"/"+month+"/"+fecha.getFullYear()+"-"+s.prop24;		// Join Date (Jueves-15/9/2012-12:32:48)
    //s.prop39=title; 																										// Title
    s.prop39= omn_catchFirsElement(document.title);
    s.prop44=s.getTimeParting('h', gmt);				 												// Set hour (12:00PM)
    s.prop45=document.title; 																						// Title [SEO]
    s.eVar35=hours; // Set hour (12)
    //s.eVar39=document.title; // Title
    s.eVar39= omn_catchFirsElement(document.title);
    s.prop34=userId;   																	// User Id
    if(s.prop34){
        s.eVar43="D=c34"
    }
    // if (typeof(PEPuid) != 'undefined') {
    //     s.eVar43=PEPuid; // User Id
    // }
    s.eVar44=s.getTimeParting('h', gmt); // Set hour (12:00PM)
    s.eVar45=document.title; // Title
    s.eVar48=s.getTimeParting('d',gmt); // Set day (Jueves)
    s.eVar60=s.getDaysSinceLastVisit('s_lv'); // Days Since Last Visit
    s.eVar66=s.getTimeParting('w', gmt); // Set weekday (laborable/festivo)
    s.tl(this,'o',evento);
    s.clearVars();
}

//Catching the first element of the title
// function omn_catchFirsElement(stringWithScript){
//     var array_stringWithScript= stringWithScript.split("-");
//     var stringWithoutScript= decodeURIComponent(array_stringWithScript[0]);
//     return stringWithoutScript;
// }


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected. Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace = "prisacom";
s.trackingServer = "prisacom.d3.sc.omtrdc.net";
s.trackingServerSecure = "";

/************************** PLUGINS SECTION *************************/
// http://microsite.omniture.com/t2/help/en_US/sc/implement/#Implementation_Plugins

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
* Plugin: getValOnce_v1.1 - get a value once per session or number of days
*/
s.getValOnce=new Function("v","c","e","t",""
    +"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
    +"0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
    +"==0?0:a);}return v==k?'':v");


/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
    +"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
    +"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
    +"e()));}}if(!m)L=L?L+d+v:v;return L");


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
 * Plugin: Visit Number By Month 2.0 - Return the user visit number
 */
s.getVisitNum=new Function(""
    +"var s=this,e=new Date(),cval,cvisit,ct=e.getTime(),c='s_vnum',c2='s"
    +"_invisit';e.setTime(ct+30*24*60*60*1000);cval=s.c_r(c);if(cval){var"
    +" i=cval.indexOf('&vn='),str=cval.substring(i+4,cval.length),k;}cvis"
    +"it=s.c_r(c2);if(cvisit){if(str){e.setTime(ct+30*60*1000);s.c_w(c2,'"
    +"true',e);return str;}else return 'unknown visit number';}else{if(st"
    +"r){str++;k=cval.substring(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e)"
    +";e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}else{s.c_w"
    +"(c,ct+30*24*60*60*1000+'&vn=1',e);e.setTime(ct+30*60*1000);s.c_w(c2"
    +",'true',e);return 1;}}"
);
/*

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
* Utility Function: split v1.5 (JS 1.0 compatible) *NEW*
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


/****************************** MODULES *****************************/
// copy and paste implementation modules (Media, Integrate) here
// AppMeasurement_Module_Media.js - Media Module, included in AppMeasurement zip
// AppMeasurement_Module_Integrate.js - Integrate Module, included in AppMeasurement zip


/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.8.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(){var a=this;a.version="1.8.0";var h=window;h.s_c_in||(h.s_c_il=[],h.s_c_in=0);a._il=h.s_c_il;a._in=h.s_c_in;a._il[a._in]=a;h.s_c_in++;a._c="s_c";var n=h.AppMeasurement.Ob;n||(n=null);var p=h,l,r;try{for(l=p.parent,r=p.location;l&&l.location&&r&&""+l.location!=""+r&&p.location&&""+l.location!=""+p.location&&l.location.host==r.host;)p=l,l=p.parent}catch(s){}a.P=function(a){try{console.log(a)}catch(b){}};a.La=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.vb=function(){var c=h.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
    !/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.vb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.K=[];a.ia=function(c,b,d){if(a.Ea)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,k=["webkitvisibilitychange",
    "visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<k.length;d++)a.d.addEventListener(k[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.K.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.K.length;){d=a.K.shift();if(b&&!d.t&&d.t>c){a.K.unshift(d);
    setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Ea=1;a[d.m].apply(a,d.a);a.Ea=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,k="";e=f="";if(a.lightProfileID)d=a.O,(k=a.lightTrackVars)&&(k=","+k+","+a.na.join(",")+",");else{d=a.g;if(a.pe||
    a.linkType)k=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(k=a[e].Mb,f=a[e].Lb));k&&(k=","+k+","+a.G.join(",")+",");f&&k&&(k+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!k||0<=k.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",k,m,h,t,l=0;"contextData"==c&&(c="c");if(b){for(k in b)if(!(Object.prototype[k]||e&&k.substring(0,e.length)!=e)&&b[k]&&(!d||0<=d.indexOf(","+(f?f+
        ".":"")+k+","))){h=!1;if(l)for(m=0;m<l.length;m++)k.substring(0,l[m].length)==l[m]&&(h=!0);if(!h&&(""==g&&(g+="&"+c+"."),m=b[k],e&&(k=k.substring(e.length)),0<k.length))if(h=k.indexOf("."),0<h)m=k.substring(0,h),h=(e?e:"")+m+".",l||(l=[]),l.push(h),g+=a.r(m,b,d,f,h);else if("boolean"==typeof m&&(m=m?"true":"false"),m){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(h=k.substring(0,4),t=k.substring(4),k){case "transactionID":k="xact";break;case "channel":k="ch";break;case "campaign":k=
    "v0";break;default:a.La(t)&&("prop"==h?k="c"+t:"eVar"==h?k="v"+t:"list"==h?k="l"+t:"hier"==h&&(k="h"+t,m=m.substring(0,255)))}g+="&"+a.escape(k)+"="+a.escape(m)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.yb=function(){var c="",b,d,f,e,g,k,m,h,l="",p="",q=e="";if(a.lightProfileID)b=a.O,(l=a.lightTrackVars)&&(l=","+l+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)l=a.linkTrackVars,p=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(l=a[e].Mb,p=a[e].Lb));
    l&&(l=","+l+","+a.G.join(",")+",");p&&(p=","+p+",",l&&(l+=",events,"));a.events2&&(q+=(""!=q?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=n;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,
    4);k=e.substring(4);!g&&"events"==e&&q&&(g=q,q="");if(g&&(!l||0<=l.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),
    g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
    "cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":q&&(g+=(""!=g?",":"")+q);if(p)for(k=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  g.split(","),g="",f=0;f<k.length;f++)m=k[f],h=m.indexOf("="),0<=h&&(m=m.substring(0,h)),h=m.indexOf(":"),0<=h&&(m=m.substring(0,h)),0<=p.indexOf(","+m+",")&&(g+=(g?",":"")+k[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],l,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
    "mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],l,e));g="";break;default:a.La(k)&&("prop"==f?e="c"+k:"eVar"==f?e="v"+k:"list"==f?e="l"+k:"hier"==f&&(e="h"+k,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Rb||"undefined"!=""+a.Hb&&"HTML"!=(""+a.Hb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
    "BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ha=function(a){var b=h.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.L=function(c){var b=a.D(c),d,f,e="",
    g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ha(c),e)?{id:e.substring(0,100),type:g}:0};a.Pb=function(c){for(var b=a.D(c),d=a.L(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=
    a.D(c),d=a.L(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Gb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,k;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.L(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.L(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var m=d.onclick?""+d.onclick:"";if(0<=m.indexOf(".tl(")||0<=m.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&
(e=a.Ha(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var l=0,p=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(m=e.toLowerCase(),g=m.indexOf("?"),k=m.indexOf("#"),0<=g?0<=k&&k<g&&(g=k):g=k,0<=g&&(m=m.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),k=0;k<g.length;k++)(n=g[k])&&m.substring(m.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&!f&&(m=e.toLowerCase(),a.Ka(m)&&(a.linkInternalFilters||(a.linkInternalFilters=
        h.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),l=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(k=0;k<g.length;k++)n=g[k],0<=m.indexOf(n)&&(p=1);p?l&&(f="e"):l||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),h.s_objectID&&(b.id=h.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+
    (e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.zb=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,k,m,h,e=0;if(g)for(k=0;k<g.length;k++)m=g[k].split("="),f=a.unescape(m[0]).split(","),
    m=a.unescape(m[1]),b[m]=f;f=a.account.split(",");k={};for(h in a.contextData)h&&!Object.prototype[h]&&"a.activitymap."==h.substring(0,14)&&(k[h]=a.contextData[h],a.contextData[h]="");a.e=a.r("c",k)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(m in b)if(!Object.prototype[m])for(h=0;h<f.length;h++)for(e&&(g=b[m].join(","),g==a.account&&(a.e+=("&"!=m.charAt(0)?"&":"")+m,b[m]=[],d=1)),k=0;k<b[m].length;k++)g=b[m][k],g==f[h]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=m.charAt(0)?"&":"")+m+"&u=0"),b[m].splice(k,
    1),d=1);c||(d=1);if(d){e="";k=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),k=1);for(m in b)!Object.prototype[m]&&0<k&&0<b[m].length&&(e+=(e?"&":"")+a.escape(b[m].join(","))+"="+a.escape(m),k--);a.cookieWrite("s_sq",e)}}}return c};a.Ab=function(){if(!a.Kb){var c=new Date,b=p.location,d,f,e=f=d="",g="",k="",h="1.2",l=a.cookieWrite("s_cc","true",0)?"Y":"N",n="",q="";if(c.setUTCDate&&(h="1.3",(0).toPrecision&&(h="1.5",c=[],c.forEach))){h="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(h="1.7",
c.reduce&&(h="1.8",h.trim&&(h="1.8.1",Date.parse&&(h="1.8.2",Object.create&&(h="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;k=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),n=a.b.Qb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),q=a.b.connectionType}catch(u){}a.resolution=
    d;a.colorDepth=f;a.javascriptVersion=h;a.javaEnabled=e;a.cookiesEnabled=l;a.browserWidth=g;a.browserHeight=k;a.connectionType=q;a.homepage=n;a.Kb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=h["AppMeasurement_Module_"+c]?new h["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.cb=function(){return d.hb};d.ib=function(b){if(d.hb=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.cb,set:d.ib}):d._olc=1}catch(f){d._olc=
    1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Cb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};
    a.R=function(c,b){var d,f,e,g,k,h;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(k=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(h in a[g])k[h]||(k[h]=a[g][h]);a[g]=k}};a.Ua=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.ub=function(a){var b,d,f,e,g,k=0,h,l="",n="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(h=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,
            "http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(k=",p,ei,"),k&&h)))){if((a=h.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?l+=(l?"&":"")+e:n+=(n?"&":"")+e;l&&n?h=l+"&"+n:n=""}d=253-(h.length-n.length)-b.length;a=b+(0<d?g.substring(0,d):"")+
        "?"+h}return a};a.$a=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.I=!1;a.kb=function(){a.I=!0;a.j()};a.ca=!1;a.V=!1;a.gb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.lb=function(c){a.visitorOptedOut=c;a.W=!0;
        a.j()};a.Z=!1;a.S=!1;a.Wa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Ya=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Xa=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.Za=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.H=!1;a.xa=function(){a.H=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.I||(a.$a(a.kb)?a.I=!0:a.ea=!0);if(a.ea&&!a.I)return!1;b&&
    b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.gb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.lb]),a.visitorOptedOut!=n&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Wa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||
    (a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Ya]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Xa]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.H||(a.Za(a.xa)?a.H=!0:
        a.da=!0);a.da&&!a.H&&(c=!1);return c};a.o=n;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.pb=c;f.ob=b;f.mb=d;a.o==n&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.jb(),a.o!=n))for(;0<a.o.length;)c=a.o.shift(),c.ob.apply(c.pb,c.mb)};a.jb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.eb=function(c){var b,d,f=n,e=n;if(!a.isReadyToTrack()){b=[];if(c!=n)for(d in f={},c)f[d]=c[d];e={};a.Ua(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,
        a.track,b);return!0}return!1};a.wb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+
        "/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.eb(c)||(b&&a.R(b),c&&(d={},a.Ua(d,0),a.R(c)),a.Cb()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.wb()),a.Gb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=
        a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=h.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Va||(a.referrer=p.document.referrer),a.Va=1,a.referrer=a.ub(a.referrer),a.p("_g")),a.zb()&&!a.abort&&(a.Ab(),g+=a.yb(),a.Fb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=
        h.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.P("DEBUG: Non function type passed to registerPreTrackCallback")};a.bb=function(c){a.wa(a.za,c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.P("DEBUG: Non function type passed to registerPostTrackCallback")};
    a.ab=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.P(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=
            a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.Fb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,
        f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Jb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.bb(d);
        a.sb(d);a.ka()};a.Ta=/{(%?)(.*?)(%?)}/;a.Nb=RegExp(a.Ta.source,"g");a.tb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Nb),e=0;e<f.length;++e){var g=f[e],h=g.match(a.Ta),l="";"%"==h[1]&&"timezone_offset"==h[2]?l=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(l=a.xb());d.c=d.c.replace(g,a.escape(l))}}};a.xb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));
        return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.tb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);
    else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.sb=function(c){a.i||a.Bb();a.i.push(c);a.ma=a.C();a.Ra()};a.Bb=function(){a.i=a.Db();a.i||(a.i=[])};a.Db=function(){var c,b;if(a.ra()){try{(b=h.localStorage.getItem(a.pa()))&&(c=h.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&
    a.offlineFilename&&h.localStorage&&h.JSON||(c=!1);return c};a.Ia=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.F&&a.B.va(),a.q))return;a.Ja=n;if(a.qa)a.ma>a.N&&a.Pa(a.i),a.ua(500);else{var c=a.nb();if(0<c)a.ua(c);else if(c=a.Fa())a.q=1,a.Eb(c),a.Ib(c)}};a.ua=function(c){a.Ja||(c||(c=0),a.Ja=setTimeout(a.ka,c))};a.nb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Oa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
        c};a.Fa=function(){if(0<a.i.length)return a.i.shift()};a.Eb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.P(b)}};a.fb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var q;try{q=JSON.parse('{"x":"y"}')}catch(u){q=null}q&&"y"==q.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):h.$&&h.$.parseJSON?(a.X=function(a){return h.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Ib=function(c){var b,
        d,f;a.fb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Sa&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?
        f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof h.InstallTrigger||(b.abort=function(){b.src=n}));b.Da=function(){try{b.F&&(clearTimeout(b.F),b.F=0)}catch(a){}};b.onload=b.va=function(){a.ab(c);b.Da();a.rb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ga=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.qb);a.q=0;a.ma>a.N&&a.Pa(a.i);
        a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ga())};a.Oa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Ma)try{f.removeChild(a.Ma)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ma=a.B}b.F=setTimeout(function(){b.F&&(b.complete?b.va():(a.trackOffline&&
    b.abort&&b.abort(),b.Ga()))},5E3);a.qb=c;a.B=h["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.J||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.rb=function(){if(a.ra()&&!(a.Na>a.N))try{h.localStorage.removeItem(a.pa()),a.Na=a.C()}catch(c){}};a.Pa=function(c){if(a.ra()){a.Ra();try{h.localStorage.setItem(a.pa(),h.JSON.stringify(c)),a.N=a.C()}catch(b){}}};a.Ra=function(){if(a.trackOffline){if(!a.offlineLimit||
        0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Fa()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.Ka=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Jb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==
        d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,
        cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:h.location);d||(d="&");return c&&b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.G="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
    a.g=a.G.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.O=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
    for(l=0;250>=l;l++)76>l&&(a.g.push("prop"+l),a.O.push("prop"+l)),a.g.push("eVar"+l),a.O.push("eVar"+l),6>l&&a.g.push("hier"+l),4>l&&a.g.push("list"+l);l="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest".split(" ");a.g=a.g.concat(l);a.G=a.G.concat(l);a.ssl=0<=h.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename=
        "AppMeasurement.offline";a.Oa=0;a.ma=0;a.N=0;a.Na=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=h;a.d=h.document;try{if(a.Sa=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Sa=!0}}catch(w){}a.ga=function(){a.ha&&(h.clearTimeout(a.ha),a.ha=n);a.l&&a.J&&a.l.dispatchEvent(a.J);a.A&&("function"==typeof a.A?a.A():a.l&&a.l.href&&(a.d.location=
        a.l.href));a.l=a.J=a.A=0};a.Qa=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.M&&a.M==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
        0;else{var k=a.M=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.M==k&&(a.M=0)},1E4);f=a.Ia();a.track();if(f<a.Ia()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Ka(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||h.name&&d==h.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=new h.MouseEvent}if(b){try{b.initMouseEvent("click",
        c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(n){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.J=b)}}}}}catch(p){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&
        h.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Qa,30)};a.Qa();a.loadModule("ActivityMap")}
function s_gi(a){var h,n=window.s_c_il,p,l,r=a.split(","),s,q,u=0;if(n)for(p=0;!u&&p<n.length;){h=n[p];if("s_c"==h._c&&(h.account||h.oun))if(h.account&&h.account==a)u=1;else for(l=h.account?h.account:h.oun,l=h.allAccounts?h.allAccounts:l.split(","),s=0;s<r.length;s++)for(q=0;q<l.length;q++)r[s]==l[q]&&(u=1);p++}u||(h=new AppMeasurement);h.setAccount?h.setAccount(a):h.sa&&h.sa(a);return h}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,h=a.s_giq,n,p,l;if(h)for(n=0;n<h.length;n++)p=h[n],l=s_gi(p.oun),l.setAccount(p.un),l.setTagContainer(p.tagContainerName);a.s_giq=0}s_pgicq();

function omn_isPlayer(){
    isPlayer= false;
    if((s.siteID.indexOf("play")>-1)||(s.siteID.indexOf("player")>-1)||(s.siteID.indexOf("escucha")>-1)||(s.siteID.indexOf("escuche")>-1)||(s.siteID.indexOf("envivo")>-1)||(s.siteID.indexOf("los40.com.gt")>-1)){
        isPlayer= true;
    }
    return isPlayer;
}

function omn_trackEventRadio(eventName, data) {
    var map={
        "events":{
            "mediaBegin": "event11",
            "mediaComplete": "event12",
            "adStart": "event13",
            "adComplete": "event14",
            "adSkip": "event15",
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
    s.account = getAnalyticsAccount();
    s.events = map.events[eventName];
    s.linkTrackEvents = map.events[eventName];
    s.linkTrackVars = "eVar2,eVar3,eVar4,eVar5,eVar6,eVar8,eVar12,eVar13,eVar17,eVar18,eVar19,eVar20,eVar21,eVar22,eVar29,eVar30,eVar32,eVar35,eVar38,eVar39,eVar42,eVar43,eVar44,eVar45,eVar48,eVar57,eVar60,eVar66,eVar67,eVar70,eVar73,eVar74,eVar80,eVar81,eVar84,list3";

    s.list3= data["data.tagsList"];
    s.eVar2= data["data.playerName"];
    s.eVar3=s.siteID + location.pathname; // pageName
    s.eVar4=s.channel; // channel
    s.eVar5= s.pageURL;
    s.eVar6= data["data.tipoContenido"];
    s.eVar8= data["data.name"];
    s.eVar13= data["data.programa"] + data["data.emisora"];
    if(data["data.mediaType"]=="aod"){
        s.eVar13= data["data.tags"];
        s.eVar80= data["data.programa"];
    }
    s.eVar17= "web";
    s.eVar18="prisa"; // Organization
    s.eVar19 = dtmRadio.product;                                            // Product
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
    s.eVar73 = dtmRadio.version;
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
    if(typeof ((cadena_titulo)=='undefined')||(cadena_titulo=="")){
        var cadena_titulo= omn_catchFirsElement(document.title);
    }
    comscoreImg.src = (useSSL ? "https://sb.scorecardresearch.com" : "http://b.scorecardresearch.com") + "/p?c1=2&c2=8671776&cv=2.0&cj=1&c7=" + encodeURIComponent(document.location.href) + "&c8=" + encodeURIComponent(cadena_titulo) +  "&c9=" + encodeURIComponent(document.referrer) + "&rn=" + String(Math.random()).substr(2,9);
}
// function loadScript(src, callback) {
//     var ss = document.createElement('script');
//     ss.type = 'text/javascript';
//     ss.async = true;
//     var head = document.getElementsByTagName('head')[0];
//     if (ss.addEventListener){
//         ss.addEventListener('load', callback, false);
//     }
//     else{
//         if (ss.onload){
//             ss.onload = callback;
//         }
//         else{
//             console.log(dtmVersion);
//             if (document.all){
//                 s.onreadystatechange = function() {
//                     var state = s.readyState;
//                     if (state === 'loaded' || state === 'complete') {
//                         callback();
//                         s.onreadystatechange = null;
//                     }
//                 }
//             }
//         }
//     }
//     ss.src = src;
//     head.appendChild(ss);
// }
// function chartbeatSetUp() {
//     /** CONFIGURATION START **/
//     var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
//
//     _sf_async_config.uid = 65629;
//     _sf_async_config.domain = 'play.los40.com';
//     _sf_async_config.flickerControl = false;
//     _sf_async_config.useCanonical = true;
//     _sf_async_config.useCanonicalDomain = true;
//     _sf_async_config.sections = 'player'; //CHANGE THIS TO YOUR SECTION NAME(s)
//     _sf_async_config.authors = product; //CHANGE THIS TO YOUR AUTHOR NAME(s)
//     _sf_async_config.path = window.location.pathname;
//     _sf_async_config.title = omn_catchFirsElement(document.title);
//     /** CONFIGURATION END **/
// }
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

//dtmRadio.log();

//poner en una funcion
/*
var result_re = /http.?:\/\/([^\/]*)\/([^\/]*)\/(\d+)\/(\d+)\/(\d+)\/([^\/]*)\/(.*)\.html/i.exec(omn_cleanUrl(arrayAmp["pageURL"]));
if (result_re )
{

    s.channel = result_re[2];
    //Es una noticia
    seccion_omniture = result_re[2];
    subseccion_omniture = result_re[6];

    if (subseccion_omniture.indexOf("album") > -1 || subseccion_omniture == "fotorrelato")
    {

        s.channel = "album";

        seccion_omniture = channel_omniture + ">album";

        s.prop3 = "fotogaleria";
        prop1_omniture = seccion_omniture;
    }
    else
    {
        prop3_omniture = "articulo";
        if (seccion_omniture == "los40")
        {
            seccion_omniture = subseccion_omniture; //caso de videos...
            subseccion_omniture = "";
            s.prop1 = seccion_omniture;
        }
        else
        {
            s.prop1 = seccion_omniture + ">" + subseccion_omniture;
        }

        s.events += ',event77';
    }

}var result_re = /http.?:\/\/([^\/]*)\/([^\/]*)\/(\d+)\/(\d+)\/(\d+)\/([^\/]*)\/(.*)\.html/i.exec(omn_cleanUrl(arrayAmp["pageURL"]));
/*
if (result_re )
{

    s.channel = result_re[2];
    //Es una noticia
    seccion_omniture = result_re[2];
    subseccion_omniture = result_re[6];

    if (subseccion_omniture.indexOf("album") > -1 || subseccion_omniture == "fotorrelato")
    {

        s.channel = "album";

        seccion_omniture = channel_omniture + ">album";

        s.prop3 = "fotogaleria";
        prop1_omniture = seccion_omniture;
    }
    else
    {
        prop3_omniture = "articulo";
        if (seccion_omniture == "los40")
        {
            seccion_omniture = subseccion_omniture; //caso de videos...
            subseccion_omniture = "";
            s.prop1 = seccion_omniture;
        }
        else
        {
            s.prop1 = seccion_omniture + ">" + subseccion_omniture;
        }

        s.events += ',event77';
    }

}
*/