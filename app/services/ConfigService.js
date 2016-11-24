"use strict";

Ext.define("ConfigService", {
    singleton: true,

    host: "http://haefen.i3mainz.hs-mainz.de",

    paths: {},

    constructor: function() {
        this.paths.geoserver = this.host + "/geoserver/web/";
        this.paths.geoserverLogin = this.host + "/geoserver/j_spring_security_check/";
        this.paths.geoserverLogout = this.host + "/geoserver/j_spring_security_logout/";
        this.paths.wms = this.host + "/geoserver/SPP/wms?";
        this.paths.legendQuery = this.host + "/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&TRANSPARENT=true&legend_options=dpi:180&LAYER=";
        this.paths.proxy = this.host + "/GeojsonProxy/layer?";
    },

    // required access key for MapBox basemaps
    mapboxAccessToken: "pk.eyJ1Ijoic2hhbnl1YW4iLCJhIjoiY2lmcWd1cnFlMDI0dXRqbHliN2FzdW9kNyJ9.wPkC7amwS2ma4qKWmmWuqQ",

    /**
     * Texts used throughout the application
     */
    texts: {

        // headers
        title: "SPP 1630 Harbour Research Environment",
        treeTitle: "Layers",
        descriptionTitle: "Description",
        filterTitle: "Filters",
        mapTitle: "Map",
        featureTitle: "Feature Info",

        // landing page
        landingTitle: "SPP 1630 Harbour Research Environment",
        landingText: "This is the Harbour Research Environment (HARE) of the <a href='http://www.spp-haefen.de/' target='blank'>SPP 1630 Harbours Program</a>. It visualizes harbour related data compiled by participating SPP projects, as well as additional hydrological and archeological datasets. It is meant to act as a tool for researchers during their ongoing projects. This website is an afford of the working group \"Data Integration\". It was conceptualised in collaboration with the University of Jena (FSU) and is currently being developed by the i3mainz. Researchers can login using their credentials provided by the developers. Curious guests can skip the login and launch the app in guest-mode with fewer data and limited functions.",
        guestLoginText: "Continue as guest",

        // main
        descriptionPlaceholder: "Select a layer to see its description",
    },

    newsArticles: [
        {
            title: "New filter functionality!",
            timestamp: "11.07.2016",
            content: "The new tool 'Filters' is available for registred users in the toolbar. It allows the filtering of SPP data sets by project name, status and centuries. The slider to select centuries offers options to select all data available in one of the selected periods or to only select data that existed during all of the selected periods. The filter functionality is part of the newest update to version 1.1"
        },{
            title: "Keep calm, Fetch is here!",
            timestamp: "05.02.2016",
            content: "Inspired by a presentation on the <a href='http://onlinelibrary.wiley.com/doi/10.1111/j.1095-9270.2012.00365.x/abstract' target='_blank'>Fetch Method</a> by <a href='http://www.spp-haefen.de/en/projects/hanoa-haefen-im-nordatlantik/team/' target='_blank'>Dr. Mirianne Nitter</a> during the International Conference " +
                     "\"Harbours as objects of interdisciplinary research\" in Kiel 2015, we decided to include fetch data in the VRE. " +
                     "\"The fetch, also called the fetch length, is the length of water over which a given wind has blown. [...] Fetch length, along with wind speed, determines the size of waves produced\" (<a href='https://en.wikipedia.org/wiki/Fetch_(geography)' target='_blank'>Wikipedia</a>). " +
                     "After talks with the Adria Project, we derived fetch layers for the entire Adriatic See for eight wind directions. " +
                     "These are selectable in the Layer Tree at \"Layers -> Fetch\".<br>",
            image: "../resources/images/fetch.png"
        },{
            title: "Release Version 1.0",
            timestamp: "03.01.2016",
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
                     "and user interfaces that look modern while still being highly functional and simple.",
            image: ""
        }
    ],

    // colors used to style GeoJSON layers
    layerColors: {
        spp: {
            "Hafen":                "darkred",
            "Wasserfahrzeug":       "black",
            "Kanal/Schleppstrecke": "royalblue",
            "Wasserstraße":         "royalblue"
        }
    },

    // what feature info to show guests
    guestFeatureInfo: ["author", "project", "place_type"],

    // what features to exclude for logged in users due to irrelevance
    excludeFeatureList: ["geometry", "gid", "uid", "created", "modified"],

    // center of map
    mapCenterLonLat: [8.751278, 50.611368],
    mapDefaultZoom: 4, // 0 -28 (from far to close)

    /**
     * used for project-filter to get project-ID by name and contact infos for
     * feature window.
     * add to allow access to ag-internal layers
     */
    projects: [
        {
            id: "1",
            login_name: "adria",
            db_name: "Adria",
            contact: "http://www.spp-haefen.de/de/die-projekte/kommunikationsraum-adria"
        },
        {
            id: "2",
            login_name: "binnen",
            db_name: "Binnenhäfen im fränkisch-deutschen Reich",  // auch extern/Binnenhäfen
            contact: "http://www.spp-haefen.de/de/die-projekte/binnenhaefen-in-zentraleuropa/"
        },
        {
            id: "3",
            login_name: "bremen",
            db_name: "Bremer Becken",
            contact: "http://www.spp-haefen.de/de/die-projekte/abgeschlossene-projekte-der-ersten-laufzeit-2012-2015/haefen-im-bremer-becken/"
        },
        {
            id: "4",
            login_name: "effizienz",
            db_name: "Effizienz und Konkurrenz",
            contact: "http://www.spp-haefen.de/de/die-projekte/abgeschlossene-projekte-der-ersten-laufzeit-2012-2015/effizienz-und-konkurrenz-italischer-hafenstaedte/"
        },
        {
            id: "5",
            login_name: "fähren",
            db_name: "Fähren (Universität Bamberg)"
        },
        {
            id: "7",
            login_name: "fossa",
            db_name: "Fossa Carolina",
            contact: "http://www.spp-haefen.de/de/die-projekte/fossa-carolina/",
        },
        {
            id: "8",
            login_name: "balkan",
            db_name: "Häfen an der Balkanküste des byzantinischen Reiches",
            contact: "http://www.spp-haefen.de/de/die-projekte/haefen-an-der-balkankueste-des-byzantinischen-reiches/"
        },
        {
            id: "9",
            login_name: "hanoa",
            db_name: "HaNoA",
            contact: "http://www.spp-haefen.de/de/die-projekte/hanoa-haefen-im-nordatlantik/"
        },
        {
            id: "10",
            login_name: "ostsee",
            db_name: "Ostseehäfen",
            contact: "http://www.spp-haefen.de/de/die-projekte/ostseekueste/"
        },
        {
            id: "14",
            login_name: "rhein",
            db_name: "Rheinhafenprojekt"
        },{
            id: "19",
            login_name: "kröger",
            db_name: "SPP-Binnenschiffe"
        }
    ]
});
