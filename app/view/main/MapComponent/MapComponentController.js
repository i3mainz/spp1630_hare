"use strict";

Ext.define("SppAppClassic.MapComponentController", {
    extend: "Ext.app.ViewController",

    alias: "controller.map",

    requires: [
        "GeoExt.data.store.LayersTree",
        "OL3MapService",
        "LayerService"
    ],

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
        console.log("click on map!");
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
    }
});
