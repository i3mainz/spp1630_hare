"use strict";

Ext.define("SppAppClassic.view.main.map.Map", {
    extend: "Ext.panel.Panel",

    xtype: "mappanel",

    requires: [
        "SppAppClassic.view.main.map.TopToolbar",  // xtype: "maptoolbar"
        "SppAppClassic.view.main.map.GeoExtMap" // xtype: "geoextmap"
    ],

    //controller: "main-map",

    layout: "border",
    title: "Map",

    initComponent: function () {
        console.log("init mappanel");
        // good practice to add non-primivite variables
        // using initComponent
        Ext.apply(this, {
            items: {
                xtype: "geoextmap",
                region: "center",
                id: "geoextMap"
            },
            dockedItems: {
                xtype: "toptoolbar"
            }
        });

        SppAppClassic.view.main.map.Map.superclass.initComponent.call(this);
    },

    listeners: {
        render: function(panel) {
            // add custom click event
            panel.body.on("click", function(evt) {
                // add attribute pixel to event object like in OL3 click event
                // this way, the code in the click function works with
                // both, ExtJs and with direct Ol3 events
                evt.pixel = [evt.browserEvent.layerX, evt.browserEvent.layerY];
                // provide event as parameter, it is used later to get pixel
                Ext.getCmp("geoextMap").fireEvent("click", evt);
                //this.fireEvent("clickpanel");  // adds event to mappanel not this panel
            });

            // add custom event for mouse movement
            panel.body.on("pointermove", function(evt) {
                evt.pixel = [evt.browserEvent.layerX, evt.browserEvent.layerY];
                Ext.getCmp("geoextMap").fireEvent("pointermove", evt);
            });
        }
    }
});
