"use strict";
Ext.define("SppAppClassic.view.main.MapToolbar", {
    extend: "Ext.Toolbar",

    xtype: "maptoolbar",

    requires: [
        "SppAppClassic.view.main.CenturySlider",
        "SppAppClassic.view.main.FilterPanel"
    ],

    controller: "main-map",  // not sure if this is needed -> works without
    // toolbar is a component. only containers can have controllers

    items: [
        {text: "Zoom In", glyph: "xf00e@FontAwesome", handler: "zoomIn"},
        {text: "Zoom Out", glyph: "xf010@FontAwesome", handler: "zoomOut"},
        //{text: "rotate!", glyph: "xf0e2@FontAwesome", handler: "onRotate"},
        {text: "maxExtent", glyph: "xf0b2@FontAwesome", handler: "onCenter"},
        //{xtype: "multislider"},
        /*{
            xtype: "centuryslider",
            listeners: {
                changecomplete: "onSliderChangeComplete"  // refers to MapController.js -> since Toolbar cannot have it"s own controller
            }
        },*/
        {
            xtype: "button",
            //reference: "sliderButton",
            text: "Filter",
            glyph: "xf0b0@FontAwesome",
            enableToggle: true,
            pressed: false,
            handler: "onToggleFilter"
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
        //slider
        //{text: 'fullscreen', handler: "fullscreen"}
    ]
});
