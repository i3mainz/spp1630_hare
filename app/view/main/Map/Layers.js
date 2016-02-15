"use strict";
// collection of shared data
// not really a class
// layers need to be in a collection before you can group them to layergroups
// this way, reordering works

var wms = "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/SPP/wms?";
var proxy = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
var mapboxAccessToken = "pk.eyJ1Ijoic2hhbnl1YW4iLCJhIjoiY2lmcWd1cnFlMDI0dXRqbHliN2FzdW9kNyJ9.wPkC7amwS2ma4qKWmmWuqQ";

var getLegendImg = function(layer, height, width) {
    height = height || 25;
    width = width || 25;
    var final_wms = wms + "REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=" + width + "&TRANSPARENT=true&HEIGHT=" + height + "&LAYER=" + layer;
    return final_wms;
};

Ext.define("Layers", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    requires: [
        "LayerStyles"
    ],

    // works both as collection or as list
    spp: new ol.Collection([
        // harbours
        new ol.layer.Vector({
            name: "Harbours",
            source: new ol.source.Vector({  // TODO create class for vector source
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_harbours_intern" +  // includes open + intern, not ag intern
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
        }),

        new ol.layer.Vector({
            name: "Vehicles",
            source: new ol.source.Vector({  // TODO create class for vector source
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_vehicles" +  // open and spp intern, not ag intern
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                            //"&CQL_FILTER=place_type='Hafen'";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:spp_vehicles"),
            style: LayerStyles.yellowPoints,
            visible: false
        }),

        new ol.layer.Vector({
            name: "Canals",
            source: new ol.source.Vector({  // TODO create class for vector source
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_canals" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                            //"&CQL_FILTER=place_type='Hafen'";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:spp_canals"),
            style: LayerStyles.greenPoints,
            visible: false
        })


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
    ]),

    sppOpen: new ol.Collection([
        // harbours
        new ol.layer.Vector({
            name: "Harbours",
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
        })
    ]),

    hydrology: new ol.Collection([
        new ol.layer.Tile({
            name: "OpenSeaMap",
            source: new ol.source.XYZ({
                url: "http://t1.openseamap.org/seamark/{z}/{x}/{y}.png",
                attributions: [new ol.Attribution({
                    html: "© <a href='http://www.openseamap.org/'>OpenSeaMap</a>"
                })]
            }),
            legendUrl: "http://wiki.openseamap.org/images/thumb/e/ec/MapFullscreen.png/400px-MapFullscreen.png",
            visible: false
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: wms,
                params: {
                    "LAYERS": "SPP:lakes",
                    "TILED": true
                },
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
    ]),

    fetch: new ol.Collection([
        new ol.layer.Tile({
            name: "Adria 360°(N)",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:fetch_360", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:fetch_045", 10, 25),
            legendHeight: "fetch",  // number not accounted for, only if attribute exists or not
            // needs legendsize 100 und 60
            visible: false
        }),
        new ol.layer.Tile({
            name: "Adria 45°(NE)",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:fetch_045", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:fetch_045", 10, 25),
            legendHeight: "fetch",
            visible: false
        }),
        new ol.layer.Tile({
            name: "Adria 90°(E)",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:fetch_090", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:fetch_045", 10, 25),
            legendHeight: "fetch",
            visible: false
        }),
        new ol.layer.Tile({
            name: "Adria 135°(SE)",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:fetch_135", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:fetch_045", 10, 25),
            legendHeight: "fetch",
            visible: false
        }),
        new ol.layer.Tile({
            name: "Adria 180°(S)",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:fetch_180", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:fetch_045", 10, 25),
            legendHeight: "fetch",
            visible: false
        }),
        new ol.layer.Tile({
            name: "Adria 225°(SW)",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:fetch_225", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:fetch_045", 10, 25),
            legendHeight: "fetch",
            visible: false
        }),
        new ol.layer.Tile({
            name: "Adria 270°(W)",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:fetch_270", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:fetch_045", 10, 25),
            legendHeight: "fetch",
            visible: false
        }),
        new ol.layer.Tile({
            name: "Adria 315°(NW)",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:fetch_315", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:fetch_045", 10, 25),
            legendHeight: "fetch",
            visible: false
        })
    ]),

    barrington: new ol.Collection([
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
            legendUrl: getLegendImg("SPP:harbours"),
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
            legendUrl: getLegendImg("SPP:harbours"),
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
            legendUrl: getLegendImg("SPP:harbours"),
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
            legendUrl: getLegendImg("SPP:harbours"),
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
            legendUrl: getLegendImg("SPP:harbours"),
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
            legendUrl: getLegendImg("SPP:harbours"),
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
            legendUrl: getLegendImg("SPP:harbours"),
            name: "Roads",
            visible: false
        })
    ]),

    darmc: new ol.Collection([
        new ol.layer.Tile({
            name: "Aqueducts",
            source: new ol.source.TileWMS({
              url: wms,
              params: {"LAYERS": "SPP:darmc_aqueducts", "TILED": true},
              serverType: "geoserver",
              wrapX: false   // dont repeat on X axis
            }),
            //legendUrl: getLegendImg("SPP:harbours"),
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
            //legendUrl: getLegendImg("SPP:harbours"),
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
            //legendUrl: getLegendImg("SPP:harbours"),
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
            //legendUrl: getLegendImg("SPP:harbours"),
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
            //legendUrl: getLegendImg("SPP:harbours"),
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
            //legendUrl: getLegendImg("SPP:harbours"),
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
            //legendUrl: getLegendImg("SPP:harbours"),
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
            //legendUrl: getLegendImg("SPP:harbours"),
            visible: false
        })
    ]),

    basemaps: new ol.Collection([

        new ol.layer.Tile({
            source: new ol.source.MapQuest({
                layer: "sat",
                wrapX: false
            }),
            name: "MapQuest Satelite",
            legendUrl: "https://otile4-s.mqcdn.com/tiles/1.0.0/sat/4/4/7.jpg",
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

        /*new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: "https://a.tiles.mapbox.com/v4/shanyuan.cifqgurif027ut0lxxf08w6gz/attribution,zoompan,zoomwheel,geocoder,share.html?access_token=pk.eyJ1Ijoic2hhbnl1YW4iLCJhIjoiY2lmcWd1cnFlMDI0dXRqbHliN2FzdW9kNyJ9.wPkC7amwS2ma4qKWmmWuqQ",
                //params: {"LAYERS": "OSM-WMS", "TILED": true},
                wrapX: false
            }),
            legendUrl: "https://otile4-s.mqcdn.com/tiles/1.0.0/osm/4/4/7.jpg",
            name: "OSM gray",
            visible: true
        }),*/

        new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "http://api.tiles.mapbox.com/v4/shanyuan.cifqgurif027ut0lxxf08w6gz/{z}/{x}/{y}.png?access_token=" + mapboxAccessToken,
                attributions: [new ol.Attribution({
                html: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
                    '© <a href="http://www.openstreetmap.org/copyright">' +
                    'OpenStreetMap contributors</a>'
                })],
            }),
            legendUrl: "https://otile4-s.mqcdn.com/tiles/1.0.0/osm/4/4/7.jpg",
            name: "Mapbox OSM",
            visible: true
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: wms,
                params: {
                    "LAYERS": "SPP:world_borders_simple",
                    "TILED": true
                },
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            legendUrl: getLegendImg("SPP:world_borders_simple"),
            name: "Simple World Borders",
            visible: false
        })

        /*new ol.layer.Tile({
            source: new ol.source.OSM({wrapX: false}),
            name: "OSM",
            visible: false  // not activated on start
        })*/
    ])
});
