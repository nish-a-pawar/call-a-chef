import React from "react";

function MenuCard({ image, title, description, price }) {
  return (
    <div className="w-full max-w-[290px] mx-auto bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">
          {description}
        </p>

        <span className="text-lg font-bold text-pink-600 block">₹{price}</span>

        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 text-sm font-medium cursor-pointer text-white bg-gray-500 rounded-md hover:bg-pink-500 transition-colors duration-200">
            Add To Cart
          </button>

          <button className="flex-1 px-4 py-2 text-sm font-medium cursor-pointer text-white bg-gray-500 rounded-md hover:bg-pink-500 transition-colors duration-200">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
