import React from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton"; // 👈 import

function MenuCard({ image, title, description, price, id }) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[290px] mx-auto bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
      
      <div 
        className="overflow-hidden cursor-pointer"
        onClick={() => navigate(`/item-details/${id}`)}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <span className="text-lg font-bold text-secondary block">₹{price}</span>

        <div className="flex gap-3">
          {/* ✅ Use AddToCartButton */}
          <AddToCartButton
            productId={id}
            name={title}
            price={price}
            image={image}
            quantity={1}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-amber-500 transition-colors duration-200"
          />

          <button
            className="flex-1 px-4 py-2 text-sm font-medium cursor-pointer text-white bg-gray-500 rounded-md hover:bg-amber-500 transition-colors duration-200"
            onClick={() => navigate(`/checkout/${id}`)} // or your buy-now flow
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
