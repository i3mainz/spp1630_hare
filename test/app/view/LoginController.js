"use strict";

describe('SppAppClassic.view.login.LoginController', function() {
    var controller;



    it("should exist", function() {

        //expect(SppAppClassic.app).toBeDefined();

        controller = Ext.create('SppAppClassic.view.login.LoginController');
        //controller = SppAppClassic.app.getController('login');
        // NB: We've created a controller outside of the lifecycle of the Application. We must manually initialise it.
        //controller.init();

        //console.log(controller);
        // If we'd defined a launch method for controller, we'd need to call it here
        expect(controller).toBeTruthy();


    });



  /*it("should have no valid references before making widgets", function() {
    expect(controller.getFoobar()).toBeUndefined()
    expect(controller.getBazbux()).toBeUndefined()
    expect(controller.getSpikeView()).toBeUndefined()
  })

  var widget = null
  it("should be able to create a widget, via the controller", function() {
    widget = controller.getView('SpikeView').create({ id: 'foobar' })

    expect(widget).toBeTruthy()
  })



    })*/


    /*describe('onLoginClick()', function() {
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

        it("should set label", function() {
            expect(Ext.getCmp("loginLabel").getValue()).toEqual("start");
        });




    });*/



});
