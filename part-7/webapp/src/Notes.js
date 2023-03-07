import { Link } from "react-router-dom";
import { useField, useForm } from "./hooks";

const Notes = ({ notes }) => {
  const titleInput = useField("text");
  const { setValue: titleSetValue, ...title } = titleInput;
  const descriptionInput = useField("text");
  const { setValue: descriptionSetValue, ...description } = descriptionInput;

  const addForm = useForm({
    fields: [titleInput, descriptionInput],
    onSubmit: (event) => {
      console.log("Submit");
    },
  });

  return (
    <div>
      <h2>Form</h2>
      <form onSubmit={addForm.onSubmit} onReset={addForm.onReset}>
        <div>
          title: <input {...title} />
        </div>
        <div>
          description: <input {...description} />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
