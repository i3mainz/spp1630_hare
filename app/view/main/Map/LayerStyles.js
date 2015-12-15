"use strict";
/**
 * singleton classes get created when they are defined. no need to Ext.create them.
 * access them via the class-name directly. e.g. LayerStyles.bluePoints
 * variable is globally available
 */
Ext.define("LayerStyles", {
    singleton: true,

    // point styles
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

