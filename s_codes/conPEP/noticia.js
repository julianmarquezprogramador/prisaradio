// UTILIDADES

function cargarDependencias() {

    // TODO: Cargar condicionalmente encuestas y quizs

    // Librería para comprobar si un elemento está en el viewport
    $.getScript('/js/v2.x/v2.0/lib/isInViewport.min.js');

    // Librería para los conectores sociales
    $.getScript('/js/v2.x/v2.0/lib/connectSocialNetworks.js');

    // Librería para las encuestas
    // Se ha movido al include de scripts de la noticia
    //$.getScript('/js/v1.x/v1.0/encuestas.js');

    // Librería para los quizs
    $.getScript('/quizs/js/v1.x/v1.0/quizs.js');

    // Librería para ampliar imágenes
    $.getScript('/js/v2.x/v2.0/lib/featherlight.min.js');
}

function generarContadorEskup(idComentariosNoticia, countDiv) {

    $.getJSON("/ThreadeskupSimple?action=info&th=" + idComentariosNoticia + "&rnd=" + Math.random(), function(data) {

        if (typeof data.perfilesHilos != 'undefined' && typeof data.perfilesHilos['_' + idComentariosNoticia] != 'undefined' && typeof data.perfilesHilos['_' + idComentariosNoticia].numero_mensajes != 'undefined' && data.perfilesHilos['_' + idComentariosNoticia].numero_mensajes != 0) {

            $(countDiv).append('<span class="commentsCount">' + data.perfilesHilos['_' + idComentariosNoticia].numero_mensajes + '</span>');

        }

    });
}

