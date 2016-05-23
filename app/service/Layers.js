"use strict";
// collection of shared data
// not really a class
// layers need to be in a collection before you can group them to layergroups
// this way, reordering works

var proxy = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
var mapboxAccessToken = "pk.eyJ1Ijoic2hhbnl1YW4iLCJhIjoiY2lmcWd1cnFlMDI0dXRqbHliN2FzdW9kNyJ9.wPkC7amwS2ma4qKWmmWuqQ";

Ext.define("Layers", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    requires: [
        //"LayerStyles"
    ],

    wmsPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/SPP/wms?",

    // works both as collection or as list
    spp: new ol.Collection([
        //createGeoJSONLayer("Data", "SPP:spp_harbours_intern", getLegendImg("SPP:harbours"), LayerStyles.redPointLabelStyleFunction, true)
    ]),

    sppOpen: new ol.Collection([
        // harbours
        /*new ol.layer.Vector({
            name: "Data",
            source: new ol.source.Vector({  // TODO create class for vector source
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_harbours_open" +
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
            style: LayerStyles.redPoints,
            visible: true
        })*/
    ]),

    barrington: new ol.Collection([
    ]),

    darmc: new ol.Collection([
    ])
});
