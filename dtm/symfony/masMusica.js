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
var country="panama";
var zone="america";
var product= "masmusica";

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
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters="javascript:,"+ s.server +""; 	//automatic
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

    if(omn_isPlayer()){
        section="player";
        s.channel= section;
    }

    s.prop3=type;																												// Type Content
    s.prop5="D=g";							  																			// URL
    s.prop6="D=r";									   																	// Referrer
    s.prop8=s.getTimeParting('d',gmt); 																	// Set day  (Jueves)
    s.prop9=s.getTimeParting('w', gmt);																	// Set weekday (laborable/festivo)
    s.prop14=country;											    													// Country
    s.prop15=zone;  																							 			// Zone (Region) : RADIO
    s.prop17="web";																											// Canal
    s.prop18="prisa";																										// Organization
    s.prop19=product;																									// Product
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
    s.prop39=pageName; 																									// Title / Page Name
    s.prop40=design; 																										// Type Design
    s.prop44=s.getTimeParting('h', gmt);				 												// Set hour (12:00PM)
    s.prop60=s.getDaysSinceLastVisit('s_lv');         									// Days Since Last Visit
    s.prop62=status;																												// Log in / Anonymous

    if(subsection != '' ){
        s.prop1 = section + '>' + subsection;			// subsection: "section>subsection"
        //s.pageName+= ':' + subsection;						// Manual formation s.PageName
    }else{
        s.prop1 = '';
    }
    if(subsubsection != ''){
        s.prop2= s.prop1 + '>' +subsubsection;			// subsubsection: "section>subsection>subsubsection"
        //s.pageName+= ':' + subsubsection;						// Manual formation s.PageName
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
if (typeof(pageName) == 'undefined') pageName=document.title;
if (typeof(section) == 'undefined') section='';
if (typeof(subsection) == 'undefined') subsection='';
if (typeof(subsubsection) == 'undefined') subsubsection='';
if (typeof(type) == 'undefined') type='otros';
if (typeof(design) == 'undefined') design='';
if (typeof(userId) == 'undefined') userId='';
if (typeof(status) == 'undefined') status='';
if (typeof(error) == 'undefined') error='';

if (typeof(country) == 'undefined') country='';
if (typeof(zone) == 'undefined') zone='';

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
    if(s.prop60)s.eVar60="D=c60"												// Days Since Last Visit
    if(s.prop62)s.eVar22="D=c62"												// Log In/ Anonymous

// Global variables
    pageName=s.pageName;

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
    for(var a=1;a<=75;a++)s["prop"+a]&&(s["prop"+a]=s["prop"+a].toString().toLowerCase().replace(/^d=/,"D="));for(var b=["products","pageName","channel","campaign"],a=0;a<b.length;a++)s[b[a]]&&(s[b[a]]=s[b[a]].toLowerCase().replace(/^d=/,"D="));

    s.prop34=userId;   																	// User Id
    if(s.prop34)s.eVar43="D=c34"												// User Id

    if(typeof (s.ab_enabled)!= 'undefined'){
        if(s.ab_enabled==true){
            s.prop57 = 'D="con_ADBLOCK-"+User-Agent';
            s.eVar57 = 'D="con_ADBLOCK-"+User-Agent';
        }
        else{
            s.prop57 = 'D="sin_ADBLOCK-"+User-Agent';
            s.eVar57 = 'D="sin_ADBLOCK-"+User-Agent';
        }
    }

}

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected. Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace = "prisacom";
s.trackingServer = "prisacom.d3.sc.omtrdc.net";
s.trackingServerSecure = "prisacom.d3.sc.omtrdc.net";

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

