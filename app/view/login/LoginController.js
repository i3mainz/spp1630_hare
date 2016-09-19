"use strict";
Ext.define("SppAppClassic.LoginController", {
    extend: "Ext.app.ViewController",

    alias: "controller.login",  // use this to reference

    requires: [
        "AuthService",
        "SppAppClassic.view.main.NewsPanel"
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
        //var guestButton = Ext.getCmp('guestSubmitButton');
        var formData = {
            username: Ext.getCmp('usernameField').getValue(),
            password: Ext.getCmp('passwordField').getValue()
        };

        // lock buttons to prevent additional clicks during validation
        loginButton.disable();

        // production
        AuthService.login(formData.username, formData.password, function success() {
            me.initMainView();

        }, function error(errorMessage) {
            Ext.getCmp("passwordField").setActiveError(errorMessage);
            loginButton.enable();
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
        //var guestButton = Ext.getCmp("guestSubmitButton");
        if (Ext.getCmp("passwordField").getValue().length > 0 && Ext.getCmp("usernameField").getValue().length > 0) {
            loginButton.enable();
        } else {
            loginButton.disable();
        }
    },

    initMainView: function() {
        // update label
        //Ext.getCmp("loginLabel").setValue("Success!");

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({xtype: "app-main"});

        // open news after login
        Ext.create({xtype: "infotabpanel"}).show();
    }
});
