import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import OrderStatus from "../components/OrderStatus";
import OrderSummary from "../components/OrderSummary";
import { CheckCircle } from "lucide-react";
const OrderConfirmation = () => {
  const order = useSelector((state)=>state.order);
  const location = useLocation();
  const reduxOrder = useSelector((state) => state.order);

  // order from navigation state OR redux
  const orderData = location.state?.order?.data || reduxOrder.orders?.[0] ||reduxOrder.order ||          
    null;

  console.log(orderData ,"orderDetails");
  return (
    <div className="flex  flex-col justify-center min-h-screen p-4 bg-base-100 rounded-2xl ">
       <div className="flex flex-col justify-center items-center">
        <CheckCircle className="text-green-500 my-2" size={80}></CheckCircle>
        <h1 className="text-3xl font-bold my-2">Order Confirmed !</h1>
        <p className="text-gray-500 font-semibold py-4">Your order number is : <span className="text-[tomato] font-bold">chef-0123-242</span></p>
       </div>
      <OrderStatus  />
  
     <OrderSummary orderData={orderData} />
    </div>
  );
};

export default OrderConfirmation;
