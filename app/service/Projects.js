"use strict";
// collection of shared data
// not really a class
// todo: make store

Ext.define("Projects", {
    /* singleton classes get created when they are defined. no need to Ext.create them.
    access them via the class-name directly. e.g. LayerStyles.bluePoints
    variable is globally available */

    singleton: true,

    projectList: {
        adria: {
            "id": 1,
            "spp_name": "Kommunikationsraum Adria",
            "db_name": "Adria",
            "hasData": true,
            "contact": "http://www.spp-haefen.de/de/die-projekte/kommunikationsraum-adria",
            "hasLogin": true
        },
        binnen: {
            "id": 2,
            "spp_name": "Binnenhäfen im fränkisch-deutschen Reich",
            "db_name": "Binnenhäfen im fränkisch-deutschen Reich",  // auch extern/Binnenhäfen
            "hasData": true,
            "contact": "http://www.spp-haefen.de/de/die-projekte/binnenhaefen-in-zentraleuropa/",
            "hasLogin": true
        },
        bremen: {
            "id": 3,
            "spp_name": "Häfen im Bremer Becken",
            "db_name": "Bremer Becken",
            "hasData": true,
            "contact": "http://www.spp-haefen.de/de/die-projekte/abgeschlossene-projekte-der-ersten-laufzeit-2012-2015/haefen-im-bremer-becken/",
            "hasLogin": false  // abgelaufenes Projekt
        },
        effizienz: {
            "id": 4,
            "spp_name": "Effizienz und Konkurrenz italienischer Hafenstädte",
            "db_name": "Effizienz und Konkurrenz",
            "hasData": true,
            "contact": "http://www.spp-haefen.de/de/die-projekte/abgeschlossene-projekte-der-ersten-laufzeit-2012-2015/effizienz-und-konkurrenz-italischer-hafenstaedte/",
            "hasLogin": false  // abgelaufenes Projekt
        },
        faehren: {
            "id": 5,
            "spp_name": "???",
            "db_name": "Fähren (Universität Bamberg)",
            "hasData": true,
            "contact": "",
            "hasLogin": false  // nicht sicher
        },
        ainos: {
            "id": 6,
            "spp_name": "Die thrakische Hafenstadt Ainos",
            "db_name": false,
            "hasData": false,
            "hasLogin": true
        },
        fossa: {
            "id": 7,
            "spp_name": "Fossa Carolina",
            "db_name": "Fossa Carolina",
            "hasData": true,
            "contact": "http://www.spp-haefen.de/de/die-projekte/fossa-carolina/",
            "hasLogin": true
        },
        balkan: {
            "id": 8,
            "spp_name": "Häfen an der Balkanküste des byzantinischen Reiches",
            "db_name": "Häfen an der Balkanküste des byzantinischen Reiches",
            "hasData": true,
            "contact": "http://www.spp-haefen.de/de/die-projekte/haefen-an-der-balkankueste-des-byzantinischen-reiches/",
            "hasLogin": true
        },
        hanoa: {
            "id": 9,
            "spp_name": "HaNoA - Häfen im Nordatlantik",
            "db_name": "HaNoA",
            "hasData": true,
            "contact": "http://www.spp-haefen.de/de/die-projekte/hanoa-haefen-im-nordatlantik/",
            "hasLogin": true
        },
        ostsee: {
            "id": 10,
            "spp_name": "Ostseeküste",
            "db_name": "Ostseehäfen",
            "hasData": true,
            "contact": "http://www.spp-haefen.de/de/die-projekte/ostseekueste/",
            "hasLogin": true
        },
        rhein: {
            "id": 11,
            "spp_name": "Der Rhein als europäische Verkehrsachse",
            "db_name": "Rhein",
            "hasData": true,
            "contact": "http://www.spp-haefen.de/de/die-projekte/der-rhein-als-europaeische-verkehrsachse/",
            "hasLogin": true
        },
        byzanz: {
            "id": 12,
            "spp_name": "Hafenverwaltung im Byzantinischen Reich",
            "db_name": false,
            "hasData": false,
            "hasLogin": true
        },
        koordination: {
            "id": 13,
            "spp_name": "Koordination",
            "db_name": false,
            "hasData": false,
            "hasLogin": true
        },
        rheinhafen: {
            "id": 14,
            "spp_name": "???",
            "db_name": "Rheinhafenprojekt",
            "hasData": true,
            "contact": "",
            "hasLogin": false
        },
        nordsee: {
            "id": 15,
            "spp_name": "Nordseeküste",
            "db_name": false,
            "hasData": false,
            "hasLogin": true
        },
        runholt: {
            "id": 16,
            "spp_name": "Der Handelsplatz Rungholt",
            "db_name": false,
            "hasData": false,
            "hasLogin": true
        },
        netzwerk: {
            "id": 17,
            "spp_name": "Im Netzwerk fluvialer Häfen",
            "db_name": false,
            "hasData": false,
            "hasLogin": true
        },
        geophysik: {
            "id": 18,
            "spp_name": "Geophysikalisches Zentralprojekt",
            "db_name": false,
            "hasData": false,
            "hasLogin": true
        }
    },

    /**
     * returns the project object that has the given name
     * as db_name
     */
    getProjectByName: function(projectName) {
        var me = this;
        for (var key in me.projectList) {
            if (!me.projectList.hasOwnProperty(key)) continue;

            var project = me.projectList[key];

            if (project.db_name === projectName) {
                return project;
            }
        }
    }
});
