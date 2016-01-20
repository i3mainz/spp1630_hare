"use strict";

Ext.define("SppAppClassic.view.main.Popup",{
    extend: "Ext.window.Window",
    xtype: "popup",
    id: "popupWindow",

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

    hidden: true,  // hide on creation  -> not sure if that works
    //collapsible: true,
    constrain: true,  // prevents dragging out of browser window size

    // assign hide to close-button
    closeAction: "hide"
});
