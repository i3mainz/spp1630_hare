"use strict";

describe('LayerTree', function() {


    var panel;

    beforeEach(function() {
        panel = Ext.create('SppAppClassic.view.main.LayerTree', {
        });
    });

    afterEach(function() {
        panel.destroy();
    });

    it("should be defined and have a title", function() {
        expect(panel).toBeDefined();
        expect(panel.title).toEqual("Layers");
    });

    it("should be a treepanel", function() {
        expect(Ext.getClass(panel).superclass.self.getName()).toEqual('Ext.tree.Panel');
    });







});
