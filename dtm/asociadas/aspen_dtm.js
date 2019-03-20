var numVersion= "2.0.1";
var dtmVersion= "dtm version " + numVersion;

/* Function to get RSIDs from UI */
function getAnalyticsAccount(){
    for (var toolid in _satellite.tools){
        if (_satellite.tools[toolid].settings.engine == "sc"){
            //return _satellite.tools[toolid].settings.account;
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
var useSSL = document.location.protocol == 'https:' ? true : false;

var country="argentina";
var zone="america";
var product= "aspen";

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

/***** Functions ************/
function omn_asyncPV(){

    s.account = getAnalyticsAccount();
    s.accountF = getAnalyticsAccountF();

    s.channel = section;
    s.pageName= s.siteID + location.pathname;
    s.pageURL= location.href;
    s.referrer = _satellite.previousURL;

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

        if(/.aspen.com/.test(parentDomain)){
            s.abort = true;
        }
    }

    s.prop3=type;																												// Type Content
    s.prop5="D=g";							  																			// URL
    s.prop6="D=r";									   																	// Referrer
    s.prop8=s.getTimeParting('d',gmt); 																	// Set day  (Jueves)
    s.prop9=s.getTimeParting('w', gmt);																	// Set weekday (laborable/festivo)
    s.prop14= country;											    											// Country
    s.prop15= zone;  																								// Zone (Region) : RADIO
    s.prop17=channel;																										// Canal
    s.prop18="prisa";																										// Organization
    s.prop19= product;																										// Product
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
    s.prop39=pageTitle; 																								// Page Title
    s.prop44=s.getTimeParting('h', gmt);				 												// Set hour (12:00PM)
    s.prop60=s.getDaysSinceLastVisit('s_lv');         									// Days Since Last Visit
    s.prop62=status;																										// Log in / Anonymous
    s.prop73= dtmVersion;

    if(subsection != '' ){
        s.prop1 = section + '>' + subsection;			// subsection: "section>subsection"
        s.pageName+= ':' + subsection;						// Manual formation s.PageName
    }else{
        s.prop1 = '';
    }
    if(subsubsection != ''){
        s.prop2= s.prop1 + '>' +subsubsection;			// subsubsection: "section>subsection>subsubsection"
        s.pageName+= ':' + subsubsection;						// Manual formation s.PageName
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
    omn_launchPixelComScore();

    _satellite.previousURL = location.href;
}
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

omn_launchPixelComScore();
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
//    s.pageName= s.siteID + location.pathname;														// Get Path Name (On)


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
    if(s.prop40)s.eVar40="D=c40"												// Type Design Web
    if(s.prop44)s.eVar44="D=c44"												// Set hour (12:00PM)
    if(s.prop45)s.eVar45="D=c45"												// Title / Page Name
    if(s.prop60)s.eVar60="D=c60"												// Days Since Last Visit
    if(s.prop62)s.eVar22="D=c62"												// Log In/ Anonymous

// Set Page View Event
    s.events="event2";

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
    for(var a=1;a<=100;a++)s["prop"+a]&&(s["prop"+a]=s["prop"+a].toString().toLowerCase().replace(/^d=/,"D="));for(var b=["products","pageName","channel","campaign"],a=0;a<b.length;a++)s[b[a]]&&(s[b[a]]=s[b[a]].toLowerCase().replace(/^d=/,"D="));

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
    "")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):a.src&&"IMAGE"==c&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.6.1
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(){var a=this;a.version="1.6.1";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.AppMeasurement.Cb;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.sb=function(a){try{console.log(a)}catch(b){}};a.Da=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.kb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
    !/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.kb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.H=[];a.ea=function(c,b,d){if(a.wa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];
    g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.fa)for(a.fa=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&(a.fa=0,a.delayReady())});f=1;e=0}else d||a.l("_d")&&(f=1);f&&(a.H.push({m:c,a:b,t:e}),a.fa||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.l("_d")?b=1:a.qa();0<a.H.length;){d=a.H.shift();if(b&&!d.t&&d.t>c){a.H.unshift(d);setTimeout(a.delayReady,
    parseInt(a.maxDelay/2));break}a.wa=1;a[d.m].apply(a,d.a);a.wa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ea("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.L,(m=a.lightTrackVars)&&(m=","+m+","+a.ja.join(",")+",");else{d=a.e;if(a.pe||a.linkType)m=a.linkTrackVars,
    f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].Bb,f=a[e].Ab));m&&(m=","+m+","+a.C.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.p=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                0;p<n.length;p++)m.substring(0,n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.p(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.Da(w)&&("prop"==
k?m="c"+w:"eVar"==k?m="v"+w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.mb=function(){var c="",b,d,f,e,g,m,p,k,n="",r="",s=e="";if(a.lightProfileID)b=a.L,(n=a.lightTrackVars)&&(n=","+n+","+a.ja.join(",")+",");else{b=a.e;if(a.pe||a.linkType)n=a.linkTrackVars,r=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].Bb,r=a[e].Ab));n&&(n=","+n+","+a.C.join(",")+",");r&&(r=","+r+",",
n&&(n+=",events,"));a.events2&&(s+=(""!=s?",":"")+a.events2)}if(a.visitor&&1.5<=parseFloat(a.visitor.version)&&a.visitor.getCustomerIDs){e=q;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState));e&&(c+=a.p("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.p("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);!g&&
"events"==e&&s&&(g=s,s="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,
    255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
    "cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":s&&(g+=(""!=g?",":"")+s);if(r)for(m=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=r.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.p("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
    "mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.p("mts",a[e],n,e));g="";break;default:a.Da(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.c&&(c+=a.c)}return c};a.B=function(a){var b=a.tagName;if("undefined"!=""+a.Fb||"undefined"!=""+a.wb&&"HTML"!=(""+a.wb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
    "BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.za=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:"",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.I=function(c){var b=a.B(c),d,f,e="",g=0;return b&&
(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):c.src&&"IMAGE"==b&&(e=c.src):e=a.za(c),e)?{id:e.substring(0,100),type:g}:0};a.Db=function(c){for(var b=a.B(c),d=a.I(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.B(c),d=a.I(c);
    d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.vb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.ka=1;d||(a.ka=0,d=a.clickObject);if(d){c=a.B(d);for(b=a.I(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.B(d),b=a.I(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.ka=1;!e&&d&&(e=a.za(d));e&&
!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,r=0,q;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(q=g[m])&&p.substring(p.length-(q.length+1))=="."+q&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.Ca(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),
        g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)q=g[m],0<=p.indexOf(q)&&(r=1);r?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.c="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.c="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+
    "&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.nb=function(){var c=a.ka,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),
    b[p]=f;f=a.account.split(",");m={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(m[k]=a.contextData[k],a.contextData[k]="");a.c=a.p("c",m)+(a.c?a.c:"");if(c||a.c){c&&!a.c&&(e=1);for(p in b)if(!Object.prototype[p])for(k=0;k<f.length;k++)for(e&&(g=b[p].join(","),g==a.account&&(a.c+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),m=0;m<b[p].length;m++)g=b[p][m],g==f[k]&&(e&&(a.c+="&u="+a.escape(g)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(m,1),d=1);c||(d=1);if(d){e=
    "";m=2;!c&&a.c&&(e=a.escape(f.join(","))+"="+a.escape(a.c),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};a.ob=function(){if(!a.zb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&
(k="1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Eb(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=
    f;a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.zb=1}};a.M={};a.loadModule=function(c,b){var d=a.M[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.M[c]=a[c]=d;d.Sa=function(){return d.Wa};d.Xa=function(b){if(d.Wa=b)a[c+"_onLoad"]=b,a.ea(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Sa,set:d.Xa}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=
    b,a.ea(c+"_onLoad",[a,d],1)||b(a,d))};a.l=function(c){var b,d;for(b in a.M)if(!Object.prototype[b]&&(d=a.M[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.qb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.N=function(c,b){var d,
    f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.ra:a.e,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.La=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.ra:a.e,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.ib=function(a){var b,d,f,e,g,k=0,p,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(p=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,
        7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(k=",p,ei,"),k&&p)))){if((a=p.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?p=n+"&"+q:q=""}d=253-(p.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+p}return a};a.Ra=function(c){var b=
    a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.aa=!1;a.F=!1;a.Za=function(){a.F=!0;a.i()};a.Y=!1;a.R=!1;a.Va=function(c){a.marketingCloudVisitorID=c;a.R=!0;a.i()};a.ba=!1;a.S=!1;a.$a=function(c){a.visitorOptedOut=c;a.S=!0;a.i()};a.V=!1;a.O=!1;a.Na=function(c){a.analyticsVisitorID=
    c;a.O=!0;a.i()};a.X=!1;a.Q=!1;a.Pa=function(c){a.audienceManagerLocationHint=c;a.Q=!0;a.i()};a.W=!1;a.P=!1;a.Oa=function(c){a.audienceManagerBlob=c;a.P=!0;a.i()};a.Qa=function(c){a.maxDelay||(a.maxDelay=250);return a.l("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.Z=!1;a.D=!1;a.qa=function(){a.D=!0;a.i()};a.isReadyToTrack=function(){var c=!0,b=a.visitor;a.aa||a.F||(a.Ra(a.Za)?a.F=!0:a.aa=!0);if(a.aa&&!a.F)return!1;b&&b.isAllowed()&&(a.Y||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||
(a.Y=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.Va]),a.marketingCloudVisitorID&&(a.R=!0)),a.ba||a.visitorOptedOut||!b.isOptedOut||(a.ba=!0,a.visitorOptedOut=b.isOptedOut([a,a.$a]),a.visitorOptedOut!=q&&(a.S=!0)),a.V||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.V=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Na]),a.analyticsVisitorID&&(a.O=!0)),a.X||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.X=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,
    a.Pa]),a.audienceManagerLocationHint&&(a.Q=!0)),a.W||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.W=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Oa]),a.audienceManagerBlob&&(a.P=!0)),a.Y&&!a.R&&!a.marketingCloudVisitorID||a.V&&!a.O&&!a.analyticsVisitorID||a.X&&!a.Q&&!a.audienceManagerLocationHint||a.W&&!a.P&&!a.audienceManagerBlob||a.ba&&!a.S)&&(c=!1);a.Z||a.D||(a.Qa(a.qa)?a.D=!0:a.Z=!0);a.Z&&!a.D&&(c=!1);return c};a.k=q;a.q=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};
    f.eb=c;f.cb=b;f.ab=d;a.k==q&&(a.k=[]);a.k.push(f);0==a.q&&(a.q=setInterval(a.i,100))};a.i=function(){var c;if(a.isReadyToTrack()&&(a.Ya(),a.k!=q))for(;0<a.k.length;)c=a.k.shift(),c.cb.apply(c.eb,c.ab)};a.Ya=function(){a.q&&(clearInterval(a.q),a.q=0)};a.Ta=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.La(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.lb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;
    var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+
    f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.jb&&(a.authState=a.visitor.jb()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)));a.l("_s");a.Ta(c)||(b&&a.N(b),c&&(d={},a.La(d,0),a.N(c)),a.qb()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.lb()),a.vb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&
(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Ma||(a.referrer=r.document.referrer),a.Ma=1,a.referrer=a.ib(a.referrer),a.l("_g")),a.nb()&&!a.abort&&(a.ob(),g+=a.mb(),a.ub(e,g),a.l("_t"),a.referrer=""))),c&&a.N(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.c=a.lightProfileID=0};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
    c;a.linkType=b;a.linkName=d;e&&(a.j=c,a.u=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.e.length;c++)if(b=a.e[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
    void 0};a.tagContainerMarker="";a.ub=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,f)),k=k.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady();d+=f+"/b/ss/"+a.account+
    "/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.yb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].AudienceManagement.passData&":"")+b+"&AQE=1";a.hb(d);a.ga()};a.hb=function(c){a.g||a.pb();a.g.push(c);a.ia=a.A();a.Ja()};a.pb=function(){a.g=a.rb();a.g||(a.g=[])};a.rb=function(){var c,b;if(a.na()){try{(b=k.localStorage.getItem(a.la()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.na=function(){var c=!0;a.trackOffline&&a.offlineFilename&&
k.localStorage&&k.JSON||(c=!1);return c};a.Aa=function(){var c=0;a.g&&(c=a.g.length);a.o&&c++;return c};a.ga=function(){if(a.o&&(a.v&&a.v.complete&&a.v.timeout&&a.v.pa(),a.o))return;a.Ba=q;if(a.ma)a.ia>a.K&&a.Ha(a.g),a.oa(500);else{var c=a.bb();if(0<c)a.oa(c);else if(c=a.xa())a.o=1,a.tb(c),a.xb(c)}};a.oa=function(c){a.Ba||(c||(c=0),a.Ba=setTimeout(a.ga,c))};a.bb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.A()-a.Ga;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
    c};a.xa=function(){if(0<a.g.length)return a.g.shift()};a.tb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.sb(b)}};a.Ua=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.U=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=null}s&&"y"==s.x?(a.U=!0,a.T=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.T=function(a){return k.$.parseJSON(a)},a.U=!0):a.T=function(){return null};a.xb=function(c){var b,
    d,f;a.Ua()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(a.U?b.ta=!0:b=0));!b&&a.Ka&&(c=c.substring(0,2047));!b&&a.d.createElement&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",
    b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||(b.abort=function(){b.src=q}));b.va=function(){try{b.timeout&&(clearTimeout(b.timeout),b.timeout=0)}catch(a){}};b.onload=b.pa=function(){b.va();a.gb();a.ca();a.o=0;a.ga();if(b.ta){b.ta=!1;try{var c=a.T(b.responseText);a.AudienceManagement.passData(c)}catch(d){}}};b.onabort=b.onerror=b.ya=function(){b.va();(a.trackOffline||a.ma)&&a.o&&a.g.unshift(a.fb);a.o=0;a.ia>a.K&&a.Ha(a.g);a.ca();
    a.oa(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.pa():b.ya())};a.Ga=a.A();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Ea)try{f.removeChild(a.Ea)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ea=a.v}b.timeout=setTimeout(function(){b.timeout&&(b.complete?b.pa():(a.trackOffline&&
b.abort&&b.abort(),b.ya()))},5E3);a.fb=c;a.v=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.G||a.u)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.da=setTimeout(a.ca,a.forcedLinkTrackingTimeout)};a.gb=function(){if(a.na()&&!(a.Fa>a.K))try{k.localStorage.removeItem(a.la()),a.Fa=a.A()}catch(c){}};a.Ha=function(c){if(a.na()){a.Ja();try{k.localStorage.setItem(a.la(),k.JSON.stringify(c)),a.K=a.A()}catch(b){}}};a.Ja=function(){if(a.trackOffline){if(!a.offlineLimit||
    0>=a.offlineLimit)a.offlineLimit=10;for(;a.g.length>a.offlineLimit;)a.xa()}};a.forceOffline=function(){a.ma=!0};a.forceOnline=function(){a.ma=!1};a.la=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.A=function(){return(new Date).getTime()};a.Ca=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.yb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==
    d._c&&d.tagContainerName==c){a.N(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,
    cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:k.location);d||(d="&");return c&&b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.C="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
    a.e=a.C.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ja="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.L=a.ja.slice(0);a.ra="account allAccounts debugTracking visitor trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData AudienceManagement".split(" ");
    for(n=0;250>=n;n++)76>n&&(a.e.push("prop"+n),a.L.push("prop"+n)),a.e.push("eVar"+n),a.L.push("eVar"+n),6>n&&a.e.push("hier"+n),4>n&&a.e.push("list"+n);n="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest".split(" ");a.e=a.e.concat(n);a.C=a.C.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename=
        "AppMeasurement.offline";a.Ga=0;a.ia=0;a.K=0;a.Fa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ka=!1,navigator){var y=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=y.indexOf("MSIE ")||0<=y.indexOf("Trident/")&&0<=y.indexOf("Windows NT 6"))a.Ka=!0}}catch(z){}a.ca=function(){a.da&&(k.clearTimeout(a.da),a.da=q);a.j&&a.G&&a.j.dispatchEvent(a.G);a.u&&("function"==typeof a.u?a.u():a.j&&a.j.href&&(a.d.location=
        a.j.href));a.j=a.G=a.u=0};a.Ia=function(){a.b=a.d.body;a.b?(a.r=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.ua)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.r,!1);else{a.b.removeEventListener("click",a.r,!0);a.ua=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.J&&a.J==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
        0;else{var m=a.J=a.clickObject;a.ha&&(clearTimeout(a.ha),a.ha=0);a.ha=setTimeout(function(){a.J==m&&(a.J=0)},1E4);f=a.Aa();a.track();if(f<a.Aa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Ca(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",
        c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.j=c.target,a.G=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.r):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&
        k.MouseEvent)&&(a.ua=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.r,!0)),a.b.addEventListener("click",a.r,!1))):setTimeout(a.Ia,30)};a.Ia();a.loadModule("ActivityMap")}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();

