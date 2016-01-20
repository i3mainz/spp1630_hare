"use strict";
// collection of shared data
// not really a class 


var wms = "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/SPP/wms?";
var proxy = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";

var getLegendImg = function(layer) {
    return wms + "REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=50&TRANSPARENT=true&HEIGHT=50&LAYER=" + layer
};

Ext.define("Layers", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    requires: [
        "LayerStyles"
    ],

    spp: [
        // harbours
        new ol.layer.Vector({
            name: "Harbours",
            source: new ol.source.Vector({  // TODO create class for vector source
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "sppgesamt" +
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
        })

        // canals
        /*
        new ol.layer.Vector({
            name: "Vehicles",
            source: new ol.source.Vector({  // TODO create class for vector source
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "vehicles" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                            //"&CQL_FILTER=place_type='Hafen'";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:vehicles"),
            style: LayerStyles.yellowPoints,
            visible: false
        }),
        */

        // vehicles
        /*
        new ol.layer.Vector({
            name: "Canals",
            source: new ol.source.Vector({  // TODO create class for vector source
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "canals" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                            //"&CQL_FILTER=place_type='Hafen'";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:canals"),
            style: LayerStyles.greenPoints,
            visible: false
        })
        */

        /*
        new ol.layer.Tile({
            name: "AG only",
            source: new ol.source.TileWMS({
                url: GEOSERVER_URL,
                params: {"LAYERS": "SPP:v_public_agintern", "TILED": true},
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:gesamt_ascii"),
            visible: false
        }),*/
        /*
        new ol.layer.Vector({
            name: "Status",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "gesamt_ascii" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:gesamt_arcmap"),
            style: LayerStyles.statusStyleFunction,
            visible: false
        }),
        */
        /*new ol.layer.Vector({
            name: "Projects",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "gesamt_ascii" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            style: LayerStyles.styleFunction,
            legendUrl: getLegendImg("SPP:gesamt_ascii"),
            visible: false
        })*/
    ],

    sppOpen: [
        // harbours
        new ol.layer.Vector({
            name: "Harbours",
            source: new ol.source.Vector({  // TODO create class for vector source
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "v_public_offen" +
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
        })
    ],

    hydrology: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: wms,
                params: {"LAYERS": "SPP:lakes", "TILED": true},
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:lakes"),
            name: "Lakes",
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: wms,
                params: {
                    "LAYERS": "SPP:streams",
                    "TILED": true
                },
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:streams"),
            name: "Streams",
            visible: false
        })

        /*new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: wms,
                params: {
                    "LAYERS": "SPP:ecrins_lakes",
                    "TILED": true
                },
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:ecrins_lakes"),
            name: "Lakes (ecrins)",
            visible: false
        })*/
    ],

    barrington: [
        new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "aqueduct" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:aqueduct"),
            style: LayerStyles.redPoints,
            name: "Aqueducts",
            visible: false
        }),

        new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "bridge" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:bridge"),
            style: LayerStyles.redPoints,
            name: "Bridges",
            visible: false
        }),

        new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy + 
                            "bereich=" + "SPP" +
                            "&layer=" + "bath" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:bath"),
            style: LayerStyles.redPoints,
            name: "Baths",
            visible: false
        }),

        new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy + 
                            "bereich=" + "SPP" +
                            "&layer=" + "port" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:port"),
            style: LayerStyles.redPoints,
            name: "Ports",
            visible: false
        }),

        new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy + 
                            "bereich=" + "SPP" + 
                            "&layer=" + "settlement" + 
                            "&bbox=" + extent.join(",") + 
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:settlement"),
            style: LayerStyles.redPoints,
            name: "Settlements",
            visible: false
        }),

        new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy + 
                            "bereich=" + "SPP" + 
                            "&layer=" + "canal" + 
                            "&bbox=" + extent.join(",") + 
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            style: LayerStyles.redPoints,
            legendUrl: getLegendImg("SPP:canal"),
            name: "Canals",
            visible: false
        }),

        new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy + 
                            "bereich=" + "SPP" + 
                            "&layer=" + "road" + 
                            "&bbox=" + extent.join(",") + 
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            style: LayerStyles.redLines,
            legendUrl: getLegendImg("SPP:road"),
            name: "Roads",
            visible: false
        })
    ],

    darmc: [
        new ol.layer.Tile({
            name: "Aqueducts",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:darmc_aqueducts", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:darmc_aqueducts"),
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:darmc_bridges", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            name: "Bridges",
            legendUrl: getLegendImg("SPP:darmc_bridges"),
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: wms,
                params:{
                    "LAYERS": "SPP:darmc_roads",
                    "TILED": true
                },
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            name: "Roads",
            legendUrl: getLegendImg("SPP:darmc_roads"),
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:darmc_cities", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            name: "Cities",
            legendUrl: getLegendImg("SPP:darmc_cities"),
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:darmc_baths", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            name: "Baths",
            legendUrl: getLegendImg("SPP:darmc_baths"),
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:darmc_ports", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            name: "Ports",
            legendUrl: getLegendImg("SPP:darmc_ports"),
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:darmc_harbours", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            name: "Harbours",
            legendUrl: getLegendImg("SPP:darmc_harbours"),
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:darmc_canals", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            name: "Canals",
            legendUrl: getLegendImg("SPP:darmc_canals"),
            visible: false
        })
    ],

    basemaps: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: wms,
                params: {"LAYERS": "SPP:world_borders_simple", "TILED": true},
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:world_borders_simple"),
            name: "Simple World Borders",
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: "watercolor",
                wrapX: false
            }),
            legendUrl: "http://www.visualnews.com/wp-content/uploads/2012/03/Stamen-Web-App-Watercolor-Maps-1.jpg",
            name: "Stamen Watercolor",
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.MapQuest({
                layer: "sat",
                wrapX: false
            }),
            name: "MapQuest Satelite",
            legendUrl: "https://otile4-s.mqcdn.com/tiles/1.0.0/sat/4/4/7.jpg",
            visible: false
        }),

        /*osm: new ol.layer.Tile({
            source: new ol.source.OSM({wrapX: false}),
            name: "OSM",
            visible: false  // not activated on start
        }),*/
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: "http://ows.terrestris.de/osm-gray/service",
                params: {"LAYERS": "OSM-WMS", "TILED": true},
                wrapX: false
            }),
            legendUrl: "https://otile4-s.mqcdn.com/tiles/1.0.0/osm/4/4/7.jpg",
            name: "OSM gray",
            visible: true
        })
    ]

});
