"use strict";

Ext.define("SppAppClassic.login.Login", {
    extend: "Ext.panel.Panel",
    xtype: "login",  // alias
    id: "loginWindow",

    requires: [
        "Ext.plugin.Viewport",
        "Ext.panel.Tool",           // tools: []
        "Ext.form.Panel",           // xtype: "form"
        "Ext.form.field.Text",  // xtype: "textfield"
        "Ext.button.Button",     // buttons: []
        "ConfigService"
    ],
    plugins: "viewport",
    controller: "login",  // needs to be in requires
    enableKeyEvents: true,

    layout: "column",
    defaults: {
        height: 700
    },
    items: [
        {
            columnWidth: 0.60,
            cls: "left-column",  // wrapper
            html: [
              "<img class='landing-logo' src='" + ConfigService.texts.landingLogo + "' />",
              "<h1>SPP 1630</h1>",
              "<h2>" + ConfigService.texts.landingTitle + "</h2>",
              "<p class='landing-text'>" + ConfigService.texts.landingText + "</p>"
            ].join("\n")
        },{
            columnWidth: 0.40,
            layout: "vbox",
            cls: "right-column", // wrapper
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
                },

                // password
                {
                    xtype: "textfield",
                    id: "passwordField",
                    name: "password",
                    inputType: "password",
                    fieldLabel: "Password",
                    allowBlank: false,
                    msgTarget: 'side',

                    listeners: {
                        change: "onTextFieldChange"
                    }
                },

                // login button
                {
                    xtype: "button",
                    text: "Login",
                    cls: "login-btn",
                    disabled: true,
                    reference: "loginSubmitButton",  // used to lock during validation
                    id: "loginSubmitButton",
                    formBind: true,  // disable until form filled
                    handler: "onLoginClick"
                },

                // guest login label
                {
                    xtype: "button",
                    cls: "demo-btn",
                    text: "Demo",
                    handler: "onGuestClick"
                }
            ]
        }
    ]
});
