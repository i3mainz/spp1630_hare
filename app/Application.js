"use strict";
/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */

 // global variables -> bad practice
 /*
SERVER_URL = "http://haefen.i3mainz.hs-mainz.de";  // login debugging
//var SERVER_URL = "";  // production
GEOSERVER_PATH = SERVER_URL + "/geoserver";
GEOSERVER_URL = GEOSERVER_PATH + "/SPP/wms?";  
PROXY_URL = SERVER_URL + "/GeojsonProxy/layer?";
*/

Ext.define('SppAppClassic.Application', {
    extend: 'Ext.app.Application',
    reference: "application",  // used to get the geoserverPath variable
    id: "appClass",
    name: "SppAppClassic",

    stores: [
        // TODO: add global / shared stores here
    ],

    views: [
        'SppAppClassic.view.login.Login',  // used in launch
        'SppAppClassic.view.main.Main'  // used in launch
    ],

    // not sure whats the difference between views and requires
    requires: [
        //"LayerStyles"
        //"SppAppClassic.view.login.Login",
        //"SppAppClassic.view.main.Main" 
    ],

    // for vars used throughout the application
    // access via "SppAppClassic.app.globals.wmsPath";
    globals: {
        serverPath: "http://haefen.i3mainz.hs-mainz.de",  // leave blank for production
        geoserverPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver",
        homePath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/web/",
        wmsPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/SPP/wms?",  // former GEOSERVER_URL
        proxyPath: "http://haefen.i3mainz.hs-mainz.de" + "/GeojsonProxy/layer?",
        loginPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_check",
        logoutPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_logout"
    },
    
    // used in Application.js and LoginController.js 
    // geoserverPath: "/geoserver";  // production path

    hasGeoServerLogin: function(username) {
        var isLoggedIn = false;
        var text;
        var engSuccessText = '<span class="username">Logged in as <span>' + username + '</span></span>';
        var deSuccessText = '<span class="username">Angemeldet als <span>' + username + '</span></span>';

        Ext.Ajax.request({
            //url: GEOSERVER_PATH + "/web/",
            url: SppAppClassic.app.globals.homePath,
            async: false,

            success: function(response) {                
                text = response.responseText;
                if (text.indexOf(engSuccessText) > -1 || text.indexOf(deSuccessText) > -1 ) {
                    isLoggedIn = true;
                } else {  // no welcome screen
                    isLoggedIn = false;
                }
            },

            failure: function() {
                console.log("AJAX Request Fail", "Contacting GeoServer failed! Server Down?");
                isLoggedIn = false;
            }
        });
        //console.log(username + " is logged in: " + isLoggedIn);
        return isLoggedIn;  // TODO: remove async, bad practice
    },

    launch: function () {
        // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var username;
        var isValidUser;
        //console.log(this.geoserverPath);
        /*
        * validate user. first check for cookie. if cookie exists and it is 
        * "Guest", he is a valid user. if the username is something other than Guest
        * then check if this username is still logged in geoserver. otherwise
        * the layers won't load and the user has to re-authorize!  
        */

        // loggedIn = localStorage.getItem("TutorialLoggedIn");
        username = Ext.util.Cookies.get("sppCookie");
        console.log("cookie: " + username);

        if (username) {
            if (username === "guest") {  // already logged in as guest
                isValidUser = true;

            } else {  // not a guest

                if (this.hasGeoServerLogin(username)) {  // has geoserver login
                    isValidUser = true;

                // still has cookie but geoserver session expired
                } else {  
                    console.log("GeoServer Session expired. Clearing cookie!");
                    Ext.util.Cookies.clear("sppCookie");
                }
            }

        } else {  // no cookie found
            isValidUser = false;
        }

        //console.log(Ext.util.Cookies.get("sppCookie"));
        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view

        Ext.create({
            // if loggedIn exists, launch app-main, else launch login
            xtype: isValidUser ? 'app-main' : 'login'
        });    
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
