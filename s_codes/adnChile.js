/* SiteCatalyst code version: H.25.
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

var s_account="prisacomurcladn,prisacomglobal";
var s_accountF="prisacomurcladn"; //Defined suite functions
var OMN_es_noticia = false;
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="UTF-8"
s.cookieDomainPeriods=3
/* Conversion Config */
s.currencyCode="EUR"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,adnradio.cl"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* Form Analysis Plugin */
s.formList="dataform,loginForm" //Deberian incluirse solo los nombres de los formularios que se deseen seguir
s.trackFormList=true
s.trackPageName=true
s.useCommerce=true
s.varUsed="eVar34"
s.eventList="event26,event27,event28" //Abandon,Success,Error

// var for send to Krux
s.adblockKrux= "0";
if(adblock_enabled.indexOf("con_ADBLOCK") > -1){
    s.adblockKrux= "1";
}

//var for scroll
scroll_i= false;


/* TimeParting Config */
var date = new Date();
var anoActual=date.getFullYear(); //Recogemos el año en el que estamos
var gmt =-(date.getTimezoneOffset()/60)-1
if(gmt>=0){
    gmt = "+" + gmt.toString();
}

s.dstStart="1/1/"+anoActual; 			// update to the correct Daylight Savings Time start
s.dstEnd="12/31/"+anoActual; 			// update to the correct Daylight Savings Time end date
s.currentYear=anoActual; 				// update to the current year

/* Page Name Config */
var site = window.location.host;
var arraySite = site.split(".");
if (arraySite[0] == "www"){	s.siteID="adnradio.cl";}
else{s.siteID=site;}
s.defaultPage="";
s.queryVarsList="";
s.pathExcludeDelim=";";
s.pathConcatDelim=":";


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="prisacom"
s.trackingServer="prisacom.d3.sc.omtrdc.net"

/*Social Network measurement*/

function facebookTrack(){
    s=s_gi(s_accountF);
    s.linkTrackVars="prop39,prop69,eVar3,eVar39,eVar56,eVar69,events";
    s.linkTrackEvents="event71";
    s.events='event71';
    s.prop39 = document.title;s.prop39=s.prop39.toLowerCase();s.eVar39="D=c39";
    s.prop69="facebook";
    s.eVar3=s.pageName;
    s.tl(this,'o', 'fb:like-' + s.pageName);
}

function twitterTrack(){
    s=s_gi(s_accountF);
    s.linkTrackVars="prop39,prop69,eVar3,eVar39,eVar56,eVar69,events";
    s.linkTrackEvents="event72";
    s.events='event72';
    s.prop39 = document.title;s.prop39=s.prop39.toLowerCase();s.eVar39="D=c39";
    s.prop69="twitter";
    s.eVar3=s.pageName;
    s.tl(this,'o', 'twitter:like-' + s.pageName);
}

function plusoneTrack(){
    s=s_gi(s_accountF);
    s.linkTrackVars="prop39,prop69,eVar3,eVar39,eVar56,eVar69,events";
    s.linkTrackEvents="event73";
    s.events='event73';
    s.prop39 = document.title;s.prop39=s.prop39.toLowerCase();s.eVar39="D=c39";
    s.prop69="gplus";
    s.eVar3=s.pageName;
    s.tl(this,'o', 'gplus:like-' + s.pageName);
}

function linkedinTrack(){
    s=s_gi(s_accountF);
    s.linkTrackVars="prop39,prop69,eVar3,eVar39,eVar56,eVar69,events";
    s.linkTrackEvents="event74";
    s.events='event74';
    s.prop39 = document.title;s.prop39=s.prop39.toLowerCase();s.eVar39="D=c39";
    s.prop69="linkedin";
    s.eVar3=s.pageName;
    s.tl(this,'o', 'linkedin:like-' + s.pageName);
}

function meneameTrack(){
    s=s_gi(s_accountF);
    s.linkTrackVars="prop39,prop69,eVar3,eVar39,eVar56,eVar69,events";
    s.linkTrackEvents="event75";
    s.events='event75';
    s.prop39 = document.title;s.prop39=s.prop39.toLowerCase();s.eVar39="D=c39";
    s.prop69="meneame";
    s.eVar3=s.pageName;
    s.tl(this,'o', 'meneame:like-' + s.pageName);
}

/* End Social Network measurement */

/* Plugin Config */
s.usePlugins=true

