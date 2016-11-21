"use strict";
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 */

Ext.define("SppAppClassic.main.MainPanel", {
    extend: "Ext.panel.Panel",

    xtype: "app-main",
    reference: "mainpanel",  // used in MainController // TODO: remove
    id: "mainpanel",

    requires: [
        "ConfigService",
        "Ext.plugin.Viewport",              // plugins: "viewport"
        "SppAppClassic.main.LayerTree",  // xtype: "layertree",
        "SppAppClassic.main.MapToolbar",  // xtype: "maptoolbar"
        "SppAppClassic.main.DescriptionPanel",
        "OL3MapService",
        "AuthService"
    ],

    controller: "main",
    plugins: "viewport",

    title: ConfigService.texts.title + " " + ConfigService.version,
    layout: {
        type: "border",
        padding: 5
    },
    border: true,

    items: [
        {
            region: "west",
            xtype: "app-tree",
            //store: treeStore,
            id: "layerTree", // used to set store later
            autoScroll: true,
            width: 230,
            margin: "0 5 0 0",
        },{
            xtype: "app-description",
            region: "west",
            width: 230,
            id: "descriptionPanel"
        },{
            xtype: "app-filterpanel",
            region: "west",
            margin: "0 5 0 0",
            hidden: true
        },{
            xtype: "panel",
            id: "mappanel",
            region: "center",
            title: "Map",
            layout: "fit", // map fills entire panel
            items: {
                xtype: "app-map",
                id: "geoextMap"
            },
            dockedItems: {
                xtype: "maptoolbar",
                id: "maptoolbar"
            },
            listeners: {
                render: function(panel) {
                    // add custom click event
                    panel.body.on("click", function(evt) {
                        // convert a click on the mappanel to a click on the ol3 map
                        evt.pixel = [evt.browserEvent.layerX, evt.browserEvent.layerY];
                        // provide event as parameter, it is used later to get pixel
                        Ext.getCmp("geoextMap").fireEvent("click", evt);
                    });
                }
            }
        }
    ],

    tools: [
        {
            xtype: "label",
            id: "infoLabel",
            html: "News",
            style: {
                "color": "#3892d4",
                "font-size": "13px",
                "font-weight": "bold",
                "margin-right": "10px",
                "cursor": "pointer"
            },
            listeners: {
                element: "el", click: "onNewsClick"
            }
        },{
            xtype: "label",
            id: "logoutButtonlabel",
            style: {
                "color": "#696969",
                "font-size": "13px",
                "font-weight": "normal",
                "margin-right": "5px"
            },
            listeners: {
                // update username after button has been added
                added: function() {
                    this.text = "Logged in as " + AuthService.getUser() + ".";
                }
            }
        },{
            xtype: "label",
            html: "Logout",
            align: "right",
            style: {
                "color": "#3892d4",
                "font-size": "13px",
                "font-weight": "bold",
                "cursor": "pointer"
            },
            listeners: {
                element: "el", click: "onClickLogout"
            }
        }
    ],

    listeners: {
        beforedestroy: "onMainPanelDestroy"
    }
});
