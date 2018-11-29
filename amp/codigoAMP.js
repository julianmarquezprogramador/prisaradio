
var pageName= "${base}?AQB=1&vid=CLIENT_ID(amp_id)&" +
              "pageName=${canonicalPath}&" +
              "v3=D=pageName&c6=${documentReferrer}&" +
              "v63=${documentReferrer}&c5=${canonicalUrl}&" +
              "v10=${canonicalUrl}&" +
              "c17=AMP&" +
              "v17=AMP&" +
              "c18=prisa&" +
              "v18=D=c18&" +
              "c19=${product}&" +
              "v19=D=c19&" +
              "c20=${canonicalHost}&" +
              "v20=D=c20&" +
              "c30=radio&" +
              "v30=D=c30&" +
              "c39=${title}&" +
              "v39=D=c39&" +
              "c45=${title}&" +
              "v45=D=c45&" +
              "c57=D=User-Agent&v57=D=User-Agent&j=amp&" +
              "AQE=1"
<script type="application/json">
    {
        "transport":
            {"xhrpost": false, "beacon": true},
        "requests": {
            "base": "https://${trackingServer}/b/ss/${accounts}/1/AMP-0.1/s${random}",
            "pageView": "${base}?AQB=1&vid=CLIENT_ID(amp_id)&pageName=${canonicalPath}&v3=D=pageName&c6=${documentReferrer}&v63=${documentReferrer}&c5=${canonicalUrl}&v10=${canonicalUrl}&c17=AMP&v17=AMP&c18=prisa&v18=D=c18&c19=${product}&v19=D=c19&c20=${canonicalHost}&v20=D=c20&c30=radio&v30=D=c30&c39=${title}&v39=D=c39&c45=${title}&v45=D=c45&c57=D=User-Agent&v57=D=User-Agent&j=amp&AQE=1",
            "share": "${base}?AQB=1&vid=CLIENT_ID(amp_id)&pageName=${canonicalPath}&v3=D=pageName&c6=${documentReferrer}&v63=${documentReferrer}&c5=${canonicalUrl}&v10=${canonicalUrl}&c17=AMP&v17=AMP&c18=prisa&v18=D=c18&c19=${product}&v19=D=c19&c20=${canonicalHost}&v20=D=c20&c30=radio&v30=D=c30&c39=${title}&v39=D=c39&c45=${title}&v45=D=c45&c57=D=User-Agent&v57=D=User-Agent&j=amp&pe=lnk_o&v69=${eVar69}&events=${events}&AQE=1"
        },
        "vars": {
            "trackingServer": "prisacom.112.2o7.net",
            "accounts": "prisacomurcocaracol",
            "product": "caracol"
        },
        "triggers": {
            "pageLoad": {
                "on": "visible",
                "request": "pageView"
            },
            "click_tw": {
                "on": "click",
                "selector": "a.boton_twitter",
                "request": "share",
                "vars": {
                    "eVar69": "twitter",
                    "events": "event69"
                }
            },
            "click_wh": {
                "on": "click",
                "selector": "a.boton_whatsapp",
                "request": "share",
                "vars": {
                    "eVar69": "whatsapp",
                    "events": "event69"
                }
            },
            "click_fb": {
                "on": "click",
                "selector": "a.boton_facebook",
                "request": "share",
                "vars": {
                    "eVar69": "facebook",
                    "events": "event69"
                }
            }

        }
    }
    </script>