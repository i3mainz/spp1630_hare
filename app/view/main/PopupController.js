"use strict";

Ext.define('SppAppClassic.view.main.PopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-popup',

    onClose: function() {
    	console.log("closing!");
    },

    onHide: function() {
    	console.log("hiding!");
    }

});
