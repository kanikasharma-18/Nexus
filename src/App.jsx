import { useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import Notes from './components/Notes.jsx';
import Sidebar from './components/Sidebar.jsx';
import Tasks from './components/Tasks.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <div className="app-workspace">
        <header className="app-header">
          <span className="app-status">Desktop workspace</span>
        </header>

        <main className="app-content">
          {activeSection === 'Home' ? (
            <Dashboard tasks={tasks} />
          ) : activeSection === 'Tasks' ? (
            <Tasks
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          ) : activeSection === 'Notes' ? (
            <Notes />
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
