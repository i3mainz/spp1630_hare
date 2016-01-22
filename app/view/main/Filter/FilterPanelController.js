"use strict";

Ext.define("SppAppClassic.view.main.Filter.FilterPanelController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-filterpanel",

    /*requires: [
        "SppAppClassic.view.main.Filter.CenturySlider",
        "SppAppClassic.view.main.Map",  // id: "geoextMap",
        "SppAppClassic.view.main.Filter.FilterPanel"
    ],*/

    control: {
        "#": {
             close: "onClose"
        }
    },

    // TODO: keep previous qcl filter intact -> right now it gets overwritten
    // make universal, right now it only works for harbour layer
    applyFilterToHarbourLayer: function(filterString) {
        var map = Ext.getCmp("geoextMap");
        var layer = map.getLayerByName("Harbours");
        var newSource = map.createVectorSource("SPP:sppgesamt", filterString);
        layer.setSource(newSource);  // this refreshes automatically
    },

    onClose: function() {
        Ext.getCmp("filterButton").setPressed(false);
    },

    getQueryString: function(dates, allowNull) {
        // all selected must be "ja" -> "null" and "nein" ignored for now
        allowNull = allowNull || false;

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
        var startCentury = dates[0];
        var endCentury = dates[1];

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
                    filterList.push("date_1_Jhv='ja'");
                } else {
                    filterList.push("date_" + century + "_Jh='ja'");
                }
            }
        }
        // remove leading ";"
        var queryString = filterList.join(" AND ");
        return queryString;
    },

    onSliderChangeComplete: function() {

        /* sources appear tp be empty, since they are loaded async */
        /* retrieving the previous source istn working because
        of the tile loading strategy. possible to grab features but not the
        source"s parameters. therefore a new vector source has to be created each time */
        //console.log("changed slider!");

        /*
        "4th Century",   // 0, date_4_Jh
        "5th Century",   // 1
        "6th Century",   // 2
        "7th Century",   // 3
        "8th Century",   // 4
        "9th Century",   // 5
        "10th Century",  // 6
        "11th Century",  // 7
        "12th Century",  // 8
        "13th Century"   // 9  date_13_Jh // ja, nein
        */

        var me = this;
        var slider = me.lookupReference("centuryslider");
        
        //var filterPanel = Ext.getCmp("filterPanel");

        // update text next to slider
        var labelText = "C" + slider.getValues()[0] + "th - C" + slider.getValues()[1] + "th";
        me.lookupReference("sliderlabel").setText(labelText);

        // apply filter -> gets applied on apply buton click
        /*
        var filterString = me.getQueryString(slider.getValues());
        me.applyFilterToHarbourLayer(filterString);
        */
    },

    /**
     * Resets all filters applied to layer 'Open'. 
     * Loads layer with empty filter string.
    */
    onResetButtonClick: function() {
        this.applyFilterToHarbourLayer("");  // empty filter
    },

    /**
     * Gets values of filter panel and apply these to the layer 'Open'
    */
    onApplyButtonClick: function() {
        console.log("applying filters!");

        // these may change depending on layer
        //var statusAttr = "status";
        var accessAttr = "public";

        // get slider
        var slider = this.lookupReference("centuryslider");
        var sliderFilterString = this.getQueryString(slider.getValues());

        // get status
        var status1 = Ext.getCmp("checkboxStatus1").getValue();
        var status2 = Ext.getCmp("checkboxStatus2").getValue();
        var status3 = Ext.getCmp("checkboxStatus3").getValue();

        var statusFilterList = [];
        if (status1) {
            statusFilterList.push("status=1");
        }
        if (status2) {
            statusFilterList.push("status=2");
        }
        if (status3) {
            statusFilterList.push("status=3");
        }
        if (!status1 && !status2 && !status3) {
            statusFilterList.push("status!=1 AND status!=2 AND status!=3");
        }

        // get access
        var access1 = Ext.getCmp("checkboxAccess1").getValue();
        var access2 = Ext.getCmp("checkboxAccess2").getValue();
        var access3 = Ext.getCmp("checkboxAccess3").getValue();

        var accessFilterList = [];
        if (access1) {
            accessFilterList.push(accessAttr + "='offen'");
        }
        if (access2) {
            accessFilterList.push(accessAttr + "='SPP intern'");
        }
        if (access3) {
            accessFilterList.push(accessAttr + "='AG intern'");
        }
        if (!access1 && !access2 && !access3) {
            accessFilterList.push(accessAttr + "=!offen AND " + accessAttr + "!='SPP intern' AND " + accessAttr + "!='AG intern'");
        }

        var filterString = "(" + statusFilterList.join(" OR ") + ") AND (" + sliderFilterString + ") AND (" + accessFilterList.join(" OR ") + ")";
        //filterString = accessFilterList.join(" OR ");

        // apply filters to layer "harbours"
        this.applyFilterToHarbourLayer(filterString);
    }
});
