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

Ext.define("LayerStyles", {
    singleton: true,

    // the style function returns an array of styles
    // for the given feature and resolution.
    // Return null to hide the feature.
    // store these -> otherwise this will be done for each feature!!!
    styleFunction: function(feature, resolution) {

        // map the income level codes to a colour value, grouping them
        var projectColors = {
            "Häfen an der Balkanküste des byzantinischen Reiches":  "#8B0000", // red
            "Binnenhäfen im fränkisch-deutschen Reich":             "#4cb7db",
            "Effizienz und Konkurrenz":                             "#a0db8e",
            "extern/Binnenhäfen":                   "#a0db8e",
            "Fähren (Universität Bamberg)":         "#ca8f42",
            "Fossa Carolina":                       "#ab9c73",
            "HaNoA":                                "#660066",
            "Ostseehäfen":                          "#ffb6c1",
            "Rhein":                                "#6a7d8e",  // existiert?
            "Rheinhafenprojekt":                    "#00acc8",
            "Bremer Becken":                        "#ffc3a0",
            "Adria":                                "#794044"
        };

        // get the projectname from the feature properties
        var project = feature.get("project");

        // if there is no level or its one we don't recognize,
        // return the default style (in an array!)
        if (!project || !projectColors[project]) {
            //console.log("default for " + project);
            return [defaultPoints];
        }

        // check the cache and create a new style for the project
        // if its not been created before.

        if (!styleCache[project]) {
            console.log("style for " + project);
            console.log(projectColors[project]);

            //console.log(projectColors[project]);
            //styleCache[project] = defaultPoints2;
    
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
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            opacity: 0.75,
            src: "data/icon.png"
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

