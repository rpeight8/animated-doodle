import Table from "react-bootstrap/Table";
import { Form } from "react-router-dom";
import { FIND_BOOKS } from "../../queries";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import LibraryContext from "../../LibraryContext";

function BooksList() {
  const [state, _] = useContext(LibraryContext);

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
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default BooksList;
