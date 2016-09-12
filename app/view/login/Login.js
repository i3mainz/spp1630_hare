"use strict";

Ext.define("SppAppClassic.view.login.Login", {
    extend: "Ext.window.Window",

    xtype: "login",  // alias
    reference: "loginWindow",
    id: "loginwindow",

    requires: [
        "Ext.panel.Tool",           // tools: []
        "Ext.form.Panel",           // xtype: "form"
        "Ext.form.field.Text",  // xtype: "textfield"
        "Ext.button.Button",     // buttons: []
        "ConfigService"
    ],

    controller: "login",  // needs to be in requires
    header: false,
    closable: false,  // show close-button
    autoShow: true,
    floating: false,
    animate: true,  // not sure if this does anything
    style: {
        margin: "0 auto",
    },

    enableKeyEvents: true,

    items: [{
        // parent container used for padding outside of borders
        xtype: "container",
        width: "80%",
        //height: '100%',
        style: {
            paddingTop: "30px",
            margin: "0 auto",
        },

        // columns within container
        items: {
            xtype: "container",
            layout: 'column',
            items: [{
                //title: 'Column 1',
                columnWidth: 0.5,
                style: {
                    marginRight: "30px",
                    fontSize: "large"
                },
                layout: "vbox",
                defaults: {
                    xtype: "label",
                    width: "100%"
                },
                items: [
                    {
                        text: ConfigService.texts.landingTitle,
                        style: {
                            fontSize: "30px",
                            marginBottom: "50px"
                        }
                    },{
                        //cls: "landing-text",
                        text: ConfigService.texts.landingText,
                        style: {
                            width: "100%",
                            //height: "100%"
                        }
                    }
                ]
            },
            {
                // right column
                columnWidth: 0.5,
                layout: "vbox",
                style: {
                    //borderStyle: "solid",
                    paddingLeft: "30px",
                    height: "100%",
                    //marginLeft: "30px", //paddingRight: "30px",
                    borderLeft: "solid thin black"
                },

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
                    },{
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
                    },{
                        xtype: "button",
                        text: "Login",
                        disabled: true,
                        reference: "loginSubmitButton",  // used to lock during validation
                        id: "loginSubmitButton",
                        formBind: true,  // disable until form filled
                        tooltip: ConfigService.tooltips.login,
                        handler: "onLoginClick"
                    },{
                        xtype: "label",
                        style: {
                            color: "lightgrey",
                            marginTop: "10px",
                            cursor: "pointer"
                        },
                        html: "Skip and use as guest",
                        listeners: {
                            render: function(c) {
                                c.getEl().on('click', function() {
                                    Ext.getCmp("loginwindow").getController().onGuestClick();
                                }, c);
                            }
                        }

                    }
                ]
            }]
        }
    }]

});
