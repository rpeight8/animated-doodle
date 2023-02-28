import { v4 as uuidv4 } from "uuid";

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE": {
      const id = action.payload.id;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    }
    case "VOTE": {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, votes: note.votes + 1 };
        }
        return note;
      });
    }
    default:
      return state;
  }
};

const generateId = () => uuidv4();

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      votes: 0,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
};

export const voteFor = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

export default noteReducer;
