"use strict";
// collection of shared data
// not really a class
//var GEOSERVER_PATH = me.lookupReference("application").geoserverPath;
var GEOSERVER_PATH = "http://haefen.i3mainz.hs-mainz.de/geoserver";
var GEOSERVER_URL = GEOSERVER_PATH + "/SPP/wms?";  // global variable -> bad practice
var PROXY_URL = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";

Ext.define("Layers", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    requires: [
        "LayerStyles"
    ],

    // access layers
    open: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
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
        style: LayerStyles.redPoints,
        name: "Open",
        visible: true
    }),

    agOnly: new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: GEOSERVER_URL,
            params: {"LAYERS": "SPP:v_public_agintern", "TILED": true},
            serverType: "geoserver",
            wrapX: false   // dont repeat on X axis
        }),
        name: "AG only",
        visible: false
    }),

    // query layers

    // status layers

    // projects layers
    projectEffizienz: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_effizienz" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Effizienz",
        visible: false
    }),

    projectFaehren: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_faehren" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Fähren",
        visible: false
    }),

    projectBinnen: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_binnenhaefen" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Binnenhäfen",
        visible: false
    }),

    projectRhein: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_rhein" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Rhein",
        visible: false
    }),

    projectExtern: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_extern_binnenhaefen" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Extern/Binnenhäfen",
        visible: false
    }),

    projectFossa: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_extern_fossacarolina" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Fossa Carolina",
        visible: false
    }),

    projectOstsee: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_extern_ostseehaefen" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Ostseehäfen",
        visible: false
    }),

    projectRheinhafen: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_extern_rheinhafenprojekt" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Rheinhäfen",
        visible: false
    }),

    projectHanoa: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_extern_hanoa" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "HanoA",
        visible: false
    }),

    projectBalkan: new ol.layer.Vector({
        source: new ol.source.Vector({  // TODO create class for vector source
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_extern_balkankueste" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Balkanküste",
        visible: false
    }),

    allProjects: new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
                        "bereich=" + "SPP" +
                        "&layer=" + "v_project_effizienz" +
                        "&bbox=" + extent.join(",") +
                        "&epsg=" + "4326";
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            })),
            wrapX: false  // dont repeat on X axis
        }),
        style: LayerStyles.redPoints,
        name: "Projects",
        visible: false
    }),

    // hydrology layers
    lakes: new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: GEOSERVER_URL,
            params: {"LAYERS": "SPP:lakes", "TILED": true},
            serverType: "geoserver",
            wrapX: false   // dont repeat on X axis
        }),
        name: "Lakes",
        visible: false
    }),

    streams: new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: GEOSERVER_URL,
            params: {"LAYERS": "SPP:streams", "TILED": true},
            serverType: "geoserver",
            wrapX: false   // dont repeat on X axis
        }),
        name: "Streams",
        visible: false
    }),

    // barrington atlas layers
    barrAqueducts: new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent, resolution, projection) {
                return PROXY_URL +
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
        style: LayerStyles.redPoints,
        name: "Aqueducts",
        visible: false
    }),

    barrBridges: new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL +
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
        style: LayerStyles.redPoints,
        name: "Bridges",
        visible: false
    }),

    barrBaths: new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL + 
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
        style: LayerStyles.redPoints,
        name: "Baths",
        visible: false
    }),

    barrPorts: new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL + 
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
        style: LayerStyles.redPoints,
        name: "Ports",
        visible: false
    }),

    barrSettlements: new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL + 
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
        style: LayerStyles.redPoints,
        name: "Settlements",
        visible: false
    }),

    barrCanals: new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL + 
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
        name: "Canals",
        visible: false
    }),

    barrRoads: new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return PROXY_URL + 
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
        name: "Roads",
        visible: false
    }),

    // darmc layers
    aqueducts: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {"LAYERS": "SPP:darmc_aqueducts", "TILED": true},
          serverType: "geoserver",
          wrapX: false   // dont repeat on X axis
        }),
        name: "Aqueducts",
        visible: false
    }),

    bridges: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {"LAYERS": "SPP:darmc_bridges", "TILED": true},
          serverType: "geoserver",
          wrapX: false   // dont repeat on X axis
        }),
        name: "Bridges",
        visible: false
    }),

    roads: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {"LAYERS": "SPP:darmc_roads", "TILED": true},
          serverType: "geoserver",
          wrapX: false   // dont repeat on X axis
        }),
        name: "Roads",
        visible: false
    }),

    cities: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {"LAYERS": "SPP:darmc_cities", "TILED": true},
          serverType: "geoserver",
          wrapX: false   // dont repeat on X axis
        }),
        name: "Cities",
        visible: false
    }),

    baths: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {"LAYERS": "SPP:darmc_baths", "TILED": true},
          serverType: "geoserver",
          wrapX: false   // dont repeat on X axis
        }),
        name: "Baths",
        visible: false
    }),

    ports: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {"LAYERS": "SPP:darmc_ports", "TILED": true},
          serverType: "geoserver",
          wrapX: false   // dont repeat on X axis
        }),
        name: "Ports",
        visible: false
    }),

    harbours: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {"LAYERS": "SPP:darmc_harbours", "TILED": true},
          serverType: "geoserver",
          wrapX: false   // dont repeat on X axis
        }),
        name: "Harbours",
        visible: false
    }),

    canals: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {"LAYERS": "SPP:darmc_canals", "TILED": true},
          serverType: "geoserver",
          wrapX: false   // dont repeat on X axis
        }),
        name: "Canals",
        visible: false
    }),

    // Basemaps
    world: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {"LAYERS": "SPP:world_borders_simple", "TILED": true},
          serverType: "geoserver",
          wrapX: false   // dont repeat on X axis
        }),
        name: "Simple World Borders",
        visible: false
    }),

    watercolor: new ol.layer.Tile({
        source: new ol.source.Stamen({
            layer: "watercolor",
            wrapX: false
        }),
        name: "Stamen Watercolor",
        visible: false
    }),

    mapquest: new ol.layer.Tile({
        source: new ol.source.MapQuest(
            {
                layer: "sat", 
                wrapX: false
            }
        ),
        name: "MapQuest Satelite",
        visible: false
    }),

    osm: new ol.layer.Tile({
        source: new ol.source.OSM({wrapX: false}),
        name: "OSM",
        visible: false  // not activated on start
    }),

    osmGray: new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: "http://ows.terrestris.de/osm-gray/service",
            params: {"LAYERS": "OSM-WMS", "TILED": true},
            wrapX: false
        }),
        name: "OSM gray",
        visible: true
    })
}); 
