"use strict";
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

 var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
    layerGroup: olMap.getLayerGroup()
    //layerGroup: Ext.getCmp("geoextMap").map.getLayerGroup()
    //layerGroup: OL3Map.map.getLayerGroup()
});

Ext.define("SppAppClassic.view.main.Main", {
    extend: "Ext.panel.Panel",
    xtype: "app-main",
    reference: "mainpanel",  // used in MainController
    id: "mainPanel",
    requires: [
        "Ext.plugin.Viewport",              // plugins: "viewport"
        "Ext.window.MessageBox",
        "SppAppClassic.view.main.Map",      // xtype: "mappanel"
        //"SppAppClassic.view.main.Popup",    // xtype: "popup"
        
        "GeoExt.data.store.LayersTree",
        "SppAppClassic.view.main.LayerTree"  // xtype: "layertree",
    ],

    controller: "main",
    viewModel: "main",
    plugins: "viewport",  // fullscreen

    title: "SPP Virtual Research Environment",

    layout: {
        type: "border",
        padding: 5
    },
    border: true,
    items: [
        {
            xtype: "layertree",
            region: "west",
            store: treeStore
        },{
            xtype: "mappanel",
            region: "center"
        }/*,{
            xtype: "popup",  // create hidden window to use as popup later
            id: "popupWindow"  // used to reference and fill it in Map.js
        }*/
    ],
    listeners: {
        afterrender: "updateLogoutInfo"
    }
});
