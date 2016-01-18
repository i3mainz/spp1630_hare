"use strict";

Ext.define("SppAppClassic.view.main.Filter.FilterPanelController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-filterpanel",

    applyFilter: function() {
        var me = this;
        var slider = me.lookupReference("centuryslider");
    },

    onClose: function() {
        Ext.getCmp("filterButton").setPressed(false);
    },

    onSliderChangeComplete: function() {
        console.log("slider change complete!");
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

        //var tree = me.lookupReference("layertree");
        //var map = me.lookupReference("geoextmap");
        //var olMap = me.lookupReference("ol3map");  // not working: fix!
        
        var layers = OL3Map.getActiveLayers(true);  // replace with correct lookupreference!

        layers.forEach(function(layer, i) {         // loop layers
    
            console.log(layer.get("name"));
            // only works for SPP:v_public_offen right now
            if (layer.get("name") === "Open") {  // layer is "SPP:v_public_offen"
                var filter = me.getQueryString(slider.getValues());     
                //console.log(filter);                   
                var newSource = me.createVectorSource("SPP:v_public_offen", filter);
                

                layer.setSource(newSource);  // this refreshes automatically

                // update layername to include ("Filtered")
                //layer.set("name", layer.get("name") + " (F)");
                // -> get node by name
                //console.log(tree.nextNode.getText());

            }
        });
    },

    /**
     * Resets all filters applied to layer 'Open'. 
     * Loads layer with empty filter string.
    */
    onResetButtonClick: function() {
        var layer = OL3Map.getLayerByName("Open");
        var newSource = OL3Map.createVectorSource("SPP:v_public_offen", "");
        console.log("after source!");
        layer.setSource(newSource);  // this refreshes automatically
    },

    /**
     * Gets values of filter panel and apply these to the layer 'Open'
    */
    onApplyButtonClick: function() {
        console.log("applying filters!");

        // status
        var status1 = Ext.getCmp("checkboxStatus1").getValue();
        var status2 = Ext.getCmp("checkboxStatus2").getValue();
        var status3 = Ext.getCmp("checkboxStatus3").getValue();
        
        // create query string
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

        //var filterString = "(" + statusFilterList.join(" OR ") + ") AND (" + typeFilterList.join(" OR ") + ")";
        var filterString = statusFilterList.join(" OR ");

        //console.log(filterString);

        // apply filters to layer "harbours"
        var layer = OL3Map.getLayerByName("Harbours");
        var newSource = OL3Map.createVectorSource("SPP:harbours", filterString);
        layer.setSource(newSource);  // this refreshes automatically 

    }
});
