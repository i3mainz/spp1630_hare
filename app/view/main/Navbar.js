
Ext.define("SppAppClassic.view.main.Navbar",{
    extend: "Ext.panel.Panel",

    requires: [
        "SppAppClassic.view.main.NavbarController",
        "SppAppClassic.view.main.NavbarModel"
    ],

    controller: "main-navbar",
    viewModel: {
        type: "main-navbar"
    },

    html: "Hello, World!!"
});
