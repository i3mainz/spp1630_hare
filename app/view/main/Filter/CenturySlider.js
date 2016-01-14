"use strict";

Ext.define("SppAppClassic.view.main.Filter.CenturySlider", {
    extend: "Ext.slider.Multi",
    xtype: "centuryslider",  // map.centuryslider
    //alias: 'widget.centuryslider',
    reference: "centuryslider",  // used in controllers
    //controller: "main-centuryslider", // slider is a component. only containers can have controllers!

    //hideLabel: true,  // not sure what that does
    width: 250,
    //increment: 10,
    minValue: 0,
    maxValue: 13,
    //constrainThumbs: true,
    values: [0, 13],
    useTips: true,  // show toolptips, default: true
    fieldLabel: "Century",

    tipText: function(thumb) {
        var choices = [
            "1st Century BC",  // 0
            "1st Century",
            "2nd Century",
            "3nd Century",
            "4th Century",
            "5th Century",
            "6th Century",
            "7th Century",
            "8th Century",
            "9th Century",
            "10th Century",
            "11th Century",
            "12th Century",
            "13th Century"  // 13
        ];
        var value = Ext.String.format(choices[thumb.value]);

        return value;
    }

    /*
    // defined in MapController.js
    listeners: {
        changecomplete: "onChangeComplete",
    }
    */
});



/*
toolTip.on('show', function(){

    var timeout;

    toolTip.getEl().on('mouseout', function(){
        timeout = window.setTimeout(function(){
            toolTip.hide();
        }, 500);
    });

    toolTip.getEl().on('mouseover', function(){
        window.clearTimeout(timeout);
    });

    Ext.get(targetId).on('mouseover', function(){
        window.clearTimeout(timeout);
    });

    Ext.get(targetId).on('mouseout', function(){
        timeout = window.setTimeout(function(){
            toolTip.hide();
        }, 500);
    });

});
*/
