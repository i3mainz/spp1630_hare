/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SppAppClassic.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        "use strict";
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        "use strict";
        if (choice === 'yes') {
            //
        }
    },

    // reverts code from LoginCOntroller.js
    onClickButton: function () {
        "use strict";
        // Remove the localStorage key/value
        localStorage.removeItem('TutorialLoggedIn');

        // Remove Main View
        this.getView().destroy();

        //Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?');

        // Add the Login Window
        
        Ext.create({
            xtype: 'login'
        });
    }
});
