import { X } from "lucide-react";
import React from "react";
import axiosInstance from "../helpers/axiosInstance"; // Update this path to match your file structure
import toast from "react-hot-toast";

const CartItem = ({ item, onQuantityUpdate, onRemove}) => {
  const incrementQuantity = async () => {
    try {
      const newQuantity = item.quantity + 1;
      await axiosInstance.put(`/cart/${item._id}`, { quantity: newQuantity });
      onQuantityUpdate(item._id, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const decrementQuantity = async () => {
    if (item.quantity > 1) {
      try {
        const newQuantity = item.quantity - 1;
        await axiosInstance.put(`/cart/${item._id}`, { quantity: newQuantity });
        onQuantityUpdate(item._id, newQuantity);
      } catch (error) {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity");
      }
    } else {
      toast.error("Minimum quantity is 1");
    }
  };

  const removeItem = async () => {
    try {
      await axiosInstance.delete(`/cart/${item._id}`);
      onRemove(item._id);
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm p-2 m-2">
      <figure>
        <img
          src={item.image || "https://via.placeholder.com/150"}
          alt={item.name}
          className="w-32 h-24 object-cover rounded"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>Price: ₹ {item.price}</p>
        <p>Subtotal: ₹ {item.price * item.quantity}</p>
        <div className="card-actions justify-between items-center">
          <div className="flex gap-2 items-center">
            <button className="btn btn-secondary btn-sm" onClick={decrementQuantity}>
              -
            </button>
            <span className="mx-2 font-semibold">{item.quantity}</span>
            <button className="btn btn-secondary btn-sm" onClick={incrementQuantity}>
              +
            </button>
          </div>
          <div>
            <button onClick={removeItem} className="btn btn-ghost btn-sm">
              <X size={18} className="text-error" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;