s.channel = section;
s.pageName= s.siteID + location.pathname;
s.pageURL= location.href;
s.referrer = document.referrer; /*<----- if first time then s.referrer = document.referrer; ------>*/

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

    if(/.aspen.com/.test(parentDomain)){
        s.abort = true;
    }
}

s.prop3=type;																												// Type Content
s.prop5="D=g";							  																			// URL
s.prop6="D=r";									   																	// Referrer
s.prop8=s.getTimeParting('d',gmt); 																	// Set day  (Jueves)
s.prop9=s.getTimeParting('w', gmt);																	// Set weekday (laborable/festivo)
s.prop14= country;											    											// Country
s.prop15= zone;  																								// Zone (Region) : RADIO
s.prop17=channel;																										// Canal
s.prop18="prisa";																										// Organization
s.prop19= product;																										// Product
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
s.prop39=pageTitle; 																								// Page Title
s.prop44=s.getTimeParting('h', gmt);				 												// Set hour (12:00PM)
s.prop60=s.getDaysSinceLastVisit('s_lv');         									// Days Since Last Visit
s.prop62=status;																										// Log in / Anonymous
s.prop73= dtmVersion;

if(subsection != '' ){
    s.prop1 = section + '>' + subsection;			// subsection: "section>subsection"
    s.pageName+= ':' + subsection;						// Manual formation s.PageName
}else{
    s.prop1 = '';
}
if(subsubsection != ''){
    s.prop2= s.prop1 + '>' +subsubsection;			// subsubsection: "section>subsection>subsubsection"
    s.pageName+= ':' + subsubsection;						// Manual formation s.PageName
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

/////////////////////////////functions//////////////////////////////////////////////////////////////////////////////////////
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
    var cadena_titulo= document.title.toLowerCase();
    comscoreImg.src = (useSSL ? "https://sb.scorecardresearch.com" : "http://b.scorecardresearch.com") + "/p?c1="+_comscore[0].c1+"&c2="+_comscore[0].c2+"&cv=2.0&cj=1&c7=" + encodeURIComponent(document.location.href) + "&c8=" + encodeURIComponent(cadena_titulo) +  "&c9=" + encodeURIComponent(document.referrer) + "&rn=" + String(Math.random()).substr(2,9);
}