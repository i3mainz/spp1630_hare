"use strict";
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 */

Ext.define("SppAppClassic.view.main.Main", {
    extend: "Ext.panel.Panel",
    xtype: "app-main",
    reference: "mainpanel",  // used in MainController
    id: "mainpanel",
    requires: [
        "Ext.plugin.Viewport",              // plugins: "viewport"
        "SppAppClassic.view.main.LayerTree",  // xtype: "layertree",
        "SppAppClassic.view.main.MapToolbar",  // xtype: "maptoolbar"
        "GeoExt.component.Map", // xtype: "gx_component_map"
        "GeoExt.data.store.LayersTree",
        "OL3MapService",
    ],

    controller: "main",
    //viewModel: "main",

    plugins: "viewport",
    title: "SPP 1630 Virtual Research Environment",

    layout: {
        type: "border",
        padding: 5
    },
    border: true,

    initComponent: function () {

        // apply to layertree
        //this.setStore(treeStore);
        OL3MapService.initMap();  // TODO: set map in controller

        Ext.apply(this, {

            items: [{
                xtype: "layertree",
                region: "west",
                //store: treeStore,
                id: "layerTree" // used to set store later
            },{
                xtype: "panel",
                id: "mappanel",
                region: "center",
                title: "Map",
                layout: "fit", // map fills entire panel
                items: {
                    xtype: "gx_component_map",
                    map: OL3MapService.getMap(),
                    id: "geoextMap"
                },
                dockedItems: {
                    xtype: "maptoolbar",
                    id: "maptoolbar"
                }
            }],

            tools: [{
                xtype: "label",
                id: "infoLabel",
                glyph: "xf1ea@FontAwesome",
                html: "<a href='#'>Info</a>",
                style: {
                    color: "#696969",
                    "font-size": "13px",
                    "font-weight": "bold",
                    "margin-right": "10px"
                },
                listeners: {
                    element: "el", click: "onClickInfo"
                }
                //cls: "logoutLabel",  // css class
                //text: // gets added before render
                //padding: "4 5 0 0"  // 4 top is to be in line with logout button
                //style  // used css formatting instead
            },{
                xtype: "label",
                id: "logoutButtonlabel",
                style: {
                    color: "#696969",
                    "font-size": "13px",
                    "font-weight": "normal",
                    "margin-right": "5px"
                }
                //cls: "logoutLabel",  // css class
                //text: // gets added before render
                //padding: "4 5 0 0"  // 4 top is to be in line with logout button
                //style  // used css formatting instead
            },{
                //xtype: "button",
                xtype: "label",
                //text: "<a href='#'>Logout</a>",
                html: "<a href='#'>Logout</a>",
                align: "right",
                //glyph: "xf08b@fontawesome",
                style: {
                    color: "#696969",
                    "font-size": "13px",
                    "font-weight": "bold"
                },
                listeners: {
                    element: "el", click: "onClickLogout"
                }
                //handler: "onClickLogout"
            }]
        });


        this.getController().unlockButtons();


        SppAppClassic.view.main.Main.superclass.initComponent.call(this);
        //this.callParent();
    }

});
