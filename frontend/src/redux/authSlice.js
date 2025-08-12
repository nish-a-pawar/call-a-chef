import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  role: localStorage.getItem("role") || "",
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (userData) => {
    try {
      // Get location from browser before sending
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const payload = {
        ...userData,
        location: {
          type: "Point",
          coordinates: [longitude, latitude], // GeoJSON expects [lng, lat]
        },
      };

      const responsePromise = axiosInstance.post("/auth/register", payload);

      await toast.promise(responsePromise, {
        loading: "Hold back tight, we're registering you...",
        success: (res) => res?.data?.message || "Registration successful!",
        error: "Something went wrong. Please try again!",
      });

      const response = await responsePromise;
      return response.data;
    } catch (error) {
      console.log("Register error:", error);
      throw error;
    }
  }
);


export const loginUser = createAsyncThunk("/auth/signin", async (userData) => {
  try {
    const response = await toast.promise(
      axiosInstance.post("/auth/login", userData),
      {
        loading: "Logging in...",
        success: (res) => res?.data?.message || "Login successful!",
        error: "Something went wrong",
      }
    );

    return response.data;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const responsePromise = axiosInstance.post("/auth/logout");

    await toast.promise(responsePromise, {
      loading: "Logging out ...",
      success: (res) => res?.data?.message || "Logout successful!",
      error: " Something went wrong !",
    });

    const response = await responsePromise;
    return response.data;
  } catch (error) {
    console.log("Logout error:", error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
       
        const user = action?.payload?.user;
        const token = action?.payload?.token;

        if (user && token) {
          state.isLoggedIn = true;
          state.role = user.role;
          state.userData = user;
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);
        localStorage.setItem("userData", JSON.stringify(user));
      })
      .addCase(logout.fulfilled, (state) => {
       

        state.isLoggedIn = false;
        state.role = "";
        state.userData = {};

        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("role", "");
        localStorage.setItem("userData", JSON.stringify({}));
      });
  },
});

export default authSlice.reducer;
