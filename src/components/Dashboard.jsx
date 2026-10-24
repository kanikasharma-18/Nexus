function Dashboard({ tasks }) {
  const completedTaskCount = tasks.filter((task) => task.completed).length;
  const overviewCards = [
    { label: 'Total Tasks', value: tasks.length },
    { label: 'Completed Tasks', value: completedTaskCount },
    { label: 'Saved Notes', value: 0 },
  ];

  return (
    <div className="dashboard">
      <section className="dashboard-welcome">
        <p className="welcome-label">Welcome</p>
        <h1>Welcome to NEXUS</h1>
        <p>Your personal workspace, all in one place.</p>
        <p className="dashboard-introduction">
          Organize your work and keep track of everything that matters to you.
        </p>
      </section>

      <section className="dashboard-overview" aria-labelledby="overview-heading">
        <h2 id="overview-heading">Overview</h2>
        <div className="overview-cards">
          {overviewCards.map((card) => (
            <article className="overview-card" key={card.label}>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace-overview" aria-labelledby="workspace-heading">
        <h2 id="workspace-heading">Your Workspace</h2>
        <p>
          Access your Tasks, Notes, and Files from the sidebar to keep your
          personal workspace organized.
        </p>
      </section>
    </div>
  );
}

export default Dashboard;
