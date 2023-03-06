import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./reducers/notesReducer";
import filtersReducer from "./reducers/filtersReducer";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    filters: filtersReducer,
  },
});

export default store;
