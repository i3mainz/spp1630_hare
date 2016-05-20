"use strict";
/**
 * @class SppAppClassic.view.main.Settings.SettingsPanel
 * @extends Ext.window.Window
 *
 *
 *
 * @author Axel Kunz (c) 2015-2016
 * @license ???
 */
Ext.define("SppAppClassic.view.main.SettingsPanel",{
    extend: "Ext.window.Window",
    xtype: "settingspanel",
    //id: "settingsPanel",
    requires: [
        "Ext.panel.Panel"
    ],

    controller: "main-settings",

    /*viewModel: {
        type: "main-filterpanel"
    },*/

    resizable: false,
    closeAction: "hide",
    title: "Settings",
    //layout: "fit",  // "anchor" //accordion
    layout: {
        type: "vbox",
        align: "stretch"
    },
    width: 220,
    //minHeight: 300,
    //maxHeight: 500,
    scrollable: true,

    defaults: {  // defaults for all items
        xtype: "checkboxfield",
        padding: "10 10 0 10"
    },

    initComponent: function () {
        Ext.apply(this, {
            items: [{
                boxLabel: "Show labels",
                name: "setting",
                inputValue: "1",
                id: "settingsCheckbox1",
                listeners: {
                    change: "onLabelCheckboxChange"
                }
            },{
                boxLabel: "Cluster points",
                name: "setting",
                inputValue: "1",
                id: "settingsCheckbox2"
            }]
        });
        SppAppClassic.view.main.Settings.SettingsPanel.superclass.initComponent.call(this);
    }
});
