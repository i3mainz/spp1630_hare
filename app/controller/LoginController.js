"use strict";
Ext.define("SppAppClassic.LoginController", {
    extend: "Ext.app.ViewController",

    alias: "controller.login",  // use this to reference

    requires: [
        "AuthService",
        "SppAppClassic.view.main.InfoTabPanel"
    ],

    /**
     * username and password from the login form will be used to login
     * to the local geoserver isntance.
     * if login is successfull, main view will be created
     */
    onLoginClick: function() {
        var me = this;

        // get components
        var label = Ext.getCmp("loginLabel");
        var loginButton = Ext.getCmp('loginSubmitButton');
        var guestButton = Ext.getCmp('guestSubmitButton');
        var formData = this.lookupReference("loginform").getValues();

        // update label
        label.setValue("Validating...");

        // lock buttons to prevent additional clicks during validation
        loginButton.disable();
        guestButton.disable();

        AuthService.login(formData.username, formData.password, function() {
            // success
            me.initMainView();

        }, function() {
            // failure
            Ext.getCmp("loginLabel").setValue("Failed!");

            // unlock buttons
            loginButton.enable();
            guestButton.enable();

        });
    },

    onGuestClick: function() {
        // clear cookies and geoserver login, just in case
        //Ext.util.Cookies.clear("sppCookie");  // TODO: replace tis with logout function
        //this.logoutGeoServer();
        AuthService.setCookie("guest");

        this.initMainView();
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

    initMainView: function() {
        // update label
        Ext.getCmp("loginLabel").setValue("Success!");

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({xtype: "app-main"});

        // open news after login
        Ext.create({xtype: "infotabpanel"}).show();
    }
});
