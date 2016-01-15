"use strict";

Ext.define("SppAppClassic.view.main.Filter.FilterPanel",{
    extend: "Ext.window.Window",
    xtype: "filterpanel",
    reference: "filterpanel",
    id: "filterPanel",  // TODO: use references instead
    requires: [
        "SppAppClassic.view.main.Filter.FilterPanelController",
        "SppAppClassic.view.main.Filter.CenturySlider",
        "Ext.button.Button"
    ],

    controller: "main-filterpanel",

    /*viewModel: {
        type: "main-filterpanel"
    },*/

    hidden: true,
    resizable: false,
    closeAction: "hide",
    title: "Filters",
    layout: "anchor",

    items: [
        {
            xtype: "centuryslider",
            padding: 5,
            listeners: {
                changecomplete: "onSliderChangeComplete" 
            }
        },{
            xtype: "label",
            reference: "sliderlabel",
            text: "",
            margin: "0 0 0 5"
        },/*,{
            xtype: 'button',
            text: 'reset',
            padding: 5,
            handler: 'onButtonReset'
        }*/
        {
            xtype: "fieldset",
            flex: 1,
            title: "Status",
            checkboxToggle: true,
            collapsed: true,

            defaultType: "checkbox", // each item will be a checkbox
            layout: "anchor",
            defaults: {
                anchor: "100%",
                hideEmptyLabel: true
            },
            items: [{
                fieldLabel: "Select Status",

                checked: true,
                boxLabel: "1 - complete",
                name: "status",
                //inputValue: 1,  // returns true or false
                id: "checkboxStatus1"
            },{
                checked: true,
                boxLabel: "2 - in progress",
                name: "status",
                id: "checkboxStatus2"
                //inputValue: 2
            },{
                checked: true,
                boxLabel: "3 - incomplete",
                name: "status",
                id: "checkboxStatus3"
                //inputValue: 3
            }]

        },
        {
            xtype: "fieldset",
            flex: 1,
            title: "Type",
            checkboxToggle: true,
            collapsed: true,

            defaultType: "checkbox", // each item will be a checkbox
            layout: "anchor",
            defaults: {
                anchor: "100%",
                hideEmptyLabel: false
            },
            items: [
                {
                    fieldLabel: "Select Type",

                    checked: true,
                    boxLabel: "Harbour",
                    name: "type",
                    inputValue: true,
                    id: "checkboxTypeHarbour1"
                }, {
                    checked: true,
                    boxLabel: "Canal",
                    name: "type",
                    inputValue: true,
                    id: "checkboxTypeCanal"
                }, {
                    checked: true,
                    boxLabel: "Vehicle",
                    name: "type",
                    inputValue: true,
                    id: "checkboxTypeVehicle"
                }
            ]
        },
        {
            xtype: "fieldset",
            flex: 1,
            title: "Location",
            checkboxToggle: true,
            collapsed: true,

            defaultType: "checkbox", // each item will be a checkbox
            layout: "anchor",
            defaults: {
                anchor: "100%",
                hideEmptyLabel: false
            },
            items: [
                {
                    fieldLabel: "Select secure",

                    checked: true,
                    boxLabel: "sehr sicher",
                    name: "type_1",
                    inputValue: true
                },{
                    checked: true,
                    boxLabel: "sicher",
                    name: "type_2",
                    inputValue: true
                },{
                    checked: true,
                    boxLabel: "vermuted",
                    name: "type_3",
                    inputValue: true
                },{
                    checked: true,
                    boxLabel: "unsicher",
                    name: "type_3",
                    inputValue: true
                },{
                    checked: true,
                    boxLabel: "sehr unsicher",
                    name: "type_3",
                    inputValue: true
                }
            ]
        },{
            xtype: "button",
            text: "apply",
            flex: 2,
            handler: "onApplyButtonClick"
        },{
            xtype: "button",
            text: "reset",
            flex: 1,
            handler: "onResetButtonClick"
        }
    ],

    listeners: {
        close: "onClose"
    }
});
