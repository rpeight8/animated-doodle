import { Form } from "react-router-dom";
import { useContext } from "react";

function BookSearch() {
  console.log("BookSearch: render");
  return (
    <div>
      <input type="text" placeholder="Search for books" />
    </div>
  );
}

export default BookSearch;
