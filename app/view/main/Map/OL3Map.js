"use strict";
var MAP_CENTER = ol.proj.fromLonLat([8.751278, 50.611368]);

// ol.control.defaults().extend(  // keeps default controls
var controls = [

    //new ol.control.FullScreen(),
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

// tODO put that into controller
function getFeatureInfoHtml(olFeature) {
    var html = "";
    var attributes = olFeature.getKeys();
    attributes.forEach(function(attribute) {
        html += "<strong>" + attribute + ": </strong>" + olFeature.get(attribute) + "<br>";
    });
    return html;
}

// just a placeholder class that contains the OpenLayers3 Map object
// has a single variable: "map" that holds the OL object
// better practice than using a global variable
Ext.define("OL3Map", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    //xtype: "ol3map",
    reference: "ol3map",

    requires: ["LayerGroups"],

    map: new ol.Map({
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
    })
});

// show popup when feature is clicked or hide if not
OL3Map.map.on("click", function(evt) {

    //var coordinate = evt.coordinate;  // needed to place popup

    // check if click was on a feature
    // by default, all visible layers will be tested
    var feature = OL3Map.map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
            //console.log(feature.getKeys());
            return feature;
        }
    );

    var popup = Ext.getCmp("popupWindow");
    if (feature) {   // clicked on feature
        popup.setHtml("<p>" + getFeatureInfoHtml(feature) + "</p>");
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

OL3Map.map.on("pointermove", function(evt) {
    var pixel = OL3Map.map.getEventPixel(evt.originalEvent);
    var hasFeature = OL3Map.map.forEachFeatureAtPixel(pixel, function() {
        return true;
    });
    if (hasFeature) {
        OL3Map.map.getTarget().style.cursor = "pointer";
    } else {

        OL3Map.map.getTarget().style.cursor = "";

    }
});
