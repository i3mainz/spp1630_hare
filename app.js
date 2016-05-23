"use strict";

/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'SppAppClassic',

    extend: 'SppAppClassic.Application',

    requires: [
        'SppAppClassic.view.main.Main'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //

    // if mainView is not specified, the classes don't know where to render, so you have to assign
    // plugins: 'viewport' to them
    //mainView: 'SppAppClassic.view.main.Main'

    /*launch: function() {

        var jasmineEnv = jasmine.getEnv();
        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        jasmineEnv.updateInterval = 1000;
        jasmineEnv.execute();
    }*/

    //-------------------------------------------------------------------------
    // Most customizations should be made to SppAppClassic.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
