import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";
import axiosInstance from "./axios";

const initialState = {
  data: [],
  status: StatusCode.IDLE,
  error: null,
};

export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async (companyName) => {
    const response = await axiosInstance.get(
      `/shops/${companyName}/`
    );
    return response.data;
  }
);

const bannerSlice = createSlice({
  name: "banners",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.error.message;
      });
  },
});

export default bannerSlice.reducer;
