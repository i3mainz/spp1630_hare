"use strict";

var olMap = new ol.Map({
    layers: [],  // get laoded dynamically in MapController
    controls: [
        new ol.control.ScaleLine()
    ],
    // ol.control.defaults().extend(  // keeps default controls

    interactions: ol.interaction.defaults().extend([
        // highlight features on hover, click events are seperate -> this is just highlight
        new ol.interaction.Select({
            condition: ol.events.condition.pointerMove  // empty -> select on click
        })
    ]),

    // renderer: CANVAS,
    // Improve user experience by loading tiles while dragging/zooming. Will make
    // zooming choppy on mobile or slow devices.
    //loadTilesWhileInteracting: true,

    view: new ol.View({
        center: ol.proj.fromLonLat([8.751278, 50.611368]),  // [0, 0],
        zoom: 5,  // 2,
        minZoom: 3  // prevents zoom too far out
        //restrictedExtent: new ol.extent(-180, -90, 180, 90)  // prevents going over 'edge' of map
    })
});


Ext.define("SppAppClassic.view.main.map.GeoExtMap", {
    extend: "GeoExt.component.Map",

    xtype: "geoextmap",

    requires: [
        "SppAppClassic.view.main.map.GeoExtMapController",
        "GeoExt.data.store.LayersTree",
        "LayerGroups"
        //"SppAppClassic.view.main.Popup",    // xtype: "popup"
    ],

    controller: "main-geoextmap",

    initComponent: function () {
        console.log("init GeoExtMap...");
        var me = this;
        var ol3Map = new ol.Map({
            layers: [
                LayerGroups.basemaps,
                LayerGroups.hydrology,
                LayerGroups.darmc,
                LayerGroups.barrington,
                LayerGroups.spp,
                LayerGroups.sppOpen
            ],  // get laoded dynamically in MapController
            controls: [
                new ol.control.ScaleLine()
            ],
            // ol.control.defaults().extend(  // keeps default controls

            interactions: ol.interaction.defaults().extend([
                // highlight features on hover, click events are seperate -> this is just highlight
                new ol.interaction.Select({
                    condition: ol.events.condition.pointerMove  // empty -> select on click
                })
            ]),

            // renderer: CANVAS,
            // Improve user experience by loading tiles while dragging/zooming. Will make
            // zooming choppy on mobile or slow devices.
            //loadTilesWhileInteracting: true,

            view: new ol.View({
                center: ol.proj.fromLonLat([8.751278, 50.611368]),  // [0, 0],
                zoom: 5,  // 2,
                minZoom: 3  // prevents zoom too far out
                //restrictedExtent: new ol.extent(-180, -90, 180, 90)  // prevents going over 'edge' of map
            })
        });
        var layerGroup = ol3Map.getLayerGroup();
        
        // set map
        me.map = ol3Map;  // set Ol3 map

        // set layertree's store
        var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
            layerGroup: layerGroup
        });
        Ext.getCmp("layerTree").setStore(treeStore);

        // dynamically adding layers doesnt work!
        // workaround: add all, then remove restricted
        var guestRestrictedLayers = ["Barrington Atlas", "SPP", "DARMC"];
        var adminRestrictedLayers = ["SPP (open)"];
        var groups = [];
        var collection = me.getLayers();
        var cookie = Ext.util.Cookies.get("sppCookie");

        collection.forEach(function(layer) {
            if (cookie === "guest" || cookie === undefined) {
                if (guestRestrictedLayers.indexOf(layer.get("name")) > -1) {
                    me.removeLayer(layer);
                }
            } else {
                if (adminRestrictedLayers.indexOf(layer.get("name")) > -1) {
                    me.removeLayer(layer);
                }
            }
        });

        // add custom listeners

        // keep inheritance
        //this.callParent(); // doesnt work, use workaround below
        // $owner error has something to do with initComponent being a protected method
        // in ExtJs6
        SppAppClassic.view.main.map.GeoExtMap.superclass.initComponent.call(this);
    },


    /**
     * checks user's authorization and adds layer groups accordingly.
     * beforerender is a default event. no need to specify it in the
     * listeners like {beforerender: "beforeRender"}. it just works 
     * since ExtJs recognizes the name. the function in the controller
     * needs to be in lowerCamelCase: "beforerender" wouldn't work, while
     * "beforeRender" works. I use onBeforeRender. not sure if using 
     * beforeRender does overwrite some interal functions 
    */
    addLayersToMap: function() {
        // this.addLayer() <-- GeoExt3 method
        // this.map.addLayer() <-- OL3 method

        // shared layers
        this.map.addLayer(LayerGroups.baselayers);
        this.map.addLayer(LayerGroups.hydrology);

        // restricted layers
        if (Ext.util.Cookies.get("sppCookie") === "guest") {
            this.map.addLayer(LayerGroups.sppOpen);
        } else {
            this.addLayer(LayerGroups.darmc);
            this.addLayer(LayerGroups.barrington);
            this.addLayer(LayerGroups.spp);
        }
    },

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
    getLayerByName: function(layername, activeOnly) {
        activeOnly = activeOnly || true;

        var resultlayer;
        var layers;
        if (activeOnly) {
            layers = this.getActiveLayers(true);
        } else {
            this.getLayers();
        }

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
    }

});
