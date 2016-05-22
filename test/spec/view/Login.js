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

    describe("login functionality", function() {
        var server;
        var controller;

        beforeEach(function() {
            // create fake server for mocking requests
            server = sinon.fakeServer.create();
            server.autoRespond = true;
            server.autoRespondAfter = 100;

            controller = extWindow.getController();

        });

        afterEach(function(){
            server.restore();
        });

        it("should update label on failed login", function(done) {

            // mock login request to fail
            server.respondWith("POST", "http://haefen.i3mainz.hs-mainz.de/geoserver/j_spring_security_check",
                [200,
                 { "Content-Type": "application/json" },
                 '{ "success": false, "error": { "code": 123, "message": "some error message"} }']
            );

            // label should be empty before click
            expect(label.getValue()).toBeUndefined();

            var success;
            controller.login("John Doe", "wrongPassword", function() {
                // success
                done();
                success = true;

            }, function() {
                done();
                success = false;
                // label should show "failed" when login failed
                expect(label.getValue()).toBe("Failed!");
            });

            // async not ready, should still be validating
            expect(label.getValue()).toBe("Validating...");
        });

        it("should update label on successfull login", function(done) {

            // mock login request to be successfull
            server.respondWith("POST", "http://haefen.i3mainz.hs-mainz.de/geoserver/j_spring_security_check",
                [200,
                 { "Content-Type": "application/json" },
                 '[{ "success": true]']
            );

            // label should be empty before click
            expect(label.getValue()).toBeUndefined();

            var success;
            controller.login("John Doe", "correctPassword", function() {
                done();
                success = true;
                // label should show "success" when login was successfull
                expect(success).toBeTruthy();
                expect(label.getValue()).toBe("Success!");
            });

            // async not ready yet, should still be validating
            expect(label.getValue()).toBe("Validating...");

        });

        /*it("should update label during validation", function(done) {

            // mock login request to be successfull
            server.respondWith("POST", "http://haefen.i3mainz.hs-mainz.de/geoserver/j_spring_security_check",
                [200,
                 { "Content-Type": "application/json" },
                 '[{ "success": true]']
            );

            // label should be empty before click
            expect(label.getValue()).toBeUndefined();

            controller.login("John Doe", "correctPassword", function() {
                //expect(label.getValue()).toBe("Validating...");  // check before request done
                //done();
                done();
            }, function() {
                //done();
                done();
            });

            expect(label.getValue()).toBe("Validating...");

            // async not ready yet, should be still validating

        });*/

    });






        // nothing set


        //loginButton.click();




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
