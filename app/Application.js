"use strict";
/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */

Ext.define('SppAppClassic.Application', {
    extend: 'Ext.app.Application',
    //reference: "application",  // used to get the geoserverPath variable
    name: "SppAppClassic",

    requires: [
        "AuthService"
    ],

    stores: [
        // TODO: add global / shared stores here
    ],

    views: [
        'SppAppClassic.view.login.Login',  // used in launch
        'SppAppClassic.view.main.Main'  // used in launch
    ],

    version: "1.0.1",  // shown in title

    // for vars used throughout the application
    // access via "SppAppClassic.app.globals.wmsPath";
    globals: {
        serverPath: "http://haefen.i3mainz.hs-mainz.de",  // leave blank for production
        geoserverPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver",
        homePath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/web/",
        //wmsPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/SPP/wms?",  // former GEOSERVER_URL
        proxyPath: "http://haefen.i3mainz.hs-mainz.de" + "/GeojsonProxy/layer?",
        loginPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_check",
        logoutPath: "http://haefen.i3mainz.hs-mainz.de" + "/geoserver/j_spring_security_logout",
        sppLayerTitle: "Data",
        sppLayerName: "SPP:spp_harbours_intern"
    },

    launch: function () {

        Ext.create({
            xtype: AuthService.isAuthenticated() ? 'app-main' : 'login'
        });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
