import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, ADD_BOOK, FIND_BOOKS } from "../../queries";
import LibraryContext from "../../LibraryContext";

function BookForm() {
  const [state, dispatch] = useContext(LibraryContext);
  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: FIND_BOOKS, variables: { title: state.bookSearchString } },
    ],
    onError: (error) => {
      const respError = error.graphQLErrors[0].message;
      dispatch({ type: "SET_ERROR", payload: respError });
    },
  });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createBook({ variables: { title, author, published: 1337 } });
  };

  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;
	console.log("BookForm: render");
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          placeholder="Enter book title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Select
          required
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
