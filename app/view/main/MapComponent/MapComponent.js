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

        SppAppClassic.view.main.MapComponent.superclass.initComponent.call(this);
        //this.callParent();
    },

    listeners: {
        click: "onMapClick",
        pointermove: "onPointerMove",
        beforerender: "onGeoExtMapRender"
    }
});
