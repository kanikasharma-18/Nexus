const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('nexus', {});
