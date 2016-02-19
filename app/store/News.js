Ext.define("SppAppClassic.store.News", {
    extend: "Ext.data.Store",

    alias: "store.news",
    storeId: "newsStore",

    //requires: 'MyApp.model.User',
    //model: 'MyApp.model.User',

    fields: [
        "author", "timestamp", "title", "content", "image"
    ],

    data: { items: [
        /*{
            title: "Plenartreffen 2016",
            author: "i3mainz",
            timestamp: "17.02.2016 09:53 AM",
            content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        },*/{
            title: "Keep calm, Fetch is here!",
            author: "i3mainz",
            timestamp: "05.02.2016 10:00 AM",
            content: "Inspired by a presentation on the <a href='http://onlinelibrary.wiley.com/doi/10.1111/j.1095-9270.2012.00365.x/abstract' target='_blank'>Fetch Method</a> by <a href='http://www.spp-haefen.de/en/projects/hanoa-haefen-im-nordatlantik/team/' target='_blank'>Dr. Mirianne Nitter</a> during the International Conference " +
                     "\"Harbours as objects of interdisciplinary research\" in Kiel 2015, we decided to include fetch data in the VRE. " +
                     "\"The fetch, also called the fetch length, is the length of water over which a given wind has blown. [...] Fetch length, along with wind speed, determines the size of waves produced\" (<a href='https://en.wikipedia.org/wiki/Fetch_(geography)' target='_blank'>Wikipedia</a>). " +
                     "After talks with the Adria Project, we derived fetch layers for the entire Adriatic See for eight wind directions. " +
                     "These are selectable in the Layer Tree at \"Layers -> Fetch\".<br>",
            image: "/resources/images/fetch.png"
        },{
            title: "Release Version 1.0 Drake",
            author: "i3mainz",
            timestamp: "03.01.2016 15:10 PM",
            content: "A lot has changed since the first tech demo of this WebGIS in 2013?. The first version " +
                     "was created using GXP, included in the OpenGeo Suite. It is used by " +
                     "OpenGeo in their applications, such as GeoExplorer and GeoEditor. GXP provides high " +
                     "level components for GeoExt based applications. GeoExt in turn, brings together the" +
                     " geospatial know how of OpenLayers with the user interface of Sencha Ext JS. " +
                     "Software versions that were modern at the time (GeoExt 1.1, OpenLayers 2.12 and " +
                     "ExtJS 3) are now outdated and mostly abandoned by their developers.<br>" +
                     "To keep up with the demands for new functionality and improved performance the used javascript " +
                     "libraries were updated to their latest versions. The SPP VRE release 1.0 was built using " +
                     "<a href='https://geoext.github.io/geoext3/' target='_blank'>GeoExt 3</a>, " +
                     "<a href='http://openlayers.org/' target='_blank'>OpenLayers 3.13</a> and " +
                     "<a href='https://www.sencha.com/products/extjs/#overview' target='_blank'>ExtJS 6</a>. This enables us to quickly develop new GIS functionality " +
                     "and user interfaces that look modern while still being highly functional and simple." +
                     "<p>Version 1.x is codenamed \"Drake\" in reference to <a href='https://en.wikipedia.org/wiki/Francis_Drake' target='_blank'>Sir Francis Drake</a>.</p>",
            image: ""
        }
    ]},

    proxy: {
        type: "memory",
        reader: {
            type: "json",
            rootProperty: "items"
        }
    }
});
