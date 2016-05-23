"use strict";

Ext.define("SppAppClassic.view.main.InfoTabPanel", {
    extend: "Ext.tab.Panel",
    requires: [
        //"SppAppClassic.view.main.News",
        "SppAppClassic.view.main.About",
        "Ext.form.field.Checkbox",
        "SppAppClassic.view.main.NewsArticleContainer"
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

    // dragging
    //draggable: true,
    constrain: true,

    defaults: {
        bodyPadding: 15
    },

    initComponent: function () {

        var me = this;
        Ext.apply(this, {
            items: [{
                xtype: "container",
                id: "newsPanel",
                title: "News",
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
                items: me.addNewsConainers(NewsService.getNews())
            },{
                xtype: "aboutpanel",
                title: "About"
            }]

            /*buttons: [{
                xtype: "checkbox",
                label: "Don't show again!"
            },{
                text: "Continue to VRE",
                handler: "onContinueClick"
            }]*/
        });

        //this.appendNews(NewsService.getNews());

        SppAppClassic.view.main.InfoTabPanel.superclass.initComponent.call(this);
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
                //layout: "fit",
                //margin: "10px",
                // container css
                /*style: {
                    //borderColor: "#000000",
                    borderStyle: "solid",
                    borderWidth: "1px"
                },*/
                // content css
                /*bodyStyle: {
                    //"maxHeight": "300px",
                    //"border-width": "5px",
                    "padding": "10px"
                },*/
                //cls: "news-entry-panel",
                //border: true,
                //shadow: "drop",
                //title: news.get("title"),
                //html: html
            })
        });
        return news;
    }
});
