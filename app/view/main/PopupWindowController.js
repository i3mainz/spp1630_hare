"use strict";

Ext.define("SppAppClassic.view.main.PopupWindowController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-popup",

    // define listeners here instead of the view.
    /*control: {
        "#": {
        }
    },*/


    /**
     * unlocks buttons for registred authorized users
    */
    unlockButtons: function() {
        if (SppAppClassic.app.isAuthorized()) {
            var buttonList = ["filterButton", "gridButton", "settingsButton"];
            for (var i = 0; i < buttonList.length; i++) {
                var button = Ext.getCmp(buttonList[i]);
                if (button) {
                    button.enable();
                }
            }
        }
    }
});
