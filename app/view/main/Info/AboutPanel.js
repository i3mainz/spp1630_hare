"use strict";

Ext.define("SppAppClassic.view.main.Info.About",{
    extend: "Ext.panel.Panel",
    xtype: "aboutpanel",
    id: "aboutpanel",

    autoScroll: true,

    html: "<p>This is the Virtual Research Environment (VRE) of the SPP 1630. It visualizes harbour data of" +
          " the individual projects, as well as additional hydrological and archeological datasets.</p>" +
          "<p>Placeholder for Logos of i3mainz, Uni jena und SPP Häfen</p>" +
          "<p>Current Version: 1.0 Drake</p>" +
          "<p>The following software was used:</p>"
});
