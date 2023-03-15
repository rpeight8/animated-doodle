import { Routes, Route } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import Container from "react-bootstrap/Container";

import Alert from "react-bootstrap/Alert";

// import AuthorsList from "./components/AuthorsList/AuthorsList";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import Notification from "./components/Notification/Notification";
import BookPage from "./components/BookPage/BookPage";
import LoginForm from "./components/LoginForm/LoginForm";
import { AuthContext } from "./providers/AuthProvider";

const App = () => {
  const { user: currentUser, setUser } = useContext(AuthContext);
  useEffect(() => {
    if (!currentUser) {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, [currentUser, setUser]);
  return (
    <Container className="p-3">
      <TopNavbar />
      <Notification />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="books" element={<BookPage />} />
        <Route path="authors" element={<div>All authors</div>} />
        {currentUser && (
          <Route path="ownedBooks" element={<div>My books</div>} />
        )}
        <Route path="auth" element={<LoginForm />} />
        {}
      </Routes>
    </Container>
  );
};

export default App;
