
Ext.define("SppAppClassic.view.main.FilterPanel",{
    extend: "Ext.panel.Panel",
    xtype: "filterpanel",
    reference: "filterpanel",
    requires: [
        "SppAppClassic.view.main.FilterPanelController",
        "SppAppClassic.view.main.FilterPanelModel"
    ],

    //controller: "main-filterpanel",
    controller: "main-map",
    
    viewModel: {
        type: "main-filterpanel"
    },
    height: 250,
    collapsed: true,
    //split: true,
    //collapsible: true,
    title: "Filters",
    //collapseMode: "mini",  // applied directly in Map.js
    items: [{
        xtype: "centuryslider",
        padding: 5,
        listeners: {
            changecomplete: 'onSliderChangeComplete'  // refers to MapController.js -> since Toolbar cannot have it's own controller
        }
    }] 

});

