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
    bodyPadding: "10px",

    /**
     * Update the panel content to show the provided description.
     * @param {string} description - Layer description to show
     */
    updateContent: function(description) {
        this.update(description);
    },

    /**
     * Removes the panel html content.
     */
    clearContent: function() {
        this.update(ConfigService.texts.descriptionPlaceholder);
    }
});
