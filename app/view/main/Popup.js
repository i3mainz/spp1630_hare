"use strict";

Ext.define("SppAppClassic.view.main.Popup",{
    extend: "Ext.window.Window",
    xtype: "popup",  // alias
    requires: [
        "SppAppClassic.view.main.PopupController",
        "SppAppClassic.view.main.PopupModel"
    ],

    controller: "main-popup",
    viewModel: {
        type: "main-popup"
    },
    title: "Feature Info",
    closable: true,  // currently gets destroyed on close
    width: 200,
    height: 350,
    padding: "0 0 0 5",
    resizable: true,
    minWidth: 150,
    minHeight: 250,
    autoScroll: true,
    hideable: true,
    collapsible: true,
    constrain: true,  // prevents dragging out of browser window size

    // assign hide to close-button
    close: function() {
        //console.log("just faking close! hiding instead!");
        this.hide();
    },

    
    listeners: {
        //"close": "onClose",  // defined in PopupController
        //"hide": "onHide"
    }
});
