"use strict";
var wmsPath = "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/SPP/wms?";
var proxyPath = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";

/**
 * singleton classes get created when they are defined. no need to Ext.create them.
 * access them via the class-name directly. e.g. LayerStyles.bluePoints
 * variable is globally available
 */
Ext.define("LayerGroups", {
    singleton: true,

    requires: [
        "Layers",
        "LayerStyles"
    ],

    wmsPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/SPP/wms?",

    spp: new ol.layer.Group({
        layers: Layers.spp,  // ol.collection
        name: "SPP",
        visible: true
    }),

    sppOpen: new ol.layer.Group({
        name: "SPP (open)",
        layers: new ol.Collection([

            new ol.layer.Vector({
                name: "Harbour data",
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
                style: LayerStyles.redPoints,
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
        layers: Layers.barrington,
        name: "Barrington Atlas",
        visible: false
    }),

    darmc: new ol.layer.Group({
        layers: Layers.darmc,
        name: "DARMC",
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
    })

});
