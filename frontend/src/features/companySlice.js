import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";
import StatusCode from "../utils/StatusCode";

export const fetchShop = createAsyncThunk(
  "shop/shopDetails",
  async (companyName) => {
    const response = await axiosInstance.get(
      `/shopsname/${companyName}/`
    );
    return response.data;
  }
);
const INITIALSTATE = {
  data:  null,
  status: StatusCode.IDLE,
  error: null,
  companyName: ""
}

const companySlice = createSlice({
  name: "company",
  initialState: INITIALSTATE,
  reducers: {
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShop.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(fetchShop.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchShop.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload;
      });
  }
});

export const { setCompanyName } = companySlice.actions;
export default companySlice.reducer;
