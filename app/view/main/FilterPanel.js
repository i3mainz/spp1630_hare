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
Ext.define("SppAppClassic.view.main.FilterPanel",{
    extend: "Ext.panel.Panel",
    xtype: "filterpanel",
    //reference: "filterpanel",
    id: "filterPanel",  // TODO: use references instead
    requires: [
        //"Ext.panel.Panel",
        //"Ext.form.Panel",
        "Ext.form.Label",
        "Ext.form.FieldSet",
        "Ext.form.field.Checkbox",
        "Ext.button.Button",
        "SppAppClassic.view.main.CenturySlider"
    ],

    controller: "main-filterpanel",

    /*viewModel: {
        type: "main-filterpanel"
    },*/
    region: "west",
    resizable: false,
    //closeAction: "hide",
    title: "Filters",
    layout: {
        type: "anchor",
        //type: "vbox",
        align: "stretch"
    },
    //width: 220,
    width: 230,
    bodyPadding: 10,
    margin: "0 0 0 5",
    scrollable: true,
    closable: true,
    collapsible: true,

    defaults: {
        xtype: "fieldset",
        defaultType: "checkbox",
        //labelWidth: 90,
        scrollable: true,
        checkboxToggle: false,
        collapsible: true,
        collapsed: true,
        border: false,
        defaults: {
            checked: true
            /*listeners: {  // currently not working!
                change: function(field, newVal, oldVal) {
                    console.log('change status!');
                }
            }*/
        }
        //anchor: "100%",
        //layout: "hbox"
    },

    /*defaults: {  // defaults for all items
        bodyPadding: 10,
        hideCollapseTool: false,
        collapsible: true,
        collapsed: false,
        titleCollapse: true  // true allows expanding on title click, done with custom listeners
    },*/


    //applyCounter: 0, // used to hide reset button when nothing has been applied yet

    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItems()
            //buttons: this.buildButtons()
        });
        SppAppClassic.view.main.FilterPanel.superclass.initComponent.call(this);
    },

    buildProjectCheckboxes: function() {
        var createProject = function(projectString, index) {
            return {
                xtype: "checkbox",
                boxLabel: projectString,
                //name: "project",
                //cls: "filterItems",
                style: {
                    "font-weight": "normal"
                },
                id: "project" + index + "Checkbox",
                listeners: {
                    change: "applyFilter"
                }
            };
        };

        var itemList = [];

        ProjectService.getProjectsWithDbName().forEach(function(project) {
            itemList.push(createProject(project.db_name, project.id));
        })

        return itemList;
    },

    /*buildPanelItems: function () {
        return {
                xtype: "panel",
                title: "Projects",
                id: "projectspanel",
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
                        id: "sliderlabel",
                        //reference: "sliderlabel",
                        text: "1BC - 13AD",
                        padding: "5 0 0 0"
                    },{
                        xtype: "centuryslider",
                        //id: "centuryslider",
                        width: 160,
                        padding: "0 0 10 0"
                    },{
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "allow propable",
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
                defaults: {
                    listeners: {  // currently not working!
                        change: function(field, newVal, oldVal) {
                            console.log('change status!');
                        }
                    }
                },
                items: [
                    {
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "1 - complete",
                        name: "status",
                        //inputValue: 1,  // returns true or false
                        id: "checkboxStatus1",
                        listeners: {  // currently not working!
                            change: function(field, newVal, oldVal) {
                                console.log('change status!');
                            }
                        }
                    },{
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "2 - in progress",
                        name: "status",
                        id: "checkboxStatus2",
                        listeners: {  // currently not working!
                            change: function(field, newVal, oldVal) {
                                console.log('change status!');
                            }
                        }
                        //inputValue: 2
                    },{
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "3 - incomplete",
                        name: "status",
                        id: "checkboxStatus3",
                        listeners: {  // currently not working!
                            change: function(field, newVal, oldVal) {
                                console.log('change status!');
                            }
                        }
                        //inputValue: 3
                    }
                ]
            }
        ];
    },*/

    buildItems: function () {
        return [
            {
                //xtype: "fieldset",

                title: "Projects",
                items: this.buildProjectCheckboxes()
            },{
                xtype: "centurySelector",
                title: "Centuries",
                width: 160


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
        ];
    },

    //items: [], // added on initCompoenent

    /*buildButtons: function() {
        return [{
            text: "Apply",
            id: "applyFilterButton",
            handler: "onApplyButtonClick"
        }];
    },*/

    /**
     * function for easier toggling. removes code in toolbarcontroller
     */
    toggle: function() {
        if (this.isHidden()) {
            this.show();
        } else {
            this.hide();
        }
    }

    /**
     * removes bold titles
     */
    /*resetTitles: function() {
        this.items.each(function(item) {
            var title = item.getTitle();
            if (title.indexOf("<b>") > -1) {
                title = title.replace("<b>", "");
                title = title.replace("</b>", "");
                item.setTitle(title);
            }
        });
    },*/

   /* listeners: {

        // new listener for click on title
        render: function() {
            var me = this;
            this.items.each(function(item) {

                // check if an item was clicked
                item.header.on("click", function() {
                    console.log(item.getTitle());
                    console.log(item.getCollapsed());
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
    }*/
});
