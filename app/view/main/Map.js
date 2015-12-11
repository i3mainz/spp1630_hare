"use strict";
var GEOSERVER_URL = "http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?";
var MAP_CENTER = ol.proj.fromLonLat([8.751278, 50.611368]);

function getLegendUrl(layer_name) {
    return GEOSERVER_URL + "REQUEST=GetLegendGraphic&" + 
        "VERSION=1.0.0&" + 
        "FORMAT=image/png&" + 
        "WIDTH=50&HEIGHT=50&" + 
        "TRANSPARENT=true&" +
        "LAYER=" + layer_name + "&" + 
        "LEGEND_OPTIONS=" + 
            "fontName:arial;" + 
            "dpi:180";
}

// tODO put that into controller
function createOL3Layer(layername, displayname, visible, zIndex) {
    zIndex = zIndex || 0;  // set default
    visible = visible || false;  // set default
    var layer = new ol.layer.Tile({
        //extent: [-13884991, 2870341, -7455066, 6338219],
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': layername, 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        legendUrl: getLegendUrl(layername),  // through plugin
        name: displayname,
        visible: visible
    });
    return layer;
}
// tODO put that into controller
function createOL3VectorLayerFromGeoJson(layername, displayname, style, visible) {
    // "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?bereich=SPP&layer=road&bbox=-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562&epsg=4326"
    visible = visible || false;  // set default to zero
    var PROXY_URL = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
    var workspace = layername.split(":")[0];
    var layer = layername.split(":")[1];
    //var BBOX = "-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562";
    var EPSG = "4326";

    var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: function(extent, resolution, projection) {
            return PROXY_URL + 
                    "bereich=" + workspace + 
                    "&layer=" + layer + 
                    "&bbox=" + extent.join(',') + 
                    "&epsg=" + EPSG;
        },
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
            maxZoom: 19
        })),
        wrapX: false  // dont repeat on X axis
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        //legendUrl: getLegendUrl(layername),  // gets legend from geoserver -> is wrong when 
        // used as GeoJSON and applied new style 
        style: style,
        name: displayname,
        visible: visible 
    });
    //console.log(vectorLayer instanceof ol.layer.Vector);
    return vectorLayer;
}
// tODO put that into controller
function createVectorSource(layername) {
    // "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?bereich=SPP&layer=road&bbox=-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562&epsg=4326"
    var PROXY_URL = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
    var workspace = layername.split(":")[0];
    var layer = layername.split(":")[1];
    //var BBOX = "-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562";
    var EPSG = "4326";

    var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: function(extent, resolution, projection) {
            return PROXY_URL + "bereich=" + workspace + "&layer=" + layer + "&bbox=" + extent.join(',') + "&epsg=" + EPSG;
        },
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
            maxZoom: 19
        }))
    });

    return vectorSource;
}
// tODO put that into controller
function getFeatureInfoHtml(olFeature) {
    var html = "";
    var attributes = olFeature.getKeys();
    attributes.forEach(function(attribute, i) {
        html +="<strong>" + attribute + ": </strong>" + olFeature.get(attribute) + "<br>";
    });
    return html;
}


var access = new ol.layer.Group({
    layers: [
        Layers.open,  // layerStyles is singleton class
        Layers.agOnly
    ],
    name: "SPP: Access",
    visible: true
});

var query = new ol.layer.Group({
    layers: [],
    name: "SPP: Query",
    visible: false
});

var statusGroup = new ol.layer.Group({
    layers: [],
    name: "SPP: Status",
    visible: false
});

var projects = new ol.layer.Group({
    layers: [],
    name: "SPP: Projects",
    visible: false
});

var hydrology = new ol.layer.Group({
    layers: [
        Layers.lakes,  // legends dont work
        Layers.streams
    ],
    name: "Hydrology",
    visible: false
});

var barrington = new ol.layer.Group({
    layers: [
        //createOL3VectorLayerFromGeoJson("barr_ports", "Barr_Ports", blueStyle),
        createOL3VectorLayerFromGeoJson("SPP:aqueduct", "Aqueducts", LayerStyles.redPoints),
        //createOL3VectorLayerFromGeoJson("SPP:bridge", "Bridges", redStyle),
        //bridgeLayer,
        createOL3VectorLayerFromGeoJson("SPP:bath", "Baths", LayerStyles.redPoints),
        createOL3VectorLayerFromGeoJson("SPP:settlement", "Settlements", LayerStyles.redPoints, false),
        createOL3VectorLayerFromGeoJson("SPP:canal", "Canals", LayerStyles.redPoints),
        createOL3VectorLayerFromGeoJson("SPP:road", "Roads", LayerStyles.redLines)
    ],
    name: "Barrington Atlas",
    visible: false
});

var darmc = new ol.layer.Group({
    layers: [
        Layers.aqueducts,
        Layers.bridges,
        Layers.roads,
        Layers.cities,
        Layers.baths,
        Layers.ports,
        Layers.harbours,
        Layers.canals
    ],
    name: "DARMC",
    visible: false
});

