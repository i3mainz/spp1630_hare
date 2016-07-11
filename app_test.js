"use strict";

Ext.Loader.setConfig({ enabled: true });
Ext.ns('SppAppClassic');
Ext.application({
    name: 'SppAppClassic',
    extend: 'SppAppClassic.Application',
    requires: [
        //'SppAppClassic.view.login.Login'
    ],

    appFolder: 'app',
    controllers: [],
    autoCreateViewport: false,

    // Launch Jasmine test environment
    launch: function () {
        console.log("launching!");
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;
        jasmineEnv.execute();
    }
});
