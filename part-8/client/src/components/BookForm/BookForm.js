import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../../queries";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("title: ", title);
    console.log("author: ", author);
  };

  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Enter book title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Select
          onChange={(event) => {
            setAuthor(
              authors.find((author) => author.name === event.target.value).id
            );
          }}
        >
          {!author && <option key="#EMPTY"></option>}
          {authors.map((author) => (
            <option key={author.id}>{author.name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button type="submit">Add book</Button>
    </Form>
  );
}

export default BookForm;
