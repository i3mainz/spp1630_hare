"use strict";

describe('LoginWindow', function() {

    var extWindow;

    beforeEach(function() {
        extWindow = Ext.create('SppAppClassic.view.login.Login', {
            width: 0,
            height: 0
        }).show();
    });

    afterEach(function() {
        extWindow.destroy();
    });

    it("should be defined and have a title", function() {
        expect(extWindow).toBeDefined();
        expect(extWindow.title).toEqual("Login");
    });

    it("should be a window", function() {
        expect(Ext.getClass(extWindow).superclass.self.getName()).toEqual("Ext.window.Window");
    });

    it("should have a controller with methods", function() {
        var controller = extWindow.getController();
        expect(controller).not.toBe(null);
        expect(typeof controller.onLoginClick).toBe("function");
        //this.lookupReference('delete').setDisabled(selections.length === 0);
    });

    it("should have submit button", function() {
        // button.fireEvent('click', button);
        var button = Ext.getCmp('loginSubmitButton');
        expect(button).toBeDefined();
        expect(Ext.getClass(button).superclass.self.getName()).toEqual("Ext.Component");
    });

    it("should have guest submit button", function() {
        // button.fireEvent('click', button);
        var button = Ext.getCmp('guestSubmitButton');
        expect(button).toBeDefined();
        expect(Ext.getClass(button).superclass.self.getName()).toEqual("Ext.Component");
    });

    it("should have label for login status", function() {
        var label = Ext.getCmp('loginLabel');
        expect(label).toBeDefined();
        expect(Ext.getClass(label).superclass.self.getName()).toEqual("Ext.form.field.Base");
    });

    // controller functions
    describe("controller functions", function() {


        beforeEach(function() {

        });

        it("should lock login button when user or password missing", function() {
            expect(Ext.getCmp('loginSubmitButton').isDisabled()).toBeFalsy();
            //expect(Ext.getCmp('guestSubmitButton').isDisabled()).toBeFalsy();

            var formData = Ext.getCmp('loginform').getValues();
            expect(formData).toBe("");

            // update username and password
            //expect(Ext.getCmp('loginSubmitButton').isDisabled()).toBeFalsy();

        });

        /*it("should have guest login button unlocked", function() {

        });*/
        /*it("should update label on submit click", function(done) {
            //var label;
            //var controller;

            var button = Ext.getCmp('guestSubmitButton');

            var label = Ext.getCmp('loginLabel');

            label = Ext.getCmp('loginLabel');

            var controller = extWindow.getController();

            // buttons enabled before login
            expect(button.isDisabled()).toBeFalse();

            controller.login("John Doe", "wrongPassword", function() {
                //success

                done();
            }, function() {
                done();



                // buttons should be unlocked again
                expect(button.isDisabled()).toBeFalse();
                expect(label.getValue()).toBe("Validating...");
                // error

            });

            // should be undefined on start
            //expect(label.getValue()).toBeUndefined();

            //var controller = extWindow.getController();


            // TODO:
            //var button = Ext.getCmp('loginSubmitButton');
            //button.click();

            //
            //expect(label.getValue()).toBe("Validating...");

            // Mock Ext.Ajax.request with Jasmine

            // overwrite response




        });*/
    });





});
