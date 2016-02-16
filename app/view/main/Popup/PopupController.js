"use strict";

Ext.define("SppAppClassic.view.main.Popup.PopupController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-popup",

    requires: [
        "SppAppClassic.view.main.Popup.Report"
    ],

    // define listeners here instead of the view.
    /*control: {
        "#": {
        }
    },*/

    onReportClick: function() {
        console.log("click report!");
        var reportPanel = Ext.create("SppAppClassic.view.main.Popup.Report");

        reportPanel.updateContent("12345", "test123");
        reportPanel.show();
    },

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
