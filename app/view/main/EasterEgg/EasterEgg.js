"use strict";
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define("SppAppClassic.view.main.EasterEgg", {
    extend: "Ext.panel.Panel",
    xtype: "app-easterEgg",
    requires: [
        "Ext.plugin.Viewport",
        "Ext.window.MessageBox"
    ],

    controller: "easterEggController",
    viewModel: "main",
    plugins: "viewport",  // fullscreen

    title: "In the Matrix!",

    layout: {
        type: "border",
        padding: 5
    },
    border: true,
    items: [
        {
            region: "center",
            xtype: "panel",
            layout: "auto",
            items: [Ext.create("Ext.Img", {
                //src: "https://media.giphy.com/media/S4HKH9KgRGMdq/giphy.gif",
                //src: "https://media.giphy.com/media/A06UFEx8jxEwU/giphy.gif",    
                src: "https://49.media.tumblr.com/4c95075ff3ab0f50cec67d5f90cdd929/tumblr_n536xdv1CM1qhobleo1_500.gif",    
                
                height: "100%",
                width: "100%"
            })]
        },
        {
            region: "south",
            xtype: "textarea",
            height: 200,
            fieldLabel: "Message text",
            emptyText: ">> Enter jQuery hacks here...",
            hideLabel: true,
            name: "msg",
            fieldStyle: {
                "fontFamily"   : "courier new",
                "fontSize"     : "12px",
                "color": "#00cc00"
            }
            //flex: 1  // Take up all *remaining* vertical space (kicks in when resized)

        }
    ],
    listeners: {
        afterrender: "updateLogoutInfo"
    }
});
