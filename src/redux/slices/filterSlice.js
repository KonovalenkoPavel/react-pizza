import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSort: {
    name: "популярности Desc",
    sortProperty: "rating",
  },
  activeCategory: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectedSort(state, action) {
      state.selectedSort = action.payload;
      console.log("название сортировки", action.payload);
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedSort, setActiveCategory } = filterSlice.actions;

export default filterSlice.reducer;
