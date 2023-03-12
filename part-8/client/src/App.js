import { useQuery } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";

import { ALL_BOOKS, ALL_AUTHORS } from "./queries";
import BooksList from "./components/BooksList/BooksList";
import AuthorsList from "./components/AuthorsList/AuthorsList";
import TopNavbar from "./components/TopNavbar/TopNavbar";

const App = () => {
  const books = useQuery(ALL_BOOKS);

  if (books.loading) {
    return <Container className="p-3">loading...</Container>;
  }

  return (
    <Container className="p-3">
      <TopNavbar />
      <Routes>
        <Route path="/" element={<div>Hoome</div>} />
        <Route path="books" element={<BooksList />} />
        <Route path="authors" element={<AuthorsList />} />
      </Routes>
    </Container>
  );
};

export default App;
