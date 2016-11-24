"use strict";
/**
 * @class SppAppClassic.main.Filter.FilterPanel
 * @extends Ext.window.Window
 *
 * Panel that holds all Filter options in an accordion layout.
 *
 * @author Axel Kunz (c) 2015-2016
 * @license ???
 */
Ext.define("SppAppClassic.main.FilterPanel",{
    extend: "Ext.panel.Panel",
    xtype: "app-filter",

    requires: [
        "ConfigService",
        "Ext.form.Label",
        "Ext.form.FieldSet",
        "Ext.form.field.Checkbox",
        "Ext.button.Button",
        "SppAppClassic.main.CenturySlider"
    ],
    controller: "main-filter",
    resizable: true,
    closeAction: "hide",
    title: ConfigService.texts.filterTitle,
    layout: {
        type: "anchor",
        //type: "vbox",
        align: "stretch"
    },
    collapsible: true,
    collapsed: true,
    scrollable: true,

    // style
    bodyPadding: 10,
    minWidth: 150,
    width: 230,
    margin: "0 5 0 0",


    defaults: {
        xtype: "fieldset",
        defaultType: "checkbox",
        scrollable: true,
        checkboxToggle: false,
        collapsible: true,
        collapsed: true,
        border: false,
        defaults: {
            checked: true
        }
    },

    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    title: "Projects",
                    items: this.getProjectCheckboxes()
                },{
                    xtype: "centurySelector",
                    id: "centuryselector",
                    title: "Centuries",
                    width: 160,
                    listeners: {
                        change: "applyFilter"
                    }

                },{
                    title: "Status",
                    defaults: {
                        checked: true,
                        listeners: {
                            change: "applyFilter"
                        }
                    },
                    items: [
                        {
                            boxLabel: "1 - complete",
                            name: "status",
                            id: "checkboxStatus1"
                        },{
                            boxLabel: "2 - in progress",
                            name: "status",
                            id: "checkboxStatus2"
                        },{
                            boxLabel: "3 - incomplete",
                            name: "status",
                            id: "checkboxStatus3"
                        }
                    ]
                }
            ]
        });
        SppAppClassic.main.FilterPanel.superclass.initComponent.call(this);
    },

    getProjectCheckboxes: function() {
        var itemList = [];
        ConfigService.projects.forEach(function(project) {
            itemList.push({
                xtype: "checkbox",
                boxLabel: project.db_name,
                style: {
                    "font-weight": "normal"
                },
                id: "project" + project.id + "Checkbox",
                listeners: {
                    change: "applyFilter"
                }
            });
        });

        return itemList;
    }
});
