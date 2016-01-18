"use strict";
/**
 * singleton classes get created when they are defined. no need to Ext.create them.
 * access them via the class-name directly. e.g. LayerStyles.bluePoints
 * variable is globally available
 */
Ext.define("LayerGroups", {
    singleton: true,

    requires: [
        "Layers"
    ],

    spp: new ol.layer.Group({
        layers: Layers.spp,
        name: "SPP",
        visible: true
    }),

    sppOpen: new ol.layer.Group({
        layers: Layers.sppOpen,
        name: "SPP",
        visible: true
    }),

    hydrology: new ol.layer.Group({
        layers: Layers.hydrology,
        name: "Hydrology",
        visible: false
    }),

    barrington: new ol.layer.Group({
        layers: Layers.barrington,
        name: "Barrington Atlas",
        visible: false
    }),

    darmc: new ol.layer.Group({
        layers: Layers.darmc,
        name: "DARMC",
        visible: false
    }),

    // sort using OL3 groups
    baselayers: new ol.layer.Group({
        layers: Layers.basemaps,
        name: "Basemaps"
    })

});
