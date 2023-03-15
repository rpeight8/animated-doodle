import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import {
  ALL_AUTHORS,
  EDIT_BOOK,
  OWNED_BOOKS,
  ALL_BOOKS,
  REMOVE_BOOK_FROM_OWNED,
} from "../../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { NotificationContext } from "../../providers/NotificationProvider";
import { AuthContext } from "../../providers/AuthProvider";

function OwnedBooksList() {
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(AuthContext);
  const [editBook, setEditBook] = useState({
    id: null,
    title: null,
    author: null,
  });

  const [editBookMutation] = useMutation(EDIT_BOOK, {
    refetchQueries: [{ query: OWNED_BOOKS }, { query: ALL_BOOKS }],
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
  const [removeBookFromOwnedMutation] = useMutation(REMOVE_BOOK_FROM_OWNED, {
    refetchQueries: [{ query: OWNED_BOOKS }],
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

  const onRemoveBookFromOwndedClick = (book) => {
    removeBookFromOwnedMutation({
      variables: {
        id: book.id,
      },
    });
  };

  let books = [],
    authors = [];
  const { data: booksData, loading: booksLoading } = useQuery(OWNED_BOOKS, {
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

  const { data: authorsData, loading: authorsLoading } = useQuery(ALL_AUTHORS, {
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

  if (booksLoading || authorsLoading) {
    return <div>loading...</div>;
  }

  if (booksData && authorsData) {
    books = booksData.ownedBooks;
    authors = authorsData.allAuthors;
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

  console.log("BookList: render");
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th className="w-25">Actions</th>
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
                      className="mx-2"
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
                      className="mx-2"
                      onClick={() => {
                        setEditBook({ ...book });
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {editBook.id === book.id && (
                    <Button
                      variant="light"
                      size="sm"
                      className="mx-2"
                      onClick={() => {
                        turnOffEdit();
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    variant="light"
                    size="sm"
                    className="mx-2"
                    onClick={() => {
                      onRemoveBookFromOwndedClick(book);
                    }}
                  >
                    Remove from owned
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default OwnedBooksList;
