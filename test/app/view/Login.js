"use strict";

describe('SppAppClassic.view.login.Login', function() {

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

        it('should have class alias', function() {
            expect(Ext.ClassManager.getAliasesByName('SppAppClassic.view.login.Login').length).toBeGreaterThan(0);
        });
    });

    describe('Component', function() {

        var login;

        beforeEach(function() {
            login = Ext.create('SppAppClassic.view.login.Login', {
                width: 0,
                height: 0
            }).show();
        });

        afterEach(function() {
            login.destroy();
        });

        it("should be defined and have a title", function() {
            expect(login).toBeDefined();
            expect(login.title).toEqual("Login");
        });



    });



    /*it("should make controller functions available", function() {
        Ext.onReady(function() {

            var login = Ext.create({
                xtype: "SppAppClassic.view.login.Login"
            }).show();

            //expect(login).toBeDefined();
            var controller = login.getController();
            //console.log(controller);
            //expect(controller).toBeFalsy();
        });
    });*/



    // check if child elements exist!




});
