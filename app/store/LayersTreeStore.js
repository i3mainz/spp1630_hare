"use strict";

Ext.define("SppAppClassic.store.LayersTreeStore", {
    extend: "GeoExt.data.store.LayersTree",

    storeId: "treeStore",
    alias: "store.treeStore",

    requires: [
        "OL3MapService"
    ],

    layerGroup: OL3MapService.getMap().getLayerGroup(),
    autoDestroy: true  // destroys the store when its view is destroyed
});
