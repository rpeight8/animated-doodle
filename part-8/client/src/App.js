import { gql, useQuery } from "@apollo/client";

import Container from "react-bootstrap/Container";

import LibraryContextProvider from "./LibraryContext";
import { ALL_BOOKS } from "./queries";
import BooksList from "./components/BooksList/BooksList";

const App = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <Container className="p-3">loading...</Container>;
  }

  const books = result.data.allBooks;

  return (
    <LibraryContextProvider>
      <Container className="p-3">
        <BooksList books={books} />
      </Container>
    </LibraryContextProvider>
  );
};

export default App;
