import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "1",
  type: "",
  display: false,
};

const filtersSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setNotification, showNotification, hideNotification } =
  filtersSlice.actions;

export default filtersSlice.reducer;
