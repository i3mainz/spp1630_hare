"use strict";

Ext.define("SppAppClassic.store.Features", {
    extend: "GeoExt.data.store.Features",

    storeId: "featuresStore",
    alias: "store.features",  

    requires: [],

    layer: Layers.spp[0],  //Ext.getCmp("geoextMap").getLayerByName("harbours") 

    map: Ext.getCmp("geoextMap"),  // replace with geoextmap

    listeners: {
    	beforeload: function() {
    		console.log("before load!");
    	},
        load: function() {
        	console.log("features loaded");
        }
    }   
});
