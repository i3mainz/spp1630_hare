
Ext.define("SppAppClassic.view.main.Popup",{
    extend: "Ext.window.Window",
    xtype: "popup",  // alias
    requires: [
        "SppAppClassic.view.main.PopupController",
        "SppAppClassic.view.main.PopupModel"
    ],

    controller: "main-popup",
    viewModel: {
        type: "main-popup"
    },
    title: "Feature Info",
    closable: false,  // currently gets destroyed on close
    width: 200,
    height: 300,
    resizable: true,
    minWidth: 150,
    minHeight: 250,
    autoScroll: true
});
