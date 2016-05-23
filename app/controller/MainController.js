"use strict";
/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define("SppAppClassic.MainController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main",

    requires: [
        "Ext.button.Button",
        "SppAppClassic.view.login.Login",
        "SppAppClassic.view.main.InfoPanel",
        "AuthService"
    ],

    control: {
        "#": {
            afterrender: "updateLogoutInfo"
        }
    },

    updateLogoutInfo: function() {
        if (AuthService.isAuthenticated()) {  // double check, should always be the case
            var text = "Logged in as " + AuthService.getUser() + ".";
            Ext.getCmp("logoutButtonlabel").setText(text);
        }
    },

    onClickLogout: function() {
        //this.application.fireEvent('logincomplete');
        var me = this;
        //this.getController("SppAppClassic.view.login.Login").newMethod();
        //SppAppClassic.app.getController("SppAppClassic.view.login.Login").newMethod();

        Ext.MessageBox.confirm("Logout", "Are you sure you want to logout?", function(btn) {
            if (btn === "yes") {

                AuthService.logout(function() {
                    // success
                    // destroy viewport. not sure how. use workaround for panels
                    var item = Ext.getCmp("filterPanel");
                    if (item) {
                        item.destroy();
                    }
                    item = Ext.getCmp("gridWindow");
                    if (item) {
                        item.destroy();
                    }
                    item = Ext.getCmp("popupWindow");
                    if (item) {
                        item.destroy();
                    }

                    // destroy ol3map
                    //Ext.getCmp("geoextMap").destroy();
                    //Ext.getCmp("geoextMap").setMap(false);
                    // view gets destroyed correctly, but store is still active
                    //Ext.getCmp("SppAppClassic.store.Layers").setMap(false);

                    //var store = Ext.data.StoreManager.lookup("treeStore");
                    //store.removeAll();

                    console.log("done!");
                    me.getView().destroy();

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
        var infoPanel = Ext.getCmp("infopanel");
        if (!infoPanel) {
            infoPanel = Ext.create("SppAppClassic.view.main.InfoPanel");
        }
        infoPanel.show();
    }
});
