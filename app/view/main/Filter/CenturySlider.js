"use strict";

Ext.define("SppAppClassic.view.main.filter.CenturySlider", {
    extend: "Ext.slider.Multi",
    xtype: "centuryslider",  // map.centuryslider
    //alias: 'widget.centuryslider',
    reference: "centuryslider",  // used in controllers

    //controller: "main-centuryslider", // slider is a component. only containers can have controllers!
    controller: "main-filterpanel",

    //hideLabel: true,  // not sure what that does
    minWidth: 100,
    //increment: 10,
    minValue: 0,
    maxValue: 13,
    //constrainThumbs: true,
    values: [0, 13],
    useTips: false,  // show toolptips, default: true
    //fieldLabel: "Century",

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
    },

    getSQLQuery: function(includePropable, onlyContinuous) {

        /*
        "1st Century BC",   // 0
        "1st Century",      // 1
        "2nd Century",      // 2
        "3rd Century",      // 3
        "4th Century",      // 4
        "5th Century",      // 5
        "6th Century",      // 6
        "7th Century",      // 7
        "8th Century",      // 8
        "9th Century",      // 9
        "10th Century",     // 10
        "11th Century",     // 11
        "12th Century",     // 12
        "13th Century"      // 13  date_13_Jh // ja, nein
        */
        var startCentury = this.getValues()[0];
        var endCentury = this.getValues()[1];

        var filterList = [];
        //var queryString = "";

        for (var century = 0; century < 14; century++) {
            if (century < startCentury || century > endCentury) {  // not selected
                /*
                if (century === 0) {  // special for 1st BC
                    filterList.push("date_1_Jhv="nein"");
                } else {
                    filterList.push("date_" + century + "_Jh="nein"");
                }
                */
            } else {  // within selection
                if (century === 0) {  // special for 1st BC
                    if (includePropable) {
                        filterList.push("(date_1_Jhv='ja' OR date_1_Jhv='vermutet')");
                    } else {
                        filterList.push("date_1_Jhv='ja'");
                    }
                } else {
                    if (includePropable) {
                        filterList.push("(date_" + century + "_Jh='ja' OR date_" + century + "_Jh='vermutet')");
                    } else {
                        filterList.push("date_" + century + "_Jh='ja'");
                    }
                }
            }
        }
        // remove leading ";"
        var queryString;
        if (onlyContinuous) {
            queryString = filterList.join(" AND ");
        } else {
            queryString = filterList.join(" OR ");
        }

        return queryString;
    }

    // defined in FilterPanelController.js
    /*listeners: {
        changecomplete: "onSliderChangeComplete"
    }*/

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
