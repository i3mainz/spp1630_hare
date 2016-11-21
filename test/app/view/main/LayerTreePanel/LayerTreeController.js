"use strict";

Ext.define("SppAppClassic.LayerTreePanelController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main-tree",

    requires: [
        "OL3MapService"
    ],


    onItemClick: function(view, record) {
        // get the layer this node references to
        var layer = record.getOlLayer();
        var layerGroup = record.parentNode.getOlLayer(); // undefined if clicked node is a group

        var descriptionPanel = Ext.getCmp("descriptionPanel");

        if (layer) {
            if (layer.get("description")) {  // layer has description
                descriptionPanel.updateContent(layer.get("description"));

            } else if (layerGroup && layerGroup.get("description")) {  // layer has no description, but it's parent has
                descriptionPanel.updateContent(layerGroup.get("description"));

            } else {
                descriptionPanel.clearContent();
            }
        }
    }

});
