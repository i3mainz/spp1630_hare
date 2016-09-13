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
