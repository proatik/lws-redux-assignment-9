import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  selected: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    changeSelected: (state, action) => {
      const item = action.payload;

      if (state.selected.includes(item)) {
        state.selected = state.selected.filter((s) => s !== item);
      } else state.selected.push(item);
    },
    setInitialSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { changeSearch, changeSelected, setInitialSelected } =
  filtersSlice.actions;
export default filtersSlice;
