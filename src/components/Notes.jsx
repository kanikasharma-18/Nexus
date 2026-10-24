import { useState } from 'react';

function Notes() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    const title = noteTitle.trim();
    const content = noteContent.trim();

    if (!title && !content) {
      return;
    }

    setNotes((currentNotes) => [
      ...currentNotes,
      {
        id: crypto.randomUUID(),
        title,
        content,
      },
    ]);
    setNoteTitle('');
    setNoteContent('');
  }

  return (
    <section className="notes" aria-labelledby="notes-heading">
      <div className="notes-header">
        <p className="welcome-label">Notes</p>
        <h1 id="notes-heading">Notes</h1>
        <p>Capture your thoughts in one place.</p>
      </div>

      <form className="note-form" onSubmit={handleSubmit}>
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          type="text"
          value={noteTitle}
          onChange={(event) => setNoteTitle(event.target.value)}
          placeholder="Note title"
        />

        <label htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          value={noteContent}
          onChange={(event) => setNoteContent(event.target.value)}
          placeholder="Write your note"
          rows="6"
        />

        <button type="submit">Save Note</button>
      </form>

      <section className="saved-notes" aria-labelledby="saved-notes-heading">
        <h2 id="saved-notes-heading">Saved Notes</h2>
        {notes.length === 0 ? (
          <p className="notes-empty">No notes saved yet.</p>
        ) : (
          <div className="notes-list">
            {notes.map((note) => (
              <article className="note-card" key={note.id}>
                {note.title && <h3>{note.title}</h3>}
                {note.content && <p>{note.content}</p>}
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Notes;
