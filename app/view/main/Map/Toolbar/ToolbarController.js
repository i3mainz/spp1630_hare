"use strict";

Ext.define("SppAppClassic.view.main.Map.Toolbar.ToolbarController", {
    extend: "Ext.app.ViewController",
    alias: "controller.map-toolbar",

    requires: [
        "SppAppClassic.view.main.GridWindow",
        "SppAppClassic.view.main.Filter.FilterPanel"
    ],

    zoomIn: function() {
        console.log("zoom in!");
        var view = OL3Map.map.getView();
        var currentZoom = view.getZoom();
        view.setZoom(currentZoom + 1);
    },
    zoomOut: function() {
        console.log("zoom out!");
        var view = OL3Map.map.getView();
        var currentZoom = view.getZoom();
        view.setZoom(currentZoom - 1);
    },
    zoomAnimated: function() {

       var zoom = ol.animation.zoom({duration: 500, resolution: OL3Map.map.getView().getResolution()});
       //olMap.beforeRender(zoom);
       OL3Map.map.getView().setZoom(zoom);
    },

    /* zoomTomax extend -> get Center of map on start of app. 
    then set farthest zoom level */
    onCenter: function() {
        console.log("center in!");
        var view = OL3Map.map.getView();
        view.setCenter(MAP_CENTER);
        view.setZoom(4);
        view.setRotation(0);
    },
    onRotate: function() {
        console.log("rotate!");
        var view = OL3Map.map.getView();
        var currentRotation = view.getRotation();
        console.log(currentRotation);
        OL3Map.map.getView().setRotation(currentRotation + 0.5);
    },
    onToggleHover: function() {
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
    },

    onToggleFilter: function() {
        //var filterPanel = this.lookupReference("filterpanel");  // not working
        var filterPanel = Ext.getCmp("filterPanel");
        //var main = Ext.getCmp("mainPanel");
        //console.log(main);

        if (!filterPanel) {  // lazy instantiation
            filterPanel = Ext.create("SppAppClassic.view.main.Filter.FilterPanel");
            //filterPanel.anchorTo(Ext.getBody(),'t-t',[-100,0]);
            //filterPanel.alignTo(Ext.getBody(), "tr-tr");
            //filterPanel.alignTo(Ext.getBody(), "tr");
        }

        if (filterPanel.isHidden()) {
            filterPanel.show();
        } else {
            filterPanel.hide();
        }

        //filterPanel.toggleCollapse();  // not show, because it already exists
    },

    onGridClick: function() {
        //var gridPanel = this.lookupReference("gridpanel");
        var gridPanel = Ext.getCmp("gridWindow");

        if (!gridPanel) {
            gridPanel = Ext.create("SppAppClassic.view.main.GridWindow");
        }
        if (gridPanel.isHidden()) {
            gridPanel.show();
        } else {
            gridPanel.hide();
        }
    },

    /**
     * lock grid and filter buttons is user is logged in as guest.
     * this prevents the user from accessing ag or spp intern data via 
     * filter queries.
    */
    hideButtonsForGuest: function() {
        console.log("cookie: " + Ext.util.Cookies.get("sppCookie"));
        if (Ext.util.Cookies.get("sppCookie") === "guest") {
            Ext.getCmp("filterButton").disable();
            Ext.getCmp("gridButton").disable();
        }
    }
});
