"use strict";

Ext.define("SppAppClassic.view.main.FeatureWindow",{
    extend: "Ext.window.Window",

    xtype: "app-popup",
    id: "popupWindow",

    requires: [
        //"SppAppClassic.store.FeatureInfos",
        "ConfigService",
        "ProjectService"
    ],

    title: ConfigService.texts.featureTitle,
    closable: true,
    closeAction: "hide",
    resizable: false,
    autoScroll: true,
    hideable: true,
    hidden: true,
    constrain: true,  // prevents dragging out of browser window size

    // style
    width: 250,
    minWidth: 200,
    height: 350,
    bodyStyle: "padding: 10px",

    /**
     * gets all attributes of a feature and returns them as a
     * html string.
    */
    updateFeatureInfo: function(olFeature, isGuest) {
        isGuest = isGuest || false;
        var excludeList = ["geometry", "gid", "project_id", "uid", "created", "modified"];
        var guestIncludeList = ["author", "project", "place_type"];
        var html = "";
        html += "<table>";

        var attributes = olFeature.getKeys();
        for (var i = 0; i < attributes.length; i++) {
            var attr = attributes[i];
            if (excludeList.indexOf(attr) === -1) {  // not excluded
                if (isGuest) {
                    if (guestIncludeList.indexOf(attr) > -1) {
                        html += "<tr><td><strong>" + attr + ": </strong></td><td>" + olFeature.get(attr) + "</td></tr>";
                    }
                } else {
                    html += "<tr><td><strong>" + attr + ": </strong></td><td>" + olFeature.get(attr) + "</td></tr>";
                }
            }
        }
        // add link to project website
        var projectName = olFeature.get("project");
        var project = ProjectService.getProjectByDbName(projectName);
        html += "<tr>";
        if (project && "contact" in project) {
            html += "<td><strong>Contact</strong>:</td><td><a href='" + project.contact + "' target='_blank'>Website</a></td>";
        } else {
            html += "<td><strong>Contact</strong>:</td><td>not available</td>";
        }
        html += "</tr>";
        html += "</table>";

        //this.setHtml("<p>" + html + "</p>");
        this.setHtml(html);
    }
});
