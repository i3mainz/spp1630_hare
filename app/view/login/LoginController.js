"use strict";
Ext.define('SppAppClassic.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    gerText: "Ungültige Kombination von Benutzername und Kennwort.",
    engText: "Invalid username/password combination.",

    geoserverLogin: function() {

        // temporarily disable buttons to prevent further
        // requests being sent
        //loginPanel.buttons[0].disable();

        // get form via var panel
        var form = loginPanel.getForm();

        //var mythis = this;
        if (form.isValid()) {
            var formData = form.getFieldValues();

            // The form will submit an AJAX request to this URL when submitted
            // it works!!!
            form.submit({
                method: "POST",
                url: "http://localhost:8080/geoserver/geoserver/j_spring_security_check",
                //headers: {"Content-Type": "application/x-www-form-urlencoded"},

                // login successfull (defined by errorreader in loginPanel)
                success: function(form, action) {
                    //Ext.Msg.alert('Success', action.result.msg);
                    console.log("login successfull!");
                    /*
                    // set "user" cookie to entered login username
                    // to remember that user has working JSESSION ID and remains
                    // authorized and shown next to login/logout button
                    //console.log("my custom cookie: " + $.cookie("geoexplorer-user"));
                    mythis.setCookieValue("geoexplorer-user", formData.username);
                    //console.log("my custom cookie after login: " + $.cookie("geoexplorer-user"));

                    // set role to "authorized"
                    mythis.setAuthorizedRoles(["ROLE_ADMINISTRATOR"]);
                    
                    // refresh layers - workaround -> fix!
                    console.log("refreshing layers!");
                    //mythis.activate();
                    location.reload();   

                    // replace "login"-button with "logout"-button and entered username
                    mythis.showLogoutButton(formData.username);

                    // close login window
                    win.close();
                    */
                },

                // login failed (defined by errorreader)
                failure: function(form, action) {
                    //Ext.Msg.alert('Failure', action.result.msg);
                    console.log("login failed!");
                    /*
                    mythis.deAuthorize();   // everything but unset authorizedroles
                    mythis.setAuthorizedRoles([]);   // works
                    // reactive buttons
                    loginPanel.buttons[0].enable(); */
                }
            });
        }

    },

    onLoginClick: function() {
        console.log("starting auth");
        var me = this;
        var formData = me.lookupReference("loginform").getValues();

        // try to login
        Ext.Ajax.request({
            url: "http://localhost:8080/geoserver/j_spring_security_check",
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
    },

    onLoginSuccess: function(username) {
        console.log(username + " logged in successfully!!!");

        // Set the localStorage value to true
        localStorage.setItem("TutorialLoggedIn", true);

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });
    }
});
