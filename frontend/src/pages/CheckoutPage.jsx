import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createOrderThunk } from "../redux/orderSlice";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";
const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const cartItems = useSelector((state) => state.cart.cartItems);

  const { userData } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const {  orderStatus } = useSelector((state) => state.orders);
  const loading = orderStatus === "loading";

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

  

    if (!shippingAddress || !paymentMethod || cartItems.length === 0) {
      toast.error(
        "Please provide shipping details, payment method, and add items to your cart."
      );
      return;
    }

    const orderData = {

      userId: userData.id,
      totalPrice,
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name || item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod,
    };

    const resultAction = await dispatch(createOrderThunk(orderData));

    if (createOrderThunk.fulfilled.match(resultAction)) {
      navigate("/order-confirmation", {
        state: { order: resultAction.payload },
      });
    } else {
      const errorMessage = resultAction.payload || "Failed to place order.";
      toast.error(errorMessage);
    }
  };
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <ShoppingBag size={50} className="text-secondary mb-5"></ShoppingBag>
        <h2 className="text-2xl text-gray-600">Your cart is empty.</h2>
        <p className="mt-2 text-gray-500">Add some meals to place an order!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 my-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center text-gray-700"
            >
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span className="font-medium">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-200 text-lg font-bold flex justify-between">
          <span>Total:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <form
    
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold mb-2">Shipping and Payment</h2>

        <div>
          <label
            htmlFor="shippingAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Shipping Address
          </label>
          <input
            id="shippingAddress"
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Payment Method
          </label>
          <input
            id="paymentMethod"
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="e.g., Cash on Delivery, Card"
            required
          />
        </div>

        <button
          type="submit"
          onClick={handlePlaceOrder}
          disabled={loading || cartItems.length === 0}
          className="w-full py-3 mt-4 text-white font-semibold rounded-md transition-colors duration-200 
          bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
