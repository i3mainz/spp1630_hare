"use strict";

describe('MainCtrl', function() {

    var controller;

    beforeEach(function() {

        // init the controller by creating a view that uses it
        controller = Ext.create('SppAppClassic.view.main.Main', {}).getController();

        // this.application.getController('ControllerName1').newDateForm(

        /*usernameField = Ext.getCmp('usernameField');
        passwordField = Ext.getCmp('passwordField');

        loginButton = Ext.getCmp('loginSubmitButton');
        guestButton = Ext.getCmp('guestSubmitButton');
        label = Ext.getCmp('loginLabel');*/
    });

    it("should be defined", function() {
        expect(controller).toBeDefined();
    });


    /*it("should have a controller with methods", function() {
        var controller = extWindow.getController();
        expect(controller).not.toBe(null);
        expect(typeof controller.onLoginClick).toBe("function");
        //this.lookupReference('delete').setDisabled(selections.length === 0);
    });*/


});
