import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FIND_BOOKS } from "../../queries";
import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import LibraryContext from "../../LibraryContext";

function BooksList() {
  const [state, _] = useContext(LibraryContext);
  const [editBook, setEditBook] = useState(null);

  const result = useQuery(FIND_BOOKS, {
    variables: { title: state.bookSearchString },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

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
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              {!editBook ||
                (editBook !== book.id && (
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
                      <Form.Control type="text"></Form.Control>
                    </td>
                    <td>
                      <Form.Control type="text"></Form.Control>
                    </td>
                    <td>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => {
                          setEditBook(null);
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => {
                          setEditBook(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </td>
                  </>
                )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default BooksList;
