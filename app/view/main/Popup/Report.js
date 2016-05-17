"use strict";

Ext.define("SppAppClassic.view.main.Popup.Report",{
    extend: "Ext.window.Window",
    xtype: "report",

    title: "Report",
    closable: true,  // currently gets destroyed on close
    //width: 200,
    //height: 350,
    //padding: "0 0 0 5",
    resizable: true,
    minWidth: 300,
    minHeight: 250,
    //autoScroll: true,
    //hideable: true,

    //hidden: true,  // hide on creation  -> not sure if that works
    //collapsible: true,
    constrain: true,  // prevents dragging out of browser window size

    // assign hide to close-button
    //closeAction: "hide",
    bodyStyle: "padding: 10px",
    layout: {
        type: "vbox",
        align: "stretch"
    },

    initComponent: function () {
        console.log("init Report...");
         Ext.apply(this, {
            items: [{
                xtype: "label",
                fieldLabel: 'ID',
                id: "featureField"
            },{
                xtype: "textfield",
                name: 'author',
                fieldLabel: 'Author'
                //flex: 1
            },{
                xtype: 'textarea',
                enableKeyEvents: true,
                hideLabel: true,
                grow: true,
                growMin: 100,
                growMax: 200
            }],
            buttons: [{
                text: "Send"
            }]
        });

        SppAppClassic.view.main.Popup.Report.superclass.initComponent.call(this);
    },

    updateContent: function(gid, place_type) {
        Ext.getCmp("featureField").setText(gid);
    }
});
