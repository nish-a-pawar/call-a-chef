import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Get current position (with timeout)
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
        loading: "Registering you, please wait...",
        success: (res) => res?.data?.message || "Registered successfully!",
        error: "Registration failed, please try again.",
      });

      const response = await responsePromise;
      return response.data; // typically user info or success msg
    } catch (error) {
      console.error("Register error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const responsePromise = axiosInstance.post("/auth/login", credentials);

      await toast.promise(responsePromise, {
        loading: "Logging you in...",
        success: (res) => res?.data?.message || "Logged in successfully!",
        error: "Login failed, please check your credentials.",
      });

      const response = await responsePromise;
      return response.data; // expected { user, token }
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const responsePromise = axiosInstance.post("/auth/logout");

      await toast.promise(responsePromise, {
        loading: "Logging out...",
        success: (res) => res?.data?.message || "Logged out successfully!",
        error: "Logout failed, please try again.",
      });

      const response = await responsePromise;
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  role: localStorage.getItem("role") || "",
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Add any sync reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // you can set user data if needed
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
         const { user, token } = action.payload;
         
        state.isLoggedIn = true;
        state.role = user.role;
        state.userData = { ...user, token }; 
        state.loading = false;
        state.error = null;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);
        localStorage.setItem("userData", JSON.stringify({ ...user, token }));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

     
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.role = "";
        state.userData = null;
        state.loading = false;
        state.error = null;

        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("role", "");
        localStorage.removeItem("userData"); // Changed this line
      });
  },
});

export default authSlice.reducer;
