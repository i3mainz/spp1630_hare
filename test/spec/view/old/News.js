"use strict";

describe('News', function() {

    var container;

    /*beforeEach(function() {
        container = Ext.create('SppAppClassic.view.main.News', {
        });
    });

    afterEach(function() {
        container.destroy();
    });*/

    it("should be defined", function() {
        expect(Ext.create('SppAppClassic.view.main.News')).toBeDefined();
        //expect(panel.title).toEqual("Filters");
    });

    /*it("should be a container", function() {
        expect(Ext.getClass(container).superclass.self.getName()).toEqual('Ext.container.Container');
    });*/






});