function EPETMail( _button, _div, _user, _url ) {
    /* Properties */

    var QueryUrl = '/s/enviaNoticiaCorreo.plr?url=';

    //var SelfUrl = window.location.pathname;
    var SelfUrl = _url;

    var Header;

    var Greeting;
    var SendForm;

    var Ok;
    var Error;

    var Address;
    var Comment;

    var User   = _user;
    var Button = _button;
    var Div    = _div;

    var req;

    /* Methods */

    function sendData() {
        var url = QueryUrl + SelfUrl + '&to=' + Address.value;
        if ( Comment.value )
            url += '&txt=' + Comment.value;

        // branch for native XMLHttpRequest object
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
            req.onreadystatechange = showResult;
            req.open("GET", url, true);
            req.send(null);
            // branch for IE/Windows ActiveX version
        } else if (window.ActiveXObject) {
            isIE = true;
            req = new ActiveXObject("Microsoft.XMLHTTP");
            if (req) {
                req.onreadystatechange = showResult;
                req.open("GET", url, true);
                req.send();
            }
        }
        return true;
    } // sendData

    function showResult() {
        // only if req shows "loaded"
        if (req.readyState == 4) {
            // only if "OK"
            if (req.status == 200) {
                var json;
                eval( 'json = ' + req.responseText  + ';');

                if ( json.status == 'ok' ) {
                    //Div.innerHTML = '';
                    //Div.appendChild ( Header );
                    if ( SendForm )
                        if ( SendForm.parentNode )
                            SendForm.parentNode.removeChild(SendForm);

                    if ( Greeting )
                        if ( Greeting.parentNode )
                            Greeting.parentNode.removeChild(Greeting);

                    Div.appendChild ( Ok );
                } else if ( json.status == 'error' ) {
                    //Div.innerHTML = '';
                    //Div.appendChild ( Header );
                    if ( SendForm )
                        if ( SendForm.parentNode )
                            SendForm.parentNode.removeChild(SendForm);

                    if ( Greeting )
                        if ( Greeting.parentNode )
                            Greeting.parentNode.removeChild(Greeting);
                    Error.innerHTML = json.info;
                    Div.appendChild ( Error );
                }
            } else {
                alert("There was a problem retrieving the data:\n" + req.statusText);
            }
        }
    }


    function createHeader() {
        var headerDiv = document.createElement('DIV');
        headerDiv.className = 'encabezado estirar';

        var hrefElement = document.createElement('A');
        hrefElement.onclick   = function() {
            Div.style.display = 'none';
        }
        hrefElement.title     = 'Cerrar' ;
        hrefElement.className = 'boton enviar';
        hrefElement.href      = 'javascript:void(0);';
        hrefElement.innerHTML = 'Enviar noticia por correo electrónico';

        var closeElement = document.createElement('A');
        closeElement.onclick   = function() {
            Div.style.display = 'none';
        }
        closeElement.title     = "Cerrar";
        closeElement.className = "cerrar";
        closeElement.href      = "javascript:void(0);";

        headerDiv.appendChild(hrefElement);
        headerDiv.appendChild(closeElement);

        Header = headerDiv;

        return true;

    } // createHeader

    function createSendForm() {

        if ( ! Greeting ) {
            var greetingElement = document.createElement('P');
            greetingElement.innerHTML  = 'Hola, <a title="Ver perfil" href="javascript:void(0);">' + User + '</a>';  // FIXME Hay que poner lo del perfil

            Greeting = greetingElement;
        }

        if ( ! SendForm ) {
            var formElement = document.createElement('FORM');
            var fieldsetElement = document.createElement('FIELDSET');

            var legendElement = document.createElement('LEGEND');
            legendElement.innerHTML = 'Enviar noticia por correo electrónico';

            var labelElement = document.createElement('LABEL');
            //labelElement.for = 'direccion';
            labelElement.innerHTML = 'Introduce la dirección de correo del destinatario:';

            var inputElement        = document.createElement('INPUT');
            inputElement.type       = 'text';
            inputElement.autofocus  = 'autofocus';
            inputElement.name       = 'direccion';
            inputElement.id         = 'direccion';

            Address = inputElement;

            var labelCommentElement       = document.createElement('LABEL');
            //labelCommentElement.for       = 'comentario';
            labelCommentElement.innerHTML = 'Tu comentario (opcional):';

            var textAreaElement  = document.createElement('TEXTAREA');
            //textAreaElement.cols = 0;
            textAreaElement.rows = 20;
            textAreaElement.name = 'comentario';
            Comment = textAreaElement;

            var divElement       = document.createElement('DIV');
            divElement.className = 'estirar';

            var textElement = document.createElement('P');
            textElement.className = 'aclaracion';
            textElement.innerHTML = 'El correo llegará al destinatario firmado con tu nombre';

            var submitElement = document.createElement('INPUT');
            submitElement.className = 'enviar';
            submitElement.type = 'submit';
            submitElement.value = 'Enviar';
            submitElement.onclick = function() {
                if ( Address.value == '' )
                    return false;

                sendData();
                return false;
            }

            divElement.appendChild(textElement);
            divElement.appendChild(submitElement);


            fieldsetElement.appendChild(legendElement);
            fieldsetElement.appendChild(labelElement);
            fieldsetElement.appendChild(inputElement);
            fieldsetElement.appendChild(labelCommentElement);
            fieldsetElement.appendChild(textAreaElement);
            fieldsetElement.appendChild(divElement);

            formElement.appendChild(fieldsetElement);

            SendForm = formElement;
        }

        return true;

    } // createSendForm

    function createReturnElements() {
        if ( ! Ok ) {
            var okElement = document.createElement('P');
            okElement.className = 'ok';
            okElement.innerHTML = 'Tu correo se ha enviado correctamente';

            Ok = okElement;
        }

        if ( ! Error ) {
            var errorElement = document.createElement('P');
            errorElement.className = 'error';

            Error = errorElement;
        }

        return true;
    } // createReturnElements


    function initialize() {

        if ( Header )
            if ( Header.parentNode )
                Header.parentNode.removeChild(Header);

        createHeader();


        if ( SendForm )
            if ( SendForm.parentNode )
                SendForm.parentNode.removeChild(SendForm);

        if ( Greeting )
            if ( Greeting.parentNode )
                Greeting.parentNode.removeChild(Greeting);

        createSendForm();


        if ( Ok )
            if ( Ok.parentNode )
                Ok.parentNode.removeChild(Ok);

        if ( Error )
            if ( Error.parentNode )
                Error.parentNode.removeChild(Error);

        createReturnElements();

        Address.value = '';
        Comment.value = '';

        Div.innerHTML = '';
        Div.appendChild ( Header );
        Div.appendChild ( Greeting );
        Div.appendChild ( SendForm );

    } // initialize

    /* Code */

    if ( User ) {
        Button.onclick = function() {
            initialize()
            Div.style.display = 'block';
            Address.focus();
        }
    } else {
        Button.onclick = function() {
            if (Div != null)
            {
                Div.innerHTML = '<div class="encabezado estirar"><a href="javascript:void(0);">Enviar noticia por correo electrónico</a><a title="Cerrar" class="cerrar" href="javascript:void(0);" onclick="javascript:this.parentNode.parentNode.style.display = \'none\'; this.parentNode.parentNode.innerHTML=\'\';"></a></div><p class="error">Tienes que estar registrado en Caracol Radio y haber iniciado sesión para poder enviar por correo electrónico</p>';
                Div.style.display = 'block';
            }
        }
    }
}

