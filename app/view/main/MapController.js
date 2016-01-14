"use strict";
// contains any view-related logic,
// event handling of the view, and any app logic. 

/*
// tODO put that into controller
function createOL3Layer(layername, displayname, visible, zIndex) {
    zIndex = zIndex || 0;  // set default
    visible = visible || false;  // set default
    var layer = new ol.layer.Tile({
        //extent: [-13884991, 2870341, -7455066, 6338219],
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {'LAYERS': layername, 'TILED': true},
          serverType: 'geoserver',
          wrapX: false   // dont repeat on X axis
        }),
        legendUrl: getLegendUrl(layername),  // through plugin
        name: displayname,
        visible: visible
    });
    return layer;
}
// tODO put that into controller
function createOL3VectorLayerFromGeoJson(layername, displayname, style, visible) {
    // "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?bereich=SPP&layer=road&bbox=-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562&epsg=4326"
    visible = visible || false;  // set default to zero
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
                    "&bbox=" + extent.join(',') + 
                    "&epsg=" + EPSG;
        },
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
            maxZoom: 19
        })),
        wrapX: false  // dont repeat on X axis
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        //legendUrl: getLegendUrl(layername),  // gets legend from geoserver -> is wrong when 
        // used as GeoJSON and applied new style 
        style: style,
        name: displayname,
        visible: visible 
    });
    //console.log(vectorLayer instanceof ol.layer.Vector);
    return vectorLayer;
}
// tODO put that into controller
function createVectorSource(layername) {
    // "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?bereich=SPP&layer=road&bbox=-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562&epsg=4326"
    var PROXY_URL = "http://haefen.i3mainz.hs-mainz.de/GeojsonProxy/layer?";
    var workspace = layername.split(":")[0];
    var layer = layername.split(":")[1];
    //var BBOX = "-9.60676288604736,23.7369556427002,53.1956329345703,56.6836547851562";
    var EPSG = "4326";

    var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: function(extent, resolution, projection) {
            return PROXY_URL + "bereich=" + workspace + "&layer=" + layer + "&bbox=" + extent.join(',') + "&epsg=" + EPSG;
        },
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
            maxZoom: 19
        }))
    });

    return vectorSource;
}
*/
/*
function getLegendUrl(layer_name) {
    return GEOSERVER_URL + "REQUEST=GetLegendGraphic&" + 
        "VERSION=1.0.0&" + 
        "FORMAT=image/png&" + 
        "WIDTH=50&HEIGHT=50&" + 
        "TRANSPARENT=true&" +
        "LAYER=" + layer_name + "&" + 
        "LEGEND_OPTIONS=" + 
            "fontName:arial;" + 
            "dpi:180";
}
*/

Ext.define('SppAppClassic.view.main.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-map',
    
    //requires: ["SppAppClassic.view.main.GridWindow"],
    // using lookupReference() instead of refs, see
    // <https://docs.sencha.com/extjs/6.0/application_architecture/view_controllers.html>
    
    /*
    control: {
        '#': {  // matches the view itself
            changecomplete: "onChangeComplete",
        },
    */

    someFn: function() {
        Ext.Msg.alert('Status', 'Some function!!!');
    },

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

    onMapClick: function() {
        console.log("clicked on map!! :DD");
    },

    getQueryString: function(dates, allowNull) {
        // all selected must be "ja" -> "null" and "nein" ignored for now
        allowNull = allowNull || false;

        /*
        '1st Century BC',   // 0 
        '1st Century',      // 1 
        '2nd Century',      // 2 
        '3rd Century',      // 3 
        '4th Century',      // 4 
        '5th Century',      // 5
        '6th Century',      // 6
        '7th Century',      // 7
        '8th Century',      // 8
        '9th Century',      // 9
        '10th Century',     // 10
        '11th Century',     // 11
        '12th Century',     // 12
        '13th Century'      // 13  date_13_Jh // ja, nein
        */
        var startCentury = dates[0];
        var endCentury = dates[1];

        var filterList = [];
        //var queryString = "";

        for (var century = 0; century < 14; century++) { 
            if (century < startCentury || century > endCentury) {  // not selected
                /*
                if (century === 0) {  // special for 1st BC
                    filterList.push("date_1_Jhv='nein'");
                } else {
                    filterList.push("date_" + century + "_Jh='nein'");
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
        var queryString = filterList.join(' AND ');
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
    },

    // slider function    
    // show century slider 
    onToggleFilter: function() {
        var me = this;
        //var filterPanel = me.lookupReference('filterpanel1');  // not working
        var filterPanel = Ext.getCmp("filterPanel");
        //filterPanel.show();
        filterPanel.toggleCollapse();       
    },

    onGridClick: function() {
        console.log("clicked grid button!");
        var gridPanel = Ext.create("SppAppClassic.view.main.GridWindow");
        //var me = this;
        //var gridPanel = me.lookupReference("gridpanel");  // not working, cuz it doesnt exist???
        //var gridPanel = Ext.getCmp("gridpanel");
        gridPanel.show();
        //gridPanel.toggleCollapse();       
    },

    onSliderChangeComplete: function() {
        console.log("slider change complete!");
        /* sources appear tp be empty, since they are loaded async */
        /* retrieving the previous source istn working because
        of the tile loading strategy. possible to grab features but not the
        source's parameters. therefore a new vector source has to be created each time */
        //console.log("changed slider!");

        /*
        '4th Century',   // 0, date_4_Jh
        '5th Century',   // 1
        '6th Century',   // 2
        '7th Century',   // 3
        '8th Century',   // 4
        '9th Century',   // 5
        '10th Century',  // 6
        '11th Century',  // 7
        '12th Century',  // 8
        '13th Century'   // 9  date_13_Jh // ja, nein
        */

        var me = this;
        var slider = me.lookupReference('centuryslider');
        //var filterPanel = Ext.getCmp('filterPanel');

        // update text next to slider
        var labelText = "C" + slider.getValues()[0] + "th - C" + slider.getValues()[1] + "th";
        me.lookupReference('sliderlabel').setText(labelText);

        //var tree = me.lookupReference('layertree');
        //var map = me.lookupReference('geoextmap');
        //var olMap = me.lookupReference('ol3map');  // not working: fix!
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
