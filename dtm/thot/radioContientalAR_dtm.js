//AMP code//
var arrayAmp= new Array();
getValuesAmp();
var hostn=location.hostname;
if(imAMP()){ //if amp then
    hostn= arrayAmp["source_host"];
}
//end AMP code//

var numVersion= "1.0.1";
var dtm_version= "dtm version " + numVersion;

/* Function to get RSIDs from UI */
function getAnalyticsAccount(){
    for (var toolid in _satellite.tools){
        if (_satellite.tools[toolid].settings.engine == "sc"){
            return _satellite.tools[toolid].settings.account;
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

s=new AppMeasurement()

s.account = getAnalyticsAccount();
s.accountF = getAnalyticsAccountF();

var isPlayer= false;
var cadena_titulo_limpio= "";

var country="argentina";
var zone="america";
var product= "continental";

/******** VISITOR ID SERVICE CONFIG - REQUIRES VisitorAPI.js ********/
//s.visitor=Visitor.getInstance("INSERT-MCORG-ID-HERE")

/************************** CONFIG SECTION **************************/
s.debugTracking=false

/* You may add or alter any code config here. */
s.charSet="UTF-8"

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
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkInternalFilters="javascript:,"+ s.siteID +"" 	//automatic
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

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

/* TimeParting Config */
var date = new Date();
var anoActual=date.getFullYear(); 	//Recogemos el año en el que estamos
var gmt = -(date.getTimezoneOffset()/60) - 1;
if(gmt>=0){
    gmt = "+" + gmt.toString();
}
s.dstStart="1/1/"+anoActual; 			// update to the correct Daylight Savings Time start
s.dstEnd="12/31/"+anoActual; 			// update to the correct Daylight Savings Time end date
s.currentYear=anoActual; 				// update to the current year

/* variables undefined asign empty value */

if (typeof(pageTitle) == 'undefined') pageTitle=document.title;
if (typeof(pageName) == 'undefined') pageName='';
if (typeof(section) == 'undefined') section='';
if (typeof(subsection) == 'undefined') subsection='';
if (typeof(subsubsection) == 'undefined') subsubsection='';
if (typeof(type) == 'undefined') type='otros';
if (typeof(channel) == 'undefined') channel='web';
if (typeof(userId) == 'undefined') userId='';
if (typeof(status) == 'undefined') status='';
if (typeof(error) == 'undefined') error='';


/************** doPlugins Script **************/

s.usePlugins=true
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

    /* Example add events
        s.events=s.apl(s.events,'event1',1)
    */

    /* Traffic Variables */

// s.pageName+= '/' + pageName;			       													// Manual formation s.pageName (off)
    s.pageName= s.siteID + location.pathname;														// Get Path Name (On)
    pageName=s.pageName;

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

        if(/.continental.com.ar/.test(parentDomain)){
            s.abort = true;
        }
    }

    s.prop3=type;																												// Type Content
    s.prop5="D=g";							  																			// URL
    s.prop6="D=r";									   																	// Referrer
    s.prop8=s.getTimeParting('d',gmt); 																	// Set day  (Jueves)
    s.prop9=s.getTimeParting('w', gmt);																	// Set weekday (laborable/festivo)
    s.prop14=country;											    											// Country
    s.prop15=zone;  																							 	// Zone (Region) : RADIO
    s.prop17=channel;																										// Canal
    s.prop18="prisa";																										// Organization
    s.prop19=product;																							// Product
    s.prop20=location.hostname.replace(/www./gi,"");										// Domain	| Subdomain
    s.prop21=s.getNewRepeat();   																				// User New / Repeat
    s.prop22="convencional";																						// Format : RADIO
    s.prop24=hours+":"+minutes+":"+seconds;															// Set hh:mm:ss (12:32:48)
    s.prop29='D=c15+":"+c14+":"+c19+":"+c22+":"+c17+":"+c20';						// Combine Segmentation : RADIO
    s.prop30="radio";																										// Business Unit
    s.prop31="musica"; 																									// Temathic
    s.prop33=s.getVisitNum();																						// Visit Number By Month
    s.prop35=hours;																											// Set hour (12)
    s.prop36=s.getTimeParting('d', gmt)+"-"+day+"/"+month+"/"+fecha.getFullYear()+"-"+s.prop24;		// Join Date (Jueves-15/9/2012-12:32:48)
    s.prop39=pageTitle; 																									// Title / Page Name
    s.prop44=s.getTimeParting('h', gmt);				 												// Set hour (12:00PM)
    s.prop60=s.getDaysSinceLastVisit('s_lv');         									// Days Since Last Visit
    s.prop62=status;																										// Log in / Anonymous
    s.prop73= dtm_version;

    //tucu
    if(imAMP()){ //if amp then
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

    /* Conversion variables*/

    s.eVar3="D=pageName"  															// pageName
    s.eVar4="D=ch"																			// channel
    if(s.prop1)s.eVar5="D=c1"														// Subseccion (prop1)
    if(s.prop2)s.eVar6="D=c2"														// Subsubseccion (prop2)
    if(s.prop3)s.eVar7="D=c3";													// Type
    if(s.prop5)s.eVar10="D=g"														// URL
    if(s.prop6)s.eVar63="D=r"														// Referrer
    if(s.prop8)s.eVar48="D=c8"													// Set day  (Jueves)
    if(s.prop9)s.eVar66="D=c9"													// Set weekday (laborable/festivo)
    if(s.prop14)s.eVar14="D=c14"												// Country
    if(s.prop15)s.eVar15="D=c15"												// Zone (Region) : RADIO
    if(s.prop16)s.eVar16="D=c16"  											// searched word
    if(s.prop17)s.eVar17="D=c17"  											// Canal
    if(s.prop18)s.eVar18="D=c18"												// Organization
    if(s.prop19)s.eVar19="D=c19"												// Product
    if(s.prop20)s.eVar20="D=c20"												// Domain
    if(s.prop21)s.eVar21="D=c21"												// User New / Repeat
    if(s.prop22)s.eVar24="D=c22"												// Format	: RADIO
    if(s.prop24)s.eVar59="D=c24"												// Set hour:minutes:seconds (12:32:48)
    if(s.prop30)s.eVar30="D=c30"												// Bussines Unit
    if(s.prop33)s.eVar32="D=c33"												// Visit Number By Month
    if(s.prop29)s.eVar31="D=c29"												// Combine segmentation : RADIO
    if(s.prop31)s.eVar62="D=c31"												// Temathic
    if(s.prop35)s.eVar35="D=c35"												// Set hour (12)
    if(s.prop36)s.eVar33="D=c36"												// Join Date (Jueves-15/9/2012-12:32:48)
    if(s.prop39)s.eVar39="D=c39"												// Title / Page Name
    if(s.prop44)s.eVar44="D=c44"												// Set hour (12:00PM)
    if(s.prop60)s.eVar60="D=c60"												// Days Since Last Visit
    if(s.prop62)s.eVar22="D=c62"												// Log In/ Anonymous

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
    if (error == 404){
        s.pageType="errorPage"
        s.pageName='';
    }
    if (error == 500){
        s.pageType="errorPage"
        s.pageName="error interno"
    }

// force all Adobe SiteCatalyst variables to Lower Case
    for(var a=1;a<=100;a++)s["prop"+a]&&(s["prop"+a]=s["prop"+a].toString().toLowerCase().replace(/^d=/,"D="));for(var b=["products","pageName","channel","campaign","abort"],a=0;a<b.length;a++)s[b[a]]&&(s[b[a]]=s[b[a]].toLowerCase().replace(/^d=/,"D="));

    s.prop34=userId;   																	// User Id
    if(s.prop34)s.eVar43="D=c34"												// User Id
}


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
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
    if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
    b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
    "mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
    255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
    "")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.6.2
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(){var a=this;a.version="1.6.2";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.AppMeasurement.Ib;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.xb=function(a){try{console.log(a)}catch(b){}};a.Ga=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.ob=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
    !/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.ob(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.J=[];a.ga=function(c,b,d){if(a.za)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];
    g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ha)for(a.ha=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&(a.ha=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.J.push({m:c,a:b,t:e}),a.ha||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.ua();0<a.J.length;){d=a.J.shift();if(b&&!d.t&&d.t>c){a.J.unshift(d);setTimeout(a.delayReady,
    parseInt(a.maxDelay/2));break}a.za=1;a[d.m].apply(a,d.a);a.za=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ga("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.N,(m=a.lightTrackVars)&&(m=","+m+","+a.la.join(",")+",");else{d=a.g;if(a.pe||a.linkType)m=a.linkTrackVars,
    f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].Gb,f=a[e].Fb));m&&(m=","+m+","+a.F.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                0;p<n.length;p++)m.substring(0,n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.r(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.Ga(w)&&("prop"==
k?m="c"+w:"eVar"==k?m="v"+w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.rb=function(){var c="",b,d,f,e,g,m,p,k,n="",r="",s=e="";if(a.lightProfileID)b=a.N,(n=a.lightTrackVars)&&(n=","+n+","+a.la.join(",")+",");else{b=a.g;if(a.pe||a.linkType)n=a.linkTrackVars,r=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].Gb,r=a[e].Fb));n&&(n=","+n+","+a.F.join(",")+",");
    r&&(r=","+r+",",n&&(n+=",events,"));a.events2&&(s+=(""!=s?",":"")+a.events2)}if(a.visitor&&1.5<=parseFloat(a.visitor.version)&&a.visitor.getCustomerIDs){e=q;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);
    !g&&"events"==e&&s&&(g=s,s="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,
        255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
        "cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":s&&(g+=(""!=g?",":"")+s);if(r)for(m=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=r.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
        "mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],n,e));g="";break;default:a.Ga(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Lb||"undefined"!=""+a.Bb&&"HTML"!=(""+a.Bb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
    "BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ca=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:"",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.K=function(c){var b=a.D(c),d,f,e="",g=0;return b&&
(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ca(c),e)?{id:e.substring(0,100),type:g}:0};a.Jb=function(c){for(var b=a.D(c),d=a.K(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.K(c);
    d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Ab=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.ma=1;d||(a.ma=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.K(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.K(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.ma=1;!e&&d&&(e=a.Ca(d));e&&
!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,r=0,q;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(q=g[m])&&p.substring(p.length-(q.length+1))=="."+q&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.Fa(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),
        g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)q=g[m],0<=p.indexOf(q)&&(r=1);r?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+
    "&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.sb=function(){var c=a.ma,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),
    b[p]=f;f=a.account.split(",");m={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(m[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",m)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(p in b)if(!Object.prototype[p])for(k=0;k<f.length;k++)for(e&&(g=b[p].join(","),g==a.account&&(a.e+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),m=0;m<b[p].length;m++)g=b[p][m],g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(m,1),d=1);c||(d=1);if(d){e=
    "";m=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};a.tb=function(){if(!a.Eb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&
(k="1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Kb(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=
    f;a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.Eb=1}};a.O={};a.loadModule=function(c,b){var d=a.O[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.O[c]=a[c]=d;d.Wa=function(){return d.$a};d.ab=function(b){if(d.$a=b)a[c+"_onLoad"]=b,a.ga(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Wa,set:d.ab}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=
    b,a.ga(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.O)if(!Object.prototype[b]&&(d=a.O[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.vb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.P=function(c,b){var d,
    f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.va:a.g,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.Pa=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.va:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.nb=function(a){var b,d,f,e,g,k=0,p,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(p=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,
        7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(k=",p,ei,"),k&&p)))){if((a=p.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?p=n+"&"+q:q=""}d=253-(p.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+p}return a};a.Va=function(c){var b=
    a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ca=!1;a.H=!1;a.cb=function(){a.H=!0;a.j()};a.aa=!1;a.T=!1;a.Za=function(c){a.marketingCloudVisitorID=c;a.T=!0;a.j()};a.da=!1;a.U=!1;a.eb=function(c){a.visitorOptedOut=c;a.U=!0;a.j()};a.X=!1;a.Q=!1;a.Ra=function(c){a.analyticsVisitorID=
    c;a.Q=!0;a.j()};a.Z=!1;a.S=!1;a.Ta=function(c){a.audienceManagerLocationHint=c;a.S=!0;a.j()};a.Y=!1;a.R=!1;a.Sa=function(c){a.audienceManagerBlob=c;a.R=!0;a.j()};a.Ua=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.ba=!1;a.G=!1;a.ua=function(){a.G=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ca||a.H||(a.Va(a.cb)?a.H=!0:a.ca=!0);if(a.ca&&!a.H)return!1;b&&b.isAllowed()&&(a.aa||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||
(a.aa=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.Za]),a.marketingCloudVisitorID&&(a.T=!0)),a.da||a.visitorOptedOut||!b.isOptedOut||(a.da=!0,a.visitorOptedOut=b.isOptedOut([a,a.eb]),a.visitorOptedOut!=q&&(a.U=!0)),a.X||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.X=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Ra]),a.analyticsVisitorID&&(a.Q=!0)),a.Z||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.Z=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,
    a.Ta]),a.audienceManagerLocationHint&&(a.S=!0)),a.Y||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.Y=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Sa]),a.audienceManagerBlob&&(a.R=!0)),c=a.aa&&!a.T&&!a.marketingCloudVisitorID,b=a.X&&!a.Q&&!a.analyticsVisitorID,d=a.Z&&!a.S&&!a.audienceManagerLocationHint,f=a.Y&&!a.R&&!a.audienceManagerBlob,e=a.da&&!a.U,c=c||b||d||f||e?!1:!0);a.ba||a.G||(a.Ua(a.ua)?a.G=!0:a.ba=!0);a.ba&&!a.G&&(c=!1);return c};a.o=q;a.u=0;a.callbackWhenReadyToTrack=function(c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 b,d){var f;f={};f.ib=c;f.hb=b;f.fb=d;a.o==q&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.bb(),a.o!=q))for(;0<a.o.length;)c=a.o.shift(),c.hb.apply(c.ib,c.fb)};a.bb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.Xa=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Pa(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.pb=function(){var c=a.cookieRead("s_fid"),
    b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+
    " "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)));a.p("_s");a.Xa(c)||(b&&a.P(b),c&&(d={},a.Pa(d,0),a.P(c)),a.vb()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.pb()),a.Ab(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Qa||(a.referrer=r.document.referrer),a.Qa=1,a.referrer=a.nb(a.referrer),a.p("_g")),a.sb()&&!a.abort&&(a.tb(),g+=a.rb(),a.zb(e,g),a.p("_t"),a.referrer=""))),c&&a.P(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.tl=a.trackLink=
    function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==
    b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.zb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,f)),k=k.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||
    0!=a.usePostbacks;d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Db?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.lb(d);a.ia()};a.Oa=/{(%?)(.*?)(%?)}/;a.Hb=RegExp(a.Oa.source,"g");a.mb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b)if(o=c.dests[b],"string"==typeof o.c&&"aa."==o.id.substr(0,3))for(var d=o.c.match(a.Hb),b=0;b<d.length;++b){match=
    d[b];var f=match.match(a.Oa),e="";"%"==f[1]&&"timezone_offset"==f[2]?e=(new Date).getTimezoneOffset():"%"==f[1]&&"timestampz"==f[2]&&(e=a.qb());o.c=o.c.replace(match,a.escape(e))}};a.qb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};
    a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.qa={};a.doPostbacks=function(c){if("object"==typeof c)if(a.mb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b)dest=c.dests[b],"object"==typeof dest&&"string"==typeof dest.c&&"string"==typeof dest.id&&
    "aa."==dest.id.substr(0,3)&&(a.qa[dest.id]=new Image,a.qa[dest.id].alt="",a.qa[dest.id].src=dest.c)};a.lb=function(c){a.i||a.ub();a.i.push(c);a.ka=a.C();a.Ma()};a.ub=function(){a.i=a.wb();a.i||(a.i=[])};a.wb=function(){var c,b;if(a.pa()){try{(b=k.localStorage.getItem(a.na()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.pa=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Da=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ia=function(){if(a.q&&
        (a.B&&a.B.complete&&a.B.timeout&&a.B.ta(),a.q))return;a.Ea=q;if(a.oa)a.ka>a.M&&a.Ka(a.i),a.ra(500);else{var c=a.gb();if(0<c)a.ra(c);else if(c=a.Aa())a.q=1,a.yb(c),a.Cb(c)}};a.ra=function(c){a.Ea||(c||(c=0),a.Ea=setTimeout(a.ia,c))};a.gb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Ja;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Aa=function(){if(0<a.i.length)return a.i.shift()};a.yb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+
        c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.xb(b)}};a.Ya=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.W=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=null}s&&"y"==s.x?(a.W=!0,a.V=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.V=function(a){return k.$.parseJSON(a)},a.W=!0):a.V=function(){return null};a.Cb=function(c){var b,d,f;a.Ya()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?
        d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.W?b.wa=!0:b=0));!b&&a.Na&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt=
        "",b.abort||"undefined"===typeof k.InstallTrigger||(b.abort=function(){b.src=q}));b.ya=function(){try{b.timeout&&(clearTimeout(b.timeout),b.timeout=0)}catch(a){}};b.onload=b.ta=function(){b.ya();a.kb();a.ea();a.q=0;a.ia();if(b.wa){b.wa=!1;try{a.doPostbacks(a.V(b.responseText))}catch(c){}}};b.onabort=b.onerror=b.Ba=function(){b.ya();(a.trackOffline||a.oa)&&a.q&&a.i.unshift(a.jb);a.q=0;a.ka>a.M&&a.Ka(a.i);a.ea();a.ra(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.ta():b.Ba())};
        a.Ja=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Ha)try{f.removeChild(a.Ha)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ha=a.B}b.timeout=setTimeout(function(){b.timeout&&(b.complete?b.ta():(a.trackOffline&&b.abort&&b.abort(),b.Ba()))},5E3);a.jb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=
            b;if(a.useForcedLinkTracking&&a.I||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.fa=setTimeout(a.ea,a.forcedLinkTrackingTimeout)};a.kb=function(){if(a.pa()&&!(a.Ia>a.M))try{k.localStorage.removeItem(a.na()),a.Ia=a.C()}catch(c){}};a.Ka=function(c){if(a.pa()){a.Ma();try{k.localStorage.setItem(a.na(),k.JSON.stringify(c)),a.M=a.C()}catch(b){}}};a.Ma=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Aa()}};a.forceOffline=
        function(){a.oa=!0};a.forceOnline=function(){a.oa=!1};a.na=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.Fa=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Db=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.P(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);
        if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?
        a.pageURL:k.location);d||(d="&");return c&&b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.F="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
    a.g=a.F.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.la="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.N=a.la.slice(0);a.va="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks AudienceManagement".split(" ");
    for(n=0;250>=n;n++)76>n&&(a.g.push("prop"+n),a.N.push("prop"+n)),a.g.push("eVar"+n),a.N.push("eVar"+n),6>n&&a.g.push("hier"+n),4>n&&a.g.push("list"+n);n="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest".split(" ");a.g=a.g.concat(n);a.F=a.F.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename=
        "AppMeasurement.offline";a.Ja=0;a.ka=0;a.M=0;a.Ia=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Na=!1,navigator){var y=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=y.indexOf("MSIE ")||0<=y.indexOf("Trident/")&&0<=y.indexOf("Windows NT 6"))a.Na=!0}}catch(z){}a.ea=function(){a.fa&&(k.clearTimeout(a.fa),a.fa=q);a.l&&a.I&&a.l.dispatchEvent(a.I);a.A&&("function"==typeof a.A?a.A():a.l&&a.l.href&&(a.d.location=
        a.l.href));a.l=a.I=a.A=0};a.La=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.xa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.xa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.L&&a.L==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
        0;else{var m=a.L=a.clickObject;a.ja&&(clearTimeout(a.ja),a.ja=0);a.ja=setTimeout(function(){a.L==m&&(a.L=0)},1E4);f=a.Da();a.track();if(f<a.Da()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Fa(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",
        c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.I=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&
        k.MouseEvent)&&(a.xa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.La,30)};a.La();a.loadModule("ActivityMap")}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();

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

function imAMP(){
    var flag= false;
    if(typeof arrayAmp !== 'undefined') {
        if (arrayAmp['amp'] == "true") {
            flag= true;
        }
    }
    return flag;
}
////////////////////////////////////////END FUNCTIONS AMPS//////////////////////////////////////////////////////

function omn_trackEventRadio(eventName, data) {
    var map={
        "events":{
            "mediaBegin": "event11",
            "mediaComplete": "event12",
            "adStart": "event13",
            "adComplete": "event14",
            "adSkip": "event15",
            "mediaComplete": "event12",
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
        s.eVar13= s.evar13= data["data.tags"];
    }
    s.eVar17= "web"
    s.eVar18="prisa"; // Organization
    s.eVar19= product // Product
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
    if (typeof(userId) != 'undefined') {
        s.eVar43=userId; // User Id
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
    s.eVar73= dtm_version;
    s.eVar74= data["data.progressTime"];
    s.eVar81= data["data.emisora"];
    s.eVar84= data["data.extraccion"];
    s.tl(this,'o',eventName);
    s.clearVars();
    s.usePlugins=true;
}

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