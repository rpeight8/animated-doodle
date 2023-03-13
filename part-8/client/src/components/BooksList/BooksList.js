import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FIND_BOOKS, ALL_AUTHORS } from "../../queries";
import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import LibraryContext from "../../LibraryContext";

function BooksList() {
  const [state, _] = useContext(LibraryContext);
  const [editBook, setEditBook] = useState(null);
  const [editBookTitle, setEditBookTitle] = useState(null);
  const [editBookAuthor, setEditBookAuthor] = useState(null);

  const result = useQuery(FIND_BOOKS, {
    variables: { title: state.bookSearchString },
  });

  const authorsResult = useQuery(ALL_AUTHORS);

  if (result.loading || authorsResult.loading) {
    return <div>loading...</div>;
  }

  const turnOffEdit = () => {
    setEditBook(null);
    setEditBookTitle(null);
    setEditBookAuthor(null);
  };

  const books = result.data.allBooks;
  const authors = authorsResult.data.allAuthors;

  const cells = books.map((book, index) => (
    <tr key={book.id}>
      <td>{index + 1}</td>
      {(editBook !== book.id && (
        <>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>
            <Button
              variant="light"
              size="sm"
              onClick={() => {
                setEditBook(book.id);
              }}
            >
              Edit
            </Button>
            <Button variant="light" size="sm">
              Delete
            </Button>
          </td>
        </>
      )) || (
        <>
          <td>
            <Form.Control
              type="text"
              value={book.title}
              onChange={(event) => {
                setEditBookTitle(event.target.value);
              }}
            ></Form.Control>
          </td>
          <td>
            <Form.Select
              type="text"
              onChange={(event) => {
                setEditBookAuthor(event.target.value);
              }}
            >
              {authors.map((author) => (
                <option key={author.id} selected={author.name === book.author}>
                  {author.name}
                </option>
              ))}
            </Form.Select>
          </td>
          <td>
            <Button
              variant="light"
              size="sm"
              onClick={() => {
                turnOffEdit();
              }}
            >
              Save
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => {
                turnOffEdit();
              }}
            >
              Cancel
            </Button>
          </td>
        </>
      )}
    </tr>
  ));

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{cells}</tbody>
      </Table>
    </>
  );
}

export default BooksList;
