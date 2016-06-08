"use strict";
/**
 * singleton classes get created when they are defined. no need to Ext.create them.
 * access them via the class-name directly. e.g. LayerStyles.bluePoints
 * variable is globally available
 */
var defaultPoints = new ol.style.Style({
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
});

var defaultPoints2 = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
            color: "#0099CC"
        }),
        stroke: new ol.style.Stroke({
            color: "#AAA",
            width: 2
        })
    })
});

var styleCache = {};
var statusStyleCache = {};
var eckholdtStyleCache = {};
var harourTypeStyleCache = {};

Ext.define("LayerStyles", {
    singleton: true,

    // the style function returns an array of styles
    // for the given feature and resolution.
    // Return null to hide the feature.
    // store these -> otherwise this will be done for each feature!!!
    pointTypeStyleFunction: function(feature, resolution) {

        // map the income level codes to a colour value, grouping them
        var colors = {
            "Hafen":                "#8B0000",
            "Hafen?":               "#8B0000",
            "Hefen":                "#8B0000",

            "Wasserfahrzeug":       "#a0db8e",

            "Kanal/Schleppstrecke": "#660066",
            "Wasserstraße":         "#660066"
        };

        // get the projectname from the feature properties
        var type = feature.get("place_type");

        // if there is no level or its one we don't recognize,
        // return the default style (in an array!)
        if (!type || !colors[type]) {
            //console.log("default for " + project);
            return [defaultPoints];
        }

        // check the cache and create a new style for the project
        // if its not been created before.

        if (!styleCache[type]) {
            //console.log(project);

            styleCache[type] = new ol.style.Style({
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
        return [styleCache[type]];
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
            return [defaultPoints];
        }

        // check the cache and create a new style for the project
        // if its not been created before.

        if (!styleCache[project]) {
            //console.log(project);

            styleCache[project] = new ol.style.Style({
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
        return [styleCache[project]];
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
            return [defaultPoints];
        }

        if (!harourTypeStyleCache[harbourType]) {

            harourTypeStyleCache[harbourType] = new ol.style.Style({

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
        return [harourTypeStyleCache[harbourType]];
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

        if (!eckholdtStyleCache[code]) {

            eckholdtStyleCache[code] = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#4c4cff",  //"rgba(0, 0, 255, 1.0)",
                    width: codeWidths[code]
                })
            });
        }

        // at this point, the style for the current level is in the cache
        // so return it (as an array!)
        return [eckholdtStyleCache[code]];
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

    // point styles
    //defaultPoints: this.bluePoints,

    redPoints: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: "#8B0000"
            }),
            stroke: new ol.style.Stroke({
                color: "#fff",
                width: 2
            })
        })
    }),

    bluePoints: new ol.style.Style({
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
    }),
    greenPoints: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: "#006600"
            }),
            stroke: new ol.style.Stroke({
                color: "#fff",
                width: 2
            })
        })
    }),
    yellowPoints: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: "#b3b300"
            }),
            stroke: new ol.style.Stroke({
                color: "#fff",
                width: 2
            })
        })
    }),
    orangePoints: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: "#B27300"
            }),
            stroke: new ol.style.Stroke({
                color: "#fff",
                width: 2
            })
        })
    }),
    greyPoints: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: "#444444"
            }),
            stroke: new ol.style.Stroke({
                color: "#fff",
                width: 2
            })
        })
    }),

    // line styles
    blueLines: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(0, 0, 255, 1.0)",
            width: 2
        })
    }),
    redLines: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 0, 0, 1.0)",
            width: 1
        })
    }),

    // polygon styles
    countryPolys: new ol.style.Style({
        fill: new ol.style.Fill({
            color: [0, 255, 255, 1]
        }),
        stroke: new ol.style.Stroke({
            color: [127,127,127,1.0],
            width: 1,
            lineJoin: "round"
        })
    }),

    // icon styles
    iconStyle: new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0, 0],
            anchorXUnits: "pixels",
            anchorYUnits: "pixels",
            opacity: 0.9,
            scale: 1,
            //size: [15, 15],
            src: "/resources/icons/harbours_icon_15px.png"
        }))
    })

    // tests
    /*
    selected: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: "#EE0000"
            }),
            stroke: new ol.style.Stroke({
                color: "gray",
                width: 3
            })
        })
    }),

    randomStyle: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          size: [52, 52],
          offset: [52, 0],
          opacity: 1,
          scale: 0.25,
          src: "../assets/img/dots.png"
        })
    })
    */
});
