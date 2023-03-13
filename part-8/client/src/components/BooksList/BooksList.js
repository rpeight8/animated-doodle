import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FIND_BOOKS, ALL_AUTHORS, EDIT_BOOK } from "../../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import LibraryContext from "../../LibraryContext";

function BooksList() {
  const [state, _] = useContext(LibraryContext);
  const [editBook, setEditBook] = useState({
    id: null,
    title: null,
    author: null,
  });

  const [editBookMutation] = useMutation(EDIT_BOOK);

  const result = useQuery(FIND_BOOKS, {
    variables: { title: state.bookSearchString },
  });

  const authorsResult = useQuery(ALL_AUTHORS);

  if (result.loading || authorsResult.loading) {
    return <div>loading...</div>;
  }

  const turnOffEdit = () => {
    setEditBook({ id: null, title: null, author: null });
  };

  const saveBook = (book) => {
    editBookMutation({
      variables: {
        id: book.id,
        newTitle: book.title,
        newAuthor: book.author,
      },
    });
    turnOffEdit();
  };

  const books = result.data.allBooks;
  const authors = authorsResult.data.allAuthors;
  console.log("BookList: render");
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
          {books.map((book, index) => {
            const attrs =
              editBook.id === book.id
                ? { disabled: false }
                : { disabled: true };
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>
                  <Form.Control
                    type="text"
                    value={!attrs?.disabled ? editBook.title : book.title}
                    onChange={(event) => {
                      setEditBook({ ...editBook, title: event.target.value });
                    }}
                    {...attrs}
                  ></Form.Control>
                </td>
                <td>
                  <Form.Select
                    type="text"
                    defaultValue={
                      !attrs?.disabled ? editBook.author : book.author
                    }
                    disabled
                    onChange={(event) => {
                      setEditBook({ ...editBook, author: event.target.value });
                    }}
                    {...attrs}
                  >
                    {authors.map((author) => (
                      <option key={author.id}>{author.name}</option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  {(editBook.id === book.id && (
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => {
                        if (editBook.title && editBook.author) {
                          saveBook(editBook);
                        }
                      }}
                    >
                      Save
                    </Button>
                  )) || (
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => {
                        setEditBook({ ...book });
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {(editBook.id === book.id && (
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => {
                        turnOffEdit();
                      }}
                    >
                      Cancel
                    </Button>
                  )) || (
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => {
                        turnOffEdit();
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default BooksList;
