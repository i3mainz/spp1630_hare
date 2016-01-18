"use strict";

//var MAP_CENTER = ol.proj.fromLonLat([8.751278, 50.611368]);

var treeStore = Ext.create('GeoExt.data.store.LayersTree', {
    //layerGroup: olMap.getLayerGroup()
    layerGroup: OL3Map.map.getLayerGroup()
});

Ext.define("SppAppClassic.view.main.Map", {
    extend: "Ext.panel.Panel",

    xtype: "mappanel",

    requires: [
        "SppAppClassic.view.main.MapController",
        //"SppAppClassic.view.main.MapModel",
        "SppAppClassic.view.main.LayerTree",  // required tp load xtype
        "SppAppClassic.view.main.Map.Toolbar.Toolbar"
    ],

    controller: "main-map",

    /*viewModel: {
        type: "main-map"
    },*/

    layout: "border",
    items: [
        {
            // layer panel
            xtype: "layertree",  // LayerTree.js
            region: "west",
            store: treeStore
        },{
            // map panel
            xtype: "panel",
            region: "center",
            title: "Map",
            layout: "border",
            dockedItems: {
                xtype: "maptoolbar" // MapToolbar.js
            },
            items: [{
                xtype: "gx_map",  // GeoExt.component.Map
                region: "center",
                //reference: "geoextmap",
                id: "geoextMap",
                map: OL3Map.map, // defined in OL3Map.js,
                listeners: {
                    // add layers based on user
                    beforerender: function() {
                        console.log("adding layers!");
                        // use geoext method to keep layer reorder working
                        // also doesnt work with reorder
                        var map = Ext.getCmp("geoextMap");  
                        if (Ext.util.Cookies.get("sppCookie") === "guest") {
                            map.addLayer(LayerGroups.baselayers);
                            map.addLayer(LayerGroups.hydrology);
                            map.addLayer(LayerGroups.sppOpen);
                        } else {
                            map.addLayer(LayerGroups.baselayers);
                            map.addLayer(LayerGroups.darmc);
                            map.addLayer(LayerGroups.barrington);
                            map.addLayer(LayerGroups.hydrology);
                            map.addLayer(LayerGroups.spp);
                        }
                    }
                }
            }]
        }
    ]

});
