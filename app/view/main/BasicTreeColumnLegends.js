"use strict";
/**
 * A plugin for Ext.grid.column.Column s that overwrites the internal cellTpl to
 * support legends.
 */
Ext.define("SppAppClassic.view.main.BasicTreeColumnLegends", {
    extend: "Ext.AbstractPlugin",
    alias: "plugin.basic_tree_column_legend",

    /**
     * @private
     */
    originalCellTpl: Ext.clone(Ext.tree.Column.prototype.cellTpl).join(""),

    /**
     * filter icon
     */
    filterButton: "<button><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></button>",

    /**
     * The Xtemplate strings that will be used instead of the plain {value}
     * when rendering
     */
    valueReplacementTpl: [
        "{value}",
        "<tpl if='this.hasLegend(values.record)'><br />",
        "<tpl for='lines'>",
        "<img src='{parent.blankUrl}'",
        " class={parent.childCls} {parent.elbowCls}-img ",
        "{parent.elbowCls}-<tpl if='.'>line<tpl else>empty</tpl>",
        " role='presentation'/>",
        "</tpl>",
        "<img src='{blankUrl}' class='{childCls} x-tree-elbow-img'>",
        "<img src='{blankUrl}' class='{childCls} x-tree-elbow-img'>",
        "<img src='{blankUrl}' class='{childCls} x-tree-elbow-img'>",
        "{[this.getLegendHtml(values.record)]}",
        //"{[this.getLegendHeight(values.record)]}",
        "</tpl>"
    ],

    /**
     * The context for methods available in the template
     */
    valueReplacementContext: {
        /**
         * hasLegend ->  returns something if node is checked and
         * is not a layerGroup
         */
        hasLegend: function(rec) {
            var isChecked = rec.get("checked");  // node active
            var layer = rec.data;  // OL3 layer (can be a layergroup)
            return isChecked && !( layer instanceof ol.layer.Group );
        },
        getLegendHtml: function(rec) {
            var layer = rec.data;
            var legendUrl = layer.get("legendUrl");  // get legend property defined in layers.js
            //console.log(legendUrl);
            if (!legendUrl) {
                legendUrl = "http://geoext.github.io/geoext2/" +
                    "website-resources/img/GeoExt-logo.png";
            }

            // apply height
            var legendClass;
            var legendHeight = layer.get("legendHeight");
            if (legendHeight === "fetch") {
                legendClass = "fetchLegend";
            } else if (legendHeight === "harbours") {
                legendClass = "harboursLegend";
            } else {
                legendClass = "legend";
            }

            return "<img class='" + legendClass + "' src='" + legendUrl + "' />";
        }

        /**
         * adjust legend height when attribute is set is given
         */
         /*
        getLegendHeight: function(rec) {
            var layer = rec.data;
            var legendHeight = layer.get("legendHeight");  // get legend property defined in layers.js
            if (legendHeight) {  // legendHeight is set
                var legend = Ext.select("legend");
                legend.removeCls("legend");
                legend.addCls("fetchLegend");
            }
        }*/
    },

    init: function(column) {
        var me = this;
        if ( !( column instanceof Ext.grid.column.Column ) ) {
            Ext.log.warn( "Plugin shall only be applied to instances of" +
                    " Ext.grid.column.Column" );
            return;
        }
        var valuePlaceHolderRegExp = /\{value\}/g;
        var replacementTpl = me.valueReplacementTpl.join( "" );
        var newCellTpl = me.originalCellTpl.replace(
            valuePlaceHolderRegExp, replacementTpl
        );

        column.cellTpl = [
            newCellTpl,
            me.valueReplacementContext
        ];
    }
} );
