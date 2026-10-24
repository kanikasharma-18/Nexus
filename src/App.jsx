import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import Files from './components/Files.jsx';
import Notes from './components/Notes.jsx';
import Sidebar from './components/Sidebar.jsx';
import Tasks from './components/Tasks.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadSavedData() {
      try {
        const result = await window.nexus.loadData();

        if (!result.success) {
          throw new Error(result.error);
        }

        if (isMounted) {
          setTasks(result.data.tasks);
          setNotes(result.data.notes);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error.message);
          setIsLoading(false);
        }
      }
    }

    loadSavedData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading || loadError) {
      return;
    }

    async function saveData() {
      const result = await window.nexus.saveData({ tasks, notes });

      if (!result.success) {
        setSaveError(result.error);
        return;
      }

      setSaveError('');
    }

    saveData().catch((error) => {
      setSaveError(error.message);
    });
  }, [tasks, notes, isLoading, loadError]);

  function addTask(text) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  function addNote(title, content) {
    setNotes((currentNotes) => [
      ...currentNotes,
      {
        id: crypto.randomUUID(),
        title,
        content,
      },
    ]);
  }

  function updateNote(noteId, title, content) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? { ...note, title, content }
          : note
      )
    );
  }

  function deleteNote(noteId) {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId)
    );
  }

  if (isLoading) {
    return (
      <main className="welcome-screen">
        <p className="welcome-label">NEXUS</p>
        <h1>Loading your workspace</h1>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="welcome-screen">
        <p className="welcome-label">NEXUS</p>
        <h1>Unable to load your workspace</h1>
        <p>{loadError}</p>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <div className="app-workspace">
        <header className="app-header">
          <span className="app-status">
            {saveError || 'Desktop workspace'}
          </span>
        </header>

        <main className="app-content">
          {activeSection === 'Home' ? (
            <Dashboard tasks={tasks} notes={notes} />
          ) : activeSection === 'Tasks' ? (
            <Tasks
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          ) : activeSection === 'Notes' ? (
            <Notes
              notes={notes}
              onAddNote={addNote}
              onUpdateNote={updateNote}
              onDeleteNote={deleteNote}
            />
          ) : activeSection === 'Files' ? (
            <Files />
          ) : (
            <section className="welcome-screen">
              <p className="welcome-label">Welcome</p>
              <h1>Your personal workspace</h1>
              <p>NEXUS Desktop</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
