import { createContext, useReducer } from "react";


const libraryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKS": {
      return {
        ...state,
        books: [...state.books, ...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

const LibraryContext = createContext();
const initialState = {
  books: [],
  authors: [],
};

function LibraryContextProvider({ children }) {
  const [count, dispatch] = useReducer(libraryReducer, initialState);

  return (
    <LibraryContext.Provider value={{ count, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
}

export default LibraryContextProvider;
