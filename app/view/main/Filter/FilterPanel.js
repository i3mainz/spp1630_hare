"use strict";
/**
 * @class SppAppClassic.view.main.Filter.FilterPanel
 * @extends Ext.window.Window
 *
 * Panel that holds all Filter options in an accordion layout.
 *
 * @author Axel Kunz (c) 2015-2016
 * @license ???
 */
Ext.define("SppAppClassic.view.main.Filter.FilterPanel",{
    extend: "Ext.window.Window",
    xtype: "filterpanel",
    reference: "filterpanel",
    id: "filterPanel",  // TODO: use references instead
    requires: [
        "SppAppClassic.view.main.Filter.FilterPanelController",
        "SppAppClassic.view.main.Filter.CenturySlider",
        "Ext.form.Panel",
        "Ext.form.Label",
        "Ext.form.FieldSet",
        "Ext.form.field.Checkbox",
        "Ext.button.Button"
    ],

    controller: "main-filterpanel",

    /*viewModel: {
        type: "main-filterpanel"
    },*/

    resizable: false,
    closeAction: "hide",
    title: "Filters",
    layout: "accordion",  // "anchor"
    width: 220,
    minHeight: 300,
    maxHeight: 500,

    defaults: {  // defaults for all items
        bodyPadding: 10,
        hideCollapseTool: true,
        titleCollapse: false  // true allows expanding on title click, done with custom listeners
    },

    //applyCounter: 0, // used to hide reset button when nothing has been applied yet

    initComponent: function () {
        console.log("init filterpanel...");
        this.items = this.buildItems();
        this.buttons = this.buildButtons();
        SppAppClassic.view.main.Filter.FilterPanel.superclass.initComponent.call(this);
    },

    buildProjectCheckboxes: function() {
        var createProject = function(projectString, index) {
            return {
                xtype: "checkbox",
                checked: true,
                boxLabel: projectString,
                name: "project",
                id: "project" + index + "Checkbox"
            };
        };

        var itemList = [];

        var projects = Projects.projectList;
        for (var key in projects) {
            var project = projects[key];
            if (project.db_name) {
                itemList.push(createProject(project.db_name, project.id));
            }
        }

        return itemList;
    },

    buildItems: function () {
        return [{
                xtype: "panel", // hidden dummy panel to have the remaining closed
                hidden: true,
                collapsed: false
            },{
                xtype: "panel",
                title: "Projects",
                scrollable: true,
                items: this.buildProjectCheckboxes()
            },{
                xtype: "panel",
                title: "Centuries",
                layout: {
                    type: "vbox",
                    align: "center"
                },
                items: [
                    {
                        xtype: "label",
                        reference: "sliderlabel",
                        text: "1BC - 13AD",
                        padding: "5 0 0 0"
                    },{
                        xtype: "centuryslider",
                        width: 160,
                        padding: "0 0 10 0",
                        listeners: {
                            //changecomplete: "onSliderChangeComplete",
                            change: "onSliderChange"
                        }
                    },{
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "allow 'propable'",
                        name: "allowPropable",
                        id: "allowPropableCheckbox"
                    },{
                        xtype: "checkbox",
                        checked: false,
                        boxLabel: "only continuous",
                        name: "onlyContinuous",
                        id: "onlyContinuousCheckbox"
                    }
                ]
            },{
                xtype: "panel",
                title: "Status",
                items: [
                    {
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "1 - complete",
                        name: "status",
                        //inputValue: 1,  // returns true or false
                        id: "checkboxStatus1"
                    },{
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "2 - in progress",
                        name: "status",
                        id: "checkboxStatus2"
                        //inputValue: 2
                    },{
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "3 - incomplete",
                        name: "status",
                        id: "checkboxStatus3"
                        //inputValue: 3
                    }
                ]
            }
        ];
    },
    //items: []; // added on initCompoenent

    buildButtons: function() {
        return [{
            text: "Apply",
            id: "applyFilterButton",
            handler: "onApplyButtonClick"
        }/*, {
            text: "Reset",
            id: "resetFilterButton",
            disabled: true,
            handler: "onResetButtonClick"
        }*/];
    },
    //buttons: []; // added on initCompoenent

    /**
     * removes bold titles
     */
    resetTitles: function() {
        this.items.each(function(item) {
            var title = item.getTitle();
            if (title.indexOf("<b>") > -1) {
                title = title.replace("<b>", "");
                title = title.replace("</b>", "");
                item.setTitle(title);
            }
        });
    },

    listeners: {

        // new listener for click on title
        render: function() {
            var me = this;
            this.items.each(function(item) {

                // check if an item was clicked
                item.header.on("click", function() {

                    if (item.getCollapsed() === "top") {
                        //console.log("expand!");
                        item.expand();
                        //console.log("change to bold!");
                        me.resetTitles();
                        var title = item.getTitle();
                        item.setTitle("<b>" + title + "</b>");
                        item.header.addCls(".selectedTitle");
                        //item.header.setHeight(100);
                        //item.header.addCls("activeFilterPanelTitle");

                    } else {  // collapsed
                        console.log("do nothing!!");
                        //item.disable();
                    }

                    //item.addCls("activeFilterPanelTitle");
                });
            });
        }
    }
});