function s_doPlugins(s) {

    if(s.pageType!='errorPage'){
        /******************** VARIABLES DE CONTENIDO *********************/
        /*     Estas variables se rellenan a mano para cada website     */
        //Segmentation
        if (typeof(tipo_contenido)=='undefined'){
            tipo_contenido='';
        }else {s.prop3=tipo_contenido;if(s.prop3)s.eVar7="D=c3";}								//TipoContenido - se recoge en cada una de las paginas del site
        s.prop14="chile";if(s.prop14)s.eVar14="D=c14";         									//Pais
        s.prop15="america";if(s.prop15)s.eVar15="D=c15";	       								//Zona (Region)
        s.prop17="web";if(s.prop17)s.eVar17="D=c17";        									//Soporte
        s.prop18="prisa";if(s.prop18)s.eVar18="D=c18";           								//Organizacion
        s.prop19="adn";if(s.prop19)s.eVar19="D=c19";											//Producto
        s.prop20="adnradio.cl";if(s.prop20)s.eVar20="D=c20";  			 						//Server [Dominio/subdominio]
        s.prop22="convencional";if(s.prop22)s.eVar24="D=c22";		    						//Formato
        s.prop29='D=c15+":"+c14+":"+c19+":"+c22+":"+c17+":"+c20';if(s.prop29)s.eVar31=s.prop29;	//Combination segmentation
        s.prop30="radio";if(s.prop30)s.eVar30="D=c30"; 											//Business unit
        if (typeof(tematica)=='undefined'){
            tematica='informacion';
        }
        else {
            s.prop31=tematica;if(s.prop31)s.eVar62="D=c31";
        }                    				//Tematica - se recoge en cada una de las paginas del site
        if (typeof (PEPuid) == 'undefined') {
            PEPuid = '';
        }
        else {
            s.prop34 = PEPuid; if (s.prop34) s.eVar43 = "D=c34";
        }                              		//ID Usuario Registrado - se recoge en cada una de las paginas del site
        /****************************************************************/

        if((typeof(seccion)!='undefined')&&(typeof(subseccion)!='undefined')&&(typeof(subsubseccion)!='undefined')){
            /************** VARIABLES DE SECCIONES Y JERARQUIA ***************/
            /*
            secciones
            */
            if(typeof(seccion)!='undefined' && seccion != ''){
                //seccion - Es una variable global definida en cada una de las paginas
                s.channel=seccion;			//Nueva definicion del channel "seccion"
                s.pageName=s.channel;
            }
            if(typeof(s.channel)!='undefined' && typeof(subseccion)!='undefined' && subseccion != ''){
                //subseccion - Es una variable global definida en cada una de las paginas
                s.pageName+=":"+subseccion;
                s.prop1=s.channel+">"+subseccion;		//Nueva definicion de subseccion: "seccion>subseccion"
                s.eVar1="D=c1";
            }
            if((typeof(s.prop1)!='undefined')&&(typeof(subsubseccion)!='undefined')&&(subsubseccion != '')){
                //subsubseccion - Es una variable global definida en cada una de las paginas
                s.pageName+=":"+subsubseccion;
                s.prop2=s.prop1+">"+subsubseccion;		//Nueva definicion de sub-subseccion: "seccion>subseccion>subsubseccion"
                s.eVar6="D=c2";
            }
            if((typeof(s.prop2)!='undefined')&&(typeof(tema)!='undefined')&&(tema != '')){
                //Tema - Es una variable global definida en cada una de las paginas
                s.pageName+=":"+tema;
                s.prop4=s.prop2+">"+tema;				//Nueva definicion de tema: "seccion>subseccion>subsubseccion>tema"
                s.eVar10="D=c4";
            }
            if((typeof(s.prop4)!='undefined')&&(typeof(subtema)!='undefined')&&(subtema != '')){
                //Subtema - Es una variable global definida en cada una de las paginas
                s.pageName+=":"+subtema;
                s.prop11=s.prop4+">"+subtema;			//Nueva definicion de subtema: "seccion>subseccion>subsubseccion>tema>subtema"
                s.eVar11="D=c11";
            }
            if((typeof(s.prop11)!='undefined')&&(typeof(subtema1)!='undefined')&&(subtema1 != '')){
                //Subtema1 - Es una variable global definida en cada una de las paginas
                s.pageName+=":"+subtema1;
                s.prop12=s.prop11+">"+subtema1;			//Nueva definicion de subtema: "seccion>subseccion>subsubseccion>tema>subtema>subtema1"
                s.eVar12="D=c12";
            }

            /*
            Jerarquias s.hier1 = Dominio>Channel>Subseccion>Sub-subseccion>Tema>Subtema>PageTitle
            */
            s.hier1=s.prop20+">"+s.channel;
            if(subseccion!=''){
                s.hier1=s.hier1+">"+subseccion;
            }
            if(subsubseccion!=''){
                s.hier1=s.hier1+">"+subsubseccion;
            }
            if(tema != ''){
                s.hier1=s.hier1+">"+tema;
            }
            if(subtema!= ''){
                s.hier1=s.hier1+">"+subtema;
            }
            s.hier1=s.hier1+">"+document.title; //Nos quedaria construido como "Dominio>Channel>Subseccion>Tema>Subtema>PageTitle"

            /****************************************************************/
        }
        else {
            //Content Naming -> genera la hier1.
            if(!s.pageType)s.setContentNaming();
            if((typeof(s.prop1)!='undefined')&&(typeof(s.prop2)!='undefined')&&(typeof(s.prop4)!='undefined')&&(typeof(s.prop11)!='undefined')&&(typeof(s.prop12)!='undefined')){
                s.pageName=(s.prop12).replace(/>/gi,":");
            }
            else if((typeof(s.prop1)!='undefined')&&(typeof(s.prop2)!='undefined')&&(typeof(s.prop4)!='undefined')&&(typeof(s.prop11)!='undefined')){
                s.pageName=(s.prop11).replace(/>/gi,":");
            }
            else if((typeof(s.prop1)!='undefined')&&(typeof(s.prop2)!='undefined')&&(typeof(s.prop4)!='undefined')){
                s.pageName=(s.prop4).replace(/>/gi,":");
            }
            else if((typeof(s.prop1)!='undefined')&&(typeof(s.prop2)!='undefined')){
                s.pageName=(s.prop2).replace(/>/gi,":");
            }
            else if(typeof(s.prop1)!='undefined'){
                s.pageName=(s.prop1).replace(/>/gi,":");
            }
            else if (typeof(s.channel)!='undefined'){
                s.pageName=s.channel;
            }
        }

        s.pageName+=":"+document.title;
        s.pageName=s.pageName.toLowerCase();

        /*Inicializacion del plugin FormAnalysis*/
        s.setupFormAnalysis();

        /*Recogida automatica de la URL, referrer y el pageTitle*/
        s.prop5 = "D=g"; //URL
        if(s.prop5){
            s.eVar5=s.prop5;
        }
        s.prop6="D=r";	//referrer
        if(s.prop6){
            s.eVar63=s.prop6;
        }
        if(typeof(document.title)!='undefined' && document.title != ''){
            s.prop39 = document.title; //title
            s.prop39=s.prop39.toLowerCase();
            s.eVar39="D=c39";
        }else{
            s.prop39 = "";
            s.eVar39="D=c39";
        }

        //Value wich mark scroll
        if(scroll_i==true){
            s.prop65 = "scroll";
        }
        else{
            s.prop65= "sin scroll";
        }

        //Internal Campaigns
        if(!s.eVar25){
            s.eVar25=s.getQueryParam("pid1")
            s.eVar25=s.getValOnce(s.eVar25,'s_var_25',0)
            s.prop25="D=v25";}
        if(!s.eVar26){
            s.eVar26=s.getQueryParam("pid2")
            s.eVar26=s.getValOnce(s.eVar26,'s_var_26',0)
            s.prop26="D=v26";}

        /* Set Page View Event */
        //s.events=s.events?s.events+',event2':'event2';
        if(typeof s.events!== "undefined"){
            //Add event2 only if it does not exist
            if(s.events.indexOf("event2") == -1){
                if(s.events=="")

                {           s.events= "event2";       }
                else

                {          s.events= s.events +",event2" ;      }
            }
        }


        //Visitor profile
        s.prop33=s.getVisitNum();s.eVar32="D=c33";
        s.prop21=s.getNewRepeat();s.eVar21="D=c21";

        //DateTime
        /* Props used for TimeParting */
        var fecha=new Date();
        var month=fecha.getMonth()+1;if(month<10)month='0'+month;
        var seconds=fecha.getSeconds();if(seconds<10)seconds='0'+seconds;
        var minutes=fecha.getMinutes();if(minutes<10)minutes='0'+minutes;
        var hours=fecha.getHours();if(hours<10)hours='0'+hours;
        var day=fecha.getDate();if(day<10)day='0'+day;

        s.prop44=s.getTimeParting('h', gmt);s.eVar44="D=c44"; 													// Set hour (12:00PM)
        s.prop35=hours;s.eVar35="D=c35";																		// Set hour (12)
        s.prop8=s.getTimeParting('d',gmt);s.eVar48="D=c8"; 														// Set day  (Jueves)
        s.prop24=hours+":"+minutes+":"+seconds;s.eVar59="D=c24"; 												// Set hour:minutes:seconds (12:32:48)
        s.prop9=s.getTimeParting('w', gmt);s.eVar66="D=c9";														// Set weekday (weekday/weekend)
        s.prop36=s.getTimeParting('d', gmt)+"-"+day+"/"+month+"/"+fecha.getFullYear()+"-"+s.prop24;				// Join Date (Jueves-15/09/2012-12:32:48)

        /* External Campaign Tracking */
        if(!s.campaign)
            s.campaign=s.getQueryParam('idexterno');
        s.campaign=s.getValOnce(s.campaign,'s_campaign',0);

        /* External Campaign Tracking */
        if(!s.campaign){
            if(s.getQueryParam('sdi')!='') s.campaign=s.getQueryParam('sdi'); //display
            if(s.getQueryParam('sse')!='') s.campaign=s.getQueryParam('sse'); //sem
            if(s.getQueryParam('sma')!='') s.campaign=s.getQueryParam('sma'); //emailing
            if(s.getQueryParam('prm')!='') s.campaign=s.getQueryParam('prm'); //promociones
            if(s.getQueryParam('sap')!='') s.campaign=s.getQueryParam('sap'); //aplicativos widget
            if(s.getQueryParam('ssm')!='') s.campaign=s.getQueryParam('ssm'); //social media
            if(s.getQueryParam('afl')!='') s.campaign=s.getQueryParam('afl'); //afiliacion
            if(s.getQueryParam('agr')!='') s.campaign=s.getQueryParam('agr'); //agregadores
            if(s.getQueryParam('int')!='') s.campaign=s.getQueryParam('int'); //ID interno
            s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
        }


        /* Copy search term to eVar */
        if(s.prop16){
            s.eVar16="D=c16"; //KW interna

            /* Set de-duped onsite search event */
            var t_search=s.getValOnce(s.eVar16,'ev1',0)
            if(t_search)
                s.events=s.apl(s.events,'event1',1)
        }

        /*Get days since last visit*/
        s.prop60=s.getDaysSinceLastVisit('s_lv');
        s.prop60=s.prop60.toLowerCase();


        /* Usuarios registrados/no registrados */
        if(s.prop34){
            s.prop28='registrado';
            s.eVar22="D=c28";
        }
        else {
            s.prop28='no registrado';
            s.eVar22="D=c28";
        }

        /* Copy prop's to eVar's */

        if(s.prop9)
            s.eVar66="D=c9";

        if(s.prop23)
            s.eVar23="D=c23";

        if(s.prop27)
            s.eVar27="D=c27";

        if(s.prop32)
            s.eVar13="D=c32";

        if(s.prop34)
            s.eVar43="D=c34";

        if(s.prop35)
            s.eVar35="D=c35";

        if(s.prop36)
            s.eVar33="D=c36";

        if(s.prop41)
            s.eVar41="D=c41";
        if(s.prop60)
            s.eVar60="D=c60";

        if(s.prop65){
            s.eVar65="D=c65";
        }

        /* Pagina vista */
        s.events=s.apl(s.events,"event2",",",1);

        /* Copy Page Name & Channel to eVars */
        if(s.pageName)
            s.eVar3="D=pageName";
        if(s.channel)
            s.eVar4="D=ch";
        /* KRX */
        var listado_keywords = document.querySelector('meta[name="news_keywords"]');
        listado_norm_tags = (listado_keywords) ? document.querySelector("meta[name='news_keywords']").getAttribute('content') : "";
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
        s.prop45 = document.title;s.prop45=s.prop45.toLowerCase();s.eVar45="D=c45";
        if (OMN_es_noticia)
        {
            DataLayerKrx = {
                pageTitle: s.prop45,
                destinationURL: document.location.href,
                referringURL: document.referrer,
                tags: arrayTags(),
                language: document.documentElement.lang ? document.documentElement.lang : "es",
                publisher: s.prop19,
                geoRegion: s.prop14,
                domain: s.prop20,
                businessUnit: s.prop30,
                thematic: tematica,
                primaryCategory: s.channel,
                subCategory1: typeof(subseccion_omniture) != "undefined" ? subseccion_omniture : "" ,
                pageType: s.prop3,
                edition: "es",
                profileID: (typeof(s.prop34) != "undefined" ? s.prop34 : ""),
                registeredUser: (s.prop62 == "logueado" ? "1": "0"),
                creationDate: (typeof(creationDate) != "undefined" ? creationDate.replace(/\//g,"") : ""),
                adblocker: s.adblockKrux,
                source: "web"
            }
        }

    }
    /* force all Adobe SiteCatalyst variables to Lower Case */
    s.manageVars("lowercaseVars");
    s.prop57=adblock_enabled;                     // AdBlock
    s.eVar57=adblock_enabled;                     // AdBlock
}
s.doPlugins=s_doPlugins

function arrayTags(){
    if (typeof(listado_norm_tags) == "undefined")
        return [];

    var salida = [];
    //var itags = listado_id_tags.split(",");
    var ntags = listado_norm_tags.split(",")
    /*if (itags.length != ntags.length)
        return [];*/

    for (var j=0; j< ntags.length; j++)
    {
        salida.push({"id":j, "name":ntags[j]});
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
/************** Required Plug-ins *************/

/*Funcion que elimina el robot de google preview*/
function botCheck(b){var c=navigator.userAgent.toLowerCase(),a="";a+=c.indexOf("google web preview")!=-1?"":b;return a};
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
 * Plugin: setContentNaming v1.0
 */
s.setContentNaming=new Function(""
    +"s.hier1=s.prop20;s.server=window.location.host;"
    +"var u=document.location.href;if (u.substring(u.length-1,u.length)=='/')"
    +"u = u.substring(0,u.length-1);s.prop5=u;s.eVar5=s.prop5;au = u.split('/');"
    +"if(au[au.length-1].indexOf('.')!=-1 || au[au.length-1].indexOf('?')!=-1 )"
    +"au.splice(au.length-1,1);if((typeof(au[3])!='undefined')&&(au[3]!='#')){s.channel=au[3];s."
    +"hier1+='>'+s.channel;}else{s.channel='home';s.hier1+='>'+s.channel;}if((ty"
    +"peof(au[4])!='undefined')&&(typeof(s.channel)!='undefined')){s.prop1=s.cha"
    +"nnel+'>'+au[4];s.prop1=(s.prop1).toLowerCase();s.hier1+='>'+au[4];}if((typ"
    +"eof(au[5])!='undefined')&&(typeof(s.prop1)!='undefined')){s.prop2=s.prop1+"
    +"'>'+au[5];s.prop2=(s.prop2).toLowerCase();s.hier1+='>'+au[5];}if((typeof(a"
    +"u[6])!='undefined')&&(typeof(s.prop2)!='undefined')){s.prop4=s.prop2+'>'+a"
    +"u[6];s.prop4=(s.prop4).toLowerCase();s.hier1+='>'+au[6];}if((typeof(au[7])"
    +"!='undefined')&&(typeof(s.prop4)!='undefined')){s.prop11=s.prop4+'>'+au[7]"
    +";s.prop11=(s.prop11).toLowerCase();s.hier1+='>'+au[7];}if((typeof(au[8])!="
    +"'undefined')&&(typeof(s.prop11)!='undefined')){s.prop12=s.prop11+'>'+au[8]"
    +";s.prop12=(s.prop12).toLowerCase();s.hier1+='>'+au[8];}s.eVar1=s.prop1;s.e"
    +"Var6=s.prop2;s.eVar10=s.prop4;s.eVar11=s.prop11;s.eVar12=s.prop12;s.hier1+"
    +"='>'+(document.title).toLowerCase();s.hier1=(s.hier1).toLowerCase();");


/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
    +"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
    +"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
    +".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
    +"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
    +"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
    +"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
    +"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
    +"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
    +"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
    +"epa(v)}return ''");
/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
    +"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
    +");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
    +" v==k?'':v");
/*
 * Plugin: getPageName v2.0
 */
s.getPageName=new Function("u",""
    +"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
    +"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
    +"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
    +"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
    +"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p[p.length-1]=='/'?s.defaultP"
    +"age:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;z=s.fl("
    +"p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p.substri"
    +"ng(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x;z=s.fl"
    +"(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.substrin"
    +"g(x+1)}return n");
/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
    +"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
    +"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
    +"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
    +".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
    +"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
    +"n 'Repeat';");
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
* Plugin: crossVisitParticipation Example: 1.2  -- REQUIRES s.split
*/
s.crossVisitParticipation = new Function("v","cn","ex","ct","dl","ev",""
    +"var s=this;var ay=s.split(ev,',');for(var u=0;u<ay.length;u++){if(s"
    +".events&&s.events.indexOf(ay[u])!=-1){s.c_w(cn,'');return '';}}if(!"
    +"v||v=='')return '';var arry=new Array();var a=new Array();var c=s.c"
    +"_r(cn);var g=0;var h=new Array();if(c&&c!='') arry=eval(c);var e=ne"
    +"w Date();e.setFullYear(e.getFullYear()+5);if(arry.length>0&&arry[ar"
    +"ry.length-1][0]==v)arry[arry.length-1]=[v, new Date().getTime()];el"
    +"se arry[arry.length]=[v, new Date().getTime()];var data=s.join(arry"
    +",{delim:',',front:'[',back:']',wrap:'\\''});var start=arry.length-c"
    +"t < 0?0:arry.length-ct;s.c_w(cn,data,e);for(var x=start;x<arry.leng"
    +"th;x++){var diff=Math.round(new Date()-new Date(parseInt(arry[x][1]"
    +")))/86400000;if(diff<ex){h[g]=arry[x][0];a[g++]=arry[x];}}var r=s.j"
    +"oin(h,{delim:dl});return r;");
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
    +"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
    +"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
    +"e()));}}if(!m)l=l?l+d+v:v;return l");
