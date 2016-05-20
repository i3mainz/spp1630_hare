"use strict";

describe('MapPanel', function() {


    var toolbar;

    beforeEach(function() {
        toolbar = Ext.create('SppAppClassic.view.main.Map', {
        });
    });

    afterEach(function() {
        toolbar.destroy();
    });

    it("should be defined", function() {
        expect(toolbar).toBeDefined();
    });

    it("should be a panel", function() {
        expect(Ext.getClass(toolbar).superclass.self.getName()).toEqual('Ext.panel.Panel');
    });



});
