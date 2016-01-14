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

    /*
    onItemSelected: function (sender, record) {
        "use strict";
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        "use strict";
        if (choice === 'yes') {
            //
        }
    },
    */

    // needs to be done dynamically
    updateLogoutInfo: function() {
        //console.log("updating logout info!");
        var mainpanel = this.getView();
        mainpanel.addTool({
            xtype: "label",
            cls: "logoutLabel",  // css class
            text: "Logged in as " + Ext.util.Cookies.get("sppCookie") + ".",
            padding: "4 5 0 0"  // 4 top is to be in line with logout button
            //style  // used css formatting instead
        });
        mainpanel.addTool({
            xtype: "button",
            text: "Logout",
            align: "right",
            glyph: "xf08b@fontawesome",
            handler: "onClickLogout"
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

                // Remove Main View
                me.getView().destroy();

                // Add the Login Window
                Ext.create({
                    xtype: "login"
                });
            }
        });
    }
});
