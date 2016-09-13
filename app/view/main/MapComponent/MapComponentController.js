"use strict";

Ext.define("SppAppClassic.MapComponentController", {
    extend: "Ext.app.ViewController",

    alias: "controller.map",

    requires: [
        "GeoExt.data.store.LayersTree",
        "OL3MapService",
        "LayerService",
        "AuthService"
    ],

    /**
     * show popup with feature infos when a feature is clicked.
     * checks if the clicked pixel contains a feature. if so
     * a popup window with all attributes opens.
     * by default, all visible layers will be tested
    */
    onMapClick: function(evt) {

        var map = OL3MapService.getMap();
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
                return feature;
            }
        );

        var popupWindow = Ext.getCmp("popupWindow");

        if (!popupWindow) {
            //Ext.create("SppAppClassic.store.FeatureInfos");
            popupWindow = Ext.create({xtype: "app-popup"});
        }

        // lazy instanciation of window if click was on a feature
        if (feature) {
            if (AuthService.getUser() !== "guest") {
                popupWindow.updateFeatureInfo(feature);  // TODO: make this a method of MapComponent
            } else {
                popupWindow.updateFeatureInfo(feature, true);
            }

            popupWindow.show();
            // TODO: show popup window next to feature
            //popupPanel.showAt(evt.getXY());

        } else {  // clicked somewhere else
            if (popupWindow !== undefined) {  // in case it got destroyed
                popupWindow.hide();
            }
        }
    },

    /**
     * changes mouse cursor to a "hand" when it's over a feature,
     * to indicate that the feature is clickable
    */
    onPointerMove: function(evt) {
        console.log("pointermove");
        var map = this.getView().map;
        //var pixel = map.getEventPixel(evt.originalEvent);
        var hasFeature = map.forEachFeatureAtPixel(evt.pixel, function() {
            return true;
        });
        if (hasFeature) {
            map.getTarget().style.cursor = "pointer";
        } else {
            map.getTarget().style.cursor = "";
        }
    }
});
