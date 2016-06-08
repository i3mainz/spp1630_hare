"use strict";

describe('TopToolbar', function() {


    var toolbar;

    beforeEach(function() {
        toolbar = Ext.create('SppAppClassic.view.main.TopToolbar', {
        });
    });

    afterEach(function() {
        toolbar.destroy();
    });

    it("should be defined", function() {
        expect(toolbar).toBeDefined();
    });

    it("should be a toolbar", function() {
        expect(Ext.getClass(toolbar).superclass.self.getName()).toEqual('Ext.toolbar.Toolbar');
    });

    it("should have a controller with methods", function() {
        var controller = toolbar.getController();
        expect(controller).not.toBe(null);
        expect(typeof controller.onToggleFilter).toBe("function");
        //this.lookupReference('delete').setDisabled(selections.length === 0);
    });


});
