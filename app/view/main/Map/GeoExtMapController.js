"use strict";

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
// contains any view-related logic,
// event handling of the view, and any app logic. 

Ext.define("SppAppClassic.view.main.map.GeoExtMapController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-geoextmap",

    requires: [  // view not needed in requirements
        "SppAppClassic.view.main.Popup"
    ],

    // using lookupReference() instead of refs, see
    // <https://docs.sencha.com/extjs/6.0/application_architecture/view_controllers.html>

    // define listeners here instead of the view. 
    // keeps view and controller logic seperated
    control: {
        "#": {  // matches the view itself
            //beforerender: "onBeforeRender",  // TODO: do this on component init
            click: "onMapClick",
            pointermove: "onPointerMove"
        }
    },

    /**
     * gets all attributes of a feature and returns them as a
     * html string.
    */
    getInfoHtmlForOlFeature: function(olFeature) {
        var html = "";
        var attributes = olFeature.getKeys();
        attributes.forEach(function(attribute) {
            html += "<strong>" + attribute + ": </strong>" + olFeature.get(attribute) + "<br>";
        });
        return html;
    },

    /**
     * show popup with feature infos when a feature is clicked. 
     * checks if the clicked pixel contains a feature. if so
     * a popup window with all attributes opens.
     * by default, all visible layers will be tested
    */
    onMapClick: function(evt) {
        // this.map replaces olMap.map until GeoExt3 function exists
        var map = Ext.getCmp("geoextMap").map;
        //var pixel = map.getEventPixel(evt.originalEvent);
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
                //console.log(feature.getKeys());
                return feature;
            }
        );

        var popupWindow = Ext.getCmp("popupWindow");
        // lazy instanciation
        if (!popupWindow) {
            popupWindow = Ext.create("SppAppClassic.view.main.Popup");
        }

        if (feature) {   // clicked on feature
            popupWindow.setHtml("<p>" + this.getInfoHtmlForOlFeature(feature) + "</p>");
            popupWindow.show();
            // TODO: show popup window next to feature
            //popupPanel.showAt(evt.getXY());

        } else {  // clicked somewhere else
            if (popupWindow !== undefined) {  // in case it got destroyed
                popupWindow.hide();
            }
        }
    },

    /**
     * changes mouse cursor to a "hand" when it's over a feature,
     * to indicate that the feature is clickable
    */
    onPointerMove: function(evt) {
        var map = Ext.getCmp("geoextMap").map;
        //var pixel = map.getEventPixel(evt.originalEvent);
        var hasFeature = map.forEachFeatureAtPixel(evt.pixel, function() {
            return true;
        });
        if (hasFeature) {
            map.getTarget().style.cursor = "pointer";
        } else {
            map.getTarget().style.cursor = "";
        }
    },

    /**
     * checks user's authorization and adds layer groups accordingly.
     * beforerender is a default event. no need to specify it in the
     * listeners like {beforerender: "beforeRender"}. it just works 
     * since ExtJs recognizes the name. the function in the controller
     * needs to be in lowerCamelCase: "beforerender" wouldn't work, while
     * "beforeRender" works. I use onBeforeRender. not sure if using 
     * beforeRender does overwrite some interal functions 
    */
    onBeforeRender: function() {
        // use geoext method to keep layer reorder working
        // also doesnt work with reorder
        var map = Ext.getCmp("geoextMap");
        if (Ext.util.Cookies.get("sppCookie") === "guest") {
            map.addLayer(LayerGroups.baselayers);
            map.addLayer(LayerGroups.hydrology);
            map.addLayer(LayerGroups.sppOpen);
        } else {
            map.addLayer(LayerGroups.baselayers);
            map.addLayer(LayerGroups.darmc);
            map.addLayer(LayerGroups.barrington);
            map.addLayer(LayerGroups.hydrology);
            map.addLayer(LayerGroups.spp);
        }
    }

});
