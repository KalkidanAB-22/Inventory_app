function NotesList() {
  const notes = [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build Dashboard" },
  ];

  return (
    <div>
      <h2>My Notes</h2>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;