"use strict";

Ext.define("SppAppClassic.MapToolbarController", {
    extend: "Ext.app.ViewController",

    alias: "controller.maptoolbar",

    requires: [
        "AuthService",
        "SppAppClassic.main.FilterPanel"
    ],

    // Toolbar methods
    zoomIn: function() {
        var view = Ext.getCmp("geoextMap").getView();
        var currentZoom = view.getZoom();
        view.setZoom(currentZoom + 1);
    },

    zoomOut: function() {
        var view = Ext.getCmp("geoextMap").getView();
        var currentZoom = view.getZoom();
        view.setZoom(currentZoom - 1);
    },

    /* zoomTomax extend -> get Center of map on start of app.
    then set farthest zoom level */
    onCenter: function() {
        var view = Ext.getCmp("geoextMap").getView();
        view.setCenter(ol.proj.fromLonLat([8.751278, 50.611368]));
        view.setZoom(4);
        view.setRotation(0);
    }

});
