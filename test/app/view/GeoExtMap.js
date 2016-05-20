"use strict";

describe('SppAppClassic.view.main.map.GeoExtMap', function() {


    var map;

    beforeEach(function() {
        map = Ext.create('SppAppClassic.view.main.map.GeoExtMap', {
            width: 0,
            height: 0
        }).show();
    });

    afterEach(function() {
        map.destroy();
    });

    it("should be defined and have a title", function() {
        expect(map).toBeDefined();
        expect(map.title).toEqual("Login");
    });




});
