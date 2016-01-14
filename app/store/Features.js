"use strict";

Ext.define("SppAppClassic.store.Features", {
    extend: "GeoExt.data.store.Features",

    storeId: "featuresStore",
    alias: "store.features",  

    layer: Layers.spp[0],

    map: OL3Map.map,

    listeners: {
    	beforeload: function() {
    		console.log("before load!");
    	},
        load: function() {
        	console.log("features loaded");
        }
    }   
});
