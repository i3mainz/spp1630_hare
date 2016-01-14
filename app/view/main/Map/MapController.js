"use strict";
// contains any view-related logic,
// event handling of the view, and any app logic. 

Ext.define("SppAppClassic.view.main.MapController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-map",
    
    // using lookupReference() instead of refs, see
    // <https://docs.sencha.com/extjs/6.0/application_architecture/view_controllers.html>
    
    /*
    control: {
        "#": {  // matches the view itself
            changecomplete: "onChangeComplete",
        },
    */

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

    createVectorSource: function(layername, filter) {
        // "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?bereich=SPP&layer=road&bbox=-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562&epsg=4326"
        filter = filter || "";

        var PROXY_URL = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
        var workspace = layername.split(":")[0];
        var layer = layername.split(":")[1];
        //var BBOX = "-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562";
        var EPSG = "4326";

        var vectorSource = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent, resolution, projection) {
                return PROXY_URL +
                    "bereich=" + workspace +
                    "&layer=" + layer +
                    "&epsg=" + EPSG +
                    "&CQL_FILTER=" + filter;
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                maxZoom: 19
            }))
        });
        return vectorSource;
    },

    getActiveLayers: function(map, onlyVectors) {
        /* returns a list of OL3 Layer objects 
        that includes all selected nodes. 
        isVector: if true, only active Vectorlayers are returned, 
        WMS layers are ommitted */
        onlyVectors = onlyVectors || false;  // set default to false

        var activeLayers = [];

        var layerGroups = map.getLayers();
        layerGroups.forEach(function(layerGroup) {      // loop layergroups  
            var layers = layerGroup.getLayers();
            layers.forEach(function(layer, i) {         // loop layers
                if (layer.getVisible()) {               // skip inactive layers
                    var source = layer.getSource();
                    if (onlyVectors) {
                        if (source instanceof ol.source.Vector) {
                            activeLayers.push(layer);
                        }
                    } else {
                        activeLayers.push(layer);
                    }
                }
            });
        });
        return activeLayers;
    }
});
