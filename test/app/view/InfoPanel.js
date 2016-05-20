"use strict";

describe('InfoPanel', function() {


    var panel;

    beforeEach(function() {
        panel = Ext.create('SppAppClassic.view.main.InfoPanel', {
        });
    });

    afterEach(function() {
        panel.destroy();
    });

    it("should be defined", function() {
        expect(panel).toBeDefined();
    });

    it("should be a tab panel", function() {
        expect(Ext.getClass(panel).superclass.self.getName()).toEqual("Ext.tab.Panel");
    });

    /*it("should have two panels (news and about)", function() {
        expect(Ext.getCmp('newspanel')).toBeDefined();
    });*/






});
