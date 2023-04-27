class Ga4helper{
    constructor(propertyId, debug=false){
        this.propertyId = propertyId;
        this.debug = debug;

        // generate estimated cookie name from propertyId
        this.cookieName = '_ga_'+this.propertyId.replace('G-', '');
    }

    load(){
        // check script with id ga4helper_script exists
        if(document.getElementById('ga4helper_script')){
            if (this.debug) console.log("#ga4helper_script already exists");
            return;
        }
        // add script tag to document
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.id = 'ga4helper_script';
        script.src = 'https://www.googletagmanager.com/gtag/js?id='+this.propertyId;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', this.propertyId);
    }

    unload(){
        // remove script tag from document
        var script = document.getElementById('ga4helper_script');
        if(script){
            script.parentNode.removeChild(script);
            if (this.debug) console.log("#ga4helper_script removed");
        }

        // remove dataLayer
        delete window.dataLayer;

        // remove cookie
        this.bulkDeleteCookies();
    }

    bulkDeleteCookies(){
        this.deleteCookie(this.cookieName);
        this.deleteCookie('_ga');
        // delete twice to prevent regenerating cookie
        // (passing current object/class as ga4helper to setTimeout)
        var ga4helper = this;
        setTimeout(function () {
            ga4helper.deleteCookie(ga4helper.cookieName);
        }, 500);

    }

    deleteCookie(name, domain, path) {
        if(!domain || domain==""){
            domain = "." + window.location.hostname;
        }
        if(!path || path==""){
            path = "/";
        }
        document.cookie = name + '=; domain=' +  domain +'; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=' + path;
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        if (this.debug) console.log("cookie deleted: "+name);
    }
}