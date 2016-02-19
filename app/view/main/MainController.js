"use strict";
/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define("SppAppClassic.view.main.MainController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main",

    requires: [
        "Ext.button.Button",
        "SppAppClassic.view.login.Login"
    ],

    control: {
        "#": {
            afterrender: "updateLogoutInfo"
            /*render:  function(panel) {
                panel.body.on("click", function() {
                    console.log("click on mainpanel!");
                });
            }*/
        }
    },

    updateLogoutInfo: function() {
        var text = "Logged in as " + Ext.util.Cookies.get("sppCookie") + ".";
        Ext.getCmp("logoutButtonlabel").setText(text);
    },

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

    // reverts code from LoginCOntroller.js
    onClickLogout: function() {
        var me = this;
        Ext.MessageBox.confirm("Logout", "Are you sure you want to logout?", function(btn) {
            if (btn === "yes") {
                console.log("logging out!");
                // Remove the localStorage key/value
                //localStorage.removeItem("TutorialLoggedIn");

                // clear local cookie
                Ext.util.Cookies.clear("sppCookie");

                // clear geoserver login
                me.logoutGeoServer();

                // destroy viewport. not sure how. use workaround for panels
                var filterPanel = Ext.getCmp("filterPanel");
                if (filterPanel) {
                    filterPanel.destroy();
                }
                var gridWindow = Ext.getCmp("gridWindow");
                if (gridWindow) {
                    gridWindow.destroy();
                }
                var popupWindow = Ext.getCmp("popupWindow");
                if (popupWindow) {
                    popupWindow.destroy();
                }

                // destroy ol3map
                //Ext.getCmp("geoextMap").destroy();

                console.log("done!");
                me.getView().destroy();

                // Add the Login Window
                Ext.create({
                    xtype: "login"
                });
            }
        });
    }
});
