"use strict";

Ext.define("SppAppClassic.LayerTreePanelController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main-tree",

    requires: [
        "OL3MapService"
    ],

    onItemClick: function(view, record) {
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

});
