"use strict";

describe('Basic Assumptions', function() {
    it("has loaded ExtJS 6", function() {
        expect(Ext).toBeDefined();
        expect(Ext.getVersion()).toBeTruthy();
        expect(Ext.getVersion().major).toEqual(6);  // ExtJS 6
    });

    it("has loaded test application code",function(){
        //console.log(SppAppClassic);
        expect(SppAppClassic).toBeDefined();
    });

    it("should create default ExtJS component", function() {
        expect(Ext.ClassManager.getAliasesByName('Ext.window.Window').length).toBeGreaterThan(0);

        var component = Ext.create({
            xtype: "window",
            width: 0,
            height: 0
        }).show();

        expect(component).toBeDefined();
        expect(component.isVisible()).toBeTruthy();
        component.destroy();
    });

});
