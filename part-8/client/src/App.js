import { gql, useQuery } from "@apollo/client";

import Container from "react-bootstrap/Container";

import LibraryContext from "./LibraryContext";
import 
import BooksList from "./components/BooksList/BooksList";

const App = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <Container className="p-3">loading...</Container>;
  }

  return (
    <LibraryContext.Provider value={}>
      <Container className="p-3">
        <BooksList books={result.data.allBooks} />
      </Container>
    </LibraryContext.Provider>
  );
};

export default App;
