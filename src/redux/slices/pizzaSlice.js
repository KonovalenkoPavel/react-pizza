import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async ({
    sortApi,
    serchedItems,
    sortApiType,
    currentPage,
    itemsOnPage,
    categoryApi,
  }) => {
    const { data } = await axios.get(
      `https://638ebd189cbdb0dbe31391f2.mockapi.io/items?sortBy=${sortApi}${serchedItems}&order=${sortApiType}&page=${currentPage}&limit=${itemsOnPage}` +
        categoryApi
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
