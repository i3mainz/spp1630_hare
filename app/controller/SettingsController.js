"use strict";

Ext.define("SppAppClassic.SettingsController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-settings",

    requires: [
    ],

    // define listeners here instead of the view.
    // keeps view and controller logic seperated
    control: {
        "#": {
        }
    },

    onLabelCheckboxChange: function() {
        var checkbox = Ext.getCmp("settingsCheckbox1");
        var map = Ext.getCmp("geoextMap");
        var layer = map.getLayerByName("Data");

        if (checkbox.getValue()) {  // is checked
            layer.setStyle(LayerStyles.redPointLabelStyleFunction);
        } else {
            layer.setStyle(LayerStyles.redPoints);
        }
    }

});
