import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
    votes: 0,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
    votes: 1,
  },
];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    newNote: (state, action) => {
      state.push({
        content: action.payload,
        id: generateId(),
      });
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
  },
});

const generateId = () => uuidv4();

export const { newNote, toggleImportanceOf, voteFor } = notesSlice.actions;

export default notesSlice.reducer;
