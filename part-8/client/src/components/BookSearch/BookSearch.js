import LibraryContext from "../../LibraryContext";
import { Form } from "react-router-dom";
import { useContext } from "react";

function BookSearch() {
  const [state, dispatch] = useContext(LibraryContext);

	console.log("BookSearch: render");
  return (
    <div>
      <input
        type="text"
        placeholder="Search for books"
        value={state.bookSearchString}
        onChange={(e) =>
          dispatch({ type: "UPDATE_BOOK_SEARCH", payload: e.target.value })
        }
      />
    </div>
  );
}

export default BookSearch;
