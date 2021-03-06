"use strict";

Ext.define("SppAppClassic.MainPanelController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main",

    requires: [
        "Ext.button.Button",
        "SppAppClassic.login.Login",
        "SppAppClassic.main.NewsPanel",
        "AuthService"
    ],

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

    onNewsClick: function() {
        var newsPanel = Ext.getCmp("infotabpanel");
        if (!newsPanel) {
            newsPanel = Ext.create({ xtype: "infotabpanel" });
        }
        newsPanel.show();
    },

    onImprintClick: function() {
      window.open('http://www.spp-haefen.de/de/impressum/');
    },

    /*
     * clean up everything when main view gets destroyed
     */
    onMainPanelDestroy: function() {
        var extWindow;
        //console.log("destroy view!");
        // destroy all windows when main view gets destroyed
        // to prevent them from still being displayed on login view

        extWindow = Ext.getCmp("popupWindow");
        if (extWindow) {
            extWindow.destroy();
        }
    }


});
