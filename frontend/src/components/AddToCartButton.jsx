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


  const Spinner = () => (
  <svg 
    className="animate-spin h-5 w-5 text-white" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" cy="12" r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    ></circle>
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);


  return (
    <button 
      className={`${className} flex items-center justify-center gap-2`}
      onClick={addToCart}
      disabled={loading || !userId}
    >
     
      {loading ? (
        <>
          <Spinner />
          <span>Adding...</span>
        </>
      ) : !userId ? (
        "Login to Add"
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};

export default AddToCartButton;
