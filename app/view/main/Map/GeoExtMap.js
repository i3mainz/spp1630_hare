"use strict";

Ext.define("SppAppClassic.view.main.map.GeoExtMap", {
    extend: "GeoExt.component.Map",

    xtype: "geoextmap",

    requires: [
        "SppAppClassic.view.main.map.GeoExtMapController",
        "LayerGroups"
        //"SppAppClassic.view.main.Popup",    // xtype: "popup"
    ],

    controller: "main-geoextmap",

    initComponent: function () {
        console.log("init GeoExtMap...");
        //this.map = olMap;  // set Ol3 map

        if (Ext.util.Cookies.get("sppCookie") === "guest") {
            this.addGuestLayersToMap();
        } else {
            this.addAdminLayersToMap();
        }

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
    addGuestLayersToMap: function() {
        // this.addLayer() <-- GeoExt3 method
        // this.map.addLayer() <-- OL3 method
        this.map.addLayer(LayerGroups.baselayers);
        //this.map.addLayer(LayerGroups.hydrology);
        //this.map.addLayer(LayerGroups.sppOpen);
    },

    addAdminLayersToMap: function() {
        console.log("adding layers!");
        this.addLayer(LayerGroups.baselayers);
        //this.addLayer(LayerGroups.darmc);
        //this.addLayer(LayerGroups.barrington);
        //this.addLayer(LayerGroups.hydrology);  // fix ol error
        //this.addLayer(LayerGroups.spp);
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
    }

});
