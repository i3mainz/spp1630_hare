"use strict";
Ext.define("SppAppClassic.main.MapToolbar", {
    extend: "Ext.Toolbar",

    xtype: "maptoolbar",

    requires: [
        "Ext.button.Button"
    ],

    controller: "maptoolbar",

    defaults: {
        xtype: "button"
    },
    items: [
        {
            //text: "Zoom In",
            glyph: "xf00e@FontAwesome",
            handler: "zoomIn",
            tooltip: "Zoom In"
        },{
            //text: "Zoom Out",
            glyph: "xf010@FontAwesome",
            handler: "zoomOut",
            tooltip: "Zoom Out"
        },{
            //text: "Extend",
            glyph: "xf0b2@FontAwesome",
            handler: "onCenter",
            tooltip: "Zoom to Extend"
        },{
            reference: "filterButton",
            id: "filterButton", // used in FilterPanelController.js
            text: "Filters",
            glyph: "xf0b0@FontAwesome",
            disabled: true,  // unlocked dynamically
            enableToggle: true,
            pressed: false,
            tooltip: "Apply filters to spp layers",
            handler: "onToggleFilter"  // defined in controller
        }
    ],

    listeners: {
        beforerender: "unlockButtons"  // defined in controller
    }
});
