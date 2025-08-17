import React from "react";

const OrderSummary = () => {
  return (
    <section className="card card-border bg-amber-50 w-[700px] max-w-5xl mx-auto px-4 my-5 rounded-2xl shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">Order Summary</h2>
        <hr className="text-gray-300" />

        <p className="flex justify-between text-lg font-semibold text-gray-500">
          Meal : <span>Gourmet red sauce Pasta</span>
        </p>
        <p className="flex justify-between text-lg font-semibold text-gray-500">
          Quantity : <span> 2</span>
        </p>
        <p className="flex justify-between text-lg font-semibold text-gray-500">
          Estimated Arrival: <span className="text-[tomato]">30 minutes</span>
        </p>
        <p className="flex justify-between text-lg font-semibold text-gray-500">
          Payment mode : <span>COD</span>
        </p>
        <hr className="text-gray-300" />
        <p className="flex justify-between text-lg font-bold  my-2">
          Total Amount : <span>₹ 450</span>
        </p>

        <p className=" text-[16px] text-center font-semibold my-4 text-wrap text-gray-500">
          We've sent a confirmation email to your inbox. You can track your
          chef's live location from your order history page.
        </p>
        <div className="w-full bg-orange-50 p-6 flex justify-center items-center">
          <button className="btn   w-1/4 bg-orange-500 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-orange-600 transform hover:scale-105">
            View My Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
