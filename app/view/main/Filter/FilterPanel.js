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
    resizable: false,
    closeAction: "hide",
    title: "Filters",
    layout: "accordion",  // "anchor"
    width: 220,
    height: 400,
    defaults: {
        bodyPadding: 10
    },

    initComponent: function () {
        console.log("init filterpanel...");
        this.items = this.buildItems();
        this.buttons = this.buildButtons();
        SppAppClassic.view.main.Filter.FilterPanel.superclass.initComponent.call(this);
    },

    buildItems: function () {
        return [
            {
                xtype: "form",
                title: "Century",
                bodyPadding: 0,
                items: [
                    {
                        xtype: "fieldset",
                        id: "sliderFieldset",
                        flex: 1,
                        title: "Century",
                        collapsible: true,
                        border: false,
                        defaultType: "checkbox", // each item will be a checkbox
                        defaults: {
                            anchor: "100%",
                            hideEmptyLabel: false
                        },
                        items: [
                            {
                                xtype: "centuryslider",
                                padding: 5,
                                width: 400,
                                listeners: {
                                    changecomplete: "onSliderChangeComplete"
                                }
                            },{
                                xtype: "label",
                                reference: "sliderlabel",
                                text: "",
                                margin: "0 0 0 5"
                            }
                        ]
                    }
                ]
            },{
                xtype: "panel",
                title: "Status",
                bodyPadding: 0,
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
                bodyPadding: 0,
                items: [
                    {
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "Open",
                        name: "access",
                        //inputValue: 1,  // returns true or false
                        id: "checkboxStatus1"
                    },{
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "SPP restricted",
                        name: "access",
                        id: "checkboxStatus2"
                        //inputValue: 2
                    },{ 
                        xtype: "checkbox",
                        checked: true,
                        boxLabel: "Group restricted",
                        name: "access",
                        id: "checkboxStatus3"
                        //inputValue: 3
                    }
                ]
            }
        ];
    },
    //items: []; // added on initCompoenent

    buildButtons: function () {
        return [{
            text: "Apply",
            handler: "onApplyButtonClick"
        }, {
            text: "Reset",
            handler: "onResetButtonClick"
        }];
    }
    //buttons: []; // added on initCompoenent
});
