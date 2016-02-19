"use strict";

Ext.define("SppAppClassic.view.main.Info.NewsArticle",{
    extend: "Ext.container.Container",
    xtype: "newsarticle",
    requires: [
        "Ext.Component", // xtype: component or box
        "Ext.Img"
    ],

    contentTitle: false,
    contentAuthor: false,
    contentTimestamp: false,
    contentText: false,
    contentImage: false,

    //border: true,
    layout: {
        type: "vbox",
        align: "stretch",
        pack: "start"
        //padding: "5 0 5 0"
    },
    style: {
        borderColor: "#f5f5f5",
        borderStyle: "solid",
        borderWidth: "1px"
    },

    padding: "5 10 5 10",
    margin: "10 10 0 10",

    initComponent: function () {
        console.log("init News Article...");
        var me = this;

        Ext.apply(this, {
            items: [
                me.buildContent(),
                me.buildImage()
            ]
        });

        SppAppClassic.view.main.Info.NewsArticle.superclass.initComponent.call(this);
    },

    buildContent: function() {
        var me = this;
        if (me.contentTitle && me.contentText && me.contentAuthor && me.contentTimestamp) {
            return {
                // content
                xtype: "component",
                /*style: {
                    "font-size": "15px",
                    "font-weight": "bold"
                },*/
                html:   "<h4>" + me.contentTitle + "</h4>" + // uses bootstrap
                        "<p>" +
                            "<span class='glyphicon glyphicon-user author-icon'></span> <span class='author'>" + me.contentAuthor + "</span>   " +
                            "<span class='glyphicon glyphicon-time time-icon'></span> <span class='time'>" + me.contentTimestamp + "</span>" +
                        "</p>" +
                        "<p>" + me.contentText + "</p>"
            };
        }
    },

    buildImage: function() {
        var me = this;
        if (me.contentImage) {
            return {
                xtype: "image",
                style: {
                    //"margin-top": "10px",
                    "border-radius": "10px",
                    "margin-bottom": "5px"
                },
                height: "150px",
                //width: "100%",
                src: me.contentImage
            };
        }
    }
});
