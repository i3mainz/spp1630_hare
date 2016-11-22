"use strict";

/**
 * A plugin for Ext.grid.column.Column s that overwrites the internal cellTpl to
 * support legends.
 */
Ext.define('SppAppClassic.main.BasicTreeColumnLegends', {
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

        // insert legend icon if active
        '<tpl if="this.hasLegend(values.record)">',
            '{[this.getLegendHtml(values.record)]}',
        '</tpl>',

        // insert layer name
        '{value}',
    ],

    /**
     * The context for methods available in the template
     */
    valueReplacementContext: {

        // check if layer has a legend and is not a layer group
        hasLegend: function(rec) {
            var layer = rec.data;
            return layer.get('legendUrl') && !(layer instanceof ol.layer.Group);
        },

        getLegendHtml: function(rec) {
            var layer = rec.data;
            var legendUrl = layer.get('legendUrl');
            return '<img class="legend-icon" src="' + legendUrl + '" />';
        }
    },

    init: function(column) {
        var me = this;
        if (!(column instanceof Ext.grid.column.Column)) {
            Ext.log.warn('Plugin shall only be applied to instances of Ext.grid.column.Column');
            return;
        }
        var valuePlaceHolderRegExp = /\{value\}/g;
        var replacementTpl = me.valueReplacementTpl.join('');
        var newCellTpl = me.originalCellTpl.replace(valuePlaceHolderRegExp, replacementTpl);

        column.cellTpl = [
            newCellTpl,
            me.valueReplacementContext
        ];
    }
});
