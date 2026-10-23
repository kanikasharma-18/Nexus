import { useState } from 'react';

function Tasks() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    const text = taskInput.trim();
    if (!text) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), text },
    ]);
    setTaskInput('');
  }

  return (
    <section className="tasks" aria-labelledby="tasks-heading">
      <div className="tasks-header">
        <p className="welcome-label">Tasks</p>
        <h1 id="tasks-heading">Tasks</h1>
        <p>Keep track of what you need to do.</p>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="task-input">
          Enter a task
        </label>
        <input
          id="task-input"
          type="text"
          value={taskInput}
          onChange={(event) => setTaskInput(event.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p className="tasks-empty">No tasks added yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Tasks;
