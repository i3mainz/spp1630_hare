"use strict";

Ext.define("SppAppClassic.view.main.Popup.Popup",{
    extend: "Ext.window.Window",
    //extend: "Ext.grid.Panel",
    xtype: "popup",
    id: "popupWindow",
    /*xtype: 'gridpanel',
    renderTo: document.body,
    store: {
        type: 'customerstore',
        data: [{
            name: 'Foo'
        }]
    },
    columns: [{
        text: 'Name',
        dataIndex: 'name'
    }]
    */
    requires: [
        "SppAppClassic.view.main.Popup.PopupController",
        "SppAppClassic.store.FeatureInfos"
    ],

    controller: "main-popup",

    //store: {type: "features"},
    //store: Ext.data.StoreManager.lookup("featureInfosStore"),
    /*store: {type: "featureInfos"},

    columns: [
        { text: "Attribute", dataIndex: "attribute" },
        { text: "Value", dataIndex: "value", flex: 1 }
    ],*/
    //height: 200,
    //width: 400,

    // window behavior
    //floating: true,

    title: "Feature Info",
    closable: true,  // currently gets destroyed on close
    width: 200,
    height: 350,
    //padding: "0 0 0 5",
    resizable: false,
    //minWidth: 200,
    //minHeight: 250,
    autoScroll: true,
    hideable: true,

    hidden: true,  // hide on creation  -> not sure if that works
    //collapsible: true,
    constrain: true,  // prevents dragging out of browser window size

    // assign hide to close-button
    closeAction: "hide",
    bodyStyle: "padding: 10px",

    initComponent: function () {
        console.log("init Feature info popup...");

        /*var store = Ext.StoreMgr.lookup("featureInfosStore");
        var record = Ext.create("FeatureInfo", {
            attribute: 'testattr',
            value : '123'
        });

        store.add(record);
        store.sync();
        */
        //store.add(info);
        //this.getStore("featureInfos").add(info);
        /*people.add(new Person({
                    firstName: 'Ned',
                    lastName: 'Flanders'
                }));
        */
        // add report button if not guest
        /*if (SppAppClassic.app.isAuthorized()) {
            Ext.apply(this, {
                buttons: [{
                    text: "Report",
                    glyph: "xf12a@FontAwesome",
                    //buttonAlign: "center",
                    tooltip: {
                        text: "Report incorrect or missing data"
                        //anchor: 'top'
                    },
                    handler: "onReportClick"
                }]
            });
        }*/
        SppAppClassic.view.main.Popup.Popup.superclass.initComponent.call(this);
    },

    /**
     * gets all attributes of a feature and returns them as a
     * html string.
    */
    updateHTML: function(olFeature, isGuest) {
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
        var project = Projects.getProjectByName(projectName);
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
    },

    updateStore: function(olFeature, isGuest) {
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
        var project = Projects.getProjectByName(projectName);
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
