if(location.host!="escuche.los40.com.co" && location.host!="envivo.los40.cl" && location.host!="play.los40.com" && location.host!="escucha.los40.com.mx"){
    console.log("entro por la regla cambio de estado distinta de colombia, chile, españa y mexico");
    return true;
}
else{
    console.log(location.host + "no ejecuta la orden pushstatechange");
    return false;
}