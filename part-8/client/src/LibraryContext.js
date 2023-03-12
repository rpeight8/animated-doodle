import { createContext, useReducer } from "react";

const libraryReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_BOOK_SEARCH": {
      return {
        ...state,
        bookSearchString: action.payload,
      };
    }
    case "UPDATE_AUTHOR_SEARCH": {
      return {
        ...state,
        authorSearchString: action.payload,
      };
    }
    default:
      return state;
  }
};

const LibraryContext = createContext();
const initialState = {
  bookSearchString: "",
  authorSearchString: "",
};

export function LibraryContextProvider({ children }) {
  const [library, dispatch] = useReducer(libraryReducer, initialState);

  return (
    <LibraryContext.Provider value={[library, dispatch]}>
      {children}
    </LibraryContext.Provider>
  );
}

export default LibraryContext;
