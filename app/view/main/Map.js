"use strict";

var MAP_CENTER = ol.proj.fromLonLat([8.751278, 50.611368]);

// tODO put that into controller
function getFeatureInfoHtml(olFeature) {
    var html = "";
    var attributes = olFeature.getKeys();
    attributes.forEach(function(attribute, i) {
        html +="<strong>" + attribute + ": </strong>" + olFeature.get(attribute) + "<br>";
    });
    return html;
}



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
        LayerGroups.baselayers,
        LayerGroups.darmc,
        LayerGroups.barrington,
        LayerGroups.hydrology,
        LayerGroups.projects,
        LayerGroups.statusGroup,
        LayerGroups.query,
        LayerGroups.access
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
        "LayerGroups"  // singleton -> not sure if needed
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
