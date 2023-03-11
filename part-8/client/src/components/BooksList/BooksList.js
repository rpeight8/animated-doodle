import Table from "react-bootstrap/Table";

function BooksList({ books, ...rest }) {
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
