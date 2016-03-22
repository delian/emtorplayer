var remote = require('remote');
var Menu = remote.require('menu');
var settings = require('./settings');
var openUrl = require('./openurl');

function menu() {
    var template = [
        {
            label: 'EMTorPlayer',
            submenu: [
                {
                    label: 'Open URL',
                    accelerator: "CmdOrCtrl+O",
                    click: openUrl
                },
                {
                    label: 'About EMTorPlayer',
                    selector: 'orderFrontStandardAboutPanel:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    selector: 'terminate:'
                },
            ]
        },
        {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Fullscreen',
                    accelerator: 'CmdOrCtrl+F',
                    click: function() {
                        var win = remote.getCurrentWindow();
                        win.setFullScreen(!win.isFullScreen());
                    }
                },
                {
                    label: 'Settings',
                    accelerator: 'CmdOrCtrl+S',
                    click: settings
                },
                {
                    label: 'Restart',
                    accelerator: 'CmdOrCtrl+R',
                    click: function() { remote.getCurrentWindow().reload(); }
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: 'Alt+CmdOrCtrl+I',
                    click: function() { remote.getCurrentWindow().toggleDevTools(); }
                },
            ]
        },
    ];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    remote.getCurrentWindow().show(); // Show the window now
}

module.exports = menu;
