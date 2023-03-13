import { Routes, Route } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import Container from "react-bootstrap/Container";

import Alert from "react-bootstrap/Alert";

import AuthorsList from "./components/AuthorsList/AuthorsList";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import BookPage from "./components/BookPage/BookPage";
import LibraryContext from "./LibraryContext";

const App = () => {
  const [state, dispatch] = useContext(LibraryContext);
  const { error } = state;

  useEffect(() => {
    if (!error) {
      return;
    }

    const timeId = setTimeout(() => {
      dispatch({ type: "SET_ERROR", payload: "" });
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  });

  return (
    <Container className="p-3">
      <TopNavbar />
      <Alert variant="danger" transition={false} show={error}>
        {error}
      </Alert>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="books" element={<BookPage />} />
        <Route path="authors" element={<AuthorsList />} />
      </Routes>
    </Container>
  );
};

export default App;
