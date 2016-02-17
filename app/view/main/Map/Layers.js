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
    var finalWms = wms + "REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=" + width + "&TRANSPARENT=true&HEIGHT=" + height + "&LAYER=" + layer +
                    "&legend_options=fontName:Arial;fontAntiAliasing:true;fontSize:6;dpi:180";
    return finalWms;
};

// TODO: move this function to GeoExtMap.js
var createWMSLayer = function(name, sourceName, legendUrl) {
    legendUrl = legendUrl || "";
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
    if (legendUrl) {
        layer.set("legendUrl", legendUrl);
    }
    return layer;
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
            name: "Data",
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
            //legendHeight: "harbours",
            //style: LayerStyles.statusStyleFunction,
            //style: LayerStyles.pointTypeStyleFunction,
            style: LayerStyles.redPointLabelStyleFunction,
            visible: true
        })
    ]),

    sppOpen: new ol.Collection([
        // harbours
        new ol.layer.Vector({
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
        createWMSLayer("Lakes", "SPP:lakes", getLegendImg("SPP:lakes")),
        createWMSLayer("Streams", "SPP:streams", getLegendImg("SPP:streams"))
        //createWMSLayer("Lakes (ecrins)", "SPP:ecrins_lakes", getLegendImg("SPP:ecrins_lakes"))

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
        createWMSLayer("Aqueducts", "SPP:aqueduct"),
        createWMSLayer("Bridges", "SPP:bridge"),
        createWMSLayer("Baths", "SPP:bath"),
        createWMSLayer("Ports", "SPP:port"),
        createWMSLayer("Settlements", "SPP:settlement"),
        createWMSLayer("Canals", "SPP:canal"),
        createWMSLayer("Roads", "SPP:road", getLegendImg("SPP:road"))
    ]),

    darmc: new ol.Collection([
        createWMSLayer("Aqueducts", "SPP:darmc_aqueducts"),
        createWMSLayer("Bridges", "SPP:darmc_bridges"),
        createWMSLayer("Roads", "SPP:darmc_roads"),
        createWMSLayer("Cities", "SPP:darmc_cities"),
        createWMSLayer("Baths", "SPP:darmc_baths"),
        createWMSLayer("Ports", "SPP:darmc_ports"),
        createWMSLayer("Harbours", "SPP:darmc_harbours"),
        createWMSLayer("Canals", "SPP:darmc_canals", getLegendImg("SPP:darmc_canals"))
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
        createWMSLayer("Simple World Borders", "SPP:world_borders_simple", getLegendImg("SPP:world_borders_simple"))

        /*new ol.layer.Tile({
            source: new ol.source.OSM({wrapX: false}),
            name: "OSM",
            visible: false  // not activated on start
        })*/
    ])
});
