const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs').promises;
const path = require('path');

const dataFileName = 'nexus-data.json';
let writeQueue = Promise.resolve();

function getDataFilePath() {
  return path.join(app.getPath('userData'), dataFileName);
}

function isValidTask(task) {
  return (
    task &&
    typeof task.id === 'string' &&
    task.id.length > 0 &&
    typeof task.text === 'string' &&
    typeof task.completed === 'boolean'
  );
}

function isValidNote(note) {
  return (
    note &&
    typeof note.id === 'string' &&
    note.id.length > 0 &&
    typeof note.title === 'string' &&
    typeof note.content === 'string'
  );
}

function isValidData(data) {
  const taskIds = new Set(
    Array.isArray(data?.tasks) ? data.tasks.map((task) => task?.id) : []
  );
  const noteIds = new Set(
    Array.isArray(data?.notes) ? data.notes.map((note) => note?.id) : []
  );

  return (
    data &&
    Array.isArray(data.tasks) &&
    Array.isArray(data.notes) &&
    data.tasks.every(isValidTask) &&
    data.notes.every(isValidNote) &&
    taskIds.size === data.tasks.length &&
    noteIds.size === data.notes.length
  );
}

function queueDataWrite(data) {
  const writeOperation = writeQueue.then(async () => {
    const filePath = getDataFilePath();
    const temporaryFilePath = `${filePath}.tmp`;
    const fileContent = JSON.stringify(data, null, 2);

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(temporaryFilePath, fileContent, 'utf8');
    await fs.rename(temporaryFilePath, filePath);
  });

  writeQueue = writeOperation.catch(() => {});
  return writeOperation;
}

ipcMain.handle('load-data', async () => {
  try {
    const fileContent = await fs.readFile(getDataFilePath(), 'utf8');
    const data = JSON.parse(fileContent);

    if (!isValidData(data)) {
      return {
        success: false,
        error: 'Saved data has an invalid structure.',
      };
    }

    return { success: true, data };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {
        success: true,
        data: { tasks: [], notes: [] },
      };
    }

    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: 'Saved data is not valid JSON.',
      };
    }

    return {
      success: false,
      error: 'Saved data could not be loaded.',
    };
  }
});

ipcMain.handle('save-data', async (_event, data) => {
  if (!isValidData(data)) {
    return {
      success: false,
      error: 'Data could not be saved because it has an invalid structure.',
    };
  }

  try {
    await queueDataWrite(data);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Data could not be saved.',
    };
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
