"use strict";
// contains any view-related logic,
// event handling of the view, and any app logic. 


function getActiveLayers() {
    /* returns a list of OL3 Layer objects 
    that includes all selected nodes */
    var activeOlLayers = [];
    olMap.getLayers().forEach(function(layer, i) {
        if (layer instanceof ol.layer.Group) {  // all layers are nested inside a layergroup
            //console.log("is a layer group!"); 
            layer.getLayers().forEach(function(subLayer, j) {
                // actual layer level in this case
                //console.log("is a layer!"); 
                if (subLayer.getVisible() === true) {  // is active
                    //console.log("active layer!");
                    activeOlLayers.push(subLayer);
                }
            });
        }
    });
    return activeOlLayers;
}

Ext.define('SppAppClassic.view.main.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-map',

    //views: ['Map'],
    
    // get view variables 
    refs: [
        {ref: 'olMap', selector: 'olMap'},
        {ref: 'mapComponent', selector: 'mapComponent'},
        {ref: 'slider', selector: 'slider'}
    ],

    zoomIn: function() {
        var view = olMap.getView();
        var currentZoom = view.getZoom();
        view.setZoom(currentZoom + 1);
    },
    zoomOut: function() {
        var view = olMap.getView();
        var currentZoom = view.getZoom();
        view.setZoom(currentZoom - 1);
    },
    /* zoomTomax extend -> get Center of map on start of app. 
    then set farthest zoom level */
    onCenter: function() {
        var view = olMap.getView();
        view.setCenter(MAP_CENTER);
        view.setZoom(4);
        view.setRotation(0);
    },
    onRotate: function() {
        console.log("rotate!");
        var view = olMap.getView();
        var currentRotation = view.getRotation();
        console.log(currentRotation);
        olMap.getView().setRotation(currentRotation + 0.5);
    },
    onToggleHover: function() {
        console.log("toggle hover!");
        var interactions = olMap.getInteractions();
        var selectInteraction; 
        interactions.forEach(function(interaction) {
            if (interaction instanceof ol.interaction.Select) {
                selectInteraction = interaction;
            }
        });

        // toogle on
        if (selectInteraction) {
            olMap.removeInteraction(selectInteraction);
        
        // toogle off
        } else {
            var newInteraction = new ol.interaction.Select({
                condition: ol.events.condition.pointerMove  // empty -> select on click
            });
            olMap.addInteraction(newInteraction);
        }
    },
    /*
    // custom radio button functions for basemaps
    treePanel.on('select', function(treeModel, selectedNode) { 
        "use strict";
        var olLayer = selectedNode.data;
        
        if (olLayer.isLayerGroup === false) { // ignore group selections
            //var parentId = olLayer.parentId;
            //var parentNode = treePanel.getStore().getNodeById(parentId);
            //var groupName = parentNode.data.text;
            var parentNode = selectedNode.getParentItem();
            console.log(parentNode.text);
            // replace by selectedNode.getParentItem()
            // dann parentNode.getSelected() 


            if (groupName === "Basemaps") {
                // get all layers within this group
                var groupLayers = parentNode.data.getLayers();
                //var groupLayers = parentNode.data.B.layers;
                groupLayers.forEach(function(layer) {
                    layer.setVisible(false);
                });

                console.log(groupLayers);
                // deselect all layers in this group, but the selected
            }
        }
    });  
    */

    // slider handlers
    onSliderChangeComplete: function() {
        //console.log("changed slider!");
        console.log(slider.getValues());
    }

});
