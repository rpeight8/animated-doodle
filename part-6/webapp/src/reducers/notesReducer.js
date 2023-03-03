import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote: (state, action) => {
      state.push(action.payload);
    },
    toggleImportanceOf: (state, action) => {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      noteToChange.important = !noteToChange.important;
    },
    voteFor: (state, action) => {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      noteToChange.votes = noteToChange.votes + 1;
    },
    appendNote: (state, action) => {
      state.push(action.payload);
    },
    setNotes: (state, action) => {
      return action.payload;
    },
  },
});

const generateId = () => uuidv4();

export const { createNote, toggleImportanceOf, voteFor, appendNote, setNotes } =
  notesSlice.actions;

export default notesSlice.reducer;
