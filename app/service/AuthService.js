"use strict";

Ext.define("AuthService", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    homePath: "/geoserver/web/",
    //loginPath: "http://localhost:3000/login",  // custom proxy
    loginPath: "/geoserver/j_spring_security_check",
    logoutPath: "/geoserver/j_spring_security_logout",

    /*
     * returns true when user is logged in wiht an account OR as a guest.
     * this uses an async request to the geoserver, so only use for logins and on the inital start
     * of the app. use "isAuthorized" for intermediate checks
     */
    isAuthenticated: function() {
        // TODO: also check if logged into GeoServer
        var username = this.getCookie();
        if (username) {
            //console.log("has cookie!");
            if (username === "guest") {
                 return true;
            } else {
                // check for geoserver login!
                /*this.checkIfLoggedIntoGeoServer(username, function() {
                    // success
                    return true;
                }, function() {
                    // failure
                    return false;
                });*/
                return true;
            }

        } else {
            // no cookie found
            console.log("has no cookie!");
            return false;
        }
    },

    /*
     * returns true when a user is logged in with username and password
     * TODO: add parameter to check if users project ID is valid for a certain
     * action
     */
    isAuthorized: function() {
        var username = Ext.util.Cookies.get("sppCookie");

        // production
        if (username && username !== "guest") {
            return true;
        } else {
            return false;
        }

        // development
        //return true;

        //TODO: check if also logged into geoserver, and if username is the same
    },

    getUser: function() {
       return Ext.util.Cookies.get("sppCookie");
    },

    /**
     * Gets the corresponding project ID for the currently logged in username
     */
    /*getUsernameProjectID: function() {
        var id;
        var projects = Projects.projectList;
        for (var key in projects) {
            var project = projects[key];
            if (Ext.util.Cookies.get("sppCookie") === key) {
                id = project.id;
            }
        }
        return id;
    }*/

    /*
     * send ajax post request to geoserver and locks/unlocks submit buttons.
     * requires callbacks to handle what will be executed on success and failure
     */
    login: function(username, password, success, failure) {
        var me = this;
        Ext.Ajax.request({
            url: me.loginPath,
            method: "POST",
            //withCredentials: true,
            //useDefaultXhrHeader: false,

            params: {
                username: username,
                password: password
            },

            success: function(response) {
                //console.log(username);
                me.setCookie(username);
                console.log(response.responseText);
                success(response);
            },

            failure: function(response) {
                me.clearCookie();
                failure(response);
            }
        });
    },

    logout: function(success, failure) {
        //Ext.util.Cookies.clear("sppCookie");
        var me = this;

        // when guest, just clear cookie. no geoserver request needed
        if (this.getUser("guest")) {
            this.clearCookie();
            success();
        } else {
            // send get request to j_spring_security_logout
            Ext.Ajax.request({
                url: me.logoutPath,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function(response) {
                    console.log("logout success!");
                    me.clearCookie();
                    success();
                },
                failure: function(response, request) {
                    //Ext.Msg.alert("Failed!");
                    console.log("logout failure!");
                    failure();
                }
            });
        }

    },

    /*
    * checks geoservers' response text, determines if login was successfull
    * or not and calls functions accordingly.
    */
    // TODO: replace this with an optimized checkIfLoggedIntoGeoServer() function
    /*hasSuccessGeoServerResponse: function(response, username) {
        //var me = this;
        var isLoggedIn = false;
        var text = response.responseText;
        //var gerFailText = "Ungültige Kombination von Benutzername und Kennwort.";
        var engSuccessText = "Logged in as " + username + ".";

        if (text.indexOf(engSuccessText) > -1) {  // show logged in page
            isLoggedIn = true;
        }
        return isLoggedIn;
    },*/

    getCookie: function() {
        return  Ext.util.Cookies.get("sppCookie");
    },

    setCookie: function(username) {
        // expires after 10 days
        Ext.util.Cookies.set("sppCookie", username, new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 10)), "/");
    },

    clearCookie: function() {
        Ext.util.Cookies.clear("sppCookie");
    },

    /*
     * calls the success function if user is logged into GeoServer with the correct username.
     * calls the failure callback when request fails (server down etc) or the username doesn't
     * fit the logged in user on the geoserver
     */
    checkIfLoggedIntoGeoServer: function(username, success, failure) {
        var engSuccessText = '<span class="username">Logged in as <span>' + username + '</span></span>';
        var deSuccessText = '<span class="username">Angemeldet als <span>' + username + '</span></span>';

        // get request to geoserver page to check if user is logged in
        Ext.Ajax.request({
            url: this.homePath,
            async: false,
            success: function(response) {
                //console.log(response.responseText.indexOf("Logged in as>"));
                //console.log(response.responseText);
                if (response.responseText.indexOf(engSuccessText) > -1 || response.responseText.indexOf(deSuccessText) > -1 ) {
                    console.log("already logged in!");
                    success();

                } else {  // no welcome screen
                    console.log("not logged in!");
                    failure();
                }
            },

            failure: function() {
                //console.log("AJAX Request Fail", "Contacting GeoServer failed! Server Down?");
                failure();
            }
        });
    },

});
