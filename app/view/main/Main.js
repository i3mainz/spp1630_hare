/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SppAppClassic.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'SppAppClassic.view.main.MainController',
        'SppAppClassic.view.main.MainModel'
        // no need to require Main.js since it
        // gets extended

        // not sure if they are all needed or
        // if the are loaded anyway
    ],

    controller: 'main',
    viewModel: 'main',
    plugins: 'viewport',  // fullscreen

    title: "SPP Virtual Research Environment",
    
    header: {
        tools: [
            {
                xtype: 'button',
                text: 'Logout',
                align: "right",
                glyph: 'xf08b@fontawesome',
                handler: 'onClickLogout'
            }
        ]
    },
    layout: {
        type: 'border',
        padding: 5
    },
    border: true,
    items: [{   
        region: "center",
        layout: 'fit',
        items: [
            {
                xtype: 'mappanel',  // defined in Map.js
                /* mappanel includes two panels: the treepanel and the
                panel containing the GeoExt3 map component. since they both need a reference
                to the OL3 map, I dont know how to separate the logic into
                the MapModel.js file */
            },{
                xtype: "popup",  // create hidden window to use as popup later
                id: "popupWindow"  // used to reference and fill it in Map.js
            }
        ]
        
    }]
});
