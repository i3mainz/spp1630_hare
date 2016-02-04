"use strict";

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

    //hidden: true,
    resizable: true,
    closeAction: "hide",
    title: "Filters",
    layout: "accordion",  // "anchor"
    width: 220,
    minHeight: 400,
    maxHeight: 500,

    defaults: {  // defaults for all items
        bodyPadding: 10,
        hideCollapseTool: true,
        titleCollapse: false  // true allows expanding on title click, done with custom listeners
    },

    applyCounter: 0, // used to hide reset button when nothing has been applied yet

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
                id: "project" + index
            };
        };
        var projects = ["Haefen an der Balkankueste des byzantinischen Reiches",
                        "Binnenhaefen im fränkisch-deutschen Reich",
                        "Effizienz und Konkurrenz",
                        "extern/Binnenhäfen",
                        //"Faehren (Universität Bamberg)",
                        //"Fossa Carolina",
                        //"HaNoA",
                        //"Ostseehaefen",
                        //"Rhein",
                        "Rheinhafenprojekt",
                        "Bremer Becken",
                        "Adria"];

        var itemList = [];
        projects.forEach(function(project, i) {
            itemList.push(createProject(project, i));
        });

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
                title: "Century",
                layout: "fit",
                items: [
                    {
                        xtype: "label",
                        reference: "sliderlabel",
                        text: "",
                        margin: "0 0 0 0"
                    },{
                        xtype: "centuryslider",
                        margin: "0 20 0 20",
                        listeners: {
                            changecomplete: "onSliderChangeComplete"
                        }
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
            },{
                xtype: "panel",
                title: "Access",
                disabled: true,
                items: [
                    {
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "Open",
                        name: "access",
                        //inputValue: 1,  // returns true or false
                        id: "access1"
                    },{
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "SPP restricted",
                        name: "access",
                        id: "access2"
                        //inputValue: 2
                    },{
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "Group restricted",
                        name: "access",
                        id: "access3"
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
        }, {
            text: "Reset",
            id: "resetFilterButton",
            disabled: true,
            handler: "onResetButtonClick"
        }];
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

        beforerender: function() {
            this.items.each(function(item) {
                item.expand();
            });
        },

        // new listener for click on title
        render: function() {
            var me = this;
            this.items.each(function(item) {

                // check if an item was clicked
                item.header.on("click", function() {

                    console.log("click on something!");
                    if (item.getCollapsed() === "top") {
                        console.log("expand!");
                        item.expand();
                        console.log("change to bold!");
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
