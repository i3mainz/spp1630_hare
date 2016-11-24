"use strict";

Ext.define("SppAppClassic.main.MapPanel", {
    extend: "Ext.panel.Panel",

    requires: [
        "ConfigService",
        "SppAppClassic.main.MapComponent",
        "SppAppClassic.main.MapToolbar"
    ],
    xtype: "app-map",

    title: ConfigService.texts.mapTitle,
    layout: "fit",
    items: {
        xtype: "app-mapcomp",
        id: "geoextMap"
    },
    dockedItems: {
        xtype: "app-mapToolbar",
        id: "maptoolbar"
    },
    listeners: {
        render: function(panel) {
            // add custom click event
            panel.body.on("click", function(evt) {
                // convert a click on the mappanel to a click on the ol3 map
                evt.pixel = [evt.browserEvent.layerX, evt.browserEvent.layerY];
                // provide event as parameter, it is used later to get pixel
                Ext.getCmp("geoextMap").fireEvent("click", evt);
            });
        }
    }
});
