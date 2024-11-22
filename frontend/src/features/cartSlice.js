import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";
import StatusCode from "../utils/StatusCode";


export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, thunkAPI) => {
    const response = await axiosInstance.post("/add-to-cart/", cartData);
    thunkAPI.dispatch(fetchCart());
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartData, thunkAPI) => {
    const response = await axiosInstance.post(
      `/Removefrmcart/`,
      cartData
    );
    thunkAPI.dispatch(fetchCart());
    return response.data;
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const accessToken = localStorage.getItem('authAccessToken');
    const response = await axiosInstance.get("/shopping-cart/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (id) => {
    const accessToken = localStorage.getItem('authAccessToken');
    const response = await axiosInstance.delete(`/delete-product/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);


const INITIALSTATE = {
    cartItems: [],
    cartProducts: [],
    total_price: 0,
    status: StatusCode.IDLE,
    error: null,

  }

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIALSTATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.error.message;
      })
      .addCase(deleteCart.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.status = StatusCode.SUCCESS;
      })
      .addCase(deleteCart.rejected, (state) => {
        state.status = StatusCode.ERROR;
      });
  },
});

export default cartSlice.reducer;
