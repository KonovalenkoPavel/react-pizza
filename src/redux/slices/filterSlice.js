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
    setFilters(state, action) {
      console.log(action, "action");
      state.activeCategory = Number(action.payload.activeCategory);
      state.currentPage = Number(action.payload.currentPage);
      state.selectedSort = action.payload.sort;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentPage,
  setSelectedSort,
  setActiveCategory,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
