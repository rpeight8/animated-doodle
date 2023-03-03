import { useDispatch } from "react-redux";

import { newNote } from "../reducers/notesReducer";
import { setNotification } from "../reducers/notificationReducer";

function AddForm(props) {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(newNote(content));
    dispatch(setNotification(`Added note: ${content}`));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
}

export default AddForm;
