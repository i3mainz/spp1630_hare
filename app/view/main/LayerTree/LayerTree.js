"use strict";
/**
 * Tree to display OpenLayers 3 Layers.
 */
Ext.define("SppAppClassic.view.main.LayerTree", {
    extend: "Ext.tree.Panel",
    xtype: "layertree",
    reference: "layertree",

    requires: [
       "GeoExt.data.store.LayersTree",
       "Ext.tree.plugin.TreeViewDragDrop",           // ptype: treeviewdragdrop
       "Ext.tree.Column",                            // xtype: "treecolumn"
       "SppAppClassic.view.main.BasicTreeColumnLegends",  // ptype: "basic_tree_column_legend"
       "OL3MapService"
    ],

    //controller: "main-layertree",

    viewConfig: {
        plugins: {ptype: "treeviewdragdrop"}  // enable drag and drop of layers
    },

    //title: "Layers",

    rootVisible: false,
    fill: true,
    //border: false,
    hideHeaders: true,
    //flex: 1,
    lines: false,
    //autoScroll: true,
    //margin: "0 5 0 0",
    //split: false,

    // display legend
    columns: {
        header: false,
        items: [{
            xtype: "treecolumn",
            dataIndex: "text",
            flex: 1,
            plugins: [{
                ptype: "basic_tree_column_legend"
            }]
        }]
    },

    // alternative to treePanel.on('select', function())
    listeners: {
        itemclick: function(view, record) {
            var nodeName = record.data.text;
            var panel = Ext.getCmp("descriptionPanel");
            var layer = OL3MapService.getLayerByName(nodeName);

            if (layer) {
                // get layer description
                if (layer.get("description")) {
                    panel.setHeight(200);
                    panel.update(layer.get("description"));
                } else {
                    panel.setHeight(0);
                    panel.update("");
                }
            }
        }
    }
});
