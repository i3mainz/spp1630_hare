"use strict";

/**
 * singleton classes get created when they are defined. no need to Ext.create them.
 * access them via the class-name directly. e.g. StyleService.bluePoints
 * variable is globally available
 */
Ext.define("LayerService", {
    singleton: true,

    requires: [
        "ConfigService",
        "StyleService"
    ],

    layers: [
        // Basemaps
        new ol.layer.Group({
            name: "Basemaps",
            layers: new ol.Collection([

                new ol.layer.Tile({
                    name: "Mapbox OSM",
                    source: new ol.source.XYZ({
                        url: "https://api.mapbox.com/styles/v1/shanyuan/cit2tzp5m00312wmlw6rlt7sf/tiles/256/{z}/{x}/{y}?access_token=" + ConfigService.mapboxAccessToken,
                        attributions: [new ol.Attribution({
                            html: "© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> " +
                                "© <a href='http://www.openstreetmap.org/copyright'>" +
                                "OpenStreetMap contributors</a>"
                        })]
                    }),
                    visible: true
                }),

                new ol.layer.Tile({
                    name: "AWMC Basemap",
                    source: new ol.source.XYZ({
                        projection: "EPSG:3857",
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.map-knmctlkh/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        wrapDateLine: true,
                        transitionEffect: "resize",
                        attribution: "Tiles &copy; <a href='http://mapbox.com/' target='_blank'>MapBox</a> | " +
                            "Data &copy; <a href='http://www.openstreetmap.org/' target='_blank'>OpenStreetMap</a> and contributors, CC-BY-SA |"+
                            " Tiles and Data &copy; 2013 <a href='http://www.awmc.unc.edu' target='_blank'>AWMC</a>" +
                            " <a href='http://creativecommons.org/licenses/by-nc/3.0/deed.en_US' target='_blank'>CC-BY-NC 3.0</a>"
                    }),
                    description: "The <a href='http://awmc.unc.edu/wordpress/' target='_blank'>AWMC</a> base map. In addition to imagery derived from OSM and Mapbox, this map has the Inland Water, River Polygons, Water Course Center Lines, Base Open Water Polygons, supplemental water polygons (not listed below, for areas far outside of the scope of the Barrington Atlas ) layers. Please see the individual listings below for data citations. It is suitable for most applications when left on its own, or  in combination with water polygons for a particular time period (archaic, Roman, etc). (<a href='http://awmc.unc.edu/wordpress/tiles/map-tile-information' target='_blank'>Source</a>)",
                    visible: false
                }),

                new ol.layer.Tile({
                    name: "EMODnet Atlas",
                    source: new ol.source.TileWMS({
                        url: "http://ows.emodnet-bathymetry.eu/wms",
                        params: {"LAYERS": "emodnet:mean_atlas_land", "TILED": true},
                        wrapX: false
                    }),
                    description: "This service provides bathymetric data products for the area specified by the EMODNet project. This covers the Norwegian Sea, Icelandic Sea, Celtic Seas, North Sea, Kattegat, Baltic Sea, English Channel, Bay of Biscay, Iberian Coast, West and Central Mediterranean, Adriatic Sea, Ionian Sea, Aegean Sea, Levantine Sea, Sea of Marmara, Black Sea, the Azores, Canary Islands and Madeira. The data product is provided in one eight arc minute grid, so data points are roughly 230 meters apart.",
                    visible: false
                })
            ])
        }),

        // Hydrology
        new ol.layer.Group({
            name: "Hydrology",
            description: "Layers with hydrological information.",
            layers: new ol.Collection([


                new ol.layer.Tile({
                    name: "Eckholdt 1980",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:Fluesse_Eckholdt", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    description: 'Die Schiffbarkeit von kleinen Flüssen Mitteleuropas in Römerzeit und Mittelalter lässt sich laut Martin Eckholdt anhand der Wasserführung Q [m³/s] abschätzen. Diese berechnete er nach der Fließformel von Manning-Strickler. Zu sehen sind Flüsse auf Grundlage des Ecrins-Datensatzes, welcher auf die behandelten Flüsse Eckholdts reduziert wurde. Einige seiner aufgeführten Flüsse sind in der heutigen Zeit nicht mehr vorhanden und hier nicht dargestellt. Andere Flüsse fallen aufgrund fehlender digitalisierter Datenbestände weg. Breit dargestellte Flüsse visualisieren eine nachgewiesene Schiffbarkeit, bzw. Die damals mögliche Schiffbarkeit. Mit abnehmender Strichstärke der Flüsse nimmt auch die Schiffbarkeit der Flüsse ab.',
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
                    // legendUrl: "http://wiki.openseamap.org/images/thumb/e/ec/MapFullscreen.png/400px-MapFullscreen.png",
                    description: "<strong>OpenSeaMap</strong><br>is an open source, worldwide project to create a free nautical chart. There is a great need for freely accessible maps for navigation purposes, so in 2009, OpenSeaMap came into life. The goal of OpenSeaMap is to record interesting and useful nautical information for the sailor which is then incorporated into a free map of the world. This includes beacons, buoys and other navigation aids as well as port information, repair shops and chandlerys. OpenSeaMap is a subproject of OpenStreetMap and uses its database. (<a href='http://www.openseamap.org/' target='_blank'>Source</a>) <br /><br />Use <a href='http://t1.openseamap.org/seamark/{z}/{x}/{y}.png' target='_blank'>this WMS link</a> to use this layer in your Desktop GIS.",
                    visible: false
                }),

                new ol.layer.Tile({
                    name: "River Polygons",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.9e3lerk9/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    description: "Significant rivers, generally following the Barrington Atlas with additions from VMap0 and OSM and further work by the AWMC.",
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Water Course Center Lines",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.awmc-water-courses/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    description: "Lines following ancient rivers, generally following the Barrington Atlas with additions from VMap0 and OSM and further work by the AWMC.",
                    visible: false
                }),
            ]),
            visible: false
        }),

        // AWMC
        new ol.layer.Group({
            name: "AWMC",
            visible: false,
            description: "<strong>Ancient World Mapping Center Map Tiles</strong><br>These are a series of geographically accurate and publicly accessible map tiles that represent the ancient Mediterranean world in a variety of different periodizations, released under the Creative Commons Attribution 4.0 License license. (<a href='http://awmc.unc.edu/wordpress/tiles/about' target='_blank'>Source</a>)",
            layers: new ol.Collection([
                new ol.layer.Tile({
                    name: "Coast Outline",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.eoupu8fr/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    description: [
                        "<strong>Coast Outline</strong>",
                        'Coast outline of the ancient world, generally following the ',
                        '<a href="http://www.worldcat.org/oclc/43970336" target=_blank>Barrington Atlas</a>',
                        ' and built from <a href="http://earth-info.nga.mil/publications/vmap0.html" target=_blank>VMap0</a> and ',
                        '<a href="http://www.openstreetmap.org/about" target=_blank>OSM</a>, with additional work by the AWMC.'
                    ].join(""),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Roads",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.awmc-roads/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Benthos Water",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.s5l5l8fr/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Inland Water",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.awmc-inland-water/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    visible: false
                }),

                new ol.layer.Tile({
                    name: "Base Open Water Polygons",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.h0rdaemi/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    description: "Water polygons, generally following the Barrington Atlas with additions from VMap0 and OSM and further work by the AWMC. These are shared by all time periods.",
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Archaic water",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.yyuba9k9/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    description: "Water polygons which differ for the Archaic period only, generally following the Barrington Atlas with further work by the AWMC.",
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Classical water",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.l5xc4n29/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    description: "Water polygons which differ for the Classical period only, generally following the Barrington Atlas with further work by the AWMC.",
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Hellenistic Water",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.gq0ssjor/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    description: "Water polygons which differ for the Hellenistic period only, generally following the Barrington Atlas with further work by the AWMC.",
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Roman water",
                    source: new ol.source.XYZ({
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.ymnrvn29/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken,
                        projection: "EPSG:3857"
                    }),
                    description: "Water polygons which differ for the Roman period only, generally following the Barrington Atlas with further work by the AWMC.",
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Late Antiquity water",
                    source: new ol.source.XYZ({
                        projection: "EPSG:3857",
                        url: "http://api.tiles.mapbox.com/v4/isawnyu.t12it3xr/{z}/{x}/{y}.png?access_token=" + ConfigService.mapboxAccessToken
                    }),
                    description: "Water polygons which differ for the Late Antiquity period only, generally following the Barrington Atlas with further work by the AWMC.",
                    visible: false
                })
            ])
        }),

        // EMODnet
        new ol.layer.Group({
            name: "EMODnet",
            visible: false,
            description: "This service provides bathymetric data products for the area specified by the EMODNet project. This covers the Norwegian Sea, Icelandic Sea, Celtic Seas, North Sea, Kattegat, Baltic Sea, English Channel, Bay of Biscay, Iberian Coast, West and Central Mediterranean, Adriatic Sea, Ionian Sea, Aegean Sea, Levantine Sea, Sea of Marmara, Black Sea, the Azores, Canary Islands and Madeira. The data product is provided in one eight arc minute grid, so data points are roughly 230 meters apart.",
            layers: new ol.Collection([
                new ol.layer.Tile({
                    name: "mean_rainbowcolour",
                    source: new ol.source.TileWMS({
                        url: "http://ows.emodnet-bathymetry.eu/wms",
                        params: {"LAYERS": "emodnet:mean_rainbowcolour", "TILED": true},
                        wrapX: false
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "coastlines",
                    source: new ol.source.TileWMS({
                        url: "http://ows.emodnet-bathymetry.eu/wms",
                        params: {"LAYERS": "coastlines", "TILED": true},
                        wrapX: false
                    }),
                    visible: false
                })
            ])
        }),

        // DARMC
        new ol.layer.Group({
            name: "DARMC",
            access: "public",
            description: "<strong>The Digital Atlas of Roman and Medieval Civilizations</strong><br>A selection of layers from DARMC, mainly representing the Barrington Atlas. Go to the <a href='http://darmc.harvard.edu/map-sources' target=_blank>DARMC website</a> to get an overview of additional data sources included in each dataset. Harbour data consists of the Barrington Atlas and an older (2014) Version of \“Ancient ports and harbours\”",
            layers: new ol.Collection([
                new ol.layer.Tile({
                    name: "Aqueducts",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:darmc_aqueducts", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Bridges",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:darmc_bridges", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Roads",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:darmc_roads", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Cities",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:darmc_cities", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Baths",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:darmc_baths", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Ports",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:darmc_ports", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Harbours",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:darmc_harbours", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Canals",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:darmc_canals", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                })
            ]),
            visible: false
        }),

        // Ancient ports and harbours
        new ol.layer.Tile({
            name: "Ancient Ports and Harbours",  // title
            source: new ol.source.TileWMS({
                url: ConfigService.paths.wms,
                params: {"LAYERS": "SPP:ancient_ports_and_harbours", "TILED": true},
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            description: '<strong>Ancient Ports and Harbours 2016</strong><br>This database presents work done by Arthur de Graauw to collect, identify and locate ancient harbours and ports and is published here with his friendly approval. It is based on a study of existing documentation. It contains about 4200 ancient ports based on the writings of 70 ancient authors and over 100 modern authors, incl. the Barrington Atlas. The dataset has been added to the WebGIS mainly for reference, but is missing important context-information. If you are interested in the key to the codes used for a site, please visit his <a href="http://www.ancientportsantiques.com/" target="_blank">website</a> and download the latest AncientPorts.xlsx file.',
            visible: false
        }),

        // Geodatabase of shipwrecks
        new ol.layer.Tile({
            name: "Geodatabase of Shipwrecks",  // title
            source: new ol.source.TileWMS({
                url: ConfigService.paths.wms,
                params: {"LAYERS": "SPP:shipwrecks", "TILED": true},
                serverType: "geoserver",
                wrapX: false   // dont repeat on X axis
            }),
            description: '<strong>Geodatabase of Shipwrecks AD1-1500</strong><br><i></i>Michael McCormick, Giovanni Zambotti, Brendan Maione-Downing, Ece Turnator, et al.  (ed.) Digital Atlas of Roman and Medieval Civilizations<br>This summary database provides basic geographic and archaeological information on 1064 shipwrecks documented by A.J. Parker 1992 and subsequent publications. The geodatabase includes, where available, concise information about main cargoes, ship or wreck distribution sizes, ship gear, and essential bibliography.  The user should refer to the original publications for full details. This file represents the state of the geodatabase in April 2008, when M. McCormick 2012 "Movements and markets in the first millennium: information, containers and shipwrecks" was sent to press; a small number of wrecks were added down to 2010.  Our team continues to work toward future updates of the geodatabase of shipwrecks.  Additional information, corrections, and data about new wrecks will be received gratefully at darmc@harvard.edu.',
            visible: false
        }),

        // Fetch
        new ol.layer.Group({
            name: "Fetch",
            description: 'The fetch, also called the fetch length, is the length of water over which a given wind has blown. [...] Fetch length, along with wind speed, determines the size of waves produced" (Wikipedia). Fetch can help researchers to estimate potential wave heights for harbour sites. The Fetch layers created by us can just cover limited areas and are thought as being prototypical for other areas. nIf you are interested in the fetch method please join us in our workshop at the next plenary meeting!',
            layers: new ol.Collection([
                new ol.layer.Tile({
                    name: "Adria 45°(NE)",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:fetch_045", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 90°(E)",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:fetch_090", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 135°(SE)",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:fetch_135", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 180°(S)",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:fetch_180", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 225°(SW)",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:fetch_225", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false   // dont repeat on X axis
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 270°(W)",  // title
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: {"LAYERS": "SPP:fetch_270", "TILED": true},
                        serverType: "geoserver",
                        wrapX: false
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 315°(NW)",
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: { "LAYERS": "SPP:fetch_315", "TILED": true },
                        serverType: "geoserver",
                        wrapX: false
                    }),
                    visible: false
                }),
                new ol.layer.Tile({
                    name: "Adria 360°(N)",
                    source: new ol.source.TileWMS({
                        url: ConfigService.paths.wms,
                        params: { "LAYERS": "SPP:fetch_360", "TILED": true },
                        serverType: "geoserver",
                        wrapX: false
                    }),
                    visible: false
                })
            ]),
            visible: false
        }),

        // AG intern "Rheinhafenprojekt"
        new ol.layer.Vector({
            name: "Rheinhafenprojekt (AG intern)",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return ConfigService.paths.proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_ag_intern_12" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            // style: StyleService.redPoints,
            legendUrl: ConfigService.paths.legendQuery + "SPP:spp_harbours_intern",
            style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
            description: "Data only visible to this project's members",
            access: "12",  // means project with id 4
            visible: false
        }),

        // AG intern "Fossa Carolina"
        new ol.layer.Vector({
            name: "Fossa Carolina (AG intern)",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return ConfigService.paths.proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_ag_intern_7" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            legendUrl: ConfigService.paths.legendQuery + "SPP:spp_harbours_intern",
            style: StyleService.pointTypeStyleFunction, // StyleService.redPointLabelStyleFunction,
            description: "Data only visible to this project's members",
            access: "7",  // means project with id 4
            visible: false
        }),

        // AG intern "Ostseehäfen"
        new ol.layer.Vector({
            name: "Ostseehäfen (AG intern)",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return ConfigService.paths.proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_ag_intern_10" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            //style: StyleService.redPoints,
            legendUrl: ConfigService.paths.legendQuery + "SPP:spp_harbours_intern",
            style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
            description: "Data only visible to this project's members",
            access: "10",  // means project with id 4
            visible: false
        }),

        // AG intern "Adria"
        new ol.layer.Vector({
            name: "Adria (AG intern)",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return ConfigService.paths.proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_ag_intern_1" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            //style: StyleService.redPoints,
            legendUrl: ConfigService.paths.legendQuery + "SPP:spp_harbours_intern",
            style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
            description: "Data only visible to this project's members",
            access: "1",  // means project with id 4
            visible: false
        }),

        // AG intern "Haefen an der Balkankueste des byzantinischen Reiches"
        new ol.layer.Vector({
            name: "Häfen an der Balkanküste des byzantinischen Reiches",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return ConfigService.paths.proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_ag_intern_8" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            //style: StyleService.redPoints,
            legendUrl: ConfigService.paths.legendQuery + "SPP:spp_harbours_intern",
            style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
            description: "Data only visible to this project's members",
            access: "8",  // means project with id 4
            visible: false
        }),

        // AG intern "Binnenhäfen im fränkisch-deutschen Reich"
        new ol.layer.Vector({
            name: "Binnenhäfen im fränkisch-deutschen Reich (AG intern)",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return ConfigService.paths.proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_ag_intern_2" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            //style: StyleService.redPoints,
            legendUrl: ConfigService.paths.legendQuery + "SPP:spp_harbours_intern",
            style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
            description: "Data only visible to this project's members",
            access: "2",
            visible: false
        }),

        // AG intern "Effizienz und Konkurrenz"
        new ol.layer.Vector({
            name: "Effizienz und Konkurrenz (AG intern)",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return ConfigService.paths.proxy +
                            "bereich=" + "SPP" +
                            "&layer=" + "spp_ag_intern_4" +
                            "&bbox=" + extent.join(",") +
                            "&epsg=" + "4326";
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    maxZoom: 19
                })),
                wrapX: false  // dont repeat on X axis
            }),
            //style: StyleService.redPoints,
            legendUrl: ConfigService.paths.legendQuery + "SPP:spp_harbours_intern",
            style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
            description: "Data only visible to this project's members",
            access: "4",  // means project with id 4
            visible: false
        }),

        // spp (sppInternal)
        new ol.layer.Group({
            name: "SPP (internal)",
            access: "sppInternal",
            visible: true,
            description: "Data only visible to spp project members.",
            //projection : 'EPSG:3857',
            layers: new ol.Collection([
                // vehicles
                new ol.layer.Vector({
                    name: "Wrecks",
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function(extent) {
                            return ConfigService.paths.proxy +
                                    "bereich=" + "SPP" +
                                    "&layer=" + "spp_internal_vehicles" +
                                    "&bbox=" + extent.join(",") +
                                    "&epsg=" + "4326";
                        },
                        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                            maxZoom: 19
                        })),
                        projection: 'EPSG:4326',
                        wrapX: false  // dont repeat on X axis
                    }),
                    legendUrl: ConfigService.paths.legendQuery + "SPP:spp_internal_vehicles",
                    style: StyleService.pointTypeStyleFunction,
                    id: "spp_internal_vehicles",  // used by filter to get correct layer
                    filterable: true,
                    visible: true
                }),

                // canals
                new ol.layer.Vector({
                    name: "Canals",
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function(extent) {
                            return ConfigService.paths.proxy +
                                    "bereich=" + "SPP" +
                                    "&layer=" + "spp_internal_canals" +
                                    "&bbox=" + extent.join(",") +
                                    "&epsg=" + "4326";
                        },
                        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                            maxZoom: 19
                        })),
                        projection: 'EPSG:4326',
                        wrapX: false  // dont repeat on X axis
                    }),
                    //style: StyleService.redPoints,
                    legendUrl: ConfigService.paths.legendQuery + "SPP:spp_internal_canals",
                    style: StyleService.pointTypeStyleFunction,
                    id: "spp_internal_canals",  // used by filter to get correct layer
                    filterable: true,
                    visible: true
                }),

                // harbours
                new ol.layer.Vector({
                    name: "Harbours",
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function(extent) {
                            return ConfigService.paths.proxy +
                                    "bereich=" + "SPP" +
                                    "&layer=" + "spp_internal_harbours" +  // spp_harbours_open
                                    //"&layer=" + "spp_all" +
                                    "&bbox=" + extent.join(",") +
                                    "&epsg=" + "4326";
                        },
                        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                            maxZoom: 19
                        })),
                        projection: 'EPSG:4326',
                        wrapX: false  // dont repeat on X axis
                    }),
                    //style: StyleService.redPoints,
                    legendUrl: ConfigService.paths.legendQuery + "SPP:spp_internal_harbours",
                    style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
                    id: "spp_internal_harbours",  // used by filter to get correct layer
                    filterable: true,
                    visible: true
                })
            ]) // end layers
        }), // end layer group

        // spp (public)
        new ol.layer.Group({
            name: "SPP (public)",
            visible: true,
            access: "public",
            description: "Data of the spp projects open to anyone interested.",
            layers: new ol.Collection([
                // vehicles
                new ol.layer.Vector({
                    name: "Wrecks",
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function(extent) {
                            return ConfigService.paths.proxy +
                                    "bereich=" + "SPP" +
                                    "&layer=" + "spp_public_vehicles" +
                                    "&bbox=" + extent.join(",") +
                                    "&epsg=" + "4326";
                        },
                        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                            maxZoom: 19
                        })),
                        projection: 'EPSG:4326',
                        wrapX: false  // dont repeat on X axis
                    }),
                    legendUrl: ConfigService.paths.legendQuery + "SPP:spp_public_vehicles",
                    style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
                    id: "spp_public_vehicles",  // used by filter to get correct layer
                    filterable: true,  // included in filter function
                    visible: true
                }),

                // canals
                new ol.layer.Vector({
                    name: "Canals",
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function(extent) {
                            return ConfigService.paths.proxy +
                                    "bereich=" + "SPP" +
                                    "&layer=" + "spp_public_canals" +
                                    "&bbox=" + extent.join(",") +
                                    "&epsg=" + "4326";
                        },
                        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                            maxZoom: 19
                        })),
                        projection: 'EPSG:4326',
                        wrapX: false  // dont repeat on X axis
                    }),
                    legendUrl: ConfigService.paths.legendQuery + "SPP:spp_public_canals",
                    style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
                    id: "spp_public_canals",  // used by filter to get correct layer
                    filterable: true,
                    visible: true
                }),

                // harbours
                new ol.layer.Vector({
                    name: "Harbours",
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function(extent) {
                            return ConfigService.paths.proxy +
                                    "bereich=" + "SPP" +
                                    "&layer=" + "spp_public_harbours" +  // spp_harbours_open
                                    //"&layer=" + "spp_all" +
                                    "&bbox=" + extent.join(",") +
                                    "&epsg=" + "4326";
                        },
                        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                            maxZoom: 19
                        })),
                        projection: 'EPSG:4326',
                        wrapX: false  // dont repeat on X axis
                    }),
                    legendUrl: ConfigService.paths.legendQuery + "SPP:spp_public_harbours",
                    style: StyleService.pointTypeStyleFunction, //StyleService.redPointLabelStyleFunction,
                    id: "spp_public_harbours",  // used by filter to get correct layer
                    filterable: true,
                    visible: true
                })
            ]) // end layers
        }) // end layer group
    ],

});
