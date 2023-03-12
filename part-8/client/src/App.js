import { useQuery } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";

import BooksList from "./components/BooksList/BooksList";
import AuthorsList from "./components/AuthorsList/AuthorsList";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import BookForm from "./components/BookForm/BookForm";

const App = () => {
  return (
    <Container className="p-3">
      <TopNavbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="books" element={<BooksList />} />
        <Route
          path="books/add"
          element={
            <>
              <BookForm />
              <BooksList />
            </>
          }
        />
        <Route path="authors" element={<AuthorsList />} />
      </Routes>
    </Container>
  );
};

export default App;
