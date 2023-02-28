import { toggleImportanceOf } from "../reducers/reducer";
import { useDispatch, useSelector } from "react-redux";

function NotesList() {
  const notes = useSelector((state) => state);
  const dispatch = useDispatch();

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note.id)}>
          {note.content} <strong>{note.important ? "important" : ""}</strong>
        </li>
      ))}
    </ul>
  );
}

export default NotesList;
