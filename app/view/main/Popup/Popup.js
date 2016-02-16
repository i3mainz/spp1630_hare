"use strict";

Ext.define("SppAppClassic.view.main.Popup",{
    extend: "Ext.window.Window",
    xtype: "popup",
    id: "popupWindow",

    title: "Feature Info",
    closable: true,  // currently gets destroyed on close
    width: 200,
    height: 350,
    padding: "0 0 0 5",
    resizable: true,
    minWidth: 150,
    minHeight: 250,
    autoScroll: true,
    hideable: true,

    hidden: true,  // hide on creation  -> not sure if that works
    //collapsible: true,
    constrain: true,  // prevents dragging out of browser window size

    // assign hide to close-button
    closeAction: "hide",

    /**
     * gets all attributes of a feature and returns them as a
     * html string.
    */
    updateHTML: function(olFeature, isGuest) {
        isGuest = isGuest || false;
        var excludeList = ["geometry", "gid", "project_id", "uid", "created", "modified"];
        var guestIncludeList = ["author", "project", "place_type"];
        var html = "";
        var attributes = olFeature.getKeys();
        for (var i = 0; i < attributes.length; i++) {
            var attr = attributes[i];
            if (excludeList.indexOf(attr) === -1) {  // not excluded
                if (isGuest) {
                    if (guestIncludeList.indexOf(attr) > -1) {
                        html += "<strong>" + attr + ": </strong>" + olFeature.get(attr) + "<br>";
                    }
                } else {
                    html += "<strong>" + attr + ": </strong>" + olFeature.get(attr) + "<br>";
                }

            }
        }
        this.setHtml("<p>" + html + "</p>");
    }
});
