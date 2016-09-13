"use strict";

/**
 * Panel that holds the description of the currently selected layer or layer
 * group.
 */
Ext.define("SppAppClassic.view.main.DescriptionPanel", {
    extend: "Ext.panel.Panel",

    xtype: "app-description",

    requires: [
        "ConfigService"
    ],

    title: ConfigService.texts.descriptionTitle,
    collapsible: true,
    collapsed: true,
    closeAction: 'hide',

    // placeholder text
    html: ConfigService.texts.descriptionPlaceholder,

    // style
    margin: "0 5 0 0",
    bodyPadding: "10px"
});
