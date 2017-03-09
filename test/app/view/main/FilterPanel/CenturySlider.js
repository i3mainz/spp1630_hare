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
            id: "sliderlabelleft",
            text: "1BC",  // BCE, CE
            padding: "5 0 0 35"
        },{
            xtype: "label",
            id: "sliderlabelmid",
            text: "-",
            padding: "5 10 0 10"
        },{
            xtype: "label",
            id: "sliderlabelright",
            text: "13AD",  // BCE, CE
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



            setHighlightMargins: function() {
                var values = this.getValue();

                // set the margins of the highlight based on the first and last value
                this.highlightEl.setStyle({
                    marginLeft: (values[0] / 13 * 100)  + '%',  // space to the left
                    marginRight: (100 - (values[1] / 13 * 100))  + '%'  // space to the right
                });
                this.highlightEl.parent().select('.x-slider-thumb').setStyle('z-index', 10000);
            },

            listeners: {
                scope: 'this',  // use functions in this class, not controller
                //changecomplete: "onSliderChangeComplete"
                change:  function() {//"updateLabels",
                    this.setHighlightMargins();
                    this.updateLabels();
                },

                render: function(slider) {
                    var innerEl = slider.getEl().down('.x-slider-inner');

                    // append a new element used for highlighting
                    slider.highlightEl = innerEl.appendChild({
                        tag: 'div',
                        cls: 'slider-highlightEl',
                        style: {
                            backgroundColor: '#3892D4',
                            height: '7px',
                            position: 'relative',
                            top: '4px'
                        }
                    });
                    // runs first time
                    this.setHighlightMargins();
                },

                changecomplete: function(evt) {
                    setTimeout(function() {
                        Ext.getCmp("sliderlabelleft").setStyle({
                            "font-weight": "normal"
                        });
                        Ext.getCmp("sliderlabelright").setStyle({
                            "font-weight": "normal"
                        });
                        Ext.getCmp("sliderlabelmid").setStyle({
                            "font-weight": "normal"
                        });
                    }, 300);
                    // fire event onchangecomplete so that this triggers an
                    // event for the parent class as well
                    this.findParentByType("centurySelector").fireEvent("change", evt);
                }
            },

            updateLabels: function() {
                //console.log("updating labels");
                //var filterPanel = Ext.getCmp("filterPanel");
                var labelText;
                // update text next to slider
                var value1 = this.getValues()[0];
                var value2 = this.getValues()[1];

                var labelLeft;
                var labelRight;

                if (value1 === value2) {  // same century
                    if (value1 === 0) {
                        labelLeft = value1 + "BC";
                    } else {
                        labelLeft = value1 + "AD";
                    }
                } else if (value1 === 0) {  // different values, one is bc
                    labelLeft = "1BC";
                    labelRight = value2 + "AD";
                } else {
                    labelLeft = value1 + "AD";
                    labelRight = value2 + "AD";
                }

                var sliderlabelleft = Ext.getCmp("sliderlabelleft");
                var sliderlabelmid = Ext.getCmp("sliderlabelmid");
                var sliderlabelright = Ext.getCmp("sliderlabelright");

                if (sliderlabelleft.text !== labelLeft) {  // left changed
                    //console.log("trigger left");
                    sliderlabelleft.setText(labelLeft);
                    sliderlabelmid.setText("-");
                    sliderlabelleft.setStyle({
                        "font-weight": "bold"
                    });
                }

                if (sliderlabelright.text !== labelRight) {  // right changed
                    //console.log("trigger right");
                    sliderlabelright.setText(labelRight);
                    sliderlabelmid.setText("-");
                    sliderlabelright.setStyle({
                        "font-weight": "bold"
                    });
                }

                if (!labelRight) {
                    sliderlabelleft.setText("");
                    sliderlabelmid.setText(labelLeft);
                    sliderlabelright.setText("");
                    sliderlabelmid.setStyle({
                        "font-weight": "bold"
                    });
                }

            }

        },
        {
            xtype: "checkbox",
            //checked: true,
            boxLabel: "allow probable",
            name: "allowProbable",
            id: "allowProbableCheckbox",
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
    getSliderSQLQuery: function(includeProbable, onlyContinuous) {

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

        //var includeProbable = Ext.getCmp("allowProbableCheckbox").getValue();
        //var onlyContinuous = Ext.getCmp("onlyContinuousCheckbox").getValue();

        //console.log(includeProbable);
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
                    if (includeProbable) {
                        filterList.push("(date_1_Jhv='ja' OR date_1_Jhv='vermutet')");
                    } else {
                        filterList.push("date_1_Jhv='ja'");
                    }
                } else {
                    if (includeProbable) {
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
            // if not empty return filter
            return queryString;
        } else if (startCentury === 0 && endCentury === 13 && onlyContinuous) {
            // if all included but continous selected, return everything
            return queryString;
        } else {
            // if not continuous and empty, return empty filter
            return false;
        }
    },

    getCenturiesSQLQuery: function() {
        //var slider = this.lookupReference("centuryslider");

        var allowProbable = Ext.getCmp("allowProbableCheckbox").getValue();
        var onlyContinuous = Ext.getCmp("onlyContinuousCheckbox").getValue();

        var sliderFilterString;
        if (allowProbable) {  // vermutet erlaubt
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
