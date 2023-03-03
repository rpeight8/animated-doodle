import { useDispatch } from "react-redux";

import { createNote } from "../reducers/notesReducer";
import { setNotification } from "../reducers/notificationReducer";
import noteService from "../services/notes";

function AddForm(props) {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const newNoteContent = {
      content: event.target.note.value,
      importance: false,
      votes: 0,
    };

    event.target.note.value = "";
    const newNote = await noteService.create(newNoteContent);
    console.log(newNote);
    dispatch(createNote(newNote));
    dispatch(setNotification(`Added note: ${newNote.content}`));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
}

export default AddForm;
