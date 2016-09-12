"use strict";

Ext.define("OL3MapService", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    requires: [
        "ConfigService",
        "LayerService"
    ],

    map: null,

    setMap: function(map) {
        this.map = map;
    },

    /*
     * returns the OpenLayers 3 map object
     */
    getMap: function() {
        return this.map;
    },

    // required to completely reset the map on a logout
    initMap: function() {
        this.setMap(new ol.Map({
            // restricted layer groups like ag-internal will be loaded dynamically, also
            layers: LayerService.layers,  // get laoded dynamically in MapController
            controls: [
                new ol.control.ScaleLine(),
                new ol.control.Attribution()
            ],

            interactions: ol.interaction.defaults().extend([
                // highlight features on hover, click events are seperate -> this is just highlight
                new ol.interaction.Select({
                    condition: ol.events.condition.pointerMove  // empty -> select on click
                })
            ]),
            view: new ol.View({
                center: ol.proj.fromLonLat([8.751278, 50.611368]),  // [0, 0],
                zoom: 4,  // 2,
                minZoom: 3  // prevents zoom too far out
                //extent: [-180, -90, 180, 90]
            })
        }));
    },

    /*
     * wrapper for OpenLayers' addLayers method.
     * adds a layer or layergroup to the top of the map
     */
    addLayer: function(layer) {
        this.map.addLayer(layer);
    },

    /**
     * returns list of layers that are currently active (no layergroups)
     * OUTDATED: use getLayers(true) instead
     */
    getActiveLayers: function() {
        /* returns a list of OL3 Layer objects
        that includes all selected nodes.
        isVector: if true, only active Vectorlayers are returned,
        WMS layers are ommitted */
        //onlyVectors = onlyVectors || false;  // set default to false
        return this.getLayers("visibleOnly");
    },

    /**
     * returns list of layer. option to only return currently active layers.
     * this overwrites the geoext3 method, which just returns the layergroups.
     * if there are layers nested in a layergroup, they will be also be returned
     * in the array
     */
    getLayers: function(visibleOnly) {
        visibleOnly = visibleOnly || false;  // set default to false

        var activeLayers = [];

        var layerGroups = this.map.getLayers();

        layerGroups.forEach(function(layerGroup) {      // loop layergroups

            if(layerGroup instanceof ol.layer.Group) {  // is a layergroup
                // if layergroup -> get all layers
                // if not layer group just append the one layer

                var layers = layerGroup.getLayers();
                layers.forEach(function(layer) {         // loop layers
                    if (visibleOnly) {
                        if (layer.getVisible()) {               // skip inactive layers
                            activeLayers.push(layer);
                        }
                    } else {
                        activeLayers.push(layer);
                    }
                });
            } else {
                var layer = layerGroup;
                if (visibleOnly) {
                    if (layer.getVisible()) {               // skip inactive layers
                        activeLayers.push(layer);
                    }
                } else {
                    activeLayers.push(layer);
                }
            }

        });
        return activeLayers;
    },

    /**
     * checks if layer already exists on map. takes the layer title given to the layer
     * by the user (e.g. the title for "SPP:harbours" would mostl likely be just "Harbours")
     */
    layerExists: function(title) {
        var currentLayers = this.getLayers();
        currentLayers.forEach(function(layer) {
            if (layer.get("name") === title) {
                return true;
            }
        });
        return false;
    },

    /**
     * returns list of layer groups
     */
    getLayerGroups: function() {
        var groupList = [];
        var layerGroups = this.map.getLayers();
        layerGroups.forEach(function(layerGroup) {
            if (layerGroup instanceof ol.layer.Group) {
                groupList.push(layerGroup);
            }
        });
        return groupList;
    },

    /**
     * returns the specified layer group
     */
    getLayerGroupByName: function(groupName) {
        var layerGroups = this.map.getLayers();
        var result;
        layerGroups.forEach(function(layerGroup) {
            if (layerGroup instanceof ol.layer.Group) {
                if (layerGroup.get("name") === groupName) {
                    result = layerGroup;
                }
            }
        });
        return result;
    },

    /**
     * returns layer by its assigned name in layertree (not source name)
    */
    getLayerByName: function(layername) {
        var layers = this.getLayers();   // gets layers nested in layer groups
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.get("name") === layername) {
                return layer;
            }
        }
    },

    /**
     * returns layer's source name (e.g. 'v_public_offen' for layer 'Open')
    */
    getLayerSourceNameByLayername: function(layername) {
    },

    /**
     * creates a ol.layer.Tile layer with a ol.source.TileWMS
     * as it's source
     */
    createWMSLayer: function(name, sourceName, legendName, legendHeight) {
        legendName = legendName || false;
        legendHeight = legendHeight || false;
        var layer = new ol.layer.Tile({
            name: name,
            source: new ol.source.TileWMS({
                url: wms,
                params: {"LAYERS": sourceName, "TILED": true},
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            visible: false
        });
        if (legendName) {
            var legendUrl;
            if (legendHeight) {
                if (legendHeight === "fetch") {
                    console.log("found fetch!");
                    legendUrl = this.getLegendImg(legendName, 10, 25);
                    layer.set("legendHeight", legendHeight);
                } else {
                    legendUrl = this.getLegendImg(legendName);
                    console.log("legendHeight: " + legendHeight + " not supported! using default height");
                }
            } else {  // no legendHeight specified
                legendUrl = this.getLegendImg(legendName);
            }
            layer.set("legendUrl", legendUrl);
        }
        return layer;
    },

    /**
     * creates a ol.layer.Vector layer with a ol.source.Vector from ol.format.GeoJSON
     * as it's source
     */
    /*createGeoJSONLayer: function(name, sourceName, legendUrl, layerStyle, isVisible) {
        legendUrl = legendUrl || "";
        layerStyle = layerStyle || "";
        isVisible = isVisible || false;

        var workspace = sourceName.split(":")[0];
        var layerName = sourceName.split(":")[1];

        var layer = new ol.layer.Vector({
            name: name,
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + workspace +
                            "&layer=" + layerName +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            visible: isVisible
        });

        if (layerStyle) {
            layer.setStyle(layerStyle);
        } else {
            layer.setStyle("style", LayerStyles.redPoints);  // default
        }

        if (legendUrl) {
            layer.set("legendUrl", legendUrl);
        }

        return layer;
    },*/

    /**
     * layername needs to be complete with workspace (e.g. "SPP.Data").
     */
    filterVectorSource: function(layer, filter) {
        console.log("filtering vector source!");
        // TODO: obtain layername from provided layer object
        var sourceName = "SPP:spp_harbours_intern";

        console.log(layer.getSource().getFeatures().length);


        //var PROXY_URL = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
        var workspace = sourceName.split(":")[0];
        var layerName = sourceName.split(":")[1];
        //var BBOX = "-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562";
        var EPSG = "4326";

        //console.log(workspace, layerName);
        //console.log("creating source for " + sourceName + " using filter: " + filter);
        var vectorSource = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: SppAppClassic.app.globals.proxyPath +
                    "bereich=" + workspace +
                    "&layer=" + layerName +
                    "&epsg=" + EPSG +
                    "&CQL_FILTER=" + filter,
            /*strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            }))*/


        });

        layer.setSource(vectorSource);

        //this.getMap().removeLayer();
        /*var newLayer = new ol.layer.Vector({
           name: "Harbour data",
           source: new ol.source.Vector({
               format: new ol.format.GeoJSON(),
               url: function(extent) {
                   return proxyPath +
                           "bereich=" + "SPP" +
                           "&layer=" + "spp_harbours_intern" +
                           //"&bbox=" + extent.join(",") +
                           "&CQL_FILTER=" + filter +
                           "&epsg=" + "4326";
               },
               strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                   maxZoom: 19
               })),
               wrapX: false  // dont repeat on X axis
           }),
           //style: LayerStyles.redPoints,
           //legendUrl: getLegendImg("SPP:spp_harbours_intern"),
           style: LayerStyles.redPointLabelStyleFunction,
           visible: true
       });*/


       //map.addLayer(newLayer);

        //return vectorSource;
        //layer.getSource().clear();
        //layer.setSource(vectorSource);  // this refreshes automatically*/
    },

    createAGInternLayer: function(projectID) {
        console.log("spp_harbours_project" + projectID + "_intern");
        var layer = new ol.layer.Vector({
            name: "Harbours (internal)",
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
            legendUrl: getLegendImg("SPP:spp_harbours_intern"),
            //style: LayerStyles.styleFunction,
            style: LayerStyles.orangePoints,
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
    },

    /**
     * takes a list of restricted layer group names and removes
     * all layergroups that are in this list if they exist in the
     * GeoExt3 map
    */
    removeRestrictedLayerGroups: function(restrictedGroupsList) {
        var me = this;
        var layerGroups = me.getLayerGroups();
        layerGroups.forEach(function(layerGroup) {

            console.log(layerGroup.get("name"));
            if (restrictedGroupsList.indexOf(layerGroup.get("name")) > -1) {  // groupName is restricted
                console.log("is restricted!");
                me.removeLayer(layerGroup);
            }
        });
    }

});
