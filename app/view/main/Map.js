"use strict";
var GEOSERVER_URL = "http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?";
var GEOSERVER_URL_WMS = "http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?";
var MAP_CENTER = ol.proj.fromLonLat([8.751278, 50.611368]);

// line styles
var blueLineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 255, 1.0)',
        width: 2
    })
});
var redLineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgba(255, 0, 0, 1.0)',
        width: 1
    })
});
var randomStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      size: [52, 52],
      offset: [52, 0],
      opacity: 1,
      scale: 0.25,
      src: '../assets/img/dots.png'
    })
  });
// point styles
var blueStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
            color: '#0099CC'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
        })
    })
});
var redStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
            color: '#8B0000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
        })
    })
});

var selectStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
            color: '#EE0000'
        }),
        stroke: new ol.style.Stroke({
            color: 'gray',
            width: 3
        })
    })
});

// polygon styles
var countryStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: [0, 255, 255, 1]
    }),
    stroke: new ol.style.Stroke({
        color: [127,127,127,1.0],
        width: 1,
        lineJoin: 'round'
    })
});

function createOL3Layer(layername, displayname, visible, zIndex) {
    "use strict";
    zIndex = zIndex || 0;  // set default
    visible = visible || false;  // set default
    var layer = new ol.layer.Tile({
        //extent: [-13884991, 2870341, -7455066, 6338219],
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': layername, 'TILED': true},
          serverType: 'geoserver'
        }),
        name: displayname,
        visible: visible
    });
    return layer;
}

function createOL3VectorLayerFromGeoJson(layername, displayname, style, visible) {
    // "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?bereich=SPP&layer=road&bbox=-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562&epsg=4326"
    visible = visible || false;  // set default to zero
    var PROXY_URL = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
    var WORKSPACE = "SPP";
    //var BBOX = "-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562";
    var EPSG = "4326";

    var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: function(extent, resolution, projection) {
            return PROXY_URL + "bereich=" + WORKSPACE + "&layer=" + layername + "&bbox=" + extent.join(',') + "&epsg=" + EPSG;
        },
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
            maxZoom: 19
        }))
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: style,
        name: displayname,
        visible: visible 
    });
    //console.log(vectorLayer instanceof ol.layer.Vector);
    return vectorLayer;
}


var access = new ol.layer.Group({
    layers: [
        createOL3Layer("SPP:v_public_offen", "Open", true),
        createOL3Layer("SPP:v_public_agintern", "AG only")
    ],
    name: "SPP: Access",
    visible: true
});

var query = new ol.layer.Group({
    layers: [
        //createOL3Layer("SPP:darmc_aqueducts", "Aqueducts!"),
        //createOL3Layer("SPP:darmc_bridges", "Bridges!")
    ],
    name: "SPP: Query",
    visible: false
});

var statusGroup = new ol.layer.Group({
    layers: [
        //createOL3Layer("SPP:darmc_aqueducts", "Aqueducts!"),
        //createOL3Layer("SPP:darmc_bridges", "Bridges!")
    ],
    name: "SPP: Status",
    visible: false
});

var projects = new ol.layer.Group({
    layers: [
        //createOL3Layer("SPP:darmc_aqueducts", "Aqueducts!"),
        //createOL3Layer("SPP:darmc_bridges", "Bridges!")
    ],
    name: "SPP: Projects",
    visible: false
});

var hydrologyLayer1 = createOL3Layer("SPP:lakes", "Lakes");

var hydrology = new ol.layer.Group({
    layers: [
        hydrologyLayer1,
        createOL3Layer("SPP:streams", "Streams")
    ],
    name: "Hydrology",
    visible: false
});

var barrington = new ol.layer.Group({
    layers: [
        //createOL3VectorLayerFromGeoJson("barr_ports", "Barr_Ports", blueStyle),
        createOL3VectorLayerFromGeoJson("aqueduct", "Aqueducts", blueStyle),
        createOL3VectorLayerFromGeoJson("bridge", "Bridges", blueStyle),
        createOL3VectorLayerFromGeoJson("bath", "Baths", blueStyle),
        createOL3VectorLayerFromGeoJson("settlement", "Settlements", blueStyle, false),
        createOL3VectorLayerFromGeoJson("canal", "Canals", blueStyle),
        createOL3VectorLayerFromGeoJson("road", "Roads", redLineStyle)
    ],
    name: "Barrington Atlas",
    visible: false
});

