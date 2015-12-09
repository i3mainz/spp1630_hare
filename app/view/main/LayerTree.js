
Ext.define("SppAppClassic.view.main.LayerTree",{
    extend: "Ext.panel.Panel",

    requires: [
        "SppAppClassic.view.main.LayerTreeController",
        "SppAppClassic.view.main.LayerTreeModel"
    ],

    controller: "main-layertree",
    viewModel: {
        type: "main-layertree"
    },

    html: "Hello, World!!"
});
