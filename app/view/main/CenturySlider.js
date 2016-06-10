"use strict";

Ext.define("SppAppClassic.view.main.CenturySlider", {
    extend: "Ext.form.FieldSet",
    xtype: "centurySelector",  // map.centuryslider
    //alias: 'widget.centuryslider',
    //reference: "centuryslider",  // used in controllers
    //id: "centuryslider",

    //controller: "main-centuryslider", // slider is a component. only containers can have controllers!
    controller: "main-filterpanel",

    layout: "fit",
    items: [
        {
            xtype: "label",
            id: "sliderlabel",
            text: "1BC - 13AD",  // BCE, CE
            padding: "5 0 0 0"
        },
        {
            xtype: "multislider",
            id: "centuryslider",
            minWidth: 100,
            minValue: 0,
            maxValue: 13,
            //constrainThumbs: true,
            values: [0, 13],
            useTips: false,  // show toolptips, default: true
            //fieldLabel: "Century",

            /*tipText: function(thumb) {
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
            },*/

            listeners: {
                scope: 'this',  // use functions in this class, not controller
                //changecomplete: "onSliderChangeComplete"
                change: "updateLabels",

                changecomplete: function(evt) {
                    // fire event onchangecomplete so that this triggers an
                    // event for the parent class as well
                    this.findParentByType("centurySelector").fireEvent("change", evt);
                }
            },

            updateLabels: function() {
                console.log("updating labels");
                //var filterPanel = Ext.getCmp("filterPanel");
                var labelText;
                // update text next to slider
                var value1 = this.getValues()[0];
                var value2 = this.getValues()[1];

                if (value1 === value2) {  // same century
                    if (value1 === 0) {
                        labelText = value1 + "BC";
                    } else {
                        labelText = value1 + "AD";
                    }
                } else if (value1 === 0) {  // different values, one is bc
                    labelText = "1BC" + " - " + value2 + "AD";
                } else {
                    labelText = value1 + "AD" + " - " + value2 + "AD";
                }

                var label = Ext.getCmp("sliderlabel");
                label.setText(labelText);
            }

        },
        {
            xtype: "checkbox",
            //checked: true,
            boxLabel: "allow propable",
            name: "allowPropable",
            id: "allowPropableCheckbox",
            listeners: {
                change: function(evt) {
                    // fire event onchangecomplete so that this triggers an
                    // event for the parent class as well
                    this.findParentByType("centurySelector").fireEvent("change", evt);
                }
            }
        },{
            xtype: "checkbox",
            checked: false,
            boxLabel: "only continuous",
            name: "onlyContinuous",
            id: "onlyContinuousCheckbox",
            listeners: {
                change: function(evt) {
                    // fire event onchangecomplete so that this triggers an
                    // event for the parent class as well
                    this.findParentByType("centurySelector").fireEvent("change", evt);
                }
            }
        }
    ],

    // defined in FilterPanelController.js
    listeners: {
        scope: 'this',  // use functions in this class, not controller
        //changecomplete: "onSliderChangeComplete"
        changecomplete: "getSliderSQLQuery"
    },

    /*
     * gets the slider's values and creates a cql query string
     */
    getSliderSQLQuery: function(includePropable, onlyContinuous) {

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
        //console.log("works!!!");
        var slider = Ext.getCmp("centuryslider");
        var startCentury = slider.getValues()[0];
        var endCentury = slider.getValues()[1];

        //var includePropable = Ext.getCmp("allowPropableCheckbox").getValue();
        //var onlyContinuous = Ext.getCmp("onlyContinuousCheckbox").getValue();

        //console.log(includePropable);
        //console.log(onlyContinuousCheckbox);

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

        //return empty if default values!
        if (startCentury > 0 || endCentury < 13) {
            return queryString;
        } else {
            return false;
        }
    },

    getCenturiesSQLQuery: function() {
        //var slider = this.lookupReference("centuryslider");

        var allowPropable = Ext.getCmp("allowPropableCheckbox").getValue();
        var onlyContinuous = Ext.getCmp("onlyContinuousCheckbox").getValue();

        var sliderFilterString;
        if (allowPropable) {  // vermutet erlaubt
            if (onlyContinuous) {
                sliderFilterString = this.getSliderSQLQuery(true, true);
            } else {
                sliderFilterString = this.getSliderSQLQuery(true, false);
            }

        } else {
            if (onlyContinuous) {
                sliderFilterString = this.getSliderSQLQuery(false, true);
            } else {
                sliderFilterString = this.getSliderSQLQuery(false, false);
            }
        }
        //console.log(sliderFilterString);
        if (sliderFilterString.length > 0) {
            return "(" + sliderFilterString + ")";
        } else {
            return false;
        }

    }
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
