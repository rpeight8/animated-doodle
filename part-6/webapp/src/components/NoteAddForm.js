import { useDispatch } from "react-redux";

import { createNote } from "../reducers/notesReducer";
import noteService from "../services/notes";
import { useNotificationDispatch } from "../notificationContext";

function AddForm(props) {
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

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
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `Added note: ${newNote.content}`,
    });
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
}

export default AddForm;
