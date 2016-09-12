"use strict";

Ext.define("ConfigService", {
    singleton: true,


    //homePath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/web/",
    //loginPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_check",
    //logoutPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_logout",

    paths: {
        host: "http://haefen.i3mainz.hs-mainz.de",
        geoserver: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/web/",
        geoserverLogin: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_check",
        geoserverLogout: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_logout"
    },

    /**
     * Texts used throughout the application
     */
    texts: {
        landingTitle: "SPP Virtual Research Environment",
        landingText: "This is the Virtual Research Environment (VRE) of the SPP 1630 Harbours Program. It visualizes harbour related data compiled by participating SPP projects, as well as additional hydrological and archeological datasets. It is meant to act as a tool for researchers during their ongoing projects. This website is an afford of the working group \"Data Integration\". It was conceptualised in collaboration with the University of Jena (FSU) and is currently being developed by the i3mainz. Researchers can login using their credentials provided by the developers. Curious guests can skip the login and launch the app in guest-mode with fewer data and limited functions.",
    },
    tooltips: {
        login: "Login using your username/password combination"
    },

    settings: {

    }

});
