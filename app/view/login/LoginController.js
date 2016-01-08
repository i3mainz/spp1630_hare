"use strict";
Ext.define("SppAppClassic.view.login.LoginController", {
    extend: "Ext.app.ViewController",
    alias: "controller.login",

    //gerText: "Ungültige Kombination von Benutzername und Kennwort.",
    //engText: "Invalid username/password combination.",

    onLoginClick: function() {
        console.log("starting auth");
        var me = this;
        var loginForm = me.lookupReference("loginform");
        var formData = loginForm.getValues();

        // disable all form items (fields + buttons) to prevent multiple requests
        // and to provide user feedback
        //loginForm.disable();   // locks entire form
        var loginButton = me.lookupReference("loginSubmitButton");
        var guestButton = me.lookupReference("guestSubmitButton");
        loginButton.disable();
        guestButton.disable();

        // try to login
        Ext.Ajax.request({
            url: GEOSERVER_PATH + "/j_spring_security_check",
            method: "POST",
            withCredentials: true,
            useDefaultXhrHeader: false,

            params: {
                username: formData.username,
                password: formData.password
            },
            success: function(response) {
                me.showLoginFormMessage("Validating...", "info");

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

    /*
    * creates a displayfield in the loginForm if needed 
    * and displays an info or error message depending on the provided type.
    * type can be "info" (green) or "error" (red)
    */
    showLoginFormMessage: function(message, type) {
        var me;
        var style;
        var loginMessageField;

        me = this;
        if (type === "info") {
            style = {
                color: "#00b200",
                fontWeight: "bold"
                //text-align: "right"
            };
        } else if (type === "error") {
            style = {
                color: "#cc0000",
                fontWeight: "bold"
            };
        } else {
            console.log("unknown message type: " + type);
        }

        // create displayField if neccessary
        if (!me.lookupReference("loginMessageField")) {  // loginForm doesnt exist and needs to be created first
            me.lookupReference("loginform").add({
                xtype: "displayfield",
                reference: "loginMessageField",
                //value: "placeholder",
                hideEmptyLabel: false
                //padding: "0 0 0 30"
            });
        }
        loginMessageField = me.lookupReference("loginMessageField");
        loginMessageField.setStyle(style);  // currently not working
        loginMessageField.setValue(message);
        //loginMessageField.update();
    },

    onLoginFail: function() {

        this.showLoginFormMessage("Login failed!", "error");

        // unlock buttons
        this.lookupReference("loginSubmitButton").enable();
        this.lookupReference("guestSubmitButton").enable();
    },

    onGuestClick: function() {
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
    }
});
