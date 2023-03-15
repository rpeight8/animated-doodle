import { useState } from "react";
import BookForm from "../BookForm/BookForm";
import BooksList from "../BooksList/BooksList";
import BookSearch from "../BookSearch/BookSearch";

function BookPage({ showForm }) {
  console.log("BookPage: render");
  const [searchBook, setSearchBook] = useState("");
  return (
    <>
      <BookSearch book={searchBook} onChange={setSearchBook} />
      <BookForm />
      <BooksList searchFor={searchBook} />
    </>
  );
}

export default BookPage;
