"use strict";

Ext.define("AuthService", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

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

    getUsername: function() {
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
});
