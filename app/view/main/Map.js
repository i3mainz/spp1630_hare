"use strict";
var GEOSERVER_URL = "http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?";
var MAP_CENTER = ol.proj.fromLonLat([8.751278, 50.611368]);

/**
 * A plugin for Ext.grid.column.Column s that overwrites the internal cellTpl to
 * support legends.
 */
Ext.define('BasicTreeColumnLegends', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.basic_tree_column_legend',

    /**
     * @private
     */
    originalCellTpl: Ext.clone(Ext.tree.Column.prototype.cellTpl).join(''),

    /**
     * The Xtemplate strings that will be used instead of the plain {value}
     * when rendering
     */
    valueReplacementTpl: [
        '{value}',
        '<tpl if="this.hasLegend(values.record)"><br />',
        '<tpl for="lines">',
        '<img src="{parent.blankUrl}"',
        ' class="{parent.childCls} {parent.elbowCls}-img ',
        '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>"',
        ' role="presentation"/>',
        '</tpl>',
        '<img src="{blankUrl}" class="{childCls} x-tree-elbow-img">',
        '<img src="{blankUrl}" class="{childCls} x-tree-elbow-img">',
        '<img src="{blankUrl}" class="{childCls} x-tree-elbow-img">',
        '{[this.getLegendHtml(values.record)]}',
        '</tpl>'
    ],

    /**
     * The context for methods available in the template
     */
    valueReplacementContext: {
        hasLegend: function(rec){
            var isChecked = rec.get('checked');
            var layer = rec.data;
            return isChecked && !(layer instanceof ol.layer.Group);
        },
        getLegendHtml: function(rec){
            var layer = rec.data;
            var legendUrl = layer.get('legendUrl');
            if (!legendUrl) {
                legendUrl = "http://geoext.github.io/geoext2/" +
                    "website-resources/img/GeoExt-logo.png";
            }
            return '<img class="legend" src="' + legendUrl + '" height="32" />';
        }
    },

    init: function(column){
        var me = this;
        if(!(column instanceof Ext.grid.column.Column)) {
            Ext.log.warn("Plugin shall only be applied to instances of" +
                    " Ext.grid.column.Column");
            return;
        }
        var valuePlaceHolderRegExp = /\{value\}/g;
        var replacementTpl = me.valueReplacementTpl.join('');
        var newCellTpl = me.originalCellTpl.replace(
            valuePlaceHolderRegExp, replacementTpl
        );

        column.cellTpl = [
            newCellTpl,
            me.valueReplacementContext
        ];
    }
});

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

var bridgeSource = createVectorSource("SPP:bridge");
var bridgeLayer = new ol.layer.Vector({
    source: bridgeSource,
    style: redStyle,
    name: "bridgeTest",
    visible: false 
});

var barrington = new ol.layer.Group({
    layers: [
        //createOL3VectorLayerFromGeoJson("barr_ports", "Barr_Ports", blueStyle),
        createOL3VectorLayerFromGeoJson("SPP:aqueduct", "Aqueducts", redStyle),
        //createOL3VectorLayerFromGeoJson("SPP:bridge", "Bridges", redStyle),
        bridgeLayer,
        createOL3VectorLayerFromGeoJson("SPP:bath", "Baths", redStyle, true),
        createOL3VectorLayerFromGeoJson("SPP:settlement", "Settlements", redStyle, false),
        createOL3VectorLayerFromGeoJson("SPP:canal", "Canals", redStyle),
        createOL3VectorLayerFromGeoJson("SPP:road", "Roads", redLineStyle)
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
        createOL3Layer("SPP:world_borders_simple", "Simple World Borders"),
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'watercolor',
                wrapX: false
            }),
            name: "Stamen Watercolor",
            visible: false
        }),
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat', wrapX: false}),
            name: "MapQuest Satelite",
            visible: false
        }),
        new ol.layer.Tile({
          source: new ol.source.OSM({wrapX: false}),
          name: "OSM",
          visible: false  // not activated on start
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://ows.terrestris.de/osm-gray/service',
                params: {'LAYERS': 'OSM-WMS', 'TILED': true},
                wrapX: false
            }),
            name: "OSM gray",
            visible: true
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

var slider = Ext.create('Ext.slider.Multi', {
    //renderTo: 'multi-slider-horizontal',
    hideLabel: true,
    width: 200,
    //increment: 10,
    minValue: 0,
    maxValue: 9,
    useTips: true,  // show toolptips, default: true

    tipText: function(thumb){
        var choices = [
            '4th Century',  // 0
            '5th Century',
            '6th Century',
            '7th Century',
            '8th Century',
            '9th Century',
            '10th Century',
            '11th Century',
            '12th Century',
            '13th Century'  // 9
        ];
        var value = Ext.String.format(choices[thumb.value]);
        return value;
    },
    //constrainThumbs: true,
    values: [0, 9],
    listeners: {  
        changecomplete: 'onSliderChangeComplete'
    }
});

var mapToolbar = Ext.create('Ext.Toolbar', {
    items: [
        {text: 'Zoom In', glyph: "xf00e@FontAwesome", handler: "zoomIn"},
        {text: 'Zoom Out', glyph: "xf010@FontAwesome", handler: "zoomOut"},
        {text: 'rotate!', glyph: "xf0e2@FontAwesome", handler: "onRotate"},
        {text: 'maxExtent', glyph:'xf0b2@FontAwesome', handler: "onCenter"},
        
        {
            xtype: 'button',
            id: 'hoverButton',  // to reference it in controller
            text : 'hover',
            glyph: 'xf129@FontAwesome',
            enableToggle: true,
            pressed: true,
            handler: "onToggleHover"
        },
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
    border: false,
    hideHeaders: true,
    region: "west",
    //flex: 1,
    lines: false,
    autoScroll: true,
    margin: "0 5 0 0",
    //border: false
    split: false,

    // display legend
    columns: {
        header: false,
        items: [{
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1,
            plugins: [{
                ptype: 'basic_tree_column_legend'
            }]
        }]
    },

    // alternative to treePanel.on('select', function())
    listeners: {  
        // refresh legend every time a node is selected
        //checkchange: 'onNodeCheckChange' // defined in MapController
    }
});

/*
// used on mapComponentListener
var popup = Ext.create('GeoExt.component.Popup', {
    map: olMap,
    width: 140
});
*/
var mapComponent = Ext.create("GeoExt.component.Map", {
    map: olMap,
});

var popup = Ext.create('GeoExt.component.Popup', {
    map: olMap,
    width: 140,
    border: 3,
    //alwaysOnTop: true
    //height: 200,
    //padding: 20,
    //draggable: true, 
    style: {
        color: '#000000',
        backgroundColor: '#FFFFFF',
        opacity: 0.8
    },
    listeners: {
        click: function() {
            console.log('click on popup!');  // not working right now
        }
    } 
});

// show popup when feature is clicked or hide if not
olMap.on("click", function(evt) {
    var coordinate = evt.coordinate;  // needed to place popup
    

    // check if click was on a feature
    var feature = olMap.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
            return feature;
    });

    if (feature) {   // clicked on feature
        popup.setHtml('<p><strong>clicked!!!!</strong>' +
        '<br /><code>' + "hello! :D" + '</code></p>');
        popup.position(coordinate);
        popup.show();

    } else {  // clicked somewhere else
        popup.hide();
    } 
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

/*
// this updates multiple times since it's only loading what is needed
bridgeSource.on('change', function(evt){
    var source = evt.target;
    if (source.getState() === 'ready') {
        var numFeatures = source.getFeatures().length; 
        console.log("Count after change: " + numFeatures);
    }
});
*/
