"use strict";
// collection of shared data
// not really a class
var GEOSERVER_URL = "http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?";  // global variable -> bad practice
var PROXY_URL = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";

Ext.define('Layers', {
	/* singleton classes get created when they are defined. no need to Ext.create them.
	access them via the class-name directly. e.g. LayerStyles.bluePoints
	variable is globally available */

    singleton: true,

   
    // access layers

	open: new ol.layer.Vector({
        source: new ol.source.Vector({
	        format: new ol.format.GeoJSON(),
	        url: function(extent, resolution, projection) {
	            return PROXY_URL + 
	                    "bereich=" + "SPP" + 
	                    "&layer=" + "v_public_offen" + 
	                    "&bbox=" + extent.join(',') + 
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
          url: "http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?",
          params: {'LAYERS': "SPP:v_public_agintern", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "AG only",
        visible: false
    }),

    lakes: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: "http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?",
          params: {'LAYERS': "SPP:lakes", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Lakes",
        visible: false
    }),

    streams: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:streams", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Streams",
        visible: false
    }),

    aqueducts: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:darmc_aqueducts", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Aqueducts",
        visible: false
    }),

    bridges: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:darmc_bridges", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Bridges",
        visible: false
    }),

    roads: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:darmc_roads", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Roads",
        visible: false
    }),

    cities: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:darmc_cities", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Cities",
        visible: false
    }),

    baths: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:darmc_baths", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Baths",
        visible: false
    }),

    ports: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:darmc_ports", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Ports",
        visible: false
    }),

    harbours: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:darmc_harbours", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Harbours",
        visible: false
    }),

    canals: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:darmc_canals", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Canals",
        visible: false
    }),

    // Basemaps
    world: new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': "SPP:world_borders_simple", 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        name: "Simple World Borders",
        visible: false
    }),

    watercolor: new ol.layer.Tile({
        source: new ol.source.Stamen({
            layer: 'watercolor',
            wrapX: false
        }),
        name: "Stamen Watercolor",
        visible: false
    }),

    mapquest: new ol.layer.Tile({
        source: new ol.source.MapQuest(
        	{
        		layer: 'sat', 
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
            url: 'http://ows.terrestris.de/osm-gray/service',
            params: {'LAYERS': 'OSM-WMS', 'TILED': true},
            wrapX: false
        }),
        name: "OSM gray",
        visible: true
    })
}); 
