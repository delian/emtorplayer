'use strict';

var log = console.log;

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

app.on( 'gpu-process-crashed',           function(){ log( 'gpu-process-crashed'           ); } );
app.on( 'select-certificate',            function(){ log( 'select-certificate'            ); } );
app.on( 'activate-with-no-open-windows', function(){ log( 'activate-with-no-open-windows' ); } );
app.on( 'before-quit',                   function(){ log( 'before-quit'                   ); } );
app.on( 'browser-window-blur',           function(){ log( 'browser-window-blur'           ); } );
app.on( 'browser-window-focus',          function(){ log( 'browser-window-focus'          ); } );
app.on( 'open-file',                     function(){ log( 'open-file'                     ); } );
app.on( 'open-url',                      function(){ log( 'open-url'                      ); } );
app.on( 'quit',                          function(){ log( 'quit'                          ); } );
app.on( 'ready',                         function(){ log( 'ready'                         ); } );
app.on( 'will-finish-launching',         function(){ log( 'will-finish-launching'         ); } );
app.on( 'will-quit',                     function(){ log( 'will-quit'                     ); } );
app.on( 'window-all-closed',             function(){ log( 'window-all-closed'             ); } );

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {

  // Console.log
  console.log('arguments',process.argv);

  // Create the browser window.
  mainWindow = new BrowserWindow({
      'min-width': 800,
      'min-height': 600,
      show: true,
      //fullscreen: true,
      resizable: true,
      title: 'EMTOR Video Player',
      //autoHideMenuBar: true,
      icon: __dirname+'/player/img/player.png'
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/player/index.html?magnet='+escape(process.argv[2]||""));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
