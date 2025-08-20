import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../helpers/axiosInstance";
import CartItem from "../components/CartItem";
import toast from "react-hot-toast";

const Cart = () => {
  const { userData } = useSelector((state) => state.auth); // Get userData from Redux state
  const userId = userData?.id; // Extract userId from userData
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart data on component mount
  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/cart/${userId}`);
      setCart(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to load cart");
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  // Handle quantity updates
  const handleQuantityUpdate = (itemId, newQuantity) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    }));
  };

  // Handle item removal
  const handleRemove = (itemId) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item._id !== itemId)
    }));
  };

  // Add item to cart (you can use this function from other components)
  const addToCart = async (productData) => {
    if (!userId) {
      toast.error("Please log in to add items to cart");
      return;
    }
    
    try {
      const response = await axiosInstance.post('/cart', {
        userId,
        ...productData
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleAddToCart = (updatedCart) => {
  setCart(updatedCart);
};

  // Calculate total
  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!userId) {
    return (
      <div className="container mx-auto p-4">
        <div className="alert alert-warning">
          <span>Please log in to view your cart</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
        <button className="btn btn-sm" onClick={fetchCart}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center font-bold text-xl mb-3">
        What's in Your Bag
      </h2>
      <hr className="text-secondary mb-5" />

      {cart.items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400">Add some items to get started!</p>
        </div>
      ) : (
        <>
          {cart.items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              userId={userId}
              onQuantityUpdate={handleQuantityUpdate}
              onRemove={handleRemove}
            />
          ))}
          
          <hr className="text-secondary font-bold mt-5" />
          <div className="flex justify-between items-center mr-10 mt-4">
            <button 
              className="btn btn-outline btn-secondary"
              onClick={fetchCart}
            >
              Refresh Cart
            </button>
            <h1 className="font-bold text-xl">
              Total: ₹ {calculateTotal()}
            </h1>
          </div>
          
          <div className="flex justify-center mt-6">
            <button className="btn btn-primary btn-lg">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;