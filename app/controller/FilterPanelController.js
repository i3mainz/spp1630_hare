"use strict";

Ext.define("SppAppClassic.FilterPanelController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-filterpanel",

    requires: [
        //"SppAppClassic.view.main.Filter.CenturySlider",
        //"SppAppClassic.view.main.Map",  // id: "geoextMap",
        //"SppAppClassic.view.main.Filter.FilterPanel"
        "OL3MapService"
    ],

    control: {
        "#": {
            close: "onClose",
            collapse: "onCollapse",
            expand: "onExpand"
        }
    },

    onClose: function() {
        Ext.getCmp("filterButton").setPressed(false);
    },

    onCollapse: function() {
        Ext.getCmp("filterButton").setPressed(false);
    },

    onExpand: function() {
        Ext.getCmp("filterButton").setPressed(true);
    },

    /*onSliderChange: function() {

        //  sources appear tp be empty, since they are loaded async
        //  retrieving the previous source istn working because
        // of the tile loading strategy. possible to grab features but not the
        // source"s parameters. therefore a new vector source has to be created each time
        // //console.log("changed slider!");


        console.log("change!");

        var me = this;
        var slider = Ext.getCmp("centuryslider");

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

        var label = Ext.getCmp("sliderlabel");
        //label = me.lookupReference("sliderlabel");
        //console.log(label);
        label.setText(labelText);

        //console.log(Ext.getCmp("sliderlabel"));

        // apply filter -> gets applied on apply buton click

    },*/

    /**
     * Resets all filters applied to layer 'Open'.
     * Loads layer with empty filter string.
    */
    /*onResetButtonClick: function() {
        this.applyFilterToHarbourLayer("");  // empty filter
    },*/





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

        if (status1 && status2 && status3) {  // all deselected
            return false;
        } else {  // at least one selected
            return "(" + statusFilterList.join(" OR ") + ")";
        }
    },

    /**
     * determine what projects are selected, return as SQL string
     */
     // TODO: move this function to ProjectService
    getProjectSQLQuery: function() {

        var projects = ProjectService.getProjectsWithDbName();

        // get all selected projects
        var unselectedProjects = [];
        projects.forEach(function(project) {
            // get checkbox id and query it
            var componentID = "project" + project.id + "Checkbox";
            var projectIsSelected = Ext.getCmp(componentID).getValue();

            // create sql string
            if (!projectIsSelected) {
                unselectedProjects.push(project);
            }
        })

        // if all selected, do nothing, no query needed
        if (unselectedProjects.length === 0) {  // all selected
            return false;

        } else {
            // some are selected, some are unselected
            var sqlList = [];

            // create sql string for each project and join them later
            unselectedProjects.forEach(function(project) {
                // != not supported by cql, using < and > instead
                sqlList.push("(project_id > " + project.id + " OR project_id < " + project.id + ")");
            })
            return "(" + sqlList.join(" AND ") + ")";
        }
    },

    /**
     * Gets values of filter panel and apply these to the layer 'Open'
    */
    applyFilter: function() {

        //Ext.getCmp("applyFilterButton").disable();

        var queryList = [];
        var sql = this.getProjectSQLQuery();
        if (sql) {
            queryList.push(sql);
        }
        sql = this.getStatusSQLQuery();
        if (sql) {
            queryList.push(sql);
        }
        /*sql = this.getCenturiesSQLQuery();
        if (sql) {
            queryList.push(sql);
        }*/

        var filterString = queryList.join(" AND ");
        //var filterString = this.getStatusSQLQuery();

        console.log(filterString);

        // apply filters
        //var layer = Ext.getStore("layersStore").filter("type", "GeoJSON");
        //var layer = Ext.getStore("layersStore").getAt(0);   // workaround because filter doesnt work. not sure why
        //var layer = OL3MapService.getLayerByName("Harbour data");

        //var layers = OL3MapService.getMap().getLayers().getArray();

        /*for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            //if (layer instanceof ol.layer.Group)
            if (layer.get("name") === "Harbours") {
                var source = layer.getSource();
                 //source.clear();

                //console.log(source.getFeatures().length);
                //source.clear(true);
                //console.log(source.getFeatures().length);
                break;
            }
            //console.log(layer.get("name"));
        }*/

        //console.log(OL3MapService.map.getLayers());
        //console.log(layer.getSource());
        var layer = OL3MapService.getLayerByName("SPP: Harbours");
        //var source = ).getSource();
        //console.log(layer.get("name"));
        //console.log(source.getFeatures().length);

        //console.log("remove features from: " + layer.get("name"));
        //console.log(layer.getSource().getFeatures().length);

        if (filterString.length > 0) {
            //console.log(source.getFeatures().length);
            OL3MapService.filterVectorSource(layer, filterString);
        } else {
            console.log("no filter!");
            OL3MapService.filterVectorSource(layer, "project_id>0"); // workaround to select everything
        }


        //Ext.getCmp("applyFilterButton").enable();
    }
});
