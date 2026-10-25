# NEXUS Desktop

## Project Overview

NEXUS Desktop is a simple personal workspace application built with Electron,
React, Vite, JavaScript, and CSS. It provides one desktop interface for
managing tasks, notes, and selected file names.

## Features

- Dashboard with task and note counts
- Create, complete, and delete tasks
- Create, edit, and delete notes
- Local JSON persistence for tasks and notes
- Native file selection that displays the selected filename
- Sidebar navigation between Home, Tasks, Notes, and Files

## Technology Stack

- JavaScript
- React and React DOM
- Vite
- Electron
- CSS
- JSON file storage

## Prerequisites

Install the following software:

- Node.js
- npm

## Installation

From the project directory, install the dependencies:

```bash
npm install
```

## Development

Start the Vite development server and Electron application with:

```bash
npm start
```

Create a production Vite build with:

```bash
npm run build
```

## Architecture

- `main.js` is the Electron main process. It creates the window, handles
  application lifecycle events, opens the native file dialog, and reads or
  writes saved data.
- `src/` contains the React renderer process and user interface components.
- `preload.js` provides a small, controlled bridge between React and Electron.
- IPC allows React to request data loading, data saving, and native file
  selection without accessing Node.js directly.

The basic communication flow is:

```text
React UI -> preload bridge -> IPC -> Electron main process
```

## Data Storage

Tasks and notes are saved in `nexus-data.json` inside Electron's
`app.getPath('userData')` directory. The renderer never accesses this file
directly. The main process validates data and writes it through a queued,
temporary-file replacement.

## Security

The Electron window uses `contextIsolation: true` and
`nodeIntegration: false`. The preload bridge exposes only the specific
`loadData`, `saveData`, and `selectFile` methods required by the application.
The renderer cannot access unrestricted Node.js APIs, arbitrary IPC channels,
or arbitrary filesystem paths.
