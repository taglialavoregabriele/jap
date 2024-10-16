const { app, BrowserWindow } = require("electron")


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
