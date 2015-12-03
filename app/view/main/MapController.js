function getLegend(layer_name) {
    "use strict";
    var html = '<img id="legend" src="http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=15&HEIGHT=15&LAYER=' + layer_name + '&LEGEND_OPTIONS=fontName:arial">';
    return html;
}
// contains any view-related logic,
// event handling of the view, and any app logic. 

Ext.define('SppAppClassic.view.main.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-map',

    //views: ['Map'],
    
    // get view variables 
    refs: [
        {ref: 'treePanel', selector: 'treePanel'},  // access via treePanel
        {ref: 'legendPanel', selector: 'legendPanel'},
        {ref: 'olMap', selector: 'olMap'},
        {ref: 'accesslayerGroup', selector: 'access'},
        {ref: 'mapComponent', selector: 'mapComponent'},
        {ref: 'mapPanel', selector: 'mapPanel'}

         
    ],
    /*
    fullscreen: function() {
    	"use strict";
    	console.log("applying fullscreen!");
    	ol.control.FullScreen.call();
    },
    */
    /*
    exportMap: function(ol3Map) {
    	var exportPNGElement = Ext.get('export-png');
    	console.log(exportPNGElement);
    	if ('download' in exportPNGElement) {
		 	exportPNGElement.addEventListener('click', function(e) {
			    ol3Map.once('postcompose', function(event) {
			      var canvas = event.context.canvas;
			      exportPNGElement.href = canvas.toDataURL('image/png');
			    });
			    ol3Map.renderSync();
			}, false);
		} else {
			var info = document.getElementById('no-download');
			info.style.display = '';
		}
    }
    */
    /*
    calcCoordinates: function(evt) {
    	"use strict";
		console.log("calculating coordiantes!");
		var coord = evt.coordinate;
		var transformed_coordinate = ol.proj.transform(coord, "EPSG:900913", "EPSG:4326");
		console.log(transformed_coordinate);
    },
    */
    
    onZoomToMaxExtent: function() {
        // both the OL3-map-object or the GeoExt mapComponent can be used
        // both have slightly different methods 
        // olMap.getLayers() not iteratable -> mapComponent.getLayers() works
    	"use strict";
    	console.log("zooming to maximum extend!");
        console.log(mapComponent.getExtent());

        // get extend from access layer Group ->  TODO: use active Layergroups instead
        //console.log(mapPanel);
        //var layerGroups = olMap.getLayers();
        //console.log(olMap.getLayerGroup());
        //console.log(olMap.getLayers());

        // get active layerGroups

        var layerGroups = mapComponent.getLayers();

        //console.log(layerGroups);
        //console.log(layerGroups.b.getExtent());
        
        //console.log(olMap.getLayerGroup().getLayers());
        //console.log(olMap.getLayerGroup().getExtent());
        
        // loop all layer groups and find maximum extent
        var maxExtent = ol.extent.createEmpty();
        console.log(maxExtent);

        layerGroups.forEach(function(layerGroup) {
            // ignore layergroups -> couldnt get layergroup.getExtend() to work

            if (layerGroup.isLayerGroup) {
                var layers = layerGroup.getLayers();

                
                layers.forEach(function(layer) {
                    //console.log(layer.getOpacity()); 
                    console.log(layer.getExtent()); 
                });
            }
            
            // Modify an extent to include another extent
            //ol.extent.extend(maxExtent, layerGroup.src.B.getExtent());
            //console.log(maxExtent);
        });

        //olMap.setExtent(maxExtent);

        /*
        //var extent = myLayer.getSource().getExtent();

        var currentExtend = olMap.getSize();

        // get size of map (TODO: calculate extent for all layers combined)
        var extent = olMap.getView().calculateExtent(currentExtend);
        
        olMap.getView().fit(extent, currentExtend);
    	*/
        //console.log(ol3Map);
    	
        //ol3Map.getView().fitExtent(extent, map.getSize());
    },

    // updateLegend when a node is checked or unchecked
    onNodeCheckChange: function() {  // requires treePanel & legendPanel
        "use strict";
        // get panel objects
        console.log("updating legend!");
        
        // get all layer source names. required for legend query 
        var layerNameList = [];
        treePanel.getChecked().forEach(function(node) {  // loop all active nodes
            var olLayer = node.data;
            if (!olLayer.isLayerGroup) {  // ignore layerGroup-folders
                var source = olLayer.getSource();
                console.log(source);
                if (source.D === "geoserver") {  // ingore layers not hosted on the local geoserver (just basemaps for now)
                    //var layer_url = source.getUrls();
                    console.log(source.getParams());
                    //var layer_name = layer_url.match("#LAYERS-(.*)#")[1];
                    var layerName = source.getParams().LAYERS;
                    layerNameList.push(layerName);
                }
            }
        });

        // get legend for all layers
        var newLegendHtml = "";
        layerNameList.forEach(function(layerName) {
            newLegendHtml += getLegend(layerName) + layerName + "<br>";
        });

        // apply legend
        legendPanel.update("");  // clear html
        legendPanel.update(newLegendHtml);  // new legend  
    }
    
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
    
    /*
    // TODO -> put this in Controller
    function onZoomToMaxExtent1() {
        "use strict";
        console.log("zooming to maximum extend new!");
        var max_extend = olMap.getSize();
        olMap.setCenter(ol.proj.fromLonLat( [8.751278, 50.611368] ));
        //olMap.getView().fitExtent(olMap.getSize());
    }
    */

    // listen for events
    /*
    barringtonLayer1.on('change:visible', function() {
        "use strict";
        //console.log("updating legend!");
        // update legend if layer is active
        if (this.getVisible() === true) {  // layer is active
            var layer_url = this.getSource().Y;
            var layer_name = layer_url.match("#LAYERS-(.*)#")[1];
            var legend = getLegend(layer_name);
            legendPanel.update(legend);
        
        // if layer is inactive, clear legend
        } else {
            legendPanel.update("");
        }
    });
    */
});
