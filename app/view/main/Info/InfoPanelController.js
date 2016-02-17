"use strict";

Ext.define("SppAppClassic.view.main.Info.InfoPanelController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main-info",

    requires: [
        //"SppAppClassic.view.main.Info.InfoPanel"
    ],

    /*control: {
        "#": {
        }
    },*/

    onContinueClick: function() {
        this.getView().destroy();
    }
});
