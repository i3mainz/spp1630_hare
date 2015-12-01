Ext.define('SppAppClassic.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',  // alias

    requires: [
        'SppAppClassic.view.login.LoginController',
        'Ext.form.Panel'  // used later as xtype "form"
    ],

    controller: 'login',  // needs to be in requires
    bodyPadding: 10,
    title: 'Login',
    closable: true,  // show close-button
    autoShow: true,
    floating: true,
    maximizable: true,
    glyph: 'xf090@fontawesome',
    animate: true,  // not sure if this does anything
    constrain: true,  // keeps window inside browser area

    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false
        }/*, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Enter any non-blank password'
        }*/],
        buttons: [{
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});