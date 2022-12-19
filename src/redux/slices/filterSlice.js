import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSort: {
    name: "популярности Desc",
    sortProperty: "rating",
  },
  activeCategory: 0,
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentPage, setSelectedSort, setActiveCategory } =
  filterSlice.actions;

export default filterSlice.reducer;
