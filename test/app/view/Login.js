"use strict";

describe('SppAppClassic.view.login.Login', function() {
    //var login = null;  // class container
    

    //setup/teardown
    /*beforeEach(function() {
        //create a fresh grid for every test to avoid test pollution
        eventGrid = Ext.create('SppAppClassic.view.login.Login', {
            renderTo : 'test' //see spec-runner.html to see where this is defined
        });
    });*/

    /*afterEach(function() {
        //destroy the grid after every test so we don't pollute the environment
        //eventGrid.destroy();
    });*/

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
        });

        it('should have class alias', function() {
            expect(Ext.ClassManager.getAliasesByName('SppAppClassic.view.login.Login').length).toBeGreaterThan(0);
        });
    });

    describe('Component', function() {

        var login;

        beforeEach(function() {
            login = Ext.create('SppAppClassic.view.login.Login', {
                width: 200,
                height: 200
            });
        });

        afterEach(function() {
            login.destroy();
        });

        it("should be defined and visible", function() {

            expect(login).toBeDefined();

            login.show();
            console.log(login);
            expect(login.isVisible()).toBeTruthy();
            
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



