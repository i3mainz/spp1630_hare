"use strict";

Ext.define("SppAppClassic.main.NewsPanel", {
    extend: "Ext.panel.Panel",
    requires: [
        "ConfigService",
        "Ext.form.field.Checkbox",
        "SppAppClassic.main.NewsArticleContainer"
    ],

    xtype: "infotabpanel",
    id: "infotabpanel",

    style: "background-color: #dfe8f6;",

    width: 700,
    height: "70%",
    modal: true,  // masks everthing else

    // behave like a window
    closable: true,
    floating: true,

    title: "News",

    autoScroll: true,

    // dragging
    //draggable: true,
    constrain: false,

    defaults: {
        bodyPadding: 15
    },

    layout: "fit",

    initComponent: function () {

        var me = this;
        Ext.apply(this, {
            items: [{
                xtype: "container",
                id: "newsPanel",

                autoScroll: true,

                margin: "0 0 10 0",
                //modal: true,  // masks everthing else
                //constrain: true,  // prevents dragging out of browser window size
                layout: {
                    type: "vbox",
                    align: "stretch",
                    pack: "start"
                    //padding: "5 0 5 0"
                },
                items: me.addNewsConainers(ConfigService.newsArticles)
            }/*,{
                xtype: "aboutpanel",
                title: "About"
            }*/]

        });

        SppAppClassic.main.NewsPanel.superclass.initComponent.call(this);
    },

    addNewsConainers: function(newsList) {
        var news = [];
        // create new panel for each news entry and apply it to newspanel
        newsList.forEach(function(article) {
            //console.log(news);
            //var html = me.createNewsHtml(news.get("title"), news.get("content"), news.get("author"), news.get("timestamp"), news.get("image"));
            news.push({
                xtype: "newsarticlecontainer",
                //padding: "5 10 5 10",

                contentTitle: article.title,
                contentAuthor: article.author,
                contentTimestamp: article.timestamp,
                contentText: article.content,
                contentImage: article.image
            })
        });
        return news;
    }
});
