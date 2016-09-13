"use strict";

Ext.define("SppAppClassic.view.main.MapComponent", {
    extend: "GeoExt.component.Map",
    xtype: "app-map",

    requires: [
        "GeoExt.component.Map", // xtype: "gx_component_map"
        "OL3MapService"
    ],

    controller: "map",

    map: null,  // set on init

    initComponent: function () {
        OL3MapService.initMap();  // TODO: set map in controller
        this.map = OL3MapService.getMap();

        // set tree store once map is loaded
        var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
            layerGroup: OL3MapService.getMap().getLayerGroup(),
            storeId: "treeStore"  // register with storemanager
        });
        Ext.getCmp("layerTree").setStore(treeStore);

        SppAppClassic.view.main.MapComponent.superclass.initComponent.call(this);
        //this.callParent();
    },

    /**
     * Gets a layer by its ID. it is not OL3 standard. given to access correct
     * layer when applying filters and multiple layers with the same name exist.
     * @param {string} id - Layer ID
     * @returns {Object} OL3 Layer Object
     */
    getLayerByID: function(id) {
        var layers = OL3MapService.getLayers();   // gets layers nested in layer groups
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            if (layer.get("id") === id) {
                return layer;
            }
        }
        return false;
    },

    /**
     * Gets all filterable layers from the map. The need to have attribute
     * filterable: true and they need an ID to identify them.
     * @returns {Object[]} OL3 Layer Objects
     */
    getFilterableLayers: function() {
        var filterableLayers = [];
        var layers = OL3MapService.getLayers();
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.get("id") && layer.get("filterable")) {
                filterableLayers.push(layer);
            }
        }
        return filterableLayers;
    },

    listeners: {
        click: "onMapClick",

        // custom listener for pointMoves to change cursor style
        render: function(component) {
            component.map.on("pointermove", function (evt) {
                var hit = this.forEachFeatureAtPixel(evt.pixel, function(feature) {
                    return true;
                });
                if (hit) {
                    this.getTarget().style.cursor = 'pointer';
                } else {
                   this.getTarget().style.cursor = '';
               }
           });
        }
    }
});
