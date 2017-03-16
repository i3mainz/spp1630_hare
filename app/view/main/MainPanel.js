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
        "AuthService",
        "Ext.plugin.Viewport",
        "SppAppClassic.main.LayerTree",
        "SppAppClassic.main.DescriptionPanel",
        "SppAppClassic.main.FilterPanel",
        "SppAppClassic.main.MapPanel"
    ],
    controller: "main",
    plugins: "viewport",
    title: ConfigService.texts.title,
    layout: {
        type: "border",
        padding: 5
    },
    border: true,
    items: [
        {
            id: "layerTree", // used to set store later
            region: "west",
            xtype: "app-tree"
        },{
            id: "descriptionPanel",
            xtype: "app-description",
            region: "west"
        },{
            id: "filterPanel",
            xtype: "app-filter",
            region: "west"
        },{
            id: "mappanel",
            xtype: "app-map",
            region: "center"
        }
    ],

    tools: [{
            xtype: "label",
            id: "infoLabel",
            html: "News",
            cls: "action-label",
            listeners: {
                element: "el", click: "onNewsClick"
            }
        },{
          xtype: "label",
          html: "Imprint",
          align: "right",
          cls: "action-label",
          listeners: {
            element: "el", click: "onImprintClick"
          }
        },{
            xtype: "label",
            id: "logoutButtonlabel",
            cls: "text-label",
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
            cls: "action-label",
            listeners: {
                element: "el", click: "onClickLogout"
            }
        }
    ],
    listeners: {
        // beforerender: "addFilterPanel",
        beforedestroy: "onMainPanelDestroy"
    }
});
