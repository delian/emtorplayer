var remote = require('remote');
var Menu = remote.require('menu');

function menu() {
    var template = [
        {
            label: 'EMTorPlayer',
            submenu: [
                {
                    label: 'About EMTorPlayer',
                    selector: 'orderFrontStandardAboutPanel:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    selector: 'terminate:'
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Fullscreen',
                    accelerator: 'Command+F',
                    click: function() {
                        var win = remote.getCurrentWindow();
                        win.setFullScreen(!win.isFullScreen());
                    }
                },
                {
                    label: 'Settings',
                    accelerator: 'Command+S',
                    click: function() {
                        var win = remote.getCurrentWindow();
                        win.setFullScreen(!win.isFullScreen());
                    }
                },
                {
                    label: 'Restart',
                    accelerator: 'Command+R',
                    click: function() { remote.getCurrentWindow().reload(); }
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: 'Alt+Command+I',
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
