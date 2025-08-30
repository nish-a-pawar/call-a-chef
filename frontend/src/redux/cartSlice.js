import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
  totalPrice: 0, // total maintain करूया
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalPrice += newItem.price;
        toast.success(`${newItem.title} quantity increased!`);
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
        state.totalPrice += newItem.price;
        toast.success(`${newItem.title} added to cart!`);
      }
    },

    // Remove item
    removeFromCart: (state, action) => {
      const id = action.payload; // इथे थेट id पाठव
      const itemToRemove = state.cartItems.find((item) => item._id === id);

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
        toast.success("Item removed from cart!");
      }
    },

    // Clear cart completely
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      toast.success("Cart cleared!");
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item._id === id);
      if (item) {
        item.quantity = quantity; // ✅ quantity update होईल
      }
    },

    setCartItems: (state, action) => {
      state.cartItems = action.payload;

      state.totalPrice = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems ,  updateQuantity} =
  cartSlice.actions;

export default cartSlice.reducer;
