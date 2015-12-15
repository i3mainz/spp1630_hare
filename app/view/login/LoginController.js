"use strict";
Ext.define('SppAppClassic.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    //gerText: "Ungültige Kombination von Benutzername und Kennwort.",
    //engText: "Invalid username/password combination.",

    onLoginClick: function() {
        console.log("starting auth");
        var me = this;
        var loginForm = me.lookupReference("loginform");
        var formData = loginForm.getValues();

        // disable all form items (fields + buttons) to prevent multiple requests 
        // and to provide user feedback
        loginForm.disable();

        // try to login
        Ext.Ajax.request({
            //url: "http://localhost:8080/geoserver/j_spring_security_check",
            url: "/geoserver/j_spring_security_check",
            method: "POST",
            withCredentials : true,
            useDefaultXhrHeader : false,

            params: {
                username: formData.username,
                password: formData.password
            },
            success: function(response) {
                me.checkGeoServerResponse(response, formData.username);
            },

            failure: function(response, request) {
                console.log("AJAX request to GeoServer failed! Server Down?");
                Ext.Msg.alert("AJAX request to GeoServer failed! Server Down?");
                loginForm.enable();
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
        var gerFailText = "Ungültige Kombination von Benutzername und Kennwort.";
        var engFailText = "Invalid username/password combination.";

        var engSuccessText = "<span class='username'>Logged in as <span>" + username + "</span></span>.";

        console.log(text.indexOf(engFailText));
        if (text.indexOf(engFailText) > -1) {  // login failed
            me.onLoginFail();
        } else {
            me.onLoginSuccess(username);
        }
    },

    onLoginFail: function() {
        console.log("login failed!!!");

        // unblock form 
        var me = this;
        var loginForm = me.lookupReference("loginform");
        loginForm.enable();

        // display error message
        
        // create displayField for error message if it doesnt already exist
        var loginMessageField = me.lookupReference("loginMessageField");
        if (loginMessageField) {
            loginMessageField.setValue("Login failed!");
        } else {
            loginForm.add({
                xtype: "displayfield",
                reference: "loginMessageField",
                hideEmptyLabel: true,
                //cls: "errorField",
                value: "Login failed!"
            });
            loginMessageField = me.lookupReference("loginMessageField");
            loginMessageField.setValue("Login failed!");
        }
    },

    onGuestClick: function() {
        this.onLoginSuccess("Guest");
    },

    onLoginSuccess: function(username) {
        console.log(username + " logged in successfully!!!");

        // Set the localStorage value to true
        localStorage.setItem("TutorialLoggedIn", true);

        // set local cookie -> used to display name in logout
        Ext.util.Cookies.set("sppCookie", username, new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 10))); // expires after 10 days

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
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
    }
});
