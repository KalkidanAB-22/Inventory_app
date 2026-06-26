import { useState } from "react";

function AddNoteForm() {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("New Note:", note);

    setNote("");
  };

  return (
    <div>
      <h2>Add Note</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter note"
        />

        <button type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddNoteForm;