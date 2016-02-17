"use strict";

Ext.define("SppAppClassic.view.main.Info.InfoPanel", {
    extend: "Ext.tab.Panel",
    requires: [
        "SppAppClassic.view.main.Info.InfoPanelController",
        "SppAppClassic.view.main.Info.News",
        "SppAppClassic.view.main.Info.About",
        "Ext.form.field.Checkbox"
    ],
    xtype: "infopanel",
    controller: "main-info",

    style: "background-color: #dfe8f6;",
    //width: 550,
    //height: 600,
    width: "50%",
    height: "70%",
    modal: true,  // masks everthing else

    // behave like a window
    //closable: true,
    floating: true,

    // dragging
    //draggable: true,
    constrain: true,

    defaults: {
        bodyPadding: 15
    },

    initComponent: function () {
        console.log("init Infopanel...");

        Ext.apply(this, {
            items: [{
                xtype: "newspanel",
                title: "News"
            },{
                xtype: "aboutpanel",
                title: "About"
            }],

            buttons: [/*{
                xtype: "checkbox",
                label: "Don't show again!"
            },*/{
                text: "Continue to VRE",
                handler: "onContinueClick"
            }]
        });

        SppAppClassic.view.main.Info.InfoPanel.superclass.initComponent.call(this);
    }

});
