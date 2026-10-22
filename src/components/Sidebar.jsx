const navigationItems = ['Home', 'Tasks', 'Notes', 'Files'];

function Sidebar({ activeSection, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">NEXUS</div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <button
            className={`sidebar-item${activeSection === item ? ' active' : ''}`}
            key={item}
            onClick={() => onNavigate(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
