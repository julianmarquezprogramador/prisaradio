s.account = getAnalyticsAccount();
s.accountF = getAnalyticsAccountF();

omn_adblocker();

setTimeout(function(){

    if(s.ab_enabled){
        s.prop57 = 'D="con_ADBLOCK-"+User-Agent';
        s.eVar57 = 'D="con_ADBLOCK-"+User-Agent';
    }else{
        s.prop57 = 'D="sin_ADBLOCK-"+User-Agent';
        s.eVar57 = 'D="sin_ADBLOCK-"+User-Agent';
    }

    s.t();

}, 800);

return false;