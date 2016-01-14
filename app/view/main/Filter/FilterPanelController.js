"use strict";

Ext.define("SppAppClassic.view.main.Filter.FilterPanelController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-filterpanel",

    onClose: function() {
        Ext.getCmp("filterButton").setPressed(false);  // not working
    }
});
