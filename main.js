function createWindow() {
    const win = new BrowserWindow({
      width: 1000,
      height: 650,
  
      // Let the window resize so your responsive CSS can actually kick in
      resizable: true,
      maximizable: true,
      fullscreenable: true,
  
      // Prevent it becoming unusably tiny
      minWidth: 360,
      minHeight: 520,
  
      // Keep your existing look
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
  