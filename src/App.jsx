import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';

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
          <section className="welcome-screen">
            <p className="welcome-label">Welcome</p>
            <h1>Your personal workspace</h1>
            <p>NEXUS Desktop</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
