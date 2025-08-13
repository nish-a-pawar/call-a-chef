import { X } from "lucide-react";
import React from "react";
import { useState } from "react";

const CartItem = () => {
    const [quantity ,setQuantity] = useState(1);
   
    const incrementQuantity =()=>{
        setQuantity(quantity +1);
        
    }
    const decrementQuantity =()=>{
        if(quantity >1)
        setQuantity(quantity-1)
      else 
        alert("min quantity is 1")
        
    }
  return (
    <>
      <h2 className="text-center font-bold text-xl mb-3">
        What's in User's Bag
      </h2>
      <hr className="text-secondary mb-5" />

      <div className="card card-side bg-base-100 shadow-sm p-2 m-2">
        <figure>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/230px-Pizza-3007395.jpg"
            alt=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Wheat Base Pizza</h2>
          <p>Pamper your tastebuds with a healthy option!</p>
          <p> Price : ₹ 245</p>
          <div className="card-actions justify-start flex items-center gap-40">
            <div className="flex gap-2 items-center">
              <button className="btn btn-secondary" onClick={decrementQuantity}>-</button>
              <span> {quantity} </span>
              <button className="btn btn-secondary" onClick={incrementQuantity}>+</button>
            </div>
            <div>
              <button>
                <X size={18} className="text-secondary font-extrabold" />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-secondary font-bold mt-5" />
      <h1 className="flex justify-end mr-10 font-bold ">Total : ₹ 450</h1>
    </>
  );
};

export default CartItem;