/*
 * Plugin: Form Analysis 2.1 (Success, Error, Abandonment)
 */
s.setupFormAnalysis=new Function(""
    +"var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s."
    +"wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even"
    +"tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''"
    +",'','')}");
s.sendFormEvent=new Function("t","pn","fn","en",""
    +"var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='"
    +"s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol=new Function("e",""
    +"var s=s_c_il["+s._in+"],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd."
    +"event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng"
    +"th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name"
    +";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);"
    +"if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='"
    +"No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element"
    +"s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.on"
    +"mousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toStrin"
    +"g():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd"
    +"=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s"
    +".wd.onunload;s.wd.onunload=s.fasl;}return r;");
s.faos=new Function("e",""
    +"var s=s_c_il["+s._in+"],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v"
    +"u]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):tru"
    +"e;");
s.fasl=new Function("e",""
    +"var s=s_c_il["+s._in+"],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag"
    +"eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path"
    +"name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]="
    +"'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]"
    +"='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]"
    +"!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV"
    +"ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars="
    +"ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt"
    +"e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'"
    +",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s"
    +".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f."
    +"vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object"
    +"();faLink.href='#';s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.us"
    +"ePlugins=up}return f.ul&&e!='e'&&e!='s'?f.ul(e):true;");
s.fam=new Function("e",""
    +"var s=s_c_il["+s._in+"],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas"
    +"tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this."
    +"form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e."
    +"which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW"
    +"N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM"
    +"AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e"
    +"n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1"
    +"){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va["
    +"1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s"
    +"_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak"
    +"d(e);");
