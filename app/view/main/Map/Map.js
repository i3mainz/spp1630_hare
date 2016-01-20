"use strict";

var olMap = new ol.Map({
    layers: [],  // get laoded dynamically in MapController
    controls: [
        new ol.control.ScaleLine()
    ],
    // ol.control.defaults().extend(  // keeps default controls

    interactions: ol.interaction.defaults().extend([
        // highlight features on hover, click events are seperate -> this is just highlight
        new ol.interaction.Select({
            condition: ol.events.condition.pointerMove  // empty -> select on click
        })
    ]),

    // renderer: CANVAS,
    // Improve user experience by loading tiles while dragging/zooming. Will make
    // zooming choppy on mobile or slow devices.
    //loadTilesWhileInteracting: true,

    view: new ol.View({
        center: ol.proj.fromLonLat([8.751278, 50.611368]),  // [0, 0],
        zoom: 5,  // 2,
        minZoom: 3  // prevents zoom too far out
        //restrictedExtent: new ol.extent(-180, -90, 180, 90)  // prevents going over 'edge' of map
    })
});

/*var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
    layerGroup: olMap.getLayerGroup()
    //layerGroup: Ext.getCmp("geoextMap").map.getLayerGroup()
    //layerGroup: OL3Map.map.getLayerGroup()
});*/

Ext.define("SppAppClassic.view.main.Map", {
    extend: "Ext.panel.Panel",

    xtype: "mappanel",

    requires: [
        "SppAppClassic.view.main.MapController",
        "SppAppClassic.view.main.Map.Toolbar",  // xtype: "maptoolbar"
        "SppAppClassic.view.main.Map.GeoExtMap" // xtype: "geoextmap"
    ],

    controller: "main-map",

    layout: "border",
    title: "Map",
    dockedItems: {
        xtype: "maptoolbar"
    },

    items: [{
        xtype: "geoextmap",
        region: "center",
        id: "geoextMap",
        map: olMap
    }],

    listeners: {
        render: function(panel) {
            // add custom click event
            panel.body.on("click", function(evt) {
                // add attribute pixel to event object like in OL3 click event
                // this way, the code in the click function works with
                // both, ExtJs and with direct Ol3 events
                evt.pixel = [evt.browserEvent.layerX, evt.browserEvent.layerY];
                // provide event as parameter, it is used later to get pixel
                Ext.getCmp("geoextMap").fireEvent("click", evt);
                //this.fireEvent("clickpanel");  // adds event to mappanel not this panel
            });

            // add custom event for mouse movement
            panel.body.on("pointermove", function(evt) {
                evt.pixel = [evt.browserEvent.layerX, evt.browserEvent.layerY];
                Ext.getCmp("geoextMap").fireEvent("pointermove", evt);
            });
        }
    }
});
