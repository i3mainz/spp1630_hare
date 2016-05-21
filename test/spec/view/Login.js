"use strict";

describe('LoginWindow', function() {

    var extWindow;

    beforeEach(function() {
        extWindow = Ext.create('SppAppClassic.view.login.Login', {
            width: 0,
            height: 0,
            renderTo: Ext.getBody()
        }); // .show()
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

    it("should display components in browser", function() {

        // should be locked in beginnig (when no username or password provided)
        //expect(Ext.getCmp('loginSubmitButton').isDisabled()).toBeTruthy();
        expect(Ext.getCmp('loginSubmitButton').isVisible()).toBeTruthy();
        //expect(Ext.getCmp('loginSubmitButton').isDisabled()).toBeTruthy();

        // should be unlocked even when no username or password provided
        expect(Ext.getCmp('guestSubmitButton').isDisabled()).toBeFalsy();
        //expect(Ext.getCmp('loginSubmitButton').isVisible()).toBeTruthy();

    });
/*
    it("should unlock login button when username and password are entered", function() {
        var button = Ext.getCmp('loginSubmitButton');

        expect(button).toBe("123");

        //expect(Ext.getCmp('guestSubmitButton').isDisabled()).toBeFalsy();

        //var formData = Ext.getCmp('loginform').getValues();
        //expect(formData).toBe("");

        // update username and password
        //expect(Ext.getCmp('loginSubmitButton').isDisabled()).toBeFalsy();

    });
*/

});
