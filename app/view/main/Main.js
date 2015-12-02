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
        'SppAppClassic.view.main.MainModel',
        // no need to require Main.js since it
        // gets extended

        // not sure if they are all needed or
        // if the are loaded anyway
        'SppAppClassic.view.main.MapController',
        'SppAppClassic.view.main.MapModel',
        'SppAppClassic.view.main.Map'
    ],

    controller: 'main',
    viewModel: 'main',
    plugins: 'viewport',  // fullscreen

    //ui: 'navigation',
    /*
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },
    */
    //title: "ParentTitle",
    title: "SPP Virtual Research Environment",
    
    // settings for title bar
    header: {
        //titlePosition: 2,
        //titleAlign: "left",
        //buttonAlign: 'right',
        tools: [ // tools within title bar
            //{type: "pin"}
            /*
            {
                type:'refresh',
                tooltip: 'Refresh form Data',
                handler: function(event, toolEl, panel){
                    // refresh logic
                }
            },
            {
                type:'help',
                tooltip: 'Get Help',
                handler: ""
            },
            */
            {
                xtype: 'button',
                text: 'Logout',
                align: "right",
                glyph: 'xf08b@fontawesome',
                handler: 'onClickLogout'
            }
        ]
    },
    //html: "Hello, World!!"
    
    /*
    dockedItems: [{
        xtype: 'toolbar',
        cls: "navbar",  // custom class for css styling
        dock: 'top',
        items: [
            "->",  // align next to right  
            {
                xtype: 'button',
                text: 'Logout',
                //margin: '10 0',
                handler: 'onClickButton'
            }
        ]
    }],
    */

    //layout: "border",
    layout: {
        type: 'border',
        padding: 5
    },
    border: true,
    items: [
    /*
    {
        title: 'Home',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'mainlist'
        }]
    }, {
        title: 'Users',
        iconCls: 'fa-user',
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: 'Groups',
        iconCls: 'fa-users',
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: 'Settings',
        iconCls: 'fa-cog',
        bind: {
            html: '{loremIpsum}'
        }
    },
    */
    // include GeoExt3 map
    {   
        region: "center",
        //title: 'parentTitle',
        //iconCls: 'fa-map-marker',
        layout: 'fit',
        items: [{
            xtype: 'mappanel'  // defined in Map.js
            /* mappanel includes two panels: the treepanel and the
            panel containing the GeoExt3 map component. since they both need a reference
            to the OL3 map, I dont know how to separate the logic into
            the MapModel.js file */
        }]
        
    }]
});
