"use strict";

Ext.define("OL3MapService", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    requires: [
        "ConfigService",
        "LayerService",
        "StyleService",
        "AuthService"
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

            layers: this.getAuthorizedLayers(LayerService.layers),
            controls: [
                new ol.control.ScaleLine(),
                new ol.control.Attribution()
            ],

            interactions: ol.interaction.defaults().extend([
                // highlight features on hover, click events are seperate -> this is just highlight
                new ol.interaction.Select({
                    //condition: ol.events.condition.pointerMove  // empty -> select on click
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

    /**
     * check for access-property and only add authorized layers
     * @param {Object[]} layers - OpenLayers 3 layer objects
     * @returns {Object[]} - Authorized layer objects
     */
    getAuthorizedLayers: function(layers) {

        // get project id of current user
        var UserProjectID = AuthService.getUserProjectID();

        var authorizedLayers = [];
        layers.forEach(function(layer) {
            // public layers
            if (layer.get("access") === "public" || !layer.get("access")) {
                authorizedLayers.push(layer);
            }

            // spp internal layers
            if (layer.get("access") === "sppInternal" && AuthService.getUser() !== "guest") {
                authorizedLayers.push(layer);
            }

            // project internal layers
            if (layer.get("access") && layer.get("access") !== "public" && layer.get("access") !== "sppInternal") {
                if (AuthService.getUser().name === "admin" || layer.get("access") === UserProjectID) {
                    authorizedLayers.push(layer);
                }
            }

        });
        return authorizedLayers;
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
     * dont use because names can be duplicates
    */
    // getLayerByName: function(layername) {
    //     var layers = this.getLayers();   // gets layers nested in layer groups
    //     for (var i = 0; i < layers.length; i++) {
    //         var layer = layers[i];
    //         if (layer.get("name") === layername) {
    //             return layer;
    //         }
    //     }
    // },

    /**
     * returns layer's source name (e.g. 'v_public_offen' for layer 'Open')
    */
    getLayerSourceNameByLayername: function(layername) {
    },

    /**
     * Filters a vector layer by applying a filter.
     * @param {Object} layer - OL3 Layer
     * @param {String} layer.id - Layer ID, must be same as GeoServer layer name
     * @param {string} filter - GeoServer CQL Filter String
     */
    filterLayer: function(layer, filter) {
        var vectorSource = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: ConfigService.paths.proxy +
                    "bereich=SPP" +
                    "&layer=" + layer.get("id") +
                    "&epsg=4326" +
                    "&CQL_FILTER=" + filter
        });
        layer.setSource(vectorSource);
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
