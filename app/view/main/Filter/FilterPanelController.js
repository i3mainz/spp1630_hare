"use strict";

Ext.define("SppAppClassic.view.main.filter.FilterPanelController", {
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
    applyFilterToLayer: function(layerName, filterString) {
        var map = Ext.getCmp("geoextMap");
        var layer = map.getLayerByName(layerName);
        var newSource;
        if (layerName === SppAppClassic.app.globals.sppLayerTitle) {
            newSource = map.createVectorSource(SppAppClassic.app.globals.sppLayerName, filterString);
        } else {
            console.log("unknown layer name");
        }

        layer.setSource(newSource);  // this refreshes automatically
    },

    onClose: function() {
        Ext.getCmp("filterButton").setPressed(false);
    },

    onSliderChange: function() {

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
        var labelText;
        // update text next to slider
        var value1 = slider.getValues()[0];
        var value2 = slider.getValues()[1];

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
    /*onResetButtonClick: function() {
        this.applyFilterToHarbourLayer("");  // empty filter
    },*/

    getCenturiesSQLQuery: function() {
        var slider = this.lookupReference("centuryslider");

        var allowPropable = Ext.getCmp("allowPropableCheckbox").getValue();
        var onlyContinuous = Ext.getCmp("onlyContinuousCheckbox").getValue();

        var sliderFilterString;
        if (allowPropable) {  // vermutet erlaubt
            if (onlyContinuous) {
                sliderFilterString = slider.getSQLQuery(true, true);
            } else {
                sliderFilterString = slider.getSQLQuery(true, false);
            }

        } else {
            if (onlyContinuous) {
                sliderFilterString = slider.getSQLQuery(false, true);
            } else {
                sliderFilterString = slider.getSQLQuery(false, false);
            }
        }

        return sliderFilterString;
    },

    getStatusSQLQuery: function() {
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

        return statusFilterList.join(" OR ");
    },

    getProjectSQLQuery: function() {
        var projectList = [];

        var counter = 1;
        var projects = Projects.projectList;
        for (var key in projects) {
            var project = projects[key];
            if (project.db_name) {
                var componentID = "project" + project.id + "Checkbox";
                var projectIsSelected = Ext.getCmp(componentID).getValue();
                if (projectIsSelected) {
                    projectList.push("project_id=" + project.id);
                }
            }

        }
        return projectList.join(" OR ");
    },

    /**
     * Gets values of filter panel and apply these to the layer 'Open'
    */
    onApplyButtonClick: function() {

        Ext.getCmp("applyFilterButton").disable();

        var projectSQLQuery = this.getProjectSQLQuery();
        var statusSQLQuery = this.getStatusSQLQuery();
        var sliderSQLQuery = this.getCenturiesSQLQuery();

        var filterString = "(" + projectSQLQuery + ") AND (" + statusSQLQuery + ") AND (" + sliderSQLQuery + ")";
        //var filterString = "(" + statusSQLQuery + ") AND (" + sliderSQLQuery + ")";

        // apply filters to layer "harbours"
        this.applyFilterToLayer("Harbours", filterString);

        Ext.getCmp("applyFilterButton").enable();
    }
});
