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

    access: new ol.layer.Group({
        layers: Layers.spp,
        name: "SPP",
        visible: true
    }),

    /*query: new ol.layer.Group({
        layers: [],
        name: "SPP: Query",
        visible: false
    }),*/

    /*statusGroup: new ol.layer.Group({
        layers: [],
        name: "SPP: Status",
        visible: false
    }),*/

    /*projects: new ol.layer.Group({
        layers: [
            //Layers.allProjects
            //Layers.projectEffizienz,
            //Layers.projectFaehren,
            //Layers.projectBinnen,
            //Layers.projectRhein,
            //Layers.projectExtern,
            //Layers.projectFossa,
            //Layers.projectOstsee,
            //Layers.projectRheinhafen,
            //Layers.projectHanoa,
            //Layers.projectBalkan
            ],
        name: "SPP: Projects",
        visible: true
    }),*/

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
