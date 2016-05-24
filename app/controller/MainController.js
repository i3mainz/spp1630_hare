"use strict";

Ext.define("SppAppClassic.MainController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main",

    requires: [
        "Ext.button.Button",
        "SppAppClassic.view.login.Login",
        "SppAppClassic.view.main.InfoTabPanel",
        "AuthService",
        "OL3MapService"
    ],

    control: {
        "#": {
            afterrender: "updateLogoutInfo",
            beforedestroy: "onDestroy"
        }
    },

    // main functions
    updateLogoutInfo: function() {
        if (AuthService.isAuthenticated()) {  // double check, should always be the case
            var text = "Logged in as " + AuthService.getUser() + ".";
            Ext.getCmp("logoutButtonlabel").setText(text);
        }
    },

    onClickLogout: function() {
        var me = this;

        Ext.MessageBox.confirm("Logout", "Are you sure you want to logout?", function(btn) {
            if (btn === "yes") {

                AuthService.logout(function() {
                    // success
                    me.getView().destroy();  // onDestroy destroys everything else

                    // Add the Login Window
                    Ext.create({
                        xtype: "login"
                    });

                }, function() {
                    // failure
                    console.log("error when trying to logout!");
                });
            }
        });
    },

    onClickInfo: function() {
        var infoPanel = Ext.getCmp("infotabpanel");
        if (!infoPanel) {
            infoPanel = Ext.create({ xtype: "infotabpanel" });
        }
        infoPanel.show();
    },

    /*
     * clean up everything when main view gets destroyed
     */
    onDestroy: function() {
        var extWindow;
        console.log("destroy view!");
        // destroy all windows when main view gets destroyed
        // to prevent them from still being displayed on login view

        var extWindow = Ext.getCmp("filterPanel");
        if (extWindow) {
            extWindow.destroy();
        }
        extWindow = Ext.getCmp("gridWindow");
        if (extWindow) {
            extWindow.destroy();
        }
        extWindow = Ext.getCmp("popupWindow");
        if (extWindow) {
            extWindow.destroy();
        }

        extWindow = Ext.getCmp("mappanel");
        if (extWindow) {
            extWindow.destroy();
        }

        extWindow = Ext.getCmp("layerTree");
        if (extWindow) {
            console.log("destroy layertree");
            extWindow.destroy();
        }

        this.getView().destroy();
    }
});
