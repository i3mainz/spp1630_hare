"use strict";

Ext.define("SppAppClassic.FilterPanelController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-filter",

    requires: [
        "ConfigService",
        "MapService"
    ],

    /**
     * Resets all filters applied to layer 'Open'.
     * Loads layer with empty filter string.
    */
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
                // sqlList.push("(project_id > " + project.id + " OR project_id < " + project.id + ")");
                // < and > not supported, using
                sqlList.push("(project_id gt " + project.id + " OR project_id lt " + project.id + ")");
            })
            return "(" + sqlList.join(" AND ") + ")";
        }
    },

    /**
     * Gets values of filter panel and apply these to the layer 'Open'
    */
    applyFilter: function() {
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
        // if nothing selected, show origin layer
        if (filterString.length === 0) {
            filterString = "status=1 OR status=2 OR status=3";  // workaround to select everything
        }

        // apply filter to all filterable layers
        Ext.getCmp("geoextMap").getFilterableLayers().forEach(function(layer) {
            MapService.filterLayer(layer, filterString);
        });
    }
});
