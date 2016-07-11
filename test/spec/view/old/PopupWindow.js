"use strict";

describe('PopupWindow', function() {


    var mywindow;

    beforeEach(function() {
        mywindow = Ext.create('SppAppClassic.view.main.PopupWindow', {
        });
    });

    afterEach(function() {
        mywindow.destroy();
    });

    /*it("should be defined and have a title", function() {
        expect(mywindow).toBeDefined();
        expect(mywindow.title).toEqual("Feature Info");
    });

    it("should be a window", function() {
        expect(Ext.getClass(mywindow).superclass.self.getName()).toEqual('Ext.window.Window');
    });

     it("should have a controller with methods", function() {
        var controller = mywindow.getController();
        expect(controller).not.toBe(null);
        expect(typeof controller.unlockButtons).toBe("function");
        //this.lookupReference('delete').setDisabled(selections.length === 0);
    });*/







});
