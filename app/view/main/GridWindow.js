"use strict";

Ext.define("SppAppClassic.view.main.GridWindow",{
    extend: "Ext.window.Window",

    xtype: "gridwindow",
    reference: "gridwindow",
    id: "gridWindow",

    requires: [
        "SppAppClassic.view.main.FeatureGridPanel"
    ],

    title: "Feature Grid",
    width: 600,
    height: 400,
    //padding: "0 0 0 0",
    resizable: true,
    autoScroll: true,
    closeAction: "hide",
    layout: "fit",
    constrain: true,  // prevents dragging out of browser window size

    initComponent: function () {
        //console.log("init gridpanel...");
        this.items = this.buildItems();
        SppAppClassic.view.main.GridWindow.superclass.initComponent.call(this);
    },

    buildItems: function () {
        return [{xtype: "featuregridpanel"}];
    },
    //items: []; // added on initCompoenent

    listeners: {
        close: function() {
            Ext.getCmp("gridButton").setPressed(false);
        }
    }
});
