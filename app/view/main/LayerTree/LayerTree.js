"use strict";
/**
 * Tree to display OpenLayers 3 Layers.
 */
Ext.define("SppAppClassic.view.main.LayerTree", {
    extend: "Ext.tree.Panel",
    xtype: "layertree",
    reference: "layertree",

    requires: [
       "SppAppClassic.view.main.LayerTreeController",
       "GeoExt.data.store.LayersTree",
       "Ext.tree.plugin.TreeViewDragDrop",           // ptype: treeviewdragdrop
       "Ext.tree.Column",                            // xtype: "treecolumn"
       "SppAppClassic.view.main.BasicTreeColumnLegends"  // ptype: "basic_tree_column_legend"
    ],

    controller: "main-layertree",

    viewConfig: {
        plugins: {ptype: "treeviewdragdrop"}  // enable drag and drop of layers
    },

    // define parameters and set defaults -> no need, just declare together with xtype
    config: {
        title: "Layers"  // overrides title
    },
    title: "Layers",

    collapsible: true,
    rootVisible: false,
    fill: true,
    width: 250,
    border: false,
    hideHeaders: true,
    //flex: 1,
    lines: false,
    autoScroll: true,
    margin: "0 5 0 0",
    split: false,

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
    initComponent: function () {
        console.log("init layer tree");

        // store gets set later on geoextmap creation
        SppAppClassic.view.main.LayerTree.superclass.initComponent.call(this);
    },
    // alternative to treePanel.on('select', function())
    listeners: {
        /*checkchange: function() {
            //console.log("checkchange");
        }*/
        // refresh legend every time a node is selected
        //checkchange: 'onNodeCheckChange' // defined in MapController
    }

});
