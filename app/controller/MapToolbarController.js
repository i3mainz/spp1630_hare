"use strict";

Ext.define("SppAppClassic.MapToolbarController", {
    extend: "Ext.app.ViewController",
    alias: "controller.map-toolbar",

    requires: [
        // Ext.getCmp(= dont need to be required?
            // but they are if you create new object using Ext.create()
        //"SppAppClassic.view.main.GridWindow",
        "SppAppClassic.view.main.FilterPanel",
        //"SppAppClassic.view.main.SettingsPanel",
        //"SppAppClassic.view.main.InfoTabPanel",
        "AuthService"
    ],

    // define listeners here instead of the view.
    // keeps view and controller logic seperated
    control: {
        "#": {
            beforeRender: "unlockButtons"  // unlock buttons on start
        }
    },

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
        console.log("center in!");
        var view = Ext.getCmp("geoextMap").getView();
        view.setCenter(ol.proj.fromLonLat([8.751278, 50.611368]));
        view.setZoom(4);
        view.setRotation(0);
    },

    /*onRotate: function() {
        console.log("rotate!");
        var view = Ext.getCmp("geoextMap").getView();
        var currentRotation = view.getRotation();
        console.log(currentRotation);
        Ext.getCmp("geoextMap").getView().setRotation(currentRotation + 0.5);
    },*/
    /*onToggleHover: function() {
        console.log("toggle hover!");
        var interactions = OL3Map.map.getInteractions();
        var selectInteraction;
        interactions.forEach(function(interaction) {
            if (interaction instanceof ol.interaction.Select) {
                selectInteraction = interaction;
            }
        });
        // toogle on
        if (selectInteraction) {
            OL3Map.map.removeInteraction(selectInteraction);
            //Ext.getCmp("hoverButton").setText("end hover");
        // toogle off
        } else {
            var newInteraction = new ol.interaction.Select({
                condition: ol.events.condition.pointerMove  // empty -> select on click
            });
            OL3Map.map.addInteraction(newInteraction);
            //Ext.getCmp("hoverButton").setText("start hover");
        }
    },*/

    onToggleFilter: function() {
        //var filterPanel = this.lookupReference("filterpanel");  // not working
        var filterPanel = Ext.getCmp("filterPanel");

        if (!filterPanel) {  // lazy instantiation
            var mainPanel = Ext.getCmp("mainPanel");

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

    onGridClick: function() {
        //var gridPanel = this.lookupReference("gridpanel");
        var gridPanel = Ext.getCmp("gridWindow");

        if (!gridPanel) {
            gridPanel = Ext.create("SppAppClassic.view.main.GridWindow");
        }
        //filterPanel.toggle();

        if (gridPanel.isHidden()) {
            gridPanel.show();
        } else {
            gridPanel.hide();
        }
    },

    onToggleSettings: function() {
        //var filterPanel = this.lookupReference("filterpanel");  // not working
        var panel = Ext.getCmp("settingsPanel");
        //var main = Ext.getCmp("mainPanel");
        //console.log(main);

        if (!panel) {  // lazy instantiation
            panel = Ext.create("SppAppClassic.view.main.Settings.SettingsPanel");
        }
        if (panel.isHidden()) {
            panel.show();
        } else {
            panel.hide();
        }
    },

    /**
     * unlocks buttons for registred authorized users
    */
    unlockButtons: function() {
        if (AuthService.isAuthorized()) {
            var buttonList = ["filterButton", "gridButton", "settingsButton"];
            for (var i = 0; i < buttonList.length; i++) {
                var button = Ext.getCmp(buttonList[i]);
                if (button) {
                    button.enable();
                }
            }
        }
    }
});