AppMeasurement for JavaScript version: 2.10.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.10.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Nb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.D=function(a){try{console.log(a)}catch(b){}};a.Ha=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.ub=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.za&&!/^[0-9.]+$/.test(c)&&
    (b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.za=0<d?c.substring(d):c}return a.za};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.ub(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
    (d=new Date,d.setTime(d.getTime()+1E3*g)):1===d&&(d=new Date,g=d.getYear(),d.setYear(g+2+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toUTCString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.rb=function(){var c=a.Util.getIeVersion();"number"===typeof c&&10>c&&(a.unsupportedBrowser=!0,a.gb(a,function(){}))};a.gb=function(a,b){for(var d in a)a.hasOwnProperty(d)&&"function"===typeof a[d]&&(a[d]=b)};
    a.L=[];a.ba=function(c,b,d){if(a.Aa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ca)for(a.ca=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ca=0,a.delayReady())});f=1;e=0}else d||a.o("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ca||setTimeout(a.delayReady,
        a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.o("_d")?b=1:a.ra();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Aa=1;a[d.m].apply(a,d.a);a.Aa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ba("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=
        c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.ga.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Lb,f=a[e].Kb));h&&(h=","+h+","+a.G.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.q=function(c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.q(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==
        f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ha(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.xb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.ga.join(",")+
        ",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Lb,m=a[e].Kb));q&&(q=","+q+","+a.G.join(",")+",");m&&(m=","+m+",",q&&(q+=",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.q("cid",
        e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.q("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e=
        "D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&
    a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;
        case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=
            (g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.q("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.q("mts",a[e],q,e));g="";break;default:a.Ha(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==
        f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}a.fa&&(c+="&lrt="+a.fa,a.fa=null);return c};a.C=function(a){var b=a.tagName;if("undefined"!=""+a.Qb||"undefined"!=""+a.Gb&&"HTML"!=(""+a.Gb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Da=function(a){var b=k.location,
        d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.C(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+
        f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Da(c),e)?{id:e.substring(0,100),type:g}:0};a.Ob=function(c){for(var b=a.C(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.C(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Fb=function(){var c,b,d=a.linkObject,
        f=a.linkType,e=a.linkURL,g,h;a.ha=1;d||(a.ha=0,d=a.clickObject);if(d){c=a.C(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.C(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.ha=1;!e&&d&&(e=a.Da(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&!f&&(l=e.toLowerCase(),a.Ga(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.yb=function(){var c=a.ha,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||
        f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.Bb()){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");
        a.e=a.q("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+
            a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.zb=function(){if(!a.Jb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?
        screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Pb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Jb=1}};a.Q={};a.loadModule=function(c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.ab=function(){return d.fb};d.hb=function(b){if(d.fb=b)a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.ab,set:d.hb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d))};a.o=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&
        d[c]()))return 1;return 0};a.Bb=function(){return a.ActivityMap&&a.ActivityMap._c?!0:!1};a.Cb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.va:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&
        ("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||(h[l]=a[g][l]);a[g]=h}};a.Ra=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.va:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.tb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),
            b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.Va=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);
        if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.X=!1;a.J=!1;a.jb=function(){a.J=!0;a.H()};a.Y=!1;a.S=!1;a.kb=function(c){a.marketingCloudVisitorID=c.MCMID;a.visitorOptedOut=c.MCOPTOUT;a.analyticsVisitorID=c.MCAID;a.audienceManagerLocationHint=c.MCAAMLH;a.audienceManagerBlob=c.MCAAMB;a.S=!0;a.H()};a.Ua=function(c){a.maxDelay||(a.maxDelay=250);return a.o("_d")?(c&&
    setTimeout(function(){c()},a.maxDelay),!1):!0};a.W=!1;a.I=!1;a.ra=function(){a.I=!0;a.H()};a.isReadyToTrack=function(){var c=!0,b=a.visitor;a.X||a.J||(a.Va(a.jb)?a.J=!0:a.X=!0);if(a.X&&!a.J)return!1;b&&b.isAllowed()&&(a.Y||a.marketingCloudVisitorID||!b.getVisitorValues||(a.Y=!0,a.marketingCloudVisitorID?a.S=!0:b.getVisitorValues(a.kb)),c=!a.Y||a.S||a.marketingCloudVisitorID?!0:!1);a.W||a.I||(a.Ua(a.ra)?a.I=!0:a.W=!0);a.W&&!a.I&&(c=!1);return c};a.l=p;a.r=0;a.callbackWhenReadyToTrack=function(c,b,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     d){var f;f={};f.ob=c;f.nb=b;f.lb=d;a.l==p&&(a.l=[]);a.l.push(f);0==a.r&&(a.r=setInterval(a.H,100))};a.H=function(){var c;if(a.isReadyToTrack()&&(a.ib(),a.l!=p))for(;0<a.l.length;)c=a.l.shift(),c.nb.apply(c.ob,c.lb)};a.ib=function(){a.r&&(clearInterval(a.r),a.r=0)};a.cb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f={},c)f[d]=c[d];e={};a.Ra(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.vb=function(){var c=a.cookieRead("s_fid"),b=
        "",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+
        " "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.o("_s");a.cb(c)||(b&&a.R(b),c&&(d={},a.Ra(d,0),a.R(c)),a.Cb()&&!a.visitorOptedOut&&(a.pa()||(a.fid=a.vb()),a.Fb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Sa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=
        f||void 0===f?void 0===f?"":f:n.document.referrer),a.Sa=1,a.referrer=a.tb(a.referrer),a.o("_g")),a.yb()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.zb(),g+=a.xb(),a.eb(e,g),a.o("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=
        a.pev3=a.e=a.lightProfileID=0};a.ua=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ua.push([c,b]):a.debugTracking&&a.D("DEBUG: Non function type passed to registerPreTrackCallback")};a.Ya=function(c){a.oa(a.ua,c)};a.ta=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ta.push([c,b]):a.debugTracking&&a.D("DEBUG: Non function type passed to registerPostTrackCallback")};
    a.Xa=function(c){a.oa(a.ta,c)};a.oa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1].slice();e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.D(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.k=c,a.v=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<
    a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.eb=function(c,b){var d=a.Za()+"/"+c+"?AQB=1&ndh=1&pf=1&"+(a.qa()?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.Ya(d);a.Wa(d);a.T()};a.Za=function(){var c=a.$a();return"http"+
        (a.ssl?"s":"")+"://"+c+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(a.qa()?"10":"1")+"/JS-"+a.version+(a.Ib?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")};a.qa=function(){return a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks};a.$a=function(){var c=a.dc,b=a.trackingServer;b?a.trackingServerSecure&&a.ssl&&(b=a.trackingServerSecure):(c=c?(""+c).toLowerCase():"d1","d1"==c?c="112":"d2"==c&&(c="122"),b=a.bb()+"."+c+".2o7.net");return b};a.bb=function(){var c=a.visitorNamespace;
        c||(c=a.account.split(",")[0],c=c.replace(/[^0-9a-z]/gi,""));return c};a.Qa=/{(%?)(.*?)(%?)}/;a.Mb=RegExp(a.Qa.source,"g");a.sb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Mb),e=0;e<f.length;++e){var g=f[e],h=g.match(a.Qa),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.wb());d.c=d.c.replace(g,a.escape(k))}}};a.wb=function(){var c=
        new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.j(4,c.getFullYear())+"-"+a.j(2,c.getMonth()+1)+"-"+a.j(2,c.getDate())+"T"+a.j(2,c.getHours())+":"+a.j(2,c.getMinutes())+":"+a.j(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.j(2,b.getUTCHours())+":"+a.j(2,b.getUTCMinutes())};a.j=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.la={};a.doPostbacks=function(c){if("object"==typeof c)if(a.sb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&
        a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.la[d.id]=new Image,a.la[d.id].alt="",a.la[d.id].src=d.c)}};a.Wa=function(c){a.i||a.Ab();a.i.push(c);a.ea=a.B();a.Oa()};a.Ab=function(){a.i=a.Db();a.i||(a.i=[])};a.Db=function(){var c,b;if(a.ka()){try{(b=
        k.localStorage.getItem(a.ia()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ka=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ea=function(){var c=0;a.i&&(c=a.i.length);a.p&&c++;return c};a.T=function(){if(a.p&&(a.A&&a.A.complete&&a.A.F&&a.A.na(),a.p))return;a.Fa=p;if(a.ja)a.ea>a.O&&a.Ma(a.i),a.ma(500);else{var c=a.mb();if(0<c)a.ma(c);else if(c=a.Ba())a.p=1,a.Eb(c),a.Hb(c)}};a.ma=function(c){a.Fa||(c||(c=0),a.Fa=setTimeout(a.T,c))};a.mb=function(){var c;
        if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.B()-a.Ka;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ba=function(){if(0<a.i.length)return a.i.shift()};a.Eb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.D(b)}};a.pa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.V=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.V=!0,a.U=function(a){return JSON.parse(a)}):
        k.$&&k.$.parseJSON?(a.U=function(a){return k.$.parseJSON(a)},a.V=!0):a.U=function(){return null};a.Hb=function(c){var b,d,f;a.pa()&&2047<c.length&&(a.Ta()&&(d=1,b=new XMLHttpRequest),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.V?b.wa=!0:b=0));!b&&a.Pa&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?
        f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=2):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||(b.abort=function(){b.src=p}));b.La=Date.now();b.ya=function(){try{b.F&&(clearTimeout(b.F),b.F=0)}catch(a){}};b.onload=b.na=function(){b.La&&(a.fa=Date.now()-b.La);a.Xa(c);b.ya();a.qb();a.Z();a.p=0;a.T();if(b.wa){b.wa=!1;try{a.doPostbacks(a.U(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ca=function(){b.ya();(a.trackOffline||a.ja)&&a.p&&
    a.i.unshift(a.pb);a.p=0;a.ea>a.O&&a.Ma(a.i);a.Z();a.ma(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.na():b.Ca())};a.Ka=a.B();if(1==d)f=c.indexOf("?"),d=c.substring(0,f),f=c.substring(f+1),f=f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,""),b.open("POST",d,!0),b.withCredentials=!0,b.send(f);else if(b.src=c,2==d){if(a.Ia)try{f.removeChild(a.Ia)}catch(e){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ia=a.A}b.F=setTimeout(function(){b.F&&(b.complete?b.na():(a.trackOffline&&
    b.abort&&b.abort(),b.Ca()))},5E3);a.pb=c;a.A=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.v)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.aa=setTimeout(a.Z,a.forcedLinkTrackingTimeout)};a.Ta=function(){return"undefined"!==typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest?!0:!1};a.qb=function(){if(a.ka()&&!(a.Ja>a.O))try{k.localStorage.removeItem(a.ia()),a.Ja=a.B()}catch(c){}};a.Ma=function(c){if(a.ka()){a.Oa();try{k.localStorage.setItem(a.ia(),
        k.JSON.stringify(c)),a.O=a.B()}catch(b){}}};a.Oa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ba()}};a.forceOffline=function(){a.ja=!0};a.forceOnline=function(){a.ja=!1};a.ia=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.B=function(){return(new Date).getTime()};a.Ga=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:
        !1};a.setTagContainer=function(c){var b,d,f;a.Ib=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);
        0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}},getIeVersion:function(){if(document.documentMode)return document.documentMode;for(var a=7;4<a;a--){var b=document.createElement("div");b.innerHTML="\x3c!--[if IE "+a+"]><span></span><![endif]--\x3e";if(b.getElementsByTagName("span").length)return a}return null}};a.G="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
    a.g=a.G.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ga="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.ga.slice(0);a.va="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
    for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.G=a.G.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
        0;a.offlineFilename="AppMeasurement.offline";a.Ka=0;a.ea=0;a.O=0;a.Ja=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Pa=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Pa=!0}}catch(x){}a.Z=function(){a.aa&&(k.clearTimeout(a.aa),a.aa=p);a.k&&a.K&&a.k.dispatchEvent(a.K);a.v&&("function"==typeof a.v?a.v():
        a.k&&a.k.href&&(a.d.location=a.k.href));a.k=a.K=a.v=0};a.Na=function(){a.b=a.d.body;a.b?(a.u=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.xa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.u,!1);else{a.b.removeEventListener("click",a.u,!0);a.xa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
            a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.da&&(clearTimeout(a.da),a.da=0);a.da=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ea();a.track();if(f<a.Ea()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Ga(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
        new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.k=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.u):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
        a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.xa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.u,!0)),a.b.addEventListener("click",a.u,!1))):setTimeout(a.Na,30)};a.rb();a.Rb||(r?a.setAccount(r):a.D("Error, missing Report Suite ID in AppMeasurement initialization"),a.Na(),a.loadModule("ActivityMap"))}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t?a.setAccount&&a.setAccount(r):a=new AppMeasurement(r);return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();

s.channel = section;
s.pageName= s.siteID + location.pathname;
s.pageURL= location.href;
s.referrer = document.referrer; /*<----- if first time then s.referrer = document.referrer; ------>*/

if(omn_isPlayer()){
    section="player";
    s.channel= section;
}

s.prop3=type;																												// Type Content
s.prop5="D=g";							  																			// URL
s.prop6="D=r";									   																	// Referrer
s.prop8=s.getTimeParting('d',gmt); 																	// Set day  (Jueves)
s.prop9=s.getTimeParting('w', gmt);																	// Set weekday (laborable/festivo)
s.prop14=country;											    													// Country
s.prop15=zone;  																							 			// Zone (Region) : RADIO
s.prop17="web";																											// Canal
s.prop18="prisa";																										// Organization
s.prop19=product;																									// Product
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
s.prop39=pageName; 																									// Title / Page Name
s.prop40=design; 																										// Type Design
s.prop44=s.getTimeParting('h', gmt);				 												// Set hour (12:00PM)
s.prop60=s.getDaysSinceLastVisit('s_lv');         									// Days Since Last Visit
s.prop62=status;																												// Log in / Anonymous

if(subsection != '' ){
    s.prop1 = section + '>' + subsection;			// subsection: "section>subsection"
    //s.pageName+= ':' + subsection;						// Manual formation s.PageName
}else{
    s.prop1 = '';
}
if(subsubsection != ''){
    s.prop2= s.prop1 + '>' +subsubsection;			// subsubsection: "section>subsection>subsubsection"
    //s.pageName+= ':' + subsubsection;						// Manual formation s.PageName
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

function omn_isPlayer(){
    isPlayer= false;
    if((s.siteID.indexOf("play")>-1)||(s.siteID.indexOf("player")>-1)||(s.siteID.indexOf("escucha")>-1)||(s.siteID.indexOf("escuche")>-1)||(s.siteID.indexOf("envivo")>-1)||(s.siteID.indexOf("los40.com.gt")>-1)){
        isPlayer= true;
    }
    return isPlayer;
}

var dtm_version= "dtm version 1.0.1";
if(typeof tucu !== 'undefined'){
    if(typeof tucu.dev !== 'undefined'){
        if(tucu.dev == true){
            console.log("/////////////////////DTM////////////////////////////");
            console.log(dtm_version);
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