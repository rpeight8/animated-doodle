import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./reducers/notesReducer";
import filtersReducer from "./reducers/filtersReducer";
import notificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    filters: filtersReducer,
    notifications: notificationReducer,
  },
});
