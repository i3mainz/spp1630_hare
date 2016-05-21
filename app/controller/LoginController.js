"use strict";
Ext.define("SppAppClassic.LoginController", {
    extend: "Ext.app.ViewController",

    alias: "controller.login",  // use this to reference

    /*sendLoginRequest: function() {
        Ext.Ajax.request({
            url: SppAppClassic.app.globals.loginPath,
            method: "POST",
            withCredentials: true,
            useDefaultXhrHeader: false,

            params: {
                username: formData.username,
                password: formData.password
            },
            success: function(response) {
                //Ext.getCmp("loginLabel").setValue("Validating...");

                // validate
                me.checkGeoServerResponse(response, formData.username);
            },

            failure: function(response, request) {
                //console.log("AJAX request to GeoServer failed! Server Down?");
                Ext.Msg.alert("AJAX Request Fail", "Contacting GeoServer failed! Server Down?");

                // unlock buttons
                //loginForm.enable();  // unlocks entire form
                loginButton.enable();
                guestButton.enable();
            }
        });
    },*/

    //gerText: "Ungültige Kombination von Benutzername und Kennwort.",
    //engText: "Invalid username/password combination.",
    /**
     * type can be "user" or "guest". for guest, predefined credentials will be used
     */
    onLoginClick: function() {
        //console.log("starting auth");

        var me = this;
        var loginForm = me.lookupReference("loginform");
        var formData = loginForm.getValues();

        me.login(formData.username, formData.password, function(response) {
            // success
            me.checkGeoServerResponse(response, formData.username);
        }, function() {
            // failure

        });
    },

    /*
     * requires callbacks
     */
    login: function(username, password, success, failure) {
        var me = this;
        var label;
        console.log("runns!!!");

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
                //Ext.getCmp("loginLabel").setValue("Validating...");
                // validate
                //console.log("inside!");
                Ext.getCmp("loginLabel").setValue("Success!");
                success(response);
            },

            failure: function(response, request) {
                //console.log(response);
                //console.log("inside error!");
                //console.log("AJAX request to GeoServer failed! Server Down?");
                //Ext.Msg.alert("AJAX Request Fail", "Contacting GeoServer failed! Server Down?");
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
    checkGeoServerResponse: function(response, username) {
        var me = this;
        var text = response.responseText;
        //var gerFailText = "Ungültige Kombination von Benutzername und Kennwort.";
        var engFailText = "Invalid username/password combination.";

        var engSuccessText = "<span class='username'>Logged in as <span>" + username + "</span></span>.";

        if (text.indexOf(engFailText) > -1) {  // login failed
            me.onLoginFail();
        } else {
            //console.log(text.indexOf(engSuccessText));
            me.onLoginSuccess(username);
        }
    },

    onLoginFail: function() {

        Ext.getCmp("loginLabel").setValue("Login failed!");

        // unlock buttons
        this.lookupReference("loginSubmitButton").enable();
        this.lookupReference("guestSubmitButton").enable();

        //this.getView().fireEvent("loginfailed");

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
        Ext.util.Cookies.clear("sppCookie");
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
    },

    newMethod: function() {
        console.log("it works! :DDDD");
    }
});