function generarContadorFacebook(url, countDiv) {

    $.getJSON('https://graph.facebook.com/?id='+url+'&fields=share', function(data) {
        if (typeof data == 'undefined' || typeof data.share == 'undefined' || typeof data.share.share_count == 'undefined') {
            return;
        }

        countDiv.find('.fbCount').remove();
        countDiv.append('<span class="fbCount">' + data.share.share_count + '</span>');
    })

        .fail(function() {
            //countDiv.text('0');
            return;
        });
}

function generarBanner(h, i) {

    if (typeof h == 'object') {

        var ps = document.querySelectorAll(h.sel),
            el, pos = h.pos,
            min = h.min,
            axm = PBS.axm,
            sh = 0,
            tel, tds;

        if (ps && ps.length && ps.length > 0) {

            for (el in pos) {

                tds = ps[pos[el][0] - 1];
                cls = (sh != 0) ? 'publi_luto_horizontal no-visible' : 'publi_luto_horizontal';

                if (tds || min > sh) {

                    tel = axm.h.el("div", {
                        "id": 'caracol_gpt-' + el.toUpperCase() + '_' + i,
                        "class": cls
                    });

                    tds && tds.parentNode.insertBefore(tel, tds.nextSibling) || ps[ps.length - 1].parentNode.appendChild(tel);

                }

                sh++;

                PBS.axm.h.slr([{
                    d: 'caracol_gpt-' + el.toUpperCase() + '_' + i,
                    p: el,
                    s: pos[el][1]
                }], '', gtpadunit);

            }

        }

        return true;

    }

    var d = 'caracol_gpt-' + h + '_' + i;
    var p = h.toLowerCase();

    p = (p == 'natad1') ? 'natAd1' : p;

    if (p.indexOf('box') != -1) {

        var s = huecosPBS.boxd[p];

    } else {

        var s = huecosPBS[p];

    }

    if (typeof (gtpdivid) == "undefined" || typeof (PBS) == "undefined")
        return false;

    var cp = document.getElementById(d);
    if (typeof (cp) == "undefined" || cp == null)
        return false;

    PBS.axm.h.slr([{d:d,p:p,s:s}],'',gtpadunit);
}

function recargarBanners(h) {

    PBS.asym.refresh(h);
}

