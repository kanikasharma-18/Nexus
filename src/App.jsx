import { useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import Sidebar from './components/Sidebar.jsx';
import Tasks from './components/Tasks.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('Home');

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
            <Dashboard />
          ) : activeSection === 'Tasks' ? (
            <Tasks />
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
