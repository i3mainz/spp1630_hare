"use strict";

Ext.define("OL3MapService", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    requires: [
        //"LayerStyles"
        "LayerGroups",
        ////"layerStyles",
        //"Projects"
    ],

    map: new ol.Map({
        layers: [
            LayerGroups.basemaps,
            LayerGroups.hydrology,
            LayerGroups.darmc
        ],  // get laoded dynamically in MapController
        controls: [
            new ol.control.ScaleLine(),
            new ol.control.Attribution()
        ],

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
            zoom: 4,  // 2,
            minZoom: 3  // prevents zoom too far out
            //restrictedExtent: new ol.extent(-180, -90, 180, 90)  // prevents going over 'edge' of map
        })
    }),

    /*
     * returns the OpenLayers 3 map object
     */
    getMap: function() {
        return this.map;
    }

});
