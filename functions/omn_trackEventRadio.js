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
    s.linkTrackVars = "eVar2,eVar3,eVar4,eVar5,eVar6,eVar8,eVar12,eVar13,eVar18,eVar19,eVar20,eVar21,eVar22,eVar29,eVar32,eVar35,eVar38,eVar39,eVar42,eVar43,eVar44,eVar45,eVar48,eVar57,eVar60,eVar66,eVar67,eVar70,eVar73,eVar74,eVar80,eVar81,eVar84,list3";

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
    s.eVar18="prisa"; // Organization
    s.eVar19="cadenaser"; // Product
    s.eVar20=document.domain.replace(/www./gi,""); // Domain|Subdomain
    s.eVar21=s.getNewRepeat(); // User New / Repeat
    if (typeof(PEPuname) != "undefined") {
        s.eVar22 = "logueado";
    } else {
        s.eVar22= "anonimo"; // Logueado / Anonymous
    }
    s.eVar32=s.getVisitNum(); // Visit Number By Month
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
    s.eVar67= data["data.Enabled"];
    s.eVar70= data["data.mediaTypeMode"];
    s.eVar73= numVersion;
    s.eVar74= data["data.progressTime"];
    s.eVar81= data["data.emisora"];
    s.eVar84= data["data.extraccion"];
    s.tl(this,'o',eventName);
    s.clearVars();
    s.usePlugins=true;
}
