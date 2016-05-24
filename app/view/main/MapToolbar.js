"use strict";
Ext.define("SppAppClassic.view.main.MapToolbar", {
    extend: "Ext.Toolbar",

    xtype: "maptoolbar",

    requires: [
        "Ext.button.Button"
    ],

    controller: "main",  // shares controller with MapPanel and mainPanel

    defaults: {
        xtype: "button"
    },

    initComponent: function () {

        Ext.apply(this, {
            items: [{
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
                tooltip: {
                    text: "Filters"
                    //anchor: 'top'
                },
                handler: "onToggleFilter"
            }/*,{
                id: "gridButton", // used in GridWindow.js
                text: "Grid",
                glyph: "xf0ce@FontAwesome",
                enableToggle: true,
                pressed: false,
                handler: "onGridClick"
            }*/
            /*{
                glyph: "xf013@FontAwesome",
                id: "settingsButton",
                disabled: true,  // unlocked dynamically
                enableToggle: true,
                tooltip: {
                    text: "Settings"
                    //anchor: 'top'
                },
                handler: "onToggleSettings"
            }*/
            ]
        });

        SppAppClassic.view.main.MapToolbar.superclass.initComponent.call(this);
    }
});
