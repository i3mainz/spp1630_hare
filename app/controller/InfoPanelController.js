"use strict";

Ext.define("SppAppClassic.InfoPanelController", {
    extend: "Ext.app.ViewController",

    alias: "controller.main-info",

    control: {
        "#": {
            // custom click event
            render: function(panel) {
                var me = this;
                panel.body.on("click", function() {
                    me.getView().fireEvent("click");
                });
                panel.header.on("click", function() {
                    me.getView().fireEvent("click");
                });
            },
            click: function() {
                console.log("clicked panel!");
                //this.getView().destroy();
            }
        }
    },

    onContinueClick: function() {
        this.getView().destroy();
    }
});
