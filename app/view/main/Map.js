
var GEOSERVER_URL = "http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?";

var layers = [
    new ol.layer.Tile({
        source: new ol.source.Stamen({
            layer: 'watercolor'
        }),
        name: "Stamen Watercolor"
    }),
    new ol.layer.Tile({
        source: new ol.source.Stamen({
            layer: 'terrain-labels'
        }),
        name: "Stamen labels"
    }),
    new ol.layer.Tile({
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': 'spp:darmc_bridges', 'TILED': true},
          serverType: 'geoserver'
        }),
        name: "Bridges"
    })
];

var mapToolbar = Ext.create('Ext.Toolbar', {
    items: [
        // todo create functions and remove strings
        {text: 'add/remove', handler: "addRemoveLayer"},
        {text: 'movetop/bottom', handler: "moveLayer" },
        {text: 'togglevis', handler: "toggleVisibility"},
        {text: 'hide/show', handler: "updateHideInLegend"},
        {text: 'legendurl', handler: "updateLegendUrl"}
    ]
});

var olMap = new ol.Map({
    
    layers: layers,
    
    view: new ol.View({
        //center: [0, 0],
        //zoom: 2
        center: ol.proj.fromLonLat( [8.751278, 50.611368] ),
        zoom: 5
    })
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
    region: "center",
    map: olMap,
    dockedItems: mapToolbar
});

//var mapPanel = Ext.create('Ext.panel.Panel', {}

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
    items: [treePanel, mapComponent]
});
