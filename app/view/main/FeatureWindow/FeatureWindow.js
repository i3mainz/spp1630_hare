"use strict";

Ext.define("SppAppClassic.main.FeatureWindow",{
    extend: "Ext.window.Window",

    xtype: "app-popup",
    id: "popupWindow",

    requires: [
        "ConfigService"
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
     * @param {Object} olFeature - OpenLayers 3 feature
     */
    updateFeatureInfo: function(olFeature) {

        // remove certain features because they are notinteresting for users
        var excludeList = ["geometry", "gid", "uid", "created", "modified"];

        var html = "";
        html += "<table>";

        // loop all features and add them to html string
        olFeature.getKeys().forEach(function(key) {
            // add feature if regular user or if feature is allowed as guest
            if (excludeList.indexOf(key) === -1 && (AuthService.getUser() !== "guest" || (AuthService.getUser() === "guest" && ConfigService.guestFeatureInfo.indexOf(key) > -1))) {
                html += "<tr><td><strong>" + key + ": </strong></td><td>" + olFeature.get(key) + "</td></tr>";
            }
        });

        // get a project's contact information
        var contact;
        for (var key in ConfigService.projects) {
            var project = ConfigService.projects[key];
            if (parseInt(project.id) === parseInt(olFeature.get("project_id"))) {
                contact = project.contact;
                break;
            }
        }

        html += "<tr>";
        if (contact) {
            html += "<td><strong>Contact</strong>:</td><td><a href='" + contact + "' target='_blank'>Website</a></td>";
        } else {
            html += "<td><strong>Contact</strong>:</td><td>not available</td>";
        }
        html += "</tr>";
        html += "</table>";

        //this.setHtml("<p>" + html + "</p>");
        this.setHtml(html);
    }
});
