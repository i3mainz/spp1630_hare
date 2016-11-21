"use strict";

// set Ext loader path for usage with karma test runner
// Ext.Loader.setConfig({
//     enabled: true,
//     paths: {
//         'GeoExt': 'base/src'
//     }
// });
//Ext.Loader.setConfig({ enabled: true });

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'GeoExt': 'base/src'
    }
});

// Ext.ns('SppAppClassic');

Ext.Loader.setConfig ({enabled: true});

Ext.application({
    name: 'SppAppClassic',
    extend: 'SppAppClassic.Application',
    requires: [
        'ConfigService'
    ],
    appFolder: 'app',
    autoCreateViewport: false,

});

Ext.Loader.syncRequire(['ConfigService']);
var ConfigService = Ext.create('ConfigService');

//var ConfigService = Ext.create("ConfigService");
//Ext.Create('Ext.app.Application');

//Ext.Loader.syncRequire(['ConfigService']);

describe('ConfigService', function() {

    describe('basics', function() {
        it('ConfigService is defined', function() {
            expect(ConfigService).not.to.be(undefined);
        });

        // describe('constructor', function() {
        //     it('can be constructed wo/ arguments via Ext.create()', function() {
        //         var mapComponent = Ext.create('GeoExt.component.Map');
        //         expect(mapComponent).to.be.an(GeoExt.component.Map);
        //     });
        // });
    });

    //var LayerService = LayerGroups;
    it("should be defined", function() {
        expect(false).toBe(true);
    });
});
