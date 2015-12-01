var GEOSERVER_URL = "http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?";

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


/*
var bridgesLayer = createOL3Layer("SPP:darmc_bridges", "Bridges!");
bridgesLayer.setZIndex(2);
olMap.addLayer(bridgesLayer);

var aqueductsLayer = createOL3Layer("SPP:darmc_aqueducts", "Aqueducts!");
bridgesLayer.setZIndex(1);
olMap.addLayer(aqueductsLayer);
*/

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

var hydrology = new ol.layer.Group({
    layers: [
        createOL3Layer("SPP:lakes", "Lakes"),
        createOL3Layer("SPP:streams", "Streams")
    ],
    name: "Hydrology",
    visible: false
});

var barrington = new ol.layer.Group({
    layers: [
        createOL3Layer("SPP:aqueduct", "Aqueducts"),
        createOL3Layer("SPP:bath", "Baths"),
        createOL3Layer("SPP:bridge", "Bridges"),
        createOL3Layer("SPP:port", "Ports"),
        createOL3Layer("SPP:canal", "Canals"),
        createOL3Layer("SPP:settlement", "Settlements"),
        createOL3Layer("SPP:road", "Roads")
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

var controls = ol.control.defaults().extend([  // keeps default controls
    new ol.control.FullScreen(),
    new ol.control.ScaleLine(),
    new ol.control.ZoomToExtent({
        extent:undefined
    })
]);

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
        //center: [0, 0],
        //zoom: 2
        center: ol.proj.fromLonLat( [8.751278, 50.611368] ),
        zoom: 5
    })
});

var mapToolbar = Ext.create('Ext.Toolbar', {
    items: [
        // todo create functions and remove strings
        {text: 'add/remove', handler: "addRemoveLayer"},
        //{text: 'export as PNG', glyph:'xf03e@FontAwesome', handler: "exportMap"},  // handler defined in MapController.js
        //{text: 'fullscreen', glyph: "xf065@FontAwesome", handler: "fullscreen" },
        {text: 'coordinates!', handler: "calcCoordinates"},
        //{text: 'pan', glyph:'xf047@FontAwesome', handler: ""},
        {text: 'maxExtend', glyph:'', handler: onZoomToMaxExtent1}
        //{text: 'legendurl', handler: "updateLegendUrl"}
    ]
});

var treeStore = Ext.create('GeoExt.data.store.LayersTree', {
    layerGroup: olMap.getLayerGroup()
});

var treePanel = Ext.create('Ext.tree.Panel', {
    region: "west",
    title: 'Layers',
    viewConfig: {
        plugins: { ptype: 'treeviewdragdrop' }
    },
    store: treeStore,
    rootVisible: false,
    //flex: 1,
    width: 200,
    //lines: false,
    collapsible: true,
    //autoScroll: false,
    //border: false
    split: true
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

// TODO -> put this in Controller
function onZoomToMaxExtent1() {
    "use strict";
    console.log("zooming to maximum extend new!");
    var max_extend = olMap.getSize();
    olMap.setCenter(ol.proj.fromLonLat( [8.751278, 50.611368] ));
    //olMap.getView().fitExtent(olMap.getSize());
}