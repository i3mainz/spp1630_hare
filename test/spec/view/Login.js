"use strict";

describe('LoginWindow', function() {

    var extWindow;
    var loginButton;
    var guestButton;
    var usernameField;
    var passwordField;
    var label;

    beforeEach(function() {
        extWindow = Ext.create('SppAppClassic.view.login.Login', {
            width: 0,
            height: 0,
            renderTo: Ext.getBody()
        }); // .show()

        usernameField = Ext.getCmp('usernameField');
        passwordField = Ext.getCmp('passwordField');

        loginButton = Ext.getCmp('loginSubmitButton');
        guestButton = Ext.getCmp('guestSubmitButton');
        label = Ext.getCmp('loginLabel');
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
        expect(loginButton).toBeDefined();
        expect(Ext.getClass(loginButton).superclass.self.getName()).toEqual("Ext.Component");
    });

    it("should have guest submit button", function() {
        expect(guestButton).toBeDefined();
        expect(Ext.getClass(guestButton).superclass.self.getName()).toEqual("Ext.Component");
    });

    it("should have label for login status", function() {
        expect(label).toBeDefined();
        expect(Ext.getClass(label).superclass.self.getName()).toEqual("Ext.form.field.Base");
    });

    it("should display components in browser", function() {

        // should be locked in beginnig (when no username or password provided)
        //expect(Ext.getCmp('loginSubmitButton').isDisabled()).toBeTruthy();
        expect(loginButton.isVisible()).toBeTruthy();
        //expect(Ext.getCmp('loginSubmitButton').isDisabled()).toBeTruthy();

        // should be unlocked even when no username or password provided
        expect(guestButton.isDisabled()).toBeFalsy();
        //expect(Ext.getCmp('loginSubmitButton').isVisible()).toBeTruthy();

    });

    /*it("should unlock login button", function() {
        // both fields empty
        expect(usernameField.getValue()).toBe("");
        expect(passwordField.getValue()).toBe("");

        // button should be locked
        //expect(Ext.getCmp('loginSubmitButton').isDisabled()).toBeTruthy();

        // set username and password
        usernameField.setValue('John Doe');
        passwordField.setValue('wrongPassword');

        // both fields filled
        expect(usernameField.getValue()).toBe("John Doe");
        expect(passwordField.getValue()).toBe("wrongPassword");

        // button should be unlocked
        expect(loginButton.isDisabled()).toBeFalsy();


        //expect(Ext.getCmp('loginSubmitButton').getValue()).toBeTruthy();


        //expect(Ext.getCmp('loginSubmitButton').isDisabled()).toBeTruthy();

    });*/

    it("should update label on failed login", function(done) {
        //loginButton.on("click");
        //label.setRawValue("123");
        var controller = extWindow.getController();


        // mock ajax request
        /*Ext.ux.ajax.SimManager.init({
            delay: 300
        }).register({
            "http://haefen.i3mainz.hs-mainz.de/geoserver/j_spring_security_check": {
                type: "json",
                success: false
                //data: [
                //    { foo: 42, bar: "abc"}
                //]
            }
        });*/


        expect(label.getValue()).toBeUndefined();

        //console.log(label.getRawValue());
        controller.login("John Doe", "wrongPassword", function() {
            // success
            console.log("success!");
            done();
            expect(label.getRawValue()).toBe("Success!!");

        }, function(response) {
            // failure
            console.log(response);
            done();
            expect(label.getValue()).toBe("Failed!");

        })

        // nothing set


        //loginButton.click();






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
