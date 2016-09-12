"use strict";

Ext.define("SppAppClassic.view.main.AboutPanel", {
    extend: "Ext.panel.Panel",
    xtype: "aboutpanel",
    id: "aboutpanel",

    autoScroll: true,

    //html: null,



    items: [
        {
            xtype: "container",
            //title: 'Column 1',
            columnWidth: 0.5,
            text: ConfigService.texts.landingTitle,
            style: {
                fontSize: "30px",
                marginBottom: "50px"
            }
        },{
            xtype: "container",
            //title: 'Column 1',
            columnWidth: 0.5,
            text: ConfigService.texts.landingTitle,
            style: {
                fontSize: "30px",
                marginBottom: "50px"
            }
        }
    ]

    // initComponent: function () {
    //     //this.setTitle(this.getTitle() + " (version: " + SppAppClassic.app.version + ")");
    //     this.html ="<div class='about-text'>" +
    // 	        "<p>" +
    // 	        "This is the Virtual Research Environment (VRE) of the SPP 1630 Harbours Program. It visualizes harbour related data " +
    //       		"compiled by participating SPP projects, as well as additional hydrological and archeological datasets. " +
    //       		"It is meant to act as a tool for researchers during their ongoing projects.<br>" +
    //       		"This website is an afford of the working group \"Data Integration\". It was conceptualised in collaboration with the University of Jena (FSU) and is currently being developed by the i3mainz." +
    //       	    "</p>" +
    //
    //       // logos i3mainz & uni jena
    //       "<div class='about-logos'>" +
    //       "<br><p>Participating projects & institutions:<br>" +
    //       "<a href='http://www.spp-haefen.de/' target='_blank'><img class='project-icon grayscale' title='SPP 1630 Harbours' src=/resources/images/spp.png /></a>" +
    //       "<a href='https://i3mainz.hs-mainz.de/' target='_blank'><img class='project-icon grayscale' title='i3mainz' src=/resources/images/i3mainz.png /></a>" +
    //       "<a href='http://www.ufg.uni-jena.de/' target='_blank'><img class='project-icon grayscale' title='Friedrich-Schiller-Universität Jena' src=/resources/images/fsu.svg /></a>" +
    //       "<p>" +
    //
    //       // software
    //       "<br><p>Built using:<br>" +
    //       "<a href='http://boundlessgeo.com/products/opengeo-suite/' target='_blank'><img class='software-icon grayscale' title='OpenGeo Suite' src=/resources/images/opengeosuite.png /></a>" +
    //       "<a href='https://www.sencha.com/products/extjs/' target='_blank'><img class='software-icon grayscale' title='Sencha Ext JS' src=/resources/images/extjs.jpg /></a>" +
    //       "<a href='https://geoext.github.io/geoext3/' target='_blank'><img class='software-icon grayscale' title='GeoExt 3' src=/resources/images/geoext.png /></a>" +
    //       "<a href='http://openlayers.org/' target='_blank'><img class='software-icon grayscale' title='OpenLayers 3' src=/resources/images/openlayers.png /></a>" +
    //       "</p>" +
    //
    //       // software license
    //       "<p>" +
    //         "Software License:<br>" +
    //         "This software is licensed under the GNU General Public License version 3 (<a href='https://www.gnu.org/licenses/gpl.html' target='_blank'>GPL v3</a>) and " +
    //         "the source code is available on <a href='https://github.com/SHANYUAN/geoext3app' target='_blank'>GitHub</a>." +
    //       "</p>" +
    //
    //       // version
    //       "<br><p>Current Version:<br>" + SppAppClassic.app.version + "</p>" +
    //       "</div>";
    //
    //     SppAppClassic.view.main.AboutPanel.superclass.initComponent.call(this);
    // },


});
