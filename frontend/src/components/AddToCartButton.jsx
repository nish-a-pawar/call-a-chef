import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const AddToCartButton = ({ 
  productId, 
  name, 
  price, 
  image, 
  quantity = 1,
  className = "btn btn-primary",
  onAdd
}) => {
  const { userData } = useSelector((state) => state.auth);
  const userId = userData?.id || userData?.id;
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    if (!userId) {
      toast.error("Please login to add to cart");
      return;
    }
    
    setLoading(true);
    try {
      const res = await axiosInstance.post("/cart", {
        userId,
        productId,
        name,
        price,
        image,
        quantity
      });

      if (onAdd) {
        onAdd(res.data);
      }

      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className={`${className} ${loading ? "loading" : ""}`}
      onClick={addToCart}
      disabled={loading || !userId}
    >
      {!userId ? "Login to Add" : loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
