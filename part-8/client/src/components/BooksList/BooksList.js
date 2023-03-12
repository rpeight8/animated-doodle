import Table from "react-bootstrap/Table";
import { ALL_BOOKS, FIND_BOOKS_BY_AUTHOR } from "../../queries";
import { useQuery } from "@apollo/client";

function BooksList() {
  const result = useQuery(FIND_BOOKS_BY_AUTHOR, {
    variables: { author: "Fyodor Dostoevsky" },
  });
  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
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
  );
}

export default BooksList;
