"use strict";

Ext.define("SppAppClassic.store.Layers", {
    extend: "Ext.data.Store",

    alias: "store.layers",
    storeId: "layersStore",

    //requires: 'MyApp.model.User',
    //model: 'MyApp.model.User',

    // TODO: isRestricted
    fields: [
        "group", "type", "title", "layerName", "legendName", "legendHeight", "layerStyle", "isVisible"
    ],
    /**
     * legendName: if true, use layerName get legend for this layer. if another name
     * is specified, use that instead. (e.g. layerName: "SPP:roads", legendName: "SPP:ports")
     *
     */
    /*data: {
        items: [{
            group: "SPP",
            type: "GeoJSON",
            title: "Data",
            layerName: "SPP:spp_harbours_intern",
            legendName: "SPP:harbours",
            layerStyle: LayerStyles.redPointLabelStyleFunction,
            isVisible: true
        },



        {
            group: "DARMC",
            type: "WMS",
            title: "Aqueducts",
            layerName: "SPP:darmc_aqueducts"
        },{
            group: "DARMC",
            type: "WMS",
            title: "Bridges",
            layerName: "SPP:darmc_bridges"
        },{
            group: "DARMC",
            type: "WMS",
            title: "Roads",
            layerName: "SPP:darmc_roads"
        },{
            group: "DARMC",
            type: "WMS",
            title: "Cities",
            layerName: "SPP:darmc_cities"
        },{
            group: "DARMC",
            type: "WMS",
            title: "Baths",
            layerName: "SPP:darmc_baths"
        },{
            group: "DARMC",
            type: "WMS",
            title: "Ports",
            layerName: "SPP:darmc_ports"
        },{
            group: "DARMC",
            type: "WMS",
            title: "Harbours",
            layerName: "SPP:darmc_harbours"
        },{
            group: "DARMC",
            type: "WMS",
            title: "Canals",
            layerName: "SPP:darmc_canals"
            //legendName: "SPP:darmc_harbours"  // if true, take layerName
        },


        {
            group: "Barrington Atlas",
            type: "WMS",
            title: "Aqueducts",
            layerName: "SPP:aqueduct",
            legendName: true
        },{
            group: "Barrington Atlas",
            type: "WMS",
            title: "Bridges",
            layerName: "SPP:bridge",
            legendName: true
        },{
            group: "Barrington Atlas",
            type: "WMS",
            title: "Baths",
            layerName: "SPP:bath",
            legendName: true
        },{
            group: "Barrington Atlas",
            type: "WMS",
            title: "Ports",
            layerName: "SPP:port",
            legendName: true
        },{
            group: "Barrington Atlas",
            type: "WMS",
            title: "Settlements",
            layerName: "SPP:settlement",
            legendName: true
        },{
            group: "Barrington Atlas",
            type: "WMS",
            title: "Canals",
            layerName: "SPP:canal",
            legendName: true
        },{
            group: "Barrington Atlas",
            type: "WMS",
            title: "Roads",
            layerName: "SPP:road",
            legendName: true  // if true, take layerName
        }
    ]},*/

    sorters: [{
        property: "title",
        direction: "DESC"
    }],

    proxy: {
        type: "memory",
        reader: {
            type: "json",
            rootProperty: "items"
        }
    }
});
