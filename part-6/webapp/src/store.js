import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./reducers/notesReducer";
import filtersReducer from "./reducers/filtersReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    filters: filtersReducer,
    notifications: notificationReducer,
  },
});

export default store;
