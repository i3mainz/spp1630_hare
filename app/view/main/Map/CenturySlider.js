"use strict";

Ext.define("SppAppClassic.view.main.CenturySlider", {
    extend: "Ext.slider.Multi",
    xtype: "centuryslider",  // map.centuryslider
    //alias: 'widget.centuryslider',
    reference: "centuryslider",  // used in controllers
    //controller: "main-centuryslider", // slider is a component. only containers can have controllers!
    
    hideLabel: true,
    width: 200,
    //increment: 10,
    minValue: 0,
    maxValue: 9,
    //constrainThumbs: true,
    values: [0, 9],
    

    useTips: true,  // show toolptips, default: true

    tipText: function(thumb){
        var choices = [
            '4th Century',  // 0
            '5th Century',
            '6th Century',
            '7th Century',
            '8th Century',
            '9th Century',
            '10th Century',
            '11th Century',
            '12th Century',
            '13th Century'  // 9
        ];
        var value = Ext.String.format(choices[thumb.value]);
        return value;
    },

    /*
    constructor: function() {
        self = this;  // Here you store "this" in the closure
        self.callParent(arguments);
    },
    */
    init: function() {
        console.log("test123");
    }

    /*
    // defined in MapController.js
    listeners: {
        changecomplete: "onChangeComplete",
    }
    */
});
