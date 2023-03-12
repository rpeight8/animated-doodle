import BookForm from "../BookForm/BookForm";
import BooksList from "../BooksList/BooksList";
import BookSearch from "../BookSearch/BookSearch";

function BookPage({ showForm }) {
  return (
    <>
      <BookSearch />
      <BookForm />
      <BooksList />
    </>
  );
}

export default BookPage;
