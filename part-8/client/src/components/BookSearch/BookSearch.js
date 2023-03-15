import { Form } from "react-router-dom";
import { useContext } from "react";

function BookSearch({ book, onChange }) {
  console.log("BookSearch: render");
  return (
    <div>
      <input
        type="text"
        placeholder="Search for books"
        value={book}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default BookSearch;
