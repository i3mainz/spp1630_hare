"use strict";

Ext.Loader.setConfig({ enabled: true });
Ext.ns('SppAppClassic');
Ext.application({
    name: 'SppAppClassic',
    extend: 'SppAppClassic.Application',
    requires: [
        //'SppAppClassic.view.login.Login'
    ],

    appFolder: 'app',  // specifify the location of all my created classes
    controllers: [],
    autoCreateViewport: false,  // dont render any html

    // Launch Jasmine test environment
    launch: function () {
        console.log("launching!");
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;
        jasmineEnv.execute();
    }
});
