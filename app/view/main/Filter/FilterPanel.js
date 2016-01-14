"use strict";

Ext.define("SppAppClassic.view.main.Filter.FilterPanel",{
    extend: "Ext.window.Window",
    xtype: "filterpanel",
    reference: "filterpanel",
    id: "filterPanel",  // TODO: use references instead
    requires: [
        "SppAppClassic.view.main.Filter.FilterPanelController",
        "SppAppClassic.view.main.Filter.FilterPanelModel",
        "SppAppClassic.view.main.Filter.CenturySlider"
    ],

    controller: "main-filterpanel",
    //controller: "main-map",

    viewModel: {
        type: "main-filterpanel"
    },
    //height: 250,
    //collapsed: true,
    hidden: true,
    resizable: false,
    closeAction: "hide",
    //split: true,
    //collapsible: true,
    title: "Filters",
    layout: "anchor",
    //collapseMode: "mini",  // applied directly in Map.js
    items: [
        {
            xtype: "centuryslider",
            padding: 5,
            listeners: {
                changecomplete: "onSliderChangeComplete"  // refers to MapController.js -> since Toolbar cannot have it's own controller
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
                hideEmptyLabel: false
            },
            items: [
                {   
                    fieldLabel: "Select Status",

                    checked: true,
                    boxLabel: "1 - complete",
                    name: "status_1",
                    inputValue: true
                }, {
                    checked: true,
                    boxLabel: "2 - in progress",
                    name: "status_2",
                    inputValue: true
                }, {
                    checked: true,
                    boxLabel: "3 - incomplete",
                    name: "status_3",
                    inputValue: true
                }
            ]
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
                    name: "type_1",
                    inputValue: true
                }, {
                    checked: true,
                    boxLabel: "Canal",
                    name: "type_2",
                    inputValue: true
                }, {
                    checked: true,
                    boxLabel: "Vehicle",
                    name: "type_3",
                    inputValue: true
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
        }
    ],

    listeners: {
        close: "onClose"
    }
});
