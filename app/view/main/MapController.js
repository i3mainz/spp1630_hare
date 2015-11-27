
// contains any view-related logic,
// event handling of the view, and any app logic. 

Ext.define('SppAppClassic.view.main.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-map',

    views: ['SppAppClassic.view.main.Main'],

    fullscreen: function() {
    	"use strict";
    	console.log("applying fullscreen!");
    	ol.control.FullScreen.call();
    },
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
    calcCoordinates: function(evt) {
    	"use strict";
		console.log("calculating coordiantes!");
		var coord = evt.coordinate;
		var transformed_coordinate = ol.proj.transform(coord, "EPSG:900913", "EPSG:4326");
		console.log(transformed_coordinate);
    },
    onZoomToMaxExtent: function() {
    	"use strict";
    	console.log("zooming to maximum extend!");
    	console.log(ol3Map);
    	//ol3Map.getView().fitExtent(extent, map.getSize());
    }
    /*
    map.on('singleclick', function(evt){
	var coord = evt.coordinate;
	var transformed_coordinate = ol.proj.transform(coord, "EPSG:900913", "EPSG:4326");
	console.log(transformed_coordinate);
	*/

});
