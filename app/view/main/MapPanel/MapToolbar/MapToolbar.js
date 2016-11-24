"use strict";
Ext.define("SppAppClassic.main.MapToolbar", {
    extend: "Ext.Toolbar",
    xtype: "app-mapToolbar",

    requires: [
        "Ext.button.Button"
    ],
    controller: "maptoolbar",

    defaults: {
        xtype: "button"
    },
    items: [
        {
            glyph: "xf00e@FontAwesome",
            handler: "zoomIn",
            tooltip: "Zoom In"
        },{
            glyph: "xf010@FontAwesome",
            handler: "zoomOut",
            tooltip: "Zoom Out"
        },{
            glyph: "xf0b2@FontAwesome",
            handler: "onCenter",
            tooltip: "Zoom to Extend"
        }
    ]
});
