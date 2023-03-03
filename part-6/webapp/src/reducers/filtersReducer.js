import { createSlice } from "@reduxjs/toolkit";

const initialState = "ALL";

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterChange: (state, action) => {
      return action.payload;
    },
  },
});

export const { filterChange } = filtersSlice.actions;

export default filtersSlice.reducer;