var darmc = new ol.layer.Group({
    layers: [
        createOL3Layer("SPP:darmc_aqueducts", "Aqueducts"),
        createOL3Layer("SPP:darmc_bridges", "Bridges"),
        createOL3Layer("SPP:darmc_roads", "Roads"),
        createOL3Layer("SPP:darmc_cities", "Cities"),
        createOL3Layer("SPP:darmc_baths", "Baths"),
        createOL3Layer("SPP:darmc_ports", "Ports"),
        createOL3Layer("SPP:darmc_harbours", "Harbours"),
        createOL3Layer("SPP:darmc_canals", "Canals")
    ],
    name: "DARMC",
    visible: false
});

// sort using OL3 groups
var baselayers = new ol.layer.Group({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'watercolor'
            }),
            name: "Stamen Watercolor",
            visible: true
        }),
        new ol.layer.Tile({
          source: new ol.source.OSM(),
          name: "OSM",
          visible: false  // not activated on start
        }),
        createOL3Layer("SPP:world_borders_simple", "Simple World Borders"),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://ows.terrestris.de/osm-gray/service',
                params: {'LAYERS': 'OSM-WMS', 'TILED': true}
            }),
            name: "OSM gray",
            visible: false
        })
    ],
    name: "Basemaps"
});

// ol.control.defaults().extend(  // keeps default controls  
var controls = [  
    new ol.control.FullScreen(),
    new ol.control.ScaleLine()
    /*new ol.control.ZoomToExtent({
        extent:undefined
    })*/
];

var olMap = new ol.Map({
    layers: [
        baselayers,
        darmc,
        barrington,
        hydrology,
        projects,
        statusGroup,
        query,
        access
    ],  // these get sorted in geoext3 layertree accordingly
    controls: controls,
    view: new ol.View({
        center: MAP_CENTER,  // [0, 0],
        zoom: 5  // 2
    })
});

var slider = Ext.create('Ext.slider.Multi', {
    //renderTo: 'multi-slider-horizontal',
    hideLabel: true,
    width: 200,
    //increment: 10,
    minValue: 0,
    maxValue: 100,
    //constrainThumbs: true,
    values: [10, 90],
    listeners: {  
        change: 'onSliderChange'
    }
});

var mapToolbar = Ext.create('Ext.Toolbar', {
    items: [
        {text: 'Zoom In', glyph: "xf00e@FontAwesome", handler: "zoomIn"},
        {text: 'Zoom Out', glyph: "xf010@FontAwesome", handler: "zoomOut"},
        {text: 'rotate!', glyph: "xf0e2@FontAwesome", handler: "onRotate"},
        {text: 'maxExtent', glyph:'xf0b2@FontAwesome', handler: "onCenter"},
        slider
        //{text: 'fullscreen', handler: "fullscreen"}
    ]
});

var treeStore = Ext.create('GeoExt.data.store.LayersTree', {
    layerGroup: olMap.getLayerGroup()
});

var treePanel = Ext.create('Ext.tree.Panel', {
    title: 'Layers',
    viewConfig: {
        plugins: { ptype: 'treeviewdragdrop' }
    },
    store: treeStore,
    collapsible: true,
    rootVisible: false,
    fill: true,
    width: 250,
    region: "west",
    //flex: 8
    lines: false,
    autoScroll: true,
    margin: "0 5 0 0",
    //border: false
    split: false,
    listeners: {  // alternative to treePanel.on('select', function())
        
        // refresh legend every time a node is selected
        //checkchange: 'onNodeCheckChange' // defined in MapController
    }
});

var mapComponent = Ext.create("GeoExt.component.Map", {
    map: olMap
});

var mapPanel = Ext.create('Ext.panel.Panel', {
    region: "center",
    title: "Map",
    layout: "fit",
    items: [mapComponent],
    dockedItems: mapToolbar
});

Ext.define("SppAppClassic.view.main.Map",{
    extend: "Ext.panel.Panel",
    
    xtype: 'mappanel',  // alias for future reference
    
    requires: [
        "SppAppClassic.view.main.MapController",
        "SppAppClassic.view.main.MapModel"
    ],
    
    controller: "main-map",
    
    viewModel: {
        type: "main-map"
    },
    layout: "border",
    items: [treePanel, mapPanel]
});
