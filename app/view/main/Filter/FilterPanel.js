"use strict";

Ext.define("SppAppClassic.view.main.Filter.FilterPanel",{
    extend: "Ext.window.Window",
    xtype: "filterpanel",
    reference: "filterpanel",
    id: "filterPanel",  // TODO: use references instead
    requires: [
        "SppAppClassic.view.main.Filter.FilterPanelController",
        "SppAppClassic.view.main.Filter.FilterPanelModel",
        "SppAppClassic.view.main.Filter.CenturySlider"
    ],

    //controller: "main-filterpanel",
    controller: "main-map",

    viewModel: {
        type: "main-filterpanel"
    },
    height: 250,
    //collapsed: true,
    hidden: true,
    //split: true,
    //collapsible: true,
    title: "Filters",
    layout: "anchor",
    //collapseMode: "mini",  // applied directly in Map.js
    items: [{
        xtype: "centuryslider",
        padding: 5,
        listeners: {
            changecomplete: "onSliderChangeComplete"  // refers to MapController.js -> since Toolbar cannot have it's own controller
        }
    },{
        xtype: "label",
        reference: "sliderlabel",
        text: "",
        margin: "0 0 0 5"
    },{
        xtype: 'button',
        text: 'reset',
        padding: 5,
        handler: 'onButtonReset'
    }]
});
