import { toggleImportanceOf, voteFor } from "../reducers/notesReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

function NotesList() {
  const notes = [
    ...useSelector(({ notes, filters }) => {
      if (filters === "ALL") {
        return notes;
      } else if (filters === "IMPORTANT") {
        return notes.filter((note) => note.important);
      } else if (filters === "NONIMPORTANT") {
        return notes.filter((note) => !note.important);
      }
    }),
  ];

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteFor(id));
    dispatch(setNotification(`Voted for note: ${id}`));
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
