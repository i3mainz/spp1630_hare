"use strict";

Ext.define("AuthService", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    loginPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_check",
    logoutPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_logout",

    /*
     * returns true when user is logged in wiht an account OR as a guest
     */
    isAuthenticated: function() {
        if (Ext.util.Cookies.get("sppCookie")) {
            console.log("authorized: true");
            return true;
        } else {
            console.log("authorized: false");
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
        if (username && username !== "guest") {
            console.log("authorized: true");
            return true;
        } else {
            console.log("authorized: false");
            return false;
        }

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
            //url: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_check",
            method: "POST",
            withCredentials: true,
            useDefaultXhrHeader: false,

            params: {
                username: username,
                password: password
            },

            success: function(response) {
                // correct username + password
                if (me.hasSuccessGeoServerResponse(response, username)) {
                    // is logged into geoserver
                    me.setCookie(username);
                    success(response);
                } else {
                    // logged into VRE but not GeoServer
                    me.clearCookie();
                    failure(response);
                }
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
        // send get request to j_spring_security_logout
        Ext.Ajax.request({
            url: me.logoutPath,
            success: function(response) {
                me.clearCookie();
                success();
            },
            failure: function(response, request) {
                //Ext.Msg.alert("Failed!");
                failure();
            }
        });
    },

    /*
    * checks geoservers' response text, determines if login was successfull
    * or not and calls functions accordingly.
    */
    hasSuccessGeoServerResponse: function(response, username) {
        //var me = this;
        var isLoggedIn = false;
        var text = response.responseText;
        //var gerFailText = "Ungültige Kombination von Benutzername und Kennwort.";
        var engFailText = "Invalid username/password combination.";

        //var engSuccessText = "<span class='username'>Logged in as <span>" + username + "</span></span>.";

        if (text.indexOf(engFailText) === -1) {  // show logged in page
            isLoggedIn = true;
        }
        return isLoggedIn;
    },

    setCookie: function(username) {
        // expires after 10 days
        Ext.util.Cookies.set("sppCookie", username, new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 10)));
    },

    clearCookie: function() {
        Ext.util.Cookies.clear("sppCookie");
    }
});
