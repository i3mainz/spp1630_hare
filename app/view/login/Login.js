"use strict";

Ext.define("SppAppClassic.login.Login", {
    extend: "Ext.window.Window",
    xtype: "login",  // alias
    id: "loginWindow",

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
    enableKeyEvents: true,

    items: [{
        // parent container used for padding outside of borders
        xtype: "container",
        width: "80%",
        //height: '100%',
        style: {
            //borderStyle: "solid",
            paddingTop: "30px",
            margin: "0 auto",
            //paddingLeft: "50px",
            //paddingRight: "50px",
            //marginRight: "30px"
        },

        // columns within container
        items: {
            xtype: "container",
            layout: 'column',
            items: [

                // left column
                {
                    columnWidth: 0.5,

                    style: {
                        //marginTop: "20px",
                        //marginRight: "30px"
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
                                marginTop: "20px",
                                paddingRight: "30px",
                                marginBottom: "15px"
                            }
                        },{
                            //cls: "landing-text",
                            html: ConfigService.texts.landingText,
                            style: {
                                width: "100%",
                                paddingRight: "30px",
                            }
                        }
                    ]
                },

            {
                // right column
                columnWidth: 0.5,

                layout: "vbox",

                style: {
                    paddingLeft: "30px",
                    borderLeft: "solid thin black"
                },

                items: [

                    // username
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
                        disabled: true,
                        reference: "loginSubmitButton",  // used to lock during validation
                        id: "loginSubmitButton",
                        formBind: true,  // disable until form filled
                        handler: "onLoginClick",
                    },

                    // guest login label
                    {
                        xtype: "label",
                        style: {
                            color: "lightgrey",
                            marginTop: "10px",
                            cursor: "pointer"
                        },

                        html: ConfigService.texts.guestLoginText,
                        listeners: {
                            render: function(c) {
                                c.getEl().on('click', function() {
                                    Ext.getCmp("loginWindow").getController().onGuestClick();
                                }, c);
                            }
                        }

                    }
                ]
            }]
        }
    }]
});
