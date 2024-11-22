import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";
import Cookies from "js-cookie";
import axiosInstance from "./axios";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/registers/", userData);
      if (response.data) {
        localStorage.setItem("RegisteredUser", JSON.stringify(response.data));
      }
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/loginss/", userData);
      // console.log(response.data);
      // localStorage.setItem("authAccessToken", response.data.access_token);
      // localStorage.setItem("authRefreshToken", response.data.refresh_token);
      const accessTokenExpirationMinutes = 60; // 1 hour
      const refreshTokenExpirationDays = 30; // 30 days

      const accessTokenExpiration = new Date(
        new Date().getTime() + accessTokenExpirationMinutes * 60000
      );
      const refreshTokenExpiration = new Date(
        new Date().getTime() + refreshTokenExpirationDays * 24 * 60 * 60 * 1000
      );

      Cookies.set("authAccessToken", response.data.access_token, {
        expires: accessTokenExpiration,
      });
      Cookies.set("authRefreshToken", response.data.refresh_token, {
        expires: refreshTokenExpiration,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: "Invalid credentials" });
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // const accessToken = Cookies.get("authAccessToken");
      // const refresh_token = localStorage.getItem("authRefreshToken");
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${accessToken}`,
      //     RefreshToken: `Bearer ${refresh_token}`,
      //   },
      // };
      // if (accessToken) {
      //   const response = await axiosInstance.post(
      //     "/UserLogoutView/",
      //     null,
      //     config
      //   );

      //   const responseData = response && response.data;

      //   console.log(responseData);
      // }

      Cookies.remove("authAccessToken");
      Cookies.remove("authRefreshToken");
      // localStorage.removeItem("authAccessToken");
      // localStorage.removeItem("authRefreshToken");
      localStorage.removeItem("user");
      dispatch(logoutSuccess());

      // return null;
    } catch (error) {
      const errorData = error.response && error.response.data;
      return rejectWithValue(errorData);
    }
  }
);

const logoutSuccess = createAction("auth/logoutSuccess");

// const user = JSON.parse(localStorage.getItem("user"));
const userString = Cookies.get("user");
const user = userString ? JSON.parse(userString) : null;
// console.log(user)
const INITIALSTATE = {
  user: user ? user : null,
  registeredUser: null,
  status: StatusCode.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIALSTATE,
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      state.status = StatusCode.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
        state.registeredUser = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
        state.user = action.payload;
        // Handle successful login actions
      })
      .addCase(login.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCESS;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
