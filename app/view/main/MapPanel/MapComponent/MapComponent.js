"use strict";

Ext.define("SppAppClassic.main.MapComponent", {
    extend: "GeoExt.component.Map",

    xtype: "app-mapcomp",

    requires: [
        "MapService"
    ],

    controller: "map",

    map: null,  // set on init

    initComponent: function () {
        MapService.initMap();  // TODO: set map in controller
        this.map = MapService.getMap();

        // set tree store once map is loaded
        var treeStore = Ext.create("GeoExt.data.store.LayersTree", {
            layerGroup: MapService.getMap().getLayerGroup(),
            storeId: "treeStore"  // register with storemanager
        });
        Ext.getCmp("layerTree").setStore(treeStore);

        SppAppClassic.main.MapComponent.superclass.initComponent.call(this);
    },

    /**
     * Gets all filterable layers from the map. The need to have attribute
     * filterable: true and they need an ID to identify them.
     * @returns {Object[]} OL3 Layer Objects
     */
    getFilterableLayers: function() {
        var filterableLayers = [];
        var layers = MapService.getLayers();
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
