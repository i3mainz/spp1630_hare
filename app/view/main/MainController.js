"use strict";

Ext.define("SppAppClassic.MainController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main",

    requires: [
        "Ext.button.Button",
        "SppAppClassic.view.login.Login",
        "SppAppClassic.view.main.NewsPanel",
        "AuthService",
        "LayerService",
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
            },
            beforeDestroy: "onMapPanelDestroy"
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

    // map methods
    appendLayerGroups: function() {

        try {

            if (AuthService.getUser() !== "guest") {
                // SPP internal layer groups
                OL3MapService.getMap().addLayer(LayerService.restrictedLayers.spp);

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
                OL3MapService.addLayer(LayerService.restrictedLayers.sppOpen);
            }

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