s.ee=new Function("e","n",""
    +"return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage=new Function("e","a",""
    +"var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");
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
/********************************************************************
 *
 * Supporting functions that may be shared between plug-ins
 *
 *******************************************************************/

/* s.join: 1.0 - s.join(v,p)
 *
 * v - Array (may also be array of array)
 * p - formatting parameters (front, back, delim, wrap)
 *
 */
s.join = new Function("v","p",""
    +"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
    +":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
    +";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
    +"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
s.split=new Function("l","d",""
    +"var i,x=0,a= new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
    +"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.25';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\"
    +"\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return "
    +"y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;retur"
    +"n 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AU"
    +"TO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B"
    +"';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substri"
    +"ng(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x)"
    +":unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t="
    +"z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&"
    +"t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s"
    +"=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){"
    +"s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].ap"
    +"ply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.leng"
    +"th;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s."
    +"pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.coo"
    +"kieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_"
    +"d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_"
    +"w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+("
    +"t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=functio"
    +"n(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b"
    +":f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try"
    +"{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=functi"
    +"on(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return "
    +"window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.t"
    +"fs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r"
    +".t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,u"
    +"n=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1'"
    +")dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')"
    +"+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.r"
    +"l[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debu"
    +"gTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onlo"
    +"ad=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src="
    +"rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr()}',s.forcedLinkTracking"
    +"Timeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+"
    +"rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=t"
    +"his,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y"
    +".substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring("
    +"i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t"
    +"=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'"
    +"')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&"
    +"(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm="
    +"1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.leng"
    +"th]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substrin"
    +"g(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+"
    +"ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfil"
    +"eID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.subst"
    +"ring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;"
    +"i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp'"
    +")q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visi"
    +"torMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationS"
    +"erver)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';els"
    +"e if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';e"
    +"lse if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';els"
    +"e if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='ev"
    +"ents2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncr"
    +"ementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2"
    +"q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring"
    +"(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='"
    +".'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.lin"
    +"kExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring("
    +"0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t()"
    +";s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.loc"
    +"ation=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else"
    +" if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e"
    +".target;s.t();s.eo=0;if(s.nrs>0&&s.useForcedLinkTracking&&e.target){t=e.target.target;if(e.target.dispatchEvent&&(!t||t==\\'_self\\'||t==\\'_top\\'||(s.wd.name&&t==s.wd.name))){e.stopPropagation();"
    +"e.stopImmediatePropagation();e.preventDefault();n=s.d.createEvent(\"MouseEvents\");n.initMouseEvent(\"click\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKe"
    +"y,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);n.s_fe=1;s.bct=e.target;s.bce=n;}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?"
    +"');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.ho"
    +"st?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t="
    +"t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){va"
    +"r s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s"
    +".rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o"
    +".src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&"
    +"&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if"
    +"(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);"
    +"return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,','"
    +",'sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototyp"
    +"e[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);fo"
    +"r(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');"
    +"s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&s.n.userAgent.indexOf('WebK"
    +"it')>=0&&s.d.createEvent){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var "
    +"s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n="
    +"x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x="
    +"t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x"
    +"&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=functio"
    +"n(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring"
    +"(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in+"
    +"+;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r."
    +"_m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._i"
    +"n+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n"
    +",1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var "
    +"s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);e"
    +"lse u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g"
    +"=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.inde"
    +"xOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','ht"
    +"tps:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e"
    +"+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;"
    +"try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTime"
    +"out(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else "
    +"if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k"
    +"])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in"
    +"+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if"
    +"(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length"
    +"]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm."
    +"getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset("
    +"),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k="
    +"s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5'"
    +";a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+scree"
    +"n.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n."
    +"javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBeha"
    +"vior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}"
    +"catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.j"
    +"avaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.d"
    +"oPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s."
    +"eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if"
    +"(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeav"
    +"eQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else t"
    +"rk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-o"
    +"bject-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;"
    +"if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt("
    +"oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','"
    +"var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+("
    +"x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('"
    +"t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s."
    +"pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bc"
    +"t=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,"
    +"t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'"
    +"_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if"
    +"(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq"
    +"[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)"
    +"s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Op"
    +"era';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=pa"
    +"rseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCh"
    +"arCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationK"
    +"ey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreFo"
    +"rSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,"
    +"contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkNa"
    +"me,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2='"
    +",tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g="
    +"s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,"
    +"dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames"
    +",lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.w"
    +"d.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
    w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
        +"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
    w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
    w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
    w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
        +"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
        +"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
    w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
    w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
        +"a");
    w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
        +"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
        +"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
    c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


function marcarPagina(titulo, titulo_og, tags_ids, sscroll, loc, ref) {
    var location = document.createElement('a');
    location.href = loc;
    // Omniture
    scroll_i = sscroll;
    s.list1 = tags_ids;
    s.pageName = s.siteID + location.pathname;
    s.pageURL = loc;
    s.channel = (tipo_contenido == 'radio') ? seccion : tipo_contenido;
    s.prop2 = (tipo_contenido == 'radio') ? 'portal' : tipo_contenido;
    s.prop13 = (tipo_contenido == 'radio') ? 'adn' : seccion;
    s.prop39 = (titulo_og.toLowerCase());
    s.prop45 = titulo.toLowerCase();
    s.t();
}