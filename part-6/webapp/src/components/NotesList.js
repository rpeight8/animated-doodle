import { toggleImportanceOf, voteFor } from "../reducers/reducer";
import { useDispatch, useSelector } from "react-redux";

function NotesList() {
  const notes = useSelector((state) => state);
  const dispatch = useDispatch();

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  const vote = (id) => {
    dispatch(voteFor(id));
  };

  return (
    <ul>
      {notes
        .sort((a, b) => b.votes - a.votes)
        .map((note) => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
            <br />
            <span>{note.votes}</span>
            <button
              type="button"
              onClick={() => {
                vote(note.id);
              }}
            >
              Vote
            </button>
          </li>
        ))}
    </ul>
  );
}

export default NotesList;
