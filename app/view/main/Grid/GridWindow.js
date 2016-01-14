"use strict";

Ext.define("SppAppClassic.view.main.GridWindow",{
    extend: "Ext.window.Window",
    xtype: "gridwindow",
    requires: [
        "SppAppClassic.view.main.GridPanel"
    ],
    title: "Feature Grid",
    width: 600,
    height: 400,
    //padding: "0 0 0 0",
    resizable: true,

    autoScroll: true,
    //hideable: true,
    layout: "fit",

    //hidden: true,  // hide on creation  -> not sure if that works
    //collapsible: true,
    constrain: true,  // prevents dragging out of browser window size

    // assign hide to close-button
    //closeAction: 'hide',
    /*
    close: function() {
        //console.log("just faking close! hiding instead!");
        this.hide();
    },
    */
    items: [{xtype: "gridpanel"}]
});