function enViewport(elemento) {

    var paginaTop = $(window).scrollTop();
    var paginaBottom = paginaTop + $(window).height();
    var elementoTop = $(elemento).offset().top;
    var elementoBottom = elementoTop + $(elemento).height();

    return elementoTop <= paginaBottom && elementoBottom >= paginaTop;
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

function generarWidgetOB(url) {
    url="http://caracol.com.co/programa/2018/03/22/dos_y_punto/1521754880_166342.html";
    var ob = $('.OUTBRAIN');

    ob.attr('data-src', url);

    if (typeof OBR == 'undefined') {

        $.getScript('http://widgets.outbrain.com/outbrain.js');

    } else {

        OBR.extern.researchWidget();

    }
}

function obtenerURLSFeed(url_feed, url_actual) {

    var urls = [];

    $.getJSON(url_feed, function(res) {

        $(res.items).each(function() {
            //Si es un album vertical o mosaico, hay que cambiar  la url
            if (seccion == 'album-01') {
                this.link = this.link.replace("/album/", "/album-01/");
            } else if (seccion == 'album-02') {
                this.link = this.link.replace("/album/", "/album-02/");
            }
            if(this.link != url_actual && /album/i.test(this.link) === false ) {
                urls.push(this.link);
            }

        });

    });

    return urls;
}

function cargarComentarios(id_comentarios) {

    $.getScript('/Comentarios/comentarios_js.html?ghi=' + id_comentarios + '&ghw=1&vCom=2&gjs=1&gcss=/estilos/v2.x/v2.0/src/eskup_comentarios_noticia.css&gll=1&gcid=lista-comentarios-' + id_comentarios + '-caja');
}

var scrollFn = debounce(function() {

    var noticias_scroll = $('.cnt-article:in-viewport');
    var noticia_actual = $(noticias_scroll[noticias_scroll.length-1]);

    var url = noticia_actual.data('url');
    var titulo = noticia_actual.data('titulo');
    var id_comentarios = noticia_actual.data('id_comentarios');
    var i = noticia_actual.attr('id').substring(8) || 0;
    var banners = [];
    var tags_ids = noticia_actual.data('tags-ids');

    if (url !== location.href.split('#')[0]) {

        //generarContadorEskup(id_comentarios, noticia_actual.find('.btn-comentarios'));
        generarContadorFacebook(url, noticia_actual.find('.btn-share.facebook'));

        if (noticia_actual.find('.lst-keywords li').length <= 4)
            noticia_actual.find('.lst-keywords > div').addClass('no-visible');

        // ACTUALIZACIÓN DE METAS PARA COMPARTIR EN RRSS
        $('meta[property="og:title"]').attr('content', noticia_actual.data('og-title'));
        $('meta[name="twitter:title"]').attr('content', noticia_actual.data('twitter-title'));
        $('meta[name="twitter:site"]').attr('content', noticia_actual.data('twitter-site'));





        history.replaceState('', titulo, url);
        document.title = titulo;

        // PUBLI Y MARCADO

        if (nueva_noticia) {

            marcarPagina(titulo, noticia_actual.data('og-title'), tags_ids, true, url, location.href.split('#')[0]);
            //omn_launchScroll();

            window.nueva_noticia = false;

            if (pbs_dimensiones.ancho >= 980) {

                generarBanner('LDB1', i);
                // generarBanner('BOX1', i);  JIRA 438 se solicita ocultarlos
                generarBanner('LDB2', i);
                // generarBanner('BOX2', i); JIRA 438 se solicita ocultarlos
                generarBanner('MPU1', i);
                generarBanner('MPU2', i);
                generarBanner('NATAD1', i);

            } else if (pbs_dimensiones.ancho >= 728) {

                generarBanner('LDB1', i);
                generarBanner('LDB2', i);

                biT = {
                    sel: '#noticia-' + i + ' .cuerpo  > p',
                    min: 2,
                    cls: 'publi_luto_horizontal',
                    pos: {
                        mpu1: [1,[[300,600],[300,250]]],
                    }
                };

                generarBanner(biT, i);

            } else {

                generarBanner('MLDB1', i);
                generarBanner('MLDB2', i);

                biT = {
                    sel: '#noticia-' + i + ' .cuerpo  > p',
                    min: 2,
                    cls: 'publi_luto_horizontal',
                    pos: {
                        mpu1: [1,[[300,600],[300,250]]],
                    }
                };

                generarBanner(biT, i);

            }

        } else {

            /*

            // TODO: Refactorizar esto para construir el array más eficientemente
            if (pbs_dimensiones.ancho > 728) {

                if (i == 0) {

                    banners.push('ldb1');
                    banners.push('box1');
                    banners.push('ldb2');
                    banners.push('box2');
                    banners.push('mpu1');
                    banners.push('mpu2');
                    banners.push('natAd1');

                } else {

                    banners.push('cadenaser_gpt_LDB1_' + i);
                    banners.push('cadenaser_gpt_BOX1_' + i);
                    banners.push('cadenaser_gpt_LDB2_' + i);
                    banners.push('cadenaser_gpt_BOX2_' + i);
                    banners.push('cadenaser_gpt_MPU1_' + i);
                    banners.push('cadenaser_gpt_MPU2_' + i);
                    banners.push('cadenaser_gpt_NATAD1_' + i);

                }

            } else {

                if (i == 0) {

                    banners.push('mldb1');
                    banners.push('mldb2');
                    banners.push('mpu1');
                    banners.push('mpu2');

                } else {

                    banners.push('cadenaser_gpt_MLDB1_' + i);
                    banners.push('cadenaser_gpt_MLDB2_' + i);
                    banners.push('cadenaser_gpt_MPU1_' + i);
                    banners.push('cadenaser_gpt_MPU2_' + i);

                }

            }

            recargarBanners(banners);

            */

        }

        window.nueva_noticia = false;

        return;

    }

}, 250);

function generarAmpliacionFotos() {

    var fotos_ampliar = $('figure span.ampliar');

    fotos_ampliar.each(function() {

        $(this).parent('.cnt-w-action').attr('data-featherlight', $(this).data('url'));

    });

}

function marcarPagina(titulo, titulo_og, tags_ids, scroll, loc, ref) {

    var location = document.createElement('a');
    location.href = loc;

    // Omniture
    scroll_i = scroll;
    s.list1 = tags_ids;
    s.pageName = s.siteID + location.pathname;
    s.pageURL = loc;
    s.channel = (portal == 'radio') ? seccion : portal;
    s.prop2 = (portal == 'radio') ? 'portal' : portal;
    s.prop13 = (portal == 'radio') ? 'caracol' : seccion;
    s.prop39 = (titulo_og) ? titulo_og.toLowerCase() : cadena_titulo_limpio;
    s.prop45 = titulo.toLowerCase();

    s.t();

    // Cxense
    var cX = window.cX || {};
    cX.callQueue = cX.callQueue || [];
    cX.callQueue.push(['initializePage']);
    cX.callQueue.push(['setSiteId', '1133932698121744059']);
    cX.callQueue.push(['setCustomParameters', {'pri-ajax': 'yes'}]);
    cX.callQueue.push(['sendPageViewEvent',{'location':loc, 'referrer':ref}]);

}

function avisoNotaAntigua()
{
    // adicionar div de noticia vieja
    //var strFechaNoticia = (document.querySelector("meta[name='DC.date']") ? document.querySelector("meta[name='DC.date']").getAttribute("content") : document.querySelector("meta[property='article:published_time']").getAttribute("content"));
    var strFechaNoticia = (document.querySelector("meta[name='DC.date']") ?
        document.querySelector("meta[name='DC.date']").getAttribute("content") :
        document.querySelector("meta[property='article:modified_time']").getAttribute("content").substring(0, 10));

    var fechaNoticia = new Date(strFechaNoticia.replace(/-/g,'/'));
    var fechaActual = new Date();
    //fechaActual.setYear(fechaActual.getFullYear() - 1 );
    //if (fechaActual > fechaNoticia) // si es una noticia vieja,
    //if (fechaActual < fechaNoticia) // quitar esta linea, reemplazarla por la de arriba
    if ((fechaActual.getTime()-fechaNoticia.getTime())>15552000000)
    {
        var obj = document.getElementsByClassName("nota_vieja");
        if(obj.length == 1)
        {
            obj[0].className="nota_vieja activa"
        }
    }
}


function guardarCookie(nombre, valor, dias) {

    var fecha = new Date();

    fecha.setDate(fecha.getDate() + dias);
    document.cookie = nombre + '=' + valor + '; path=/; expires=' + fecha.toGMTString();

}

function marcar_accion_webpush(accion) {

    if (typeof launch === 'function') {

        launch('29', accion,'event33');

    }

}


$(function() {

    avisoNotaAntigua();
    cargarDependencias();

    // INICIALIZACIÓN DE LA NOTICIA PRINCIPAL

    var url_base = 'http://' + location.host;
    var noti = 0;
    var url_actual = location.href.split('#')[0];
    var lista_tags = listado_id_tags || '';

    if (typeof pbs_dimensiones == 'undefined')
        var pbs_dimensiones = EPETBrowserDims();

    if (seccion == 'videos') {
        var url_feed = url_base + '/radio/datos_json/1/radio/ultimos_videos.js2';
    } else if (seccion == 'audios') {
        var url_feed = url_base + '/rss/tags/o_audio-f01.js';
    } else if (seccion == 'album-01' || seccion == 'album' || seccion == 'album-02') {
        //var url_feed = url_base + '/rss/tags/o_album-f01.js';
        //var url_feed = 'http://radio.des.caracol.pep.int:7080/pruebas/vane/o_album-f01.js';
        var url_feed = '';
    } else {
        //if (seccion=="regional"){
        var url_feed = (portal == 'radio') ? url_base + '/seccion/j/' + seccion : url_base + '/' + portal + '/j/' + seccion;
        //}else{
        //	var url_feed = "";
        //}
    }

    url_feed= "http://portal.des.caracol.pep.int:7080/radio/js/v2.x/v2.0/src/pruebajson.js";

    var urls_scroll = obtenerURLSFeed(url_feed, url_actual);
    window.nueva_noticia = false;

    //generarContadorEskup(ls_id_comentarios_noticia, $('#noticia .btn-comentarios'));  //en america no se usa eskup
    generarContadorFacebook(url_actual, $('#noticia .btn-share.facebook'));
    generarWidgetOB(url_actual); //outbrain no se utiliza en America
    generarAmpliacionFotos();

    if ($('.lst-keywords li').length <= 4)
        $('.lst-keywords > div').addClass('no-visible');

    if (((dispositivoMovil) ? 'mob' : 'web') != 'mob')
    // var epetMail = new EPETMail ( $('#noticia .btn-share.email')[0], $('#noticia .capa_enviar_correo')[0], nickname, url_actual );

        if (location.hash == '#bloque_comentarios') {

            $('body').addClass('ovhd');
            $('#caja-comentarios').show();
            //cargarComentarios(ls_id_comentarios_noticia);

        }

    $('#noticia').attr('data-url', url_actual.replace(/(#.+?)$/, '')).attr('data-titulo', document.title.replace(/"/g, '\"').replace(/'/g, "\'")).attr('data-id-comentarios', ls_id_comentarios_noticia).attr('data-tags-ids', lista_tags).attr('data-twitter-title', $('meta[name="twitter:title"]').attr('content')).attr('data-twitter-site', $('meta[name="twitter:site"]').attr('content')).attr('data-og-title', $('meta[name="og:title"]').attr('content'));

    if (pbs_dimensiones.ancho <= 980)
        $('aside.publicidad').remove();

    // BANNER SUPERIOR

    setTimeout(function() {
        var publi = $('#cabecera').prev('.cnt-publicidad');
        var cabecera = $('#cabecera');
        var alerta = $('.alerta');
        var alto_publi = publi.outerHeight();
        var alto_cabecera = cabecera.outerHeight();
        var alto_alerta = (alerta.length > 0) ? alerta.outerHeight() : 0;
        var offset = alto_cabecera + ($('#noticia').prevAll().outerHeight() || 0) + alto_alerta;
        var top = alto_cabecera + alto_publi;
        var contenedor_principal = $('main');

        $(window).on('scroll', function() {

            publi.addClass('fixed');

            if ($(document).scrollTop() >= offset) {

                publi.css({top: (offset - $(document).scrollTop())});

            } else {

                publi.css({top: 0});

            }

            if ((offset - $(document).scrollTop()) < -alto_publi) {

                cabecera.addClass('fixed').css({marginTop:0});
                contenedor_principal.css({marginTop:top});

            } else {

                cabecera.removeClass('fixed').css({marginTop: alto_publi});
                contenedor_principal.css({marginTop:0});

            }

        });

        if ($(document).scrollTop()) {

            cabecera.addClass('fixed').css({marginTop: 0});
            publi.css({top: (offset - $(document).scrollTop())});

        }

    }, 4000);
    // EVENTO SCROLL

    $(window).on('scroll', function() {

        scrollFn();

        if ($(document).scrollTop() > 99) {

            $('#cabecera').addClass('fixed');
            $('.cnt-subir').removeClass('no-visible');

        } else {

            $('#cabecera').removeClass('fixed');
            $('.cnt-subir').addClass('no-visible');

        }

        // Descomentar la siguiente línea para deshabilitar el scroll infinito
        //return;

        if ($(window).scrollTop() >= $(document).height() - ($(window).height() + 400) && urls_scroll.length > 0) {
            //lo siguiente es para forzar el cargue de admotion y sutarget en cada elemento del scroll infinito
            $('#co_caracolradio_caracolradio_300x600').attr('id','co_caracolradio_caracolradio_300x600_X');
            $('#59a466257fa8f0000430996b').attr('id','59a466257fa8f0000430996b_X');
            $('#insertAdSpaceBeforeThis_0000000162e8bc15').attr('id','insertAdSpaceBeforeThis_0000000162e8bc15_X');

            $.ajax({
                url: urls_scroll[0],
                method: 'GET',
                dataType: 'html',
                async: false,
                beforeSend: function() {

                    $('.cnt-modulo.loading img').css({opacity:1});

                    urls_scroll.shift();

                },
                success: function(res, textStatus, jqXHR) {

                    var titulo_noticia = $(res).filter('title').text();
                    var contenido_noticia = $(res).find('#noticia');
                    var id_comentarios = contenido_noticia.find('div[data-id-comentarios]').data('id-comentarios');
                    var tags_ids = $(res).filter('meta[name="tagsData:ids"]').attr('content');
                    var twitter_title = $(res).filter('meta[name="twitter:title"]').attr('content');
                    var twitter_site = $(res).filter('meta[name="twitter:site"]').attr('content');
                    var og_title = $(res).filter('meta[property="og:title"]').attr('content');

                    if(dispositivoMovil) {
                        $(contenido_noticia).find('.lo_que_hay_que_oir').parent().html("").css({'border-bottom': 'none', 'margin': 0});
                    }

                    if (typeof contenido_noticia.html() != 'undefined') {

                        // INICIALIZACIÓN

                        noti++;

                        var noticia_scroll = $('<div id="noticia-' + noti + '" class="cnt-article1 cnt-article estirar" data-url="' + this.url + '" data-titulo="' + titulo_noticia.replace(/"/g, '&quot;').replace(/'/g, '&apos;') + '" data-id-comentarios="' + id_comentarios + '" data-tags-ids="' + tags_ids + '" data-twitter-title="' + twitter_title.replace(/"/g, '&quot;').replace(/'/g, '&apos;')  + '" data-twitter-site="' + twitter_site + '" data-og-title="' + og_title.replace(/"/g, '&quot;').replace(/'/g, '&apos;') + '">' + contenido_noticia.html() + '</div>');
                        //var noticia_scroll = $('<div id="noticia-' + noti + '" class="cnt-article estirar" data-url="' + this.url + '" data-titulo="' + titulo_noticia.replace(/"/g, '&quot;').replace(/'/g, '&apos;') + '" data-id-comentarios="' + id_comentarios + '" data-tags-ids="' + tags_ids + '" data-twitter-title="' + twitter_title.replace(/"/g, '&quot;').replace(/'/g, '&apos;') + '" data-twitter-site="' + twitter_site + '" data-og-title="' + og_title.replace(/"/g, '&quot;').replace(/'/g, '&apos;') + '">' + contenido_noticia.html() + '</div>');

                        //generarContadorEskup(id_comentarios, $(noticia_scroll).find('.btn-comentarios'));
                        generarContadorFacebook(url_actual, $(noticia_scroll).find('.btn-share.facebook'));
                        generarWidgetOB(url_actual);

                        if (pbs_dimensiones.ancho <= 768) {
                            //se comenta para desactivar el botón "Seguir leyendo"
                            /*noticia_scroll.find('.cuerpo').children().addClass('no-visible');
                            noticia_scroll.find('.cnt-body :first-child').removeClass('no-visible');
                            noticia_scroll.find('.cnt-body .cnt-seguir-leyendo').removeClass('no-visible');*/

                        }

                        var banner_superior = (((dispositivoMovil) ? 'mob' : 'web') == 'web') ? '<div id="caracol_gpt-LDB1_' + noti + '"></div><div id="caracol_gpt-BOX1_' + noti + '"></div>' : '<div id="caracol_gpt-MLDB1_' + noti + '"></div>';
                        noticia_scroll.prepend('<aside class="cnt-publicidad estirar"><div>' + banner_superior + '</div></aside>');

                        noticia_scroll.find('#caracol_gpt-LDB2').attr('id', 'caracol_gpt-LDB2_' + noti).empty();
                        noticia_scroll.find('#caracol_gpt-BOX2').attr('id', 'caracol_gpt-BOX2_' + noti).empty();
                        noticia_scroll.find('#caracol_gpt-MLDB2').attr('id', 'caracol_gpt-MLDB2_' + noti).empty();
                        noticia_scroll.find('#caracol_gpt-MPU1').attr('id', 'caracol_gpt-MPU1_' + noti).empty();
                        noticia_scroll.find('#caracol_gpt-MPU2').attr('id', 'caracol_gpt-MPU2_' + noti).empty();
                        noticia_scroll.find('#caracol_gpt-NATAD1').attr('id', 'caracol_gpt-NATAD1_' + noti).empty();

                        if (pbs_dimensiones.ancho <= 980)
                            noticia_scroll.find('aside.publicidad').remove();

                        // VISUALIZACIÓN

                        $('main').append(noticia_scroll);
                        $('.cnt-modulo.loading:first').clone().appendTo('main');

                        /*  Descomentar si metemos scroll infinito en fotogalerias
                                                if (seccion == 'album' && typeof timeFG != 'undefined') {
                                                    $(res).filter('script[id="js_fotogaleria"]').each(function(){
                                                        $.globalEval(this.text || this.textContent || this.innerHTML || ''); });
                                                    indiceFoto = indice_paginacion = 0;
                                                    timeFG = playFotogaleria($('#noticia-' + noti + ' .cnt-fotogaleria'));
                                                }
                        */
                        if (((dispositivoMovil) ? 'mob' : 'web') != 'mob') {

                            delete epetMail;
                            // var epetMail = new EPETMail ( noticia_scroll.find('.btn-share.email')[0], noticia_scroll.find('.capa_enviar_correo')[0], nickname, this.url );

                        }

                        if(typeof FB != 'undefined'){
                            FB.XFBML.parse(document.getElementById("#"+id_comentarios));
                        }

                        window.nueva_noticia = true;

                    } else {

                        urls_scroll.shift();
                        $('html, body').scrollTop($(document).height());

                    }

                },
                complete: function() {

                    $('.cnt-modulo.loading img').css({opacity:0});

                }
            });

        }

    });

    // EVENTOS DE BOTONES

    $('#btn-menu').click(function() {

        $('#cnt-menu').toggleClass('no-visible');

        $('#cnt-buscador').addClass('no-visible');
        $('#cnt-log-usuario').addClass('no-visible');

        $(this).toggleClass('active');

        if (pbs_dimensiones.ancho <= 768) {
            $('body').toggleClass('ovhd');

            if ($(document).scrollTop() <= 99) {

                $('#cabecera').toggleClass('fixed');

            }
        }

    });

    $('#btn-secciones').click(function(e) {

        e.preventDefault();
        $('#cnt-secciones').toggleClass('no-visible');

    });

    $('#btn-usuario').click(function(e) {

        e.preventDefault();
        $('#cnt-log-usuario').toggleClass('no-visible');
        $('body').toggleClass('ovhd');

    });

    $('.btn-cerrar-usuario').click(function(e) {

        e.preventDefault();
        $('#cnt-log-usuario').toggleClass('no-visible');
        $('body').toggleClass('ovhd');

    });

    $('#btn-buscador').click(function(e) {

        e.preventDefault();
        $('#cnt-buscador').toggleClass('no-visible');

    });

    $('#btn-cerrar-buscador').click(function(e) {

        e.preventDefault();
        $(this).parent().toggleClass('no-visible');

    });

    $('#btn-secciones-cabecera').click(function() {

        $(this).siblings('ul').toggleClass('no-visible');

    });

    $('main').on('click', '.btn-tags', function() {

        $(this).toggleClass('btn-abierto');
        if (pbs_dimensiones.ancho > 767) {
            $(this).closest('.lst-keywords').find('li:gt(3)').toggle();
        } else {
            $(this).closest('.lst-keywords').find('li:gt(1)').toggle();
        }
        if ($(this).text() == '+') {
            $(this).text('-');
        } else {
            $(this).text('+');
        }

    });

    $('main').on('click', '.btn-comentarios', function() {

        $('body').addClass('ovhd');

        $(this).closest('article').find('.cnt-comentarios').show();

        var id_comentarios = $(this).data('id-comentarios');

        cargarComentarios(id_comentarios);

    });

    $('main').on('click', '.btn-cerrar-comentarios', function() {

        $('body').removeClass('ovhd');

        $(this).closest('.cnt-comentarios').hide();

    });

    $('main').on('click', '#caja-comentarios', function(e) {

        if (e.target.style.display == 'block') {

            $('body').removeClass('ovhd');
            $(this).closest('.cnt-comentarios').hide();

        }

    });

    $('main').on('click', '.btn-seguir-leyendo', function() {

        $(this).parent().hide().siblings().removeClass('no-visible');

        biT = {
            sel: '#noticia-' + noti + ' .cuerpo  > p',
            min: 2,
            cls: 'publi_luto_horizontal',
            pos: {
                mpu2: [5,[300,250]]
            }
        };

        generarBanner(biT, noti);

    });

    $('main').on('click', '.btn-desplegar', function() {

        $(this).next().toggleClass('no-visible');

    })

    $('.cnt-subir').click(function(e) {

        $('html, body').animate({scrollTop: 0}, 1000);

    });

    $('main').on('click', '.btn-share', function(e) {

        e.preventDefault();

        var ssnn = $(this).data('ssnn');
        var c_url = location.href.split('#')[0];
        c_url = c_url.replace(/.html.*$/gi, ".html");
        c_url = c_url.replace(/\/album-\d+\//gi, "/album/");
        c_url = c_url.replace(/\/m\//gi, "/");
        var c_title = encodeURIComponent($('meta[property="og:title"]').attr('content'));
        var c_via = $('meta[name="twitter:site"]').attr('content').replace('@', '');

        switch (ssnn) {

            case 'facebook':
                EPETShare('https://www.facebook.com/sharer.php?u=' + c_url + '%3Fssm%3Dfb' + '&t=' + c_title);
                break;
            case 'twitter':
                //20171121 rdiaz he comentado lo siguiente por generar carácteres codificados inncesarios para las comillas dobles si fallan otras cosas habrá que reversar y probar otra cosa, de todas formas c_title ya ha pasado por encodeURIComponent
                //c_title = encodeURIComponent($('meta[name="twitter:title"]').attr('content'));
                EPETShare('https://twitter.com/share?url=' + c_url + '%3Fssm%3Dtw' + '&text=' + c_title +'&via=' + c_via);
                break;
            case 'linkedin':
                EPETShare('https://www.linkedin.com/shareArticle?url=' + c_url + '%3Fssm%3Dlinkedin' + '&title=' + c_title);
                break;
            case 'googleplus':
                EPETShare('https://plus.google.com/share?url=' + c_url + '%3Fssm%3Dgplus');
                break;
            case 'whatsapp':
                document.location.href='whatsapp://send?text=' + c_title + ' ' + c_url + '%3Fssm%3Dwhatsapp';
                break;
            case 'sms':
                document.location.href='sms:&body='+c_title+' '+c_url+'%3Fssm%3Dsms';
                break;
            case 'email':
                break;
            default:
                return;

        }

    });

    $('.subemisoras p').click(function() {

        $(this).siblings('ul').toggleClass('no-visible');

    });

});