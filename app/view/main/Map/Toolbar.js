"use strict";
Ext.define("SppAppClassic.view.main.Map.Toolbar", {
    extend: "Ext.Toolbar",

    xtype: "maptoolbar",

    requires: [
        "SppAppClassic.view.main.Map.ToolbarController",
        "Ext.button.Button"
    ],

    controller: "map-toolbar",  // not sure if this is needed -> works without
    // toolbar is a component. only containers can have controllers

    items: [
        {
            text: "Zoom In",
            glyph: "xf00e@FontAwesome",
            handler: "zoomIn"
        },{
            text: "Zoom Out",
            glyph: "xf010@FontAwesome",
            handler: "zoomOut"
        },{
            text: "maxExtent",
            glyph: "xf0b2@FontAwesome",
            handler: "onCenter"
        },{
            xtype: "button",
            reference: "filterButton",
            id: "filterButton", // used in FilterPanelController.js
            text: "Filters",
            glyph: "xf0b0@FontAwesome",
            enableToggle: true,
            pressed: false,
            handler: "onToggleFilter"
        },{
            xtype: "button",
            id: "gridButton", // used in GridWindow.js
            text: "Grid",
            glyph: "xf0ce@FontAwesome",
            enableToggle: true,
            pressed: false,
            handler: "onGridClick"
        }/*,{
            xtype: 'button',
            id: 'hoverButton',  // to reference it in controller
            text : 'hover',
            glyph: 'xf129@FontAwesome',
            enableToggle: true,
            pressed: true,
            handler: "onToggleHover"
        }*/
    ],

    listeners: {
        beforerender: "hideButtonsForGuest"
    }
});
