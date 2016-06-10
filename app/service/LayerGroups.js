"use strict";
var wmsPath = "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/SPP/wms?";
var proxyPath = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
var mapboxAccessToken = "pk.eyJ1Ijoic2hhbnl1YW4iLCJhIjoiY2lmcWd1cnFlMDI0dXRqbHliN2FzdW9kNyJ9.wPkC7amwS2ma4qKWmmWuqQ";

/**
 * returns the image url for a specific layer
 */
function getLegendImg(layer, height, width) {
    height = height || 25;
    width = width || 25;
    return wmsPath + "REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=" + width + "&TRANSPARENT=true&HEIGHT=" + height + "&LAYER=" + layer +
                    "&legend_options=fontName:Arial;fontAntiAliasing:true;fontSize:6;dpi:180";
}

/**
 * singleton classes get created when they are defined. no need to Ext.create them.
 * access them via the class-name directly. e.g. LayerStyles.bluePoints
 * variable is globally available
 */
Ext.define("LayerGroups", {
    singleton: true,

    requires: [
        //"Layers",
        "LayerStyles"
    ],

    wmsPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/SPP/wms?",

    layers: {

        spp: new ol.layer.Vector({
            name: "SPP: Harbours",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxyPath +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_harbours_intern" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            //style: LayerStyles.redPoints,
            legendUrl: getLegendImg("SPP:spp_harbours_intern"),
            style: LayerStyles.redPointLabelStyleFunction,
            visible: true
        }),

        sppOpen: new ol.layer.Group({
            name: "SPP (open)",
            layers: new ol.Collection([

                new ol.layer.Vector({
                    name: "Harbour data (open)",
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function(extent) {
                            return proxyPath +
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
                    //style: LayerStyles.redPoints,
                    style: LayerStyles.harbourTypeStyleFunction,
                    visible: true
                })

            ]),
            visible: true
        }),

        agIntern: new ol.layer.Group({
            layers: [],
            name: "Project Internal",
            visible: false
        }),

        hydrology: new ol.layer.Group({
            name: "Hydrology",
            layers: new ol.Collection([

                new ol.layer.Tile({
                    name: "Lakes",  // title
                    source: new ol.source.TileWMS({
                        url: wmsPath,
                        params: {"LAYERS": "SPP:lakes", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),

                new ol.layer.Tile({
                    name: "Streams",  // title
                    source: new ol.source.TileWMS({
                        url: wmsPath,
                        params: {"LAYERS": "SPP:streams", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),

                new ol.layer.Vector({
                    name: "Eckholdt 1980",
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function(extent) {
                            return proxyPath +
                                    "bereich=" + "SPP" +
                                    "&layer=" + "Fluesse_Eckholdt" +
                                    "&bbox=" + extent.join(",") +
                                    "&epsg=" + "4326";
                        },
                        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                            maxZoom: 19
                        })),
                        wrapX: false  // dont repeat on X axis
                    }),
                    style: LayerStyles.eckholdtStyleFunction,
                    visible: false
                }),

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
                })
            ]),
            visible: false
        }),

        barrington: new ol.layer.Group({
            //layers: Layers.barrington,
            name: "Barrington Atlas",
            layers: new ol.Collection([
                new ol.layer.Tile({
                    name: "Aqueducts",  // title
                    source: new ol.source.TileWMS({
                        url: wmsPath,
                        params: {"LAYERS": "SPP:aqueduct", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Bridges",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:bridge", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Baths",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:bath", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Ports",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:port", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Settlements",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:settlement", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Canals",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:canal", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Roads",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:road", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                })
            ]),
            visible: false
        }),

        darmc: new ol.layer.Group({
            //layers: Layers.darmc,
            name: "DARMC",
            layers: new ol.Collection([
                new ol.layer.Tile({
                    name: "Aqueducts",  // title
                    source: new ol.source.TileWMS({
                        url: wmsPath,
                        params: {"LAYERS": "SPP:darmc_aqueducts", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Bridges",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:darmc_bridges", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Roads",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:darmc_roads", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Cities",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:darmc_cities", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Baths",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:darmc_baths", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Ports",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:darmc_ports", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Harbours",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:darmc_harbours", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Canals",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:darmc_canals", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                })
            ]),
            visible: false
        }),

        fetch: new ol.layer.Group({
            name: "Fetch",
            layers: new ol.Collection([
                new ol.layer.Tile({
                    name: "Adria 45°(NE)",  // title
                    source: new ol.source.TileWMS({
                        url: wmsPath,
                        params: {"LAYERS": "SPP:fetch_045", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 90°(E)",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:fetch_090", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 135°(SE)",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:fetch_135", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 180°(S)",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:fetch_180", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 225°(SW)",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:fetch_225", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 270°(W)",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:fetch_270", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 315°(NW)",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:fetch_315", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 360°(N)",  // title
                    source: new ol.source.TileWMS({
                        url: this.wmsPath,
                        params: {"LAYERS": "SPP:fetch_360", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    //legendUrl = this.getLegendImg(legendName);
                    visible: false
                })
            ]),
            visible: false
        }),

        basemaps: new ol.layer.Group({
            name: "Basemaps",
            layers: new ol.Collection([

                new ol.layer.Tile({
                    name: "Mapbox OSM",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/shanyuan.cifqgurif027ut0lxxf08w6gz/{z}/{x}/{y}.png?access_token=" + mapboxAccessToken,
                        attributions: [new ol.Attribution({
                            html: "© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> " +
                                "© <a href='http://www.openstreetmap.org/copyright'>" +
                                "OpenStreetMap contributors</a>"
                        })]
                    }),
                    legendUrl: "https://otile4-s.mqcdn.com/tiles/1.0.0/osm/4/4/7.jpg",
                    visible: true
                }),

                new ol.layer.Tile({
                    name: "MapQuest Satelite",
                    source: new ol.source.MapQuest({
                        layer: "sat",
                        wrapX: false
                    }),
                    legendUrl: "https://otile4-s.mqcdn.com/tiles/1.0.0/sat/4/4/7.jpg",
                    visible: false
                })
                /*new ol.layer.Tile({
                    name: "Stamen Watercolor",
                    source: new ol.source.Stamen({
                        layer: "watercolor",
                        wrapX: false
                    }),
                    legendUrl: "http://www.visualnews.com/wp-content/uploads/2012/03/Stamen-Web-App-Watercolor-Maps-1.jpg",
                    visible: false
                }),*/
            ])
        }),

    },

    getLayerGroupByName: function(name) {
        for (var key in this.layers) {
            var group = this.layers[key];
            if (group instanceof ol.layer.Group) {
                if (group.get("name") === name) {
                    return group;
                }
            }
        }
    },

    /**
     * returns the layer based on the provided name.
     * this function is used to restore the origin layer's source.
     * multiple layers with the same name will not work
     */
    getLayerByName: function(layerName) {
        var result = [];

        for (var key in this.layers) {
            var group = this.layers[key];

            if (group instanceof ol.layer.Group) {  // is group
                var layers = group.getLayers();

                //var result = [];
                layers.forEach(function(layer) {
                    if (layer.get("name") === layerName) {
                        result.push(layer);
                    }
                })
            } else {  // single layer
                if (group.get("name") === layerName) {
                    result.push(group);
                }
            }


        }

        if (result.length > 1) {
            throw "Multiple layers with name: " + layerName + " found!";
        }
        return result[0];
    }

});
