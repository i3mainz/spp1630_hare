"use strict";

Ext.Loader.setConfig({ enabled : true });
Ext.ns('SppAppClassic');

Ext.application({
    name: 'SppAppClassic',

    //extend: 'SppAppClassic.Application',

    /*requires: [
        'SppAppClassic.view.main.Main'
    ],*/

    appFolder: 'app',

    /*controllers: ['main'],

    views: [
        'SppAppClassic.view.login.Login',  // used in launch
        'SppAppClassic.view.main.Main'  // used in launch

    ],*/

    //appFolder: "app",

    autoCreateViewport: false,

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'SppAppClassic.view.main.Main'

    launch: function() {

        //Ext.
        console.log("launching!");

        //var jasmineEnv = jasmine.getEnv();
        //jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        //jasmineEnv.updateInterval = 1000;
        jasmine.getEnv().execute();
    }

    //-------------------------------------------------------------------------
    // Most customizations should be made to SppAppClassic.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
