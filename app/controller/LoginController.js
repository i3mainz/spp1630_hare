"use strict";
Ext.define("SppAppClassic.LoginController", {
    extend: "Ext.app.ViewController",

    alias: "controller.login",  // use this to reference

    /**
     * username and password from the login form will be used to login
     * to the local geoserver isntance.
     * if login is successfull, main view will be created
     */
    onLoginClick: function() {
        //console.log("starting auth");

        //var me = this;
        var formData = me.lookupReference("loginform").getValues();

        this.login(formData.username, formData.password, function(response) {
            // is logged into spp
            if (this.isLoggedIntoGeoServer(response, formData.username)) {
                // also logged into geoserver with same username
                //console.log("logged in spp and geoserver!");
                //console.log(username + " logged in successfully!!!");

                // set local cookie -> used to display name in logout
                Ext.util.Cookies.set("sppCookie", username, new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 10))); // expires after 10 days

                // Remove Login Window
                this.getView().destroy();

                // Add the main view to the viewport
                Ext.create({
                    xtype: "app-main"
                });
            }

        }, function() {
            // failure
            console.log("login failed!");
        });
    },

    /*
     * send ajax post request to geoserver and locks/unlocks submit buttons.
     * requires callbacks to handle what will be executed on success and failure
     */
    login: function(username, password, success, failure) {
        //var me = this;
        var label;
        //console.log("trying to log in!!!");

        // update label
        Ext.getCmp("loginLabel").setValue("Validating...");

        // lock buttons
        //var loginButton = me.lookupReference("loginSubmitButton");
        //var guestButton = me.lookupReference("guestSubmitButton");
        var loginButton = Ext.getCmp('loginSubmitButton');
        var guestButton = Ext.getCmp('guestSubmitButton');

        loginButton.disable();
        guestButton.disable();

        // try to login
        Ext.Ajax.request({
            //url: SppAppClassic.app.globals.loginPath,
            url: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_check",
            method: "POST",
            withCredentials: true,
            useDefaultXhrHeader: false,

            params: {
                username: username,
                password: password
            },

            success: function(response) {
                Ext.getCmp("loginLabel").setValue("Success!");
                success(response);
            },

            failure: function(response) {
                Ext.getCmp("loginLabel").setValue("Failed!");

                // unlock buttons
                loginButton.enable();
                guestButton.enable();

                failure(response);
            }
        });
    },

    /*
    * checks geoservers' response text, determines if login was successfull
    * or not and calls functions accordingly.
    */
    isLoggedIntoGeoServer: function(response, username) {
        var me = this;
        var isLoggedIn = false;
        var text = response.responseText;
        //var gerFailText = "Ungültige Kombination von Benutzername und Kennwort.";
        var engFailText = "Invalid username/password combination.";

        var engSuccessText = "<span class='username'>Logged in as <span>" + username + "</span></span>.";

        if (text.indexOf(engFailText) === -1) {  // show logged in page
            isLoggedIn = true;
        }
        return isLoggedIn;
    },

    // same function in MainController
    logoutGeoServer: function() {
        Ext.Ajax.request({
            url: SppAppClassic.app.globals.logoutPath,
            success: function(response) {
                //Ext.Msg.alert("Success!!!!");
            },
            failure: function(response, request) {
                //Ext.Msg.alert("Failed!");
            }
        });
    },

    onGuestClick: function() {
        // clear cookies and geoserver login, just in case
        Ext.util.Cookies.clear("sppCookie");  // TODO: replace his with logout function
        this.logoutGeoServer();

        this.onLoginSuccess("guest");
    },

    onLoginSuccess: function(username) {
        console.log(username + " logged in successfully!!!");

        // Set the localStorage value to true
        //localStorage.setItem("TutorialLoggedIn", true);

        // set local cookie -> used to display name in logout
        Ext.util.Cookies.set("sppCookie", username, new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 10))); // expires after 10 days

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: "app-main"
        });
    },



    onHelpClick: function() {
        console.log("help click!");
        var me = this;

        var button = me.lookupReference("helpButton");

        var tip = Ext.create("Ext.tip.ToolTip", {
            html: "Login using your project's username/password or login " +
                  "as guest with limited data access and functionality"
        });
        tip.showBy(button);
    },

    onTextFieldChange: function() {
        var loginButton = Ext.getCmp("loginSubmitButton");
        var guestButton = Ext.getCmp("guestSubmitButton");

        if (loginButton.isDisabled()) {
            guestButton.enable();
        } else {
            guestButton.disable();
        }
    }
});
