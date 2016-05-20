"use strict";
/**
 * Tree to display OpenLayers 3 Layers.
 */
Ext.define("SppAppClassic.view.main.Filter.FilterTree", {
    extend: "Ext.tree.Panel",
    xtype: "filtertree",

    requires: [
       "Ext.tree.Column",                            // xtype: "treecolumn"
    ],

    title: "Filters",

    collapsible: true,
    rootVisible: false,
    fill: true,
    width: 230,
    border: false,
    hideHeaders: true,
    //flex: 1,
    lines: false,
    autoScroll: true,
    margin: "0 0 0 5",
    split: false,

    initComponent: function () {
        Ext.apply(this, {
            store: Ext.create("SppAppClassic.store.News")
        });

        //Ext.getCmp("layerTree").setStore(treeStore);

        SppAppClassic.view.main.Filter.FilterTree.superclass.initComponent.call(this);
    }
});
