import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://syzcart.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async () => {
  try {
    // const refreshToken = localStorage.getItem("authRefreshToken");
    const refreshToken = Cookies.get("authRefreshToken");
    const response = await axios.post(
      "https://syzcart.com/api/refresh-token/",
      {
        refresh_token: refreshToken,
      }
    );
    const newAccessToken = response.data.access_token;
    // console.log(response);
    // localStorage.setItem("authAccessToken", newAccessToken);
    const accessTokenExpirationMinutes = 60; // 1 hour
    const accessTokenExpiration = new Date(
      new Date().getTime() + accessTokenExpirationMinutes * 60000
    );
    Cookies.set("authAccessToken", newAccessToken, {
      expires: accessTokenExpiration,
    });
    return newAccessToken;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      console.error("Refresh token failed: User not authenticated");
    } else {
      console.error("Error refreshing access token:", error);
    }
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    // const accessToken = localStorage.getItem("authAccessToken");
    const accessToken = Cookies.get("authAccessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
