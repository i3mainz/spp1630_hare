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
            "hasLogin": true
        },
        binnen: {
            "id": 2,
            "spp_name": "Binnenhäfen im fränkisch-deutschen Reich",
            "db_name": "Binnenhäfen im fränkisch-deutschen Reich",  // auch extern/Binnenhäfen
            "hasData": true,
            "hasLogin": true
        },
        bremen: {
            "id": 3,
            "spp_name": "Häfen im Bremer Becken",
            "db_name": "Bremer Becken",
            "hasData": true,
            "hasLogin": false  // abgelaufenes Projekt
        },
        effizienz: {
            "id": 4,
            "spp_name": "Effizienz und Konkurrenz italienischer Hafenstädte",
            "db_name": "Effizienz und Konkurrenz",
            "hasData": true,
            "hasLogin": false  // abgelaufenes Projekt
        },
        faehren: {
            "id": 5,
            "spp_name": "???",
            "db_name": "Fähren (Universität Bamberg)",
            "hasData": true,
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
            "hasLogin": true
        },
        balkan: {
            "id": 8,
            "spp_name": "Häfen an der Balkanküste des byzantinischen Reiches",
            "db_name": "Häfen an der Balkanküste des byzantinischen Reiches",
            "hasData": true,
            "hasLogin": true
        },
        hanoa: {
            "id": 9,
            "spp_name": "HaNoA - Häfen im Nordatlantik",
            "db_name": "HaNoA",
            "hasData": true,
            "hasLogin": true
        },
        ostsee: {
            "id": 10,
            "spp_name": "Ostseeküste",
            "db_name": "Ostseehäfen",
            "hasData": true,
            "hasLogin": true
        },
        rhein: {
            "id": 11,
            "spp_name": "Der Rhein als europäische Verkehrsachse",
            "db_name": "Rhein",
            "hasData": true,
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
    }

});
