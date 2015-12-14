"use strict";

//var MAP_CENTER = ol.proj.fromLonLat([8.751278, 50.611368]);

var treeStore = Ext.create('GeoExt.data.store.LayersTree', {
    //layerGroup: olMap.getLayerGroup()
    layerGroup: OL3Map.map.getLayerGroup()
});

Ext.define("SppAppClassic.view.main.Map", {
    extend: "Ext.panel.Panel",
    
    xtype: 'mappanel',  // alias for future reference
    
    requires: [
        "SppAppClassic.view.main.MapController",
        "SppAppClassic.view.main.MapModel",
        "SppAppClassic.view.main.LayerTree",  // required tp load xtype
        "SppAppClassic.view.main.MapToolbar"
    ],
    
    controller: "main-map",
    
    viewModel: {
        type: "main-map"
    },
    layout: "border",
    items: [
        {
            xtype: "layertree",  // LayerTree.js
            region: "west",
            store: treeStore
        },{
            xtype: "panel",
            region: "center",
            title: "Map",
            layout: "border",
            dockedItems: {xtype: "maptoolbar"},  // MapToolbar.js
            items: [
                {   
                    xtype: "gx_map",  // GeoExt.component.Map
                    region: "center",
                    reference: "geoextmap",
                    map: OL3Map.map // defined in OL3Map.js
                }, {
                    xtype: "panel",
                    region: "south",
                    reference: "filterPanel",
                    height: 200,
                    collapsed: true,
                    collapsible: true,
                    title: "Filters",
                    collapseMode: "mini"  // dont show header

                }
            ]
        }
    ]
    
});
