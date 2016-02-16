"use strict";

Ext.define("SppAppClassic.view.main.News",{
    extend: "Ext.window.Window",
    xtype: "newspanel",
    id: "newspanel",
    requires: [
        "Ext.panel.Panel",
        "SppAppClassic.store.News"
    ],

    //store: {type: "news"},  // reference store via its alias -> gets created again

    stores: ["SppAppClassic.store.News"],

    //controller: "main-popup",

    title: "News",
    closable: true,  // currently gets destroyed on close
    width: 200,
    height: 350,
    //padding: "0 0 0 5",
    //resizable: true,
    minWidth: 500,
    minHeight: 600,
    autoScroll: true,

    modal: true,  // masks everthing else
    constrain: true,  // prevents dragging out of browser window size

    layout: {
        type: "vbox",
        align: "stretch",
        padding: "5 0 5 0"
    },
    bodyStyle: {
        "background-color": "#f5f5f5"
    },

    initComponent: function () {
        console.log("init News...");
        SppAppClassic.view.main.News.superclass.initComponent.call(this);
    },

    updateContent: function() {
        var me = this;
        var newsStore = Ext.create("SppAppClassic.store.News");

        // create new panel for each news entry and apply it to newspanel
        newsStore.each(function(news) {
            //console.log(news);
            var html = me.createNewsHtml(news.get("title"), news.get("content"), news.get("author"));
            me.add({
                xtype: "panel",
                padding: "5 10 5 10",
                bodyStyle: "padding: 10px",
                border: true,
                //shadow: "drop",
                //title: news.get("title"),
                html: html
            });
        });
    },

    createNewsHtml: function(title, content, author) {
        var html = "";
        html += "<h4>" + title + "</h4>";
        html += "<span class='glyphicon glyphicon-envelope'></span><i class='author'>" + author + "</i>";
        html += "<span class='glyphicon glyphicon-clock'></span><i class='author'>10.02.2016</i>";
        html += "<p>" + content + "</p>";

        return html;
    },

    listeners: {
        afterrender: function() {
            this.updateContent();
        }
    }
});
