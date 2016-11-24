"use strict";
/**
 * Tree to display OpenLayers 3 Layers.
 */
Ext.define("SppAppClassic.main.LayerTree", {
    extend: "Ext.tree.Panel",
    xtype: "app-tree",
    reference: "layertree",

    requires: [
        "ConfigService",
        "GeoExt.data.store.LayersTree",
        "Ext.tree.plugin.TreeViewDragDrop",
        "Ext.tree.Column",
        "SppAppClassic.main.BasicTreeColumnLegends"
    ],

    controller: "main-tree",

    viewConfig: {
        plugins: { ptype: "treeviewdragdrop" }  // enable drag and drop of layers
    },

    title: ConfigService.texts.treeTitle,

    collapsible: true,
    resizable: true,
    rootVisible: false,
    fill: true,
    border: false,
    hideHeaders: true,
    lines: false,
    autoScroll: true,
    split: false,

    // style
    minWidth: 150,
    width: 230,
    margin: "0 5 0 0",

    // display legend
    columns: {
        header: false,
        items: [{
            xtype: "treecolumn",
            dataIndex: "text",
            flex: 1,
            iconCls: "no-icon",
            plugins: [{
                ptype: "basic_tree_column_legend"
            }]
        }]
    },
    listeners: {
        itemclick: "onItemClick"
    }
});
