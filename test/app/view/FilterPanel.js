"use strict";

describe('FilterPanel', function() {


    var panel;

    beforeEach(function() {
        panel = Ext.create('SppAppClassic.view.main.FilterPanel', {
        });
    });

    afterEach(function() {
        panel.destroy();
    });

    it("should be defined and have a title", function() {
        expect(panel).toBeDefined();
        expect(panel.title).toEqual("Filters");
    });

    it("should be a panel", function() {
        expect(Ext.getClass(panel).superclass.self.getName()).toEqual('Ext.panel.Panel');
    });







});
