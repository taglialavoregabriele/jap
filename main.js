const { app, BrowserWindow } = require("electron")
let win;
const os = require('os');
const storage = require('electron-json-storage');

storage.setDataPath(os.tmpdir());
//TODO logo in assets
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png}`
  })
  win.loadURL(`file://${__dirname}/dist/jpn_help/browser/index.html`)
}

app.whenReady().then(() => {
  createWindow()
})
