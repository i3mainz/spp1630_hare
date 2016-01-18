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
       "SppAppClassic.view.main.BasicTreeColumnLegends"
    ],

    controller: "main-layertree",
    viewModel: {
        type: "main-layertree"
    },

    //title: 'Layers',
    viewConfig: {
        plugins: {ptype: "treeviewdragdrop"}  // enable drag and drop of layers
    },

    // define parameters and set defaults -> no need, just declare together with xtype
    config: {
        title: "Layers"  // overrides title
    },
    title: "Layers",
    //store: this.treeStore,
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
    //border: false
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

    // alternative to treePanel.on('select', function())
    listeners: {
        /*checkchange: function() {
            //console.log("checkchange");
        }*/
        // refresh legend every time a node is selected
        //checkchange: 'onNodeCheckChange' // defined in MapController
    }

});
