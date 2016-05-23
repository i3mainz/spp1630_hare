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
        layers: Layers.spp,  // ol.collection
        name: "SPP",
        visible: true
    }),

    sppOpen: new ol.layer.Group({
        layers: Layers.sppOpen,
        name: "SPP (open)",
        visible: true
    }),

    agIntern: new ol.layer.Group({
        layers: [],
        name: "Project Internal",
        visible: false
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

    fetch: new ol.layer.Group({
        name: "Fetch",
        layers: new ol.Collection([

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
