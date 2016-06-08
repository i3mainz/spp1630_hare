"use strict";

Ext.define("SppAppClassic.store.FeatureInfos", {
    extend: "Ext.data.Store",

    storeId: "featureInfosStore",
    alias: "store.featureInfos",

    model: "FeatureInfo",

    /*data : [
         {attribute: 'this is defined', value: 'in the db'},
    ],*/
    autoLoad: true,
    autoSync: true,

    proxy: {
        type: "memory",
        reader: {
            type: "json",
            rootProperty: "items"
        }
    }

});
