import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";
import axiosInstance from "./axios";

const initialState = {
  data: [],
  status: StatusCode.IDLE,
  error: null,
  selectedCategoryId: null,
  selectedCategoryName: null,
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ companyName, categoryId }) => {
    const response = await axiosInstance.get(
      `/productby/${companyName}/${categoryId}/`
    );
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async ({ companyName, productId }) => {
    const response = await axiosInstance.get(
      `/productbyshop/${companyName}/${productId}/`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
      state.selectedCategoryName = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = StatusCode.LOADING;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = StatusCode.SUCCESS;
            state.data = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = StatusCode.ERROR;
            state.error = action.error.message;
        })
        .addCase(fetchProductById.pending, (state) => {
          state.status = StatusCode.LOADING;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
          state.status = StatusCode.SUCCESS;
          state.selectedProduct = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
          state.status = StatusCode.ERROR;
          state.error = action.error.message;
        })
        .addCase('UPDATE_PRODUCTS', (state, action) => {
          state.status = StatusCode.SUCCESS;
          state.data = action.payload;
        });

  },
});

export const { setSelectedCategory } = productSlice.actions;

export default productSlice.reducer;
