import React from 'react'
import OrderSummary from "../components/OrderSummary";
import OrderStatus from "../components/OrderStatus";
const ViewOrder = () => {
  return (
    <div>
      <OrderSummary/>
      <OrderStatus/>
    </div>
  )
}

export default ViewOrder
