"use strict";
Ext.define("SppAppClassic.view.login.Login", {
    extend: "Ext.window.Window",
    xtype: "login",  // alias
    reference: "loginWindow",
    requires: [
        "SppAppClassic.view.login.LoginController",
        "Ext.form.Panel"  // used later as xtype "form"
    ],

    /*header: {
        tools: [
            {   
                xtype: 'button',
                iconCls: 'icon-page-white-excel',
                text: 'help',
                align: "right",
                qtip: "please help!",
                glyph: 'xf08b@fontawesome',
                handler: ''
            }
        ]
    },
    */
    // custom help icon to titlebar
    tools: [
        {
            type: "help",
            reference: "helpButton",
            qtip: "Login using your project's username/password or login " +
                  "as a guest with limited data access and functionality"
            //handler: "onHelpClick"
        }
    ],

    controller: "login",  // needs to be in requires
    bodyPadding: 10,
    title: "Login",
    closable: false,  // show close-button
    autoShow: true,
    floating: true,
    //maximizable: true,
    glyph: "xf090@fontawesome",
    animate: true,  // not sure if this does anything
    constrain: true,  // keeps window inside browser area

    items: [
        {
            xtype: "form",
            reference: "loginform",
            items: [
                {
                    xtype: "textfield",
                    name: "username",
                    id: "usernameField",
                    fieldLabel: "Username",
                    allowBlank: false,
                    listeners: {
                        //change: "onTextFieldChange"
                    }
                }, {
                    xtype: "textfield",
                    id: "passwordField",
                    name: "password",
                    inputType: "password",
                    fieldLabel: "Password",
                    allowBlank: false,
                    listeners: {
                        //change: "onTextFieldChange"
                    }
                }/*, {
                    xtype: "displayfield",
                    reference: "loginMessageField",
                    hideEmptyLabel: true,
                    value: "Enter username/password or login as guest"
                }*/
            ],

            buttons: [
                {
                    text: "Guest",
                    reference: "guestSubmitButton",  // used to lock during validation
                    id: "guestSubmitButton",
                    formBind: false,  // enable right away
                    tooltip: "Login as a guest (limited functionality)",
                    handler: "onGuestClick"
                },{
                    text: "Login",
                    reference: "loginSubmitButton",  // used to lock during validation
                    id: "loginSubmitButton",
                    formBind: true,  // disable until form filled
                    tooltip: "Login using your username/password combination",
                    handler: "onLoginClick"
                }
            ]
        }
    ]
});
