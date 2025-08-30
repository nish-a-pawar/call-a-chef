import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance.js";
import toast from "react-hot-toast";
import { clearCart } from "./cartSlice.js";
import { useDispatch } from "react-redux";
// This thunk will now accept the chefId as a payload

export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
 
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth; // assuming auth state has token
      // Prevent empty cart orders
      
      if (!orderData.items || orderData.items.length === 0) {
        return rejectWithValue("Cart is empty!");
      }

      // Ensure user field matches schema
      const payload = {
        ...orderData,
        user: orderData.user, // must be ObjectId string
      };

      const res = await axiosInstance.post("/orders/create-order", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      return res.data;
      
    } catch (err) {
      console.error("Order placement failed: ", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const acceptOrderThunk = createAsyncThunk(
  "orders/acceptOrder",
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const { userData } = getState().auth;
      const token = userData?.token;
      if (!token) return rejectWithValue("Missing token");

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axiosInstance.put(`/orders/${orderId}/accept`, {}, config);
      toast.success(response.data.message || "Order accepted");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to accept order");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchOrdersByChefThunk = createAsyncThunk(
  "orders/fetchByChef",
  async (chefId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axiosInstance.get(
        `/orders/chef/${chefId}`,   // 👈 matches backend route
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data; // returns orders array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, status }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axiosInstance.patch(
        `/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Order status update failed:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  orders: [],
  status: 'idle', 
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    }
  },
  extraReducers: (builder) => {
    builder
       .addCase(createOrderThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload); // नवीन order store मध्ये
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
        .addCase(fetchOrdersByChefThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByChefThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrdersByChefThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update order status
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        const idx = state.orders.findIndex(o => o._id === action.payload._id);
        if (idx !== -1) state.orders[idx] = action.payload;
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

  },
});

export const { clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
