// import { voteFor } from "../reducers/notesReducer";
import { useNotificationDispatch } from "../notificationContext";
import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/notesReducer";
import noteService from "../services/notes";

function NotesList() {
  const notificationDispatch = useNotificationDispatch();
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

  const vote = async (id) => {
    const note = { ...notes.find((note) => note.id === id) };
    note.votes = note.votes + 1;
    await noteService.update(note.id, note);
    dispatch(voteFor(id));
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `Voted for note: ${id}`,
    });
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
