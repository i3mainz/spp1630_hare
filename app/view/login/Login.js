"use strict";

Ext.define("SppAppClassic.view.login.Login", {
    extend: "Ext.window.Window",

    xtype: "login",  // alias
    reference: "loginWindow",

    requires: [
        "Ext.panel.Tool",           // tools: []
        "Ext.form.Panel",           // xtype: "form"
        "Ext.form.field.Text",  // xtype: "textfield"
        "Ext.button.Button"     // buttons: []
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

    initComponent: function () {
        //console.log("init login window");

        Ext.apply(this, {
            items: [{
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
                            change: "onTextFieldChange"
                        }
                    }, {
                        xtype: "textfield",
                        id: "passwordField",
                        name: "password",
                        inputType: "password",
                        fieldLabel: "Password",
                        allowBlank: false,
                        listeners: {
                            change: "onTextFieldChange"
                        }
                    }
                ],

                buttons: [{
                        xtype: "displayfield",
                        id: "loginLabel",
                        cls: "loginLabel",  // css class for custom styling
                        padding: "0 10 0 0"
                    },{
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
            }]
        }),
        SppAppClassic.view.login.Login.superclass.initComponent.call(this);
    }
});
