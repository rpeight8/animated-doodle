import { Link } from "react-router-dom";
import { useField, useForm } from "./hooks";

import { Table, Form, Button } from "react-bootstrap";

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
      <Form onSubmit={addForm.onSubmit} onReset={addForm.onReset}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control {...title} />
          <Form.Label>description:</Form.Label>
          <Form.Control {...description} />
          <Button variant="primary" type="submit">
            create
          </Button>
          <Button variant="primary" type="reset">
            reset
          </Button>
        </Form.Group>
      </Form>
      <h2>Notes</h2>
      <Table striped>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </td>
              <td>{note.important ? "important" : ""}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Notes;
