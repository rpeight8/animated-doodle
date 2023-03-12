import Table from "react-bootstrap/Table";
import { ALL_AUTHORS } from "../../queries";
import { useQuery } from "@apollo/client";

function AuthorsList() {
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author, index) => (
          <tr key={author.id}>
            <td>{index + 1}</td>
            <td>{author.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AuthorsList;
