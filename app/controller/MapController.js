"use strict";

Ext.define("SppAppClassic.view.main.MapController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-map",

    requires: [  // view not needed in requirements
        //"SppAppClassic.view.main.Popup"
        "SppAppClassic.view.main.PopupWindow",
        "SppAppClassic.store.FeatureInfos",
        "OL3MapService"
    ],

    // using lookupReference() instead of refs, see
    // <https://docs.sencha.com/extjs/6.0/application_architecture/view_controllers.html>

    // define listeners here instead of the view.
    // keeps view and controller logic seperated
    /*control: {
        "#": {  // matches the view itself
            //click: "onMapClick",
            //pointermove: "onPointerMove",
            destroy: "onDestroy"
        }
    },*/

    /**
     * show popup with feature infos when a feature is clicked.
     * checks if the clicked pixel contains a feature. if so
     * a popup window with all attributes opens.
     * by default, all visible layers will be tested
    */
    onMapClick: function(evt) {
        // this.map replaces olMap.map until GeoExt3 function exists
        //console.log("click on map!");
        var map = OL3MapService.getMap();
        //var cookie = Ext.util.Cookies.get("sppCookie");
        //var pixel = map.getEventPixel(evt.originalEvent);
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
                //console.log(feature.getKeys());
                return feature;
            }
        );

        var popupWindow = Ext.getCmp("popupWindow");

        // lazy instanciation
        if (!popupWindow) {
            Ext.create("SppAppClassic.store.FeatureInfos");
            /*var info = Ext.create("FeatureInfo", {
                attribute: 'original',
                value : '123'
            });*/
            //store.add(info);
            popupWindow = Ext.create("SppAppClassic.view.main.PopupWindow");
        }

        if (feature) {   // clicked on feature
            console.log("clicked on feature!");
            if (AuthService.isAuthorized) {
                popupWindow.updateHTML(feature);
            } else {
                popupWindow.updateHTML(feature, true);
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
    },

    /**
     * ensures that ol3Map is destroyed. doesnt work
     */
    onMapDestroy: function() {
        console.log("destroying mappanel");
        //this.getView().setMap(false);
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
