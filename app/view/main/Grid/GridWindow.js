"use strict";

Ext.define("SppAppClassic.view.main.GridWindow",{
    extend: "Ext.window.Window",
    xtype: "gridwindow",
    requires: [
        "SppAppClassic.view.main.FeatureGridPanel"
    ],
    title: "Feature Grid",
    width: 600,
    height: 400,
    //padding: "0 0 0 0",
    resizable: true,
    autoScroll: true,
    layout: "fit",
    constrain: true,  // prevents dragging out of browser window size
    items: [{xtype: "featuregridpanel"}]
});
