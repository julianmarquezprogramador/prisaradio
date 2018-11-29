function takemeUID(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.head.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.head.appendChild(script);
}

(function (){

    var url = "//seguro.elpais.com/wsUserInfo?c=llamada";

    takemeUID(url, function(data) {
        userId = data.id.uid;console.log("El userId= "+userId);
        if(typeof(data.id.nick) == 'undefined'){
            status = 'anonimo';
        }else{
            status = 'logueado';
        }
    });
}());




/////borrar

function takemeUID(url, callback) {
    var callbackName = 'jsonp_callbak_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.head.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.head.appendChild(script);
}

(function (){

    var url = "//api.elpais.com/wsUserInfo?c=llamada";

    takemeUID(url, function(data) {
        userId = data.id.uid;
        if(typeof(data.id.nick) == 'undefined'){
            status = 'anonimo';
        }else{
            status = 'logueado';
        }
    });

}());