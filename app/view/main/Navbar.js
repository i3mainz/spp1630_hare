
Ext.define("SppAppClassic.view.main.Navbar",{
    extend: "Ext.panel.Panel",
    xtype: "navpanel",  // alias

    requires: [
        "SppAppClassic.view.main.NavbarController",
        "SppAppClassic.view.main.NavbarModel"
    ],

    controller: "main-navbar",
    viewModel: {
        type: "main-navbar"
    },
    title: "SPP Virtual Research Environment"
    //html: "Hello, World!!"
});
