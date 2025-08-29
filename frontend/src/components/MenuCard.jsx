import React from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

function MenuCard({ image, title, description, price, id }) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[320px] bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out flex flex-col">
      
      <div 
        className="overflow-hidden cursor-pointer w-full h-48"
        onClick={() => navigate(`/item-details/${id}`)}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2 flex-grow">{description}</p>
        <span className="text-lg font-bold text-secondary block my-2">₹{price}</span>

        <div className="flex gap-2 mt-auto">
          <AddToCartButton
            productId={id}
            name={title}
            price={price}
            image={image}
            quantity={1}
            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-amber-500 transition-colors duration-200"
          />
          <button
            className="flex-1 px-3 py-2 text-sm font-medium cursor-pointer text-white bg-gray-500 rounded-md hover:bg-amber-500 transition-colors duration-200"
            onClick={() => navigate(`/checkout/${id}`)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
