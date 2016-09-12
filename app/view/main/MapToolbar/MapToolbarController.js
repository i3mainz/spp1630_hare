"use strict";

Ext.define("SppAppClassic.MapToolbarController", {
    extend: "Ext.app.ViewController",

    alias: "controller.maptoolbar",

    requires: [
        "AuthService"
    ],

    /**
     * unlocks buttons for registred authorized users
    */
    unlockButtons: function() {
        if (!AuthService.isAuthorized()) {  // development setting
            var buttonList = ["filterButton"]; // ["filterButton", "gridButton", "settingsButton"]
            for (var i = 0; i < buttonList.length; i++) {
                var button = Ext.getCmp(buttonList[i]);
                if (button) {
                    button.enable();
                }
            }
        }
    },

    onToggleFilter: function() {
        //var filterPanel = this.lookupReference("filterpanel");  // not working
        var filterPanel = Ext.getCmp("filterPanel");

        if (!filterPanel) {  // lazy instantiation
            var mainPanel = Ext.getCmp("mainpanel");

            // create filterpanel as item of main panel
            mainPanel.add([{
                xtype: "filterpanel",
                region: "west",
                margin: "0 5 0 0"
            }]);
            //filterPanel = Ext.create("SppAppClassic.view.main.filter.FilterPanel");
            //filterPanel.anchorTo(Ext.getBody(),'t-t',[-100,0]);
            //filterPanel.alignTo(Ext.getBody(), "tr-tr");
            //filterPanel.alignTo(Ext.getBody(), "tr");
        } else if (filterPanel.getCollapsed()) {  // is collapsed
            filterPanel.setCollapsed(false);
        } else {
            filterPanel.setCollapsed(true);
        }
        //filterPanel.toggle();
        //filterPanel.show()
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
