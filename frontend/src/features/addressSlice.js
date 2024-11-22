import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";
import StatusCode from "../utils/StatusCode";

// Define the initial state
const initialState = {
  status: StatusCode.IDLE,
  error: null,
  successMessage: null,
  addresses: [],
  selectedAddressId: null
};

export const postAddress = createAsyncThunk(
  "address/postAddress",
  async (addressData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/Address/", addressData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/Address/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteAddresses = createAsyncThunk(
  "address/deleteAddresses",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.delete("/Address/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setSelectedAddressId: (state, action) => {
        state.selectedAddressId = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAddress.pending, (state) => {
        state.status = StatusCode.LOADING;
      })

      .addCase(postAddress.fulfilled, (state) => {
        state.status = StatusCode.IDLE;
        state.successMessage = "Address added successfully";
      })

      .addCase(postAddress.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload.message;
      })

      .addCase(fetchAddresses.pending, (state) => {
        state.status = StatusCode.LOADING;
      })

      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
        state.addresses = action.payload; 
      })

      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload.message;
      });
  },
});

export const {setSelectedAddressId} = addressSlice.actions;

export default addressSlice.reducer;
