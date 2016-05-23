"use strict";

describe('MainPanel', function() {
    var panel;

    beforeEach(function() {
        panel = Ext.create('SppAppClassic.view.main.Main', {
        });
    });

    afterEach(function() {
        panel.destroy();
    });

    it("should be defined and have a title", function() {
        expect(panel).toBeDefined();
        expect(panel.title).toBe("SPP 1630 Virtual Research Environment");
    });

    it("should be a panel", function() {
        expect(Ext.getClass(panel).superclass.self.getName()).toEqual("Ext.panel.Panel");
    });

    it("should have a controller with methods", function() {
        var controller = panel.getController();
        expect(controller).not.toBe(null);
        expect(typeof controller.updateLogoutInfo).toBe("function");
        //this.lookupReference('delete').setDisabled(selections.length === 0);
    });

    /*it("should be visible", function() {
        expect(panel.isVisible()).toBeTruthy();
    })*/

    it("should have items", function() {
        expect(panel.getDockedItems().length).toBe(4);
    })



});
