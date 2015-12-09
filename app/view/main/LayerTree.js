"use strict";

/**
 * A plugin for Ext.grid.column.Column s that overwrites the internal cellTpl to
 * support legends.
 */
Ext.define('BasicTreeColumnLegends', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.basic_tree_column_legend',

    /**
     * @private
     */
    originalCellTpl: Ext.clone(Ext.tree.Column.prototype.cellTpl).join(''),

    /**
     * The Xtemplate strings that will be used instead of the plain {value}
     * when rendering
     */
    valueReplacementTpl: [
        '{value}',
        '<tpl if="this.hasLegend(values.record)"><br />',
        '<tpl for="lines">',
        '<img src="{parent.blankUrl}"',
        ' class="{parent.childCls} {parent.elbowCls}-img ',
        '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>"',
        ' role="presentation"/>',
        '</tpl>',
        '<img src="{blankUrl}" class="{childCls} x-tree-elbow-img">',
        '<img src="{blankUrl}" class="{childCls} x-tree-elbow-img">',
        '<img src="{blankUrl}" class="{childCls} x-tree-elbow-img">',
        '{[this.getLegendHtml(values.record)]}',
        '</tpl>'
    ],

    /**
     * The context for methods available in the template
     */
    valueReplacementContext: {
        hasLegend: function(rec){
            var isChecked = rec.get('checked');
            var layer = rec.data;
            return isChecked && !(layer instanceof ol.layer.Group);
        },
        getLegendHtml: function(rec){
            var layer = rec.data;
            var legendUrl = layer.get('legendUrl');
            if (!legendUrl) {
                legendUrl = "http://geoext.github.io/geoext2/" +
                    "website-resources/img/GeoExt-logo.png";
            }
            return '<img class="legend" src="' + legendUrl + '" height="32" />';
        }
    },

    init: function(column){
        var me = this;
        if(!(column instanceof Ext.grid.column.Column)) {
            Ext.log.warn("Plugin shall only be applied to instances of" +
                    " Ext.grid.column.Column");
            return;
        }
        var valuePlaceHolderRegExp = /\{value\}/g;
        var replacementTpl = me.valueReplacementTpl.join('');
        var newCellTpl = me.originalCellTpl.replace(
            valuePlaceHolderRegExp, replacementTpl
        );

        column.cellTpl = [
            newCellTpl,
            me.valueReplacementContext
        ];
    }
});

var treeStore = Ext.create('GeoExt.data.store.LayersTree', {
    layerGroup: olMap.getLayerGroup()
});

Ext.define("SppAppClassic.view.main.LayerTree",{
    extend: "Ext.tree.Panel",
    xtype: "layertree",

    requires: [
        "SppAppClassic.view.main.LayerTreeController",
        "SppAppClassic.view.main.LayerTreeModel"
    ],

    controller: "main-layertree",
    viewModel: {
        type: "main-layertree"
    },

    title: 'Layers',
    viewConfig: {
        plugins: { ptype: 'treeviewdragdrop' }
    },
    store: treeStore,
    collapsible: true,
    rootVisible: false,
    fill: true,
    width: 250,
    border: false,
    hideHeaders: true,
    region: "west",
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
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1,
            plugins: [{
                ptype: 'basic_tree_column_legend'
            }]
        }]
    },

    // alternative to treePanel.on('select', function())
    listeners: {  
        // refresh legend every time a node is selected
        //checkchange: 'onNodeCheckChange' // defined in MapController
    }
});
