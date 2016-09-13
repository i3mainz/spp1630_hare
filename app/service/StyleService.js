"use strict";

var harbourStyles = {};
var statusStyles = {};
var eckholdStyles = {};

/**
 * Holds OpenLayers 3 style definitions.
 */
Ext.define("StyleService", {
    singleton: true,

    requires: [
        "ConfigService"
    ],

    // points: {
    //     default: new ol.style.Style({
    //         image: new ol.style.Circle({
    //             radius: 6,
    //             fill: new ol.style.Fill({
    //                 color: "#0099CC"
    //             }),
    //             stroke: new ol.style.Stroke({
    //                 color: "#fff",
    //                 width: 2
    //             })
    //         })
    //     }),
    //
    //     red: new ol.style.Style({
    //         image: new ol.style.Circle({
    //             radius: 6,
    //             fill: new ol.style.Fill({
    //                 color: "#8B0000"
    //             }),
    //             stroke: new ol.style.Stroke({
    //                 color: "#fff",
    //                 width: 2
    //             })
    //         })
    //     }),
    //
    //     blue: new ol.style.Style({
    //         image: new ol.style.Circle({
    //             radius: 6,
    //             fill: new ol.style.Fill({
    //                 color: "#0099CC"
    //             }),
    //             stroke: new ol.style.Stroke({
    //                 color: "#fff",
    //                 width: 2
    //             })
    //         })
    //     }),
    //
    //     green: new ol.style.Style({
    //         image: new ol.style.Circle({
    //             radius: 6,
    //             fill: new ol.style.Fill({
    //                 color: "#006600"
    //             }),
    //             stroke: new ol.style.Stroke({
    //                 color: "#fff",
    //                 width: 2
    //             })
    //         })
    //     }),
    //
    //     yellow: new ol.style.Style({
    //         image: new ol.style.Circle({
    //             radius: 6,
    //             fill: new ol.style.Fill({
    //                 color: "#b3b300"
    //             }),
    //             stroke: new ol.style.Stroke({
    //                 color: "#fff",
    //                 width: 2
    //             })
    //         })
    //     }),
    //
    //     orange: new ol.style.Style({
    //         image: new ol.style.Circle({
    //             radius: 6,
    //             fill: new ol.style.Fill({
    //                 color: "#B27300"
    //             }),
    //             stroke: new ol.style.Stroke({
    //                 color: "#fff",
    //                 width: 2
    //             })
    //         })
    //     }),
    //
    //     grey: new ol.style.Style({
    //         image: new ol.style.Circle({
    //             radius: 6,
    //             fill: new ol.style.Fill({
    //                 color: "#444444"
    //             }),
    //             stroke: new ol.style.Stroke({
    //                 color: "#fff",
    //                 width: 2
    //             })
    //         })
    //     }),
    //
    //     icon: new ol.style.Style({
    //         image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    //             anchor: [0, 0],
    //             anchorXUnits: "pixels",
    //             anchorYUnits: "pixels",
    //             opacity: 0.9,
    //             scale: 1,
    //             //size: [15, 15],
    //             src: "/resources/icons/harbours_icon_15px.png"
    //         }))
    //     })
    // },
    //
    // lines: {
    //     blue: new ol.style.Style({
    //         stroke: new ol.style.Stroke({
    //             color: "rgba(0, 0, 255, 1.0)",
    //             width: 2
    //         })
    //     }),
    //     red: new ol.style.Style({
    //         stroke: new ol.style.Stroke({
    //             color: "rgba(255, 0, 0, 1.0)",
    //             width: 1
    //         })
    //     }),
    // },
    //
    // polygons: {
    //     countries: new ol.style.Style({
    //         fill: new ol.style.Fill({
    //             color: [0, 255, 255, 1]
    //         }),
    //         stroke: new ol.style.Stroke({
    //             color: [127,127,127,1.0],
    //             width: 1,
    //             lineJoin: "round"
    //         })
    //     })
    // },

    // the style function returns an array of styles
    // for the given feature and resolution.
    // Return null to hide the feature.
    // store these -> otherwise this will be done for each feature!!!
    pointTypeStyleFunction: function(feature) {

        // map the income level codes to a colour value, grouping them
        var colors = ConfigService.layerColors.spp;

        // get the projectname from the feature properties
        var type = feature.get("place_type");

        // if there is no level or its one we don't recognize,
        // return the default style (in an array!)
        if (!type || !colors[type]) {
            return [
                new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({
                            color: "#0099CC"
                        }),
                        stroke: new ol.style.Stroke({
                            color: "#fff",
                            width: 2
                        })
                    })
                })
            ];
        }

        // check the cache and create a new style for the project
        // if its not been created before.
        if (!harbourStyles[type]) {
            harbourStyles[type] = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({
                        color: colors[type]//"#CC00CC"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "#fff",
                        width: 2
                    })
                })
            });
        }

        // at this point, the style for the current level is in the cache
        // so return it (as an array!)
        return [harbourStyles[type]];
    },

    statusStyleFunction: function(feature, resolution) {

        // map the income level codes to a colour value, grouping them
        var projectColors = {
            "1": "#660066",
            "2": "#007f00",
            "3": "#ca8f42"
        };

        // get the projectname from the feature properties
        var project = feature.get("status");

        // if there is no level or its one we don't recognize,
        // return the default style (in an array!)
        if (!project || !projectColors[project]) {
            //console.log("default for " + project);
            return [this.defaultPoints];
        }

        // check the cache and create a new style for the project
        // if its not been created before.

        if (!this.styleCache[project]) {
            //console.log(project);

            this.styleCache[project] = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({
                        color: projectColors[project]//"#CC00CC"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "#fff",
                        width: 2
                    })
                })
            });
        }

        // at this point, the style for the current level is in the cache
        // so return it (as an array!)
        return [this.styleCache[project]];
    },

    harbourTypeStyleFunction: function(feature, resolution) {
        // TODO: multiply with zoom
        // get the type from the feature properties
        var harbourType = feature.get("place_type");

        // map the income level codes to a colour value, grouping them
        var icons = {
            "Kanal/Schleppstrecke": "resources/icons/canal_icon_24px.png",
            "Wasserstraße": "resources/icons/canal_icon_24px.png",
            "Hafen": "resources/icons/harbours_icon_24px.png",
            "Hafen?": "resources/icons/harbours_icon_24px.png",
            "Hefen": "resources/icons/harbours_icon_24px.png",
            "Wasserfahrzeug": "resources/icons/boat_icon_24px.png"
        };

        // provide default if attribute is missing or not specified in icons
        if (!harbourType || !icons[harbourType]) {
            return [this.defaultPoints];
        }

        if (!this.harourTypeStyleCache[harbourType]) {

            this.harourTypeStyleCache[harbourType] = new ol.style.Style({

                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    //anchor: [0.5, 46],
                    color: "#0099CC",
                    anchor: [0.5, 0.5],
                    //anchorXUnits: 'fraction',
                    //anchorYUnits: 'pixels',
                    //size: 20,  // in pixel
                    src: icons[harbourType]
                }))
            });
        }

        // at this point, the style for the current level is in the cache
        // so return it (as an array!)
        return [this.harourTypeStyleCache[harbourType]];
    },

    eckholdtStyleFunction: function(feature, resolution) {
        // TODO: multiply with zoom

        // map the income level codes to a colour value, grouping them
        var codeWidths = {
            "1": 8,
            "2": 4,
            "3": 2,
            "4": 1
        };

        // get the projectname from the feature properties
        var code = feature.get("Code");

        // if there is no level or its one we don't recognize,
        // return the default style (in an array!)
        /*if (!code || !codeWidths[code]) {
            //console.log("default for " + project);
            return [defaultPoints];
        }*/

        // check the cache and create a new style for the project
        // if its not been created before.

        if (!this.eckholdtStyleCache[code]) {

            this.eckholdtStyleCache[code] = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#4c4cff",  //"rgba(0, 0, 255, 1.0)",
                    width: codeWidths[code]
                })
            });
        }

        // at this point, the style for the current level is in the cache
        // so return it (as an array!)
        return [this.eckholdtStyleCache[code]];
    },

    getLabelText: function(feature, resolution) {
        //var type = dom.text.value;
        //var maxResolution = dom.maxreso.value;
        var text = feature.get("name_mod");

        // on lower resolutions, dont show text
        if (resolution > 700) {
            text = "";
        } else {
            text = text; //text.trunc(12);
        }

        return text;
    },

    getLabelStyle: function(feature, resolution) {
        var me = this;
        var style = new ol.style.Text({
            //textAlign: "Center",
            baseline: "Top",
            stroke: new ol.style.Stroke({color: "#fff", width: 2}),
            fill: new ol.style.Fill({color: "#8B0000"}),
            size: "12px",
            offsetY: "15",
            font: "Arial",
            //text: me.getLabelText(feature, resolution)
            text: "test123"
        });
        return style;
    },

    /*createRedPointLabelStyleFunction: function(feature, resolution) {
        var me = this;
        var style = me.pointTypeStyleFunction(feature, resolution);
            // apply text
            //style.setText(me.getLabelStyle(feature, resolution))
        return [style];
    },*/

    redPointLabelStyleFunction: function(feature, resolution) {
        var getLabelText = function(feature, resolution) {
            //var type = dom.text.value;
            //var maxResolution = dom.maxreso.value;
            var text = feature.get("name_mod");

            // on lower resolutions, dont show text
            if (resolution > 700) {
                text = "";
            } else {
                text = text; //text.trunc(12);
            }
            return text;
        };
        var getLabelStyle = function(feature, resolution) {
            var style = new ol.style.Text({
                //textAlign: "Center",
                baseline: "Top",
                stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                fill: new ol.style.Fill({color: "#8B0000"}),
                size: "12px",
                offsetY: "15",
                font: "Arial",
                text: getLabelText(feature, resolution)
            });
            return style;
        };

        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: "#8B0000"
                }),
                stroke: new ol.style.Stroke({
                    color: "#fff",
                    width: 2
                })
            }),
            text: getLabelStyle(feature, resolution)
        });

        return [style];
    },


});
