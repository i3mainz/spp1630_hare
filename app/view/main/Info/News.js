"use strict";

Ext.define("SppAppClassic.view.main.Info.News",{
    extend: "Ext.panel.Panel",
    xtype: "newspanel",
    id: "newspanel",
    requires: [
        "SppAppClassic.store.News"
    ],

    //store: {type: "news"},  // reference store via its alias -> gets created again

    stores: ["SppAppClassic.store.News"],

    //controller: "main-popup",

    //title: "News",
    //closable: true,  // currently gets destroyed on close
    //padding: "0 0 0 5",

    autoScroll: true,

    //modal: true,  // masks everthing else
    //constrain: true,  // prevents dragging out of browser window size

    layout: {
        type: "vbox",
        align: "stretch",
        padding: "5 0 5 0"
    },
    /*bodyStyle: {
        "background-color": "#f5f5f5"
    },*/

    initComponent: function () {
        console.log("init News...");
        SppAppClassic.view.main.Info.News.superclass.initComponent.call(this);
    },

    updateContent: function() {
        var me = this;
        var newsStore = Ext.create("SppAppClassic.store.News");

        // create new panel for each news entry and apply it to newspanel
        newsStore.each(function(news) {
            //console.log(news);
            var html = me.createNewsHtml(news.get("title"), news.get("content"), news.get("author"), news.get("timestamp"));
            me.add({
                xtype: "panel",
                padding: "5 10 5 10",
                bodyStyle: "padding: 10px",
                cls: "news-entry-panel",  // doesnt work
                border: true,
                shadow: "drop",
                //title: news.get("title"),
                html: html
            });
        });
    },

    createNewsHtml: function(title, content, author, timestamp) {
        var html = "";
        html += "<h4>" + title + "</h4>";
        html += "<p><span class='glyphicon glyphicon-user author-icon'></span> <span class='author'>" + author + "</span>   ";
        html += "<span class='glyphicon glyphicon-time time-icon'></span> <span class='time'>" + timestamp + "</span></p>";
        html += "<p>" + content + "</p>";

        return html;
    },

    listeners: {
        afterrender: function() {
            this.updateContent();
        }
    }
});