// sort using OL3 groups
var baselayers = new ol.layer.Group({
    layers: [
        Layers.world,
        Layers.watercolor,
        Layers.mapquest,
        Layers.osm,
        Layers.osmGray
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

var interactions = ol.interaction.defaults().extend([
    // highlight features on hover, click events are seperate -> this is just highlight
    new ol.interaction.Select({
        condition: ol.events.condition.pointerMove  // empty -> select on click
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
    interactions: interactions,
    
    // renderer: CANVAS,
    // Improve user experience by loading tiles while dragging/zooming. Will make
    // zooming choppy on mobile or slow devices.
    //loadTilesWhileInteracting: true,

    view: new ol.View({
        center: MAP_CENTER,  // [0, 0],
        zoom: 5,  // 2,
        minZoom: 3  // prevents zoom too far out
        //restrictedExtent: new ol.extent(-180, -90, 180, 90)  // prevents going over 'edge' of map
    })
});

var mapToolbar = Ext.create('Ext.Toolbar', {
    requires: [
        "SppAppClassic.view.main.CenturySlider"
    ],
    items: [
        {text: 'Zoom In', glyph: "xf00e@FontAwesome", handler: "zoomIn"},
        {text: 'Zoom Out', glyph: "xf010@FontAwesome", handler: "zoomOut"},
        //{text: 'rotate!', glyph: "xf0e2@FontAwesome", handler: "onRotate"},
        {text: 'maxExtent', glyph:'xf0b2@FontAwesome', handler: "onCenter"},
        //{xtype: "multislider"},
        {
            xtype: "centuryslider",
            reference: "slider",
            listeners: {
                changecomplete: 'onSliderChangeComplete'
            } 
        }
        /*
        {
            xtype: 'button',
            id: 'hoverButton',  // to reference it in controller
            text : 'hover',
            glyph: 'xf129@FontAwesome',
            enableToggle: true,
            pressed: true,
            handler: "onToggleHover"
        },
        */
        //slider
        //{text: 'fullscreen', handler: "fullscreen"}
    ]
});


//var popupPanel = Ext.create("SppAppClassic.view.main.Popup");
var mapComponent = Ext.create("GeoExt.component.Map", {
    reference: "geoextMap",
    map: olMap
});

// show popup when feature is clicked or hide if not
olMap.on("click", function(evt) {
    var coordinate = evt.coordinate;  // needed to place popup
        
    // check if click was on a feature
    // by default, all visible layers will be tested
    var feature = olMap.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
            //console.log(feature.getKeys());
            return feature;
    });

    var popup = Ext.getCmp('popupWindow');
    if (feature) {   // clicked on feature
        popup.setHtml('<p>' + getFeatureInfoHtml(feature) + '</p>');
        popup.show();
        // TODO: show popup window next to feature 
        //popupPanel.showAt(evt.getXY());

    } else {  // clicked somewhere else
        if (popup !== undefined) {  // in case it got destroyed
            popup.hide();
        }
    } 
});

// change cursor when feature is clickable
olMap.on("pointermove", function(evt) {
    var pixel = olMap.getEventPixel(evt.originalEvent);
    var hasFeature = olMap.forEachFeatureAtPixel(pixel, function(feature, layer) {
        return true;
    });
    if (hasFeature) {
        olMap.getTarget().style.cursor = 'pointer';
    } else {
        olMap.getTarget().style.cursor = '';
    }   
});


var mapPanel = Ext.create('Ext.panel.Panel', {
    region: "center",
    title: "Map",
    layout: "fit",
    items: [mapComponent],
    dockedItems: mapToolbar,

    listeners: {
        click: "onMapClick",
        itemclick: "onMapClick"  // clicked on one of items -> mapComponent
    }
});

var treeStore = Ext.create('GeoExt.data.store.LayersTree', {
    layerGroup: olMap.getLayerGroup()
});

//console.log(treeStore);
var layerTreePanel = Ext.create('SppAppClassic.view.main.LayerTree', {
    title: "Layers"
});
layerTreePanel.setStore(treeStore);

//console.log(layerTreePanel.getTitle());

//layerTreePanel.setStore(treeStore);

Ext.define("SppAppClassic.view.main.Map",{
    extend: "Ext.panel.Panel",
    
    xtype: 'mappanel',  // alias for future reference
    
    requires: [
        "SppAppClassic.view.main.MapController",
        "SppAppClassic.view.main.MapModel",
        "SppAppClassic.view.main.LayerTree",  // required tp load xtype
        "LayerStyles",  // singleton -> not sure if needed
        "Layers"  // singleton -> not sure if needed
    ],
    
    controller: "main-map",
    
    viewModel: {
        type: "main-map"
    },
    layout: "border",
    items: [
        layerTreePanel,
        mapPanel
    ]
});
