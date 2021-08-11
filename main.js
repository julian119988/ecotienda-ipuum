// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    dialog,
    ipcMain,
    webContents,
} = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
var options = {
    silent: false,
    printBackground: true,
    color: false,
    margin: {
        marginType: "printableArea",
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    header: "Header of the Page",
    footer: "Footer of the Page",
};
function createWindow() {
    // express server is started here when production build
    if (!isDev) {
        require(path.join(__dirname, "build-server/server"));
    }

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: "./resources/leaves.png",
        webPreferences: {
            nodeIntegration: true,
            nativeWindowOpen: true,
        },
        autoHideMenuBar: true,
    });

    // and load the index.html of the app.
    mainWindow.webContents.on(
        "new-window",
        (event, url, frameName, disposition, options, additionalFeatures) => {
            // This is the name we chose for our window. You can have multiple names for
            // multiple windows and each have their options
            if (frameName === "Factura") {
                event.preventDefault();
                Object.assign(options, {
                    // This will prevent interactions with the mainWindow
                    parent: mainWindow,
                    width: 625,
                    height: 500,
                    // You can also set `left` and `top` positions
                });
                event.newGuest = new BrowserWindow(options);
            }
        }
    );
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : url.format({
                  pathname: path.join(__dirname, "build/index.html"),
                  protocol: "file:",
                  slashes: true,
              })
    );

    // Open the DevTools.
    if (isDev) mainWindow.webContents.openDevTools();
    mainWindow.maximize();

    mainWindow.on("close", function (e) {
        var choice = dialog.showMessageBox(this, {
            type: "question",
            buttons: ["Si", "No"],
            title: "Confirmar",
            message: "Seguro que quieres salir?",
        });
        if (choice == 1) {
            e.preventDefault();
        }
    });
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
ipcMain.on("imprimir", (event, arg) => {
    let win = BrowserWindow.getFocusedWindow();
    win.webContents.print(options, (success, failureReason) => {
        if (!success) console.log(failureReason);
        console.log("Print Initiated");
    });
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
