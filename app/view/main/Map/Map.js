"use strict";

//var MAP_CENTER = ol.proj.fromLonLat([8.751278, 50.611368]);

var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
    //layerGroup: olMap.getLayerGroup()
    layerGroup: OL3Map.map.getLayerGroup()
});

Ext.define("SppAppClassic.view.main.Map", {
    extend: "Ext.panel.Panel",

    xtype: "mappanel",

    requires: [
        "SppAppClassic.view.main.MapController",
        "GeoExt.data.store.LayersTree",
        "SppAppClassic.view.main.LayerTree",
        "SppAppClassic.view.main.Map.Toolbar",
        "GeoExt.component.Map",
        "OL3Map"
    ],

    controller: "main-map",

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

                /**
                 * returns url of the geoserver legend for a layer.
                 * layer string needs to be in format "<workspace>:<layername>" 
                 * e.g. "SPP:harbours"
                */
                getLegendImg: function(layer) {
                    return SppAppClassic.app.globals.wmsPath + "REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=50&TRANSPARENT=true&HEIGHT=50&LAYER=" + layer
                },

                /**
                 * returns list of layers that are currently active (no layergroups)
                */
                getActiveLayers: function(onlyVectors) {
                    /* returns a list of OL3 Layer objects 
                    that includes all selected nodes. 
                    isVector: if true, only active Vectorlayers are returned, 
                    WMS layers are ommitted */
                    onlyVectors = onlyVectors || false;  // set default to false

                    var activeLayers = [];

                    var layerGroups = this.map.getLayers();
                    layerGroups.forEach(function(layerGroup) {      // loop layergroups  
                        var layers = layerGroup.getLayers();
                        layers.forEach(function(layer, i) {         // loop layers
                            if (layer.getVisible()) {               // skip inactive layers
                                var source = layer.getSource();
                                if (onlyVectors) {
                                    if (source instanceof ol.source.Vector) {
                                        activeLayers.push(layer);
                                    }
                                } else {
                                    activeLayers.push(layer);
                                }
                            }
                        });
                    });
                    return activeLayers;
                },

                /**
                 * returns layer by its assigned name in layertree (not source name)
                */
                getLayerByName: function(layername) {
                    var resultlayer;
                    var layers = this.getActiveLayers(true);
                    layers.forEach(function(layer, i) {
                        if (layer.get("name") === layername) {
                            resultlayer = layer;
                        }
                    });
                    return resultlayer;
                },

                /**
                 * returns layer's source name (e.g. 'v_public_offen' for layer 'Open')
                */
                getLayerSourceNameByLayername: function(layername) {
                },
                
                createVectorSource: function(layername, filter) {
                    console.log("creating source!");
                    var vectorSource;
                    // "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?bereich=SPP&layer=road&bbox=-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562&epsg=4326"
                    filter = filter || "";

                    //var PROXY_URL = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
                    var workspace = layername.split(":")[0];
                    var layer = layername.split(":")[1];
                    //var BBOX = "-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562";
                    var EPSG = "4326";

                    if (filter !== "") {
                        console.log("creating source for " + layername + " using filter: " + filter);
                        vectorSource = new ol.source.Vector({
                            format: new ol.format.GeoJSON(),
                            url: function(extent, resolution, projection) {
                                return SppAppClassic.app.globals.proxyPath +
                                    "bereich=" + workspace +
                                    "&layer=" + layer +
                                    "&epsg=" + EPSG +
                                    "&CQL_FILTER=" + filter;
                            },
                            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                                maxZoom: 19
                            }))
                        });
                    } else {  // no filter
                        console.log("creating source for " + layername + " without any filters!");
                        vectorSource = new ol.source.Vector({
                            format: new ol.format.GeoJSON(),
                            url: function(extent, resolution, projection) {
                                return SppAppClassic.app.globals.proxyPath +
                                    "bereich=" + workspace +
                                    "&layer=" + layer +
                                    "&epsg=" + EPSG;
                            },
                            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                                maxZoom: 19
                            }))
                        });
                    }
                    return vectorSource;
                },

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
