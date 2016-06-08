"use strict";

describe('LayerService', function() {
    var LayerService = LayerGroups;
    it("should be defined", function() {
        expect(LayerService).toBeDefined();
    });

    it("getLayerByName() should return correct layer", function() {
        var layer = LayerService.getLayerByName("Harbour data");
        expect(layer).toBeDefined();
        expect(layer.get("name")).toBe("Harbour data");
    });




});
