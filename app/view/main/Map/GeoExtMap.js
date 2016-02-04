"use strict";

Ext.define("SppAppClassic.view.main.map.GeoExtMap", {
    extend: "GeoExt.component.Map",

    xtype: "geoextmap",

    requires: [
        "SppAppClassic.view.main.map.GeoExtMapController",
        "GeoExt.data.store.LayersTree",
        "LayerGroups",
        //"layerStyles",
        "Projects"
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
                LayerGroups.agIntern,
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
        var guestRestrictedLayers = ["Barrington Atlas", "SPP", "DARMC", "AG Intern"];
        var adminRestrictedLayers = ["SPP (open)"];
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

        // remove AG intern if it already exists
        //var internLayer = me.getLayerByName("Harbours (AG Intern)");
        //me.removeLayer(internLayer);

        // add ag intern layer to layer Group "AG intern"
        var projectID = me.getProjectIdFromCookie(cookie);

        if (projectID) {  // known cookie login
            // create ag intern layer
            var layer = me.createAGInternLayer(projectID);
            //me.addLayer(layer);
            me.addLayerToLayerGroup(layer, "AG Intern");
        }

        // add custom listeners

        // keep inheritance
        //this.callParent(); // doesnt work, use workaround below
        // $owner error has something to do with initComponent being a protected method
        // in ExtJs6
        SppAppClassic.view.main.map.GeoExtMap.superclass.initComponent.call(this);
    },

    /**
     * Checks cookie and returns the corresponding project ID
     */
    getProjectIdFromCookie: function(cookie) {
        var id;
        var projects = Projects.projectList;
        for (var key in projects) {
            var project = projects[key];
            if (cookie === key) {
                id = project.id;
            }
        }
        return id;
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
    },

    createAGInternLayer: function(projectID) {
        console.log("spp_harbours_project" + projectID + "_intern");
        var layer = new ol.layer.Vector({
            name: "Harbours (AG Intern)",
            source: new ol.source.Vector({  // TODO create class for vector source
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_harbours_project" + projectID + "_intern" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:harbours"),
            //style: LayerStyles.styleFunction,
            style: LayerStyles.greenPoints,
            visible: false
        });
        return layer;
    },

    addLayerToLayerGroup: function(layer, layerGroupName) {

        var layerGroups = this.map.getLayers();

        layerGroups.forEach(function(layerGroup) {      // loop layergroups

            if (layerGroup.get("name") === layerGroupName) {
                // get current layers
                var layers = layerGroup.getLayers();  // returns collection
                layers.push(layer);
                layerGroup.setLayers(layers);
            }
        });
    }

});
