import React from "react";
import LiveTrackingView from "../components/LiveTrackingView";
import OrderStatus from "../components/OrderStatus";
import OrderSummary from "../components/OrderSummary";
import { CheckCircle } from "lucide-react";
const OrderConfirmation = () => {
  return (
    <div className="flex  flex-col justify-center min-h-screen p-4 bg-base-100 rounded-2xl ">
       <div className="flex flex-col justify-center items-center">
        <CheckCircle className="text-green-500 my-2" size={80}></CheckCircle>
        <h1 className="text-3xl font-bold my-2">Order Confirmed !</h1>
        <p className="text-gray-500 font-semibold py-4">Your order number is : <span className="text-[tomato] font-bold">chef-0123-242</span></p>
       </div>
      <OrderStatus/>
      <LiveTrackingView/>
      <OrderSummary/>
    </div>
  );
};

export default OrderConfirmation;
