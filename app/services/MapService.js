"use strict";

Ext.define("MapService", {
    singleton: true,

    requires: [
        "ConfigService",
        "LayerService",
        "StyleService",
        "AuthService"
    ],

    map: null,

    /*
     * returns the OpenLayers 3 map object
     */
    getMap: function() {
        return this.map;
    },

    // required to completely reset the map on a logout
    initMap: function() {
        this.map = new ol.Map({
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
                center: ol.proj.fromLonLat(ConfigService.mapCenterLonLat),
                zoom: ConfigService.mapDefaultZoom,
                minZoom: 4  // prevents zoom too far out
            })
        });
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
    }

});
