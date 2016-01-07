"use strict";
/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */

Ext.define('SppAppClassic.Application', {
    extend: 'Ext.app.Application',
    reference: "application",  // used to get the geoserverPath variable
    name: 'SppAppClassic',

    stores: [
        // TODO: add global / shared stores here
    ],

    views: [
        'SppAppClassic.view.login.Login',  // used in launch
        'SppAppClassic.view.main.Main'  // used in launch
    ],
    
    // used in Application.js and LoginController.js 
    // geoserverPath: "/geoserver";  // production path
    // geoserverPath: "/geoserver";  // // local geoserver for debugging
    geoserverPath: "http://haefen.i3mainz.hs-mainz.de/geoserver",  // for login debugging

    hasGeoServerLogin: function(username) {
        var isLoggedIn = false;
        var text;
        var engSuccessText = '<span class="username">Logged in as <span>' + username + '</span></span>';
        var deSuccessText = '<span class="username">Angemeldet als <span>' + username + '</span></span>';

        Ext.Ajax.request({
            url: this.geoserverPath + "/web/",
            async: false,

            success: function(response) {
                //console.log("success!");
                
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
            if (username === "guest") {
                isValidUser = true;
            } else {  // not a guest
                if (this.hasGeoServerLogin(username)) {
                    isValidUser = true;
                } else {  // still has cookie but geoserver session expired
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
