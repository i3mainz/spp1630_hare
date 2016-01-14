"use strict";
Ext.define("SppAppClassic.view.main.Map.Toolbar.Toolbar", {
    extend: "Ext.Toolbar",

    xtype: "maptoolbar",

    requires: [
        "SppAppClassic.view.main.Map.Toolbar.ToolbarController"
        //"SppAppClassic.view.main.Filter.FilterPanel",
        //"SppAppClassic.view.main.GridWindow"
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
            //reference: "sliderButton",
            text: "Filter",
            glyph: "xf0b0@FontAwesome",
            enableToggle: true,
            pressed: false,
            handler: "onToggleFilter"
        },{
            xtype: "button",
            //reference: "sliderButton",
            text: "Grid",
            glyph: "xf0ce@FontAwesome",
            enableToggle: false,
            pressed: false,
            handler: "onGridClick"
        }
        /*
        {
            xtype: 'button',
            id: 'hoverButton',  // to reference it in controller
            text : 'hover',
            glyph: 'xf129@FontAwesome',
            enableToggle: true,
            pressed: true,
            handler: "onToggleHover"
        },
        */
    ]
});
