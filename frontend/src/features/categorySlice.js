import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";
import axiosInstance from "./axios";

const initialState = {
  data: [],
  status: StatusCode.IDLE,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (companyName) => {
    const response = await axiosInstance.get(
      `/categoriesby/${companyName}/`
    );
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
