import { useState, useContext, useEffect } from "react";
import { Form, Button, ModalTitle } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import {
  ALL_AUTHORS,
  ADD_BOOK,
  FIND_BOOKS_BY_TITLE,
  ALL_BOOKS,
  ADD_OWN_BOOK,
} from "../../queries";
import { NotificationContext } from "../../providers/NotificationProvider";

function BookForm() {
  const { setNotification } = useContext(NotificationContext);
  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      const respError = error.message
        ? error.message
        : error.graphQLErrors[0].message;
      setNotification({
        message: respError,
        type: "danger",
      });
    },
  });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createBook({ variables: { title, author } });
    setTitle("");
    setAuthor("");
  };

  useEffect(() => {}, []);

  let authors = [];
  const { data, loading } = useQuery(ALL_AUTHORS, {
    onError: (error) => {
      const respError = error.message
        ? error.message
        : error.graphQLErrors[0].message;
      setNotification({
        message: respError,
        type: "danger",
      });
    },
  });
  if (loading) {
    return <div>loading...</div>;
  }

  if (data) {
    authors = data.allAuthors;
  }

  console.log("BookForm: render");
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          placeholder="Enter book title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Select
          required
          value={author}
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
