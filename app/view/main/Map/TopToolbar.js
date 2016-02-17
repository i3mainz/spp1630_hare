"use strict";
Ext.define("SppAppClassic.view.main.map.TopToolbar", {
    extend: "Ext.Toolbar",

    xtype: "toptoolbar",

    requires: [
        "SppAppClassic.view.main.map.TopToolbarController",
        "Ext.button.Button"
    ],

    controller: "map-toolbar",

    defaults: {
        xtype: "button"
    },

    initComponent: function () {
        console.log("init toolbar...");

        Ext.apply(this, {
            items: [{
                text: "Zoom In",
                glyph: "xf00e@FontAwesome",
                handler: "zoomIn"
            },{
                text: "Zoom Out",
                glyph: "xf010@FontAwesome",
                handler: "zoomOut"
            },{
                text: "Extend",
                glyph: "xf0b2@FontAwesome",
                handler: "onCenter"
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
            },{
                id: "newsButton", // used in FilterPanelController.js
                text: "News",
                glyph: "xf1ea@FontAwesome",
                //enableToggle: true,
                //pressed: false,
                tooltip: {
                    text: "Show News"
                },
                handler: "onNewsClick"
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

        SppAppClassic.view.main.map.TopToolbar.superclass.initComponent.call(this);
    }
});
