"use strict";

Ext.define("SppAppClassic.MapToolbarController", {
    extend: "Ext.app.ViewController",

    alias: "controller.maptoolbar",

    requires: [
        "AuthService",
        "SppAppClassic.view.main.FilterPanel"
    ],

    /**
     * unlocks buttons for registred authorized users
    */
    unlockButtons: function() {
        if (AuthService.isAuthorized()) {  // development setting
            var buttonList = ["filterButton"]; // ["filterButton", "gridButton", "settingsButton"]
            for (var i = 0; i < buttonList.length; i++) {
                var button = Ext.getCmp(buttonList[i]);
                if (button) {
                    button.enable();
                }
            }
        }
    },
    //
    onToggleFilter: function() {

        var filterPanel = Ext.getCmp("filterPanel");

        if (!filterPanel) {  // lazy instantiation
            filterPanel = Ext.create({
                xtype: "app-filterpanel",
                region: "west",
                //margin: "0 5 0 0",
                collapsed: false
            });
            // create filterpanel as item of main panel
            Ext.getCmp("mainpanel").add(filterPanel);
        }

        if (filterPanel.getCollapsed()) {  // is collapsed
            filterPanel.setCollapsed(false);
        } else {
            filterPanel.setCollapsed(true);
        }
    },

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

    zoomAnimated: function() {
        var zoom = ol.animation.zoom({duration: 500, resolution: Ext.getCmp("geoextMap").getView().getResolution()});
        //olMap.beforeRender(zoom);
        Ext.getCmp("geoextMap").getView().setZoom(zoom);
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
