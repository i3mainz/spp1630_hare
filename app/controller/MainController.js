"use strict";

Ext.define("SppAppClassic.MainController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main",

    requires: [
        "Ext.button.Button",
        "SppAppClassic.view.login.Login",
        "SppAppClassic.view.main.InfoTabPanel",
        "AuthService",
        "OL3MapService"
    ],

    control: {
        // MainPanel
        "#": {
            afterrender: "updateLogoutInfo",
            beforedestroy: "onMainPanelDestroy"
        },

        // mappanel
        "#mappanel": {
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
                /*panel.body.on("pointermove", function(evt) {
                    evt.pixel = [evt.browserEvent.layerX, evt.browserEvent.layerY];
                    Ext.getCmp("geoextMap").fireEvent("pointermove", evt);
                });*/
            },
            beforeDestroy: "onMapPanelDestroy"
        },

        // MapToolbar
        "#maptoolbar": {
            beforerender: "unlockButtons" // unlock buttons on start
        },

        // GeoExtMap component
        "#geoextMap": {
            click: "onMapClick",
            pointermove: "onPointerMove",
            //destroy: "onDestroy",
            beforerender: "onGeoExtMapRender"
        }
    },


    // main functions
    updateLogoutInfo: function() {
        var text = "Logged in as " + AuthService.getUser() + ".";
        Ext.getCmp("logoutButtonlabel").setText(text);
    },

    onClickLogout: function() {
        var me = this;

        Ext.MessageBox.confirm("Logout", "Are you sure you want to logout?", function(btn) {
            if (btn === "yes") {

                AuthService.logout(function() {
                    // success
                    me.getView().destroy();  // onDestroy destroys everything else

                    // Add the Login Window
                    Ext.create({
                        xtype: "login"
                    });

                }, function() {
                    // failure
                    console.log("error when trying to logout!");
                });
            }
        });
    },

    onClickInfo: function() {
        var infoPanel = Ext.getCmp("infotabpanel");
        if (!infoPanel) {
            infoPanel = Ext.create({ xtype: "infotabpanel" });
        }
        infoPanel.show();
    },

    /*
     * clean up everything when main view gets destroyed
     */
    onMainPanelDestroy: function() {
        var extWindow;
        //console.log("destroy view!");
        // destroy all windows when main view gets destroyed
        // to prevent them from still being displayed on login view

        var extWindow = Ext.getCmp("filterPanel");
        if (extWindow) {
            extWindow.destroy();
        }
        extWindow = Ext.getCmp("gridWindow");
        if (extWindow) {
            extWindow.destroy();
        }
        extWindow = Ext.getCmp("popupWindow");
        if (extWindow) {
            extWindow.destroy();
        }

        //layerTree

        /*extWindow = Ext.getCmp("mappanel");
        if (extWindow) {
            extWindow.destroy();
        }*/

        //Ext.getCmp("layerTree").getStore().removeAll();




        //this.getView().destroy();
    },

    onGeoExtMapRender: function() {
        this.setLayersTreePanelStore();
        this.appendLayerGroups();
    },

    /*
     * creates tree store containing all ol3map layers and applies it to
     * layer tree panel
     */
    setLayersTreePanelStore: function() {
        var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
            layerGroup: OL3MapService.getMap().getLayerGroup(),
            //clearOnLoad: true,
            //autoDestroy: true,  // destroys the store when its view is destroyed
            storeId: "treeStore"  // register with storemanager
        });
        Ext.getCmp("layerTree").setStore(treeStore);
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

    /*onGridClick: function() {
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
    },*/

    /*onToggleSettings: function() {
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
    },*/

    /**
     * unlocks buttons for registred authorized users
    */
    unlockButtons: function() {
        if (AuthService.isAuthorized()) {
            var buttonList = ["filterButton"]; // ["filterButton", "gridButton", "settingsButton"]
            for (var i = 0; i < buttonList.length; i++) {
                var button = Ext.getCmp(buttonList[i]);
                if (button) {
                    button.enable();
                }
            }
        }
    },

    // map methods
    appendLayerGroups: function() {

        try {
            //OL3MapService.addLayer(LayerGroups.basemaps);
            //OL3MapService.addLayer(LayerGroups.hydrology);
            //OL3MapService.addLayer(LayerGroups.darmc);
            //OL3MapService.addLayer(LayerGroups.fetch);
            //OL3MapService.getMap().addLayer(LayerGroups.hydrology),
            //OL3MapService.getMap().addLayer(LayerGroups.darmc),
            //OL3MapService.getMap().addLayer(LayerGroups.fetch);
            if (AuthService.getUser() !== "guest") {
                // SPP internal layer groups
                //OL3MapService.getMap().addLayer(LayerGroups.barrington);
                //OL3MapService.getMap().addLayer(LayerGroups.spp);
                //
                OL3MapService.getMap().addLayer(LayerGroups.layers.spp);

                // agInternal
                //OL3MapService.getMap().addLayer(LayerGroups.agIntern);  // empty

                // add project-specific layers to ag intern layer group

                /*var projectID = SppAppClassic.app.getUsernameProjectID();

                if (projectID) {  // known cookie login
                    // create ag intern layer
                    var layer = me.createAGInternLayer(projectID);
                    //me.addLayer(layer);
                    me.addLayerToLayerGroup(layer, "Project Internal");
                }*/

                // load layers into layergroup
                //me.createLayersFromStore();
                //console.log("done loading layers for users");
            } else {
                OL3MapService.addLayer(LayerGroups.layers.sppOpen);
            }

            //console.log("layers aded without error");
        } catch (e) {
            console.log("something went wrong trying to add layer group");
        }
    },


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
    onMapPanelDestroy: function() {
        console.log("destroying mappanel");
        //this.getView().setMap(false);
    },

});
