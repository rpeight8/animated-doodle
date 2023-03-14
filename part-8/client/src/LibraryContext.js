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
    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "SET_TOKEN": {
      return {
        ...state,
        token: action.payload,
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
  error: "",
	token: "",
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
