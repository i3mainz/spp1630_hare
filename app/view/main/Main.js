"use strict";
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

 /*var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
    layerGroup: olMap.getLayerGroup()
    //layerGroup: Ext.getCmp("geoextMap").map.getLayerGroup()
    //layerGroup: OL3Map.map.getLayerGroup()
});*/

Ext.define("SppAppClassic.view.main.Main", {
    extend: "Ext.panel.Panel",
    xtype: "app-main",
    reference: "mainpanel",  // used in MainController
    id: "mainPanel",
    requires: [
        "Ext.plugin.Viewport",              // plugins: "viewport"
        "Ext.window.MessageBox",
        "SppAppClassic.view.main.map.Map",      // xtype: "mappanel"
        //"GeoExt.data.store.LayersTree",
        "SppAppClassic.view.main.LayerTree"  // xtype: "layertree",
    ],

    controller: "main",
    viewModel: "main",
    plugins: "viewport",  // fullscreen

    title: "SPP 1630 Virtual Research Environment",

    layout: {
        type: "border",
        padding: 5
    },
    border: true,

    initComponent: function () {
        console.log("init main panel");
        Ext.apply(this, {

            items: [{
                xtype: "layertree",
                region: "west",
                id: "layerTree" // used to set store later
            },{
                xtype: "mappanel",
                region: "center"
            }],

            tools: [{
                xtype: "label",
                id: "logoutButtonlabel",
                cls: "logoutLabel",  // css class
                //text: // gets added before render
                padding: "4 5 0 0"  // 4 top is to be in line with logout button
                //style  // used css formatting instead
            },{
                xtype: "button",
                text: "Logout",
                align: "right",
                glyph: "xf08b@fontawesome",
                handler: "onClickLogout"
            }]
        });

        SppAppClassic.view.main.Main.superclass.initComponent.call(this);
    }

});
