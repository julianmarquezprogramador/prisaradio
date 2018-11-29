function launchConsentComscore() {
    window.__cmp("getVendorConsents", [77], function(results){
        //console.log(results.vendorConsents);
        resultsConsentsComscore= results.vendorConsents;
    });
    if(typeof resultsConsentsComscore !== "undefined"){
        if(resultsConsentsComscore[77]==true){
            console.log("Se lanza el pixel con la variable en 1");
            // (function() {
            //     var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
            //     s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
            //     el.parentNode.insertBefore(s, el);
            // })();
        }
        else{
            console.log("Se lanza el pixel con la variable en 0");
        }
    }
}launchConsentComscore();