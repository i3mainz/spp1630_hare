"use strict";

describe('OL3MapService', function() {

    var service;
    var map;

    beforeEach(function() {

        service = OL3MapService;

        //var vectorLayer =

        map =  new ol.Map({
            layers: [
                new ol.layer.Tile({
                    name: "Simple Background layer",
                    source: new ol.source.MapQuest({layer: 'sat'})
                }),
                new ol.layer.Group({
                    name: "Vector Layer Group",
                    layers: new ol.Collection([
                        new ol.layer.Vector({
                          name: "Example Vector Layer",
                          format: new ol.format.GeoJSON(),
                          source: new ol.source.Vector({
                              object: {
                                  'type': 'Feature',
                                  'geometry': {
                                      'type': 'Polygon',
                                      'coordinates': [[[3000000, 6000000], [4000000, 4000000], [5000000, 6000000]]]
                                  }
                              }
                          })
                       })

                    ])
                }) // end layer group

            ],
            view: new ol.View({
              center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
              zoom: 4
            })
        });

    });

    it("should be defined", function() {
        expect(service).toBeDefined();
    });

    it("setMap() should add a map", function() {
        service.setMap(map);
        expect(service.map instanceof ol.Map).toBeTruthy();
    });

    it("getLayers() should return all layers of a map", function() {
        var layers = service.getLayers();
        expect(layers.length).toBe(2);
    });

    it("getLayerByName() should return layer by name", function() {
        var layer = service.getLayerByName("Simple Background layer");

        expect(layer instanceof ol.layer.Tile).toBeTruthy();
        expect(layer.get("name")).toBe("Simple Background layer");
    });

    it("getLayerByName() should return layer from within a layerGroup", function() {
        var layer = service.getLayerByName("Example Vector Layer");

        expect(layer instanceof ol.layer.Vector).toBeTruthy();
        expect(layer.get("name")).toBe("Example Vector Layer");
    });



    /*it("updateVectorSource() should update a vector layer with the provided filter", function() {
        service.setMap(map);


        var layer = service.getLayerByName("Example Vector Layer");

        //expect(layer.get("name")).toBe("Example Vector Layer");

        var source = layer.getSource();
        expect(source instanceof ol.source.Vector).toBeTruthy();


        source.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

        expect(source.getFeatures().length).toBe(1);

        //expect(source.getFormat()).toBe(1);
        //expect(layer.getSource().getFormat()).toBe("what");
        //service.updateVectorSource();
    })*/

    /*it("should have a controller with methods", function() {
        var controller = extWindow.getController();
        expect(controller).not.toBe(null);
        expect(typeof controller.onLoginClick).toBe("function");
        //this.lookupReference('delete').setDisabled(selections.length === 0);
    });*/


});
