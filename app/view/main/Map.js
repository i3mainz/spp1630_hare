"use strict";

Ext.define("SppAppClassic.view.main.Map", {
    extend: "Ext.panel.Panel",

    xtype: "mappanel",
    id: "mappanel",

    requires: [
        "SppAppClassic.view.main.MapToolbar",  // xtype: "maptoolbar"
        "GeoExt.component.Map", // xtype: "gx_component_map"
        "GeoExt.data.store.LayersTree",
        "LayerGroups",
        "OL3MapService",
        "AuthService"
    ],
    controller: "main-map",

    layout: "border",
    title: "Map",

    initComponent: function () {
        // init map in OL3MapService
        // this is done to generate a new map after a logout and re-login
        //OL3MapService.initMap();

        // good practice to add non-primivite variables
        Ext.apply(this, {
            items: {
                xtype: "gx_component_map",
                region: "center",
                map: OL3MapService.getMap(),
                id: "geoextMap",
                listeners: {
                    click: "onMapClick",
                    pointermove: "onPointerMove",
                    destroy: "onDestroy"
                }
            },
            dockedItems: {
                xtype: "maptoolbar"
            }
        });

        // add OL3Map layers to the layerstore so it can be displayed
        // in the layer tree panel
        //this.setLayerTreeStore(OL3MapService.getMap().getLayerGroup());
        //console.log(OL3MapService.getMap().getLayerGroup().getLayers());

        //console.log("sets store");

        var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
            layerGroup: OL3MapService.getMap().getLayerGroup(),
            autoDestroy: true,  // destroys the store when its view is destroyed
            storeId: "treeStore"  // register with storemanager
        });

        // apply to layertree
        Ext.getCmp("layerTree").setStore(treeStore);


        //this.appendLayerGroups();

        /*try {
            //OL3MapService.addLayer(LayerGroups.basemaps);
            //OL3MapService.addLayer(LayerGroups.hydrology);
            //OL3MapService.addLayer(LayerGroups.darmc);
            //OL3MapService.addLayer(LayerGroups.fetch);
            //OL3MapService.getMap().addLayer(LayerGroups.hydrology),
            //OL3MapService.getMap().addLayer(LayerGroups.darmc),
            //OL3MapService.getMap().addLayer(LayerGroups.fetch);
            OL3MapService.addLayer(LayerGroups.sppOpen);
            console.log("layers aded without error");
        } catch (e) {
            console.log("something went wrong trying to add layer group");
        }*/

        SppAppClassic.view.main.Map.superclass.initComponent.call(this);
    },

    /*
     * creates tree store containing all ol3map layers and applies it to
     * layer tree panel
     */
    setLayerTreeStore: function(layerGroup) {
        //console.log(treeStore); //.removeAll();

        //console.log();
        // create treestore
        /*var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
            layerGroup: layerGroup,
            autoDestroy: true,  // destroys the store when its view is destroyed
            storeId: "treeStore"  // register with storemanager
        });*/
        //Ext.data.StoreManager.lookup('treeStore').removeAll();

        //console.log(Ext.data.StoreManager.lookup('treeStore'));

        // apply to layertree
        //Ext.getCmp("layerTree").setStore(treeStore);
    },

    appendLayerGroups: function() {

        if (AuthService.isAuthenticated()) {
            console.log("authenticated!");
            // public
            try {
                OL3MapService.addLayer(LayerGroups.basemaps);
                OL3MapService.addLayer(LayerGroups.hydrology);
                OL3MapService.addLayer(LayerGroups.darmc);
                OL3MapService.addLayer(LayerGroups.fetch);
                //OL3MapService.getMap().addLayer(LayerGroups.hydrology),
                //OL3MapService.getMap().addLayer(LayerGroups.darmc),
                //OL3MapService.getMap().addLayer(LayerGroups.fetch);
                OL3MapService.addLayer(LayerGroups.sppOpen);
                console.log("layers aded without error");
            } catch (e) {
                console.log("something went wrong trying to add layer group");
            }


            if (AuthService.isAuthorized()) {

                // SPP internal layer groups
                //OL3MapService.getMap().addLayer(LayerGroups.barrington);
                //OL3MapService.getMap().addLayer(LayerGroups.spp);

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
            }

        }
    },

    listeners: {
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
        beforeDestroy: "onMapDestroy"
    }
});
