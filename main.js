const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Only for debugging - remove in production
      webSecurity: false // Temporarily for debugging
    }
  })

  // Force open DevTools (even if window is blank)
  win.webContents.openDevTools({ mode: 'detach' })

  // Load your index.html with explicit path
  win.loadFile(path.join(__dirname, 'dist/jpn_help/browser/index.html')).catch(err => {
    console.error('Failed to load:', err)
    win.loadURL(`data:text/html,<h1>Load Error</h1><pre>${err}</pre>`)
  })
}

app.whenReady().then(createWindow)
