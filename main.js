function createWindow() {
    const win = new BrowserWindow({
      width: 900,
      height: 500,
      resizable: false,
      maximizable: false,
      fullscreenable: false,
      frame: false, 
      transparent: true,
      webPreferences: {
        contextIsolation: true
      }
    });
  
    win.loadFile("index.html");
  }
  
  app.whenReady().then(createWindow);
  
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });