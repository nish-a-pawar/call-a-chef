// models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 }
    }
  ]
});

export default mongoose.model("Cart", CartSchema);
