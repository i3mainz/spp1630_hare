"use strict";

Ext.define("SppAppClassic.FilterPanelController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-filterpanel",

    requires: [
        "ConfigService",
        "OL3MapService"
    ],

    onClose: function() {
        Ext.getCmp("filterButton").setPressed(false);
    },

    onCollapse: function() {
        Ext.getCmp("filterButton").setPressed(false);
    },

    onExpand: function() {
        Ext.getCmp("filterButton").setPressed(true);
    },


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

        // get all selected projects
        var unselectedProjects = [];
        ConfigService.projects.forEach(function(project) {
            // get checkbox id and query it
            var componentID = "project" + project.id + "Checkbox";
            var projectIsSelected = Ext.getCmp(componentID).getValue();

            // create sql string
            if (!projectIsSelected) {
                unselectedProjects.push(project);
            }
        });

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
        sql = Ext.getCmp("centuryselector").getCenturiesSQLQuery();
        if (sql) {
            queryList.push(sql);
        }

        var filterString = queryList.join(" AND ");
        //var filterString = this.getStatusSQLQuery();
        // if nothing selected, show origin layer
        if (filterString.length === 0) {
            filterString = "status=1 OR status=2 OR status=3";  // workaround to select everything
        }

        //console.log("project filter broken becauase project id is missing!");

        // apply filter to all filterable layers
        Ext.getCmp("geoextMap").getFilterableLayers().forEach(function(layer) {
            //console.log(layer.get("id"));
            OL3MapService.filterLayer(layer, filterString);
        });
    }
});
