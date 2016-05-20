"use strict";

describe('GeoExtMapComponent', function() {
    var component;

    beforeEach(function() {
        component = Ext.create('SppAppClassic.view.main.GeoExtMap');
    });

    afterEach(function() {
        component.destroy();
    });

    it("should be defined", function() {
        expect(component).toBeDefined();
    });

    it("should be a geoext component", function() {
        expect(Ext.getClass(component).superclass.self.getName()).toEqual("GeoExt.component.Map");
    });

    it("should have methods", function() {
        expect(typeof component.createLayersFromStore).toBe("function");
    });

    it("should have a controller with methods", function() {
        var controller = component.getController();
        expect(controller).not.toBe(null);
        expect(typeof controller.onMapClick).toBe("function");
        //this.lookupReference('delete').setDisabled(selections.length === 0);
    });


});
