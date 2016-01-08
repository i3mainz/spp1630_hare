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
        layers: [
            Layers.open,
            Layers.agOnly,
            Layers.allProjects
        ],
        name: "SPP: Access",
        visible: true
    }),

    query: new ol.layer.Group({
        layers: [],
        name: "SPP: Query",
        visible: false
    }),

    statusGroup: new ol.layer.Group({
        layers: [],
        name: "SPP: Status",
        visible: false
    }),

    projects: new ol.layer.Group({
        layers: [
            Layers.allProjects
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
        visible: false
    }),

    hydrology: new ol.layer.Group({
        layers: [
            Layers.lakes,  // legends dont work
            Layers.streams
            //layers.ecrinsRivers
        ],
        name: "Hydrology",
        visible: false
    }),

    barrington: new ol.layer.Group({
        layers: [
            Layers.barrAqueducts,
            Layers.barrBridges,
            //Layers.barrPorts,
            Layers.barrBaths,
            Layers.barrSettlements,
            Layers.barrCanals,
            Layers.barrRoads
            ],
        name: "Barrington Atlas",
        visible: false
    }),

    darmc: new ol.layer.Group({
        layers: [
            Layers.aqueducts,
            Layers.bridges,
            Layers.roads,
            Layers.cities,
            Layers.baths,
            Layers.ports,
            Layers.harbours,
            Layers.canals
        ],
        name: "DARMC",
        visible: false
    }),

    // sort using OL3 groups
    baselayers: new ol.layer.Group({
        layers: [
            Layers.world,
            Layers.watercolor,
            Layers.mapquest,
            Layers.osm,
            Layers.osmGray
        ],
        name: "Basemaps"
    })

});

console.log("asd");
console.log(Layers.streams);
console.log("asd2");
console.log(Layers.ecrinsLakes);
