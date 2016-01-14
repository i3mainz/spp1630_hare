"use strict";

Ext.define("SppAppClassic.view.main.Map.Toolbar.ToolbarController", {
    extend: "Ext.app.ViewController",
    alias: "controller.map-toolbar",

    requires: [
        "SppAppClassic.view.main.GridWindow",
        "SppAppClassic.view.main.Filter.FilterPanel"
    ],

    zoomIn: function() {
        console.log("zoom in!");
        var view = OL3Map.map.getView();
        var currentZoom = view.getZoom();
        view.setZoom(currentZoom + 1);
    },
    zoomOut: function() {
        console.log("zoom out!");
        var view = OL3Map.map.getView();
        var currentZoom = view.getZoom();
        view.setZoom(currentZoom - 1);
    },
    zoomAnimated: function() {

       var zoom = ol.animation.zoom({duration: 500, resolution: OL3Map.map.getView().getResolution()});
       //olMap.beforeRender(zoom);
       OL3Map.map.getView().setZoom(zoom);
    },

    /* zoomTomax extend -> get Center of map on start of app. 
    then set farthest zoom level */
    onCenter: function() {
        console.log("center in!");
        var view = OL3Map.map.getView();
        view.setCenter(MAP_CENTER);
        view.setZoom(4);
        view.setRotation(0);
    },
    onRotate: function() {
        console.log("rotate!");
        var view = OL3Map.map.getView();
        var currentRotation = view.getRotation();
        console.log(currentRotation);
        OL3Map.map.getView().setRotation(currentRotation + 0.5);
    },
    onToggleHover: function() {
        console.log("toggle hover!");
        var interactions = OL3Map.map.getInteractions();
        var selectInteraction; 
        interactions.forEach(function(interaction) {
            if (interaction instanceof ol.interaction.Select) {
                selectInteraction = interaction;
            }
        });
        // toogle on
        if (selectInteraction) {
            OL3Map.map.removeInteraction(selectInteraction);
            //Ext.getCmp("hoverButton").setText("end hover");
        // toogle off
        } else {
            var newInteraction = new ol.interaction.Select({
                condition: ol.events.condition.pointerMove  // empty -> select on click
            });
            OL3Map.map.addInteraction(newInteraction);
            //Ext.getCmp("hoverButton").setText("start hover");
        }
    },

    onToggleFilter: function() {
        //var filterPanel = this.lookupReference("filterpanel");  // not working
        var filterPanel = Ext.getCmp("filterPanel");

        if (!filterPanel) {  // lazy instantiation
            filterPanel = Ext.create("SppAppClassic.view.main.Filter.FilterPanel");
        }

        if (filterPanel.isHidden()) {
            filterPanel.show();
        } else {
            filterPanel.hide();
        }

        //filterPanel.toggleCollapse();  // not show, because it already exists
    },

    onGridClick: function() {
        Ext.create("SppAppClassic.view.main.GridWindow").show();
        //var gridPanel = me.lookupReference("gridpanel");  // not working, cuz it doesnt exist???   
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
        var map = OL3Map.map; // replace with correct lookupreference!
        
        var layers = this.getActiveLayers(map, true);

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
    }

});
