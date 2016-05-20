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

    it("should be defined and have a title", function() {
        expect(mywindow).toBeDefined();
        expect(mywindow.title).toEqual("Filters");
    });

    it("should be a panel", function() {
        expect(Ext.getClass(mywindow).superclass.self.getName()).toEqual('Ext.panel.Panel');
    });







});
